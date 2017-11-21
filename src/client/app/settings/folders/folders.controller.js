(function () {
    'use strict';

    angular
        .module('settings.folders')
        .controller('FoldersController', FoldersController);

    FoldersController.$inject = ['$translatePartialLoader', '$translate'];
    /* @ngInject */
    function FoldersController($translatePartialLoader, $translate) {
        var vm = this;

        $translatePartialLoader.addPart('settings');
        $translate.refresh();
    }
})();
