(function () {
    'use strict';

    angular
        .module('auth.signUp')
        .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['$state', '$auth', '$timeout', 'authService', 'profile', 'CONFIG'];
    /* @ngInject */
    function SignUpController($state, $auth, $timeout, authService, profile, CONFIG) {
        var vm = this;

        vm.CONFIG = CONFIG;

        vm.isAdditionalEmail = true;

        vm.userForm = {
            isLoading: false,
            model: {
                phone: '420'
            },
            validations: {
                phone: {},
                password: {
                    'password-verify': 'Введенные пароли не совпадают'
                },
                passwordConf: {
                    'password-verify': 'Введенные пароли не совпадают'
                }
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

        function signUp() {
            var data = angular.copy(vm.userForm.model);

            if (vm.userForm.model.phone) {
                data.phone = vm.userForm.model.phone.toString().replace(/\s{2,}/g, ' ');
            }

            if (vm.isAdditionalEmail) {
                data.phone = undefined;
                data.code = undefined;
            }

            if (!vm.isAdditionalEmail) {
                data.email = undefined;
            }

            vm.userForm.isLoading = true;

            $auth.submitRegistration(data)
                .then(function (response) {
                    vm.userForm.isLoading = false;
                    // $state.go('signIn');
                    console.log('response', response);

                    profile.addStorageProfile(response.data.data);

                    if (!response.data.data.profile.timezone) {
                        var profileModel = {};
                        profileModel.timezone = 'Europe/Belgrade';
                        profile.put({}, profileModel);
                    }

                    $auth.setAuthHeaders({
                        "Authorization": response.data.data.access_token
                    });

                    $state.go('mail.inbox', {mbox: 'INBOX'});
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
                    vm.userForm.errors = response.data.data;
                    console.log('error', response);
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
