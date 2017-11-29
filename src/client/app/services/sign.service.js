(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('sign', sign);

    sign.$inject = ['CONFIG', '$resource', '$http', '$translate'];

    function sign(CONFIG, $resource, $http, $translate) {
        var API_URL = CONFIG.APIHost + '/sign';

        var resource = $resource(API_URL,
            {},
            {
                get: {
                    method: 'GET',
                    url: API_URL
                },
                getById: {
                    method: 'GET',
                    url: API_URL + '/:id'
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
                destroy: {
                    method: 'DELETE',
                    url: API_URL + '/:id'
                }
            }
        );

        function get(params, data) {
            return resource.get(params, data).$promise;
        }

        function getById(params, data) {
            return resource.getById(params, data).$promise;
        }

        function post(params, data) {
            return resource.post(params, data).$promise;
        }

        function put(params, data) {
            return resource.put(params, data).$promise;
        }

        function destroy(params, data) {
            return $translate('DELETE_CAPTION').then(function (translation) {
                if (confirm(translation)) {
                    return resource.destroy(params).$promise;
                }
            });
        }

        return {
            get: get,
            getById: getById,
            post: post,
            put: put,
            destroy: destroy
        }
    }

})();