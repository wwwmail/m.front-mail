(function () {
    'use strict';

    angular
        .module('app.components')
        .component('attachItem', {
            bindings: {
                index: '=',
                attach: '=',
                message: '=',
                attachments: '='
            },
            templateUrl: 'app/components/attach-item/attach-item.html',
            controller: 'AttachItemController',
            controllerAs: 'vm'
        });
})();