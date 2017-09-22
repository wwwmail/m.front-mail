(function () {
    'use strict';

    angular
        .module('app.components')
        .component('socialAuth', {
            bindings: {},
            templateUrl: 'app/components/social-auth/social-auth.html',
            controller: 'SocialAuthController',
            controllerAs: 'vm'
        });
})();