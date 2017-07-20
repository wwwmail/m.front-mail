(function () {
    'use strict';

    angular
        .module('app.components')
        .component('menuBottom', {
            bindings: {
                isOpen: '=',
                onSave: '&'
            },
            templateUrl: 'app/components/menu-bottom/menu-bottom.html',
            controller: 'MenuBottomController',
            controllerAs: 'vm'
        });
})();