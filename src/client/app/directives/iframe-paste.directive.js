(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('iframePaste', iframePaste);

    iframePaste.$inject = ['$sce', '$auth', '$rootScope'];

    function iframePaste($sce, $auth, $rootScope) {
        var directive = {
            template: '<iframe id="iframe--auth" ng-if="url" ng-src="{{ url }}" style="display: none;"></iframe>',
            link: link,
            restrict: 'E',
            scope: {
                action: '='
            }
        };
        return directive;

        function link(scope, element, attrs, form) {
            scope.user = $auth.user;

            $rootScope.$on('auth:logout-success', function () {
                logout();
            });

            scope.$watch('user.access_token', function (data) {
                if (data) {
                    // console.log('token', scope.user.access_token, $auth);
                    signIn();
                }
            });

            function signIn() {
                var url = 'https://mail.cz?aToken=' + '' + scope.user.access_token;
                scope.url = $sce.trustAsResourceUrl(url);
            }

            function logout() {
                var url = 'https://mail.cz?logout';
                scope.url = $sce.trustAsResourceUrl(url);
            }
        }
    }

})();
