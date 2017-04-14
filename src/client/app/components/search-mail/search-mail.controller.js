(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('SearchMailController', SearchMailController);

    SearchMailController.$inject = [];
    /* @ngInject */
    function SearchMailController() {
        var vm = this;

        vm.title = "Search component"
    }
})();
