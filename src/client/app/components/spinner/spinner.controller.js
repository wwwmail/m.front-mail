(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('SpinnerController', SpinnerController);

    SpinnerController.$inject = ['$scope', '$timeout', 'httpPreConfig'];
    /* @ngInject */
    function SpinnerController($scope, $timeout, httpPreConfig) {
        var vm = this;

        vm.isOpen = false;

        $scope.$on('httpCallStarted', function () {
            $timeout(function() {
                vm.isOpen = true;
            });
        });

        $scope.$on('httpCallStopped', function () {
            $timeout(function() {
                vm.isOpen = false;
            }, 250);
        });

    }
})();
