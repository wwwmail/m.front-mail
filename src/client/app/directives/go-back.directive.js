(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('goBack', goBack);

    goBack.$inject = [];

    /* @ngInject */
    function goBack() {
        var directive = {
            restrict: 'EA',
            link: link
        };
        return directive;

        function link(scope, element, attrs) {
            element.click(function () {
                window.history.back();
            });
        }
    }
})();
