(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('messageHeaderSticky', messageHeaderSticky);

    messageHeaderSticky.$inject = ['$window'];

    /* @ngInject */
    function messageHeaderSticky($window) {
        var directive = {
            link: link,
            restrict: 'A',
            scope: {
                offsetTop: "@",
                stickyClass: "@"
            }
        };
        return directive;

        function link(scope, element, attrs) {

            angular.element($window).bind("scroll", function () {
                if (this.pageYOffset >= $('.mail-message__title-message').innerHeight()) {

                    element.addClass(scope.stickyClass);
                    element.css({
                        position: 'fixed',
                        top: scope.offsetTop + 'px',
                        left: 0,
                        right: 0
                    });
                } else {
                    element.removeAttr("style");
                    element.removeClass(scope.stickyClass);
                }
                scope.$apply();
            });
        }
    }
})();