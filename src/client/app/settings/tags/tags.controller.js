(function () {
    'use strict';

    angular
        .module('settings.tags')
        .controller('TagsController', TagsController);

    TagsController.$inject = ['$scope', '$state', '$uibModal', 'tag'];
    /* @ngInject */
    function TagsController($scope, $state, $uibModal, tag) {
        var vm = this;

        vm.tags = {};

        vm.selected = null;

        vm.openTagCreatePopup = openTagCreatePopup;
        vm.openTagEditPopup = openTagEditPopup;
        vm.select = select;
        vm.destroy = destroy;

        $scope.$on('tag:update:success', function () {
            get();
        });

        $scope.$on('tag:create:success', function () {
            get();
        });

        $scope.$on('tag:destroy:success', function () {
            get();
        });

        /////

        activate();

        function activate() {
            vm.$state = $state;
            get();
        }

        function get() {
            tag.get().then(function (response) {
                vm.tags.items = response.data;
            });
        }

        function openTagCreatePopup() {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/components/tag-create/tag-create-popup.html',
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

        function openTagEditPopup() {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/components/tag-edit/tag-edit-popup.html',
                controller: function ($scope, $uibModalInstance, model) {
                    $scope.model = model;

                    $scope.cancel = cancel;

                    function cancel() {
                        $uibModalInstance.dismiss('cancel');
                    }
                },
                resolve: {
                    model: function () {
                        return vm.selected;
                    }
                },
                size: 'sm',
                windowClass: 'popup popup--folder-create'
            });
        }

        function select(tagItem) {
            _.forEach(vm.tags.items, function (item) {
                item.isSelected = false;
            });

            tagItem.isSelected = true;
            vm.selected = tagItem;
        }

        function destroy() {
            tag.destroy({id: vm.selected.id}, {});
            _.remove(vm.tags.items, function(item) {
                return item.id == vm.selected.id;
            });
        }
    }
})();
