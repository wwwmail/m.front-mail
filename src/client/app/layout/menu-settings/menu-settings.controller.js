(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('MenuSettingsController', MenuSettingsController);

    MenuSettingsController.$inject = [];

    /* @ngInject */
    function MenuSettingsController() {
        var vm = this;
        vm.title = 'Menu';
    }
})();
