(function () {
    'use strict';

    angular
        .module('marketing.home')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$state'];
    /* @ngInject */
    function HomeController($state) {
        var vm = this;
        
        function activate() {
            if ($state.params.desktop) {
                $state.go('signIn', {token: $state.params.token});
            }
        }
    }
})();
