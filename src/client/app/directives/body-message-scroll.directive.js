(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('bodyMessageScroll', bodyMessageScroll);

    bodyMessageScroll.$inject = ['$timeout'];

    /* @ngInject */
    function bodyMessageScroll($timeout) {
        var directive = {
            link: link,
            restrict: 'A',
            scope: true
        };
        return directive;

        function link(scope, element, attrs) {
            $timeout(function () {
                console.log('el', $(element).height());
                $(element).css('height', $(element).height());
            }, 250);
        }
    }

})();
