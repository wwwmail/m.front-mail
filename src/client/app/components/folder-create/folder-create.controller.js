(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('FolderCreateController', FolderCreateController);

    FolderCreateController.$inject = ['mailBox'];
    /* @ngInject */
    function FolderCreateController(mailBox) {
        var vm = this;

        vm.form = {
            model: {}
        };

        vm.create = create;
        vm.close = close;

        activate();

        function activate() {
            console.log('cancel()', vm);
        }

        function create(form) {
            if (form.$invalid) return;

            mailBox.create({}, vm.form.model).then(function (response) {
                console.log('response', response);
                close();
            });
        }

        function close() {
            vm.onСlose();
        }
    }
})();
