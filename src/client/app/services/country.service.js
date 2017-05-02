(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('country', country);

    country.$inject = ['$resource'];

    function country($resource) {
        var API_URL = '/json/countries.json';

        var resource = $resource(API_URL,
            {},
            {
                get: {
                    method: 'GET',
                    url: API_URL,
                    isArray: true
                }
            }
        );

        function get(params, data) {
            return resource.get(params, data).$promise;
        }

        return {
            get: get
        }
    }

})();