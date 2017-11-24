(function () {
    'use strict';

    angular
        .module('app.components')
        .component('tagCreate', {
            bindings: {
                onClose: '&',
                messages: '='
            },
            templateUrl: 'app/components/tag-create/tag-create.html',
            controller: 'TagCreateController',
            controllerAs: 'vm'
        });
})();