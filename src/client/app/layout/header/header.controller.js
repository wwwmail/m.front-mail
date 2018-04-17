(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['$rootScope', '$scope', '$state', '$timeout', 'mail', 'search'];

    /* @ngInject */
    function HeaderController($rootScope, $scope, $state, $timeout, mail, search) {
        var vm = this;

        vm.searchForm = {
            model: {}
        };

        vm.currentFolder = {};

        vm.notify = {};

        vm.openMenu = openMenu;
        vm.closeMenu = closeMenu;
        vm.openSettingsMenu = openSettingsMenu;
        vm.closeSettingsMenu = closeSettingsMenu;

        vm.clearSearch = clearSearch;
        vm.searchQuery = searchQuery;
        vm.send = send;
        vm.closeCompose = closeCompose;

        $scope.$watch('vm.$state.params.mbox', function () {
            getCurrentFolder();
        });

        $scope.$on('notify:message', function (e, data) {
            vm.notify.isOpen = true;

            vm.message = data.message;
            vm.folderMessage = data.folder;

            $timeout(function () {
                vm.notify.isOpen = false;
            }, 800);
        });

        $scope.$on('mail:isSend', function (e, data) {
            vm.isSend = data.isSend;
        });

        $scope.$on('mail:isUploading', function (e, data) {
            vm.isUploading = data.isUploading;
        });

        $scope.$on('mail.paginate', function (e, data) {
            vm.paginate = data.paginate;
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
            vm.paginate = mail.paginate;

            getCurrentFolder();

            if (vm.$state.params.search) {
                vm.searchForm.model.search = vm.$state.params.search;
                search.query();
            }
        }

        function openMenu() {
            $rootScope.isOpenMenu = !$rootScope.isOpenMenu;
        }

        function closeMenu() {
            $rootScope.isOpenMenu = !$rootScope.isOpenMenu;
        }

        function openSettingsMenu() {
            $rootScope.isOpenSettingsMenu = !$rootScope.isOpenSettingsMenu;
        }

        function closeSettingsMenu() {
            $rootScope.isOpenSettingsMenu = !$rootScope.isOpenSettingsMenu;
        }

        function getCurrentFolder() {
            if (vm.folder) {
                _.forEach(vm.folder.data.items, function (folder) {
                    if (folder.name === vm.$state.params.mbox) {
                        vm.currentFolder = folder;
                        console.log('vm.currentFolder', vm.currentFolder);
                    }
                });
            }
        }

        function searchQuery() {
            search.query({
                search: vm.searchForm.model.search
            });
        }

        function clearSearch() {
            vm.searchForm.model.search = '';
            $rootScope.$broadcast('search:close');
        }

        function send() {
            $rootScope.$broadcast('mail:send');
        }

        function closeCompose() {
            $rootScope.$broadcast('mail:compose:close');
        }

    }
})();
