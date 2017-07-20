(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('MenuBottomController', MenuBottomController);

    MenuBottomController.$inject = ['$scope', '$auth', '$state', '$uibModal', 'mailBox', 'mail'];
    /* @ngInject */
    function MenuBottomController($scope, $auth, $state, $uibModal, mailBox, mail) {
        var vm = this;

        
    }
})();
