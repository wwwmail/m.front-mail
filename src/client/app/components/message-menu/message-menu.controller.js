(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('MessageMenuController', MessageMenuController);

    MessageMenuController.$inject = ['$state', '$scope', '$uibModal', 'mail', 'mailBox', '$uibModalInstance', 'message', 'messages'];
    /* @ngInject */
    function MessageMenuController($state, $scope, $uibModal, mail, mailBox, $uibModalInstance, message, messages) {
        var vm = this;

        vm.isSeen = true;

        vm.move = move;
        vm.destroy = destroy;
        vm.triggerSeen = triggerSeen;
        vm.goToAnswer = goToAnswer;
        vm.goToFwd = goToFwd;
        vm.openTagListPopup = openTagListPopup;
        vm.openLayoutFolder = openLayoutFolder;
        vm.close = close;
        vm.setImportant = setImportant;

        activate();

        function activate() {
            vm.$state = $state;
            vm.messages = messages;
            vm.message = message;

            console.log('vm.message', vm.message);
            console.log('vm.messages', vm.messages);
        }

        function move(folder) {
            vm.messages = mail.moveToFolder(folder, vm.messages);
            close();
        }

        function destroy() {
            vm.messages = mail.destroy(vm.messages);
            vm.messages = [];
            close();
        }

        function triggerSeen() {
            vm.message.seen ? setUnSeen() : setSeen();
            vm.message.seen = !vm.message.seen;
        }

        function setSeen() {
            vm.messages = mail.setSeen(vm.messages);
            close();
        }

        function setUnSeen() {
            vm.messages = mail.setUnSeen(vm.messages);
            close();
        }

        function goToAnswer() {
            var data = mail.getAnswerData();
            $state.go('mail.compose', {
                connection_id: data.connection_id,
                mbox: data.mbox,
                id: data.number,
                re: true
            });

            close();
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
                fwd: true,
                mbox: vm.messages.checked[0].mbox,
                connection_id: vm.messages.checked[0].connection_id
            });

            close();
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
                windowClass: 'popup popup--tags'
            });

            modalInstance.result.then(function (response) {
                vm.messages = response.result.messages;
            });

            close();
        }

        function setImportant() {
            if (vm.message.important && !vm.message.isLoading) {
                vm.message.isLoading = true;
                mail.deflag({}, {
                    messages: [vm.message],
                    flag: 'Flagged'
                }).then(function () {
                    vm.message.isLoading = false;
                });
                vm.message.important = !vm.message.important;
                return;
            }

            vm.message.isLoading = true;
            mail.flag({}, {
                messages: [vm.message],
                flag: 'Flagged'
            }).then(function () {
                vm.message.isLoading = false;
            });
            vm.message.important = !vm.message.important;
        }

        function openLayoutFolder() {
            mailBox.openLayoutFolder();
            close();
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        function close() {
            $uibModalInstance.close({result: {messages: vm.messages}});
        }
    }
})();
