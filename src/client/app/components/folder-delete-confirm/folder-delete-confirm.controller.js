(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('FolderDeleteConfirmController', FolderDeleteConfirmController);

    FolderDeleteConfirmController.$inject = [];
    /* @ngInject */
    function FolderDeleteConfirmController() {
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
