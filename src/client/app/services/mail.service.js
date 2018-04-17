(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('mail', mail);

    mail.$inject = ['CONFIG', '$resource', '$http', '$rootScope', 'localStorageService', 'Upload', '$state', 'wb'];

    function mail(CONFIG, $resource, $http, $rootScope, localStorageService, Upload, $state, mb) {
        var API_URL = CONFIG.APIHost + '/mail';

        var answerData = {};

        var fwdData = {};

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
                },
                deleteAll: {
                    method: 'POST',
                    url: CONFIG.APIHost + '/mails/delete-all'
                }
            }
        );

        function post(params, data) {
            return resource.post(params, data).$promise
                .then(function (response) {
                    console.log('params', data);
                    if (data.cmd === 'send') {
                        $rootScope.$broadcast('mail:send:success');
                    }
                    return response;
                });
        }

        function get(params, data) {
            return resource.get(params, data).$promise;
        }

        function put(params, data) {
            return resource.put(params, data).$promise;
        }

        function upload(params, data, files) {
            var formattedData = {
                id: params.id,
                mbox: params.mbox
            };

            _.forEach(files, function (file, i) {
                var name = 'file' + i;
                formattedData[name] = file;
            });

            if (params.id) {
                formattedData.id = params.id;
            }

            return Upload.upload({
                url: CONFIG.APIHost + '/mails/add-attach',
                data: formattedData
            });
        }

        function getById(params, data) {
            return resource.getById(params, data).$promise;
        }

        function move(params, data) {
            return resource.move(params, data).$promise
                .then(function (response) {
                    if (data.mboxnew === 'Junk') {
                        _.forEach(response.data, function (message) {
                            if (message.mbox !== 'Junk') {
                                wb.post({}, {
                                    email: message.fromAddress,
                                    list: 'B'
                                });
                                console.log('message', message);
                            }
                        });
                    }

                    if (data.mbox !== 'Junk') {
                        _.forEach(response.data, function (message) {
                            if (message.mbox === 'Junk') {
                                wb.destroy({}, {
                                    email: message.fromAddress,
                                    list: 'B'
                                });
                                console.log('message', message);
                            }
                        });
                    }

                    return response;
                });
        }

        function moveToFolder(folder, data) {
            var messages = angular.copy(data);

            if (messages.isLoading || !messages.checked.length) return;

            // console.log('folder', folder.caption);

            // $rootScope.$broadcast('notify:message', {
            //     message: (messages.checked.length > 1 ? 'Письма' : 'Письмо') + ' ' + (messages.checked.length > 1 ? 'перемещены' : 'перемещено') + ' в папку <strong>' + folder.caption + '</strong>'
            // });

            $rootScope.$broadcast('notify:message', {
                message: (messages.checked.length > 1 ? 'LETTERS_MOVED_TO_A_FOLDER' : 'LETTER_MOVED_TO_A_FOLDER'),
                folder: folder
            });

            move({}, {
                messages: filterMessage(messages.checked),
                mboxnew: folder.name
            }).then(function () {
                $rootScope.$broadcast('mailBox:sync');

                if ($state.current.name !== 'mail.inbox') {
                    $state.go('mail.inbox', {mbox: 'INBOX'});
                }
            });

            _.forEach(messages.checked, function (checked) {
                _.remove(messages.items, function (message) {
                    return message.number === checked.number;
                });
            });

            messages.checked = [];

            return messages;
        }

        function flag(params, data) {
            return resource.flag(params, data).$promise;
        }

        function deflag(params, data) {
            return resource.deflag(params, data).$promise;
        }

        function destroy(data) {
            var messages = angular.copy(data);

            if (messages.isLoading || !messages.checked.length) return;

            $http({
                url: API_URL + '/' + 1,
                method: 'DELETE',
                data: {
                    messages: filterMessage(messages.checked),
                },
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                }
            });

            messages.checked = [];

            return messages;
        }

        function setSeen(data) {
            var messages = angular.copy(data);

            if (messages.isLoading || !messages.checked.length) return;

            messages.isLoading = true;

            flag({}, {
                messages: filterMessage(messages.checked),
                flag: 'Seen'
            }).then(function (response) {
                messages.isLoading = false;
                $rootScope.$broadcast('mailBox:sync');
            });

            _.forEach(messages.checked, function (checked) {
                _.forEach(messages.items, function (item) {
                    if (checked.number == item.number) {
                        item.seen = true;
                    }
                });
            });

            messages.checked = [];

            return messages;
        }

        function setUnSeen(data) {
            var messages = angular.copy(data);

            if (messages.isLoading || !messages.checked.length) return;

            messages.isLoading = true;

            deflag({}, {
                messages: filterMessage(messages.checked),
                flag: 'Seen'
            }).then(function (response) {
                messages.isLoading = false;
                $rootScope.$broadcast('mailBox:sync');
            });

            _.forEach(messages.checked, function (checked) {
                _.forEach(messages.items, function (item) {
                    if (checked.number == item.number) {
                        item.seen = false;
                    }
                });
            });

            messages.checked = [];

            return messages;
        }

        function setImportant(data) {
            var messages = angular.copy(data);

            if (messages.isLoading || !messages.checked.length) return;

            messages.isLoading = true;

            flag({}, {
                messages: filterMessage(messages.checked),
                flag: 'Flagged'
            }).then(function (response) {
                messages.isLoading = false;
            });

            messages.checked = [];

            _.forEach(messages.items, function (item) {
                _.forEach(data.checked, function (checked) {
                    if (item.number === checked.number) {
                        item.important = true;
                        messages.checked.push(item);
                    }
                });
            });

            return messages;
        }

        function setUnImportant(data) {
            var messages = angular.copy(data);

            if (messages.isLoading || !messages.checked.length) return;

            messages.isLoading = true;

            deflag({}, {
                messages: filterMessage(messages.checked),
                flag: 'Flagged'
            }).then(function (response) {
                messages.isLoading = false;
            });

            messages.checked = [];

            _.forEach(messages.items, function (item) {
                _.forEach(data.checked, function (checked) {
                    if (item.number === checked.number) {
                        item.important = false;
                        messages.checked.push(item);
                    }
                });
            });

            return messages;
        }

        function setAnswerData(data) {
            answerData = data;
        }

        function getAnswerData() {
            return answerData;
        }

        function setFwdData(data) {
            fwdData = data;
        }

        function getFwdData() {
            return fwdData;
        }

        function deleteAll(params, data) {
            return resource.deleteAll(params, data).$promise;
        }

        function setPaginate(data) {
            $rootScope.$broadcast('mail.paginate', {
                paginate: data
            });
        }

        function filterMessage(messages) {
            var data = [];
            _.forEach(messages, function (item) {
                data.push({
                    number: item.number,
                    connection_id: item.connection_id,
                    mbox: item.mbox
                })
            });
            return data;
        }

        function destroyOne(data, isSync) {
            var message = angular.copy(data);

            if (message.isLoading) return;

            $http({
                url: API_URL + '/' + 1,
                method: 'DELETE',
                data: {
                    messages: [message]
                },
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                }
            }).then(function () {
                $rootScope.$broadcast('mail:sync');
            });

            message = {};

            return message;
        }

        function setStorageMessages(messages) {
            localStorageService.set('mail:messages', messages);
        }

        function getStorageMessages() {
            return localStorageService.get('mail:messages');
        }

        function setStoragePositionScrollMessages(position) {
            localStorageService.set('mail:scrollPosition', position);
        }

        function getStoragePositionScrollMessages() {
            return localStorageService.get('mail:scrollPosition');
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
            setUnImportant: setUnImportant,
            moveToFolder: moveToFolder,
            getAnswerData: getAnswerData,
            setAnswerData: setAnswerData,
            upload: upload,
            setFwdData: setFwdData,
            getFwdData: getFwdData,
            deleteAll: deleteAll,
            setPaginate: setPaginate,
            destroyOne: destroyOne,
            getStorageMessages: getStorageMessages,
            setStorageMessages: setStorageMessages,
            setStoragePositionScrollMessages: setStoragePositionScrollMessages,
            getStoragePositionScrollMessages: getStoragePositionScrollMessages
        }
    }
})();