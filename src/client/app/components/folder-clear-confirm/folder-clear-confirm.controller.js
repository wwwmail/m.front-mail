(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('FolderClearConfirmController', FolderClearConfirmController);

    FolderClearConfirmController.$inject = [];
    /* @ngInject */
    function FolderClearConfirmController() {
        var vm = this;

        vm.close = close;
        vm.cancel = cancel;

        activate();

        function activate() {
        }

        function close() {
            vm.onClose();
        }

        function cancel() {
            vm.onCancel();
        }
    }
})();
