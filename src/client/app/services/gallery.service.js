(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('gallery', gallery);

    gallery.$inject = ['$rootScope'];

    function gallery($rootScope) {

        function openGallery(data) {
            $rootScope.$broadcast('gallery:open', data);
        }

        return {
            openGallery: openGallery
        }
    }

})();