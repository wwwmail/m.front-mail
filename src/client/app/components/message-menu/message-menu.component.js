(function () {
    'use strict';

    angular
        .module('app.components')
        .component('messageMenu', {
            bindings: {
                messages: '='
            },
            templateUrl: 'app/components/message-menu/message-menu.html',
            controller: 'MessageMenuController',
            controllerAs: 'vm'
        });
})();