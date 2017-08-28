(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('AvatarNameController', AvatarNameController);

    AvatarNameController.$inject = ['$scope'];
    /* @ngInject */
    function AvatarNameController($scope) {
        var vm = this;

        vm.title = "AvatarNameController";

        $scope.$watch('vm.name', function (data) {
            if (data) {
                getNames();
            }
        });

        $scope.$watch('vm.email', function (data) {
            if (data) {
                getNames();
            }
        });

        activate();

        function activate() {
        }

        function getNames() {
            if (vm.name) {
                var name = vm.name.replace(/[()"]/g, '');
                var firstLetter = name.split(' ')[0].slice(0, 1);
                vm.firstLetter = firstLetter.replace(/ /g, '').replace(/[()"]/g, '');
                if (vm.name.split(' ')[1]) {
                    var lastLetter = vm.name.split(' ')[1].slice(0, 1);
                    vm.lastLetter = lastLetter.replace(/ /g, '').replace(/[()"]/g, '');
                }
                return;
            }
            vm.emailLetter = vm.email.slice(0, 1);
        }
    }
})();
