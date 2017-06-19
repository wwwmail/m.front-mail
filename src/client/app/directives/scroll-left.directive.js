(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('scrollLeft', scrollLeft);

    scrollLeft.$inject = ['CONFIG'];

    /* @ngInject */
    function scrollLeft(CONFIG) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            $(document).ready(function () {
                $('.menu-main-layout__user-info-container').scrollLeft($(this).height());
            });
        }
    }

})();