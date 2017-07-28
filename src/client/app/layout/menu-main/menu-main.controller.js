(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('MenuMainController', MenuMainController);

    MenuMainController.$inject = ['$timeout', '$scope', '$rootScope', '$uibModal', '$auth', 'mail', 'mailBox', 'tag', 'profile', '$location'];

    /* @ngInject */
    function MenuMainController($timeout, $scope, $rootScope, $uibModal, $auth, mail, mailBox, tag, profile, $location) {
        var vm = this;

        vm.standartFolders = [
            {
                name: 'INBOX',
                icon: 'icon-incoming-desk'
            },
            {
                name: 'Drafts',
                icon: 'icon-draft-desk'
            },
            {
                name: 'Trash',
                icon: 'icon-bin-desk'
            },
            {
                name: 'Sent',
                icon: 'icon-sent-desk'
            },
            {
                name: 'Junk',
                icon: 'icon-spam-desk'
            },
            {
                name: 'Outbox',
                icon: 'icon-strelka'
            }
        ];

        vm.folders = {};

        vm.tags = {
            items: []
        };

        vm.user = $auth.user;

        vm.profiles = [];

        $scope.$on('mail:sync', function () {
            getMailBox();
        });

        $scope.$on('folders:sync', function () {
            getMailBox();
        });

        $scope.$on('mailBox:update:success', function () {
            getMailBox();
        });

        $scope.$on('mailBox:create:success', function () {
            getMailBox();
        });

        $scope.$on('mailBox:destroy:success', function () {
            getMailBox();
        });

        $scope.$on('mailBox:sync', function () {
            getMailBox();
        });

        $scope.$on('tag:update:success', function () {
            getTag();
        });

        $scope.$on('tag:create:success', function () {
            getTag();
        });

        $scope.$on('tag:destroy:success', function () {
            getTag();
        });

        vm.openFolderCreatePopup = openFolderCreatePopup;
        vm.closeMenu = closeMenu;
        vm.setAuthProfile = setAuthProfile;
        vm.clearFolder = clearFolder;
        vm.goToDesktopVersion = goToDesktopVersion;

        activate();

        function activate() {
            getMailBox();
            getTag();
            getProfiles();

            vm.user = $auth.user;
        }

        function goToDesktopVersion(target) {
            var url = window.location.origin + target; //+ '&token=' + vm.user.access_token.split(' ')[1];
            window.location.href = url;
        }

        function getMailBox() {
            mailBox.get().then(function (response) {
                vm.folders = _.assign(vm.folders, response.data);
                setIcons();
                getMailBoxFormatted();
            });
        }

        function getMailBoxFormatted() {
            _.forEach(vm.folders.items, function (folder) {
                var isSub = true;

                folder.isOpen = false;

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

            sortFolder();
        }

        function sortFolder() {
            vm.folders.items = _.sortBy(vm.folders.items, 'caption').reverse();
            vm.folders.items = _.sortBy(vm.folders.items, [
                {'name': 'INBOX'},
                {'isSub': true},
                {'name': 'Sent'},
                {'name': 'Trash'},
                {'name': 'Junk'},
                {'name': 'Drafts'},
                {'name': 'Outbox'}
            ]).reverse();
        }

        function setIcons() {
            _.forEach(vm.folders.items, function (item) {
                _.forEach(vm.standartFolders, function (standartFolder) {
                    if (item.name === standartFolder.name) {
                        item.icon = standartFolder.icon;
                    }
                });
            });
        }

        function openFolderCreatePopup() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/components/folder-create/folder-create-popup.html',
                controller: function ($scope, $uibModalInstance) {
                    $scope.cancel = cancel;

                    function cancel() {
                        $uibModalInstance.dismiss('cancel');
                    }
                },
                // controllerAs: 'vm',
                size: 'sm',
                windowClass: 'popup popup--folder-create'
            });
        }

        function getTag() {
            tag.get().then(function (response) {
                vm.tags.items = response.data;
            });
        }

        function closeMenu() {
            $rootScope.isOpenMenu = false;
        }

        function getProfiles() {
            vm.profiles = profile.getStorageProfiles();
        }

        function setAuthProfile(profile) {
            $auth.user.access_token = profile.access_token;

            $timeout(function () {
                $('#iframe--auth').on('load', function () {
                    $timeout(function () {
                        location.reload();
                    }, 250);
                });
            }, 250);
        }

        function clearFolder(e, folder) {
            e.stopPropagation();
            mail.deleteAll({}, {
                mbox: folder.name,
                connection_id: vm.user.profile.default_connection_id
            }).then(function () {
                $scope.$emit('mail:sync');
            });
        }
    }
})();
