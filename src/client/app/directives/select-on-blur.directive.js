(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('selectOnBlur', selectOnBlur);

    selectOnBlur.$inject = [];

    /* @ngInject */
    function selectOnBlur() {
        var directive = {
            require: 'uiSelect',
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link($scope, $element, attrs, $select) {
            var searchInput = $element.querySelectorAll('input.ui-select-search');
            if(searchInput.length !== 1) throw Error("bla");

            searchInput.on('blur', function() {
                $scope.$apply(function() {
                    var item = $select.items[$select.activeIndex];
                    $select.select(item);
                });
            });
        }
    }

})();
