(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('SocialAuthController', SocialAuthController);

    SocialAuthController.$inject = ['$auth', 'CONFIG'];
    /* @ngInject */
    function SocialAuthController($auth, CONFIG) {
        var vm = this;

        ////

        activate();

        function activate() {
            vm.user = $auth.user;
            vm.CONFIG = CONFIG;
        }
    }
})();
