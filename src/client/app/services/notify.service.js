(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('notify', notify);

    notify.$inject = ['$rootScope'];

    function notify($rootScope) {

        function message(message) {
            $rootScope.$broadcast('notify:alert', {
                message: message
            });
        }

        return {
            message: message
        }
    }

})();