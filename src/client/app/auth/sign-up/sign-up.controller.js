(function () {
    'use strict';

    angular
        .module('auth.signUp')
        .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['$state', '$auth', '$timeout', 'authService'];
    /* @ngInject */
    function SignUpController($state, $auth, $timeout, authService) {
        var vm = this;

        vm.userForm = {
            isLoading: false,
            model: {
                phone: '420'
            },
            validations: {
                phone: {}
            }
        };

        vm.codeForm = {
            model: {}
        };

        vm.signUp = signUp;
        vm.sendCode = sendCode;
        vm.checkUserName = checkUserName;

        activate();

        function activate() {
            $timeout(function () {
                vm.userForm.model.phone = 420;
            }, 1250);
        }

        function signUp(form) {
            var data = angular.copy(vm.userForm.model);

            if (vm.userForm.model.phone) {
                data.phone = vm.userForm.model.phone.toString().replace(/\s{2,}/g, ' ');
            }

            $auth.submitRegistration(data)
                .then(function (response) {
                    vm.userForm.isLoading = false;
                    $state.go('mail.inbox');
                })
                .catch(function (response) {
                    vm.userForm.isLoading = false;
                    vm.userForm.errors = response.data.data;
                    vm.error = response.data.data;
                });
        }

        function sendCode() {
            var phone = vm.userForm.model.phone.replace(/\s{2,}/g, ' ');
            authService.sendCode({}, {phone: phone})
                .then(function (response) {
                    vm.codeResult = response.data;
                })
                .catch(function (response) {
                    vm.userForm.errors = response.data;
                });
        }

        function checkUserName() {
            authService.checkUserName({}, {username: vm.userForm.model.username}).then(function (response) {
                _.forEach(vm.userForm.errors, function (item, index) {
                    console.log('item', item, index);
                    if (item.field === 'username') {
                        vm.userForm.errors[0] = {};
                    }
                });
            }).catch(function (response) {
                vm.userForm.isLoading = false;
                vm.userForm.errors = _.assign(vm.userForm.errors, response.data.data);
            });
        }
    }
})();
