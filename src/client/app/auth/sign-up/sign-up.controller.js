(function () {
    'use strict';

    angular
        .module('auth.signUp')
        .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['$state', '$auth', '$timeout', '$translate', 'authService', 'profile', 'CONFIG', 'configResolve'];

    /* @ngInject */
    function SignUpController($state, $auth, $timeout, $translate, authService, profile, CONFIG, configResolve) {
        var vm = this;

        vm.lang = '';

        vm.CONFIG = CONFIG;

        vm.isAdditionalEmail = false;

        vm.code_country = {
            name: '+386',
                    value: 386
        };
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

        vm.userForm = {
            isLoading: false,
            model: {},
            validations: {
                phone: {},
                password: {
                    'passwordVerify': 'PASSWORDS_HAVE_BE_SAME'
                },
                passwordConf: {
                    'passwordVerify': 'PASSWORDS_HAVE_BE_SAME'
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

        ////

        function activate() {
            $timeout(function () {
                vm.lang = $translate.use();
            }, 250);

            configResolve.$promise.then(function (response) {
//                if (response.data.phoneCode) {
//                    $timeout(function () {
//                        vm.userForm.model.phone = parseInt(response.data.phoneCode);
//                    });
//                }
            });
        }

        function signUp() {
            var data = angular.copy(vm.userForm.model);
            
            console.log(data); return false;

            if (vm.userForm.model.phone) {
                data.phone = vm.userForm.model.phone.toString().replace(/\s{2,}/g, ' ');
                data.code_country = vm.userForm.model.code_country.toString();
                data.phone = data.code_country + data.phone;
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

                    profile.addStorageProfile(response.data.data);

                    if (!response.data.data.profile.timezone) {
                        var profileModel = {};
                        profileModel.timezone = 'Europe/Belgrade';
                        profile.put({}, profileModel);
                    }

                    $auth.setAuthHeaders({
                        "Authorization": response.data.data.access_token
                    });

                    $state.go('mail.inbox', {mbox: 'INBOX', forceFetch: true});
                })
                .catch(function (response) {
                    vm.userForm.isLoading = false;
                    vm.userForm.errors = response.data.data;
                    vm.error = response.data.data;
                });
        }

        function sendCode() {
            var phone = vm.userForm.model.phone.replace(/\s{2,}/g, ' ');
            
            var code = vm.userForm.model.code_country;
            
            phone = code + phone;
          
            authService.sendCode({}, {phone: phone})
                .then(function (response) {
                    vm.codeResult = response.data;
                })
                .catch(function (response) {
                    vm.userForm.errors = response.data.data;
                });
        }

        function checkUserName() {
            authService.checkUserName({}, {username: vm.userForm.model.username})
                .then(function (response) {
                    _.forEach(vm.userForm.errors, function (item, index) {
                        // console.log('item', item, index);
                        if (item.field === 'username') {
                            vm.userForm.errors[0] = {};
                        }
                    });
                })
                .catch(function (response) {
                    vm.userForm.isLoading = false;
                    vm.userForm.errors = _.assign(vm.userForm.errors, response.data.data);
                });
        }
    }
})();
