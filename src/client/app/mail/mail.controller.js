(function () {
    'use strict';

    angular
        .module('mail')
        .controller('MailController', MailController);

    MailController.$inject = ['folder', 'tagResolve'];
    /* @ngInject */
    function MailController(folder, tagResolve) {
        var vm = this;

        activate();

        function activate() {
            vm.folder = folder;
            vm.tag = tagResolve;
        }
    }
})();
