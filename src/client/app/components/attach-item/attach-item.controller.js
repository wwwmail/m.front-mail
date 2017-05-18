(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('AttachItemController', AttachItemController);

    AttachItemController.$inject = ['$auth'];
    /* @ngInject */
    function AttachItemController($auth) {
        var vm = this;

        activate();

        function activate() {
            vm.user = $auth.user;

            console.log('attach', vm.attach);
            console.log('message', vm.message);
            console.log('user', vm.user);
        }
    }
})();
