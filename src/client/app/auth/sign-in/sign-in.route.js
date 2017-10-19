(function () {
    'use strict';

    angular
        .module('auth.signIn')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'signIn',
                config: {
                    url: '/sign-in?token&compose',
                    templateUrl: 'app/auth/sign-in/sign-in.html',
                    controller: 'SignInController',
                    controllerAs: 'vm',
                    title: 'Войти',
                    resolve: {
                        configResolve: function (config) {
                            return config.getIndex();
                        }
                    }
                }
            },
            {
                state: 'logout',
                config: {
                    url: '/logout',
                    onEnter: function ($auth, $state) {
                        $auth.signOut();
                        $state.go('signIn');
                    }
                }
            }
        ];
    }
})();
