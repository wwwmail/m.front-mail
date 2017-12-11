(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('imageLoad', imageLoad);

    imageLoad.$inject = ['$timeout'];

    function imageLoad($timeout) {
        var directive = {
            link: link,
            restrict: 'A',
            scope: {
                imageLoadIsError: '=?',
                imageLoadIsSuccess: '=?',
                imageLoadIsLoading: '=?'
            }
        };
        return directive;

        function link(scope, element, attrs) {
            scope.imageLoadIsLoading = true;

            element.bind('load', function () {
                $timeout(function () {
                    scope.imageLoadIsLoading = false;
                    scope.imageLoadIsSuccess = true;
                });
            });

            element.bind('error', function () {
                $timeout(function () {
                    scope.imageLoadIsLoading = false;
                    scope.imageLoadIsError = true;
                });
            });
        }
    }

})();