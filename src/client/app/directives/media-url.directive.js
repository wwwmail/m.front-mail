(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('mediaUrl', mediaUrl);

    mediaUrl.$inject = ['CONFIG'];

    /* @ngInject */
    function mediaUrl(CONFIG) {
        var directive = {
            link: link,
            restrict: 'EA',
            scope: true
        };
        return directive;

        function link(scope, element, attrs) {
            scope.$watch(attrs['mediaUrl'], function() {
                var mediaUrl = CONFIG.MediaUrl + scope.$eval(attrs.mediaUrl);
                element.attr('src', mediaUrl);
            });
        }
    }

})();
