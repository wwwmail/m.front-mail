(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('TagListController', TagListController);

    TagListController.$inject = ['$uibModal', '$scope', '$uibModalInstance', 'tag', 'mail', 'messages'];
    /* @ngInject */
    function TagListController($uibModal, $scope, $uibModalInstance, tag, mail, messages) {
        var vm = this;

        vm.tags = {
            checked: [],
            items: []
        };
        vm.unTags = {
            items: []
        };

        vm.setTag = setTag;
        vm.setUnTag = setUnTag;
        vm.setSeen = setSeen;
        vm.setUnSeen = setUnSeen;
        vm.setImportant = setImportant;
        vm.close = close;
        vm.triggerTag = triggerTag;

        $scope.$watch('vm.unTags.items', function (data, oldData) {
            // console.log('unTags', data);
        }, true);

        ////

        activate();

        function activate() {
            vm.messages = messages;
            get();
        }

        function get() {
            tag.get().then(function (response) {
                vm.tags.items = response.data;
                getFormattedTags();
            });
        }

        function getFormattedTags() {
            var unTags = [];

            _.forEach(vm.messages.checked, function (messageChecked) {
                unTags = unTags.concat(messageChecked.tags);
            });

            vm.unTags.items = _.uniqBy(unTags, 'id');
        }

        function triggerTag(item, checked) {
            if (checked) {
                setTag(item);
                return;
            }

            setUnTag(item);
        }

        function setTag(item) {
            vm.messages = tag.setTag(item, vm.messages);

            getFormattedTags();
        }

        function setUnTag(item) {
            vm.messages = tag.setUnTag(item, vm.messages);

            getFormattedTags();
        }

        function setSeen() {
            vm.messages = mail.setSeen(vm.messages);
        }

        function setUnSeen() {
            vm.messages = mail.setUnSeen(vm.messages);
        }

        function setImportant() {
            vm.messages = mail.setImportant(vm.messages);
        }

        function close() {
            $uibModalInstance.close({
                result: {
                    messages: vm.messages
                }
            });
        }
    }
})();
