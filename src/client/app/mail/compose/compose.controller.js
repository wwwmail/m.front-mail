(function () {
    'use strict';

    angular
        .module('mail.compose')
        .controller('ComposeController', ComposeController);

    ComposeController.$inject = ['mail', '$interval', '$state', '$scope', '$rootScope', '$auth', 'contact', '$uibModal', 'Upload'];
    /* @ngInject */
    function ComposeController(mail, $interval, $state, $scope, $rootScope, $auth, contact, $uibModal, Upload) {
        var vm = this;

        vm.connections = {
            selected: {},
            items: []
        };

        vm.interval = {};

        vm.message = {};

        vm.isSaveDraft = false;

        vm.fwd = {
            items: [],
            checked: []
        };

        vm.isUploading = false;

        vm.isCopy = false;
        vm.isCopyHidden = false;

        vm.tags = [];

        vm.sendForm = {
            model: {}
        };

        vm.toList = {
            model: {}
        };

        vm.send = send;
        vm.save = save;
        vm.upload = upload;
        vm.saveTemplate = saveTemplate;

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            $interval.cancel(vm.interval);
        });

        $scope.$on('mail:send', function () {
            send($scope.form);
        });

        $scope.$watch('vm.sendForm.model.body', function (data, oldData) {
            if (data) {
                $rootScope.$broadcast('mail:isSend', {isSend: true});
            } else {
                $rootScope.$broadcast('mail:isSend', {isSend: false});
            }
        }, true);

        $scope.$watch('vm.sendForm.model.body', function (data, oldData) {
            if (data) {
                if (!vm.isSaveDraft && !$state.params.fwd && !$state.params.re && !$state.params.template) {
                    save();
                    vm.interval = $interval(function () {
                        if (vm.sendForm.model.to && !vm.$state.params.template) {
                            save();
                        }
                    }, 1000 * 60);
                    vm.isSaveDraft = true;
                }
            }
        });

        activate();

        function activate() {
            vm.user = $auth.user;
            vm.$state = $state;

            if ($state.params.id && $state.params.mbox && !$state.params.fwd && !$state.params.re) {
                vm.sendForm.id = $state.params.id;
                getMessage();
            }

            if ($state.params.to) {
                vm.sendForm.model.to = $state.params.to;
            }

            if ($state.params.fwd && $state.params.mbox === 'Drafts') {
                pasteFwd();
            }

            if ($state.params.fwd && $state.params.mbox !== 'Drafts') {
                vm.sendForm.id = $state.params.ids;

                if (_.isArray($state.params.ids)) {
                    pasteFwdList();
                    return;
                }

                copyFwdMessage();
            }

            if ($state.params.re && $state.params.mbox === 'Drafts') {
                pasteRe();
            }

            if ($state.params.re && $state.params.mbox !== 'Drafts') {
                vm.sendForm.id = $state.params.id;
                copyReMessage();
            }

            pasteSign();
            getConnectionsList();
        }

        function send(form) {
            if (form.$invalid) return;

            var data = getFormattedData();

            if (!data.sdate) {
                data.cmd = 'send';
            }

            if (vm.fwd.checked.length) {
                data.body += pasteListFwd();
            }

            data.mbox = $state.params.mbox || 'Drafts';

            if ($state.params.id) {
                mail.put({id: vm.sendForm.id}, data);
            } else {
                mail.post({}, data);
            }

            $rootScope.$broadcast('notify:message', {
                message: 'Письмо успешно отправлено'
            });

            $state.go('mail.inbox', {mbox: 'INBOX'});
        }

        function save() {
            var data = getFormattedData();

            data.mbox = $state.params.mbox || 'Drafts';

            var result = {};

            if (!vm.sendForm.id) {
                result = mail.post({}, data);
            }

            if (vm.sendForm.id) {
                if ($state.params.template) {
                    data.mbox = $state.params.mbox;
                    data.connection_id = $state.params.connection_id;
                }

                result = mail.put({id: vm.sendForm.id}, data);
            }

            result.then(function (response) {
                if (response.success) {
                    vm.sendForm.id = response.data.id;
                    vm.sendForm.model.date = {
                        date: setNowTime()
                    };

                    $state.go('mail.compose', {
                        id: vm.sendForm.id,
                        mbox: 'Drafts',
                        connection_id: vm.user.profile.default_connection_id
                    }, {notify: false});

                }
            });
        }

        function saveTemplate() {
            var data = getFormattedData();

            data.mbox = 'Drafts';
            data.number = vm.sendForm.id;
            data.connection_id = vm.user.profile.default_connection_id;

            mail.move({}, {
                mboxnew: 'Templates',
                messages: [data]
            }).then(function () {
                $state.go('mail.inbox', {
                    mbox: 'Templates'
                });
            });
        }

        function getMessage() {
            mail.getById({
                id: $state.params.id,
                mbox: $state.params.mbox,
                connection_id: $state.params.connection_id,
                part: 'headnhtml'
            }).then(function (response) {
                vm.sendForm.model = response.data;
                vm.sendForm.model.subject = vm.sendForm.model.Subject;
                vm.sendForm.model.to = getEmailSelectFormat({
                    first_name: vm.sendForm.model.to[0].address,
                    email: vm.sendForm.model.to[0].address
                });
                getConnectionsList();
            });
        }

        function setNowTime() {
            return moment().toDate();
        }

        function getFormattedData() {
            var data = {};

            if (vm.sendForm.model.to) {
                data.to = getMailsFromContact(vm.sendForm.model.to);
            }

            if (vm.sendForm.model.toCopy) {
                data.toCopy = getMailsFromContact(vm.sendForm.model.toCopy);
            }

            if (vm.sendForm.model.toCopyHidden) {
                data.toCopyHidden = getMailsFromContact(vm.sendForm.model.toCopyHidden);
            }

            if (vm.sendForm.model.subject) {
                data.subject = vm.sendForm.model.subject;
            }

            if (vm.sendForm.model.body) {
                data.body = vm.sendForm.model.body;
            }

            if (vm.sendForm.model.sdate) {
                data.sdate = vm.sendForm.model.sdate;
            }

            if (vm.sendForm.model.from_connection) {
                data.from_connection = vm.sendForm.model.from_connection;
            }

            if (vm.sendForm.model.attachmentsData) {
                data.attaches = [];
                _.forEach(vm.sendForm.model.attachmentsData, function (attach) {
                    data.attaches.push(attach.fileName);
                });
            }

            vm.sendForm.model.connection_id = vm.user.profile.default_connection_id;

            return data;
        }

        function getMailsFromContact(data) {
            var to = [];

            _.forEach(data, function (item) {
                if (item.emails) {
                    to.push(item.emails[0].value);
                    return;
                }
                to.push(item.first_name);
            });

            return to;
        }

        function upload(files, invalidFiles) {
            if (vm.sendForm.model.attachmentsData) {
                vm.sendForm.model.attachmentsData = vm.sendForm.model.attachmentsData.concat(
                    getFormattedAttach(files)
                );
            } else {
                vm.sendForm.model.attachmentsData = getFormattedAttach(files);
            }

            vm.isUploading = true;

            mail.upload({
                id: $state.params.id,
                mbox: $state.params.mbox
            }, {}, files).then(function (response) {
                vm.isUploading = false;
                vm.sendForm.id = response.data.data;
                vm.sendForm.model.number = vm.sendForm.id;

                $state.go('mail.compose', {
                    id: response.data.data
                }, {notify: false});

                if (!vm.sendForm.model.attachmentsData) {
                    vm.sendForm.model.attachmentsData = [];
                }

                _.forEach(files, function (file) {
                    file.number = vm.sendForm.id;
                });
            });
        }

        function getFormattedAttach(files) {
            _.forEach(files, function (file) {
                file.number = vm.sendForm.id;
                file.fileName = file.name;
                file.mime = file.type;
            });
            return files;
        }

        function pasteSign() {
            if (vm.user.profile.sign && !vm.sendForm.model.body && !$state.params.fwd && !$state.params.re) {
                vm.sendForm.model.body = '<br><br>' + vm.user.profile.sign;
            }
        }

        function pasteFwdList() {
            var messages = mail.getFwdData();
            console.log('messages fwd', messages);
            _.forEach(messages, function (message) {
                getFwdMessageById(message, messages);
            });
        }

        function getFwdMessageById(message, messages) {
            return mail.getById({
                id: message.number,
                mbox: message.mbox,
                connection_id: message.connection_id,
                part: 'headnhtml'
            }).then(function (response) {
                if (messages.length === 1) {
                    pasteOneFwd(response.data);
                    return;
                }
                vm.fwd.items.push(response.data);
                vm.fwd.checked.push(response.data);
            });
        }

        function pasteFwd() {
            mail.getById({
                id: $state.params.id,
                mbox: $state.params.mbox,
                connection_id: $state.params.connection_id,
                part: 'headnhtml'
            }).then(function (response) {
                var message = response.data;

                var html = '<br><br><br>';
                html += '-------- Пересылаемое сообщение--------<br>';
                html += moment(message.date.date).format('DD.MM.YYYY HH.mm');
                html += ' ';
                html += message.fromAddress || '';
                html += '<br><br>';
                html += message.body + '<br>';
                html += '-------- Конец пересылаемого сообщения --------';
                html += '<br><br>';
                html += vm.user.profile.sign || '';

                vm.sendForm.id = message.number;

                vm.sendForm.model.number = message.number;
                vm.sendForm.model.mbox = message.mbox;
                vm.sendForm.model.connection_id = message.connection_id;
                vm.sendForm.model.attachmentsData = message.attachmentsData;
                vm.sendForm.model.subject = 'Fwd: ';
                vm.sendForm.model.subject += message.Subject || '';
                vm.sendForm.model.body = html;

                vm.sendForm.model.to = getEmailSelectFormat({
                    first_name: message.from,
                    email: message.fromAddress
                });
            });
        }

        function pasteListFwd() {
            var fwd = '';

            _.forEach(vm.fwd.checked, function (item) {
                fwd += '-------- Пересылаемое сообщение--------<br>';
                fwd += moment(item.date.date).format('DD.MM.YYYY HH.mm');
                fwd += item.from || '';
                fwd += ' <br>';
                fwd += item.body + '<br>';
                fwd += '-------- Конец пересылаемого сообщения --------';
                fwd += '<br><br>';
            });

            return fwd;
        }

        function pasteRe() {
            mail.getById({
                id: $state.params.id,
                mbox: $state.params.mbox,
                connection_id: $state.params.connection_id,
                part: 'headnhtml'
            }).then(function (response) {
                var message = response.data;

                var html = '<br><br><br>';
                html += moment(message.date.date).format('DD.MM.YYYY HH.mm');
                html += ' ';
                html += message.from || '';
                html += ' <br>';
                html += message.body + '<br>';
                html += '<br>';
                html += vm.user.profile.sign || '';

                vm.sendForm.id = message.number;

                vm.sendForm.model.number = message.number;
                vm.sendForm.model.mbox = message.mbox;
                vm.sendForm.model.connection_id = message.connection_id;
                vm.sendForm.model.attachmentsData = message.attachmentsData;
                vm.sendForm.model.subject = 'Re: ';
                vm.sendForm.model.subject += message.Subject || '';
                vm.sendForm.model.body = html;

                vm.sendForm.model.to = getEmailSelectFormat({
                    first_name: message.from,
                    email: message.fromAddress
                });
            });
        }

        function getEmailSelectFormat(data) {
            return [{
                first_name: data.first_name,
                emails: [{
                    value: data.email
                }]
            }];
        }

        function getConnectionsList() {
            vm.connections.items = [];

            var userConnection = {
                id: vm.user.profile.default_connection_id,
                email: vm.user.profile.email
            };

            vm.connections.items.push(userConnection);

            vm.connections.items = vm.connections.items.concat(vm.user.profile.connections);

            _.forEach(vm.connections.items, function (connection) {
                if (vm.user.profile.selected_connection_id === connection.id) {
                    vm.connections.selected = connection;
                }
            });

            if (!vm.user.profile.selected_connection_id) {
                vm.connections.selected = userConnection;
            }

            vm.sendForm.model.from_connection = vm.connections.selected.id;

            console.log('vm.sendForm.model', vm.sendForm.model);
        }

        function copyReMessage() {
            var data = {
                id: $state.params.id,
                mboxfrom: $state.params.mbox,
                connection_id: $state.params.connection_id,
                cmd: 'reply'
            };
            mail.post({}, data).then(function (response) {
                vm.sendForm.id = response.data.id;

                $state.go('mail.compose', {
                    id: response.data.id,
                    mbox: 'Drafts',
                    connection_id: vm.user.profile.default_connection_id,
                }, {notify: false});

                pasteRe();
            });
        }

        function copyFwdMessage() {
            var data = {
                id: $state.params.ids,
                mboxfrom: $state.params.mbox,
                connection_id: $state.params.connection_id,
                cmd: 'forward'
            };
            mail.post({}, data).then(function (response) {
                vm.sendForm.id = response.data.id;

                $state.go('mail.compose', {
                    id: response.data.id,
                    mbox: 'Drafts',
                    connection_id: vm.user.profile.default_connection_id
                }, {notify: false});

                pasteFwd();
            });
        }
    }
})();
