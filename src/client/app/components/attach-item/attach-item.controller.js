(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('AttachItemController', AttachItemController);

    AttachItemController.$inject = ['$auth', 'CONFIG'];
    /* @ngInject */
    function AttachItemController($auth, CONFIG) {
        var vm = this;

        activate();

        function activate() {
            vm.user = $auth.user;
            vm.CONFIG = CONFIG;

            console.log('attach', vm.attach);
            console.log('message', vm.message);
            console.log('user', vm.user);
        }
    }
})();
