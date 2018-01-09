(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('PlaqueSecureController', PlaqueSecureController);

    PlaqueSecureController.$inject = ['$auth', '$state'];
    /* @ngInject */
    function PlaqueSecureController($auth, $state) {
        var vm = this;

        vm.isRouteResolved = isRouteResolved;

        activate();

        ////

        function activate() {
            vm.$auth = $auth;
            vm.$state = $state;
            console.log('vm.$state', vm.$state.current);
            console.log('vm.$auth', vm.$auth.user);
        }

        function isRouteResolved() {
            if (vm.$state.current.name === 'signIn' || vm.$state.current.name === 'signUp' ||
                vm.$state.current.name === 'signTemp' || vm.$state.current.name === 'passwordUpdate' ||
                vm.$state.current.name === 'passwordReset') {
                return false;
            }
            return true;
        }
    }
})();
