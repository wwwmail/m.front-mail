(function () {
    'use strict';

    angular
        .module('app.components')
        .component('folderCreate', {
            bindings: {
                onСlose: '&'
            },
            templateUrl: 'app/components/folder-create/folder-create.html',
            controller: 'FolderCreateController',
            controllerAs: 'vm'
        });
})();