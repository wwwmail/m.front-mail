(function () {
    'use strict';

    angular
        .module('auth.passwordUpdate')
        .controller('PasswordUpdateController', PasswordUpdateController);

    PasswordUpdateController.$inject = ['$state', '$auth', '$timeout', 'CONFIG', 'configResolve'];
    /* @ngInject */
    function PasswordUpdateController($state, $auth, $timeout, CONFIG, configResolve) {
        var vm = this;

        vm.codes = {
            list: [
                {
                    name: '+420',
                    value: 420
                },
                {
                    name: '+421',
                    value: 421
                }
            ]
        };

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

        activate();

        ////

        function activate() {
            vm.username = $state.params.username;

            configResolve.$promise.then(function (response) {
                if (response.data.phoneCode) {
                    $timeout(function () {
                        vm.userForm.model.phoneCode = parseInt(response.data.phoneCode);
                    });
                }
            });
        }

        function requestPasswordReset() {
            var data = {
                username: vm.username
            };

            if (vm.userForm.model.email) {
                data.email = vm.userForm.model.email;
            }

            if (vm.userForm.model.phone) {
                data.phone = vm.userForm.model.phoneCode + '' + vm.userForm.model.phone;
            }

            vm.userForm.isLoading = true;
            $auth.requestPasswordReset(data)
                .then(function (response) {
                    vm.userForm.isLoading = false;
                    vm.step = 2;
                })
                .catch(function (response) {
                    vm.passwordResetForm.errors = response.data.data;
                });
        }

        function resetPassword() {
            vm.userForm.model.username = $state.params.username;
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
