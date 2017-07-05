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
            document.body.ontouchend = function() { document.querySelector('#' + attrs.setFocus).focus(); };

            element.on('click', function (event) {
                var $el = $('#' + attrs.setFocus);
                event.preventDefault();
                event.stopPropagation();

                $timeout(function () {
                    $el.focus();
                }, 500);
            });
        }
    }

})();
