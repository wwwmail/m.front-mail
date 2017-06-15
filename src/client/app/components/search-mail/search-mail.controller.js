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

        vm.tags = {
            selected: {
                tag_name: 'Все метки',
                id: undefined
            },
            items: [{
                tag_name: 'Все тэги',
                id: undefined
            }]
        };

        vm.date = {};

        vm.standartFolders = [
            {
                caption: 'Все папки',
                name: 'ALL',
                icon: 'icon-incoming'
            },
            {
                name: 'INBOX',
                icon: 'icon-incoming'
            },
            {
                name: 'Drafts',
                icon: 'icon-draft'
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
                caption: 'Все папки',
                name: 'ALL',
                icon: 'icon-incoming'
            }
        };

        vm.searchParts = {
            selected: {
                'name': 'Искать по всему письму',
                'value': 'all'
            },
            list: [
                {
                    'name': 'Искать по всему письму',
                    'value': 'all'
                },
                {
                    'name': 'в поле "Отправитель"',
                    'value': 'from'
                },
                {
                    'name': 'в поле "Получатель"',
                    'value': 'to'
                },
                {
                    'name': 'в теле письма',
                    'value': 'body'
                },
                {
                    'name': 'в тексте письма',
                    'value': 'text'
                }
            ]
        };

        vm.searchForm = {
            model: {}
        };

        vm.title = "Search component";

        vm.search = search;

        $scope.$watch('vm.isOpenDate', function (date, oldData) {
            if (!date) {
                setDefaultDate();
            }
        });

        activate();

        function activate() {
            getTags();
            getMailBox();
        }

        function setDefaultDate() {
            vm.date.from = moment().startOf('month').toDate();
            vm.date.to = moment().endOf('month').toDate();
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

            if (vm.date.start && vm.date.end) {
                data.search_start = moment(vm.date.from).unix();
                data.search_end = moment(vm.date.to).unix();
            }

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


    }
})();
