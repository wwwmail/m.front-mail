(function () {
    'use strict';

    angular
        .module('app.components')
        .component('tagEdit', {
            bindings: {
                onClose: '&',
                model: '='
            },
            templateUrl: 'app/components/tag-edit/tag-edit.html',
            controller: 'TagEditController',
            controllerAs: 'vm'
        });
})();