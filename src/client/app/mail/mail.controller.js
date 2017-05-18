(function () {
    'use strict';

    angular
        .module('mail')
        .controller('MailController', MailController);

    MailController.$inject = ['folder', 'tagResolve', '$state'];
    /* @ngInject */
    function MailController(folder, tagResolve, $state) {
        var vm = this;

        activate();

        function activate() {
            vm.folder = folder;
            vm.tag = tagResolve;
        }
    }
})();
