(function () {
    'use strict';

    angular
        .module('mail')
        .controller('MailController', MailController);

    MailController.$inject = ['folder', 'tagResolve', '$rootScope'];
    /* @ngInject */
    function MailController(folder, tagResolve, $rootScope) {
        var vm = this;

        vm.closeMenu = closeMenu;

        activate();

        function activate() {
            vm.folder = folder;
            vm.tag = tagResolve;
        }
        
        function closeMenu() {
            $rootScope.isOpenMenu = false;
        }
    }
})();
