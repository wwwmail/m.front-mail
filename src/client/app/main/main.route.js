(function () {
    'use strict';

    angular
        .module('main')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'config',
                config: {
                    template: '<ui-view></ui-view>',
                    abstract: true,
                    resolve: {
                        init: function (init) {
                            console.log('init.$promise', init.$promise);
                            return init.$promise;
                        }
                    }
                }
            },
            {
                state: 'main',
                config: {
                    parent: 'config',
                    url: '/?version&token&page&compose&success',
                    controller: 'MainController',
                    controllerAs: 'vm'
                }
            }
        ];
    }
})();
