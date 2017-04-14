(function () {
    'use strict';

    angular
        .module('app.components')
        .component('tagCreate', {
            bindings: {},
            templateUrl: 'app/components/tag-create/tag-create.html',
            controller: 'TagCreateController',
            controllerAs: 'vm'
        });
})();