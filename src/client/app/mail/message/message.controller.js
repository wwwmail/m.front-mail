(function () {
    'use strict';

    angular
        .module('mail.message')
        .controller('MessageController', MessageController);

    MessageController.$inject = ['mail', '$state'];
    /* @ngInject */
    function MessageController(mail, $state) {
        var vm = this;

        vm.message = {};

        vm.isSendTextOpen = false;

        activate();

        function activate() {
            getMessage();
        }

        function getMessage() {
            mail.getById({id: $state.params.id, mbox: $state.params.mbox}).then(function (response) {
                vm.message.model = response;
                console.log('message', vm.message.model);
            });
        }
    }
})();
