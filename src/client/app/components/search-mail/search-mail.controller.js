(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('SearchMailController', SearchMailController);

    SearchMailController.$inject = ['$scope', '$rootScope', 'tag', 'mailBox'];
    /* @ngInject */
    function SearchMailController($scope, $rootScope, tag, mailBox) {
        var vm = this;

        vm.isOpenDate = false;

        vm.date = {};

        vm.tags = {
            selected: {
                tag_name: 'ALL_TAGS',
                id: undefined
            },
            items: [{
                tag_name: 'ALL_TAGS',
                id: undefined
            }]
        };

        vm.standartFolders = [
            {
                caption: 'ALL_FOLDERS',
                name: 'ALL',
                icon: 'icon-incoming'
            },
            {
                name: 'INBOX',
                icon: 'icon-incoming'
            },
            {
                name: 'Drafts',
                icon: 'icon-draft-line'
            },
            {
                name: 'Trash',
                icon: 'icon-bin'
            },
            {
                name: 'Sent',
                icon: 'icon-sent'
            },
            {
                name: 'Junk',
                icon: 'icon-spam'
            }
        ];

        vm.folders = {
            selected: {
                caption: 'ALL_FOLDERS',
                name: 'ALL',
                icon: 'icon-incoming'
            }
        };

        vm.searchParts = {
            selected: {
                'name': 'SEARCH_ENTIRE_LETTER',
                'value': 'all'
            },
            list: [
                {
                    'name': 'SEARCH_ENTIRE_LETTER',
                    'value': 'all'
                },
                {
                    'name': 'IN_THE_SENDER_FIELD',
                    'value': 'from'
                },
                {
                    'name': 'IN_THE_FIELD_RECIPIENT',
                    'value': 'to'
                },
                {
                    'name': 'IN_THE_BODY_OF_THE_LETTER',
                    'value': 'body'
                },
                {
                    'name': 'IN_THE_TEXT_OF_THE_LETTER',
                    'value': 'text'
                }
            ]
        };

        vm.searchForm = {
            model: {}
        };

        vm.search = search;
        vm.onSearchChange = onSearchChange;

        $scope.$watch('vm.from', function (data, oldData) {
            if (data) {
                search();
                vm.isOpenFilters = false;
            }
        });

        $scope.$watch('vm.to', function (data, oldData) {
            if (data) {
                search();
                vm.isOpenFilters = false;
            }
        });

        activate();

        function activate() {
            getTags();
            getMailBox();
        }

        function search() {
            var data = {};

            if (vm.folders.selected.name === 'ALL') {
                data.search_part = 'text';
            }

            if (vm.searchParts.selected.value && vm.searchParts.selected.value !== 'all') {
                data.search_part = vm.searchParts.selected.value;
            }

            if (vm.tags.selected.id) {
                data.search_tag_id = vm.tags.selected.id;
            }

            if (vm.searchForm.isAttach) {
                data.filter = 'attach';
            }

            if (vm.searchForm.model.search) {
                data.search = vm.searchForm.model.search;
            }

            if (vm.folders.selected.name && vm.folders.selected.name !== 'ALL') {
                data.mbox = vm.folders.selected.name;
            }

            if (vm.from && vm.to) {
                data.search_start = vm.from;
                data.search_end = vm.to;
            }

            console.log('params', data);

            // return;

            $rootScope.$broadcast('search:mail', {
                search: data
            });
        }

        function getTags() {
            tag.get().then(function (response) {
                vm.tags.items = vm.tags.items.concat(response.data);
            });
        }

        function getMailBox() {
            mailBox.get().then(function (response) {
                vm.folders = _.assign(vm.folders, response.data);
                getMailBoxFormatted();
            });
        }

        function getMailBoxFormatted() {
            _.forEach(vm.folders.items, function (folder) {
                var isSub = true;

                _.forEach(vm.standartFolders, function (standartFolder) {
                    if (folder.name == standartFolder.name) {
                        isSub = false;
                    }
                });

                if (isSub) {
                    folder.isSub = true;
                } else {
                    folder.isSub = false;
                }
            });

            vm.folders.items.push(vm.standartFolders[0]);

            sortFolder();
        }

        function sortFolder() {
            vm.folders.items = _.sortBy(vm.folders.items, [
                {'name': 'ALL'},
                {'name': 'INBOX'},
                {'isSub': true},
                {'name': 'Sent'},
                {'name': 'Trash'},
                {'name': 'Junk'},
                {'name': 'Drafts'}
            ]).reverse();
        }

        function onSearchChange() {
            if (!vm.searchForm.model.search) {
                $rootScope.$broadcast('search:close', {});
            }
        }
    }
})();
