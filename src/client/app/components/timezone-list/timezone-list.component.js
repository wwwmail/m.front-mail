(function () {
    'use strict';

    angular
        .module('app.components')
        .component('timezoneList', {
            bindings: {
                messages: '=',
                onClose: '&?'
            },
            templateUrl: 'app/components/timezone-list/timezone-list.html',
            controller: 'TimezoneListController',
            controllerAs: 'vm'
        });
})();