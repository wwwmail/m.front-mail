(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('MenuMainController', MenuMainController);

    MenuMainController.$inject = ['$timeout', '$scope', '$rootScope', '$uibModal', '$auth', '$state', 'mail', 'mailBox', 'tag', 'profile', 'CONFIG', 'authService'];

    /* @ngInject */
    function MenuMainController($timeout, $scope, $rootScope, $uibModal, $auth, $state, mail, mailBox, tag, profile, CONFIG, authService) {
        var vm = this;

        vm.standartFolders = [
            {
                name: 'INBOX',
                icon: 'icon-inbox-old'
            },
            {
                name: 'Drafts',
                icon: 'icon-draft-line'
            },
            {
                name: 'Trash',
                icon: 'icon-basket'
            },
            {
                name: 'Sent',
                icon: 'icon-sent-old'
            },
            {
                name: 'Junk',
                icon: 'icon-spam'
            },
            // {
            //     name: 'Outbox',
            //     icon: 'icon-strelka'
            // },
            {
                name: 'Outbox',
                icon: 'icon-time'
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
        vm.logout = logout;


        activate();

        function activate() {
            getMailBox();
            getTag();
            getProfiles();

            vm.user = $auth.user;
            vm.CONFIG = CONFIG;
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

/*        function setAuthProfile(profile) {
            $auth.user.access_token = profile.access_token;

            $timeout(function () {
                $('#iframe--auth').on('load', function () {
                    $timeout(function () {
                        window.location.href = '/mail/inbox?mbox=INBOX';
                    }, 250);
                });
            }, 250);
        }*/

        function setAuthProfile(profile) {
            authService.signWithToken(profile.access_token, {isReload: true});
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

        function logout() {
            var profiles = profile.destroyStorageProfile($auth.user);

            if (profiles && profiles.length) {
                setAuthProfile(profiles[0]);
                return;
            }

            $auth.signOut();
            $state.go('signIn');
        }
    }
})();
