(function () {
    'use strict';

    angular
        .module('app.components')
        .component('photoswipeGallery', {
            bindings: {},
            templateUrl: 'app/components/photoswipe/photoswipe.html',
            controller: 'PhotoswipeController',
            controllerAs: 'vm'
        });
})();