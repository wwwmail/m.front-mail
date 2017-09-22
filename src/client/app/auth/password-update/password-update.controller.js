(function () {
    'use strict';

    angular
        .module('auth.passwordUpdate')
        .controller('PasswordUpdateController', PasswordUpdateController);

    PasswordUpdateController.$inject = ['$state', '$auth'];
    /* @ngInject */
    function PasswordUpdateController($state, $auth) {
        var vm = this;

        vm.step = 1;

        vm.passwordResetForm = {
            isLoading: false,
            model: {},
            validations: {
                // mail_or_phone: {
                //     'required': 'Введите Телефон или e-mail:(нужен_перевод)'
                // }
            }
        };

        vm.userForm = {
            isLoading: false,
            model: {},
            validations: {
                code: {
                    'required': 'INPUT_PLACEHOLDER_ENTER_SMS_CODE'
                },
                newpassword: {
                    'required': 'INPUT_PLACEHOLDER_ENTER_NEW_PASSWORD'
                },
                passwordConf: {
                    'required': 'INPUT_PLACEHOLDER_CONFIRM_NEW_PASSWORD'
                }
            }
        };

        vm.requestPasswordReset = requestPasswordReset;
        vm.resetPassword = resetPassword;
        vm.isEmail = isEmail;

        ////

        activate();

        function activate() {
            vm.username = $state.params.username;
        }

        function requestPasswordReset(form) {
            // if (form.$invalid) return;

            vm.passwordResetForm.model.username = vm.username;

            vm.userForm.isLoading = true;
            $auth.requestPasswordReset(vm.passwordResetForm.model)
                .then(function (response) {
                    vm.userForm.isLoading = false;

                    vm.step = 2;
                })
                .catch(function (response) {
                    vm.passwordResetForm.errors = response.data.data;
                });
        }

        function resetPassword() {
            if (userForm.$invalid) return;
            vm.userForm.model.username = $state.params.username;
            console.log(vm.userForm);
            vm.userForm.isLoading = true;
            $auth.updatePassword(vm.userForm.model)
                .then(function (response) {
                    vm.userForm.isLoading = false;
                    $state.go('signIn');
                })
                .catch(function (response) {
                    vm.userForm.errors = response.data.data;
                    vm.error = response.data.data;
                });
        }

        function isEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
    }
})();
