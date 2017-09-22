(function () {
    'use strict';

    angular
        .module('auth.signTemp')
        .controller('SignTempController', SignTempController);

    SignTempController.$inject = ['$scope', '$state', '$stateParams', '$auth', 'authService', 'profile'];
    /* @ngInject */
    function SignTempController($scope, $state, $stateParams, $auth, authService, profile) {
        var vm = this;

        vm.user = $auth.user;

        vm.userForm = {
            isLoading: false,
            isChange: false,
            model: {}
        };

        // $scope.$watch('vm.userForm.model', function (data, oldData) {
        //     if (!_.isEqual(data, oldData)) {
        //         vm.userForm.errors = '';
        //     }
        // }, true);

        vm.socialComplete = socialComplete;

        activate();

        function activate() {
            console.log('$auth', $auth);
            vm.$state = $state;
            vm.$stateParams = $stateParams;

            if ($state.params.token) {
                $state.go('home', vm.$state.params);
                return;
            }
        }

        function socialComplete() {
            var data = {
                social_id: vm.$stateParams.social_id,
                username: vm.userForm.model.username,
                agree: vm.userForm.model.agree
            };

            vm.userForm.isLoading = true;
            authService.socialComplete({}, data).then(function (response) {
                vm.userForm.isLoading = false;

                profile.addStorageProfile(response.data);

                if (!response.data.profile.timezone) {
                    var profileModel = {};
                    profileModel.timezone = 'Europe/Belgrade';
                    profile.put({}, profileModel);
                }

                $auth.setAuthHeaders({
                    "Authorization": response.data.access_token
                });

                $state.go('mail.inbox', {mbox: 'INBOX'});

            }, function (response) {
                vm.userForm.isLoading = false;
                vm.userForm.errors = response.data.data;
            });
        }
    }
})();
