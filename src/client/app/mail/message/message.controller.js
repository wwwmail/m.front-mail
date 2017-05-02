(function () {
    'use strict';

    angular
        .module('mail.message')
        .controller('MessageController', MessageController);

    MessageController.$inject = ['mail', '$state', '$sce', 'message', 'tag'];
    /* @ngInject */
    function MessageController(mail, $state, $sce, message, tag) {
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

        vm.getDate = getDate;
        vm.getTrustHtml = getTrustHtml;
        vm.setUnTag = setUnTag;
        vm.send = send;

        activate();

        function activate() {
            vm.$state = $state;
            // getMessage();

            message.$promise
                .then(function (response) {
                    vm.message.model = response.data;
                    vm.messages.checked.push(vm.message.model);

                    // vm.message.model.from

                    getTags();
                });
        }

        function getTags() {
            tag.getTagsByMessage({}, {
                mbox: vm.message.model.mbox,
                id: vm.message.model.number
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
                ids: ids,
                mbox: vm.message.model.mbox,
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

        function send(form) {
            if (form.$invalid) return;

            var data = {
                to: vm.message.model.fromAddress,
                body: vm.sendForm.model.body
            };

            // console.log('data', data);

            data.cmd = 'send';
            mail.post({}, data).then(function (response) {
                console.log('response', response);
                if (response.success) {
                    $state.go('mail.inbox');
                }
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

            return data;
        }
    }
})();
