(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('MenuMainController', MenuMainController);

    MenuMainController.$inject = ['$scope', '$rootScope', '$uibModal', '$auth', 'mail', 'mailBox', 'tag', 'profile', 'CONFIG'];

    /* @ngInject */
    function MenuMainController($scope, $rootScope, $uibModal, $auth, mail, mailBox, tag, profile, CONFIG) {
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
                name: 'Archive',
                icon: 'icon-archive-desk'
            }
        ];

        vm.folders = {};

        vm.tags = {
            items: []
        };

        vm.user = $auth.user;

        vm.profiles = [];

        $rootScope.$on('mail:sync', function () {
            getMailBox();
        });

        $rootScope.$on('folders:sync', function () {
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

            // vm.user = $auth.user;

            // vm.user.profile.photo = CONFIG.MediaUrl + vm.user.profile.photo;
            // console.log('vm.user', vm.user);
        }
        
        function goToDesktopVersion(target) {
            alert(target);
            window.location.href = target;
            // document.location.reload(true);
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
            vm.folders.items = _.sortBy(vm.folders.items, [
                {'name': 'INBOX'},
                {'isSub': true},
                {'name': 'Sent'},
                {'name': 'Trash'},
                {'name': 'Junk'},
                {'name': 'Drafts'}
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
            $auth.setAuthHeaders({
                "Authorization": profile.access_token
            });
            location.reload();
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
