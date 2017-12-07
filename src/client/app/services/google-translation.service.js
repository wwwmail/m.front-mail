(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('googleTranslation', googleTranslation);

    googleTranslation.$inject = ['CONFIG', '$resource', '$http', '$rootScope'];

    function googleTranslation(CONFIG, $resource, $http, $rootScope) {
        var API_URL = 'https://translation.googleapis.com/language/translate/v2';

        var resource = $resource(API_URL,
            {},
            {
                get: {
                    method: 'POST',
                    url: API_URL + '/languages',
                    params: {
                        key: 'AIzaSyBS21iM34oEWnfFDeZChgMBxxchgLMSYQw'
                    }
                },
                translate: {
                    method: 'POST',
                    url: API_URL,
                    params: {
                        key: 'AIzaSyBS21iM34oEWnfFDeZChgMBxxchgLMSYQw'
                    }
                }
            }
        );

        function get(params, data) {
            return resource.get(params, data).$promise;
        }

        function translate(params, data) {
            return resource.translate(params, data).$promise;
        }

        return {
            get: get,
            translate: translate
        }
    }

})();