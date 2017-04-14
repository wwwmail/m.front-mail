(function () {
    'use strict';

    angular
        .module('app.layout')
        .component('header', {
            bindings: {},
            templateUrl: 'app/layout/header/header.html',
            controller: 'HeaderController',
            controllerAs: 'vm'
        });
})();