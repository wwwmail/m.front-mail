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
            $state.go('mail.inbox', {mbox: 'INBOX'});
        }
    }
})();
