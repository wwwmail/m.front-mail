(function () {
    'use strict';

    angular
        .module('mail.inbox')
        .controller('InboxController', InboxController);

    InboxController.$inject = ['mail', 'mailBox', '$state'];
    /* @ngInject */
    function InboxController(mail, mailBox, $state) {
        var vm = this;

        vm.messages = {
            params: {
                'per-page': 5
            }
        };

        vm.folders = {};

        activate();

        function activate() {

            if ($state.params.filter) {
                vm.messages.params.filter = $state.params.filter;
            }

            if ($state.params.mbox) {
                vm.messages.params.mbox = $state.params.mbox;
            }

            get();
            getMailBox();
        }

        function get() {
            mail.get(vm.messages.params).then(function (response) {
                vm.messages = _.assign(vm.messages, response);
                console.log(vm.messages);
                _.forEach(vm.messages.items, function (message) {
                    getMessage(message);
                });
            });
        }

        function getMessage(message) {
            console.log('get', message);
            mail.getById({
                id: message.number,
                mbox: message.mbox,
                part: 'text'
            }).then(function (response) {
                message.message = response;
                console.log('message', message);
            });
        }

        function getMailBox() {
            mailBox.get().then(function (response) {
                vm.folders = _.assign(vm.folders, response);
            });
        }
    }
})();
