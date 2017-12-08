(function () {
    'use strict';

    angular
        .module('app.components')
        .component('folderClearConfirm', {
            bindings: {
                folder: '=',
                onClose: '&',
                onCancel: '&'
            },
            templateUrl: 'app/components/folder-clear-confirm/folder-clear-confirm.html',
            controller: 'FolderClearConfirmController',
            controllerAs: 'vm'
        });
})();