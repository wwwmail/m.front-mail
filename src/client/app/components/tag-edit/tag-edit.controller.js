(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('TagEditController', TagEditController);

    TagEditController.$inject = ['$timeout', 'tag', 'list'];
    /* @ngInject */
    function TagEditController($timeout, tag, list) {
        var vm = this;

        vm.paletteForm = {
            model: {
                color: '#fff'
            }
        };

        vm.palette = {
            items: []
        };

        vm.update = update;
        vm.select = select;
        vm.close = close;

        ////

        activate();

        function activate() {
            getColors();

            vm.palette.selected = angular.copy(vm.model);
            vm.paletteForm.model = angular.copy(vm.model);
            // select(vm.paletteForm.model);
            // console.log('vm.palette.selected', vm.palette.selected);
        }

        function getColors() {
            _.forEach(list.getColors(), function (color, i) {
                vm.palette.items.push({
                    active: false,
                    color: color,
                    bgcolor: color
                });
            });
        }

        function select(palette) {
            $timeout(function () {
                vm.palette.selected = palette;
                vm.paletteForm.model.bgcolor = palette.bgcolor;
            });
        }

        function update(form) {
            // console.log('vm.paletteForm', vm.paletteForm.model, form);

            if (form.$invalid) return;

            tag.update({}, vm.paletteForm.model).then(function (response) {
                close();
            });
        }

        function close() {
            vm.onClose();
        }
    }
})();
