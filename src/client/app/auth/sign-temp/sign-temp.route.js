(function () {
    'use strict';

    angular
        .module('auth.signTemp')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'signTemp',
                config: {
                    url: '/sign-temp?social_id&success',
                    templateUrl: 'app/auth/sign-temp/sign-temp.html',
                    controller: 'SignTempController',
                    controllerAs: 'vm',
                    title: 'Подтверждение пользователя'
                }
            }
        ];
    }
})();
