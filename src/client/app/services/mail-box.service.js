(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('mailBox', mailBox);

    mailBox.$inject = ['CONFIG', '$resource', '$http', '$rootScope', '$state', 'notify'];

    function mailBox(CONFIG, $resource, $http, $rootScope, $state, notify) {
        var API_URL = CONFIG.APIHost + '/mail-box';

        var cacheList = [];

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
            return resource.get(params, data).$promise
                .then(function (response) {
                    cacheList = response.data;

                    if ($state.current.name === 'mail.inbox' || $state.current.name === 'mail.message') {
                        var folder = _.find(cacheList.items, {'name': $state.params.mbox});

                        if ($state.params.filter === 'unseen') {
                            folder = {name: 'UNREAD'};
                        }

                        if ($state.params.filter === 'attach') {
                            folder = {name: 'SEARCH_IS_ATTACH'};
                        }

                        if ($state.params.filter === 'flagged') {
                            folder = {name: 'IMPORTANT'};
                        }

                        $rootScope.folder = folder;
                    }

                    return response;
                });
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
                notify.message('FOLDER_DELETED');
                $rootScope.$broadcast('mailBox:destroy:success');
            });
            // return resource.destroy(params, data).$promise;
        }

        function openLayoutFolder(data) {
            $rootScope.$broadcast('mailBox:layout:open', data);
        }

        function getCacheList() {
            return cacheList;
        }

        return {
            get: get,
            create: create,
            update: update,
            destroy: destroy,
            openLayoutFolder: openLayoutFolder,
            getCacheList: getCacheList
        }
    }

})();