(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('storageMailsPosition', storageMailsPosition);

    storageMailsPosition.$inject = ['$q', '$document', '$window', '$parse', '$timeout', '$rootScope', 'mail'];

    /* @ngInject */
    function storageMailsPosition($q, $document, $window, $parse, $timeout, $rootScope, mail) {
        var directive = {
            link: link,
            restrict: 'A',
            scope: {
                messages: '=?'
            }
        };
        return directive;

        function link(scope, element, attrs) {

            scope.$watch('messages', function (data, oldData) {
                if (data !== oldData) {
                    _.debounce(function () {
                        mail.setStorageMessages(data);
                    }, 1000, false)();
                }
            }, true);

            activate();

            ////

            function activate() {
                $rootScope.$on('$stateChangeStart',
                    function (event, toState, toParams, fromState, fromParams, options) {
                        console.log('fromState', fromState);
                        if (fromState.name === 'mail.inbox') {
                            mail.setStoragePositionScrollMessages(
                                $(window).scrollTop()
                            );
                        }
                    });

                $rootScope.$on('$stateChangeSuccess',
                    function (event, toState, toParams, fromState, fromParams) {
                        if (toState.name === 'mail.inbox' && !toParams.forceFetch) {
                            $timeout(function () {
                                setScrollPosition();
                            });
                        }
                    });
            }

            function setScrollPosition() {
                // alert(mail.getStoragePositionScrollMessages());
                $(window).scrollTop(
                    mail.getStoragePositionScrollMessages()
                );
            }
        }
    }

})();
