(function () {
    'use strict';

    angular
        .module('app.components')
        .component('spinner', {
            bindings: {},
            templateUrl: 'app/components/spinner/spinner.html',
            controller: 'SpinnerController',
            controllerAs: 'vm'
        });
})();