(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('authService', authService);

    authService.$inject = ['$http', '$q', 'CONFIG', '$resource', '$window'];

    function authService($http, $q, CONFIG, $resource, $window) {
        var API_URL = CONFIG.APIHost + '/auth';

        var resource = $resource(API_URL,
            {},
            {
                sendCode: {
                    method: 'POST',
                    url: API_URL + '/send-code'
                },
                checkUserName: {
                    method: 'POST',
                    url: API_URL + '/check-user-name'
                }
            }
        );

        function sendCode(params, data) {
            return resource.sendCode(params, data).$promise;
        }

        function checkUserName(params, data) {
            return resource.checkUserName(params, data).$promise;
        }

        return {
            sendCode: sendCode,
            checkUserName: checkUserName
        }
    }

})();