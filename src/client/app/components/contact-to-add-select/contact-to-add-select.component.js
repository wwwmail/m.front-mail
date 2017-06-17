(function () {
    'use strict';

    angular
        .module('app.components')
        .component('contactToAddSelect', {
            bindings: {
                addresses: '=',
                disabled: '@?',
                placeholder: '@?',
                isAutofocus: '=?'
            },
            templateUrl: 'app/components/contact-to-add-select/contact-to-add-select.html',
            controller: 'ContactToAddSelectController',
            controllerAs: 'vm'
        });
})();