(function () {
    'use strict';

    angular
        .module('marketing.home')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$auth', '$state', '$stateParams', 'profile'];
    /* @ngInject */
    function HomeController($auth, $state, $stateParams, profile) {
        var vm = this;

        activate();

        ////

        function activate() {
            var params = {};

            if ($stateParams.compose) {
                params.compose = $state.params.compose
            }

            if ($stateParams.page) {
                $state.go($stateParams.page, params);
                return;
            }

            if ($stateParams.token) {
                $auth.setAuthHeaders({
                    "Authorization": 'Bearer ' + $stateParams.token
                });

                $auth.validateUser().then(function (response) {
                    profile.addStorageProfile(response);
                });

                $state.go('mail.inbox', {mbox: 'INBOX'});

                return;
            }

            params.mbox = 'INBOX';

            $state.go('mail.inbox', params);
        }
    }
})();
