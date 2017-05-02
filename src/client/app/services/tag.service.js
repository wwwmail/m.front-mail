(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('tag', tag);

    tag.$inject = ['CONFIG', '$resource', '$http', '$rootScope', 'mail'];

    function tag(CONFIG, $resource, $http, $rootScope, mail) {
        var API_URL = CONFIG.APIHost + '/tag';

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
                    url: API_URL + '/:id',
                    params: {
                        'id': '@id'
                    }
                },
                destroy: {
                    method: 'DELETE',
                    url: API_URL + '/:id'
                },
                getTagsByMessage: {
                    method: 'POST',
                    url: CONFIG.APIHost + '/tagged-message/get-tags-by-message'
                },
                addTagToMessages: {
                    method: 'POST',
                    url: CONFIG.APIHost + '/tagged-message/add-tag-to-messages'
                },
                deleteTagFromMessages: {
                    method: 'POST',
                    url: CONFIG.APIHost + '/tagged-message/delete-tag-from-messages'
                }
            }
        );

        function get(params, data) {
            return resource.get(params, data).$promise;
        }

        function create(params, data) {
            return resource.create(params, data).$promise
                .then(function () {
                    $rootScope.$broadcast('tag:create:success');
                });
        }

        function update(params, data) {
            return resource.update(params, data).$promise
                .then(function () {
                    $rootScope.$broadcast('tag:update:success');
                });
        }

        function destroy(params, data) {
            return resource.destroy(params, data).$promise;
        }

        function getTagsByMessage(params, data) {
            return resource.getTagsByMessage(params, data).$promise;
        }

        function addTagToMessages(params, data) {
            return resource.addTagToMessages(params, data).$promise;
        }

        function deleteTagFromMessages(params, data) {
            return resource.deleteTagFromMessages(params, data).$promise;
        }

        function setTag(item, data) {
            var messages = angular.copy(data);

            var ids = [];

            _.forEach(messages.checked, function (messageChecked) {
                ids.push(messageChecked.number);

                var isset = false;

                if (messageChecked.tags.length) {
                    _.forEach(messageChecked.tags, function (tag) {
                        if (item.id === tag.id) {
                            isset = true;
                        }
                    });
                }

                if (!isset) {
                    _.forEach(messages.items, function (message) {
                        if (messageChecked.number === message.number) {
                            message.tags.push(item);
                        }
                    });
                }

            });

            addTagToMessages({}, {
                ids: ids,
                mbox: messages.checked[0].mbox,
                tag_id: item.id
            }).then(function (response) {
                // messages.checked = [];
            });

            messages.checked = [];

            _.forEach(messages.items, function (item) {
                _.forEach(ids, function (id) {
                    if (item.number === id) {
                        messages.checked.push(item);
                    }
                });
            });

            return messages;
        }

        function setUnTag(item, data) {
            var messages = angular.copy(data);

            var ids = [];

            _.forEach(messages.checked, function (messageChecked) {
                ids.push(messageChecked.number);

                _.forEach(messages.items, function (message) {
                    if (messageChecked.number === message.number) {
                        _.remove(message.tags, function (o) {
                            return item.id === o.id;
                        });
                    }
                });
            });

            deleteTagFromMessages({}, {
                ids: ids,
                mbox: messages.checked[0].mbox,
                tag_id: item.id
            }).then(function (response) {
                // vm.messages.checked = [];
            });

            messages.checked = [];

            _.forEach(messages.items, function (item) {
                _.forEach(ids, function (id) {
                    if (item.number === id) {
                        messages.checked.push(item);
                    }
                });
            });

            return messages;
        }

        return {
            get: get,
            create: create,
            update: update,
            destroy: destroy,
            getTagsByMessage: getTagsByMessage,
            addTagToMessages: addTagToMessages,
            deleteTagFromMessages: deleteTagFromMessages,
            setTag: setTag,
            setUnTag: setUnTag
        }
    }

})();