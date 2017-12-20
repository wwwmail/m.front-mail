(function () {
    'use strict';

    angular
        .module('app.components')
        .component('alertMessage', {
            bindings: {
            },
            templateUrl: 'app/components/alert-message/alert-message.html',
            controller: 'AlertMessageController',
            controllerAs: 'vm'
        });
})();