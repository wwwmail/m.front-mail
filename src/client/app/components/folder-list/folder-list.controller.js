(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('FolderListController', FolderListController);

    FolderListController.$inject = ['$auth', '$state', '$uibModal'];
    /* @ngInject */
    function FolderListController($auth, $state, $uibModal) {
        var vm = this;

        vm.folders = {};

        vm.openFolderCreatePopup = openFolderCreatePopup;

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
    }
})();
