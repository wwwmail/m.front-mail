(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['$rootScope'];

    /* @ngInject */
    function HeaderController($rootScope) {
        var vm = this;
        vm.title = 'Header';

        vm.openMenu = openMenu;

        function openMenu() {
            $rootScope.isOpenMenu = !$rootScope.isOpenMenu;
        }
    }
})();
