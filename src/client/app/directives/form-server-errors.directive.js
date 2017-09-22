(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('formServerErrors', formServerErrors);

    formServerErrors.$inject = ['$rootScope'];

    function formServerErrors($rootScope) {
        var directive = {
            require: 'form',
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs, form) {
            scope.errors = {};
            scope.$watch(attrs['formServerErrors'], function (data, oldData) {
                console.log('data', data);
                _.forEach(data, function (error) {
                    console.log('error', error.field);
                    console.log('form', form);
                    console.log('form[error.field]', form[error.field]);
                    form[error.field].$setValidity('server', false);
                    scope.errors[error.field] = {'server': error.message};
                });
            });
        }
    }

})();
