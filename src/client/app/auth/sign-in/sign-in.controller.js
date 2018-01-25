(function () {
    'use strict';

    angular
        .module('auth.signIn')
        .controller('SignInController', SignInController);

    SignInController.$inject = ['$scope', '$state', '$auth', '$cookies', 'profile', 'CONFIG'];
    /* @ngInject */
    function SignInController($scope, $state, $auth, $cookies, profile, CONFIG) {
        var vm = this;

        vm.CONFIG = CONFIG;

        vm.user = $auth.user;

        vm.userForm = {
            isLoading: false,
            isChange: false,
            model: {}
        };

        $scope.$watch('vm.userForm.model', function (data, oldData) {
            if (!_.isEqual(data, oldData)) {
                vm.userForm.errors = '';
            }
        }, true);

        vm.login = login;

        activate();

        function activate() {
            vm.$state = $state;

            if ($state.params.token) {
                $state.go('home', vm.$state.params);
                return;
            }

            if ($state.params.username) {
                vm.userForm.model.username = $state.params.username;
            }
        }

        function login() {
            vm.userForm.isLoading = true;
            $auth.submitLogin(vm.userForm.model).then(function (response) {
                vm.userForm.isLoading = false;

                profile.addStorageProfile(response);

                if (!response.profile.timezone) {
                    var profileModel = {};
                    profileModel.timezone = 'Europe/Belgrade';
                    profile.put({}, profileModel);
                }

                $state.go('mail.inbox', {mbox: 'INBOX'});

            }).catch(function (response) {
                vm.userForm.isLoading = false;
                vm.userForm.errors = 'WRONG_LOGIN_OF_PASSWORD';
                console.log('error', vm.userForm.errors);
            });
        }
    }
})();
