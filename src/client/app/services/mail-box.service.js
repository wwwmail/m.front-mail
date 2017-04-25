(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('mailBox', mailBox);

    mailBox.$inject = ['CONFIG', '$resource', '$http', '$rootScope'];

    function mailBox(CONFIG, $resource, $http, $rootScope) {
        var API_URL = CONFIG.APIHost + '/mail-box';

        var resource = $resource(API_URL,
            {},
            {
                get: {
                    method: 'GET',
                    url: API_URL
                },
                create: {
                    method: 'POST',
                    url: API_URL
                },
                update: {
                    method: 'PUT',
                    url: API_URL + '/123'
                },
                delete: {
                    method: 'DELETE',
                    url: API_URL + '/123'
                }
            }
        );

        function get(params, data) {
            return resource.get(params, data).$promise;
        }

        function create(params, data) {
            return resource.create(params, data).$promise
                .then(function (response) {
                    $rootScope.$broadcast('mailBox:create:success');
                });
        }

        function update(params, data) {
            return resource.update(params, data).$promise
                .then(function (response) {
                    $rootScope.$broadcast('mailBox:update:success');
                });
        }

        function destroy(params, data) {
            return $http({
                url: API_URL + '/123',
                method: 'DELETE',
                data: data,
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                }
            }).then(function (response) {
                $rootScope.$broadcast('mailBox:destroy:success');
            });
            // return resource.destroy(params, data).$promise;
        }

        return {
            get: get,
            create: create,
            update: update,
            destroy: destroy
        }
    }

})();