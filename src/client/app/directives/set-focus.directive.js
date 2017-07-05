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
            element.on('click', function (event) {
                $timeout(function () {
                    $('#' + attrs.setFocus).focus();
                    event.preventDefault();
                }, 550);

                $timeout(function () {
                    $('#' + attrs.setFocus).focus();
                }, 1000);
            });
        }
    }

})();
