(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('setFocus', setFocus);

    setFocus.$inject = ['$window', '$timeout'];

    /* @ngInject */
    function setFocus($window, $timeout) {
        var directive = {
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
            element.on('click', function () {
                $timeout(function () {
                    var el = $window.document.getElementById(attrs.setFocus);
                    console.log('element', el);
                    el.focus();
                }, 250);
            });
        }
    }

})();
