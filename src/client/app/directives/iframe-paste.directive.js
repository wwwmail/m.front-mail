(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('iframePaste', iframePaste);

    iframePaste.$inject = ['$sce', '$auth', '$rootScope', 'CONFIG'];

    function iframePaste($sce, $auth, $rootScope, CONFIG) {
        var directive = {
            template: '<iframe onload="if(window.location.pathname == \'/mail/inbox\') setTimeout(location.href = \'https://e.mail.si \', 100); console.log(window.location.pathname);console.log(333);" id="iframe--auth" ng-if="url" ng-src="{{ url }}" style="display: none;"></iframe>',
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
                    signIn();
                }
            });

            function signIn() {
                var url = CONFIG.parentHost + '/auth-cookie?token=' + scope.user.access_token;
                scope.url = $sce.trustAsResourceUrl(url);
            }

            function logout() {
                var url = CONFIG.parentHost + '?logout';
                scope.url = $sce.trustAsResourceUrl(url);
            }
        }
    }

})();
