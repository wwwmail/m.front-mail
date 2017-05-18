(function () {
    'use strict';

    angular
        .module('app.components')
        .component('folderLayout', {
            bindings: {
                messages: '='
            },
            templateUrl: 'app/components/folder-layout/folder-layout.html',
            controller: 'FolderLayoutController',
            controllerAs: 'vm'
        });
})();