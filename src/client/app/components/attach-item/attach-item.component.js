(function () {
    'use strict';

    angular
        .module('app.components')
        .component('attachItem', {
            bindings: {
                attach: '=',
                message: '='
            },
            templateUrl: 'app/components/attach-item/attach-item.html',
            controller: 'AttachItemController',
            controllerAs: 'vm'
        });
})();