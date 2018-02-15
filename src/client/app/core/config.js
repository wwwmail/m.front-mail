(function () {
    'use strict';

    var core = angular.module('app.core');

    core.config(function ($translateProvider, CONFIG) {
        $translateProvider.useStaticFilesLoader({
            prefix: CONFIG.APIHost || '/i18n/',
            suffix: '.json'
        });
        $translateProvider.useSanitizeValueStrategy(null);
        $translateProvider.useLocalStorage();
        $translateProvider.useLoaderCache('$translationCache');
    });

    core.config(function (toastrConfig) {
        angular.extend(toastrConfig, {
            timeOut: 2000,
            toastClass: 'toast toast--extend'
        });
    });

    core.config(function (tagsInputConfigProvider) {
        tagsInputConfigProvider.setDefaults('tagsInput', {placeholder: ''});
    });

    core.config(function ($authProvider, CONFIG) {

        // the following shows the default values. values passed to this method
        // will extend the defaults using angular.extend

        $authProvider.configure({
            apiUrl: CONFIG.APIHost,
            tokenValidationPath: '/auth/validate-token',
            signOutUrl: '/auth/logout',
            emailRegistrationPath: '/auth/signup',
            accountUpdatePath: '/auth',
            accountDeletePath: '/auth',
            confirmationSuccessUrl: window.location.href,
            passwordResetPath: '/auth/request-password-reset',
            passwordUpdatePath: '/auth/reset-password',
            passwordResetSuccessUrl: window.location.href,
            emailSignInPath: '/auth/login',
            storage: 'localStorage',
            forceValidateToken: false,
            validateOnPageLoad: false,
            proxyIf: function () {
                return false;
            },
            proxyUrl: '/proxy',
            omniauthWindowType: 'sameWindow',
            authProviderPaths: {
                github: '/auth/github',
                facebook: '/auth/facebook',
                google: '/auth/google'
            },
            tokenFormat: {
                "access-token": "{{ token }}",
                "token-type": "Bearer"
            },
            cookieOps: {
                path: "/",
                expires: 9999,
                expirationUnit: 'days',
                secure: false,
                domain: 'domain.com'
            },
            createPopup: function (url) {
                return window.open(url, '_blank', 'closebuttoncaption=Cancel');
            },
            parseExpiry: function (headers) {
                // convert from UTC ruby (seconds) to UTC js (milliseconds)
                return (parseInt(headers['expiry']) * 1000) || null;
            },
            handleLoginResponse: function (response, $auth) {
                // console.log('handleLoginResponse', response);
                // the persistData method will store the token for subsequent requests.
                // this will be stored using cookies or localStorage depending on your config.

                // console.log('response.token',  response.data.access_token);

                $auth.persistData('auth_headers', {
                    'Authorization': response.data.access_token
                });

                return response.data;
            },
            handleAccountUpdateResponse: function (response) {
                return response.data;
            },
            handleTokenValidationResponse: function (response) {
                return response.data;
            }
        });
    });

    core.config(function ($httpProvider) {
        $httpProvider.$inject = ['$q', '$rootScope', '$injector', '$location'];

        $httpProvider
            .interceptors
            .push(function ($q, $rootScope, $injector, $location) {
                return {
                    'responseError': function (rejection) {
                        var defer = $q.defer();

                        if (rejection.status === 401) {
                            var $state = $injector.get('$state');
                            var profile = $injector.get('profile');

                            var params = {};

                            if (rejection.config.headers.Authorization) {
                                var token = rejection.config.headers.Authorization;

                                var _profile = profile.getUserByToken(token);

                                if (_profile) {
                                    profile.destroyStorageProfile(_profile);

                                    params.username = _profile.profile.username;
                                }
                            }

                            $rootScope.$broadcast('auth:invalid');

                            $state.go('signIn', params);
                        }

                        defer.reject(rejection);

                        return defer.promise;
                    },
                    'response': function (response) {
                        return response;
                    }
                };
            });
    });

    core.run(function($translate, $rootScope, $timeout, $cookies, $auth, $stateParams, CONFIG, timezone, lang, config, init) {

        if ($cookies.get('token')) {
            var tokenArr = $stateParams.token || $cookies.get('token').split('+');
            $auth.setAuthHeaders({
                "Authorization": "Bearer " + tokenArr[1]
            });
        }

        config.getIndex().then(function () {
            $rootScope.CONFIG = CONFIG;

            lang.init();

            timezone.get();

            $timeout(function () {
                init.$defer.resolve({});
            }, 250);
        });
    });
})();
