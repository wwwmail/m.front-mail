(function () {
    'use strict';

    angular
        .module('auth.passwordReset')
        .controller('PasswordResetController', PasswordResetController);

    PasswordResetController.$inject = ['$state', 'authService'];
    /* @ngInject */
    function PasswordResetController($state, authService) {
        var vm = this;

        vm.userForm = {
            isLoading: false,
            model: {},
            validations: {
                username: {
                    'required': 'ENTER_EMAIL_OR_LOGIN'
                }
            }
        };

        vm.preRequestPasswordReset = preRequestPasswordReset;

        function preRequestPasswordReset(form) {
            if (form.$invalid) return;

            var data = vm.userForm.model;

            if (data.username.split('@').length) {
                data.username = data.username.split('@')[0];
            }

            vm.userForm.isLoading = true;
            authService.preRequestPasswordReset({}, data)
                .then(function (response) {
                    vm.userForm.isLoading = false;
                    $state.go('passwordUpdate', {
                        username: vm.userForm.model.username
                    });
                }, function (response) {
                    vm.userForm.errors = response.data.data;
                });
        }
    }
})();
