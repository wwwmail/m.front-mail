(function () {
    'use strict';

    angular
        .module('mail.message')
        .controller('MessageController', MessageController);

    MessageController.$inject = ['mail', '$scope', '$state', '$sce', '$auth', 'message', 'tag', '$rootScope', '$uibModal'];
    /* @ngInject */
    function MessageController(mail, $scope, $state, $sce, $auth, message, tag, $rootScope,  $uibModal) {
        var vm = this;

        vm.message = {};

        vm.messages = {
            checked: []
        };

        vm.sendForm = {
            model: {}
        };

        vm.isSendTextOpen = false;
        vm.isFromOpen = false;

        vm.isCloseBanner = true;

        vm.getDate = getDate;
        vm.getTrustHtml = getTrustHtml;
        vm.setUnTag = setUnTag;
        vm.send = send;
        vm.setImportant = setImportant;
        vm.move = move;
        vm.destroy = destroy;
        vm.openMessageMenu = openMessageMenu;

        $scope.$on('tag:message:add:success', function (e, data) {
            // console.log('data', data);
            // vm.message.model.tags.push(data.tag);
            getTags();
        });

        $scope.$on('tag:message:delete:success', function (e, data) {
            // console.log('data', data);
            // vm.message.model.tags.push(data.tag);
            getTags();
        });

        activate();

        function activate() {
            vm.$state = $state;
            vm.user = $auth.user;
            // getMessage();

            message.$promise.then(function (response) {
                vm.message.model = response.data;
                // vm.message.model = response.data;
                vm.messages.checked.push(vm.message.model);

                $rootScope.$broadcast('mailBox:sync');

                getTags();

                mail.setAnswerData(vm.message.model);

                getPaginateMessage(vm.message.model);
            });
        }

        function getTags() {
            tag.getTagsByMessage({}, {
                mbox: vm.message.model.mbox,
                id: vm.message.model.number,
                connection_id: vm.message.model.connection_id
            }).then(function (response) {
                vm.message.model.tags = response.data;
            })
        }

        function setUnTag(item) {
            var ids = [];

            _.remove(vm.message.model.tags, function (tag) {
                return tag.id === item.id;
            });

            ids.push(vm.message.model.number);

            tag.deleteTagFromMessages({}, {
                // ids: ids,
                messages: [vm.message.model],
                tag_id: item.id
            }).then(function (response) {
                // vm.messages.checked = [];
            });
        }

        function getDate(date) {
            var newDate = new Date(date);
            return moment(newDate).format("MMM Do YY");
        }

        function getTrustHtml(html) {
            return $sce.trustAsHtml(html);
        }

        // function send(form) {
        //     if (form.$invalid) return;
        //
        //     var data = {
        //         to: vm.message.model.fromAddress,
        //         body: vm.sendForm.model.body
        //     };
        //
        //     data.cmd = 'send';
        //     mail.post({}, data).then(function (response) {
        //         console.log('response', response);
        //         if (response.success) {
        //             $state.go('mail.inbox', {mbox: 'INBOX'});
        //         }
        //     });
        // }

        function send(form) {
            copyReMessage();
            $state.go('mail.inbox', {mbox: 'INBOX'});
        }

        function copyReMessage() {
            var data = {
                id: $state.params.id,
                mboxfrom: $state.params.mbox,
                connection_id: $state.params.connection_id,
                cmd: 'reply'
            };
            mail.post({}, data).then(function (response) {
                pasteRe(response.data.id);
            });
        }

        function pasteRe(id) {
            mail.getById({
                id: id,
                mbox: 'Drafts',
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
                vm.sendForm.model.body += html;

                vm.sendForm.model.to = message.fromAddress;

                var data = getFormattedData();

                console.log('vm.sendForm', data);

                data.cmd = 'send';
                mail.post({}, data).then(function (response) {
                    console.log('response', response);
                });
            });
        }

        function getFormattedData() {
            var data = {};

            if (vm.sendForm.model.to) {
                data.to = vm.sendForm.model.to.split(',');
            }

            if (vm.sendForm.model.toCopy) {
                data.toCopy = vm.sendForm.model.toCopy.split(',');
            }

            if (vm.sendForm.model.toCopyHidden) {
                data.toCopyHidden = vm.sendForm.model.toCopyHidden.split(',');
            }

            if (vm.sendForm.model.subject) {
                data.subject = vm.sendForm.model.subject;
            }

            if (vm.sendForm.model.body) {
                data.body = vm.sendForm.model.body;
            }

            if (vm.sendForm.model.attaches) {
                data.attaches = vm.sendForm.model.attaches;
            }

            vm.sendForm.model.connection_id = vm.user.profile.default_connection_id;
            data.from_connection = vm.user.profile.default_connection_id;

            return data;
        }

        function setImportant() {
            if (vm.message.model.important && !vm.message.model.isLoading) {
                vm.message.isLoading = true;
                mail.deflag({}, {
                    messages: [vm.message.model],
                    flag: 'Flagged'
                }).then(function () {
                    vm.message.isLoading = false;
                });
                vm.message.model.important = !vm.message.model.important;
                return;
            }

            vm.message.isLoading = true;
            mail.flag({}, {
                messages: [vm.message.model],
                flag: 'Flagged'
            }).then(function () {
                vm.message.isLoading = false;
            });
            vm.message.model.important = !vm.message.model.important;
        }

        function move(folder) {
            vm.messages = mail.moveToFolder(folder, vm.messages);
        }

        function destroy() {
            vm.messages = mail.destroy(vm.messages);
            vm.messages = [];
        }

        function openMessageMenu() {
            // vm.messages.checked = [vm.message.model];
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/components/message-menu/message-menu.html',
                controller: 'MessageMenuController',
                controllerAs: 'vm',
                resolve: {
                    message: function () {
                        return vm.message.model;
                    },
                    messages: function () {
                        return vm.messages;
                    }
                },
                size: 'sm',
                windowClass: 'popup'
            });

            modalInstance.result.then(function (response) {
                vm.messages = response.result.messages;
                // console.log('response', response);
            });
        }

        function getPaginateMessage() {
            mail.getById({
                id: $state.params.id,
                mbox: $state.params.mbox,
                connection_id: $state.params.connection_id,
                part: 'head',
                neighbours: 1
            }).then(function (response) {
                vm.paginate = response.data;

                mail.setPaginate(vm.paginate);
            })
        }
    }
})();
