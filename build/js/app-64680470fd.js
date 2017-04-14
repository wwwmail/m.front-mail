(function () {
    'use strict';

    angular.module('app', [
        'app.core',
        'app.services',
        'app.components',
        'app.directives',
        'app.layout',
        'marketing',
        'auth',
        'mail',
        'settings'
    ]);
})();

(function () {
    'use strict';

    angular.module('auth', [
        'auth.signIn',
        'auth.signUp',
        'auth.passwordReset',
        'auth.passwordUpdate'
    ]);
})();

(function () {
    'use strict';

    angular
        .module('app.core', [
            'ngSanitize',
            'ngResource',
            'ui.router',
            'ui.bootstrap',
            'ui.mask',
            'toastr',
            'checklist-model',
            'blocks.logger',
            'blocks.router',
            'ng-token-auth'
        ]);
})();

(function() {
    'use strict';

    angular.module('app.directives', []);
})();

(function() {
  'use strict';

  angular.module('app.components', []);
})();

(function() {
  'use strict';

  angular.module('app.layout', [
    'app.core'
  ]);
})();

(function () {
    'use strict';

    angular.module('mail', [
        'mail.inbox',
        'mail.compose',
        'mail.message'
    ]);
})();
(function () {
    'use strict';

    angular.module('marketing', [
        'marketing.home'
    ]);
})();

(function() {
  'use strict';

  angular.module('app.services', [
      'app.core'
  ]);
})();

(function () {
    'use strict';

    angular.module('settings', [
        'settings.main',
        'settings.tags'
    ]);
})();
(function() {
    'use strict';

    angular.module('auth.passwordReset', [
        'app.core',
        'app.components'
    ]);
})();

(function() {
    'use strict';

    angular.module('auth.signIn', [
        'app.core',
        'app.components'
    ]);
})();

(function() {
    'use strict';

    angular.module('auth.passwordUpdate', [
        'app.core',
        'app.components'
    ]);
})();

(function() {
  'use strict';

  angular.module('blocks.logger', []);
})();

(function() {
    'use strict';

    angular.module('auth.signUp', [
        'app.core',
        'app.components',
        'app.services'
    ]);
})();

(function() {
  'use strict';

  angular.module('blocks.router', [
    'ui.router',
    'blocks.logger'
  ]);
})();

(function () {
    'use strict';

    angular.module('mail.compose', []);
})();

(function () {
    'use strict';

    angular.module('mail.inbox', []);
})();

(function () {
    'use strict';

    angular.module('mail.message', []);
})();

(function() {
  'use strict';

  angular.module('marketing.home', [
    'app.core',
    'app.components'
  ]);
})();

(function () {
    'use strict';

    angular.module('settings.main', []);
})();

(function () {
    'use strict';

    angular.module('settings.tags', []);
})();

(function () {
    'use strict';

    // angular.module('app').config(function (uiSelectConfig) {
    //     uiSelectConfig.theme = 'select2';
    // })
    //     .config(function (ScrollBarsProvider) {
    //
    //         ScrollBarsProvider.defaults = {
    //             scrollButtons: {
    //                 scrollAmount: 'auto',
    //                 enable: false
    //             },
    //             theme: 'minimal',
    //             axis: 'y'
    //         };
    //
    //     });
    //
    // moment.locale('ru');

})();

(function () {
    'use strict';

    var core = angular.module('app.core');

    core.config(["toastrConfig", function (toastrConfig) {
        angular.extend(toastrConfig, {
            timeOut: 2000,
            toastClass: 'toast toast--extend'
        });
    }]);

    core.config(["$authProvider", "CONFIG", function ($authProvider, CONFIG) {

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
                console.log(' response.token',  response.access_token);
                $auth.persistData('auth_headers', {
                    'Authorization': response.access_token
                });

                return response;
            },
            handleAccountUpdateResponse: function (response) {
                return response;
            },
            handleTokenValidationResponse: function (response) {
                // console.log('handleTokenValidationResponse', response);
                return response;
            }
        });
    }])

})();

(function () {
    'use strict';

    angular
        .module('app.core')
        .constant('CONFIG',
            {
                DebugMode: true,
                APIHost: 'http://apimail.devogic.com'
            }
        );
})();

(function () {
    'use strict';

    appRun.$inject = ["routerHelper"];
    angular
        .module('app.core')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        var otherwise = '404';
        routerHelper.configureStates(getStates(), otherwise);
    }

    function getStates() {
        return [
            {
                state: '404',
                config: {
                    url: '/404',
                    templateUrl: 'app/core/errors/404.html',
                    title: '404',
                    data: {
                        'noLogin': true
                    }
                }
            }
        ];
    }
})();

(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('inboxMessageHover', inboxMessageHover);

    inboxMessageHover.$inject = [];

    /* @ngInject */
    function inboxMessageHover() {
        var directive = {
            link: link,
            restrict: 'A',
            scope: true
        };
        return directive;

        function link(scope, element, attrs) {

            element.bind('mouseover', function() {
                element.find('.round').addClass('round--border');
            });
        }
    }

})();

(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('layoutHeight', layoutHeight);

    layoutHeight.$inject = ['$document'];

    /* @ngInject */
    function layoutHeight($document) {
        var directive = {
            link: link,
            restrict: 'A',
            scope: true
        };
        return directive;

        function link(scope, element, attrs) {
            $('.layout__inner').css({
                minHeight: $(document).innerHeight()
            });
        }
    }

})();

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

(function () {
    'use strict';

    angular
        .module('mail')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'mail',
                config: {
                    url: '/mail',
                    templateUrl: 'app/mail/mail.html',
                    resolve: {
                        auth: function ($auth, $state) {
                            return $auth.validateUser().catch(function () {
                                $state.go('signIn');
                            });
                        }
                    }
                }
            }
        ];
    }
})();

(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('authService', authService);

    authService.$inject = ['$http', '$q', 'CONFIG', '$resource', '$window'];

    function authService($http, $q, CONFIG, $resource, $window) {
        var API_URL = CONFIG.APIHost + '/auth';

        var resource = $resource(API_URL,
            {},
            {
                sendCode: {
                    method: 'POST',
                    url: API_URL + '/send-code'
                }
            }
        );

        function sendCode(params, data) {
            return resource.sendCode(params, data).$promise;
        }

        return {
            sendCode: sendCode
        }
    }

})();
(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('httpPreConfig', httpPreConfig);

    httpPreConfig.$inject = ['$http', '$rootScope'];

    function httpPreConfig($http, $rootScope) {
        $http.defaults.transformRequest.push(function (data) {
            $rootScope.$broadcast('httpCallStarted');
            return data;
        });

        $http.defaults.transformResponse.push(function(data){
            $rootScope.$broadcast('httpCallStopped');
            return data;
        });

        return $http;
    }

})();
(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('mailBox', mailBox);

    mailBox.$inject = ['CONFIG', '$resource'];

    function mailBox(CONFIG, $resource) {
        var API_URL = CONFIG.APIHost + '/mail-box';

        var resource = $resource(API_URL,
            {},
            {
                get: {
                    method: 'GET',
                    url: API_URL
                }
            }
        );

        function get(params, data) {
            return resource.get(params, data).$promise;
        }

        return {
            get: get
        }
    }

})();
(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('mail', mail);

    mail.$inject = ['CONFIG', '$resource'];

    function mail(CONFIG, $resource) {
        var API_URL = CONFIG.APIHost + '/mail';

        var resource = $resource(API_URL,
            {},
            {
                get: {
                    method: 'GET',
                    url: API_URL
                },
                getById: {
                    method: 'GET',
                    url: API_URL + '/:id'
                }
            }
        );

        function get(params, data) {
            return resource.get(params, data).$promise;
        }

        function getById(params, data) {
            return resource.getById(params, data).$promise;
        }

        return {
            get: get,
            getById: getById
        }
    }

})();
(function () {
    'use strict';

    angular
        .module('settings')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'settings',
                config: {
                    url: '/settings',
                    templateUrl: 'app/settings/settings.html',
                    resolve: {
                        auth: function ($auth, $state) {
                            return $auth.validateUser().catch(function () {
                                $state.go('signIn');
                            });
                        }
                    }
                }
            }
        ];
    }
})();

(function () {
    'use strict';

    angular
        .module('auth.passwordReset')
        .controller('PasswordResetController', PasswordResetController);

    PasswordResetController.$inject = ['$state', '$auth', 'authService'];
    /* @ngInject */
    function PasswordResetController($state, $auth, authService) {
        var vm = this;

        vm.userForm = {
            isLoading: false,
            model: {},
            validations: {
                phone: {
                    'required': 'Введите номер'
                },
                code: {
                    'required': 'Введите код'
                },
                username: {
                    'required': 'Введите email или логин'
                }
            }
        };

        vm.send = send;
        vm.sendCode = sendCode;

        function send() {
            // console.log(vm.userForm);
            // vm.userForm.isLoading = true;
            // $auth.submitLogin(vm.userForm.model)
            //     .then(function (response) {
            //         vm.userForm.isLoading = false;
            //         $state.go('mail.inbox');
            //     })
            //     .catch(function (response) {
            //         // handle error response
            //         vm.userForm.errors = response.errors;
            //         console.log('error', vm.userForm.errors);
            //     });
        }

        function sendCode() {
            if (!vm.userForm.model.phone) return;

            var phone = '420' + vm.userForm.model.phone.replace(/\s{2,}/g, ' ');

            // console.log('vm.userForm.model.phone', phone);
            authService.sendCode({}, {phone: phone})
                .then(function (response) {
                    console.log('response', response);
                    vm.codeResult = response;
                })
                .catch(function (response) {
                    vm.userForm.errors = response.data;
                    console.log('error', response);
                });
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('auth.passwordReset')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'passwordReset',
                config: {
                    url: '/password-reset',
                    templateUrl: 'app/auth/password-reset/password-reset.html',
                    controller: 'PasswordResetController',
                    controllerAs: 'vm',
                    title: 'Войти'
                }
            }
        ];
    }
})();

(function () {
    'use strict';

    angular
        .module('auth.signIn')
        .controller('SignInController', SignInController);

    SignInController.$inject = ['$state', '$auth'];
    /* @ngInject */
    function SignInController($state, $auth) {
        var vm = this;

        vm.userForm = {
            isLoading: false,
            model: {}
        };

        vm.login = login;

        function login() {
            console.log(vm.userForm);
            vm.userForm.isLoading = true;
            $auth.submitLogin(vm.userForm.model)
                .then(function (response) {
                    vm.userForm.isLoading = false;
                    $state.go('mail.inbox');
                })
                .catch(function (response) {
                    // handle error response
                    vm.userForm.errors = response.errors;
                    console.log('error', vm.userForm.errors);
                });
        }

    }
})();

(function () {
    'use strict';

    angular
        .module('auth.signIn')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'signIn',
                config: {
                    url: '/sign-in',
                    templateUrl: 'app/auth/sign-in/sign-in.html',
                    controller: 'SignInController',
                    controllerAs: 'vm',
                    title: 'Войти'
                }
            }
        ];
    }
})();

(function () {
    'use strict';

    angular
        .module('auth.passwordUpdate')
        .controller('PasswordUpdateController', PasswordUpdateController);

    PasswordUpdateController.$inject = ['$state', '$auth'];
    /* @ngInject */
    function PasswordUpdateController($state, $auth) {
        var vm = this;

        vm.userForm = {
            isLoading: false,
            model: {}
        };

        vm.send = send;

        function send() {
            // console.log(vm.userForm);
            // vm.userForm.isLoading = true;
            // $auth.submitLogin(vm.userForm.model)
            //     .then(function (response) {
            //         vm.userForm.isLoading = false;
            //         $state.go('mail.inbox');
            //     })
            //     .catch(function (response) {
            //         // handle error response
            //         vm.userForm.errors = response.errors;
            //         console.log('error', vm.userForm.errors);
            //     });
        }

    }
})();

(function () {
    'use strict';

    angular
        .module('auth.passwordUpdate')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'passwordUpdate',
                config: {
                    url: '/password-update',
                    templateUrl: 'app/auth/password-update/password-update.html',
                    controller: 'PasswordUpdateController',
                    controllerAs: 'vm',
                    title: 'Войти'
                }
            }
        ];
    }
})();

(function () {
    'use strict';

    angular
        .module('blocks.logger')
        .factory('logger', logger);

    logger.$inject = ['$log', 'toastr'];

    /* @ngInject */
    function logger($log, toastr) {
        var service = {
            showToasts: true,
            error: error,
            info: info,
            success: success,
            warning: warning,

            // straight to console; bypass toastr
            log: $log.log
        };

        return service;
        /////////////////////

        function error(message, data, title) {
            toastr.error(message, title);
            $log.error('Error: ' + message, data);
        }

        function info(message, data, title) {
            toastr.info(message, title);
            $log.info('Info: ' + message, data);
        }

        function success(message, data, title) {
            toastr.success(message, title);
            $log.info('Success: ' + message, data);
        }

        function warning(message, data, title) {
            toastr.warning(message, title);
            $log.warn('Warning: ' + message, data);
        }
    }
}());

(function () {
    'use strict';

    angular
        .module('auth.signUp')
        .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['$state', '$auth', 'authService'];
    /* @ngInject */
    function SignUpController($state, $auth, authService) {
        var vm = this;

        vm.userForm = {
            isLoading: false,
            model: {},
            validations: {
                phone: {
                    'required': 'Введите номер'
                }
            }
        };

        vm.codeForm = {
            model: {}
        };

        vm.signUp = signUp;
        vm.sendCode = sendCode;

        function signUp(form) {
            var data = angular.copy(vm.userForm.model);

            if (vm.userForm.model.phone) {
                data.phone = '420' + vm.userForm.model.phone.replace(/\s{2,}/g, ' ');
            }

            $auth.submitRegistration(data)
                .then(function (response) {
                    vm.userForm.isLoading = false;
                    $state.go('mail.inbox');
                })
                .catch(function (response) {
                    vm.userForm.errors = response.data;
                    console.log('error', response);
                });
        }

        function sendCode() {
            var phone = '420' + vm.userForm.model.phone.replace(/\s{2,}/g, ' ');
            // console.log('vm.userForm.model.phone', phone);
            authService.sendCode({}, {phone: phone})
                .then(function (response) {
                    console.log('response', response);
                    vm.codeResult = response;
                })
                .catch(function (response) {
                    vm.userForm.errors = response.data;
                    console.log('error', response);
                });
        }

    }
})();

(function () {
    'use strict';

    angular
        .module('auth.signUp')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'signUp',
                config: {
                    url: '/sign-up',
                    templateUrl: 'app/auth/sign-up/sign-up.html',
                    controller: 'SignUpController',
                    controllerAs: 'vm',
                    title: 'Регистрация'
                }
            }
        ];
    }
})();

/* Help configure the state-base ui.router */
(function () {
    'use strict';

    angular
        .module('blocks.router')
        .provider('routerHelper', routerHelperProvider);

    routerHelperProvider.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
    /* @ngInject */
    function routerHelperProvider($locationProvider, $stateProvider, $urlRouterProvider) {
        /* jshint validthis:true */
        var config = {
            docTitle: '',
            resolveAlways: {}
        };

        // if (!(window.history && window.history.pushState)) {
        //   window.location.hash = '/';
        // }

        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');

        this.configure = function (cfg) {
            angular.extend(config, cfg);
        };

        this.$get = RouterHelper;
        RouterHelper.$inject = ['$location', '$rootScope', '$state', '$timeout', 'logger'];
        /* @ngInject */
        function RouterHelper($location, $rootScope, $state, $timeout, logger) {
            var handlingStateChangeError = false;
            var hasOtherwise = false;
            var stateCounts = {
                errors: 0,
                changes: 0
            };

            var service = {
                configureStates: configureStates,
                getStates: getStates,
                stateCounts: stateCounts
            };

            init();

            return service;

            ///////////////

            function configureStates(states, otherwisePath) {
                states.forEach(function (state) {
                    state.config.resolve =
                        angular.extend(state.config.resolve || {}, config.resolveAlways);
                    $stateProvider.state(state.state, state.config);
                });
                if (otherwisePath && !hasOtherwise) {
                    hasOtherwise = true;
                    $urlRouterProvider.otherwise(otherwisePath);
                }
            }

            function handleRoutingErrors() {
                // Route cancellation:
                // On routing error, go to the dashboard.
                // Provide an exit clause if it tries to do it twice.
                $rootScope.$on('$stateChangeError',
                    function (event, toState, toParams, fromState, fromParams, error) {
                        if (handlingStateChangeError) {
                            return;
                        }
                        stateCounts.errors++;
                        handlingStateChangeError = true;
                        var destination = (toState &&
                            (toState.title || toState.name || toState.loadedTemplateUrl)) ||
                            'unknown target';
                        var msg = 'Error routing to ' + destination + '. ' +
                            (error.data || '') + '. <br/>' + (error.statusText || '') +
                            ': ' + (error.status || '');
                        logger.warning(msg, [toState]);
                        $location.path('/');
                    }
                );
            }

            function init() {
                handleRoutingErrors();
                updateDocTitle();
            }

            function getStates() {
                return $state.get();
            }

            function updateDocTitle() {
                $rootScope.$on('$stateChangeSuccess',
                    function (event, toState, toParams, fromState, fromParams) {
                        stateCounts.changes++;
                        handlingStateChangeError = false;
                        var title = config.docTitle + ' ' + (toState.title || '');
                        $rootScope.title = title; // data bind to <title>
                    }
                );
            }
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('messageTextarea', messageTextarea);

    messageTextarea.$inject = [];

    /* @ngInject */
    function messageTextarea() {
        var directive = {
            template: '<div class="message-textarea"><div class="summernote message-textarea"></div></div>',
            // templateUrl: 'app/directives/message-textarea/message-textarea.html',
            link: link,
            restrict: 'EA',
            scope: true,
            replace: true
        };
        return directive;

        function link(scope, element, attrs) {
            console.log(element);
            var $el = $('.summernote').summernote({
                minHeight: 400
            });

            $('.note-statusbar').html("<span class='summernote__resize'>◢</span>");
        }
    }

})();

(function () {
    'use strict';

    angular
        .module('app.components')
        .component('composeHeader', {
            bindings: {},
            templateUrl: 'app/components/compose-header/compose-header.html',
            controller: 'ComposeHeaderController',
            controllerAs: 'vm'
        });
})();
(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('ComposeHeaderController', ComposeHeaderController);

    ComposeHeaderController.$inject = [];
    /* @ngInject */
    function ComposeHeaderController() {
        var vm = this;

        vm.title = "ComposeHeaderController"
    }
})();

(function () {
    'use strict';

    angular
        .module('app.components')
        .component('example', {
            bindings: {},
            templateUrl: 'app/components/example/example.html',
            controller: 'ExampleController',
            controllerAs: 'vm'
        });
})();
(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('ExampleController', ExampleController);

    ExampleController.$inject = [];
    /* @ngInject */
    function ExampleController() {
        var vm = this;

        vm.name = "Example component"
    }
})();

(function () {
    'use strict';

    angular
        .module('app.components')
        .component('folderCreate', {
            bindings: {},
            templateUrl: 'app/components/folder-create/folder-create.html',
            controller: 'FolderCreateController',
            controllerAs: 'vm'
        });
})();
(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('FolderCreateController', FolderCreateController);

    FolderCreateController.$inject = [];
    /* @ngInject */
    function FolderCreateController() {
        var vm = this;

        vm.tags = {};

        vm.palette = {
            items: [
                {
                    active: true,
                    color: '#f44336'
                },
                {
                    active: false,
                    color: '#e91e63'
                },
                {
                    active: false,
                    color: '#ffc107'
                },
                {
                    active: false,
                    color: '#ffeb3b'
                },
                {
                    active: false,
                    color: '#4caf50'
                },
                {
                    active: false,
                    color: '#2196f3'
                },
                {
                    active: false,
                    color: '#3f51b5'
                },
                {
                    active: false,
                    color: '#9c27b0'
                },
                {
                    active: false,
                    color: '#607d8e'
                },
                {
                    active: false,
                    color: '#9e9e9e'
                }
            ]
        };
    }
})();

(function () {
    'use strict';

    angular
        .module('app.components')
        .component('folderList', {
            bindings: {},
            templateUrl: 'app/components/folder-list/folder-list.html',
            controller: 'FolderListController',
            controllerAs: 'vm'
        });
})();
(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('FolderListController', FolderListController);

    FolderListController.$inject = ['$auth', '$state', '$uibModal'];
    /* @ngInject */
    function FolderListController($auth, $state, $uibModal) {
        var vm = this;

        vm.folders = {};

        vm.openFolderCreatePopup = openFolderCreatePopup;

        function openFolderCreatePopup() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/components/folder-create/folder-create-popup.html',
                controller: ["$scope", "$uibModalInstance", function ($scope, $uibModalInstance) {
                    $scope.cancel = cancel;

                    function cancel() {
                        $uibModalInstance.dismiss('cancel');
                    }
                }],
                // controllerAs: 'vm',
                size: 'sm',
                windowClass: 'popup popup--folder-create'
            });
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('app.components')
        .component('inboxHeader', {
            bindings: {},
            templateUrl: 'app/components/inbox-header/inbox-header.html',
            controller: 'InboxHeaderController',
            controllerAs: 'vm'
        });
})();
(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('InboxHeaderController', InboxHeaderController);

    InboxHeaderController.$inject = [];
    /* @ngInject */
    function InboxHeaderController() {
        var vm = this;

        vm.title = "InboxHeaderController"
    }
})();

(function () {
    'use strict';

    angular
        .module('app.components')
        .component('inboxMessage', {
            bindings: {
                message: '='
            },
            templateUrl: 'app/components/inbox-message/inbox-message.html',
            controller: 'InboxMessageController',
            controllerAs: 'vm'
        });
})();
(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('InboxMessageController', InboxMessageController);

    InboxMessageController.$inject = [];
    /* @ngInject */
    function InboxMessageController() {
        var vm = this;

        vm.getDate = getDate;

        activate();

        function activate() {
            console.log('activate', vm.message);
        }

        function getDate(date) {
            var newDate = new Date(date);
            return moment(newDate).format("MMM Do YY");
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('app.components')
        .component('inboxMessageList', {
            bindings: {
                messages: '='
            },
            templateUrl: 'app/components/inbox-message-list/inbox-message-list.html',
            controller: 'InboxMessageListController',
            controllerAs: 'vm'
        });
})();
(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('InboxMessageListController', InboxMessageListController);

    InboxMessageListController.$inject = ['$scope', 'mail'];
    /* @ngInject */
    function InboxMessageListController($scope, mail) {
        var vm = this;

        activate();

        function activate() {

        }

    }
})();

(function () {
    'use strict';

    angular
        .module('app.components')
        .component('settingsMenu', {
            bindings: {},
            templateUrl: 'app/components/settings-menu/settings-menu.html',
            controller: 'SettingsMenuController',
            controllerAs: 'vm'
        });
})();
(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('SettingsMenuController', SettingsMenuController);

    SettingsMenuController.$inject = [];
    /* @ngInject */
    function SettingsMenuController() {
        var vm = this;

        vm.name = "Example component"
    }
})();

(function () {
    'use strict';

    angular
        .module('app.components')
        .component('searchMail', {
            bindings: {},
            templateUrl: 'app/components/search-mail/search-mail.html',
            controller: 'SearchMailController',
            controllerAs: 'vm'
        });
})();
(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('SearchMailController', SearchMailController);

    SearchMailController.$inject = [];
    /* @ngInject */
    function SearchMailController() {
        var vm = this;

        vm.title = "Search component"
    }
})();

(function () {
    'use strict';

    angular
        .module('app.components')
        .component('spinner', {
            bindings: {},
            templateUrl: 'app/components/spinner/spinner.html',
            controller: 'SpinnerController',
            controllerAs: 'vm'
        });
})();
(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('SpinnerController', SpinnerController);

    SpinnerController.$inject = ['$scope', '$timeout', 'httpPreConfig'];
    /* @ngInject */
    function SpinnerController($scope, $timeout, httpPreConfig) {
        var vm = this;

        vm.isOpen = false;

        $scope.$on('httpCallStarted', function () {
            $timeout(function() {
                vm.isOpen = true;
            });
        });

        $scope.$on('httpCallStopped', function () {
            $timeout(function() {
                vm.isOpen = false;
            }, 250);
        });

    }
})();

(function () {
    'use strict';

    angular
        .module('app.components')
        .component('tagCreate', {
            bindings: {},
            templateUrl: 'app/components/tag-create/tag-create.html',
            controller: 'TagCreateController',
            controllerAs: 'vm'
        });
})();
(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('TagCreateController', TagCreateController);

    TagCreateController.$inject = [];
    /* @ngInject */
    function TagCreateController() {
        var vm = this;

        vm.tags = {};

        vm.palette = {
            items: [
                {
                    active: true,
                    color: '#f44336'
                },
                {
                    active: false,
                    color: '#e91e63'
                },
                {
                    active: false,
                    color: '#ffc107'
                },
                {
                    active: false,
                    color: '#ffeb3b'
                },
                {
                    active: false,
                    color: '#4caf50'
                },
                {
                    active: false,
                    color: '#2196f3'
                },
                {
                    active: false,
                    color: '#3f51b5'
                },
                {
                    active: false,
                    color: '#9c27b0'
                },
                {
                    active: false,
                    color: '#607d8e'
                },
                {
                    active: false,
                    color: '#9e9e9e'
                }
            ]
        };
    }
})();

(function () {
    'use strict';

    angular
        .module('app.components')
        .component('tagList', {
            bindings: {},
            templateUrl: 'app/components/tag-list/tag-list.html',
            controller: 'TagListController',
            controllerAs: 'vm'
        });
})();
(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('TagListController', TagListController);

    TagListController.$inject = ['$uibModal'];
    /* @ngInject */
    function TagListController($uibModal) {
        var vm = this;

        vm.tags = {};

        vm.openTagCreatePopup = openTagCreatePopup;

        function openTagCreatePopup() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/components/tag-create/tag-create-popup.html',
                controller: ["$scope", "$uibModalInstance", function ($scope, $uibModalInstance) {
                    $scope.cancel = cancel;

                    function cancel() {
                        $uibModalInstance.dismiss('cancel');
                    }
                }],
                // controllerAs: 'vm',
                size: 'sm',
                windowClass: 'popup popup--tag-create'
            });
        }

    }
})();

(function () {
    'use strict';

    angular
        .module('app.components')
        .component('timeSend', {
            bindings: {},
            templateUrl: 'app/components/time-send/time-send.html',
            controller: 'TimeSendController',
            controllerAs: 'vm'
        });
})();
(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('TimeSendController', TimeSendController);

    TimeSendController.$inject = ['$uibTooltip'];
    /* @ngInject */
    function TimeSendController($uibTooltip) {
        var vm = this;

        vm.isInfoOpen = false;

        vm.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };

        vm.isDateOpen = false;

        vm.close = close;

        function close() {
            console.log('$uibTooltip', $uibTooltip());
            $uibTooltip.setTriggers({'openTrigger': 'closeTrigger'});
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('app.components')
        .component('userMenu', {
            bindings: {},
            templateUrl: 'app/components/user-menu/user-menu.html',
            controller: 'UserMenuController',
            controllerAs: 'vm'
        });
})();
(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('UserMenuController', UserMenuController);

    UserMenuController.$inject = ['$auth', '$state'];
    /* @ngInject */
    function UserMenuController($auth, $state) {
        var vm = this;

        vm.logout = logout;

        function logout() {
            $auth.signOut().then(function() {
                $state.go('signIn');
            });
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('app.components')
        .component('validationErrors', {
            bindings: {
                data: '=',
                server: '=',
                messages: '='
            },
            templateUrl: 'app/components/validation-errors/validation-errors.html',
            controller: 'ValidationErrorsController',
            controllerAs: 'vm'
        });
})();
(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('ValidationErrorsController', ValidationErrorsController);

    ValidationErrorsController.$inject = ['$scope'];
    /* @ngInject */
    function ValidationErrorsController($scope) {
        var vm = this;

        $scope.$watch('vm', function (data) {
            console.log('ValidationErrorsController', data);
        }, true);
    }
})();

(function () {
    'use strict';

    angular
        .module('app.layout')
        .component('footer', {
            bindings: {},
            templateUrl: 'app/layout/footer/footer.html',
            controller: 'FooterController',
            controllerAs: 'vm'
        });
})();
(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('FooterController', FooterController);

    FooterController.$inject = [];

    /* @ngInject */
    function FooterController() {
        var vm = this;

        vm.title = "Footer";
    }
})();

(function () {
    'use strict';

    angular
        .module('app.layout')
        .component('header', {
            bindings: {},
            templateUrl: 'app/layout/header/header.html',
            controller: 'HeaderController',
            controllerAs: 'vm'
        });
})();
(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = [];

    /* @ngInject */
    function HeaderController() {
        var vm = this;
        vm.title = 'Header';
    }
})();

(function () {
    'use strict';

    angular
        .module('app.layout')
        .component('menuMain', {
            bindings: {},
            templateUrl: 'app/layout/menu-main/menu-main.html',
            controller: 'MenuMainController',
            controllerAs: 'vm'
        });
})();
(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('MenuMainController', MenuMainController);

    MenuMainController.$inject = ['mailBox'];

    /* @ngInject */
    function MenuMainController(mailBox) {
        var vm = this;
        vm.title = 'Menu';

        vm.icons = [
            {
                name: 'INBOX',
                icon: 'icon-incoming'
            },
            {
                name: 'INBOX.Drafts',
                icon: 'icon-draft'
            },
            {
                name: 'INBOX.Trash',
                icon: 'icon-bin'
            },
            {
                name: 'INBOX.Sent',
                icon: 'icon-sent'
            },
            {
                name: 'INBOX.Junk',
                icon: 'icon-spam'
            }
        ];

        vm.folders = {};

        activate();

        function activate() {
            getMailBox();
        }

        function getMailBox() {
            mailBox.get().then(function (response) {
                vm.folders = _.assign(vm.folders, response);
                setIcons();
            });
        }

        function setIcons() {
            _.merge(vm.folders.items, vm.icons);
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('app.layout')
        .component('menuSettings', {
            bindings: {},
            templateUrl: 'app/layout/menu-settings/menu-settings.html',
            controller: 'MenuSettingsController',
            controllerAs: 'vm'
        });
})();
(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('MenuSettingsController', MenuSettingsController);

    MenuSettingsController.$inject = [];

    /* @ngInject */
    function MenuSettingsController() {
        var vm = this;
        vm.title = 'Menu';
    }
})();

(function () {
    'use strict';

    angular
        .module('mail.compose')
        .controller('ComposeController', ComposeController);

    ComposeController.$inject = [];
    /* @ngInject */
    function ComposeController() {
        var vm = this;
    }
})();

(function () {
    'use strict';

    angular
        .module('mail.compose')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'mail.compose',
                config: {
                    url: '/compose',
                    templateUrl: 'app/mail/compose/compose.html',
                    controller: 'ComposeController',
                    controllerAs: 'vm',
                    title: 'Compose'
                }
            }
        ];
    }
})();

(function () {
    'use strict';

    angular
        .module('mail.inbox')
        .controller('InboxController', InboxController);

    InboxController.$inject = ['mail', 'mailBox', '$state'];
    /* @ngInject */
    function InboxController(mail, mailBox, $state) {
        var vm = this;

        vm.messages = {
            params: {
                'per-page': 5,
                'part': 'text'
            }
        };

        vm.folders = {};

        activate();

        function activate() {

            if ($state.params.filter) {
                vm.messages.params.filter = $state.params.filter;
            }

            if ($state.params.mbox) {
                vm.messages.params.mbox = $state.params.mbox;
            }

            get();
            getMailBox();
        }

        function get() {
            mail.get(vm.messages.params).then(function (response) {
                vm.messages = _.assign(vm.messages, response);
                console.log(vm.messages);
                _.forEach(vm.messages.items, function (message) {
                    getMessage(message);
                });
            });
        }

        function getMessage(message) {
            console.log('get', message);
            mail.getById({
                id: message.number,
                mbox: message.mbox,
                part: 'text'
            }).then(function (response) {
                message.message = response;
                console.log('message', message);
            });
        }

        function getMailBox() {
            mailBox.get().then(function (response) {
                vm.folders = _.assign(vm.folders, response);
            });
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('mail.inbox')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'mail.inbox',
                config: {
                    url: '/inbox?mbox&filter',
                    templateUrl: 'app/mail/inbox/inbox.html',
                    controller: 'InboxController',
                    controllerAs: 'vm',
                    title: 'Inbox'
                }
            }
        ];
    }
})();

(function () {
    'use strict';

    angular
        .module('mail.message')
        .controller('MessageController', MessageController);

    MessageController.$inject = ['mail', '$state'];
    /* @ngInject */
    function MessageController(mail, $state) {
        var vm = this;

        vm.message = {};

        vm.isSendTextOpen = false;

        activate();

        function activate() {
            getMessage();
        }

        function getMessage() {
            mail.getById({id: $state.params.id, mbox: $state.params.mbox}).then(function (response) {
                vm.message.model = response;
                console.log('message', vm.message.model);
            });
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('mail.message')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'mail.message',
                config: {
                    url: '/message/:mbox/:id',
                    templateUrl: 'app/mail/message/message.html',
                    controller: 'MessageController',
                    controllerAs: 'vm',
                    title: 'Message'
                }
            }
        ];
    }
})();

(function () {
    'use strict';

    angular
        .module('marketing.home')
        .controller('HomeController', HomeController);

    HomeController.$inject = [];
    /* @ngInject */
    function HomeController() {
        var vm = this;
    }
})();

(function () {
    'use strict';

    angular
        .module('marketing.home')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'home',
                config: {
                    url: '/',
                    templateUrl: 'app/marketing/home/home.html',
                    controller: 'HomeController',
                    controllerAs: 'vm',
                    title: 'Главная страница'
                }
            }
        ];
    }
})();

(function () {
    'use strict';

    angular
        .module('settings.main')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = [];
    /* @ngInject */
    function SettingsController() {
        var vm = this;
    }
})();

(function () {
    'use strict';

    angular
        .module('settings.main')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'settings.main',
                config: {
                    url: '/main',
                    templateUrl: 'app/settings/main/settings.html',
                    controller: 'SettingsController',
                    controllerAs: 'vm',
                    title: 'Settings'
                }
            }
        ];
    }
})();

(function () {
    'use strict';

    angular
        .module('settings.tags')
        .controller('TagsController', TagsController);

    TagsController.$inject = [];
    /* @ngInject */
    function TagsController() {
        var vm = this;
    }
})();

(function () {
    'use strict';

    angular
        .module('settings.tags')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'settings.tags',
                config: {
                    url: '/tags',
                    templateUrl: 'app/settings/tags/tags.html',
                    controller: 'TagsController',
                    controllerAs: 'vm',
                    title: 'Tags'
                }
            }
        ];
    }
})();

angular.module('app.core').run(['$templateCache', function($templateCache) {$templateCache.put('app/auth/view.html','<div class="auth-layout"><ui-view></ui-view></div>');
$templateCache.put('app/mail/mail.html','<section class="layout"><div class="layout__header"><header></header></div><div class="layout__inner" layout-height><div class="layout__left"><div class="layout__menu"><menu-main></menu-main></div></div><div class="layout__content"><ui-view></ui-view></div></div></section>');
$templateCache.put('app/settings/settings.html','<section class="layout"><div class="layout__header"><header></header></div><div class="layout__inner" layout-height><div class="layout__left"><div class="layout__menu"><menu-settings></menu-settings></div></div><div class="layout__content"><ui-view></ui-view></div></div></section>');
$templateCache.put('app/auth/password-reset/password-reset.html','<div class="password-reset-layout"><div class="password-reset-layout__content"><div class="password-reset-layout__form"><div class="card"><div class="auth-form"><div class="main-title-text">\u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0434\u043E\u0441\u0442\u0443\u043F\u0430</div><form class="form" name="userForm" ng-submit="vm.login(userForm)" novalidate><!-- \u0412\u0430\u0448 \u043C\u0430\u0439\u043B--><div class="form__field-item form__field-item--flex-start mrg__bottom10"><div class="field-style"><label class="field-style__title font__size13">\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u043B\u043E\u0433\u0438\u043D, \u0434\u043B\u044F \u043A\u043E\u0442\u043E\u0440\u043E\u0433\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C</label><div class="field-style__group"><input class="input input--size_l input--up-shadow width--size328" type="text" name="username" ng-model="vm.userForm.model.username" placeholder="\u041B\u043E\u0433\u0438\u043D \u0438\u043B\u0438 email" required><validation-errors data="userForm.username" server="vm.userForm.errors" messages="vm.userForm.validations.username"></validation-errors><!-- <div class="validation">\n                                         <div class="validation__message validation__message&#45;&#45;red">\n                                             \u042D\u0442\u043E \u0438\u043C\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u0443\u0436\u0435 \u0437\u0430\u043D\u044F\u0442\u043E. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435\n                                             \u0434\u0440\u0443\u0433\u043E\u0435\n                                         </div>\n                                     </div>--></div></div></div><!-- \u0421\u041C\u0421 \u0432\u0430\u043B\u0438\u0434\u0430\u0446\u0438\u044F --><div class="form__field-item form__field-item--flex-start mrg__bottom10 mrg__top16 sms-bg flex--inline flex--just-s-a"><div class="width--size328 mrg__right30"><div><div class="field-style mrg__right5 width--size201"><input class="input input--size_l input--up-shadow width--inh" type="text" name="phone" ng-model="vm.userForm.model.phone" placeholder="+420 xxx xxx xxx" ui-mask="+420 999-999-999" required></div><div class="field-style width--size121"><button class="btn btn--size_l btn--normal width--inh" type="button" ng-click="vm.sendCode()">\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u043A\u043E\u0434</button></div></div><validation-errors data="userForm.phone" server="vm.userForm.errors" messages="vm.userForm.validations.phone"></validation-errors><span class="notific notific--auth mrg__top5" ng-if="vm.codeResult">\u041D\u0430 \u043D\u043E\u043C\u0435\u0440 +420 xxx xxx xxx \u0431\u044B\u043B \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D \u043A\u043E\u0434 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438 (\u0432\u0440\u0435\u043C\u0435\u043D\u043D\u043E) <span class="color--red">{{ vm.codeResult }}</span></span></div><div class="width--size328"><div><div class="field-style mrg__right5 width--size201"><input class="input input--size_l input--up-shadow width--inh" type="text" name="code" ng-model="vm.userForm.model.code" placeholder="\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u043E\u0434 \u0438\u0437 \u0441\u043C\u0441" required></div><div class="field-style width--size121"><button class="btn btn--size_l btn--normal width--inh" type="button">\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C</button></div></div><validation-errors data="userForm.code" server="vm.userForm.errors" messages="vm.userForm.validations.code"></validation-errors></div></div><div class="form__field-item form__field-item--flex-start mrg__top25"><div class="field-style"><button class="btn btn--size_l btn--red" ui-sref="signIn">\u0414\u0430\u043B\u0435\u0435</button></div></div></form></div></div></div></div><div class="auth-layout__bg"></div></div><!-- \u0444\u0443\u0442\u0442\u0435\u0440 \u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438--><div class="footer footer__auth"><!-- \u041A\u043E\u043F\u0438\u0440\u0430\u0439\u0442--><div class="footer__copyright"><span class="">\xA9 2001\u20142017 \xABMail.cz\xBB Group a.s.</span></div><!-- \u041E\u0441\u043D\u043E\u0432\u043D\u043E\u0435 \u043C\u0435\u043D\u044E--><div class="footer__menu"><div class="navigation"><div class="navigation__row"><div class="navigation__item"><a class="navigation__link navigation__link--footer-a" href="">\u041F\u043E\u0438\u0441\u043A</a></div><div class="navigation__item"><a class="navigation__link navigation__link--footer-a" href="">\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B</a></div><div class="navigation__item"><a class="navigation__link navigation__link--footer-a" href="">\u0424\u0430\u0439\u043B\u044B</a></div><div class="navigation__item"><a class="navigation__link navigation__link--footer-a" href="">\u041D\u043E\u0432\u043E\u0441\u0442\u0438</a></div></div></div></div><!-- \u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0435 \u043C\u0435\u043D\u044E \u0441 \u0432\u044B\u0431\u043E\u0440\u043E\u043C \u044F\u0437\u044B\u043A\u0430--><div class="footer__right-menu mrg__right"><div class="navigation"><div class="navigation__row"><div class="navigation__item position width--size28"><div class="choice-language"><a class="choice-language__link choice-language--active" href=""><img class="choice-language__country" src="images/country/albania.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/bosnia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/croatia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/cz.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/macedonia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/russia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/serbia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/slovakia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/Slovenia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/uk.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/ukraine.svg" alt=""></a></div></div><div class="navigation__item"><a class="navigation__link" href="">\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B</a></div><div class="navigation__item"><a class="navigation__link" href="">\u0420\u0435\u043A\u043B\u0430\u043C\u0430</a></div></div></div></div></div>');
$templateCache.put('app/auth/password-update/password-update.html','<div class="auth-layout"><div class="password-reset-layout__content"><div class="password-reset-layout__form"><div class="card"><div class="auth-form"><div class="main-title-text">\u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0434\u043E\u0441\u0442\u0443\u043F\u0430</div><form class="form" name="userForm" ng-submit="vm.login(userForm)" novalidate><!-- \u041F\u0430\u0440\u043E\u043B\u044C--><div class="form__field-item mrg__bottom6"><div class="field-style"><div class="field-style__group"><input class="input input--size_l input--up-shadow width--size328 font__center" type="password" name="username" ng-model="vm.userForm.model.username" placeholder="\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u043E\u0432\u044B\u0439 \u043F\u0430\u0440\u043E\u043B\u044C" required><validation-errors data="userForm.username" server="vm.userForm.errors" messages="vm.userForm.validations.username"></validation-errors></div></div></div><!-- \u041F\u0430\u0440\u043E\u043B\u044C 2--><div class="form__field-item"><div class="field-style"><div class="field-style__group"><input class="input input--size_l input--up-shadow width--size328 font__center" type="password" name="username" ng-model="vm.userForm.model.username" placeholder="\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u043E\u0432\u044B\u0439 \u043F\u0430\u0440\u043E\u043B\u044C" required><validation-errors data="userForm.username" server="vm.userForm.errors" messages="vm.userForm.validations.username"></validation-errors></div></div></div><!-- \u043A\u043D\u043E\u043F\u043A\u0430 \u0414\u0430\u043B\u0435\u0435 --><div class="form__field-item mrg__top25"><div class="field-style"><button class="btn btn--size_l btn--red width--inh" ui-sref="signIn">\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0438 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C</button></div></div></form></div></div></div></div><div class="auth-layout__bg"></div></div><!-- \u0444\u0443\u0442\u0442\u0435\u0440 \u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438--><div class="footer footer__auth"><!-- \u041A\u043E\u043F\u0438\u0440\u0430\u0439\u0442--><div class="footer__copyright"><span class="">\xA9 2001\u20142017 \xABMail.cz\xBB Group a.s.</span></div><!-- \u041E\u0441\u043D\u043E\u0432\u043D\u043E\u0435 \u043C\u0435\u043D\u044E--><div class="footer__menu"><div class="navigation"><div class="navigation__row"><div class="navigation__item"><a class="navigation__link navigation__link--footer-a" href="">\u041F\u043E\u0438\u0441\u043A</a></div><div class="navigation__item"><a class="navigation__link navigation__link--footer-a" href="">\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B</a></div><div class="navigation__item"><a class="navigation__link navigation__link--footer-a" href="">\u0424\u0430\u0439\u043B\u044B</a></div><div class="navigation__item"><a class="navigation__link navigation__link--footer-a" href="">\u041D\u043E\u0432\u043E\u0441\u0442\u0438</a></div></div></div></div><!-- \u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0435 \u043C\u0435\u043D\u044E \u0441 \u0432\u044B\u0431\u043E\u0440\u043E\u043C \u044F\u0437\u044B\u043A\u0430--><div class="footer__right-menu mrg__right"><div class="navigation"><div class="navigation__row"><div class="navigation__item position width--size28"><div class="choice-language"><a class="choice-language__link choice-language--active" href=""><img class="choice-language__country" src="images/country/albania.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/bosnia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/croatia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/cz.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/macedonia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/russia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/serbia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/slovakia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/Slovenia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/uk.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/ukraine.svg" alt=""></a></div></div><div class="navigation__item"><a class="navigation__link" href="">\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B</a></div><div class="navigation__item"><a class="navigation__link" href="">\u0420\u0435\u043A\u043B\u0430\u043C\u0430</a></div></div></div></div></div>');
$templateCache.put('app/auth/sign-in/sign-in.html','<div class="auth-layout"><div class="auth-layout__content"><div class="auth-layout__form"><div class="card"><div class="auth-form"><div class="auth-form__logo mrg__bottom16"><img class="img-responsive mrg__auto" src="/images/logo.png"><hr class="hr hr--auth mrg__top16"></div><form class="form" name="userForm" ng-submit="vm.login(userForm)" novalidate><!-- \u043B\u043E\u0433\u0438\u043D --><div class="form__field-item mrg__bottom10"><div class="field-style"><input class="input input--size_l input--up-shadow width--inh" type="text" ng-model="vm.userForm.model.username" required placeholder="\u041B\u043E\u0433\u0438\u043D"><validation-errors data="userForm.username" server="vm.userForm.errors" messages="vm.userForm.validations.username"></validation-errors></div></div><!-- \u043F\u0430\u0440\u043E\u043B\u044C --><div class="form__field-item mrg__bottom10"><div class="field-style"><input class="input input--size_l input--up-shadow width--inh" type="password" ng-model="vm.userForm.model.password" required placeholder="\u041F\u0430\u0440\u043E\u043B\u044C"></div><validation-errors data="userForm.password" server="vm.userForm.errors" messages="vm.userForm.validations.password"></validation-errors></div><!-- \u0432\u043E\u0439\u0442\u0438 --><div class="form__field-item mrg__bottom10"><div class="field-style"><button class="btn btn--size_l btn--red width--inh" type="submit">\u0412\u043E\u0439\u0442\u0438</button></div></div><div class="validation mrg__bottom10"><div class="validation__message validation__message--red">{{ vm.userForm.errors[0] }}</div></div><!-- \u0437\u0430\u043F\u043E\u043C\u043D\u0438\u0442\u044C / \u0437\u0430\u0431\u044B\u043B\u0438--><div class="form__field-item mrg__bottom10 flex flex--just-s-a"><div class="field-style widtn--inh"><!--\u043D\u0430\u0448 \u0447\u0435\u043A\u0431\u043E\u043A\u0441 --><label class="checkbox-y__label checkbox-y" for="isChecked"><input class="checkbox-y__input" id="isChecked" type="checkbox" name="isChecked" ng-model="isChecked"><div class="checkbox-y__body"><span class="checkbox-y__icon icon-mark"></span></div><span class="checkbox__text" role="presentation">\u0417\u0430\u043F\u043E\u043C\u043D\u0438\u0442\u044C \u043C\u0435\u043D\u044F</span></label></div><div class="field-style widtn--inh font__right"><a class="link link-aith" ui-sref="passwordReset">\u0417\u0430\u0431\u044B\u043B\u0438 \u043F\u0430\u0440\u043E\u043B\u044C?</a></div></div></form><hr class="hr hr--auth"><button class="btn btn--size_l btn--normal width--inh btn--s-gradient" ui-sref="signUp">\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F</button></div></div></div></div><div class="auth-layout__bg"></div></div><!-- \u0444\u0443\u0442\u0442\u0435\u0440 \u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438--><div class="footer footer__auth"><!-- \u041A\u043E\u043F\u0438\u0440\u0430\u0439\u0442--><div class="footer__copyright"><span class="">\xA9 2001\u20142017 \xABMail.cz\xBB Group a.s.</span></div><!-- \u041E\u0441\u043D\u043E\u0432\u043D\u043E\u0435 \u043C\u0435\u043D\u044E--><div class="footer__menu"><div class="navigation"><div class="navigation__row"><div class="navigation__item"><a class="navigation__link navigation__link--footer-a" href="">\u041F\u043E\u0438\u0441\u043A</a></div><div class="navigation__item"><a class="navigation__link navigation__link--footer-a" href="">\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B</a></div><div class="navigation__item"><a class="navigation__link navigation__link--footer-a" href="">\u0424\u0430\u0439\u043B\u044B</a></div><div class="navigation__item"><a class="navigation__link navigation__link--footer-a" href="">\u041D\u043E\u0432\u043E\u0441\u0442\u0438</a></div></div></div></div><!-- \u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0435 \u043C\u0435\u043D\u044E \u0441 \u0432\u044B\u0431\u043E\u0440\u043E\u043C \u044F\u0437\u044B\u043A\u0430--><div class="footer__right-menu mrg__right"><div class="navigation"><div class="navigation__row"><div class="navigation__item position width--size28"><div class="choice-language"><a class="choice-language__link choice-language--active" href=""><img class="choice-language__country" src="images/country/albania.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/bosnia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/croatia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/cz.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/macedonia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/russia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/serbia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/slovakia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/Slovenia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/uk.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/ukraine.svg" alt=""></a></div></div><div class="navigation__item"><a class="navigation__link" href="">\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B</a></div><div class="navigation__item"><a class="navigation__link" href="">\u0420\u0435\u043A\u043B\u0430\u043C\u0430</a></div></div></div></div></div>');
$templateCache.put('app/auth/sign-up/sign-up.html','<div class="auth-layout"><div class="auth-layout__content"><div class="auth-layout__form auth-layout__form--wd388"><div class="card"><div class="auth-form"><div class="auth-form__logo mrg__bottom16"><img class="img-responsive mrg__auto" src="/images/logo2.png"><hr class="hr hr--auth mrg__top16"></div><form class="form" name="userForm" ng-submit="vm.signUp(userForm)" novalidate><!-- \u0438\u043C\u044F \u0438 \u0444\u0430\u043C\u0438\u043B\u0438\u044F --><div class="form__field-item mrg__bottom20 flex--inline"><div class="field-style mrg__right5"><input class="input input--size_l input--up-shadow width--inh" type="text" name="first_name" ng-model="vm.userForm.model.first_name" placeholder="\u0418\u043C\u044F" required><validation-errors data="userForm.first_name" server="vm.userForm.errors" messages="vm.userForm.validations.first_name"></validation-errors></div><div class="field-style"><input class="input input--size_l input--up-shadow width--inh" type="text" ng-model="vm.userForm.model.last_name" placeholder="\u0424\u0430\u043C\u0438\u043B\u0438\u044F" required><validation-errors data="userForm.last_name" server="vm.userForm.errors" messages="vm.userForm.validations.last_name"></validation-errors></div></div><!-- \u043B\u043E\u0433\u0438\u043D \u0432 \u0431\u0430\u0437\u0435 --><div class="form__field-item mrg__bottom10"><div class="field-style"><label class="field-style__title font__size13">\u041F\u0440\u0438\u0434\u0443\u043C\u0430\u0439\u0442\u0435 \u0438\u043C\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044E</label><div class="field-style__group"><div class="width--inh position"><span class="input-plash input-plash--top13 font__size13">@mail.cz</span> <input class="input input--size_l input--up-shadow width--inh" type="text" name="username" ng-model="vm.userForm.model.username" placeholder="\u0418\u043C\u044F \u043F\u043E\u0447\u0442\u044B" required></div><validation-errors data="userForm.username" server="vm.userForm.errors" messages="vm.userForm.validations.username"></validation-errors><!-- <div class="validation">\n                                        <div class="validation__message validation__message&#45;&#45;red">\n                                            \u042D\u0442\u043E \u0438\u043C\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u0443\u0436\u0435 \u0437\u0430\u043D\u044F\u0442\u043E. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435\n                                            \u0434\u0440\u0443\u0433\u043E\u0435\n                                        </div>\n                                    </div>--></div><div class="input-data-valide-test mrg__top10 mrg__bottom10">\u0421\u0432\u043E\u0431\u043E\u0434\u043D\u043E: <span class="input-data-valide-test__we-offer">abc779736</span></div></div></div><!-- \u043F\u0430\u0440\u043E\u043B\u044C --><div class="form__field-item mrg__bottom6"><div class="field-style"><input class="input input--size_l input--up-shadow width--inh" type="password" name="password" ng-model="vm.userForm.model.password" placeholder="\u041F\u0430\u0440\u043E\u043B\u044C" required><validation-errors data="userForm.password" server="vm.userForm.errors" messages="vm.userForm.validations.password"></validation-errors></div></div><!-- \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u0435 \u043F\u0430\u0440\u043E\u043B\u044F --><div class="form__field-item mrg__bottom10"><div class="field-style"><input class="input input--size_l input--up-shadow width--inh" type="password" name="passwordConf" ng-model="vm.userForm.model.passwordConf" placeholder="\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u0435 \u043F\u0430\u0440\u043E\u043B\u044F" required><validation-errors data="userForm.passwordConf" server="vm.userForm.errors" messages="vm.userForm.validations.passwordConf"></validation-errors></div></div><!-- \u0421\u041C\u0421 \u0432\u0430\u043B\u0438\u0434\u0430\u0446\u0438\u044F --><div class="form__field-item mrg__bottom25 mrg__top30 flex flex--row-wrap sms-bg"><div class="field-style mrg__right5 width--size177"><input class="input input--size_l input--up-shadow width--inh" type="text" name="phone" ng-model="vm.userForm.model.phone" placeholder="+420 xxx xxx xxx" ui-mask="+420 999-999-999" required></div><div class="field-style width--inh"><button class="btn btn--size_l btn--normal width--inh btn--s-gradient" type="button" ng-click="vm.sendCode()">\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u043A\u043E\u0434</button></div><validation-errors data="userForm.phone" server="vm.userForm.errors" messages="vm.userForm.validations.phone"></validation-errors><span class="notific notific--auth" ng-if="vm.codeResult">\u041D\u0430 \u043D\u043E\u043C\u0435\u0440 +420 xxx xxx xxx \u0431\u044B\u043B \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D \u043A\u043E\u0434 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438 <span class="color--red font--size18">\u041A\u043E\u0434: {{ vm.codeResult.code }}</span></span></div><!-- \u0421\u041C\u0421 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u0435 \u043A\u043E\u0434\u0430 --><div class="form__field-item mrg__bottom20 mrg__top16 flex flex--row-wrap"><div class="width-inh flex--inline align-items--cn"><div class="field-style mrg__right5 width--size177"><input class="input input--size_l input--up-shadow width--inh" type="text" name="code" ng-model="vm.userForm.model.code" placeholder="\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u043E\u0434 \u0438\u0437 \u0441\u043C\u0441" required></div><div class="field-style width--aut"><!--<button class="btn btn&#45;&#45;size_l btn&#45;&#45;normal width&#45;&#45;inh btn--s-gradient" type="button">\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C--><!--</button>--> <span class="ok-validates width--inh">\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D</span></div></div><validation-errors data="userForm.code" server="vm.userForm.errors" messages="vm.userForm.validations.code"></validation-errors></div><!-- \u0421\u043E\u0433\u043B\u0430\u0448\u0435\u043D\u0438\u0435 --><div class="form__field-item mrg__bottom10"><div class="field-style widtn--inh"><!--\u043D\u0430\u0448 \u0447\u0435\u043A\u0431\u043E\u043A\u0441 --><label class="checkbox-y__label checkbox-y" for="isChecked"><input class="checkbox-y__input" id="isChecked" type="checkbox" name="isChecked" ng-model="isChecked"><div class="checkbox-y__body"><span class="checkbox-y__icon icon-mark"></span></div><span class="checkbox__text font__size12 color--silver" role="presentation">\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0430\u044F \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044E \u0432\u044B \u043F\u0440\u0438\u043D\u0438\u043C\u0430\u0435\u0442\u0435 \u043F\u0440\u0430\u0432\u0438\u043B\u0430 \u043E\u043F\u0438\u0441\u0430\u043D\u043D\u044B\u0435 \u0432 <a class="link link-aith" href="">\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u043E\u043C \u0441\u043E\u0433\u043B\u0430\u0448\u0435\u043D\u0438\u0438</a></span></label></div></div><!-- \u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u0441\u044F --><div class="form__field-item mrg__bottom10"><hr class="hr hr--auth"><div class="field-style"><button class="btn btn--size_l btn--red width--inh" type="submit">\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u0441\u044F</button></div></div></form><!--<hr class="hr hr&#45;&#45;auth ">--> <button class="btn btn--size_l btn--link-style" ui-sref="signIn">\u0412\u0445\u043E\u0434</button></div></div></div></div><div class="auth-layout__bg"></div></div><!-- \u0444\u0443\u0442\u0442\u0435\u0440 \u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438--><div class="footer footer__auth"><!-- \u041A\u043E\u043F\u0438\u0440\u0430\u0439\u0442--><div class="footer__copyright"><span class="">\xA9 2001\u20142017 \xABMail.cz\xBB Group a.s.</span></div><!-- \u041E\u0441\u043D\u043E\u0432\u043D\u043E\u0435 \u043C\u0435\u043D\u044E--><div class="footer__menu"><div class="navigation"><div class="navigation__row"><div class="navigation__item"><a class="navigation__link navigation__link--footer-a" href="">\u041F\u043E\u0438\u0441\u043A</a></div><div class="navigation__item"><a class="navigation__link navigation__link--footer-a" href="">\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B</a></div><div class="navigation__item"><a class="navigation__link navigation__link--footer-a" href="">\u0424\u0430\u0439\u043B\u044B</a></div><div class="navigation__item"><a class="navigation__link navigation__link--footer-a" href="">\u041D\u043E\u0432\u043E\u0441\u0442\u0438</a></div></div></div></div><!-- \u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0435 \u043C\u0435\u043D\u044E \u0441 \u0432\u044B\u0431\u043E\u0440\u043E\u043C \u044F\u0437\u044B\u043A\u0430--><div class="footer__right-menu mrg__right"><div class="navigation"><div class="navigation__row"><div class="navigation__item position width--size28"><div class="choice-language"><a class="choice-language__link choice-language--active" href=""><img class="choice-language__country" src="images/country/albania.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/bosnia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/croatia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/cz.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/macedonia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/russia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/serbia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/slovakia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/Slovenia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/uk.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/ukraine.svg" alt=""></a></div></div><div class="navigation__item"><a class="navigation__link" href="">\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B</a></div><div class="navigation__item"><a class="navigation__link" href="">\u0420\u0435\u043A\u043B\u0430\u043C\u0430</a></div></div></div></div></div>');
$templateCache.put('app/core/errors/404.html','404');
$templateCache.put('app/components/compose-header/compose-header.html','<div class="inbox-header"><div class="inbox-header__row"><div class="inbox-header__item"><a class="inbox-header__link" href><span class="icon-redo inbox-header__icon inbox-header__icon--green"></span> <span class="inbox-header__name">\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C</span></a></div><!--        <div class="inbox-header__item pull-right">\n            <a class="inbox-header__link" href>\n                <span class="icon-redo inbox-header__icon inbox-header__icon&#45;&#45;green"></span>\n                <span class="inbox-header__name">\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C</span>\n            </a>\n        </div>--></div></div>');
$templateCache.put('app/components/example/example.html','<div class="card exp-parcel-card"><div class="card__header exp-parcel-card__header"><div class="row"><div class="col-md-7 col-sm-7 col-xs-7"><div class="exp-parcel-card__name pointer"><span>\u041D\u043E\u0432\u044B\u0439 \u0430\u0434\u0440\u0435\u0441</span></div></div><div class="col-md-5 col-sm-5 col-xs-5"><a class="exp-parcel-card__button" href ng-click="vm.close()"><img class="svg svg--size16" src="/images/svg/products-warehouse/card/close.svg"></a></div></div></div><div class="card__body exp-parcel-card__body row"><form class="col-lg-12 col-md-12 col-sm-12 col-xs-12" name="addressForm" ng-submit="vm.add(addressForm)" novalidate><div class="row"><div class="col-md-6"><label class="form__label">\u041F\u0440\u0438\u0432\u044F\u0437\u0430\u0442\u044C \u043F\u043E\u043B\u0443\u0447\u0430\u0442\u0435\u043B\u044F:</label><recipient-select selected="vm.addressForm.recipient" model=""></recipient-select></div><div class="col-md-6 mobile-group--size10"><label class="form__label">\u0421\u0442\u0440\u0430\u043D\u0430:</label><country-select selected="vm.addressForm.country" name="country" params="{id: \'USA\'}" required="true" is-no-select="true" on-selected="vm.clearAfterCountry()"></country-select><tooltip-validation ng-if="addressForm.country.$invalid && (addressForm.$submitted || addressForm.country.$touched)" tooltip-placement="bottom" tooltip-validation-errors="addressForm.country.$error" tooltip-validation-messages="vm.address.validations.country"></tooltip-validation></div><div class="col-md-6 form__group--size10"><label class="form__label">\u0420\u0435\u0433\u0438\u043E\u043D:</label><region-select name="region" selected="vm.addressForm.region" country-id="vm.addressForm.country.id" required="true" disabled="vm.addressForm.country.id" on-selected="vm.clearAfterRegion()"></region-select><tooltip-validation ng-if="addressForm.region.$invalid && (addressForm.$submitted || addressForm.region.$touched) && addressForm.country.$valid" tooltip-placement="bottom" tooltip-validation-errors="addressForm.region.$error" tooltip-validation-messages="vm.address.validations.region"></tooltip-validation></div><div class="col-md-6 form__group--size10"><label class="form__label">\u0413\u043E\u0440\u043E\u0434:</label><city-select name="city" selected="vm.addressForm.city" region-id="vm.addressForm.region.id" disabled="vm.addressForm.region.id" required="true" on-selected="vm.clearAfterCity()"></city-select><tooltip-validation ng-if="addressForm.city.$invalid && (addressForm.$submitted || addressForm.city.$touched) && addressForm.region.$valid" tooltip-placement="bottom" tooltip-validation-errors="addressForm.city.$error" tooltip-validation-messages="vm.address.validations.city"></tooltip-validation></div><div class="col-md-6 form__group--size10"><label class="form__label">\u0418\u043D\u0434\u0435\u043A\u0441:</label><input class="form__input" type="text" name="postalCode" ng-model="vm.addressForm.postalCode" required><tooltip-validation ng-if="addressForm.postalCode.$invalid && (addressForm.$submitted || addressForm.postalCode.$touched) && addressForm.city.$valid" tooltip-placement="bottom" tooltip-validation-errors="addressForm.postalCode.$error" tooltip-validation-messages="vm.address.validations.postalCode"></tooltip-validation></div><div class="col-md-6 form__group--size10"><label class="form__label">\u0423\u043B\u0438\u0446\u0430:</label><input class="form__input" type="text" name="street" ng-model="vm.addressForm.street" required><tooltip-validation ng-if="addressForm.street.$invalid && (addressForm.$submitted || addressForm.street.$touched) && addressForm.postalCode.$valid" tooltip-placement="bottom" tooltip-validation-errors="addressForm.street.$error" tooltip-validation-messages="vm.address.validations.street"></tooltip-validation></div><div class="col-md-12 form__group--size10"><label class="form__label">\u0414\u043E\u043C, \u043A\u043E\u0440\u043F\u0443\u0441, \u043A\u0432\u0430\u0440\u0442\u0438\u0440\u0430:</label><div class="row-inputs clearfix"><div class="row-inputs__item w50"><input class="form__input" type="text" name="house" ng-model="vm.addressForm.house" required><tooltip-validation ng-if="addressForm.house.$invalid && (addressForm.$submitted || addressForm.house.$touched) && addressForm.street.$valid" tooltip-placement="bottom" tooltip-validation-errors="addressForm.house.$error" tooltip-validation-messages="vm.address.validations.house"></tooltip-validation></div><div class="row-inputs__item w25"><input class="form__input" type="text" name="building" ng-model="vm.addressForm.building"><tooltip-validation ng-if="addressForm.building.$invalid && (addressForm.$submitted || addressForm.building.$touched) && addressForm.house.$valid" tooltip-placement="bottom" tooltip-validation-errors="addressForm.building.$error" tooltip-validation-messages="vm.address.validations.building"></tooltip-validation></div><div class="row-inputs__item w25"><input class="form__input" type="text" name="apartment" ng-model="vm.addressForm.apartment"><tooltip-validation ng-if="addressForm.apartment.$invalid && (addressForm.$submitted || addressForm.apartment.$touched) && addressForm.building.$valid" tooltip-placement="bottom" tooltip-validation-errors="addressForm.apartment.$error" tooltip-validation-messages="vm.address.validations.apartment"></tooltip-validation></div></div></div></div><div class="col-md-12 form__buttons__group text-center"><button class="btn-round btn-round--grey" type="button" ng-click="vm.close()">\u041E\u0442\u043C\u0435\u043D\u0430</button> <button class="btn-round btn-round--blue" type="submit">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C</button></div></form></div></div>');
$templateCache.put('app/components/folder-create/folder-create-popup.html','<div><div class="popup__close" ng-click="cancel()">\xD7</div><folder-create></folder-create></div>');
$templateCache.put('app/components/folder-create/folder-create.html','<div class="folder-create"><div class="tag-create__title">\u0421\u043E\u0437\u0434\u0430\u0451\u043C \u043F\u0430\u043F\u043A\u0443</div><div class="mrg__top15"><form novalidate><div class="folder-create__input mrg__top15"><div class="mrg__right10"><span class="font__size13">\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435</span></div><div><input class="input input--size_s width--inh input--fc-sh-yellow" type="text" required> <a class="link link--dotted link--violet font__size13" href="">\u0412\u043B\u043E\u0436\u0438\u0442\u044C \u0432 \u0434\u0440\u0443\u0433\u0443\u044E \u043F\u0430\u043F\u043A\u0443</a></div></div><!--<div class="palette-list folder-create__palette mrg__top30">--><!--<div class="palette-list__item"--><!--style="background-color: {{ palette.color }}"--><!--ng-repeat="palette in vm.palette.items track by $index">--><!--<span class="palette-list__icon icon-mark" ng-if="palette.active"></span>--><!--</div>--><!--</div>--><div class="folder-create__btn mrg__top40"><button class="btn-y btn-y--border" type="submit">\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043F\u0430\u043F\u043A\u0443</button> <button class="btn-y btn-y--border">\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C</button></div></form></div></div>');
$templateCache.put('app/components/folder-list/folder-list-popover.html','<folder-list></folder-list>');
$templateCache.put('app/components/folder-list/folder-list.html','<div class="folder-list"><div class="folder-list__body"><!--\u041F\u043E\u043A\u0430 \u0447\u0442\u043E \u0441\u043A\u0440\u044B\u0432\u0430\u0435\u043C--><!--<input type="text">--></div><div><a class="folder-list__link folder-list__link--disabled" href><span class="folder-list__name">\u0412\u0445\u043E\u0434\u044F\u0449\u0438\u0435</span> </a><a class="folder-list__link" href><span class="folder-list__name">\u0418\u0441\u0445\u043E\u0434\u044F\u0449\u0438\u0435</span> </a><a class="folder-list__link" href><span class="folder-list__name">\u0423\u0434\u0430\u043B\u0435\u043D\u043D\u044B\u0435</span> </a><a class="folder-list__link" href><span class="folder-list__name">\u0421\u043F\u0430\u043C</span> </a><a class="folder-list__link" href><span class="folder-list__name">\u0427\u0435\u0440\u043D\u043E\u0432\u0438\u043A\u0438</span></a></div><hr class="hr"><div><a class="folder-list__link folder-list__link--new" href ng-click="vm.openFolderCreatePopup()"><span class="folder-list__name">\u041D\u043E\u0432\u0430\u044F \u043F\u0430\u043F\u043A\u0430...</span></a></div></div>');
$templateCache.put('app/components/inbox-message/inbox-message.html','<div class="inbox-message pointer" ng-class="{\'inbox-message--importmant\': vm.message.isImportmant}" ng-mouseover="vm.message.hover = true" ng-mouseleave="vm.message.hover = false" inbox-message-hover ui-sref="mail.message({id: vm.message.number, mbox: vm.message.mbox})"><div><div class="inbox-message__importance pointer" ng-click="vm.message.isImportmant = !vm.message.isImportmant; $event.stopPropagation();"><span class="icon-important"></span></div></div><div><div class="inbox-message__checked"><div class="checkbox-y checkbox-y--size15" ng-click="$event.stopPropagation();"><label class="checkbox-y__label"><input class="checkbox-y__input" type="checkbox" ng-model="vm.message.isChecked"><div class="checkbox-y__body"><span class="checkbox-y__icon icon-mark"></span></div></label></div></div></div><div><div class="inbox-message__avatar"><div class="avatar avatar--size30"><img class="avatar__image" src="/images/avatar.png"></div></div></div><div><div class="inbox-message__name">{{ vm.message.from }}</div></div><div><div class="inbox-message__round"><div class="inbox-message__round pointer" ng-click="vm.message.active = !vm.message.active; $event.stopPropagation();"><div class="round" ng-class="{\n                                        \'round&#45;&#45;border\': vm.message.hover,\n                                        \'round&#45;&#45;yellow\': vm.message.active\n                                    }"></div></div></div></div><div><div class="inbox-message__labels"><div class="label-ydx label-ydx--green inbox-message__label">\u041C\u0435\u0442\u043A\u0430 1</div><div class="label-ydx label-ydx--red inbox-message__label">\u041C\u0435\u0442\u043A\u0430 2</div><div class="label-ydx label-ydx--blue inbox-message__label">\u041C\u0435\u0442\u043A\u0430 3</div></div></div><div class="inbox-message__text"><div class="inbox-message__subject">{{ vm.message.Subject }}</div><div class="inbox-message__message" ng-bind-html="vm.message.message.body"></div></div><div><div class="inbox-message__data">{{ vm.getDate(vm.message.date.date) }}</div></div></div>');
$templateCache.put('app/components/inbox-header/inbox-header.html','<div class="inbox-header"><div class="inbox-header__row"><div class="inbox-header__item"><a class="inbox-header__link" ui-sref="mail.compose"><span class="icon-write inbox-header__icon inbox-header__icon--blue"></span> <span class="inbox-header__name">\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C</span></a></div><div class="inbox-header__item"><a class="inbox-header__link" href><span class="icon-redo inbox-header__icon inbox-header__icon--green"></span> <span class="inbox-header__name">\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C</span></a></div><div class="inbox-header__item"><a class="inbox-header__link" href><span class="icon-forward inbox-header__icon inbox-header__icon--blue"></span> <span class="inbox-header__name">\u041F\u0435\u0440\u0435\u0441\u043B\u0430\u0442\u044C</span></a></div><div class="inbox-header__item"><a class="inbox-header__link" href><span class="icon-bin inbox-header__icon inbox-header__icon--red"></span> <span class="inbox-header__name">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</span></a></div><div class="inbox-header__item"><a class="inbox-header__link" href><span class="icon-spam inbox-header__icon inbox-header__icon--yellow"></span> <span class="inbox-header__name">\u0421\u043F\u0430\u043C</span></a></div><div class="inbox-header__item"><a class="inbox-header__link" href><span class="icon-unread inbox-header__icon inbox-header__icon--blue"></span> <span class="inbox-header__name">\u041D\u0435 \u043F\u0440\u043E\u0447\u0438\u0442\u0430\u043D\u043E</span></a></div><div class="inbox-header__item"><a class="inbox-header__link" href uib-popover-template="\'app/components/tag-list/tag-list-popover.html\'" popover-class="popover--tag-list" popover-placement="bottom" popover-animation="true" popover-trigger="\'outsideClick\'"><span class="icon-tag inbox-header__icon inbox-header__icon--blue"></span><div class="inbox-header__name">\u0422\u044D\u0433 <span class="icon-arrow-down inbox-header__name-icon"></span></div></a></div><div class="inbox-header__item"><a class="inbox-header__link" href uib-popover-template="\'app/components/folder-list/folder-list-popover.html\'" popover-class="popover--folder-list" popover-placement="bottom" popover-animation="true" popover-trigger="\'outsideClick\'"><span class="icon-folder inbox-header__icon inbox-header__icon--blue"></span><div class="inbox-header__name">\u0412 \u043F\u0430\u043F\u043A\u0443 <span class="icon-arrow-down inbox-header__name-icon"></span></div></a></div><div class="inbox-header__item"><a class="inbox-header__link" href><span class="icon-archive inbox-header__icon inbox-header__icon--blue"></span> <span class="inbox-header__name">\u0410\u0440\u0445\u0438\u0432\u0438\u0440\u043E\u0432\u0430\u0442\u044C</span></a></div><div class="inbox-header__item"><a class="inbox-header__link" href><span class="icon-pin inbox-header__icon inbox-header__icon--blue"></span> <span class="inbox-header__name">\u0417\u0430\u043A\u0440\u0435\u043F\u0438\u0442\u044C</span></a></div><div class="inbox-header__item"><a class="inbox-header__link" href><span class="icon-more inbox-header__icon inbox-header__icon--blue"></span> <span class="inbox-header__name">\u0415\u0449\u0435</span></a></div></div></div>');
$templateCache.put('app/components/inbox-message-list/inbox-message-list.html','<div class="inbox-message-list"><inbox-message message="message" ng-repeat="message in vm.messages.items"></inbox-message></div>');
$templateCache.put('app/components/search-mail/search-mail.html','<div class="search-mail" search-mail-open><div class="search-mail__close" ng-if="isOpen"><button class="btn-y btn-y--white btn-y--close" ng-click="close()"><img class="btn-y__icon" src="/images/cancel.svg" alt="close search"></button><!--<button class="button button_theme_islands button_size_m button__control i-bem"--><!--data-bem=\'{"button":{}}\' role="button" type="button"--><!--ng-click="close()"><span class="button__text">--><!--<img src="/images/cancel.svg" alt="close search">--><!--</span>--><!--</button>--></div><div class="search-mail__group"><form ng-submit="vm.search()" novalidate><div class="control-group" role="group"><span class="input input--no-border input_theme_islands input_size_m input_type_search i-bem" data-bem=\'{"input":{}}\'><span class="input__box search-mail__input"><input class="input__control" placeholder="\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0437\u0430\u043F\u0440\u043E\u0441" type="search" ng-model="model" ng-click="open()"></span></span><button class="button button_theme_islands button_size_m button__control i-bem" data-bem=\'{"button":{}}\' role="button" type="submit" ng-click="open()"><span class="button__text">\u041F\u043E\u0438\u0441\u043A</span></button></div></form></div></div>');
$templateCache.put('app/components/settings-menu/settings-menu.html','<div class="settings-menu"><div class="settings-menu__body"><a class="settings-menu__title" ui-sref="settings.main">\u0412\u0441\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438</a><div class="settings-menu__row"><div class="row row--size15 mrg__top20"><div class="col-xs-6"><span class="icon-folder-star color--yellow font__size18"></span> <a class="settings-menu__link" href="">\u041F\u0430\u043F\u043A\u0438</a></div><div class="col-xs-6"><span class="icon-rules color--green font__size18"></span> <a class="settings-menu__link" href="">\u041F\u0440\u0430\u0432\u0438\u043B\u0430 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438</a></div></div><div class="row row--size15 mrg__top20"><div class="col-xs-6"><span class="icon-tag-star color--green font__size18"></span> <a class="settings-menu__link" href="">\u041F\u0440\u0430\u0432\u0438\u043B\u0430 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438</a></div><div class="col-xs-6"><span class="icon-contacts color--green font__size18"></span> <a class="settings-menu__link" href="">\u041F\u0440\u0430\u0432\u0438\u043B\u0430 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438</a></div></div></div></div></div>');
$templateCache.put('app/components/spinner/spinner.html','<div class="spinner" ng-show="vm.isOpen"></div>');
$templateCache.put('app/components/tag-create/tag-create-popup.html','<div><div class="popup__close" ng-click="cancel()">\xD7</div><tag-create></tag-create></div>');
$templateCache.put('app/components/tag-create/tag-create.html','<div class="tag-create"><div class="tag-create__title">\u0421\u043E\u0437\u0434\u0430\u0435\u043C \u0442\u044D\u0433</div><div class="mrg__top15"><form novalidate><div class="tag-create__input mrg__top15"><div class="mrg__right10"><span class="font__size13">\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435</span></div><div><input class="input input--size_s width--inh input--fc-sh-yellow" type="text" required></div></div><div class="palette-list tag-create__palette mrg__top30"><div class="palette-list__item" style="background-color: {{ palette.color }}" ng-repeat="palette in vm.palette.items track by $index"><span class="palette-list__icon icon-mark" ng-if="palette.active"></span></div></div><div class="tag-create__btn mrg__top40"><button class="btn-y btn-y--border" type="submit">\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0442\u044D\u0433</button> <button class="btn-y btn-y--border">\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C</button></div></form></div></div>');
$templateCache.put('app/components/tag-list/tag-list-popover.html','<tag-list></tag-list>');
$templateCache.put('app/components/tag-list/tag-list.html','<div class="tag-list"><div class="tag-list__body"><!--\u041F\u043E\u043A\u0430 \u0447\u0442\u043E \u0441\u043A\u0440\u044B\u0432\u0430\u0435\u043C--><!--<input type="text">--></div><div class="tag-list__links"><a class="tag-list__link tag-list__link--underline tag-list__link--unread" href><span class="tag-list__name">\u041D\u0435 \u043F\u0440\u043E\u0447\u0438\u0442\u0430\u043D\u043E</span> </a><a class="tag-list__link" href><span class="tag-list__name tag-list__name--important">\u0412\u0430\u0436\u043D\u044B\u0435 </span></a><a class="tag-list__link" href><span class="tag-list__first-letter" style="background-color: #ff3f30; color: #fff">\u0414 </span><span class="tag-list__name">\u0440\u0443\u0437\u044C\u044F </span></a><a class="tag-list__link" href><span class="tag-list__first-letter" style="background-color: #ff3f30; color: #fff">\u0420 </span><span class="tag-list__name">\u0430\u0431\u043E\u0442\u0430</span></a></div><hr class="hr"><div class="tag-list__header">\u0421\u043D\u044F\u0442\u044C \u0442\u0435\u0433:</div><div class="tag-list__links"><a class="tag-list__link" href><span class="tag-list__first-letter" style="background-color: #31c73b; color: #fff">\u041F </span><span class="tag-list__name">\u0430\u0440\u0442\u043D\u0435\u0440\u044B</span></a></div><hr class="hr"><div><a class="tag-list__link" href ng-click="vm.openTagCreatePopup()"><span class="tag-list__name">\u041D\u043E\u0432\u044B\u0439 \u0442\u0435\u0433..</span></a></div></div>');
$templateCache.put('app/components/time-send/time-send-popover.html','<time-send></time-send>');
$templateCache.put('app/components/time-send/time-send.html','<div class="time-send" ng-class="{\'time-send--info-open\': vm.isInfoOpen}"><div class="time-send__close pointer" ng-click="vm.close()"><img class="img-responsive" src="/images/cancel.svg"></div><div class="time-send__content"><div class="time-send__info font__size13" ng-if="vm.isInfoOpen">\u0412\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u0443\u043A\u0430\u0437\u0430\u0442\u044C \u0434\u0430\u0442\u0443 \u0438 \u0432\u0440\u0435\u043C\u044F, \u043A\u043E\u0433\u0434\u0430 \u043F\u0438\u0441\u044C\u043C\u043E \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E. \u041E\u0442\u043F\u0440\u0430\u0432\u043A\u0443 \u043F\u0438\u0441\u044C\u043C\u0430 \u043C\u043E\u0436\u043D\u043E \u043E\u0442\u043B\u043E\u0436\u0438\u0442\u044C \u043D\u0435 \u0431\u043E\u043B\u0435\u0435 \u0447\u0435\u043C \u043D\u0430 \u043E\u0434\u0438\u043D \u0433\u043E\u0434 \u0441 \u0442\u0435\u043A\u0443\u0449\u0435\u0439 \u0434\u0430\u0442\u044B.</div><div class="time-send__planing mrg__top10"><div class="time-send__planing-item"><div class="checkbox-y checkbox-y--size15"><label class="checkbox-y__label" for="isChecked"><input class="checkbox-y__input" id="isChecked" type="checkbox" name="isChecked" ng-model="isChecked"><div class="checkbox-y__body"><span class="checkbox-y__icon icon-mark"></span></div></label></div></div><div class="time-send__planing-item font__size15"><div uib-datepicker-popup="\'dd-MMMM-yyyy\'" ng-model="vm.dateModel" is-open="vm.isDateOpen" datepicker-options="vm.dateOptions"></div>\u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C <a href ng-click="vm.isDateOpen = !vm.isDateOpen">\u0441\u0435\u0433\u043E\u0434\u043D\u044F</a> \u0432</div><div class="time-send__planing-item"><button class="btn-y btn-y--border">15:00 <span class="btn-y__icon btn-y__icon--arrow icon-arrow-down"></span></button></div><div class="time-send__planing-item"><a class="link link--gray font__size18" href ng-click="vm.isInfoOpen = !vm.isInfoOpen"><span class="icon-info"></span></a></div></div></div></div>');
$templateCache.put('app/components/user-menu/user-menu-popover.html','<user-menu></user-menu>');
$templateCache.put('app/components/user-menu/user-menu.html','<div class="user-menu"><div class="user-menu__body user-menu__body--bg-gray"><div class="user-menu__item"><a class="user-menu__link user-menu__link--red" href=""><div class="avatar avatar--size28"><img class="avatar__image" src="/images/avatar.png"></div><div class="user-menu__title">lovealldevelop@gmail.com</div></a></div><div class="user-menu__item"><a class="user-menu__link" href=""><svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" viewBox="0 0 28 28" class="dropdown-user-add-svg"><path d="M13.28,8 L14.72,8 L14.72,13.28 L20,13.28 L20,14.72 L14.72,14.72 L14.72,20 L13.28,20 L13.28,14.72 L8,14.72 L8,13.28 L13.28,13.28 L13.28,8 Z" id="+" fill-opacity="0.5"></path><path d="M28,14 C28,6.2680135 21.7319865,0 14,0 C6.2680135,0 0,6.2680135 0,14 C0,21.7319865 6.2680135,28 14,28 C21.7319865,28 28,21.7319865 28,14 Z M1,14 C1,6.82029825 6.82029825,1 14,1 C21.1797017,1 27,6.82029825 27,14 C27,21.1797017 21.1797017,27 14,27 C6.82029825,27 1,21.1797017 1,14 Z" id="Oval" fill-opacity="0.15"></path></svg><div class="user-menu__title">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F</div></a></div></div><div class="user-menu__body user-menu__body--no-mrg"><div class="user-menu__item"><a class="user-menu__link user-menu__link--hover-gray" href=""><div class="user-menu__title">\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0430\u043A\u0430\u0443\u043D\u0442\u043E\u043C</div></a></div><div class="user-menu__item"><a class="user-menu__link user-menu__link--hover-gray" href=""><div class="user-menu__title">\u041F\u043E\u043C\u043E\u0449\u044C</div></a></div><div class="user-menu__item"><a class="user-menu__link user-menu__link--hover-gray" href=""><div class="user-menu__title">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u044F\u0449\u0438\u043A</div></a></div><div class="user-menu__item"><a class="user-menu__link user-menu__link--hover-gray" href ng-click="vm.logout()"><div class="user-menu__title">\u0412\u044B\u0445\u043E\u0434</div></a></div></div></div>');
$templateCache.put('app/components/validation-errors/validation-errors.html','<div class="validation"><div ng-messages="vm.data.$error" ng-if="vm.data.$invalid"><div class="validation__message validation__message--red" ng-message="{{ key }}" ng-repeat="(key, value) in vm.messages">{{ value }}</div></div><div class="validation__message validation__message--red" ng-repeat="error in vm.server" ng-if="error.field == vm.data.$name">{{ error.message }}</div></div>');
$templateCache.put('app/layout/footer/footer.html','<div class="footer"><div class="footer__row"><div class="footer-left"><div class="footer__date-info">\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0439 \u0432\u0445\u043E\u0434 31 \u043C\u0430\u0440\u0442\u0430 2017 \u0433\u043E\u0434\u0430 \u0432 17:30</div></div><div class="footer-right">\u041F\u043E\u043C\u043E\u0449\u044C \xA9 2017, Mail.cz</div></div></div>');
$templateCache.put('app/directives/message-textarea/message-textarea.html','<div></div>');
$templateCache.put('app/layout/header/header.html','<div class="header"><div class="header__brand pointer" ui-sref="mail.inbox"><img class="header__logo" src="/images/logo.png" alt="Mail logo"></div><div><div class="header__spinner"><spinner></spinner></div></div><div class="header__navigation"><!--\u0422\u0443\u0442 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442 \u043C\u0435\u043D\u044E--><div class="navigation"><div class="navigation__row"><div class="navigation__item"><a class="navigation__link navigation__link--active" href="">\u041F\u043E\u0438\u0441\u043A</a></div><div class="navigation__item"><a class="navigation__link" href="">\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B</a></div><div class="navigation__item"><a class="navigation__link" href="">\u0424\u0430\u0439\u043B\u044B</a></div><div class="navigation__item"><a class="navigation__link" href="">\u041D\u043E\u0432\u043E\u0441\u0442\u0438</a></div><div class="navigation__item"><a class="navigation__link" href="">\u0415\u0449\u0435</a></div></div></div></div><div class="header__left"><div class="header__search header__left-item"><search-mail></search-mail></div><div class="header__settings header__left-item"><!--<a class="header__settings-link">--> <button class="btn-y btn-y--settings pointer" uib-popover-template="\'app/components/settings-menu/settings-menu.html\'" popover-class="popover--settings" popover-placement="bottom" popover-animation="true" popover-trigger="\'outsideClick\'"><span class="icon-settings"></span></button></div><div class="header__avatar header__left-item"><a class="header__avatar-link" href uib-popover-template="\'app/components/user-menu/user-menu-popover.html\'" popover-class="popover--user popover--no-arrow" popover-placement="bottom-right" popover-animation="true" popover-trigger="\'outsideClick\'"><div class="header__name">john.doe@mail.cz</div><!--\u0422\u0443\u0442 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442 \u0430\u0432\u0430\u0442\u0430\u0440\u0430--><div class="avatar avatar--header avatar--size42"><img class="avatar__image" src="/images/avatar.png"></div></a></div></div></div>');
$templateCache.put('app/layout/menu-main/menu-main.html','<div class="menu-main-layout"><div class="menu-main-layout__item"><!--menu-main__link&#45;&#45;open--><ul class="menu-main"><li class="menu-main__item" ng-repeat="folder in vm.folders.items"><a class="menu-main__link" ui-sref="mail.inbox({mbox: folder.name, filter: undefined})" ui-sref-active="menu-main__link--active" ng-class="{\'menu-main__link--gray\': !folder.messagesCount}"><span class="{{ folder.icon }} menu-main__icon"></span> {{ folder.caption }}<div class="menu-main__counter"><span class="round round--yellow"></span> <span class="color--white">0/{{ folder.messagesCount }}</span></div></a><!--                <ul class="menu-main__sub menu-main">\n                                    <li class="menu-main__item">\n                                        <a class="menu-main__link" href="">\n                                            \u041F\u0430\u043F\u043A\u0430\n                                        </a>\n                                    </li>\n                                </ul>--></li><!--            <li class="menu-main__item">\n                            <a class="menu-main__link" href="">\n                                <span class="icon-sent menu-main__icon"></span>\n                                \u041E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043D\u044B\u0435\n                            </a>\n                        </li>\n                        <li class="menu-main__item">\n                            <a class="menu-main__link menu-main__link&#45;&#45;gray" href="">\n                                <span class="icon-bin menu-main__icon"></span>\n                                \u0423\u0434\u0430\u043B\u0435\u043D\u043D\u044B\u0435\n                            </a>\n                        </li>\n                        <li class="menu-main__item">\n                            <a class="menu-main__link menu-main__link&#45;&#45;gray" href="">\n                                <span class="icon-spam menu-main__icon"></span>\n                                \u0421\u043F\u0430\u043C\n                            </a>\n                        </li>\n                        <li class="menu-main__item">\n                            <a class="menu-main__link" href="">\n                                <span class="icon-draft menu-main__icon"></span>\n                                \u0427\u0435\u0440\u043D\u043E\u0432\u0438\u043A\u0438\n                            </a>\n                        </li>--></ul><div class="menu-main-layout__padding"><div class="folders-setup"><div class="folders-setup__row"><a class="folders-setup__link" href>\u0441\u043E\u0437\u0434\u0430\u0442\u044C \u043F\u0430\u043F\u043A\u0443 </a><a class="folders-setup__link" href>\u043D\u0430\u0441\u0442\u0440\u043E\u0438\u0442\u044C...</a></div><hr class="hr folders-setup__hr"></div></div></div><div class="menu-main-layout__item mrg__top20"><div class="menu-main-layout__padding menu-main-layout__padding--size10"><ul class="menu-main"><li class="menu-main__item menu-main__item"><button class="btn-y btn-y--active pointer" type="button" ui-sref="mail.inbox({mbox: undefined, filter: \'flagged\'})" ui-sref-active="btn-y--active"><span class="icon-important menu-main__icon"></span> \u0412\u0430\u0436\u043D\u044B\u0435</button></li><li class="menu-main__item"><button class="btn-y pointer" type="button" ui-sref="mail.inbox({mbox: undefined, filter: \'unseen\'})" ui-sref-active="btn-y--active"><span class="icon-unread-solid menu-main__icon"></span> \u041D\u0435\u043F\u0440\u043E\u0447\u0438\u0442\u0430\u043D\u043D\u044B\u0435</button></li><li class="menu-main__item"><button class="btn-y pointer" type="button" ui-sref="mail.inbox({mbox: undefined, filter: \'attaches\'})" ui-sref-active="btn-y--active"><span class="icon-attach menu-main__icon"></span> \u0421 \u0412\u043B\u043E\u0436\u0435\u043D\u0438\u0435\u043C</button></li></ul></div><div class="menu-main-layout__padding"><div class="folders-setup"><div class="folders-setup__row"><a class="folders-setup__link" href>\u0441\u043E\u0437\u0434\u0430\u0442\u044C \u043F\u0430\u043F\u043A\u0443 </a><a class="folders-setup__link" href>\u043D\u0430\u0441\u0442\u0440\u043E\u0438\u0442\u044C...</a></div><hr class="hr folders-setup__hr"></div></div></div><div class="menu-main-layout__item mrg__top20"><div class="menu-main-layout__padding menu-main-layout__padding--size10"><ul class="menu-main menu-main--tag"><li class="menu-main__item"><button class="btn-y pointer" type="button"><div class="square square--green btn-y__icon"></div>\u0422\u0435\u0433</button></li><li class="menu-main__item"><button class="btn-y pointer" type="button"><div class="square square--green btn-y__icon"></div>\u0422\u0435\u0433 2</button></li><li class="menu-main__item"><button class="btn-y pointer" type="button"><div class="square square--green btn-y__icon"></div>\u0422\u0435\u0433 3</button></li><li class="menu-main__item"><button class="btn-y pointer" type="button"><div class="square square--green btn-y__icon"></div>\u0422\u0435\u0433 4</button></li><li class="menu-main__item"><button class="btn-y pointer" type="button"><div class="square square--green btn-y__icon"></div>\u041D\u043E\u0432\u0430\u044F</button></li></ul></div><div class="menu-main-layout__padding"><div class="folders-setup"><div class="folders-setup__row"><a class="folders-setup__link" href>\u0441\u043E\u0437\u0434\u0430\u0442\u044C \u043F\u0430\u043F\u043A\u0443 </a><a class="folders-setup__link" href>\u043D\u0430\u0441\u0442\u0440\u043E\u0438\u0442\u044C...</a></div><hr class="hr folders-setup__hr"></div></div><div class="menu-main-layout__padding mrg__top16"><button class="btn-y btn-y--size26 btn-y--border btn-y--image-icon btn-y--white pointer" type="button"><span class="btn-y__name">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0434\u0440\u0443\u0433\u043E\u0439 \u044F\u0449\u0438\u043A </span><img class="btn-y__icon" src="/images/gmail.png" alt=""> <img class="btn-y__icon" src="/images/yahoo-mail.png" alt=""></button></div></div><div class="menu-main-layout__padding mrg__top20"><a class="menu-main-layout__button-tarif" href=""><img class="img-responsive" src="/images/tarif-button.png"></a></div></div>');
$templateCache.put('app/layout/menu-settings/menu-settings.html','<div class="menu-settings-layout"><div class="menu-settings"><div class="menu-settings__list"><div class="menu-settings__item"><a class="menu-settings__link" ui-sref="settings.main" ui-sref-active="menu-settings__link--active">\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u043E\u043C</a></div><div class="menu-settings__item"><a class="menu-settings__link" href="">\u041F\u0430\u043F\u043A\u0438</a></div><div class="menu-settings__item"><a class="menu-settings__link" ui-sref="settings.tags" ui-sref-active="menu-settings__link--active">\u0422\u044D\u0433\u0438</a></div><div class="menu-settings__item"><a class="menu-settings__link" href="">\u0421\u043F\u0430\u043C</a></div><div class="menu-settings__item"><a class="menu-settings__link" href="">\u0427\u0435\u0440\u043D\u043E\u0432\u0438\u043A\u0438</a></div></div></div><hr class="hr hr--dashed menu-settings-layout__hr"><div class="menu-settings"><div class="menu-settings__list"><div class="menu-settings__item"><a class="menu-settings__link" href="">\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u043E\u0432</a></div></div></div><hr class="hr hr--dashed menu-settings-layout__hr"><div class="menu-settings"><div class="menu-settings__list"><div class="menu-settings__item"><a class="menu-settings__link" href="">\u042F\u0437\u044B\u043A: \u0420\u0443\u0441\u0441\u043A\u0438\u0439</a></div><div class="menu-settings__item mrg__top20"><a class="menu-settings__link" href="">\u0427\u0430\u0441\u044B: (GMT+02:00) \u041A\u0438\u0435\u0432</a></div></div></div><div class="menu-settings-layout__padding"><button class="btn-y btn-y--size26 btn-y--border pointer mrg__top20" type="button">\u041F\u043E\u043C\u0435\u043D\u044F\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C</button><p class="menu-settings-layout__pass-info">\u0420\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0443\u0435\u043C \u0432\u0430\u043C \u0432 \u0446\u0435\u043B\u044F\u0445 \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438 \u043C\u0435\u043D\u044F\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C \u043A\u0430\u0436\u0434\u044B\u0435 6 \u043C\u0435\u0441\u044F\u0446\u0435\u0432, \u0430 \u0442\u0430\u043A\u0436\u0435 \u0443\u043A\u0430\u0437\u0430\u0442\u044C \u0434\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u043E \u0441\u0435\u0431\u0435 \u2014 \u044D\u0442\u043E \u043F\u043E\u043C\u043E\u0436\u0435\u0442 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C, \u0435\u0441\u043B\u0438 \u0432\u044B \u0435\u0433\u043E \u0437\u0430\u0431\u0443\u0434\u0435\u0442\u0435.</p></div></div>');
$templateCache.put('app/marketing/home/home.html','<h1>Welcome to <a ui-sref="mail.inbox">mail</a></h1>');
$templateCache.put('app/mail/compose/compose.html','<compose-header></compose-header><div class="layout--padding20"><div class="compose-from mrg__top20"><div class="compose-from__item font__size13"><button class="btn btn--size_s btn--red width--inh">\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C</button></div><div class="compose-from__item font__size13">\u043E\u0442 \u043A\u043E\u0433\u043E:</div><div class="compose-from__item font__size13"><div class="avatar avatar--size28"><img class="avatar__image" src="/images/avatar.png"></div></div><div class="compose-from__item font__size13">John Doe</div><div class="compose-from__item font--size13"><button class="btn-y">(john.doe@mail.cz) <span class="btn-y__icon btn-y__icon--arrow icon-arrow-down"></span></button></div></div><div class="mrg__top10"><div class="input-line input-line--full"><label class="input-line__label"><a class="link link--gray link--hv-red" href="">\u041A\u043E\u043C\u0443</a></label><div class="input-line__links"><a class="link link--violet link--hv-red" href="#">\u041A\u043E\u043F\u0438\u044F </a><a class="link link--violet link--hv-red" href="#">\u0421\u043A\u0440\u044B\u0442\u0430\u044F \u043A\u043E\u043F\u0438\u044F</a></div><input class="input-line__input" type="text"></div><div class="input-line input-line--full mrg__top10"><label class="input-line__label"><a class="link link--gray link--hv-red" href="">\u0422\u0435\u043C\u0430</a></label><div class="input-line__links"><a class="link link--violet link--hv-red" href="#">\u0428\u0430\u0431\u043B\u043E\u043D</a></div><input class="input-line__input" type="text"></div></div><div class="mrg__top20"><div message-textarea></div></div><div class="row mrg__top20"><div class="col-xs-6"><!--<compose-send></compose-send>--><div class="compose-send"><div class="btn-group compose-send__item"><button class="btn-group__btn btn btn--size_s btn--red">\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C</button> <button class="btn-group__btn btn btn--size_s btn--red" uib-popover-template="\'app/components/time-send/time-send-popover.html\'" popover-class="popover--time-send popover--no-arrow" popover-placement="top" popover-animation="true" popover-trigger="\'outsideClick\'"><span class="icon-clock"></span></button></div><button class="btn-y btn-y--size-m compose-send__item"><span class="icon-attach"></span></button></div></div><div class="col-xs-6"><p class="font__size13 pull-right">\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043E \u043A\u0430\u043A \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A \u0432 16:36</p></div></div></div><div class="layout__footer"><footer></footer></div>');
$templateCache.put('app/mail/inbox/inbox.html','<inbox-header></inbox-header><div class="search-result" ng-if="vm.isNoResult"><strong>\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B \u043F\u043E\u0438\u0441\u043A\u0430 \xABinfo\xBB</strong></div><div class="search-result search-result--no-result" ng-if="vm.isNoResult"><strong class="font__size18">\u041D\u0435 \u043D\u0430\u0448\u043B\u043E\u0441\u044C \u043D\u0438 \u043E\u0434\u043D\u043E\u0433\u043E \u043F\u0438\u0441\u044C\u043C\u0430. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0441\u0444\u043E\u0440\u043C\u0443\u043B\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0437\u0430\u043F\u0440\u043E\u0441 \u0438\u043D\u0430\u0447\u0435</strong><p class="color--gray mrg__top20">\u0420\u0435\u043A\u043E\u043C\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u0438:</p><ul class="list-dash list-dash--gray"><li class="list-dash__item">\u0423\u0431\u0435\u0434\u0438\u0442\u0435\u0441\u044C, \u0447\u0442\u043E \u0432 \u0437\u0430\u043F\u0440\u043E\u0441\u0435 \u043D\u0435\u0442 \u043E\u0448\u0438\u0431\u043E\u043A</li><li class="list-dash__item">\u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0443\u043C\u0435\u043D\u044C\u0448\u0438\u0442\u044C \u0434\u0438\u043B\u043D\u043D\u0443 \u0437\u0430\u043F\u0440\u043E\u0441\u0430</li><li class="list-dash__item">\u0415\u0441\u043B\u0438 \u0432\u044B \u043F\u043E\u043C\u043D\u0438\u0442\u0435 \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u0435\u043B\u044F, \u043F\u043E\u043B\u0443\u0447\u0430\u0442\u0435\u043B\u044F, \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u044F \u0444\u0430\u0439\u043B\u043E\u0432 \u0438\u043B\u0438 \u0438\u0445 \u0442\u0438\u043F, \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0432\u043E\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C\u0441\u044F \u0440\u0430\u0441\u0448\u0438\u0440\u0435\u043D\u044B\u043C \u043F\u043E\u0438\u0441\u043A\u043E\u043C \u0438\u043B\u0438 \u044F\u0437\u044B\u043A\u043E\u043C \u0437\u0430\u043F\u0440\u043E\u0441\u043E\u0432</li><li class="list-dash__item">\u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u043D\u0430\u0439\u0442\u0438 \u043D\u0443\u0436\u043D\u043E\u0435 \u043F\u0438\u0441\u044C\u043C\u043E \u0432\u0440\u0443\u0447\u043D\u0443\u044E</li></ul></div><div class="inbox-list"><inbox-message-list messages="vm.messages"></inbox-message-list><!--\n                <div class="inbox-message pointer">\n                    <div>\n                        <div class="inbox-message__importance">\n                            <span class="icon-important"></span>\n                        </div>\n                    </div>\n                    <div>\n                        <div class="inbox-message__checked">\n                            <label class="checkbox checkbox_theme_islands checkbox_size_m i-bem" data-bem=\'{"checkbox":{}}\'>\n                                <span class="checkbox__box">\n                                    <input class="checkbox__control" type="checkbox"\n                                           autocomplete="off" name="name1" value="val_1"/></span>\n                            </label>\n                        </div>\n                    </div>\n                    <div>\n                        <div class="inbox-message__avatar">\n                            <div class="avatar avatar&#45;&#45;size30">\n                                <img class="avatar__image" src="/images/avatar.png">\n                            </div>\n                        </div>\n                    </div>\n                    <div>\n                        <div class="inbox-message__name">\n                            Alexandr\n                        </div>\n                    </div>\n                    <div>\n                        <div class="inbox-message__round">\n                            <div class="round round&#45;&#45;yellow"></div>\n                        </div>\n                    </div>\n                    <div class="inbox-message__text">\n                        <div class="inbox-message__subject">\n                            Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Lorem ipsum dolor sit\n                            amet,\n                            consectetur adipiscing elit.\n                        </div>\n                        <div class="inbox-message__message">\n                            Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Lorem ipsum dolor sit amet,\n                            consectetur adipiscing elit. Cras ultricies ligula sed magna dictum porta. Vestibulum ante ipsum\n                            primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit\n                            amet aliquam vel, ullamcorper sit amet ligula. Donec rutrum congue leo eget malesuada. Cras\n                            ultricies ligula sed magna dictum porta. Nulla quis lorem ut libero malesuada feugiat.\n                            Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Vivamus suscipit tortor\n                            eget felis porttitor volutpat. Proin eget tortor risus.\n                        </div>\n                    </div>\n\n                    <div>\n                        <div class="inbox-message__data">\n                            30 \u043C\u0430\u0440\n                        </div>\n                    </div>\n                </div>\n\n                <div class="inbox-message inbox-message&#45;&#45;new pointer">\n                    <div>\n                        <div class="inbox-message__importance">\n                            <span class="icon-important"></span>\n                        </div>\n                    </div>\n                    <div>\n                        <div class="inbox-message__checked">\n                            <label class="checkbox checkbox_theme_islands checkbox_size_m i-bem" data-bem=\'{"checkbox":{}}\'>\n                                <span class="checkbox__box">\n                                    <input class="checkbox__control" type="checkbox"\n                                           autocomplete="off" name="name1" value="val_1"/></span>\n                            </label>\n                        </div>\n                    </div>\n                    <div>\n                        <div class="inbox-message__avatar">\n                            <div class="avatar avatar&#45;&#45;size30">\n                                <img class="avatar__image" src="/images/avatar.png">\n                            </div>\n                        </div>\n                    </div>\n                    <div>\n                        <div class="inbox-message__name">\n                            Alexandr\n                        </div>\n                    </div>\n                    <div>\n                        <div class="inbox-message__round">\n                            <div class="round round&#45;&#45;yellow"></div>\n                        </div>\n                    </div>\n                    <div class="inbox-message__text">\n                        <div class="inbox-message__subject">\n                            Curabitur non nulla sit amet nisl tempus.\n                        </div>\n                        <div class="inbox-message__message">\n                            Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Lorem ipsum dolor sit amet,\n                            consectetur adipiscing elit. Cras ultricies ligula sed magna dictum porta. Vestibulum ante ipsum\n                            primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit\n                            amet aliquam vel, ullamcorper sit amet ligula. Donec rutrum congue leo eget malesuada. Cras\n                            ultricies ligula sed magna dictum porta. Nulla quis lorem ut libero malesuada feugiat.\n                            Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Vivamus suscipit tortor\n                            eget felis porttitor volutpat. Proin eget tortor risus.\n                        </div>\n                    </div>\n\n                    <div>\n                        <div class="inbox-message__data">\n                            30 \u043C\u0430\u0440\n                        </div>\n                    </div>\n                </div>\n\n                <div class="inbox-message inbox-message&#45;&#45;pink pointer">\n                    <div>\n                        <div class="inbox-message__importance">\n                            <span class="icon-important"></span>\n                        </div>\n                    </div>\n                    <div>\n                        <div class="inbox-message__checked">\n                            <label class="checkbox checkbox_theme_islands checkbox_size_m i-bem" data-bem=\'{"checkbox":{}}\'>\n                                <span class="checkbox__box">\n                                    <input class="checkbox__control" type="checkbox"\n                                           autocomplete="off" name="name1" value="val_1"/></span>\n                            </label>\n                        </div>\n                    </div>\n                    <div>\n                        <div class="inbox-message__avatar">\n                            <div class="avatar avatar&#45;&#45;size30">\n                                <img class="avatar__image" src="/images/avatar.png">\n                            </div>\n                        </div>\n                    </div>\n                    <div>\n                        <div class="inbox-message__name">\n                            Alexandr\n                        </div>\n                    </div>\n                    <div>\n                        <div class="inbox-message__round">\n                            <div class="round round&#45;&#45;yellow"></div>\n                        </div>\n                    </div>\n                    <div>\n                        <div class="inbox-message__subject">\n                            Curabitur non nulla sit amet nisl tempus.\n                        </div>\n                    </div>\n\n                    <div class="inbox-message__message">\n                        Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Lorem ipsum dolor sit amet,\n                        consectetur adipiscing elit. Cras ultricies ligula sed magna dictum porta. Vestibulum ante ipsum\n                        primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit\n                        amet aliquam vel, ullamcorper sit amet ligula. Donec rutrum congue leo eget malesuada. Cras\n                        ultricies ligula sed magna dictum porta. Nulla quis lorem ut libero malesuada feugiat.\n                        Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Vivamus suscipit tortor\n                        eget felis porttitor volutpat. Proin eget tortor risus.\n                    </div>\n\n                    <div>\n                        <div class="inbox-message__data">\n                            30 \u043C\u0430\u0440\n                        </div>\n                    </div>\n                </div>\n\n                <div class="inbox-message pointer"\n                     ng-mouseover="item.hover = true" ng-mouseleave="item.hover = false"\n                     ng-repeat="item in [{hover: false, active: false},{hover: false, active: false},{hover: false, active: false},{hover: false, active: false},{hover: false, active: false},{hover: false, active: false}]"\n                     inbox-message-hover>\n                    <div>\n                        <div class="inbox-message__importance">\n                            <span class="icon-important"></span>\n                        </div>\n                    </div>\n                    <div>\n                        <div class="inbox-message__checked">\n                            <label class="checkbox checkbox_theme_islands checkbox_size_m i-bem" data-bem=\'{"checkbox":{}}\'>\n                                <span class="checkbox__box">\n                                    <input class="checkbox__control" type="checkbox"\n                                           autocomplete="off" name="name1" value="val_1"/></span>\n                            </label>\n                        </div>\n                    </div>\n                    <div>\n                        <div class="inbox-message__avatar">\n                            <div class="avatar avatar&#45;&#45;size30">\n                                <img class="avatar__image" src="/images/avatar.png">\n                            </div>\n                        </div>\n                    </div>\n                    <div>\n                        <div class="inbox-message__name">\n                            Alexandr\n                        </div>\n                    </div>\n                    <div>\n                        <div class="inbox-message__round">\n                            <div class="inbox-message__round pointer" ng-click="item.active = !item.active">\n                                <div class="round" ng-class="{\n                                            \'round&#45;&#45;border\': item.hover,\n                                            \'round&#45;&#45;yellow\': item.active\n                                        }"></div>\n                            </div>\n                        </div>\n                    </div>\n                    <div>\n                        <div class="inbox-message__labels">\n\n                            <div class="label-ydx label-ydx&#45;&#45;green inbox-message__label">\n                                \u041C\u0435\u0442\u043A\u0430 1\n                            </div>\n\n                            <div class="label-ydx label-ydx&#45;&#45;red inbox-message__label">\n                                \u041C\u0435\u0442\u043A\u0430 2\n                            </div>\n\n                            <div class="label-ydx label-ydx&#45;&#45;blue inbox-message__label">\n                                \u041C\u0435\u0442\u043A\u0430 3\n                            </div>\n\n                        </div>\n                    </div>\n                    <div class="inbox-message__text">\n                        <div class="inbox-message__subject">\n                            Curabitur non nulla sit amet nisl tempus convallis.\n                        </div>\n                        <div class="inbox-message__message">\n                            Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Lorem ipsum dolor sit amet,\n                            consectetur adipiscing elit. Cras ultricies ligula sed magna dictum porta. Vestibulum ante ipsum\n                            primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit\n                            amet aliquam vel, ullamcorper sit amet ligula. Donec rutrum congue leo eget malesuada. Cras\n                            ultricies ligula sed magna dictum porta. Nulla quis lorem ut libero malesuada feugiat.\n                            Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Vivamus suscipit tortor\n                            eget felis porttitor volutpat. Proin eget tortor risus.\n                        </div>\n                    </div>\n\n                    <div>\n                        <div class="inbox-message__data">\n                            30 \u043C\u0430\u0440\n                        </div>\n                    </div>\n                </div>\n    --></div><div class="inbox-footer mrg__top30"><div class="inbox-footer__row"><div><div class="font__size13">\u0412\u044B \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u043B\u0438 \u0432\u0441\u0435 \u043F\u0438\u0441\u044C\u043C\u0430 \u0437\u0430 \u043C\u0430\u0440\u0442 2017 \u0433\u043E\u0434\u0430</div><div class="mrg__top20"><a class="link link--underline link--next" href="">\u0430\u043F\u0440\u0435\u043B\u044C <span class="icon-next"></span></a></div></div><div class="date-sort"><div class="date-sort__title">\u041F\u0438\u0441\u044C\u043C\u0430 \u043F\u043E \u043C\u0435\u0441\u044F\u0446\u0430\u043C:</div><div class="date-sort__row"><a class="date-sort__link" href="">2017:</a> <a class="date-sort__link" href="">\u043C\u0430\u0440\u0442</a> <a class="date-sort__link" href="">\u0430\u043F\u0440\u0435\u043B\u044C</a></div></div></div></div><div class="layout__footer"><footer></footer></div>');
$templateCache.put('app/mail/message/message.html','<inbox-header></inbox-header><div class="mail-message"><!-- \u0425\u0435\u0434\u0435\u0440 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F --><div class="mail-message__head"><div class="mail-message__title mrg-top18">\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F \u043D\u0430 \u0441\u0435\u0440\u0432\u0438\u0441\u0435 @mail.cz</div><div class="info-sender flex--inline"><div class="info-sender__avatar flex"><div class="avatar avatar--settings avatar--size42 avatar--second-style mrg__auto"><img class="avatar__image" src="/images/avatar-personal.svg" alt=""></div></div><div class="info-sender__title"><div class="info-sender__from-whom">\u041A\u043E\u043C\u0430\u043D\u0434\u0430 @Mail.cz <span class="info-sender__from-whom__mail-name">support@mail.cz</span></div><div class="info-sender__to-whom flex--inline"><span class="mrg__right18">\u0412\u0430\u043C</span><div class="avatar avatar--settings avatar--size20 avatar--second-style mrg__right5"><img class="avatar__image" src="/images/avatar-personal.svg" alt=""></div><span class="">john.doe@mail.cz</span> <button class="btn btn--not-style btn--not-events bth--toggle-arrow icon-arrow-up font__size7" id="" type="button"></button></div></div><div class="info-sender__date mrg__right">1 \u043C\u0430\u0440 \u0432 16:20</div></div></div><!-- \u0422\u0435\u043B\u043E \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F --><div class="mail-message__body"><div class="body-message"><!--\u0421\u0430\u043C\u043E \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435--><div class="body-message__content" ng-bind-html="vm.message.model.body"></div></div></div><!-- \u0411\u044B\u0441\u0442\u0440\u044B\u0439 \u043E\u0442\u0432\u0435\u0442--><div class="mail-message__reply flex--inline"><div class="mail-message__reply__avatar flex"><div class="avatar avatar--settings avatar--size42 avatar--second-style mrg__top"><img class="avatar__image" src="/images/avatar-personal.svg" alt=""></div></div><!-- \u043F\u043E\u043B\u0435 \u0434\u043B\u044F \u0432\u0432\u043E\u0434\u0430 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F \u0441 \u0434\u0432\u0443\u043C\u044F \u0441\u043E\u0442\u043E\u044F\u043D\u0438\u044F\u043C\u0438--><!--\n           **! \u042D\u0442\u043E\u0442 \u043A\u043B\u0430\u0441\u0441 \u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u043F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0430\u0442\u0435\u043B\u0435\u043C \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438 \u0434\u043B\u044F \u043F\u043E\u043B\u044F \u0432\u0432\u043E\u0434\u0430\n               >>> quick-reply--used-input-message\n        --><div class="quick-reply" ng-click="vm.isSendTextOpen = true" ng-class="{\'quick-reply--used-input-message\': vm.isSendTextOpen}"><!-- \u0434\u043E \u043D\u0430\u0436\u0430\u0442\u0438\u044F--><div class="quick-reply__not-form-message"><div class="quick-reply__not-form-message__title">\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u0437\u0434\u0435\u0441\u044C, \u0447\u0442\u043E\u0431\u044B <span class="quick-reply__not-form-message__title__method">\u041E\u0442\u0432\u0435\u0442\u0438\u0442\u044C</span> \u0438\u043B\u0438 <span class="quick-reply__not-form-message__title__method">\u041F\u0435\u0440\u0435\u0441\u043B\u0430\u0442\u044C</span></div></div><!-- \u043F\u043E\u0441\u043B\u0435 \u043D\u0430\u0436\u0430\u0442\u0438\u044F--><div class="quick-reply__form-message"><button class="quick-reply__form-message__btn-close btn btn--not-style btn-y--close font__size16" type="button" ng-click="vm.isSendTextOpen = false; $event.stopPropagation();"><img class="btn-y__icon" src="/images/cancel.svg"></button><!-- \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438\u044F \u043E \u0430\u0434\u0440\u0435\u0441\u0441\u0430\u0442\u0435--><div class="quick-reply__form-message__header to-whom"><span class="to-whom__title">\u041A\u043E\u043C\u0443:</span> <span class="to-whom__mail-recipient">\u041A\u043E\u043C\u0430\u043D\u0434\u0430 \u042F\u043D\u0434\u0435\u043A\u0441.\u041F\u043E\u0447\u0442\u044B</span></div><!-- \u041F\u043E\u043B\u0435 \u0432\u0432\u043E\u0434\u0430 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F--><div class="quick-reply__form-message__content message-input" placeholder="\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435">\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435</div><!-- \u041E\u0441\u043D\u043E\u0432\u043D\u0430\u044F \u043D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044F \u043F\u043E \u0434\u0435\u0441\u0442\u0432\u0438\u044F\u043C--><div class="quick-reply__form-message__footer control-send-message"><button class="btn btn--yellow btn--act--y-shw btn--size_s width--size90">\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C</button> <button class="btn btn--not-style btn--attach btn--size_s btn--not-events width--size28 icon-attach font__size16"><input class="btn--attach__elm-hide" type="file"></button> <span class="quick-reply__form-message__footer__allform">\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u0432 \u043F\u043E\u043B\u043D\u0443\u044E \u0444\u043E\u0440\u043C\u0443 \u043E\u0442\u0432\u0435\u0442\u0430</span></div></div></div></div></div><!-- \u041F\u0430\u0433\u0438\u043D\u0430\u0446\u0438\u044F \u043F\u0438\u0441\u0435\u043C \u043A\u0430\u043A \u0432 \u044F\u043D\u0434\u0435\u043A\u0441\u0435,\n     \u0432 \u043C\u0430\u043A\u0435\u0442\u0430\u0445 \u043D\u0435 \u043D\u0435 \u0431\u044B\u043B\u043E \u043F\u0440\u0435\u0434\u0443\u0441\u043C\u043E\u0442\u0440\u0435\u043D\u043E, \u043F\u043E \u044D\u0442\u043E\u043C\u0443 \u044F \u0442\u043E\u043B\u044C\u043A\u043E \u043D\u0430\u0431\u0440\u043E\u0441\u0430\u043B \u0441\u0435\u043C\u0430\u043D\u0442\u0438\u043A\u0443,\n     \u043D\u0435 \u0441\u0442\u0438\u043B\u0438\u0437\u043E\u0432\u0430\u043B \u0432\u0434\u0440\u0443\u0433 \u0431\u0443\u0434\u0435\u0442 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0441\u044F\n--><!--\n\n<div class="messages-prev">\n    <a class="messages-prev__next hide-elm" href="">\n        <span>\u041A\u043E\u043C\u0430\u043D\u0434\u0430 \u042F\u043D\u0434\u0435\u043A\u0441.\u041F\u043E\u0447\u0442\u044B</span>\n        <span>\u041A\u0430\u043A \u0447\u0438\u0442\u0430\u0442\u044C \u043F\u043E\u0447\u0442\u0443 \u0441 \u043C\u043E\u0431\u0438\u043B\u044C\u043D\u043E\u0433\u043E</span>\n    </a>\n    <a class="messages-prev__next messages-prev__next--next" href="">\n\n    </a>\n</div>\n\n--><div class="layout__footer"><footer></footer></div>');
$templateCache.put('app/settings/main/settings.html','<div class="layout__bread-crumbs mrg__bottom15"><div class="bread-crumbs"><a class="bread-crumbs__item" href="#">\u041F\u043E\u0447\u0442\u0430</a> <a class="bread-crumbs__item" href="#">\u0412\u0441\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438</a> <a class="bread-crumbs__item bread-crumbs--active" href="#">\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u043E\u043C</a></div></div><article class="layout-settings"><!----><section class="layout-settings__col width--aut"><!-- \u041F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 --><div class="personal-info"><div class="personal-info__user-avatar mrg__bottom45"><div class="avatar avatar--settings avatar--size203 avatar--second-style"><img class="avatar__image" src="/images/avatar-personal.svg" alt=""> <span class="avatar__edit avatar__edit--add"></span></div></div><div class="personal-info__user-info"><div class="personal-info__user-info-title main-title-text">\u041F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435</div><form class="form" action=""><div class="form__fields"><!-- \u0418\u043C\u044F \u0438 \u0444\u0430\u043C\u0438\u043B\u0438\u044F --><div class="form__field-item"><div class="field-style field-style--max-wd260 mrg__right18"><label class="field-style__title">\u0418\u043C\u044F \u0438 \u0444\u0430\u043C\u0438\u043B\u0438\u044F:</label><input class="input input--size_l width--inh" type="text" placeholder="\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043C\u044F"></div><div class="field-style field-style--max-wd260"><label class="field-style__title hide-elm">&nbsp;&nbsp;</label><input class="input input--size_l width--inh" type="name" placeholder="\u0412\u0430\u0448\u0430 \u0424\u0430\u043C\u0438\u043B\u0438\u044F"></div></div><!-- \u041B\u043E\u0433\u0438\u043D/\u0438\u043C\u044F \u0432 \u0431\u0430\u0437\u0435 --><div class="form__field-item"><div class="field-style field-style--max-wd260 mrg__right18"><label class="field-style__title">\u0418\u043C\u044F \u043D\u0430 mail.cz:</label><div class="select select_mode_radio select_theme_islands select_size_l i-bem width--inh" data-bem=\'{"select":{"name":"select2"}}\'><input class="select__control" type="hidden" name="select2" value="2" autocomplete="off"> <button class="button button_size_l button_theme_islands button__control select__button i-bem" data-bem=\'{"button":{}}\' role="listbox" type="button" aria-owns="uniq148861608057241 uniq148861608057242 uniq148861608057243" aria-labelledby="uniq148861608057244"><span class="button__text" id="uniq148861608057244">@mail.cz</span> <span class="icon select__tick"></span></button><div class="popup popup_target_anchor popup_theme_islands popup_autoclosable i-bem" data-bem=\'{"popup":{"directions":["bottom-left","bottom-right","top-left","top-right"]}}\' aria-hidden="true"><div class="menu menu_size_l menu_theme_islands menu_mode_radio menu__control select__menu i-bem" data-bem=\'{"menu":{}}\'><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":1}}\' role="option" id="uniq148861608057241" aria-checked="false">@mail.cz</div><div class="menu__item menu__item_checked menu__item_theme_islands" data-bem=\'{"menu__item":{"val":2}}\' role="option" id="uniq148861608057242" aria-checked="true">@mail.cz</div><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":3}}\' role="option" id="uniq148861608057243" aria-checked="false">@mail.cz</div></div></div></div></div><div class="field-style field-style--max-wd260"><label class="field-style__title hide-elm">&nbsp;&nbsp;</label><input class="input input--size_l width--inh" type="name" placeholder="\u0412\u0430\u0448 \u043B\u043E\u0433\u0438\u043D \u043F\u043E\u0447\u0442\u044B "><!-- bem \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442 --><!-- <span class="input input_theme_islands input_size_l i-bem"data-bem=\'{"input":{}}\'>\n                                    <span class="input__box">\n                                        <input class="input__control" placeholder="\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043C\u044F"/>\n                                    </span>\n                                </span> --></div><div class="notific mrg__top7">\u042D\u0442\u043E \u0438\u043C\u044F \u0441\u043C\u043E\u0433\u0443\u0442 \u0432\u0438\u0434\u0435\u0442\u044C \u0434\u0440\u0443\u0433\u0438\u0435 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438 Mail.cz \u2014 \u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440, \u0438\u043C \u0431\u0443\u0434\u0435\u0442 \u043F\u043E\u0434\u043F\u0438\u0441\u0430\u043D\u0430 \u0432\u0430\u0448\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430</div></div><!-- \u0414\u0430\u0442\u0430 / \u041F\u043E\u043B --><div class="form__field-item"><!--\u0414\u0430\u0442\u0430 \u0440\u043E\u0436\u0434\u0435\u043D\u0438\u044F--><div class="field-style field-style--max-wd260 mrg__right18"><label class="field-style__title">\u0414\u0430\u0442\u0430 \u0440\u043E\u0436\u0434\u0435\u043D\u0438\u044F:</label><div class="field-style__container width--inh"><!-- \u0414\u0435\u043D\u044C --> <input class="input input--size_l width--size65" type="name" placeholder="\u0414\u0435\u043D\u044C"><!-- bem \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442 --><!-- <span class="input input_theme_islands input_size_l i-bem input&#45;&#45;width65 " data-bem=\'{"input":{}}\'>\n                                        <span class="input__box">\n                                         <input class="input__control" placeholder="\u0414\u0435\u043D\u044C"/>\n                                        </span>\n                                    </span>--><!-- \u041C\u0435\u0441\u044F\u0446 --><div class="select select_mode_radio-check select_theme_islands select_size_l i-bem width--inh" data-bem=\'{"select":{"name":"select3","text":"\u2014"}}\'><input class="select__control" type="hidden" name="select3" value="2" autocomplete="off"> <button class="button button_size_l button_theme_islands button_checked button__control select__button i-bem" data-bem=\'{"button":{}}\' role="listbox" type="button" aria-owns="uniq148861606894041 uniq148861606894042 uniq148861606894043" aria-labelledby="uniq148861606894044"><span class="button__text" id="uniq148861606894044">\u041C\u0435\u0441\u044F\u0446</span> <span class="icon select__tick"></span></button><div class="popup popup_target_anchor popup_theme_islands popup_autoclosable i-bem" data-bem=\'{"popup":{"directions":["bottom-left","bottom-right","top-left","top-right"]}}\' aria-hidden="true"><div class="menu menu_size_l menu_theme_islands menu_mode_radio-check menu__control select__menu i-bem" data-bem=\'{"menu":{}}\'><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":1}}\' role="option" id="uniq148861606894041" aria-checked="false">\u042F\u043D\u0432\u0430\u0440\u044C</div><div class="menu__item menu__item_checked menu__item_theme_islands" data-bem=\'{"menu__item":{"val":2}}\' role="option" id="uniq148861606894042" aria-checked="true">\u0424\u0435\u0432\u0440\u0430\u043B\u044C</div><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":3}}\' role="option" id="uniq148861606894043" aria-checked="false">\u041C\u0430\u0440\u0442</div><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":3}}\' role="option" id="uniq148861606894043" aria-checked="false">\u0410\u043F\u0440\u0435\u043B\u044C</div><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":3}}\' role="option" id="uniq148861606894043" aria-checked="false">\u041C\u0430\u0439</div><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":3}}\' role="option" id="uniq148861606894043" aria-checked="false">\u0418\u044E\u043D\u044C</div><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":3}}\' role="option" id="uniq148861606894043" aria-checked="false">\u0418\u044E\u043B\u044C</div><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":3}}\' role="option" id="uniq148861606894043" aria-checked="false">\u0410\u0432\u0433\u0443\u0441\u0442</div><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":3}}\' role="option" id="uniq148861606894043" aria-checked="false">\u0421\u0435\u043D\u0442\u044F\u0431\u0440\u044C</div><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":3}}\' role="option" id="uniq148861606894043" aria-checked="false">\u041E\u043A\u0442\u044F\u0431\u0440\u044C</div><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":3}}\' role="option" id="uniq148861606894043" aria-checked="false">\u041D\u043E\u044F\u0431\u0440\u044C</div><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":3}}\' role="option" id="uniq148861606894043" aria-checked="false">\u0414\u0435\u043A\u0430\u0431\u043B\u044C</div></div></div></div><!-- \u0413\u043E\u0434--> <input class="input input--size_l width--size65" type="name" placeholder="\u0413\u043E\u0434"><!-- bem \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442 --><!-- <span class="input input_theme_islands input_size_l i-bem input&#45;&#45;width65 " data-bem=\'{"input":{}}\'>\n                                        <span class="input__box">\n                                        <input class="input__control" placeholder="\u0414\u0435\u043D\u044C"/>\n                                        </span>\n                                    </span>--></div></div><!-- \u041F\u043E\u043B --><div class="field-style field-style--max-wd260"><label class="field-style__title">\u041F\u043E\u043B:</label><span class="radio-group radio-group_theme_islands radio-group_size_l radio-group_type_button control-group i-bem" data-bem=\'{"radio-group":{}}\' role="radiogroup"><label class="radio radio_type_button radio_theme_islands radio_size_l radio_checked i-bem mrg__none" data-bem=\'{"radio":{}}\'><button class="button button_togglable_radio button_checked button_theme_islands button_size_l button__control i-bem" data-bem=\'{"button":{}}\' role="button" type="button" aria-pressed="true"><span class="button__text">\u041C\u0443\u0436\u0441\u043A\u043E\u0439</span></button> <input class="radio__control" type="radio" autocomplete="off" name="radio-islands" value="2" checked="checked"></label><label class="radio radio_type_button radio_theme_islands radio_size_l i-bem mrg__none" data-bem=\'{"radio":{}}\'><button class="button button_togglable_radio button_theme_islands button_size_l button__control i-bem" data-bem=\'{"button":{}}\' role="button" type="button" aria-pressed="false"><span class="button__text">\u0416\u0435\u043D\u0441\u043A\u0438\u0439</span></button> <input class="radio__control" type="radio" autocomplete="off" name="radio-islands" value="3"></label></span></div></div><!-- \u0421\u0442\u0440\u0430\u043D\u0430 / \u0413\u043E\u0440\u043E\u0434 --><div class="form__field-item"><!-- \u0421\u0442\u0440\u0430\u043D\u0430 --><div class="field-style field-style--max-wd260 mrg__right18"><label class="field-style__title">\u0421\u0442\u0440\u0430\u043D\u0430</label><div class="select select_mode_radio-check select_theme_islands select_size_l i-bem width--inh" data-bem=\'{"select":{"name":"select3","text":"\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0443"}}\'><input class="select__control" type="hidden" name="select3" value="2" autocomplete="off"> <button class="button button_size_l button_theme_islands button_checked button__control select__button i-bem" data-bem=\'{"button":{}}\' role="listbox" type="button" aria-owns="uniq148861608062641 uniq148861608062642 uniq148861608062643" aria-labelledby="uniq148861608062644"><span class="button__text" id="uniq148861608062644">\u041C\u0430\u0441\u0442\u0435\u0440-\u043A\u043B\u0430\u0441\u0441</span><span class="icon select__tick"></span></button><div class="popup popup_target_anchor popup_theme_islands popup_autoclosable i-bem" data-bem=\'{"popup":{"directions":["bottom-left","bottom-right","top-left","top-right"]}}\' aria-hidden="true"><div class="menu menu_size_l menu_theme_islands menu_mode_radio-check menu__control select__menu i-bem" data-bem=\'{"menu":{}}\'><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":1}}\' role="option" id="uniq148861608062641" aria-checked="false">\u0420\u043E\u0441\u0441\u0438\u044F</div><div class="menu__item menu__item_checked menu__item_theme_islands" data-bem=\'{"menu__item":{"val":2}}\' role="option" id="uniq148861608062642" aria-checked="true">\u0427\u0435\u0445\u0438\u044F</div><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":3}}\' role="option" id="uniq148861608062643" aria-checked="false">\u0423\u043A\u0440\u0430\u0438\u043D\u0430</div></div></div></div></div><!-- \u0413\u043E\u0440\u043E\u0434 --><div class="field-style field-style--max-wd260"><label class="field-style__title">\u0413\u043E\u0440\u043E\u0434:</label><div class="select select_mode_radio-check select_theme_islands select_size_l i-bem width--inh" data-bem=\'{"select":{"name":"select3","text":"\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0433\u043E\u0440\u043E\u0434"}}\'><input class="select__control" type="hidden" name="select3" value="2" autocomplete="off"> <button class="button button_size_l button_theme_islands button_checked button__control select__button i-bem" data-bem=\'{"button":{}}\' role="listbox" type="button" aria-owns="uniq148861606894041 uniq148861606894042 uniq148861606894043" aria-labelledby="uniq148861606894044"><span class="button__text" id="uniq148861606894044">\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0433\u043E\u0440\u043E\u0434</span><span class="icon select__tick"></span></button><div class="popup popup_target_anchor popup_theme_islands popup_autoclosable i-bem" data-bem=\'{"popup":{"directions":["bottom-left","bottom-right","top-left","top-right"]}}\' aria-hidden="true"><div class="menu menu_size_l menu_theme_islands menu_mode_radio-check menu__control select__menu i-bem" data-bem=\'{"menu":{}}\'><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":1}}\' role="option" id="uniq148861606894041" aria-checked="false">\u041A\u0438\u0435\u0432</div><div class="menu__item menu__item_checked menu__item_theme_islands" data-bem=\'{"menu__item":{"val":2}}\' role="option" id="uniq148861606894042" aria-checked="true">\u041F\u0440\u0430\u0433\u0430</div><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":3}}\' role="option" id="uniq148861606894043" aria-checked="false">\u041B\u044C\u0432\u043E\u0432</div></div></div></div></div></div><!-- \u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C / \u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C  --><div class="forms__field-item mrg__top40"><div class="field-style field-style--max-wd260 mrg__right18"><button class="btn btn--normal btn--size_l width--size168 float--left">\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C</button><!-- bem \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442 --><!--<button class="button button_theme_islands button_size_l button__control i-bem width&#45;&#45;size168 float&#45;&#45;left"\n                                        data-bem=\'{"button":{}}\' role="button" type="button"><span\n                                        class="button__text">\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C</span></button>--></div><div class="field-style field-style--max-wd260"><button class="btn btn--size_l btn--red width--size168 float--right">\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C</button><!-- bem \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442 --><!--<button class="button button_theme_islands button_size_l button__control i-bem width&#45;&#45;size168 btn&#45;&#45;red float&#45;&#45;right"\n                                        data-bem=\'{"button":{}}\' role="button" type="button"><span\n                                        class="button__text">\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C</span></button>--></div></div><div class="notific font__center mrg__top10 mrg__bottom45">Mail.cz \u043D\u0438 \u043F\u0440\u0438 \u043A\u0430\u043A\u0438\u0445 \u043E\u0431\u0441\u0442\u043E\u044F\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u0430\u0445 \u043D\u0435 \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u0442 \u0442\u0440\u0435\u0442\u044C\u0438\u043C \u043B\u0438\u0446\u0430\u043C \u043D\u0438\u043A\u0430\u043A\u0438\u0445 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445 \u0441\u0432\u043E\u0438\u0445 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439, \u043A\u0440\u043E\u043C\u0435 \u0441\u043B\u0443\u0447\u0430\u0435\u0432, \u043F\u0440\u044F\u043C\u043E \u043F\u0440\u0435\u0434\u0443\u0441\u043C\u043E\u0442\u0440\u0435\u043D\u043D\u044B\u0445 \u0432<br><a class="notific__link" href="">\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0435 \u041A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438.</a></div></div></form></div></div></section><!----><section class="layout-settings__col width--aut"><!-- \u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0431\u043B\u043E\u043A \u0441 \u043F\u0440\u0430\u0432\u0430 --><div class="additional-info"><!-- \u0411\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u044C \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430 --><div class="additional-info__block"><div class="main-title-text main-title-text__icon"><img class="main-title-text__icon--size27" src="images/safety-g.svg" alt=""> \u0411\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u044C \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430</div><!--<div class="additional-info__block__option">--><!--<a class="additional-info__block__link link&#45;&#45;disabled" href="#">\u0410\u043A\u043A\u0430\u0443\u043D\u0442 \u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u0437\u0430\u0449\u0438\u0449\u0435\u043D</a>--><!--<a class="additional-info__block__link" href="#">\u0421\u043C\u0435\u043D\u0438\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C</a>--><!--<a class="additional-info__block__link" href="#">\u041F\u0440\u0438\u0432\u044F\u0437\u0430\u0442\u044C \u0437\u0430\u043F\u0430\u0441\u043D\u043E\u0439 e-mail</a>--><!--<a class="additional-info__block__link" href="#">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430</a>--><!--</div>--><div class="additional-info__block__option"><a class="additional-info__block__link link link--disabled" href="#">\u0410\u043A\u043A\u0430\u0443\u043D\u0442 \u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u0437\u0430\u0449\u0438\u0449\u0435\u043D</a> <a class="additional-info__block__link link mrg__bottom10" href="#">\u0421\u043C\u0435\u043D\u0438\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C</a><div class="additional-info__block__link"><span class="additional-info__block__title">additional@mail.com</span> <button class="additional-info__block__link link btn btn--not-style">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C/\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0437\u0430\u043F\u0430\u0441\u043D\u043E\u0439 e-mail</button></div><div class="additional-info__block__link"><span class="additional-info__block__title">+38050*** **23</span> <button class="additional-info__block__link link btn btn--not-style">\u0414\u043E\u0431\u0430\u0432\u0438\u0442/\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430</button></div></div></div><!-- \u0414\u0440\u0443\u0433\u0438\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 --><div class="additional-info__block"><div class="main-title-text main-title-text__icon"><img class="main-title-text__icon--size27" src="images/other-settings.svg" alt=""> \u0414\u0440\u0443\u0433\u0438\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438</div><div class="additional-info__block__option"><a class="additional-info__block__link" href="#">\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0430\u043A\u043A\u0430\u0443\u043D\u0442</a></div></div><!-- \u041F\u0440\u0438\u0432\u044F\u0437\u0430\u0442\u044C \u043F\u0440\u043E\u0444\u0438\u043B\u044C--><div class="additional-info__block"><div class="main-title-text main-title-text__icon"><img class="main-title-text__icon--size27 hide-elm" src="images/other-settings.svg" alt=""> \u041F\u0440\u0438\u0432\u044F\u0437\u0430\u0442\u044C \u043F\u0440\u043E\u0444\u0438\u043B\u044C</div><div class="additional-info__block__snap-profile"><div class="social-icons"><button class="social-icons__icon social-icons--vk-icon social-icons--btn-tied btn" type="button"></button> <button class="social-icons__icon social-icons--fb-icon btn" type="button"></button> <button class="social-icons__icon social-icons--tw-icon btn" type="button"></button> <button class="social-icons__icon social-icons--gp-icon btn" type="button"></button></div></div></div><!-- \u0427\u0435\u043A\u0431\u043E\u043A\u0441\u044B --><div class="additional-info__block"><div class="font__bold font__size13">\u0420\u0430\u0437\u0440\u0435\u0448\u0438\u0442\u044C \u0434\u043E\u0441\u0442\u0443\u043F \u043A \u043F\u043E\u0447\u0442\u043E\u0432\u043E\u043C\u0443 \u044F\u0449\u0438\u043A\u0443 \u0441 \u043F\u043E\u043C\u043E\u0449\u044C\u044E \u043F\u043E\u0447\u0442\u043E\u0432\u044B\u0445 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432</div><form class="additional-info__allow form" action=""><label class="checkbox checkbox_theme_islands checkbox_size_m i-bem mrg__bottom5" data-bem=\'{"checkbox":{}}\'><span class="checkbox__box"><input class="checkbox__control" type="checkbox" autocomplete="off" name="name1" value="val_1"> </span><span class="checkbox__text" role="presentation">\u0421 \u0441\u0435\u0440\u0432\u0435\u0440\u0430 imap.yandex.ru \u043F\u043E \u043F\u0440\u043E\u0442\u043E\u043A\u043E\u043B\u0443 IMAP</span></label><label class="checkbox checkbox_theme_islands checkbox_size_m i-bem mrg__bottom5" data-bem=\'{"checkbox":{}}\'><span class="checkbox__box"><input class="checkbox__control" type="checkbox" autocomplete="off" name="name1" value="val_1"> </span><span class="checkbox__text" role="presentation">\u0421 \u0441\u0435\u0440\u0432\u0435\u0440\u0430 pop.yandex.ru \u043F\u043E \u043F\u0440\u043E\u0442\u043E\u043A\u043E\u043B\u0443 POP3</span></label></form></div></div></section><!----><section class="layout-settings__row separate--top mrg__top30"><!-- \u0412\u0430\u0448\u0438 \u043F\u043E\u0434\u043F\u0438\u0441\u0438 --><div class="user-signatures"><div class="user-signatures__title main-title-text">\u0412\u0430\u0448\u0438 \u043F\u043E\u0434\u043F\u0438\u0441\u0438</div><div class="user-signatures__edit-text col-md-6 mrg__right20">\u0417\u0434\u0435\u0441\u044C \u0432\u0438\u0434\u0436\u0435\u0442 \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u043F\u043E\u0434\u043F\u0438\u0441\u0438</div><div class="user-signatures__view col-md-6">\u0412\u0438\u0434 \u041D\u0430\u0448\u0435\u0439 \u043F\u043E\u0434\u043F\u0438\u0441\u0438</div></div></section></article><div class="layout__footer"><footer></footer></div>');
$templateCache.put('app/settings/tags/tags.html','<div class="layout__bread-crumbs mrg__bottom15"><div class="bread-crumbs"><a class="bread-crumbs__item" href="#">\u041F\u043E\u0447\u0442\u0430</a> <a class="bread-crumbs__item" href="#">\u0412\u0441\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438</a> <a class="bread-crumbs__item bread-crumbs--active" href="#">\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u043E\u043C</a></div></div><article class="layout-settings"><!----><section class="layout-settings__col width--aut"><!-- \u041F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 --><div class="personal-info"><div class="personal-info__user-avatar mrg__bottom45"><div class="avatar avatar--settings avatar--size203 avatar--second-style"><img class="avatar__image" src="/images/avatar-personal.svg" alt=""> <span class="avatar__edit avatar__edit--add"></span></div></div><div class="personal-info__user-info"><div class="personal-info__user-info-title main-title-text">\u041F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435</div><form class="form" action=""><div class="form__fields"><!-- \u0418\u043C\u044F \u0438 \u0444\u0430\u043C\u0438\u043B\u0438\u044F --><div class="form__field-item"><div class="field-style field-style--max-wd260 mrg__right18"><label class="field-style__title">\u0418\u043C\u044F \u0438 \u0444\u0430\u043C\u0438\u043B\u0438\u044F:</label><input class="input input--size_l width--inh" type="name" placeholder="\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043C\u044F"></div><div class="field-style field-style--max-wd260"><label class="field-style__title hide-elm">&nbsp;&nbsp;</label><input class="input input--size_l width--inh" type="name" placeholder="\u0412\u0430\u0448\u0430 \u0424\u0430\u043C\u0438\u043B\u0438\u044F"></div></div><!-- \u041B\u043E\u0433\u0438\u043D/\u0438\u043C\u044F \u0432 \u0431\u0430\u0437\u0435 --><div class="form__field-item"><div class="field-style field-style--max-wd260 mrg__right18"><label class="field-style__title">\u0418\u043C\u044F \u043D\u0430 mail.cz:</label><div class="select select_mode_radio select_theme_islands select_size_l i-bem width--inh" data-bem=\'{"select":{"name":"select2"}}\'><input class="select__control" type="hidden" name="select2" value="2" autocomplete="off"> <button class="button button_size_l button_theme_islands button__control select__button i-bem" data-bem=\'{"button":{}}\' role="listbox" type="button" aria-owns="uniq148861608057241 uniq148861608057242 uniq148861608057243" aria-labelledby="uniq148861608057244"><span class="button__text" id="uniq148861608057244">@mail.cz</span> <span class="icon select__tick"></span></button><div class="popup popup_target_anchor popup_theme_islands popup_autoclosable i-bem" data-bem=\'{"popup":{"directions":["bottom-left","bottom-right","top-left","top-right"]}}\' aria-hidden="true"><div class="menu menu_size_l menu_theme_islands menu_mode_radio menu__control select__menu i-bem" data-bem=\'{"menu":{}}\'><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":1}}\' role="option" id="uniq148861608057241" aria-checked="false">@mail.cz</div><div class="menu__item menu__item_checked menu__item_theme_islands" data-bem=\'{"menu__item":{"val":2}}\' role="option" id="uniq148861608057242" aria-checked="true">@mail.cz</div><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":3}}\' role="option" id="uniq148861608057243" aria-checked="false">@mail.cz</div></div></div></div></div><div class="field-style field-style--max-wd260"><label class="field-style__title hide-elm">&nbsp;&nbsp;</label><input class="input input--size_l width--inh" type="name" placeholder="\u0412\u0430\u0448 \u043B\u043E\u0433\u0438\u043D \u043F\u043E\u0447\u0442\u044B "><!-- bem \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442 --><!-- <span class="input input_theme_islands input_size_l i-bem"data-bem=\'{"input":{}}\'>\n                                    <span class="input__box">\n                                        <input class="input__control" placeholder="\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043C\u044F"/>\n                                    </span>\n                                </span> --></div><div class="notific mrg__top7">\u042D\u0442\u043E \u0438\u043C\u044F \u0441\u043C\u043E\u0433\u0443\u0442 \u0432\u0438\u0434\u0435\u0442\u044C \u0434\u0440\u0443\u0433\u0438\u0435 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438 Mail.cz \u2014 \u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440, \u0438\u043C \u0431\u0443\u0434\u0435\u0442 \u043F\u043E\u0434\u043F\u0438\u0441\u0430\u043D\u0430 \u0432\u0430\u0448\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430</div></div><!-- \u0414\u0430\u0442\u0430 / \u041F\u043E\u043B --><div class="form__field-item"><!--\u0414\u0430\u0442\u0430 \u0440\u043E\u0436\u0434\u0435\u043D\u0438\u044F--><div class="field-style field-style--max-wd260 mrg__right18"><label class="field-style__title">\u0414\u0430\u0442\u0430 \u0440\u043E\u0436\u0434\u0435\u043D\u0438\u044F:</label><div class="field-style__container width--inh"><!-- \u0414\u0435\u043D\u044C --> <input class="input input--size_l width--size65" type="name" placeholder="\u0414\u0435\u043D\u044C"><!-- bem \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442 --><!-- <span class="input input_theme_islands input_size_l i-bem input&#45;&#45;width65 " data-bem=\'{"input":{}}\'>\n                                        <span class="input__box">\n                                         <input class="input__control" placeholder="\u0414\u0435\u043D\u044C"/>\n                                        </span>\n                                    </span>--><!-- \u041C\u0435\u0441\u044F\u0446 --><div class="select select_mode_radio-check select_theme_islands select_size_l i-bem width--inh" data-bem=\'{"select":{"name":"select3","text":"\u2014"}}\'><input class="select__control" type="hidden" name="select3" value="2" autocomplete="off"> <button class="button button_size_l button_theme_islands button_checked button__control select__button i-bem" data-bem=\'{"button":{}}\' role="listbox" type="button" aria-owns="uniq148861606894041 uniq148861606894042 uniq148861606894043" aria-labelledby="uniq148861606894044"><span class="button__text" id="uniq148861606894044">\u041C\u0435\u0441\u044F\u0446</span> <span class="icon select__tick"></span></button><div class="popup popup_target_anchor popup_theme_islands popup_autoclosable i-bem" data-bem=\'{"popup":{"directions":["bottom-left","bottom-right","top-left","top-right"]}}\' aria-hidden="true"><div class="menu menu_size_l menu_theme_islands menu_mode_radio-check menu__control select__menu i-bem" data-bem=\'{"menu":{}}\'><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":1}}\' role="option" id="uniq148861606894041" aria-checked="false">\u042F\u043D\u0432\u0430\u0440\u044C</div><div class="menu__item menu__item_checked menu__item_theme_islands" data-bem=\'{"menu__item":{"val":2}}\' role="option" id="uniq148861606894042" aria-checked="true">\u0424\u0435\u0432\u0440\u0430\u043B\u044C</div><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":3}}\' role="option" id="uniq148861606894043" aria-checked="false">\u041C\u0430\u0440\u0442</div><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":3}}\' role="option" id="uniq148861606894043" aria-checked="false">\u0410\u043F\u0440\u0435\u043B\u044C</div><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":3}}\' role="option" id="uniq148861606894043" aria-checked="false">\u041C\u0430\u0439</div><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":3}}\' role="option" id="uniq148861606894043" aria-checked="false">\u0418\u044E\u043D\u044C</div><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":3}}\' role="option" id="uniq148861606894043" aria-checked="false">\u0418\u044E\u043B\u044C</div><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":3}}\' role="option" id="uniq148861606894043" aria-checked="false">\u0410\u0432\u0433\u0443\u0441\u0442</div><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":3}}\' role="option" id="uniq148861606894043" aria-checked="false">\u0421\u0435\u043D\u0442\u044F\u0431\u0440\u044C</div><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":3}}\' role="option" id="uniq148861606894043" aria-checked="false">\u041E\u043A\u0442\u044F\u0431\u0440\u044C</div><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":3}}\' role="option" id="uniq148861606894043" aria-checked="false">\u041D\u043E\u044F\u0431\u0440\u044C</div><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":3}}\' role="option" id="uniq148861606894043" aria-checked="false">\u0414\u0435\u043A\u0430\u0431\u043B\u044C</div></div></div></div><!-- \u0413\u043E\u0434--> <input class="input input--size_l width--size65" type="name" placeholder="\u0413\u043E\u0434"><!-- bem \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442 --><!-- <span class="input input_theme_islands input_size_l i-bem input&#45;&#45;width65 " data-bem=\'{"input":{}}\'>\n                                        <span class="input__box">\n                                        <input class="input__control" placeholder="\u0414\u0435\u043D\u044C"/>\n                                        </span>\n                                    </span>--></div></div><!-- \u041F\u043E\u043B --><div class="field-style field-style--max-wd260"><label class="field-style__title">\u041F\u043E\u043B:</label><span class="radio-group radio-group_theme_islands radio-group_size_l radio-group_type_button control-group i-bem" data-bem=\'{"radio-group":{}}\' role="radiogroup"><label class="radio radio_type_button radio_theme_islands radio_size_l radio_checked i-bem mrg__none" data-bem=\'{"radio":{}}\'><button class="button button_togglable_radio button_checked button_theme_islands button_size_l button__control i-bem" data-bem=\'{"button":{}}\' role="button" type="button" aria-pressed="true"><span class="button__text">\u041C\u0443\u0436\u0441\u043A\u043E\u0439</span></button> <input class="radio__control" type="radio" autocomplete="off" name="radio-islands" value="2" checked="checked"></label><label class="radio radio_type_button radio_theme_islands radio_size_l i-bem mrg__none" data-bem=\'{"radio":{}}\'><button class="button button_togglable_radio button_theme_islands button_size_l button__control i-bem" data-bem=\'{"button":{}}\' role="button" type="button" aria-pressed="false"><span class="button__text">\u0416\u0435\u043D\u0441\u043A\u0438\u0439</span></button> <input class="radio__control" type="radio" autocomplete="off" name="radio-islands" value="3"></label></span></div></div><!-- \u0421\u0442\u0440\u0430\u043D\u0430 / \u0413\u043E\u0440\u043E\u0434 --><div class="form__field-item"><!-- \u0421\u0442\u0440\u0430\u043D\u0430 --><div class="field-style field-style--max-wd260 mrg__right18"><label class="field-style__title">\u0421\u0442\u0440\u0430\u043D\u0430</label><div class="select select_mode_radio-check select_theme_islands select_size_l i-bem width--inh" data-bem=\'{"select":{"name":"select3","text":"\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0443"}}\'><input class="select__control" type="hidden" name="select3" value="2" autocomplete="off"> <button class="button button_size_l button_theme_islands button_checked button__control select__button i-bem" data-bem=\'{"button":{}}\' role="listbox" type="button" aria-owns="uniq148861608062641 uniq148861608062642 uniq148861608062643" aria-labelledby="uniq148861608062644"><span class="button__text" id="uniq148861608062644">\u041C\u0430\u0441\u0442\u0435\u0440-\u043A\u043B\u0430\u0441\u0441</span><span class="icon select__tick"></span></button><div class="popup popup_target_anchor popup_theme_islands popup_autoclosable i-bem" data-bem=\'{"popup":{"directions":["bottom-left","bottom-right","top-left","top-right"]}}\' aria-hidden="true"><div class="menu menu_size_l menu_theme_islands menu_mode_radio-check menu__control select__menu i-bem" data-bem=\'{"menu":{}}\'><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":1}}\' role="option" id="uniq148861608062641" aria-checked="false">\u0420\u043E\u0441\u0441\u0438\u044F</div><div class="menu__item menu__item_checked menu__item_theme_islands" data-bem=\'{"menu__item":{"val":2}}\' role="option" id="uniq148861608062642" aria-checked="true">\u0427\u0435\u0445\u0438\u044F</div><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":3}}\' role="option" id="uniq148861608062643" aria-checked="false">\u0423\u043A\u0440\u0430\u0438\u043D\u0430</div></div></div></div></div><!-- \u0413\u043E\u0440\u043E\u0434 --><div class="field-style field-style--max-wd260"><label class="field-style__title">\u0413\u043E\u0440\u043E\u0434:</label><div class="select select_mode_radio-check select_theme_islands select_size_l i-bem width--inh" data-bem=\'{"select":{"name":"select3","text":"\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0433\u043E\u0440\u043E\u0434"}}\'><input class="select__control" type="hidden" name="select3" value="2" autocomplete="off"> <button class="button button_size_l button_theme_islands button_checked button__control select__button i-bem" data-bem=\'{"button":{}}\' role="listbox" type="button" aria-owns="uniq148861606894041 uniq148861606894042 uniq148861606894043" aria-labelledby="uniq148861606894044"><span class="button__text" id="uniq148861606894044">\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0433\u043E\u0440\u043E\u0434</span><span class="icon select__tick"></span></button><div class="popup popup_target_anchor popup_theme_islands popup_autoclosable i-bem" data-bem=\'{"popup":{"directions":["bottom-left","bottom-right","top-left","top-right"]}}\' aria-hidden="true"><div class="menu menu_size_l menu_theme_islands menu_mode_radio-check menu__control select__menu i-bem" data-bem=\'{"menu":{}}\'><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":1}}\' role="option" id="uniq148861606894041" aria-checked="false">\u041A\u0438\u0435\u0432</div><div class="menu__item menu__item_checked menu__item_theme_islands" data-bem=\'{"menu__item":{"val":2}}\' role="option" id="uniq148861606894042" aria-checked="true">\u041F\u0440\u0430\u0433\u0430</div><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":3}}\' role="option" id="uniq148861606894043" aria-checked="false">\u041B\u044C\u0432\u043E\u0432</div></div></div></div></div></div><!-- \u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C / \u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C  --><div class="forms__field-item mrg__top40"><div class="field-style field-style--max-wd260 mrg__right18"><button class="btn btn--normal btn--size_l width--size168 float--left">\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C</button><!-- bem \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442 --><!--<button class="button button_theme_islands button_size_l button__control i-bem width&#45;&#45;size168 float&#45;&#45;left"\n                                        data-bem=\'{"button":{}}\' role="button" type="button"><span\n                                        class="button__text">\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C</span></button>--></div><div class="field-style field-style--max-wd260"><button class="btn btn--size_l btn--red width--size168 float--right">\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C</button><!-- bem \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442 --><!--<button class="button button_theme_islands button_size_l button__control i-bem width&#45;&#45;size168 btn&#45;&#45;red float&#45;&#45;right"\n                                        data-bem=\'{"button":{}}\' role="button" type="button"><span\n                                        class="button__text">\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C</span></button>--></div></div><div class="notific font__center mrg__top10 mrg__bottom45">Mail.cz \u043D\u0438 \u043F\u0440\u0438 \u043A\u0430\u043A\u0438\u0445 \u043E\u0431\u0441\u0442\u043E\u044F\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u0430\u0445 \u043D\u0435 \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u0442 \u0442\u0440\u0435\u0442\u044C\u0438\u043C \u043B\u0438\u0446\u0430\u043C \u043D\u0438\u043A\u0430\u043A\u0438\u0445 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445 \u0441\u0432\u043E\u0438\u0445 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439, \u043A\u0440\u043E\u043C\u0435 \u0441\u043B\u0443\u0447\u0430\u0435\u0432, \u043F\u0440\u044F\u043C\u043E \u043F\u0440\u0435\u0434\u0443\u0441\u043C\u043E\u0442\u0440\u0435\u043D\u043D\u044B\u0445 \u0432<br><a class="notific__link" href="">\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0435 \u041A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438.</a></div></div></form></div></div></section><!----><section class="layout-settings__col width--aut"><!-- \u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0431\u043B\u043E\u043A \u0441 \u043F\u0440\u0430\u0432\u0430 --><div class="additional-info"><!-- \u0411\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u044C \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430 --><div class="additional-info__block"><div class="main-title-text main-title-text__icon"><img class="main-title-text__icon--size27" src="images/safety-g.svg" alt=""> \u0411\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u044C \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430</div><!--<div class="additional-info__block__option">--><!--<a class="additional-info__block__link link&#45;&#45;disabled" href="#">\u0410\u043A\u043A\u0430\u0443\u043D\u0442 \u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u0437\u0430\u0449\u0438\u0449\u0435\u043D</a>--><!--<a class="additional-info__block__link" href="#">\u0421\u043C\u0435\u043D\u0438\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C</a>--><!--<a class="additional-info__block__link" href="#">\u041F\u0440\u0438\u0432\u044F\u0437\u0430\u0442\u044C \u0437\u0430\u043F\u0430\u0441\u043D\u043E\u0439 e-mail</a>--><!--<a class="additional-info__block__link" href="#">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430</a>--><!--</div>--><div class="additional-info__block__option"><a class="additional-info__block__link link link--disabled" href="#">\u0410\u043A\u043A\u0430\u0443\u043D\u0442 \u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u0437\u0430\u0449\u0438\u0449\u0435\u043D</a> <a class="additional-info__block__link link mrg__bottom10" href="#">\u0421\u043C\u0435\u043D\u0438\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C</a><div class="additional-info__block__link"><span class="additional-info__block__title">additional@mail.com</span> <button class="additional-info__block__link link btn btn--not-style">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C/\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0437\u0430\u043F\u0430\u0441\u043D\u043E\u0439 e-mail</button></div><div class="additional-info__block__link"><span class="additional-info__block__title">+38050*** **23</span> <button class="additional-info__block__link link btn btn--not-style">\u0414\u043E\u0431\u0430\u0432\u0438\u0442/\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430</button></div></div></div><!-- \u0414\u0440\u0443\u0433\u0438\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 --><div class="additional-info__block"><div class="main-title-text main-title-text__icon"><img class="main-title-text__icon--size27" src="images/other-settings.svg" alt=""> \u0414\u0440\u0443\u0433\u0438\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438</div><div class="additional-info__block__option"><a class="additional-info__block__link" href="#">\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0430\u043A\u043A\u0430\u0443\u043D\u0442</a></div></div><!-- \u041F\u0440\u0438\u0432\u044F\u0437\u0430\u0442\u044C \u043F\u0440\u043E\u0444\u0438\u043B\u044C--><div class="additional-info__block"><div class="main-title-text main-title-text__icon"><img class="main-title-text__icon--size27 hide-elm" src="images/other-settings.svg" alt=""> \u041F\u0440\u0438\u0432\u044F\u0437\u0430\u0442\u044C \u043F\u0440\u043E\u0444\u0438\u043B\u044C</div><div class="additional-info__block__snap-profile"><div class="social-icons"><button class="social-icons__icon social-icons--vk-icon social-icons--btn-tied btn" type="button"></button> <button class="social-icons__icon social-icons--fb-icon btn" type="button"></button> <button class="social-icons__icon social-icons--tw-icon btn" type="button"></button> <button class="social-icons__icon social-icons--gp-icon btn" type="button"></button></div></div></div><!-- \u0427\u0435\u043A\u0431\u043E\u043A\u0441\u044B --><div class="additional-info__block"><div class="font__bold font__size13">\u0420\u0430\u0437\u0440\u0435\u0448\u0438\u0442\u044C \u0434\u043E\u0441\u0442\u0443\u043F \u043A \u043F\u043E\u0447\u0442\u043E\u0432\u043E\u043C\u0443 \u044F\u0449\u0438\u043A\u0443 \u0441 \u043F\u043E\u043C\u043E\u0449\u044C\u044E \u043F\u043E\u0447\u0442\u043E\u0432\u044B\u0445 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432</div><form class="additional-info__allow form" action=""><label class="checkbox checkbox_theme_islands checkbox_size_m i-bem mrg__bottom5" data-bem=\'{"checkbox":{}}\'><span class="checkbox__box"><input class="checkbox__control" type="checkbox" autocomplete="off" name="name1" value="val_1"> </span><span class="checkbox__text" role="presentation">\u0421 \u0441\u0435\u0440\u0432\u0435\u0440\u0430 imap.yandex.ru \u043F\u043E \u043F\u0440\u043E\u0442\u043E\u043A\u043E\u043B\u0443 IMAP</span></label><label class="checkbox checkbox_theme_islands checkbox_size_m i-bem mrg__bottom5" data-bem=\'{"checkbox":{}}\'><span class="checkbox__box"><input class="checkbox__control" type="checkbox" autocomplete="off" name="name1" value="val_1"> </span><span class="checkbox__text" role="presentation">\u0421 \u0441\u0435\u0440\u0432\u0435\u0440\u0430 pop.yandex.ru \u043F\u043E \u043F\u0440\u043E\u0442\u043E\u043A\u043E\u043B\u0443 POP3</span></label></form></div></div></section><!----><section class="layout-settings__row separate--top mrg__top30"><!-- \u0412\u0430\u0448\u0438 \u043F\u043E\u0434\u043F\u0438\u0441\u0438 --><div class="user-signatures"><div class="user-signatures__title main-title-text">\u0412\u0430\u0448\u0438 \u043F\u043E\u0434\u043F\u0438\u0441\u0438</div><div class="user-signatures__edit-text col-md-6 mrg__right20">\u0417\u0434\u0435\u0441\u044C \u0432\u0438\u0434\u0436\u0435\u0442 \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u043F\u043E\u0434\u043F\u0438\u0441\u0438</div><div class="user-signatures__view col-md-6">\u0412\u0438\u0434 \u041D\u0430\u0448\u0435\u0439 \u043F\u043E\u0434\u043F\u0438\u0441\u0438</div></div></section></article><div class="layout__footer"><footer></footer></div>');}]);