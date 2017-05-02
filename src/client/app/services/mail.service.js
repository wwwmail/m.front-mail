(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('mail', mail);

    mail.$inject = ['CONFIG', '$resource', '$http'];

    function mail(CONFIG, $resource, $http) {
        var API_URL = CONFIG.APIHost + '/mail';

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
                move: {
                    method: 'POST',
                    url: CONFIG.APIHost + '/mails/move'
                },
                destroy: {
                    method: 'DELETE',
                    url: API_URL + '/:id',
                    hasBody: true,
                    params: {
                        id: '@id'
                    }
                },
                flag: {
                    method: 'POST',
                    url: CONFIG.APIHost + '/mails/flag'
                },
                deflag: {
                    method: 'POST',
                    url: CONFIG.APIHost + '/mails/deflag'
                }
            }
        );

        // var messages = [];

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

        function move(params, data) {
            return resource.move(params, data).$promise;
        }

        function flag(params, data) {
            return resource.flag(params, data).$promise;
        }

        function deflag(params, data) {
            return resource.deflag(params, data).$promise;
        }

        function destroy(params, data) {
            return $http({
                url: API_URL + '/' + data.id,
                method: 'DELETE',
                data: data,
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                }
            });
            // return resource.destroy(params, data).$promise;
        }

        function setSeen(data) {
            var messages = angular.copy(data);

            if (messages.isLoading || !messages.checked.length) return;

            var ids = [];

            _.forEach(messages.checked, function (checked) {
                ids.push(checked.number);
                _.forEach(messages.items, function (item) {
                    if (checked.number == item.number) {
                        item.seen = true;
                    }
                });
            });

            messages.checked = [];

            _.forEach(messages.items, function (item) {
                _.forEach(ids, function (id) {
                    if (item.number === id) {
                        messages.checked.push(item);
                    }
                });
            });

            messages.isLoading = true;

            flag({}, {
                ids: ids,
                flag: 'Seen'
            }).then(function (response) {
                messages.isLoading = false;
            });

            return messages;
        }

        function setUnSeen(data) {
            var messages = angular.copy(data);

            if (messages.isLoading || !messages.checked.length) return;

            var ids = [];

            _.forEach(messages.checked, function (checked) {
                ids.push(checked.number);
                _.forEach(messages.items, function (item) {
                    if (checked.number == item.number) {
                        item.seen = false;
                    }
                });
            });

            messages.checked = [];

            _.forEach(messages.items, function (item) {
                _.forEach(ids, function (id) {
                    if (item.number === id) {
                        messages.checked.push(item);
                    }
                });
            });

            messages.isLoading = true;

            deflag({}, {
                ids: ids,
                flag: 'Seen'
            }).then(function (response) {
                messages.isLoading = false;
            });

            return messages;
        }

        function setImportant(data) {
            var messages = angular.copy(data);

            if (messages.isLoading || !messages.checked.length) return;

            var ids = [];

            _.forEach(messages.checked, function (checked) {
                ids.push(checked.number);
                _.forEach(messages.items, function (item) {
                    if (checked.number == item.number) {
                        item.important = true;
                    }
                });
            });

            messages.checked = [];

            _.forEach(messages.items, function (item) {
                _.forEach(ids, function (id) {
                    if (item.number === id) {
                        messages.checked.push(item);
                    }
                });
            });

            messages.isLoading = true;

            flag({}, {
                ids: ids,
                flag: 'Flagged'
            }).then(function (response) {
                messages.isLoading = false;
            });

            return messages;
        }

        function setUnImportant(data) {
            var messages = angular.copy(data);

            if (messages.isLoading || !messages.checked.length) return;

            var ids = [];

            _.forEach(messages.checked, function (checked) {
                ids.push(checked.number);
                _.forEach(messages.items, function (item) {
                    if (checked.number == item.number) {
                        item.important = false;
                    }
                });
            });

            messages.checked = [];

            _.forEach(messages.items, function (item) {
                _.forEach(ids, function (id) {
                    if (item.number === id) {
                        messages.checked.push(item);
                    }
                });
            });

            messages.isLoading = true;

            deflag({}, {
                ids: ids,
                flag: 'Flagged'
            }).then(function (response) {
                messages.isLoading = false;
            });

            return messages;
        }

        return {
            get: get,
            post: post,
            put: put,
            getById: getById,
            move: move,
            destroy: destroy,
            flag: flag,
            deflag: deflag,
            setSeen: setSeen,
            setUnSeen: setUnSeen,
            setImportant: setImportant,
            setUnImportant: setUnImportant
        }
    }

})();