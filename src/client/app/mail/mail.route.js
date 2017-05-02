(function () {
    'use strict';

    angular
        .module('mail')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'mail',
                config: {
                    url: '/mail',
                    templateUrl: 'app/mail/mail.html',
                    controller: 'MailController',
                    controllerAs: 'vm',
                    resolve: {
                        auth: function ($auth, $state) {
                            return $auth.validateUser().catch(function () {
                                $state.go('signIn');
                            });
                        },
                        user: function (profile) {
                            return profile.get();
                        },
                        folder: function (mailBox) {
                            return mailBox.get();
                        },
                        tagResolve: function (tag) {
                            return tag.get();
                        }
                    }
                }
            }
        ];
    }
})();
