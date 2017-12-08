(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('MenuBottomController', MenuBottomController);

    MenuBottomController.$inject = ['$state', '$stateParams', 'mail'];
    /* @ngInject */
    function MenuBottomController($state, $stateParams, mail) {
        var vm = this;

        vm.save = save;
        vm.destroy = destroy;

        function save() {
            vm.onSave();
            vm.isOpen = false;
            $state.go('mail.inbox', {mbox: 'INBOX'});
        }

        function destroy() {
            vm.isOpen = false;

            if ($stateParams.id) {
                mail.destroyOne({
                    mbox: $stateParams.mbox,
                    number: $stateParams.id,
                    connection_id: $stateParams.connection_id
                });

                $state.go('mail.inbox', {mbox: 'INBOX'});
            }
        }
    }
})();
