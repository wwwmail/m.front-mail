(function () {
    'use strict';

    angular
        .module('app.components')
        .component('userSignatures', {
            bindings: {},
            templateUrl: 'app/components/user-signatures/user-signatures.html',
            controller: 'UserSignaturesController',
            controllerAs: 'vm'
        });
})();