(function () {
    'use strict';

    angular
        .module('marketing.home')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'home',
                config: {
                    url: '/?version&token&page&compose',
                    controller: 'HomeController',
                    controllerAs: 'vm',
                    onEnter: function ($auth, $state) {
                        if ($state.params.token) {
                            $auth.setAuthHeaders({
                                "Authorization": "Bearer " + $state.params.token
                            });

                            $auth.validateUser().then(function() {
                                var params = {};

                                if ($state.params.compose) {
                                    $state.go('mail.compose', params);
                                    return;
                                }

                                if ($state.params.page) {
                                    $state.go($state.params.page, params);
                                    return;
                                }

                                params.mbox = 'INBOX';

                                $state.go('mail.inbox', params);
                            }, function () {
                                $state.go('mail.inbox', {mbox: 'INBOX'});
                            });
                            return;
                        }

                        $state.go('mail.inbox', {mbox: 'INBOX'});
                    }
                }
            }
        ];
    }
})();
