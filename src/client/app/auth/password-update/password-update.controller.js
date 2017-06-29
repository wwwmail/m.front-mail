(function () {
    'use strict';

    angular
        .module('auth.passwordUpdate')
        .controller('PasswordUpdateController', PasswordUpdateController);

    PasswordUpdateController.$inject = ['$state', '$auth'];
    /* @ngInject */
    function PasswordUpdateController($state, $auth) {
        var vm = this;

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

        vm.resetPassword = resetPassword;

        activate();

        function activate() {
            // alert($state.params.username);
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
                    // handle error response
                    vm.userForm.errors = response.data.data;
                    console.log('error', vm.userForm.errors);
                });
        }

    }
})();
