(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('InboxFooterController', InboxFooterController);

    InboxFooterController.$inject = ['$state', '$scope', '$uibModal', 'mail', 'mailBox'];
    /* @ngInject */
    function InboxFooterController($state, $scope, $uibModal, mail, mailBox) {
        var vm = this;

        vm.isSeen = true;
        vm.isMoreSwitch = false;
        vm.isShowFeatures = false;

        vm.checkedAllMessages = checkedAllMessages;
        vm.syncMail = syncMail;
        vm.move = move;
        vm.destroy = destroy;
        vm.triggerSeen = triggerSeen;
        vm.goToAnswer = goToAnswer;
        vm.goToFwd = goToFwd;
        vm.openTagListPopup = openTagListPopup;
        vm.openLayoutFolder = openLayoutFolder;

        $scope.$watch('vm.messages.checked', function (data) {
            if (data && !data.length) {
                vm.isAllChecked = false;
            }
        }, true);

        activate();

        function activate() {
            vm.$state = $state;
            console.log('vm.state', vm.$state.current.name);
        }

        function checkedAllMessages() {
            if (vm.isAllChecked && vm.messages.items) {
                vm.messages.checked = angular.copy(vm.messages.items);
                return;
            }
            vm.messages.checked = [];
        }

        function syncMail() {
            if ($state.current.name === 'mail.inbox') {
                $scope.$emit('mail:sync');
                return;
            }
            $scope.$emit('folders:sync');
            $state.go('mail.inbox', {mbox: 'INBOX'});
        }

        function move(folder) {
            vm.messages = mail.moveToFolder(folder, vm.messages);
        }

        function destroy() {
            vm.messages = mail.destroy(vm.messages);
            vm.messages = [];
        }

        function triggerSeen() {
            vm.isSeen ? setUnSeen() : setSeen();
            vm.isSeen = !vm.isSeen;
        }

        function setSeen() {
            vm.messages = mail.setSeen(vm.messages);
        }

        function setUnSeen() {
            vm.messages = mail.setUnSeen(vm.messages);
        }

        function goToAnswer() {
            var data = mail.getAnswerData();
            $state.go('mail.compose', {
                // to: data.fromAddress,
                connection_id: data.connection_id,
                mbox: data.mbox,
                id: data.number,
                re: true
            });
        }

        function goToFwd() {
            console.log('vm.messages.checked', vm.messages.checked);
            var ids = [];

            _.forEach(vm.messages.checked, function (item) {
                ids.push(item.number);
            });

            console.log('ids', ids);

            mail.setFwdData(vm.messages.checked);

            $state.go('mail.compose', {
                ids: ids,
                fwd: true
            });
        }

        function openTagListPopup() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/components/tag-list/tag-list.html',
                controller: 'TagListController',
                controllerAs: 'vm',
                resolve: {
                    messages: function () {
                        return vm.messages;
                    }
                },
                size: 'sm',
                windowClass: 'popup'
            });

            modalInstance.result.then(function (response) {
                vm.messages = response.result.messages;
                // console.log('response', response);
            });
        }

        function openLayoutFolder() {
            mailBox.openLayoutFolder();
        }
    }
})();
