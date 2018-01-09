(function () {
    'use strict';

    angular
        .module('app.components')
        .component('plaqueSecure', {
            bindings: {
            },
            templateUrl: 'app/components/plaque-secure/plaque-secure.html',
            controller: 'PlaqueSecureController',
            controllerAs: 'vm'
        });
})();