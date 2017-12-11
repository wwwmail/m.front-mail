(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('wb', wb);

    wb.$inject = ['CONFIG', '$resource', '$http'];

    function wb(CONFIG, $resource, $http) {
        var API_URL = CONFIG.APIHost + '/wb';

        var resource = $resource(API_URL,
            {},
            {
                get: {
                    method: 'GET',
                    url: API_URL
                },
                post: {
                    method: 'POST',
                    url: API_URL
                },
                destroy: {
                    method: 'POST',
                    url: API_URL + '/delete'
                }
            }
        );

        function get(params, data) {
            return resource.get(params, data).$promise;
        }

        function post(params, data) {
            return resource.post(params, data).$promise;
        }

        function destroy(params, data) {
            return resource.destroy(params, data).$promise;
        }

        return {
            get: get,
            post: post,
            destroy: destroy
        }
    }

})();