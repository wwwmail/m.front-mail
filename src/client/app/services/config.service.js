(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('config', config);

    config.$inject = ['CONFIG', '$timeout', '$resource', '$http', '$rootScope', '$state', 'Upload', 'localStorageService'];

    function config(CONFIG, $timeout, $resource, $http, $rootScope, $state, Upload, localStorageService) {
        var API_URL = CONFIG.APIHost + '/mailclient/config';

        var configObj = undefined;

        var resource = $resource(API_URL,
            {},
            {
                getIndex: {
                    method: 'GET',
                    url: API_URL
                }
            }
        );

        function getIndex(params, data) {
            return resource.getIndex(params, data).$promise
                .then(function (response) {
                    configObj = response.data;
                    return response;
                });
        }

        function getConfig() {
            return configObj;
        }

        return {
            getIndex: getIndex,
            getConfig: getConfig
        }
    }

})();