(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('passwordVerify', passwordVerify);

    passwordVerify.$inject = [];

    function passwordVerify() {
        var directive = {
            restrict: 'A',
            require: '?ngModel',
            link: link
        };
        return directive;

        function link(scope, elem, attrs, ngModel) {
            if (!ngModel) return;

            scope.$watch(attrs.ngModel, function() {
                validate();
            });

            attrs.$observe('passwordVerify', function(val) {
                validate();
            });

            var validate = function() {
                var val1 = ngModel.$viewValue;
                var val2 = attrs.passwordVerify;

                ngModel.$setValidity('passwordVerify', val1 === val2);
            };
        }
    }

})();
