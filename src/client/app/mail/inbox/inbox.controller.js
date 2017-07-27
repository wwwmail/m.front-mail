(function () {
    'use strict';

    angular
        .module('mail.inbox')
        .controller('InboxController', InboxController);

    InboxController.$inject = ['$scope', '$state', '$http', '$auth', 'mail', 'mailBox', 'profile', 'messages'];
    /* @ngInject */
    function InboxController($scope, $state, $http, $auth, mail, mailBox, profile, messages) {
        var vm = this;

        vm.user = $auth.user;

        vm.messages = {
            params: {
                'per-page': 10,
                'len': 100,
                'part': 'bodytext'
            },
            defaultParams: {
                'per-page': 10,
                'len': 100,
                'part': 'bodytext'
            },
            searchParams: {},
            checked: []
        };

        vm.folders = {};

        $scope.$on('mail:sync', function () {
            get();
        });

        $scope.$on('mail:inbox:messages:update', function (e, data) {
            // console.log(data);
            vm.messages = data;
            // get();
        });

        $scope.$on('search:mailQuery', function (e, data) {
            console.log('data', data);
            vm.messages.searchParams.search = data.search.search;
            vm.searchQuery = data.search.search;
            vm.messages.isSearch = true;

            if (!vm.messages.searchParams.search_part) {
                vm.messages.searchParams.search_part = 'text';
            }

            get();
        });

        $scope.$on('search:mail', function (e, data) {
            console.log('search:mail', data);
            // vm.messages.params = data.search;
            vm.messages.searchParams = data.search;
            vm.messages.searchParams.search = vm.searchQuery;
            vm.messages.isSearch = true;
            get();
        });

        $scope.$on('search:close', function (e, data) {
            vm.messages.params = angular.copy(vm.messages.defaultParams);
            vm.messages.params.mbox = $state.params.mbox;
            vm.messages.isSearch = false;
            get();
        });

        vm.openTagList = openTagList;
        vm.paginate = paginate;
        vm.clearFolder = clearFolder;

        activate();

        function activate() {
            vm.$state = $state;

            if ($state.params.filter) {
                vm.messages.params.filter = $state.params.filter;
            }

            if ($state.params.mbox) {
                vm.messages.params.mbox = $state.params.mbox;
            }

            if ($state.params.tag_id) {
                vm.messages.params.tag_id = $state.params.tag_id;
            }

            getMailBox();

            console.log('messages', messages.$promise);

            messages.$promise.then(function (response) {
                vm.messages.params.search = null;
                vm.messages.checked = [];
                vm.messages = _.assign(vm.messages, response.data);
                _.forEach(vm.messages.items, function (message) {
                    message.body = message.body ? String(message.body).replace(/<[^>]+>/gm, '') : '';
                });
            });
        }

        function get() {
            vm.messages.isLoading = true;

            var params = {};

            if (vm.messages.isSearch) {
                params = vm.messages.searchParams;
            } else {
                params = vm.messages.params;
            }

            mail.get(params).then(function (response) {
                vm.messages.isLoading = false;
                vm.messages.checked = [];
                vm.messages = _.assign(vm.messages, response.data);
                _.forEach(vm.messages.items, function (message) {
                    message.body = message.body ? String(message.body).replace(/<[^>]+>/gm, '') : '';
                });
            });
        }

        function getMailBox() {
            mailBox.get().then(function (response) {
                vm.folders = _.assign(vm.folders, response.data);
            });
        }

        function openTagList() {
            vm.isOpenTagList = true;
        }

        function paginate() {
            if (vm.messages._links.next && !vm.messages.isLoading) {
                vm.messages.isLoading = true;
                $http.get(vm.messages._links.next.href).then(function (response) {
                    vm.messages.isLoading = false;
                    vm.messages.items = vm.messages.items.concat(response.data.data.items);
                    vm.messages._links = response.data.data._links;
                    vm.messages._meta = response.data.data._meta;

                    console.log('pag', vm.messages);
                });
            }
        }

        function clearFolder(e, folder) {
            e.stopPropagation();
            mail.deleteAll({}, {
                mbox: folder.name,
                connection_id: vm.user.profile.default_connection_id
            }).then(function () {
                get();
            });
        }
    }
})();
