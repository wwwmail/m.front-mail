(function () {
    'use strict';

    angular
        .module('app.components')
        .component('timeSend', {
            bindings: {},
            templateUrl: 'app/components/time-send/time-send.html',
            controller: 'TimeSendController',
            controllerAs: 'vm'
        });
})();