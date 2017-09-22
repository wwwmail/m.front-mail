(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('serverError', serverError);

    serverError.$inject = ['$rootScope'];
    /* @ngInject */
    function serverError($rootScope) {
        var directive = {
            require: '?ngModel',
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs, ngModel) {
            element.on('change', function () {
                scope.$apply(function () {
                    ngModel.$setValidity('server', true);
                });
            });
        }
    }

})();
