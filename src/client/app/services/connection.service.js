(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('connection', connection);

    connection.$inject = ['CONFIG', '$resource', 'Upload', '$rootScope', '$auth', '$state'];

    function connection(CONFIG, $resource, Upload, $rootScope, $auth, $state) {
        var API_URL = CONFIG.APIHost + '/connection';

        var resource = $resource(API_URL,
            {},
            {
                get: {
                    method: 'GET',
                    url: API_URL
                },
                getById: {
                    method: 'GET',
                    url: API_URL
                },
                create: {
                    method: 'POST',
                    url: API_URL
                },
                update: {
                    method: 'PUT',
                    url: API_URL + '/:id'
                },
                destroy: {
                    method: 'DELETE',
                    url: API_URL + '/:id'
                }
            }
        );

        function get(params, data) {
           return resource.get(params, data).$promise
        }

        function getById(params, data) {
            return resource.getById(params, data).$promise
        }

        function create(params, data) {
            return resource.create(params, data).$promise;
        }

        function update(params, data) {
            return resource.update(params, data).$promise;
        }

        function destroy(params, data) {
            if (confirm("Вы хотите удалить ящик?")) {
               return resource.destroy(params, data).$promise;
            }
        }

        return {
            get: get,
            getById: getById,
            create: create,
            update: update,
            destroy: destroy
        }
    }

})();