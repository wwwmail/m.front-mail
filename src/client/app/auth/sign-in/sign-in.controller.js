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
                $state.go('home', vm.$state.params);
                return;
            }
        }

        function login() {
            console.log(vm.userForm);
            vm.userForm.isLoading = true;
            $auth.submitLogin(vm.userForm.model)
                .then(function (response) {
                    vm.userForm.isLoading = false;

                    profile.addStorageProfile(response);

                    if (!response.profile.timezone) {
                        var profileModel = {};
                        profileModel.timezone = 'Central Europe Standard Time';
                        profile.put({}, profileModel);
                    }

                    $state.go('mail.inbox', {mbox: 'INBOX'});
                })
                .catch(function (response) {
                    vm.userForm.errors = 'WRONG_LOGIN_OF_PASSWORD';
                    console.log('error', vm.userForm.errors);
                });
        }

    }
})();
