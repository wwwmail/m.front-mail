(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('InboxMessageController', InboxMessageController);

    InboxMessageController.$inject = [];
    /* @ngInject */
    function InboxMessageController() {
        var vm = this;

        vm.getDate = getDate;

        activate();

        function activate() {
            console.log('activate', vm.message);
        }

        function getDate(date) {
            var newDate = new Date(date);
            return moment(newDate).format("MMM Do YY");
        }
    }
})();
