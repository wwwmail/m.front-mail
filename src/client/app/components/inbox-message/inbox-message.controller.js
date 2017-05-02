(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('InboxMessageController', InboxMessageController);

    InboxMessageController.$inject = ['$state', '$scope', 'mail', 'tag'];
    /* @ngInject */
    function InboxMessageController($state, $scope, mail, tag) {
        var vm = this;

        vm.getDate = getDate;
        vm.goToUrl = goToUrl;
        vm.setSeen = setSeen;
        vm.setImportant = setImportant;

        activate();

        function activate() {
            vm.$state = $state;
            console.log('activate', vm.message);
            getTags();
        }

        function getDate(date) {
            var newDate = new Date(date);

            return moment(newDate).calendar(null, {
                sameDay: 'hh:mm',
                nextDay: '[Tomorrow]',
                nextWeek: 'dddd',
                lastDay: 'D MMM',
                lastWeek: 'D MMM YY',
                sameElse: 'D MMM YY'
            });
        }

        function goToUrl() {
            console.log('state', $state.params.mbox);
            if ($state.params.mbox === 'Drafts') {
                $state.go('mail.compose', {
                    id: vm.message.number,
                    mbox: vm.message.mbox
                });
                return;
            }
            $state.go('mail.message', {
                id: vm.message.number,
                mbox: vm.message.mbox
            });
        }

        function setSeen() {
            if (vm.message.seen && !vm.message.isLoading) {
                vm.message.isLoading = true;
                mail.deflag({}, {
                    ids: [vm.message.number],
                    mbox: vm.message.mbox,
                    flag: 'Seen'
                }).then(function () {
                    vm.message.isLoading = false;
                });
                vm.message.seen = !vm.message.seen;
                return;
            }

            vm.message.isLoading = true;
            mail.flag({}, {
                ids: [vm.message.number],
                mbox: vm.message.mbox,
                flag: 'Seen'
            }).then(function () {
                vm.message.isLoading = false;
            });
            vm.message.seen = !vm.message.seen
        }

        function setImportant() {
            if (vm.message.important && !vm.message.isLoading) {
                vm.message.isLoading = true;
                mail.deflag({}, {
                    ids: [vm.message.number],
                    mbox: vm.message.mbox,
                    flag: 'Flagged'
                }).then(function () {
                    vm.message.isLoading = false;
                });
                vm.message.important = !vm.message.important;
                return;
            }

            vm.message.isLoading = true;
            mail.flag({}, {
                ids: [vm.message.number],
                mbox: vm.message.mbox,
                flag: 'Flagged'
            }).then(function () {
                vm.message.isLoading = false;
            });
            vm.message.important = !vm.message.important;
        }

        function getTags() {
            tag.getTagsByMessage({}, {
                mbox: vm.message.mbox,
                id: vm.message.number
            }).then(function (response) {
                vm.message.tags = response.data;
            })
        }
    }
})();
