(function () {
    'use strict';

    angular
        .module('auth.signIn')
        .controller('SignInController', SignInController);

    SignInController.$inject = ['$state', '$auth'];
    /* @ngInject */
    function SignInController($state, $auth) {
        var vm = this;

        vm.userForm = {
            isLoading: false,
            model: {}
        };

        vm.login = login;

        function login() {
            console.log(vm.userForm);
            vm.userForm.isLoading = true;
            $auth.submitLogin(vm.userForm.model)
                .then(function (response) {
                    vm.userForm.isLoading = false;
                    $state.go('mail.inbox');
                })
                .catch(function (response) {
                    // handle error response
                    vm.userForm.errors = response.errors;
                    console.log('error', vm.userForm.errors);
                });
        }

    }
})();
