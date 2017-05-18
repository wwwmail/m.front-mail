(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['$rootScope', '$scope', '$state'];

    /* @ngInject */
    function HeaderController($rootScope, $scope, $state) {
        var vm = this;
        vm.title = 'Header';

        vm.searchForm = {
            model: {}
        };

        vm.currentFolder = {};

        vm.openMenu = openMenu;
        vm.closeMenu = closeMenu;
        vm.clearSearch = clearSearch;
        vm.search = search;

        $scope.$watch('vm.$state.params.mbox', function () {
            getCurrentFolder();
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

            console.log('folder', vm.folder);

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
            }

            $rootScope.$broadcast('search:mail', {
                search: data
            });
        }

        function clearSearch() {
            vm.searchForm.model.search = '';
            $rootScope.$broadcast('search:close');
        }

    }
})();
