(function () {
    'use strict';

    angular
        .module('mail')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['$rootScope'];
    /* @ngInject */
    function SettingsController($rootScope) {
        var vm = this;

        vm.closeSettingsMenu = closeSettingsMenu;

        activate();

        function activate() {
        }

        function closeSettingsMenu() {
            $rootScope.isOpenSettingsMenu = false;
        }
    }
})();
