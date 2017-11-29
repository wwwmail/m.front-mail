(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('sieve', sieve);

    sieve.$inject = ['CONFIG', '$resource', '$http'];

    function sieve(CONFIG, $resource, $http) {
        var API_URL = CONFIG.APIHost + '/sieve';

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
                put: {
                    method: 'PUT',
                    url: API_URL + '/:id',
                    params: {
                        id: '@id'
                    }
                },
                getById: {
                    method: 'GET',
                    url: API_URL + '/:id'
                },
                destroy: {
                    method: 'DELETE',
                    url: API_URL + '/:id',
                    hasBody: true,
                    params: {
                        id: '@id'
                    }
                }
            }
        );

        function post(params, data) {
            return resource.post(params, data).$promise;
        }

        function get(params, data) {
            return resource.get(params, data).$promise;
        }

        function put(params, data) {
            return resource.put(params, data).$promise;
        }

        function getById(params, data) {
            return resource.getById(params, data).$promise;
        }

        function destroy(params, data) {
            if (confirm('Удалить правило?')) {
                return resource.destroy(params).$promise;
            }
        }

        return {
            get: get,
            post: post,
            put: put,
            getById: getById,
            destroy: destroy
        }
    }

})();