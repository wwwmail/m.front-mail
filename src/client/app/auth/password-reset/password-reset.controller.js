(function () {
    'use strict';

    angular
        .module('auth.passwordReset')
        .controller('PasswordResetController', PasswordResetController);

    PasswordResetController.$inject = ['$state', '$auth', 'authService'];
    /* @ngInject */
    function PasswordResetController($state, $auth, authService) {
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

        vm.requestPasswordReset = requestPasswordReset;

        function requestPasswordReset(form) {
            if (form.$invalid) return;

            var data = vm.userForm.model;

            if (data.username.split('@').length) {
                data.username = data.username.split('@')[0];
            }

            vm.userForm.isLoading = true;
            $auth.requestPasswordReset(data)
                .then(function (response) {
                    vm.userForm.isLoading = false;
                    $state.go('passwordUpdate', {
                        username: vm.userForm.model.username
                    });
                })
                .catch(function (response) {
                    // handle error response
                    vm.userForm.errors = response.data.data;
                    console.log('error', vm.userForm.errors);
                });
        }

        // function sendCode() {
        //     if (!vm.userForm.model.phone) return;
        //
        //     var phone = '420' + vm.userForm.model.phone.replace(/\s{2,}/g, ' ');
        //
        //     // console.log('vm.userForm.model.phone', phone);
        //     authService.sendCode({}, {phone: phone})
        //         .then(function (response) {
        //             console.log('response', response);
        //             vm.codeResult = response;
        //         })
        //         .catch(function (response) {
        //             vm.userForm.errors = response.data;
        //             console.log('error', response);
        //         });
        // }
    }
})();
