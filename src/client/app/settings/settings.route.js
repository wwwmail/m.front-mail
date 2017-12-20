(function () {
    'use strict';

    angular
        .module('settings')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'settings',
                config: {
                    parent: 'config',
                    url: '/settings',
                    templateUrl: 'app/settings/settings.html',
                    controller: 'SettingsController',
                    controllerAs: 'vm',
                    resolve: {
                        auth: function ($auth, $state) {
                            return $auth.validateUser().catch(function () {
                                $state.go('signIn');
                            });
                        },
                        configResolve: function (config) {
                            return config.getIndex();
                        }
                        // user: function (profile) {
                        //     return profile.get();
                        // }
                    }
                }
            }
        ];
    }
})();
