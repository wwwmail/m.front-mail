(function () {
    'use strict';

    angular
        .module('settings.folders')
        .controller('FoldersController', FoldersController);

    FoldersController.$inject = ['$scope', '$auth', '$state', '$uibModal', 'mailBox', 'mail'];
    /* @ngInject */
    function FoldersController($scope, $auth, $state, $uibModal, mailBox, mail) {
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
            {
                name: 'Outbox',
                icon: 'icon-spam'
            }
        ];

        vm.folders = {};


        vm.openFolderCreatePopup = openFolderCreatePopup;
        vm.openFolderEditPopup = openFolderEditPopup;
        vm.move = move;
        vm.destroy = destroy;
        vm.openFolderDeleteConfirmPopup = openFolderDeleteConfirmPopup;
        vm.openFolderClearConfirmPopup = openFolderClearConfirmPopup;


        $scope.$on('mailBox:update:success', function () {
            getMailBox();
        });

        $scope.$on('mailBox:create:success', function () {
            getMailBox();
        });

        $scope.$on('mailBox:destroy:success', function () {
            getMailBox();
        });

        activate();

        /////

        function activate() {
            vm.$state = $state;
            vm.user = $auth.user;
            getMailBox();
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
                    if (folder.name === standartFolder.name) {
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

        function move(folder) {
            var ids = [];

            _.forEach(vm.messages.checked, function (message) {
                ids.push(message.number);
            });

            mail.move({}, {
                ids: ids,
                mbox: vm.messages.checked[0].mbox,
                mboxnew: folder.name
            }).then(function (response) {
                vm.messages.checked = [];
                $scope.$emit('mail:sync');
            });
        }

        function openFolderCreatePopup() {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/components/folder-create/folder-create-popup.html',
                controller: function ($scope, $uibModalInstance) {
                    $scope.cancel = cancel;

                    function cancel() {
                        $uibModalInstance.dismiss('cancel');
                    }
                },
                size: 'sm',
                windowClass: 'popup popup--folder-create'
            });
        }

        function openFolderEditPopup(folder) {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/components/folder-edit/folder-edit-popup.html',
                controller: function ($scope, $uibModalInstance, model) {
                    $scope.model = model;

                    $scope.cancel = cancel;

                    function cancel() {
                        $uibModalInstance.dismiss('cancel');
                    }
                },
                resolve: {
                    model: function () {
                        return folder;
                    }
                },
                size: 'sm',
                windowClass: 'popup popup--folder-create'
            });
        }

        function destroy(folder) {
            mailBox.destroy({}, {
                mbox: folder.name
            });
        }

        function clearFolder(folder) {
            console.log('v', folder);
            mail.deleteAll({}, {
                mbox: folder.name,
                connection_id: vm.user.profile.default_connection_id
            }).then(function () {
                getMailBox();
            });
        }

        function openFolderDeleteConfirmPopup(folder) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/components/folder-delete-confirm/folder-delete-confirm-popup.html',
                controller: function ($scope, $uibModalInstance, folderResolve) {
                    $scope.cancel = cancel;
                    $scope.close = close;

                    $scope.folder = folderResolve;

                    function cancel() {
                        $uibModalInstance.dismiss('cancel');
                    }

                    function close(data) {
                        $uibModalInstance.close(data);
                    }
                },
                size: 'sm',
                resolve: {
                    folderResolve: function () {
                        return folder;
                    }
                },
                windowClass: 'popup popup--folder-create'
            });

            modalInstance.result.then(function (response) {
                destroy(folder);
            });
        }

        function openFolderClearConfirmPopup(folder) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/components/folder-clear-confirm/folder-clear-confirm-popup.html',
                controller: function ($scope, $uibModalInstance, folderResolve) {
                    $scope.cancel = cancel;
                    $scope.close = close;

                    $scope.folder = folderResolve;

                    function cancel() {
                        $uibModalInstance.dismiss('cancel');
                    }

                    function close(data) {
                        $uibModalInstance.close(data);
                    }
                },
                size: 'sm',
                resolve: {
                    folderResolve: function () {
                        return folder;
                    }
                },
                windowClass: 'popup popup--folder-create'
            });

            modalInstance.result.then(function (response) {
                clearFolder(folder);
            });
        }
    }
})();
