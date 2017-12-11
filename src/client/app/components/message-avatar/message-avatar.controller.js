(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('MessageAvatarController', MessageAvatarController);

    MessageAvatarController.$inject = ['$state', '$scope', 'mail', 'tag', '$rootScope', '$uibModal'];
    /* @ngInject */
    function MessageAvatarController($state, $scope, mail, tag, $rootScope, $uibModal) {
        var vm = this;

        activate();

        ////

        function activate() {
        }
    }
})();
