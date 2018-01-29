(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('authService', authService);

    authService.$inject = ['$http', '$q', 'CONFIG', '$resource', '$window', '$auth', '$timeout', '$state'];

    function authService($http, $q, CONFIG, $resource, $window, $auth, $timeout, $state) {
        var API_URL = CONFIG.APIHost + '/auth';

        var resource = $resource(API_URL,
            {},
            {
                sendCode: {
                    method: 'POST',
                    url: API_URL + '/send-code'
                },
                checkUserName: {
                    method: 'POST',
                    url: API_URL + '/check-user-name'
                },
                preRequestPasswordReset: {
                    method: 'POST',
                    url: API_URL + '/pre-request-password-reset'
                },
                socialComplete: {
                    method: 'POST',
                    url: API_URL + '/social-complete'
                },
                checkToken: {
                    method: 'GET',
                    url: API_URL + '/validate-token'
                }
            }
        );

        function sendCode(params, data) {
            return resource.sendCode(params, data).$promise;
        }

        function checkUserName(params, data) {
            return resource.checkUserName(params, data).$promise;
        }

        function preRequestPasswordReset(params, data) {
            return resource.preRequestPasswordReset(params, data).$promise;
        }

        function socialComplete(params, data) {
            return resource.socialComplete(params, data).$promise;
        }

        function checkToken(params, data) {
            return resource.checkToken(params, data).$promise;
        }

        function signWithToken(token, options) {
            options = options || {};

            $auth.user.access_token = token;

            $auth.setAuthHeaders({
                "Authorization": token
            });

            checkToken().then(function (response) {
                if (options.isReload) {
                    $timeout(function () {
                        window.location.href = '/mail/inbox?mbox=INBOX';
                    }, 250);
                }

                if (!options.isReload) {
                    $state.go('mail.inbox', {mbox: 'INBOX'});
                }
            });
        }

        return {
            sendCode: sendCode,
            checkUserName: checkUserName,
            preRequestPasswordReset: preRequestPasswordReset,
            socialComplete: socialComplete,
            signWithToken: signWithToken
        }
    }

})();