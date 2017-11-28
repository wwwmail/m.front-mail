(function () {
    'use strict';

    angular
        .module('app.components')
        .component('langList', {
            bindings: {
                messages: '=',
                onClose: '&?',
                useLang: '=?'
            },
            templateUrl: 'app/components/lang-list/lang-list.html',
            controller: 'LangListController',
            controllerAs: 'vm'
        });
})();