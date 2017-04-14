(function () {
    'use strict';

    angular
        .module('mail.compose')
        .controller('ComposeController', ComposeController);

    ComposeController.$inject = [];
    /* @ngInject */
    function ComposeController() {
        var vm = this;
    }
})();
