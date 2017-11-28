(function () {
    'use strict';

    angular
        .module('app.components')
        .component('folderDeleteConfirm', {
            bindings: {
                folder: '=',
                onClose: '&',
                onCancel: '&'
            },
            templateUrl: 'app/components/folder-delete-confirm/folder-delete-confirm.html',
            controller: 'FolderDeleteConfirmController',
            controllerAs: 'vm'
        });
})();