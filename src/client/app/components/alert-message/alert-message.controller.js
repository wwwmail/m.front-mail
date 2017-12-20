(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('AlertMessageController', AlertMessageController);

    AlertMessageController.$inject = ['$scope', '$timeout'];
    /* @ngInject */
    function AlertMessageController($scope, $timeout) {
        var vm = this;

        vm.message = '';

        vm.close = close;

        $scope.$on('notify:alert', function (e, data) {
            vm.message = data.message;
            show();
        });

        ////

        activate();

        function activate() {
        }

        function show() {
            vm.isShow = true;

            $timeout(function() {
                vm.isShow = false;
            }, 3000);
        }

        function close() {
            vm.isShow = false;
        }
    }
})();
