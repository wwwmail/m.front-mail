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
        vm.closeMenu = closeMenu;

        function openMenu() {
            $rootScope.isOpenMenu = !$rootScope.isOpenMenu;
        }

        function closeMenu() {
            $rootScope.isOpenMenu = !$rootScope.isOpenMenu;
        }
    }
})();
