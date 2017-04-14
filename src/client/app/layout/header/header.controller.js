(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = [];

    /* @ngInject */
    function HeaderController() {
        var vm = this;
        vm.title = 'Header';
    }
})();
