(function () {
    'use strict';

    angular
        .module('app.components')
        .component('dateSort', {
            bindings: {
                from: '=',
                to: '='
            },
            templateUrl: 'app/components/date-sort/date-sort.html',
            controller: 'DateSortController',
            controllerAs: 'vm'
        });
})();