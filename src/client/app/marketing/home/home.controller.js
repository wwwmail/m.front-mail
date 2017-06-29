(function () {
    'use strict';

    angular
        .module('marketing.home')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$state'];
    /* @ngInject */
    function HomeController($state) {
        var vm = this;

        activate();
        
        function activate() {
            // if ($state.params.desktop) {
            //     $state.go('signIn', {token: $state.params.token});
            //     return;
            // }

            $state.go('mail.inbox', {mbox: 'INBOX'});
        }
    }
})();
