(function () {
    'use strict';

    angular
        .module('settings.ruleAdd')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'settings.ruleAdd',
                config: {
                    url: '/rule-add?id&subject&email&folder',
                    templateUrl: 'app/settings/rule-add/rule-add.html',
                    controller: 'RuleAddController',
                    controllerAs: 'vm',
                    title: 'Rules'
                }
            }
        ];
    }
})();
