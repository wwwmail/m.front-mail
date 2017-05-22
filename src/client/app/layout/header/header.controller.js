(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['$rootScope', '$scope', '$state', '$timeout'];

    /* @ngInject */
    function HeaderController($rootScope, $scope, $state, $timeout) {
        var vm = this;
        vm.title = 'Header';

        vm.searchForm = {
            model: {}
        };

        vm.currentFolder = {};

        vm.notify = {};

        vm.openMenu = openMenu;
        vm.closeMenu = closeMenu;
        vm.clearSearch = clearSearch;
        vm.search = search;
        vm.send = send;

        $scope.$watch('vm.$state.params.mbox', function () {
            getCurrentFolder();
        });

        $scope.$on('notify:message', function (e, data) {
            console.log('data', data);
            vm.notify.isOpen = true;
            vm.notify.message = data.message;
            $timeout(function () {
                vm.notify.isOpen = false;
            }, 3000);
        });

        $scope.$watch('vm.searchForm.model.search', function (data, oldData) {
            if (data === '') {
                clearSearch();
            }
        });

        ////

        activate();

        function activate() {
            vm.$state = $state;

            console.log('vm.$state', vm.$state);

            getCurrentFolder();
        }

        function openMenu() {
            $rootScope.isOpenMenu = !$rootScope.isOpenMenu;
        }

        function closeMenu() {
            $rootScope.isOpenMenu = !$rootScope.isOpenMenu;
        }

        function getCurrentFolder() {
            _.forEach(vm.folder.data.items, function (folder) {
                if (folder.name === vm.$state.params.mbox) {
                    vm.currentFolder = folder;
                }
            });

            console.log('currentFolder', vm.folder.data.items, vm.$state.params.mbox);
            console.log('currentFolder', vm.currentFolder);
        }

        function search() {
            var data = {};

            if (vm.searchForm.model.search) {
                data.search = vm.searchForm.model.search;
                data.search_part = 'text';
            }

            $rootScope.$broadcast('search:mail', {
                search: data
            });
        }

        function clearSearch() {
            vm.searchForm.model.search = '';
            $rootScope.$broadcast('search:close');
        }

        function send() {
            $rootScope.$broadcast('mail:send');
        }

    }
})();
