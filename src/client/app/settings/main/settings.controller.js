(function () {
    'use strict';

    angular
        .module('settings.main')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = [];
    /* @ngInject */
    function SettingsController() {
        var vm = this;
    }
})();
