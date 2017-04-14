(function () {
    'use strict';

    angular
        .module('app.components')
        .component('folderList', {
            bindings: {},
            templateUrl: 'app/components/folder-list/folder-list.html',
            controller: 'FolderListController',
            controllerAs: 'vm'
        });
})();