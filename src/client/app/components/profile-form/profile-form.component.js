(function () {
    'use strict';

    angular
        .module('app.components')
        .component('profileForm', {
            bindings: {},
            templateUrl: 'app/components/profile-form/profile-form.html',
            controller: 'ProfileFormController',
            controllerAs: 'vm'
        });
})();