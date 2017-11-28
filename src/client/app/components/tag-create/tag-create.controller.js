(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('TagCreateController', TagCreateController);

    TagCreateController.$inject = ['$rootScope', '$timeout', 'tag', 'list'];
    /* @ngInject */
    function TagCreateController($rootScope, $timeout, tag, list) {
        var vm = this;

        vm.paletteForm = {
            model: {
                color: '#fff'
            }
        };

        vm.palette = {
            items: []
        };

        vm.create = create;
        vm.select = select;
        vm.close = close;

        ////

        activate();

        function activate() {
            getColors();
        }

        function getColors() {
            _.forEach(list.getColors(), function (color, i) {
                vm.palette.items.push({
                    active: false,
                    color: color
                });
            });

            select(vm.palette.items[0]);
        }

        function select(palette) {
            $timeout(function () {
                vm.palette.selected = palette;
                vm.paletteForm.model.bgcolor = palette.color;
            });
        }

        function create(form) {
            if (form.$invalid || vm.paletteForm.isLoading) return;

            vm.paletteForm.isLoading = true;
            tag.create({}, vm.paletteForm.model).then(function (response) {
                if (vm.messages) {
                    tag.setTag(response.data, vm.messages, {sync: true}).then(function () {
                        vm.paletteForm.isLoading = false;
                        $rootScope.$broadcast('mail:sync');
                        close();
                    });
                } else {
                    close();
                }
            });
        }

        function close() {
            vm.onClose();
        }
    }
})();
