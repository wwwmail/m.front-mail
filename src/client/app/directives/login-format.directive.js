(function () {
    'use strict';

    angular
        .module('app.components')
        .directive('loginFormat', loginFormat);

    loginFormat.$inject = [];
    /* @ngInject */
    function loginFormat() {
        var directive = {
            restrict: 'EA',
            link: link,
            require: 'ngModel'
        };
        return directive;

        function link(scope, element, attrs, ngModel) {
            scope.$watch(function () {
                return ngModel.$modelValue;
            }, function (data, oldData) {
                if (typeof data === 'string') {
                    var newValue = data.toString().replace(/[^0-9A-Za-z_.-]/g, "");
                    ngModel.$setViewValue(newValue);
                    ngModel.$render();
                }
            }, true);
        }
    }
})();
