(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('MenuBottomController', MenuBottomController);

    MenuBottomController.$inject = ['$state'];
    /* @ngInject */
    function MenuBottomController($state) {
        var vm = this;

        vm.save = save;

        function save() {
            vm.onSave();
            vm.isOpen = false;
            $state.go('mail.inbox', {mbox: 'INBOX'});
        }
    }
})();
