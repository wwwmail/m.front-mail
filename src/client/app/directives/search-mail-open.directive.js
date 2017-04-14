(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('searchMailOpen', searchMailOpen);

    searchMailOpen.$inject = [];

    /* @ngInject */
    function searchMailOpen() {
        var directive = {
            link: link,
            restrict: 'A',
            scope: true
        };
        return directive;

        function link(scope, element, attrs) {
            // console.log('element', element);
            // var $input = element.find('input');

            scope.isOpen = false;

            scope.open = open;
            scope.close = close;

            function open() {
                scope.isOpen = true;
                hideMenu();

                var $searchMailInput = angular.element(document.querySelector('.search-mail__input'));
                $searchMailInput.css({
                    'width': '820px',
                    'transition': 'width .2s linear'
                });
            }

            function close() {
                scope.isOpen = false;

                var $searchMailInput = angular.element(document.querySelector('.search-mail__input'));
                $searchMailInput.css({
                    'width': '188px',
                    'transition': 'width .0s linear'
                });

                showMenu();
            }

            function showMenu() {
                var $headerNavigation = angular.element(document.querySelector('.header__navigation'));
                $headerNavigation.css({'display': 'block'});
            }

            function hideMenu() {
                var element = angular.element(document.querySelector('.header__navigation'));
                element.css({'display': 'none'});
            }
        }
    }

})();
