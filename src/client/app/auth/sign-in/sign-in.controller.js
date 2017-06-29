(function () {
    'use strict';

    angular
        .module('auth.signIn')
        .controller('SignInController', SignInController);

    SignInController.$inject = ['$scope', '$state', '$auth', 'profile'];
    /* @ngInject */
    function SignInController($scope, $state, $auth, profile) {
        var vm = this;

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
                signWidthToken();
            }
        }

        function signWidthToken() {
            vm.isTokenAuthLoading = true;

            $auth.setAuthHeaders({
                "Authorization": "Bearer " + $state.params.token
            });

            $auth.validateUser().then(function() {
                if ($state.params.compose) {
                    $state.go('mail.compose');
                }

                if (!$state.params.compose) {
                    $state.go('mail.inbox', {mbox: 'INBOX'});
                }
            });
        }

        function login() {
            console.log(vm.userForm);
            vm.userForm.isLoading = true;
            $auth.submitLogin(vm.userForm.model)
                .then(function (response) {
                    vm.userForm.isLoading = false;

                    profile.addStorageProfile(response);

                    $state.go('mail.inbox', {mbox: 'INBOX'});
                })
                .catch(function (response) {
                    vm.userForm.errors = 'WRONG_LOGIN_OF_PASSWORD';
                    console.log('error', vm.userForm.errors);
                });
        }

    }
})();
