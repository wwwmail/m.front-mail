(function () {
    'use strict';

    angular
        .module('app.components')
        .component('folderEdit', {
            bindings: {
                model: '=',
                onСlose: '&'
            },
            templateUrl: 'app/components/folder-edit/folder-edit.html',
            controller: 'FolderEditController',
            controllerAs: 'vm'
        });
})();