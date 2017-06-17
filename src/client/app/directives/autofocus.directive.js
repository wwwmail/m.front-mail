(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('autofocus', autofocus);

    autofocus.$inject = ['$timeout'];

    /* @ngInject */
    function autofocus($timeout) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            var autofocus = scope.$eval(attrs.autofocus);
            console.log('autofocus', autofocus, element);
            if (autofocus) {
                var input = element.find('input');
                $timeout(function () {
                    input[0].focus();
                }, 250);
            }
        }
    }

})();
