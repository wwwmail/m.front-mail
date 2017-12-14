(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('actionEffects', actionEffects);

    actionEffects.$inject = ['$timeout'];

    /* @ngInject */
    function actionEffects($timeout) {
        var directive = {
            link: link,
            restrict: 'A',
            scope: {
                actionEffects: '@?'
            }
        };
        return directive;

        function link(scope, element, attrs) {
            element.on('touchstart', function () {
                var effects = scope.actionEffects;

                function activeClass(nameClass, delay) {
                    element.addClass(nameClass);
                    $timeout(
                        function () {
                            element.removeClass(nameClass);
                        }, delay
                    );
                }

                if (effects === 'touch-bg-round') {
                    activeClass('touch-yellow-bg-round', 800);
                } else if (effects === 'touch-bg') {
                    activeClass('touch-yellow-bg', 800);
                } else if (effects === 'touch-text') {
                    activeClass('touch-yellow-text', 800);
                }
            });
        }
    }
})();
