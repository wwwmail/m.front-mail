(function () {
    'use strict';

    angular
        .module('app.components')
        .component('userConnectionDefault', {
            bindings: {},
            templateUrl: 'app/components/user-connection-default/user-connection-default.html',
            controller: 'UserConnectionDefaultController',
            controllerAs: 'vm'
        });
})();