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
                phone: {
                    'required': 'Введите номер'
                },
                code: {
                    'required': 'Введите код'
                },
                username: {
                    'required': 'Введите email или логин'
                }
            }
        };

        vm.send = send;
        vm.sendCode = sendCode;

        function send() {
            // console.log(vm.userForm);
            // vm.userForm.isLoading = true;
            // $auth.submitLogin(vm.userForm.model)
            //     .then(function (response) {
            //         vm.userForm.isLoading = false;
            //         $state.go('mail.inbox');
            //     })
            //     .catch(function (response) {
            //         // handle error response
            //         vm.userForm.errors = response.errors;
            //         console.log('error', vm.userForm.errors);
            //     });
        }

        function sendCode() {
            if (!vm.userForm.model.phone) return;

            var phone = '420' + vm.userForm.model.phone.replace(/\s{2,}/g, ' ');

            // console.log('vm.userForm.model.phone', phone);
            authService.sendCode({}, {phone: phone})
                .then(function (response) {
                    console.log('response', response);
                    vm.codeResult = response;
                })
                .catch(function (response) {
                    vm.userForm.errors = response.data;
                    console.log('error', response);
                });
        }
    }
})();
