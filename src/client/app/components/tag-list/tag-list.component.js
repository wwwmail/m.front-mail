(function () {
    'use strict';

    angular
        .module('app.components')
        .component('tagList', {
            bindings: {},
            templateUrl: 'app/components/tag-list/tag-list.html',
            controller: 'TagListController',
            controllerAs: 'vm'
        });
})();