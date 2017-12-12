(function () {
    'use strict';

    angular.module('app', [
        'app.core',
        'app.services',
        'app.components',
        'app.directives',
        'app.layout',
        'settings',
        'marketing',
        'auth',
        'mail'
    ]);
})();

(function () {
    'use strict';

    angular.module('auth', [
        'auth.signIn',
        'auth.signUp',
        'auth.passwordReset',
        'auth.passwordUpdate',
        'auth.signTemp'
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
            'ng-token-auth',
            'ngFileUpload',
            'ngImgCrop',
            'ui.select',
            'dcbImgFallback',
            'ngFileSaver',
            'infinite-scroll',
            'content-editable',
            'LocalStorageModule',
            'ngTagsInput',
            'pascalprecht.translate',
            'ngCookies',
            'ngPasswordStrength',
            'angular-google-adsense'
        ]);
})();

(function() {
  'use strict';

  angular.module('app.layout', [
    'app.core'
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

  angular.module('app.components', []);
})();

(function() {
    'use strict';

    angular.module('app.directives', []);
})();

(function () {
    'use strict';

    angular.module('mail', [
        'mail.inbox',
        'mail.compose',
        'mail.message'
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
        'settings.tags',
        'settings.folders',
        'settings.rules',
        'settings.accounts',
        'settings.contacts',
        'settings.ruleAdd'
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

    angular.module('auth.passwordUpdate', [
        'app.core',
        'app.components'
    ]);
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

    angular.module('auth.signTemp', [
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

  angular.module('blocks.router', [
    'ui.router',
    'blocks.logger'
  ]);
})();

(function() {
  'use strict';

  angular.module('blocks.logger', []);
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

(function () {
    'use strict';

    angular.module('settings.accounts', []);
})();

(function () {
    'use strict';

    angular.module('settings.contacts', []);
})();

(function () {
    'use strict';

    angular.module('settings.folders', []);
})();

(function () {
    'use strict';

    angular.module('settings.main', []);
})();

(function () {
    'use strict';

    angular.module('settings.rules', []);
})();

(function () {
    'use strict';

    angular.module('settings.ruleAdd', []);
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

    core.config(["$translateProvider", function ($translateProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: 'i18n/',
            suffix: '.json'
        });
        $translateProvider.useSanitizeValueStrategy(null);
        $translateProvider.useLocalStorage();
        $translateProvider.useLoaderCache('$translationCache');
    }]);

    core.config(["toastrConfig", function (toastrConfig) {
        angular.extend(toastrConfig, {
            timeOut: 2000,
            toastClass: 'toast toast--extend'
        });
    }]);

    core.config(["tagsInputConfigProvider", function (tagsInputConfigProvider) {
        tagsInputConfigProvider.setDefaults('tagsInput', {placeholder: ''});
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
    }]);

    core.config(["$httpProvider", function ($httpProvider) {
        $httpProvider.$inject = ['$q', '$rootScope', '$injector', '$location'];

        $httpProvider
            .interceptors
            .push(["$q", "$rootScope", "$injector", "$location", function ($q, $rootScope, $injector, $location) {
                return {
                    'responseError': function (rejection) {
                        var defer = $q.defer();

                        if (rejection.status === 401) {
                            // window.location.href = '/sign-in';
                            $location.path('/sign-in');
                        }

                        defer.reject(rejection);

                        return defer.promise;
                    },
                    'response': function (response) {
                        return response;
                    }
                };
            }]);
    }]);

    core.run(["$translate", "lang", "config", function($translate, lang, config) {
        config.getIndex().then(function () {
            lang.init();
        });
    }]);
})();

(function () {
    'use strict';

    angular
        .module('app.core')
        .constant('CONFIG', window.appConfig
            // {
            //     DebugMode: true,
            //     APIHost: window.appConfig.APIHost,
            //     MediaUrl: window.appConfig.MediaUrl,
            //     AttachUrl: window.appConfig.AttachUrl
            // }
        );
})();

(function () {
    'use strict';

    appRun.$inject = ["routerHelper", "$cookies", "$auth", "timezone", "CONFIG", "$rootScope"];
    angular
        .module('app.core')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper, $cookies, $auth, timezone, CONFIG, $rootScope) {

        $rootScope.CONFIG = CONFIG;

        timezone.get();

        if ($cookies.get('authToken')) {
            var tokenArr = $cookies.get('authToken').split('+');
            $auth.setAuthHeaders({
                "Authorization": "Bearer " + tokenArr[1]
            });
        }

        var otherwise = '/';
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
        .directive('autofocus', autofocus);

    autofocus.$inject = ['$timeout'];

    /* @ngInject */
    function autofocus($timeout) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            var autofocus = scope.$eval(attrs.autofocus);
            console.log('autofocus', autofocus, element);
            if (autofocus) {
                var input = element.find('input');
                $timeout(function () {
                    input[0].focus();
                }, 250);
            }
        }
    }

})();

(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('bodyMessageScroll', bodyMessageScroll);

    bodyMessageScroll.$inject = ['$timeout'];

    /* @ngInject */
    function bodyMessageScroll($timeout) {
        var directive = {
            link: link,
            restrict: 'A',
            scope: true
        };
        return directive;


        function link(scope, element, attrs) {
            $timeout(function () {
                console.log('el', $(element).height());
                $(element).css('height', $(element).height());
            }, 50);
        }
    }
})();
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

(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('iframePaste', iframePaste);

    iframePaste.$inject = ['$sce', '$auth', '$rootScope', 'CONFIG'];

    function iframePaste($sce, $auth, $rootScope, CONFIG) {
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
                var url = CONFIG.parentHost + '?aToken=' + '' + scope.user.access_token;
                scope.url = $sce.trustAsResourceUrl(url);
            }

            function logout() {
                var url = CONFIG.parentHost + '?logout';
                scope.url = $sce.trustAsResourceUrl(url);
            }
        }
    }

})();

(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('imageLoad', imageLoad);

    imageLoad.$inject = ['$timeout'];

    function imageLoad($timeout) {
        var directive = {
            link: link,
            restrict: 'A',
            scope: {
                imageLoadIsError: '=?',
                imageLoadIsSuccess: '=?',
                imageLoadIsLoading: '=?'
            }
        };
        return directive;

        function link(scope, element, attrs) {
            scope.imageLoadIsLoading = true;

            element.bind('load', function () {
                $timeout(function () {
                    scope.imageLoadIsLoading = false;
                    scope.imageLoadIsSuccess = true;
                });
            });

            element.bind('error', function () {
                $timeout(function () {
                    scope.imageLoadIsLoading = false;
                    scope.imageLoadIsError = true;
                });
            });
        }
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
            $('.main-layout__inner').css({
                minHeight: $(document).innerHeight()
            });
        }
    }

})();

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

(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('mediaUrl', mediaUrl);

    mediaUrl.$inject = ['CONFIG'];

    /* @ngInject */
    function mediaUrl(CONFIG) {
        var directive = {
            link: link,
            restrict: 'EA',
            scope: true
        };
        return directive;

        function link(scope, element, attrs) {
            scope.$watch(attrs['mediaUrl'], function() {
                var mediaUrl = scope.$eval(attrs.mediaUrl);
                element.attr('src', mediaUrl);
            });
        }
    }

})();

(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('messageHeaderSticky', messageHeaderSticky);

    messageHeaderSticky.$inject = ['$window'];

    /* @ngInject */
    function messageHeaderSticky($window) {
        var directive = {
            link: link,
            restrict: 'A',
            scope: {
                offsetTop: "@",
                stickyClass: "@"
            }
        };
        return directive;

        function link(scope, element, attrs) {

            angular.element($window).bind("scroll", function () {
                if (this.pageYOffset >= $('.mail-message__title-message').innerHeight()) {

                    element.addClass(scope.stickyClass);
                    element.css({
                        position: 'fixed',
                        top: scope.offsetTop + 'px',
                        left: 0,
                        right: 0
                    });
                } else {
                    element.removeAttr("style");
                    element.removeClass(scope.stickyClass);
                }
                scope.$apply();
            });
        }
    }
})();
(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('messageTextarea', messageTextarea);

    messageTextarea.$inject = ['$sce', '$timeout', '$compile', 'googleTranslation', 'lang', '$translate'];

    /* @ngInject */
    function messageTextarea($sce, $timeout, $compile, googleTranslation, lang, $translate) {
        var directive = {
            template: '<div class="message-textarea"><div class="{{ targetElement }} message-textarea"></div></div>',
            link: link,
            require: '?ngModel',
            restrict: 'EA',
            scope: {
                params: '=?',
                messageTextareaHtml: '=?',
                messageTextareaIsTranslate: '=?',
                messageTextareaIsTranslateShow: '=?',
                messageTextareaHtmlTranslate: '=?',
                messageTextareaHtmlSign: '=?',
                messageTextareaHtmlFwd: '=?',
                messageTextareaHtmlRe: '=?',
                messageTextareaTimeLoad: '@?',
                isSign: '=?'
            },
            replace: true
        };
        return directive;

        function link(scope, element, attrs, ngModel) {
            var isLoadedModel = false;
            var timeLoad = scope.messageTextareaTimeLoad || 250;
            var $summetnote;
            var body = '';

            scope.translateFrom = {};
            scope.translateTo = {};
            scope.language = '';

            // scope.setClear = setClear;

            scope.targetElement = _.uniqueId('summernote_');

            scope.$watch('translateTo', function (data, oldData) {
                scope.language = data.language;
                translate(ngModel.$viewValue);
            }, true);

            scope.$watch('messageTextareaHtmlSign', function (data, oldData) {
                if (data) {
                    scope.signHTML = $sce.trustAsHtml(data);
                    // console.log('signHTML', scope.signHTML);

                    $timeout(function () {
                        updateModel();
                    }, 250);
                }
            });

            scope.$watch('messageTextareaHtmlRe', function (data, oldData) {
                if (data) {
                    scope.reHTML = $sce.trustAsHtml(data);
                    // console.log('reHTML', scope.reHTML);

                    $timeout(function () {
                        updateModel();
                    }, 250);
                }
            });

            scope.$watch('messageTextareaHtmlFwd', function (data, oldData) {
                if (data) {
                    scope.fwdHTML = $sce.trustAsHtml(data);
                    // console.log('fwdHTML', scope.fwdHTML);

                    $timeout(function () {
                        updateModel();
                    }, 250);
                }
            });

            $translate('TRANSLATOR').then(function (translation) {
                var HelloButton = function (context) {
                    var ui = $.summernote.ui;

                    if (scope.messageTextareaIsTranslateShow) {
                        var button = ui.button({
                            className: 'btn--normal',
                            contents: translation,
                            tooltip: translation,
                            click: function () {
                                scope.messageTextareaIsTranslate = !scope.messageTextareaIsTranslate;

                                if (scope.messageTextareaIsTranslate) {
                                    showTextareaTranslate();
                                } else {
                                    hideTextareaTranslate();
                                }
                                scope.$apply();
                            }
                        });

                        return button.render();
                    }
                };

                $timeout(function () {
                    var useLang = lang.getCurrentLang().ico;
                    scope.$watch('messageTextareaHtml', function (newValue) {
                            if (newValue && !isLoadedModel && !scope.params.new && !scope.params.re && !scope.params.fwd && (scope.params.mbox === 'Drafts' || scope.params.mbox === 'Outbox' || scope.params.mbox === 'Templates')) {
                                isLoadedModel = true;

                                console.log('newValue', scope.bodyHTML);

                                scope.bodyHTML = ngModel.$viewValue;
                                // element.find('.note-editable--body').html(ngModel.$viewValue);
                                return;
                            }

                            if (scope.isSign && !newValue) {
                                $summetnote.summernote('code', '');
                            }

                            if (scope.isSign && newValue && !isLoadedModel) {
                                $summetnote.summernote('code', newValue);
                                isLoadedModel = true;
                            }
                        }
                    );

                    $summetnote = $('.' + scope.targetElement).summernote({
                        fontSizes: ['8', '9', '10', '11', '12', '14', '16', '18', '24', '36'],
                        minHeight: 400,
                        dialogsInBody: true,
                        callbacks: {
                            onInit: function () {
                                $('.note-recent-color').css('background-color', 'rgb(255, 255, 255)');
                            },
                            onChange: function (contents, $editable) {
                                if (!scope.isSign) {
                                    // alert();
                                }

                                ngModel.$setViewValue(contents);

                                if (scope.messageTextareaIsTranslate) {
                                    translate(contents);
                                }
                            }

                        },
                        lang: useLang,
                        toolbar: [
                            ['undo', ['undo', 'redo']],
                            ['font', ['bold', 'italic', 'underline', 'strikethrough', 'fontname']],
                            // ['color'],
                            // ['fontname', ['fontname']],
                            ['color', ['color']],
                            ['para', ['ol', 'ul']],
                            ['para', ['paragraph']],
                            // ['para', ['alignCenter']],
                            ['fontsize', ['fontsize']],
                            // ['height', ['height', 'fontsize']],
                            // ['table', ['table']],
                            ['insert', ['link', 'picture']],
                            // ['view', ['fullscreen', 'codeview']],

                            ['clear', ['clear']],

                            ['mybutton', ['hello']]
                            // ['help', ['help']]
                        ],
                        buttons: {
                            hello: HelloButton
                        },
                        icons: {
                            undo: 'icon-undo',
                            redo: 'icon-redo',
                            bold: 'icon-bold-en',
                            italic: 'icon-italic-en',
                            underline: 'icon-underline',
                            eraser: 'icon-style',
                            'current-color': 'icon-font-color',
                            // font: 'icon-background-color',
                            fontname: 'icon-font-family',
                            fontsize: 'icon-font-size',
                            orderedlist: 'icon-ol',
                            unorderedlist: 'icon-ul',
                            link: 'icon-link',
                            unlink: 'icon-unlink',
                            picture: 'icon-background',
                            arrowsAlt: 'icon-full-screen',
                            strikethrough: 'icon-thru',

                            align: 'icon-align-c',
                            alignCenter: 'icon-align-c',
                            alignLeft: 'icon-align-l',
                            alignRight: 'icon-align-r',
                            caret: 'icon-arrow-down'
                        }
                    });

                    $('.note-statusbar').html("<span class='summernote__resize'>◢</span>");

                    $('.note-btn.dropdown-toggle').attr('dropdown-append-to-body','');
                    $('.note-btn.dropdown-toggle').attr(' uib-dropdown','');

                    pasteStructureHtml();

                }, timeLoad);
            });

            function showTextareaTranslate() {
                scope.$noteEditingArea = element.find('.note-editing-area');
                scope.$noteToolbar = element.find('.note-toolbar');
                scope.$textareaTranslateMenu = $compile('<textarea-translate-menu translate-from="translateFrom" translate-to="translateTo"></textarea-translate-menu>')(scope);
                scope.$noteToolbar.after(scope.$textareaTranslateMenu);
                scope.$noteEditingArea.append('<div class="note-editing-area-translate"></div>');
                scope.$noteEditingAreaTranslate = element.find('.note-editing-area-translate');
                scope.$noteEditingArea.addClass('message-textarea__note-editing-area--translate');
                translate(ngModel.$viewValue);
            }

            function hideTextareaTranslate() {
                scope.$noteEditingAreaTranslate.remove();
                scope.$textareaTranslateMenu.remove();
            }

            function translate(contents) {
                if (contents && scope.messageTextareaIsTranslate && scope.language) {
                    googleTranslation.translate({}, {
                        "q": contents,
                        "target": scope.language
                    }).then(function (response) {
                        scope.messageTextareaHtmlTranslate = response.data.translations[0].translatedText;
                        scope.$noteEditingAreaTranslate.html(scope.messageTextareaHtmlTranslate);
                    });
                }
            }

            function pasteStructureHtml() {
                var html = [
                    '<div class="note-editable--body" ng-bind-html="bodyHTML"></div>',
                    '<div class="note-editable--re" ng-bind-html="reHTML"></div>',
                    '<div class="note-editable--sign" ng-bind-html="signHTML"></div>',
                    '<div class="note-editable--fwd" ng-bind-html="fwdHTML"></div>'
                ].join(' ');
                element.find('.note-editable').append($compile(html)(scope));
            }

            function updateModel() {
                ngModel.$setViewValue($summetnote.summernote('code'));
            }
        }
    }

})();

(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('passwordChangeLink', passwordChangeLink);

    passwordChangeLink.$inject = ['$auth', '$translate', 'CONFIG'];

    /* @ngInject */
    function passwordChangeLink($auth, $translate, CONFIG) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            element.on('click', function () {
                window.open(
                    CONFIG.passportLink + '?token=' + $auth.user.access_token.split(' ')[1] + '&lang=' + $translate.use() + '&from=' + CONFIG.domainZone,
                    '_blank'
                );
            });
        }
    }

})();

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

(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('scrollLeft', scrollLeft);

    scrollLeft.$inject = ['CONFIG'];

    /* @ngInject */
    function scrollLeft(CONFIG) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            $(document).ready(function () {
                $('.menu-main-layout__user-info-container').scrollLeft($(this).height());
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
                var $headerNavigation = angular.element(document.querySelector('.main-header__navigation'));
                $headerNavigation.css({'display': 'block'});
            }

            function hideMenu() {
                var element = angular.element(document.querySelector('.main-header__navigation'));
                element.css({'display': 'none'});
            }
        }
    }

})();

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

(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('serverError', serverError);

    serverError.$inject = ['$rootScope'];
    /* @ngInject */
    function serverError($rootScope) {
        var directive = {
            require: '?ngModel',
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs, ngModel) {
            element.on('change', function () {
                scope.$apply(function () {
                    ngModel.$setValidity('server', true);
                });
            });
        }
    }

})();

(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('setFocus', setFocus);

    setFocus.$inject = ['$window', '$timeout'];

    /* @ngInject */
    function setFocus($window, $timeout) {
        var directive = {
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
            element.on('click', function (event) {
                event.preventDefault();
                event.stopPropagation();
                $timeout(function () {
                    var $el = $('#' + attrs.setFocus);
                    $el.focus();
                }, 500);
            });
        }
    }

})();

(function () {
    'use strict';

    angular
        .module('mail')
        .controller('MailController', MailController);

    MailController.$inject = ['folder', 'tagResolve', '$rootScope'];
    /* @ngInject */
    function MailController(folder, tagResolve, $rootScope) {
        var vm = this;

        vm.closeMenu = closeMenu;
        vm.closeSettingsMenu = closeSettingsMenu;
        activate();

        function activate() {
            vm.folder = folder;
            vm.tag = tagResolve;
        }

        function closeMenu() {
            $rootScope.isOpenMenu = false;
        }

        function closeSettingsMenu() {
            $rootScope.isOpenSettingsMenu = false;
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
                    controller: 'MailController',
                    controllerAs: 'vm',
                    resolve: {
                        auth: function ($auth, $state) {
                            return $auth.validateUser().catch(function () {
                                $state.go('signIn');
                            });
                        },
                        folder: function (mailBox) {
                            return mailBox.get();
                        },
                        tagResolve: function (tag) {
                            return tag.get();
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

        function signWithToken(token, options) {
            var options = options || {};

            $auth.user.access_token = token;

            $timeout(function () {
                $('#iframe--auth').on('load', function () {
                    if (options.isReload) {
                        $timeout(function () {
                            window.location.href = '/mail/inbox?mbox=INBOX';
                        }, 250);
                    }
                });
            }, 250);

            if (!options.isReload) {
                $state.go('mail.inbox', {mbox: 'INBOX'});
            }
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
(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('config', config);

    config.$inject = ['CONFIG', '$timeout', '$resource', '$http', '$rootScope', '$state', 'Upload', 'localStorageService'];

    function config(CONFIG, $timeout, $resource, $http, $rootScope, $state, Upload, localStorageService) {
        var API_URL = CONFIG.APIHost + '/mailclient/config';

        var configObj = undefined;

        var resource = $resource(API_URL,
            {},
            {
                getIndex: {
                    method: 'GET',
                    url: API_URL
                }
            }
        );

        function getIndex(params, data) {
            return resource.getIndex(params, data).$promise
                .then(function (response) {
                    configObj = response.data;
                    return response;
                });
        }

        function getConfig() {
            return configObj;
        }

        return {
            getIndex: getIndex,
            getConfig: getConfig
        }
    }

})();
(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('connection', connection);

    connection.$inject = ['CONFIG', '$resource', 'Upload', '$rootScope', '$auth', '$state'];

    function connection(CONFIG, $resource, Upload, $rootScope, $auth, $state) {
        var API_URL = CONFIG.APIHost + '/connection';

        var resource = $resource(API_URL,
            {},
            {
                get: {
                    method: 'GET',
                    url: API_URL
                },
                getById: {
                    method: 'GET',
                    url: API_URL
                },
                create: {
                    method: 'POST',
                    url: API_URL
                },
                update: {
                    method: 'PUT',
                    url: API_URL + '/:id'
                },
                destroy: {
                    method: 'DELETE',
                    url: API_URL + '/:id'
                }
            }
        );

        function get(params, data) {
           return resource.get(params, data).$promise
        }

        function getById(params, data) {
            return resource.getById(params, data).$promise
        }

        function create(params, data) {
            return resource.create(params, data).$promise;
        }

        function update(params, data) {
            return resource.update(params, data).$promise;
        }

        function destroy(params, data) {
            if (confirm("Вы хотите удалить ящик?")) {
               return resource.destroy(params, data).$promise;
            }
        }

        return {
            get: get,
            getById: getById,
            create: create,
            update: update,
            destroy: destroy
        }
    }

})();
(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('contact', contact);

    contact.$inject = ['CONFIG', '$resource', '$rootScope', '$http', 'Upload', 'FileSaver'];

    function contact(CONFIG, $resource, $rootScope, $http, Upload, FileSaver) {
        var API_URL = CONFIG.APIHost + '/contact';

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
                },
                create: {
                    method: 'POST',
                    url: API_URL
                },
                update: {
                    method: 'PUT',
                    url: API_URL + '/:id',
                    params: {
                        id: '@id'
                    }
                },
                destroy: {
                    method: 'POST',
                    url: API_URL + '/delete'
                },
                getArchive: {
                    method: 'GET',
                    url: API_URL + '/archive'
                },
                restoreArchive: {
                    method: 'POST',
                    url: API_URL + '/archive/restore'
                },
                getByGroup: {
                    method: 'GET',
                    url: API_URL + '/contacts-by-group'
                },
                exportContacts: {
                    method: 'GET',
                    url: API_URL + '/export'
                },
                find: {
                    method: 'POST',
                    url: API_URL + '/find'
                }
            }
        );

        function get(params, data) {
            return resource.get(params, data).$promise;
        }

        function getById(params, data) {
            return resource.getById(params, data).$promise
                .then(function (response) {

                });
        }

        function create(params, data) {
            return resource.create(params, data).$promise
                .then(function (response) {
                    $rootScope.$broadcast('contact:create:success');
                });
        }

        function update(params, data) {
            return resource.update(params, data).$promise
                .then(function (response) {
                    $rootScope.$broadcast('contact:update:success');
                });
        }

        function destroy(params, data) {
            return resource.destroy(params, data).$promise
                .then(function (response) {
                    $rootScope.$broadcast('contact:destroy:success');
                });
        }

        function getArchive(params, data) {
            return resource.getArchive(params, data).$promise;
        }

        function restoreArchive(params, data) {
            return resource.restoreArchive(params, data).$promise
                .then(function (response) {
                    $rootScope.$broadcast('contact:sync');
                    return response;
                });
        }

        function getByGroup(params, data) {
            return resource.getByGroup(params, data).$promise;
        }

        function uploadContacts(params, data) {
            var upload = Upload.upload({
                url: API_URL + '/import',
                data: data
            });

            return upload.then(function (response) {
                $rootScope.$broadcast('contact:create:success');
                return response;
            });
        }

        function exportContacts() {
            return $http.get(API_URL + '/export').then(function (response) {
                console.log('FileSaver', response.data);
                var data = new Blob([response.data], {type: 'text/x-vcard'});
                FileSaver.saveAs(data, 'contacts.vcf');
            });
        }

        function sync() {
            $rootScope.$broadcast('contact:sync');
        }

        function find(params, data) {
            return resource.find(params, data).$promise;
        }

        return {
            get: get,
            getById: getById,
            create: create,
            update: update,
            destroy: destroy,
            getArchive: getArchive,
            restoreArchive: restoreArchive,
            getByGroup: getByGroup,
            uploadContacts: uploadContacts,
            exportContacts: exportContacts,
            sync: sync,
            find: find
        }
    }

})();
(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('country', country);

    country.$inject = ['$resource'];

    function country($resource) {
        var API_URL = '/json/countries.json';

        var resource = $resource(API_URL,
            {},
            {
                get: {
                    method: 'GET',
                    url: API_URL,
                    isArray: true
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
        .factory('googleTranslation', googleTranslation);

    googleTranslation.$inject = ['CONFIG', '$resource', '$http', '$rootScope'];

    function googleTranslation(CONFIG, $resource, $http, $rootScope) {
        var API_URL = 'https://translation.googleapis.com/language/translate/v2';

        var resource = $resource(API_URL,
            {},
            {
                get: {
                    method: 'POST',
                    url: API_URL + '/languages',
                    params: {
                        key: 'AIzaSyBS21iM34oEWnfFDeZChgMBxxchgLMSYQw'
                    }
                },
                translate: {
                    method: 'POST',
                    url: API_URL,
                    params: {
                        key: 'AIzaSyBS21iM34oEWnfFDeZChgMBxxchgLMSYQw'
                    }
                }
            }
        );

        function get(params, data) {
            return resource.get(params, data).$promise;
        }

        function translate(params, data) {
            return resource.translate(params, data).$promise;
        }

        return {
            get: get,
            translate: translate
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
        .factory('lang', lang);

    lang.$inject = ['$translate', 'config', '$http', '$timeout'];

    function lang($translate, config, $http, $timeout) {
        var list = [
            {
                lang: 'sq',
                ico: 'sq-AL',
                icon: 'sq.svg',
                caption: 'Албанский'
            },
            {
                lang: 'en',
                ico: 'en-US',
                icon: 'en.svg',
                caption: 'Английский'
            },
            {
                lang: 'bs',
                ico: 'bs-BA',
                icon: 'bs.svg',
                caption: 'Боснийский'
            },
            {
                lang: 'sr',
                ico: 'sr-RS',
                icon: 'sr.svg',
                caption: 'Сербский'
            },
            {
                lang: 'hr',
                ico: 'hr-HR',
                icon: 'hr.svg',
                caption: 'Хорватский'
            },
            {
                lang: 'cs',
                ico: 'cs-CZ',
                icon: 'cs.svg',
                caption: 'Чешский'
            },
            {
                lang: 'mk',
                ico: 'mk-MK',
                icon: 'mk.svg',
                caption: 'Македонский'
            },
            {
                lang: 'ru',
                ico: 'ru-RU',
                icon: 'ru.svg',
                caption: 'Русский'
            },
            {
                lang: 'sk',
                ico: 'sk-SK',
                icon: 'sk.svg',
                caption: 'Словацкий'
            },
            {
                lang: 'sl',
                ico: 'si-SI',
                icon: 'sl.svg',
                caption: 'Словенский'
            },
            {
                lang: 'uk',
                ico: 'uk-UA',
                icon: 'uk.svg',
                caption: 'Украинский'
            },
            {
                lang: 'ro',
                ico: 'ro-MD',
                icon: 'md.svg',
                caption: 'Молдавский'
            }
        ];

        function init() {
            if ($translate.use()) {
                $http.defaults.headers.common["Accept-Language"] = $translate.use();
            }

            $timeout(function () {
                var configObj = config.getConfig();

                if (!$translate.use()) {
                    selectLang(
                        getLangByIco(configObj.language)
                    );
                }
            }, 1250);
        }

        function selectLang(selectLang) {
            // return $timeout(function () {
            $translate.use(selectLang.lang);

            moment.locale(selectLang.lang);

            $http.defaults.headers.common["Accept-Language"] = selectLang.lang;

            return selectLang;
            // }, 250);
        }

        function getCurrentLang() {
            return _.find(list, {lang: $translate.use()});
        }

        function getList() {
            return list;
        }

        function getLangByIco(ico) {
            return _.find(list, {ico: ico});
        }

        return {
            init: init,
            selectLang: selectLang,
            getCurrentLang: getCurrentLang,
            getList: getList,
            getLangByIco: getLangByIco
        }
    }

})();
(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('list', list);

    list.$inject = [];

    function list() {

        function getMonths() {
            return moment.months();
        }

        function getDays() {
            var arr = [];
            for (var i = 1; i <= 31; i++) {
                if (i < 10) {
                    var value = '0' + i;
                    arr.push({
                        id: i,
                        name: value
                    });
                    continue;
                }
                arr.push({
                    id: i,
                    name: i
                });
            }
            return arr;
        }

        function getYears() {
            var arr = [];
            for (var i = 1935; i < 2018; i++) {
                arr.push({
                    id: i,
                    name: i
                });
            }
            return arr;
        }

        function getColors() {
            return [
                '#31c73b',
                '#7cc3c4',
                '#5a8eff',
                '#ba99ff',
                '#a8bcce',
                '#c1be00',
                '#f99000',
                '#ff8985',
                '#28a931',
                '#67a3a4',
                '#5080e7',
                '#a488e2',
                '#8e9faf',
                '#a19f00',
                '#db7f00',
                '#ff3f30',
                '#1d8925',
                '#508182',
                '#456ec8',
                '#8e75c4',
                '#73818e',
                '#807e00',
                '#bb6c00',
                '#f32300',
                '#136619',
                '#395e5f',
                '#385ca8',
                '#7760a4',
                '#57616c',
                '#5c5a00',
                '#9c5800',
                '#d51e00'
            ]
        }

        return {
            getMonths: getMonths,
            getYears: getYears,
            getDays: getDays,
            getColors: getColors
        }
    }

})();
(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('mailBox', mailBox);

    mailBox.$inject = ['CONFIG', '$resource', '$http', '$rootScope', '$state'];

    function mailBox(CONFIG, $resource, $http, $rootScope, $state) {
        var API_URL = CONFIG.APIHost + '/mail-box';

        var cacheList = [];

        var resource = $resource(API_URL,
            {},
            {
                get: {
                    method: 'GET',
                    url: API_URL
                },
                create: {
                    method: 'POST',
                    url: API_URL
                },
                update: {
                    method: 'PUT',
                    url: API_URL + '/123'
                },
                delete: {
                    method: 'DELETE',
                    url: API_URL + '/123'
                }
            }
        );

        function get(params, data) {
            return resource.get(params, data).$promise
                .then(function (response) {
                    cacheList = response.data;

                    if ($state.current.name === 'mail.inbox' || $state.current.name === 'mail.message') {
                        var folder = _.find(cacheList.items, {'name': $state.params.mbox});

                        if ($state.params.filter === 'unseen') {
                            folder = {name: 'UNREAD'};
                        }

                        if ($state.params.filter === 'attach') {
                            folder = {name: 'SEARCH_IS_ATTACH'};
                        }

                        if ($state.params.filter === 'flagged') {
                            folder = {name: 'IMPORTANT'};
                        }

                        $rootScope.folder = folder;
                    }

                    return response;
                });
        }

        function create(params, data) {
            return resource.create(params, data).$promise
                .then(function (response) {
                    $rootScope.$broadcast('mailBox:create:success');
                });
        }

        function update(params, data) {
            return resource.update(params, data).$promise
                .then(function (response) {
                    $rootScope.$broadcast('mailBox:update:success');
                });
        }

        function destroy(params, data) {
            return $http({
                url: API_URL + '/123',
                method: 'DELETE',
                data: data,
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                }
            }).then(function (response) {
                $rootScope.$broadcast('mailBox:destroy:success');
            });
            // return resource.destroy(params, data).$promise;
        }

        function openLayoutFolder(data) {
            $rootScope.$broadcast('mailBox:layout:open', data);
        }

        function getCacheList() {
            return cacheList;
        }

        return {
            get: get,
            create: create,
            update: update,
            destroy: destroy,
            openLayoutFolder: openLayoutFolder,
            getCacheList: getCacheList
        }
    }

})();
(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('mail', mail);

    mail.$inject = ['CONFIG', '$resource', '$http', '$rootScope', 'Upload', '$state', 'wb'];

    function mail(CONFIG, $resource, $http, $rootScope, Upload, $state, mb) {
        var API_URL = CONFIG.APIHost + '/mail';

        var answerData = {};

        var fwdData = {};

        var resource = $resource(API_URL,
            {},
            {
                get: {
                    method: 'GET',
                    url: API_URL
                },
                post: {
                    method: 'POST',
                    url: API_URL
                },
                put: {
                    method: 'PUT',
                    url: API_URL + '/:id',
                    params: {
                        id: '@id'
                    }
                },
                getById: {
                    method: 'GET',
                    url: API_URL + '/:id'
                },
                move: {
                    method: 'POST',
                    url: CONFIG.APIHost + '/mails/move'
                },
                destroy: {
                    method: 'DELETE',
                    url: API_URL + '/:id',
                    hasBody: true,
                    params: {
                        id: '@id'
                    }
                },
                flag: {
                    method: 'POST',
                    url: CONFIG.APIHost + '/mails/flag'
                },
                deflag: {
                    method: 'POST',
                    url: CONFIG.APIHost + '/mails/deflag'
                },
                deleteAll: {
                    method: 'POST',
                    url: CONFIG.APIHost + '/mails/delete-all'
                }
            }
        );

        function post(params, data) {
            return resource.post(params, data).$promise
                .then(function (response) {
                    console.log('params', data);
                    if (data.cmd === 'send') {
                        $rootScope.$broadcast('mail:send:success');
                    }
                    return response;
                });
        }

        function get(params, data) {
            return resource.get(params, data).$promise;
        }

        function put(params, data) {
            return resource.put(params, data).$promise;
        }

        function upload(params, data, files) {
            var formattedData = {
                id: params.id,
                mbox: params.mbox
            };

            _.forEach(files, function (file, i) {
                var name = 'file' + i;
                formattedData[name] = file;
            });

            if (params.id) {
                formattedData.id = params.id;
            }

            return Upload.upload({
                url: CONFIG.APIHost + '/mails/add-attach',
                data: formattedData
            });
        }

        function getById(params, data) {
            return resource.getById(params, data).$promise;
        }

        function move(params, data) {
            return resource.move(params, data).$promise
                .then(function (response) {
                    if (data.mboxnew === 'Junk') {
                        _.forEach(response.data, function (message) {
                            if (message.mbox !== 'Junk') {
                                wb.post({}, {
                                    email: message.fromAddress,
                                    list: 'B'
                                });
                                console.log('message', message);
                            }
                        });
                    }

                    if (data.mbox !== 'Junk') {
                        _.forEach(response.data, function (message) {
                            if (message.mbox === 'Junk') {
                                wb.destroy({}, {
                                    email: message.fromAddress,
                                    list: 'B'
                                });
                                console.log('message', message);
                            }
                        });
                    }

                    return response;
                });
        }

        function moveToFolder(folder, data) {
            var messages = angular.copy(data);

            if (messages.isLoading || !messages.checked.length) return;

            // console.log('folder', folder.caption);

            // $rootScope.$broadcast('notify:message', {
            //     message: (messages.checked.length > 1 ? 'Письма' : 'Письмо') + ' ' + (messages.checked.length > 1 ? 'перемещены' : 'перемещено') + ' в папку <strong>' + folder.caption + '</strong>'
            // });

            $rootScope.$broadcast('notify:message', {
                message: (messages.checked.length > 1 ? 'LETTERS_MOVED_TO_A_FOLDER' : 'LETTER_MOVED_TO_A_FOLDER'),
                folder: folder
            });

            move({}, {
                messages: filterMessage(messages.checked),
                mboxnew: folder.name
            }).then(function () {
                $rootScope.$broadcast('mailBox:sync');

                if ($state.current.name !== 'mail.inbox') {
                    $state.go('mail.inbox', {mbox: 'INBOX'});
                }
            });

            _.forEach(messages.checked, function (checked) {
                _.remove(messages.items, function (message) {
                    return message.number === checked.number;
                });
            });

            messages.checked = [];

            return messages;
        }

        function flag(params, data) {
            return resource.flag(params, data).$promise;
        }

        function deflag(params, data) {
            return resource.deflag(params, data).$promise;
        }

        function destroy(data) {
            var messages = angular.copy(data);

            if (messages.isLoading || !messages.checked.length) return;

            $http({
                url: API_URL + '/' + 1,
                method: 'DELETE',
                data: {
                    messages: filterMessage(messages.checked),
                },
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                }
            });

            messages.checked = [];

            return messages;
        }

        function setSeen(data) {
            var messages = angular.copy(data);

            if (messages.isLoading || !messages.checked.length) return;

            messages.isLoading = true;

            flag({}, {
                messages: filterMessage(messages.checked),
                flag: 'Seen'
            }).then(function (response) {
                messages.isLoading = false;
                $rootScope.$broadcast('mailBox:sync');
            });

            _.forEach(messages.checked, function (checked) {
                _.forEach(messages.items, function (item) {
                    if (checked.number == item.number) {
                        item.seen = true;
                    }
                });
            });

            messages.checked = [];

            return messages;
        }

        function setUnSeen(data) {
            var messages = angular.copy(data);

            if (messages.isLoading || !messages.checked.length) return;

            messages.isLoading = true;

            deflag({}, {
                messages: filterMessage(messages.checked),
                flag: 'Seen'
            }).then(function (response) {
                messages.isLoading = false;
                $rootScope.$broadcast('mailBox:sync');
            });

            _.forEach(messages.checked, function (checked) {
                _.forEach(messages.items, function (item) {
                    if (checked.number == item.number) {
                        item.seen = false;
                    }
                });
            });

            messages.checked = [];

            return messages;
        }

        function setImportant(data) {
            var messages = angular.copy(data);

            if (messages.isLoading || !messages.checked.length) return;

            messages.isLoading = true;

            flag({}, {
                messages: filterMessage(messages.checked),
                flag: 'Flagged'
            }).then(function (response) {
                messages.isLoading = false;
            });

            messages.checked = [];

            _.forEach(messages.items, function (item) {
                _.forEach(data.checked, function (checked) {
                    if (item.number === checked.number) {
                        item.important = true;
                        messages.checked.push(item);
                    }
                });
            });

            return messages;
        }

        function setUnImportant(data) {
            var messages = angular.copy(data);

            if (messages.isLoading || !messages.checked.length) return;

            messages.isLoading = true;

            deflag({}, {
                messages: filterMessage(messages.checked),
                flag: 'Flagged'
            }).then(function (response) {
                messages.isLoading = false;
            });

            messages.checked = [];

            _.forEach(messages.items, function (item) {
                _.forEach(data.checked, function (checked) {
                    if (item.number === checked.number) {
                        item.important = false;
                        messages.checked.push(item);
                    }
                });
            });

            return messages;
        }

        function setAnswerData(data) {
            answerData = data;
        }

        function getAnswerData() {
            return answerData;
        }

        function setFwdData(data) {
            fwdData = data;
        }

        function getFwdData() {
            return fwdData;
        }

        function deleteAll(params, data) {
            return resource.deleteAll(params, data).$promise;
        }

        function setPaginate(data) {
            $rootScope.$broadcast('mail.paginate', {
                paginate: data
            });
        }

        function filterMessage(messages) {
            var data = [];
            _.forEach(messages, function (item) {
                data.push({
                    number: item.number,
                    connection_id: item.connection_id,
                    mbox: item.mbox
                })
            });
            return data;
        }

        function destroyOne(data, isSync) {
            var message = angular.copy(data);

            if (message.isLoading) return;

            $http({
                url: API_URL + '/' + 1,
                method: 'DELETE',
                data: {
                    messages: [message]
                },
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                }
            }).then(function () {
                $rootScope.$broadcast('mail:sync');
            });

            message = {};

            return message;
        }

        return {
            get: get,
            post: post,
            put: put,
            getById: getById,
            move: move,
            destroy: destroy,
            flag: flag,
            deflag: deflag,
            setSeen: setSeen,
            setUnSeen: setUnSeen,
            setImportant: setImportant,
            setUnImportant: setUnImportant,
            moveToFolder: moveToFolder,
            getAnswerData: getAnswerData,
            setAnswerData: setAnswerData,
            upload: upload,
            setFwdData: setFwdData,
            getFwdData: getFwdData,
            deleteAll: deleteAll,
            setPaginate: setPaginate,
            destroyOne: destroyOne
        }
    }
})();
(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('profile', profile);

    profile.$inject = ['CONFIG', '$resource', 'Upload', '$rootScope', '$auth', '$state', 'localStorageService'];

    function profile(CONFIG, $resource, Upload, $rootScope, $auth, $state, localStorageService) {
        var API_URL = CONFIG.APIHost + '/profile';

        var resource = $resource(API_URL,
            {},
            {
                get: {
                    method: 'GET',
                    url: API_URL
                },
                post: {
                    method: 'POST',
                    url: API_URL
                },
                put: {
                    method: 'PUT',
                    url: API_URL
                },
                destroy: {
                    method: 'DELETE',
                    url: API_URL
                },
                changePassword: {
                    method: 'POST',
                    url: API_URL + '/reset-password'
                }
            }
        );

        var profile = {};

        function post(params, data) {
            profile = resource.post(params, data).$promise
                .then(function (response) {
                    $rootScope.user.profile = getFormatted(response.data);
                });

            return profile;
        }

        function get(params, data) {
            profile = resource.get(params, data).$promise
                .then(function (response) {
                    $rootScope.user.profile = getFormatted(response.data);
                });

            return profile;
        }

        function getFormatted(data) {
            // data.photo = CONFIG.MediaUrl + data.photo;

            if (data.birthday) {
                var date = moment(data.birthday);
                data.bMonth = moment.months()[date.month()];
                data.bDay = date.day() + 1;
                data.bYear = date.year();
            }

            return data;
        }

        function put(params, data) {
            profile = resource.put(params, data).$promise
                .then(function (response) {
                    $rootScope.user.profile = getFormatted(response.data);
                });

            return profile;
        }

        function destroy(params, data) {
            if (confirm("Вы хотите удалить аккаунт?")) {
                resource.destroy(params, data).$promise
                    .then(function (response) {
                        $auth.signOut().then(function () {
                            $state.go('signIn');
                        });
                    });
            }
        }

        function uploadAvatar(data) {
            profile = Upload.upload({
                url: API_URL + '/upload-avatar',
                data: data
            }).then(function () {
                get();
            });

            return profile;
        }

        function getCurrent() {
            return profile;
        }

        function changePassword(params, data) {
            return resource.changePassword(params, data).$promise;
        }

        function getStorageProfiles() {
            return localStorageService.get('profiles');
        }

        function addStorageProfile(user) {
            var profiles = getStorageProfiles();

            if (!profiles || !profiles.length) {
                profiles = [];
            }

            _.remove(profiles, function (item) {
                return item.profile.email === user.profile.email;
            });

            profiles.push(user);

            localStorageService.set('profiles', profiles);

            console.log('profiles', user, profiles);
        }

        function destroyStorageProfile(user) {
            var profiles = getStorageProfiles();

            _.remove(profiles, function (item) {
                return user.profile.email === item.profile.email;
            });

            localStorageService.set('profiles', profiles);
        }

        return {
            get: get,
            post: post,
            put: put,
            uploadAvatar: uploadAvatar,
            getCurrent: getCurrent,
            destroy: destroy,
            changePassword: changePassword,
            getStorageProfiles: getStorageProfiles,
            addStorageProfile: addStorageProfile,
            destroyStorageProfile: destroyStorageProfile
        }
    }

})();
(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('sieve', sieve);

    sieve.$inject = ['CONFIG', '$resource', '$http'];

    function sieve(CONFIG, $resource, $http) {
        var API_URL = CONFIG.APIHost + '/sieve';

        var resource = $resource(API_URL,
            {},
            {
                get: {
                    method: 'GET',
                    url: API_URL
                },
                post: {
                    method: 'POST',
                    url: API_URL
                },
                put: {
                    method: 'PUT',
                    url: API_URL + '/:id',
                    params: {
                        id: '@id'
                    }
                },
                getById: {
                    method: 'GET',
                    url: API_URL + '/:id'
                },
                destroy: {
                    method: 'DELETE',
                    url: API_URL + '/:id',
                    hasBody: true,
                    params: {
                        id: '@id'
                    }
                }
            }
        );

        function post(params, data) {
            return resource.post(params, data).$promise;
        }

        function get(params, data) {
            return resource.get(params, data).$promise;
        }

        function put(params, data) {
            return resource.put(params, data).$promise;
        }

        function getById(params, data) {
            return resource.getById(params, data).$promise;
        }

        function destroy(params, data) {
            if (confirm('Удалить правило?')) {
                return resource.destroy(params).$promise;
            }
        }

        return {
            get: get,
            post: post,
            put: put,
            getById: getById,
            destroy: destroy
        }
    }

})();
(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('sign', sign);

    sign.$inject = ['CONFIG', '$resource', '$http', '$translate'];

    function sign(CONFIG, $resource, $http, $translate) {
        var API_URL = CONFIG.APIHost + '/sign';

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
                },
                post: {
                    method: 'POST',
                    url: API_URL
                },
                put: {
                    method: 'PUT',
                    url: API_URL + '/:id',
                    params: {
                        id: '@id'
                    }
                },
                destroy: {
                    method: 'DELETE',
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

        function post(params, data) {
            return resource.post(params, data).$promise;
        }

        function put(params, data) {
            return resource.put(params, data).$promise;
        }

        function destroy(params, data) {
            return $translate('DELETE_CAPTION').then(function (translation) {
                if (confirm(translation)) {
                    return resource.destroy(params).$promise;
                }
            });
        }

        return {
            get: get,
            getById: getById,
            post: post,
            put: put,
            destroy: destroy
        }
    }

})();
(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('tag', tag);

    tag.$inject = ['CONFIG', '$resource', '$http', '$rootScope', '$auth'];

    function tag(CONFIG, $resource, $http, $rootScope, $auth) {
        var API_URL = CONFIG.APIHost + '/tag';

        var resource = $resource(API_URL,
            {},
            {
                get: {
                    method: 'GET',
                    url: API_URL
                },
                create: {
                    method: 'POST',
                    url: API_URL
                },
                update: {
                    method: 'PUT',
                    url: API_URL + '/:id',
                    params: {
                        'id': '@id'
                    }
                },
                destroy: {
                    method: 'DELETE',
                    url: API_URL + '/:id'
                },
                getTagsByMessage: {
                    method: 'POST',
                    url: CONFIG.APIHost + '/tagged-message/get-tags-by-message'
                },
                addTagToMessages: {
                    method: 'POST',
                    url: CONFIG.APIHost + '/tagged-message/add-tag-to-messages'
                },
                deleteTagFromMessages: {
                    method: 'POST',
                    url: CONFIG.APIHost + '/tagged-message/delete-tag-from-messages'
                }
            }
        );

        function get(params, data) {
            return resource.get(params, data).$promise;
        }

        function create(params, data) {
            return resource.create(params, data).$promise
                .then(function (response) {
                    $rootScope.$broadcast('tag:create:success');
                    return response;
                });
        }

        function update(params, data) {
            return resource.update(params, data).$promise
                .then(function () {
                    $rootScope.$broadcast('tag:update:success');
                });
        }

        function destroy(params, data) {
            return resource.destroy(params, data).$promise;
        }

        function getTagsByMessage(params, data) {
            return resource.getTagsByMessage(params, data).$promise;
        }

        function addTagToMessages(params, data) {
            return resource.addTagToMessages(params, data).$promise
                .then(function (response) {
                    $rootScope.$broadcast('tag:message:add:success');
                    return response;
                });
        }

        function deleteTagFromMessages(params, data) {
            return resource.deleteTagFromMessages(params, data).$promise
                .then(function (response) {
                    $rootScope.$broadcast('tag:message:delete:success');
                    return response;
                });
        }

        function setTag(item, data, sync) {
            var messages = angular.copy(data);

            _.forEach(messages.checked, function (messageChecked) {
                var isset = false;

                if (messageChecked.tags.length) {
                    _.forEach(messageChecked.tags, function (tag) {
                        if (item.id === tag.id) {
                            isset = true;
                        }
                    });
                }

                if (!isset) {
                    _.forEach(messages.items, function (message) {
                        if (messageChecked.number === message.number) {
                            message.tags.push(item);
                        }
                    });
                }

            });

            var response = addTagToMessages({}, {
                messages: messages.checked,
                tag_id: item.id
            });

            if (sync) {
                return response;
            }

            messages.checked = [];

            _.forEach(messages.items, function (item) {
                _.forEach(data.checked, function (checked) {
                    if (item.number === checked.number) {
                        messages.checked.push(item);
                    }
                });
            });

            return messages;
        }

        function setUnTag(item, data) {
            var messages = angular.copy(data);

            _.forEach(messages.checked, function (messageChecked) {
                _.forEach(messages.items, function (message) {
                    if (messageChecked.number === message.number) {
                        _.remove(message.tags, function (o) {
                            return item.id === o.id;
                        });
                    }
                });
            });

            deleteTagFromMessages({}, {
                messages: messages.checked,
                tag_id: item.id
            });

            messages.checked = [];

            _.forEach(messages.items, function (item) {
                _.forEach(data.checked, function (checked) {
                    if (item.number === checked.number) {
                        messages.checked.push(item);
                    }
                });
            });

            return messages;
        }

        return {
            get: get,
            create: create,
            update: update,
            destroy: destroy,
            getTagsByMessage: getTagsByMessage,
            addTagToMessages: addTagToMessages,
            deleteTagFromMessages: deleteTagFromMessages,
            setTag: setTag,
            setUnTag: setUnTag
        }
    }

})();
(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('timezone', timezone);

    timezone.$inject = ['CONFIG', '$resource', '$http', '$auth', '$rootScope'];

    function timezone(CONFIG, $resource, $http, $auth, $rootScope) {

        var timezoneList = null;

        $rootScope.$on('auth:validation-success', function () {
            moment.tz.setDefault($auth.user.profile.timezone);
        });

        $rootScope.$on('auth:login-success', function () {
            moment.tz.setDefault($auth.user.profile.timezone);
        });

        function get(params, data) {
            return $http.get('/json/timezone.json', data).then(function (response) {
                timezoneList = response.data;
                return response.data;
            });
        }

        function getTimezoneList() {
            return timezoneList;
        }

        function getCurrent() {
            var e = _.find(timezoneList, function(o) {
                return _.some(o.utc, function(utc) {
                    return utc === $auth.user.profile.timezone;
                });
            });
            return  e.text;
        }

        return {
            get: get,
            getCurrent: getCurrent,
            getTimezoneList: getTimezoneList
        }
    }

})();
(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('wb', wb);

    wb.$inject = ['CONFIG', '$resource', '$http'];

    function wb(CONFIG, $resource, $http) {
        var API_URL = CONFIG.APIHost + '/wb';

        var resource = $resource(API_URL,
            {},
            {
                get: {
                    method: 'GET',
                    url: API_URL
                },
                post: {
                    method: 'POST',
                    url: API_URL
                },
                destroy: {
                    method: 'POST',
                    url: API_URL + '/delete'
                }
            }
        );

        function get(params, data) {
            return resource.get(params, data).$promise;
        }

        function post(params, data) {
            return resource.post(params, data).$promise;
        }

        function destroy(params, data) {
            return resource.destroy(params, data).$promise;
        }

        return {
            get: get,
            post: post,
            destroy: destroy
        }
    }

})();
(function () {
    'use strict';

    angular
        .module('mail')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['$rootScope'];
    /* @ngInject */
    function SettingsController($rootScope) {
        var vm = this;

        vm.closeSettingsMenu = closeSettingsMenu;

        activate();

        function activate() {
        }

        function closeSettingsMenu() {
            $rootScope.isOpenSettingsMenu = false;
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
                    controller: 'SettingsController',
                    controllerAs: 'vm',
                    resolve: {
                        auth: function ($auth, $state) {
                            return $auth.validateUser().catch(function () {
                                $state.go('signIn');
                            });
                        },
                        configResolve: function (config) {
                            return config.getIndex();
                        }
                        // user: function (profile) {
                        //     return profile.get();
                        // }
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

    PasswordResetController.$inject = ['$state', 'authService', 'CONFIG'];
    /* @ngInject */
    function PasswordResetController($state, authService, CONFIG) {
        var vm = this;

        vm.userForm = {
            isLoading: false,
            model: {},
            validations: {
                username: {
                    'required': 'ENTER_EMAIL_OR_LOGIN'
                }
            }
        };

        vm.CONFIG = CONFIG;

        vm.preRequestPasswordReset = preRequestPasswordReset;

        function preRequestPasswordReset(form) {
            if (form.$invalid) return;

            var data = vm.userForm.model;

            if (data.username.split('@').length) {
                data.username = data.username.split('@')[0];
            }

            vm.userForm.isLoading = true;
            authService.preRequestPasswordReset({}, data)
                .then(function (response) {
                    vm.userForm.isLoading = false;
                    $state.go('passwordUpdate', {
                        username: vm.userForm.model.username
                    });
                }, function (response) {
                    vm.userForm.errors = response.data.data;
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
                    title: 'Войти',
                    resolve: {
                        configResolve: function (config) {
                            return config.getIndex();
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
        .module('auth.passwordUpdate')
        .controller('PasswordUpdateController', PasswordUpdateController);

    PasswordUpdateController.$inject = ['$state', '$auth', 'CONFIG'];
    /* @ngInject */
    function PasswordUpdateController($state, $auth, CONFIG) {
        var vm = this;

        vm.step = 1;

        vm.passwordResetForm = {
            isLoading: false,
            model: {},
            validations: {
                // mail_or_phone: {
                //     'required': 'Введите Телефон или e-mail:(нужен_перевод)'
                // }
            }
        };

        vm.userForm = {
            isLoading: false,
            model: {},
            validations: {
                code: {
                    'required': 'INPUT_PLACEHOLDER_ENTER_SMS_CODE'
                },
                newpassword: {
                    'required': 'INPUT_PLACEHOLDER_ENTER_NEW_PASSWORD'
                },
                passwordConf: {
                    'required': 'INPUT_PLACEHOLDER_CONFIRM_NEW_PASSWORD'
                }
            }
        };

        vm.requestPasswordReset = requestPasswordReset;
        vm.resetPassword = resetPassword;
        vm.isEmail = isEmail;

        ////

        activate();

        function activate() {
            vm.CONFIG = CONFIG;
            vm.username = $state.params.username;
        }

        function requestPasswordReset(form) {
            // if (form.$invalid) return;

            vm.passwordResetForm.model.username = vm.username;

            vm.userForm.isLoading = true;
            $auth.requestPasswordReset(vm.passwordResetForm.model)
                .then(function (response) {
                    vm.userForm.isLoading = false;

                    vm.step = 2;
                })
                .catch(function (response) {
                    vm.passwordResetForm.errors = response.data.data;
                });
        }

        function resetPassword() {
            if (userForm.$invalid) return;
            vm.userForm.model.username = $state.params.username;
            console.log(vm.userForm);
            vm.userForm.isLoading = true;
            $auth.updatePassword(vm.userForm.model)
                .then(function (response) {
                    vm.userForm.isLoading = false;
                    $state.go('signIn');
                })
                .catch(function (response) {
                    vm.userForm.errors = response.data.data;
                    vm.error = response.data.data;
                });
        }

        function isEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
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
                    url: '/password-update?username&code',
                    templateUrl: 'app/auth/password-update/password-update.html',
                    controller: 'PasswordUpdateController',
                    controllerAs: 'vm',
                    title: 'Войти',
                    resolve: {
                        configResolve: function (config) {
                            return config.getIndex();
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
        .module('auth.signUp')
        .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['$state', '$auth', '$timeout', 'authService', 'profile', 'CONFIG'];
    /* @ngInject */
    function SignUpController($state, $auth, $timeout, authService, profile, CONFIG) {
        var vm = this;

        vm.CONFIG = CONFIG;

        vm.isAdditionalEmail = true;

        vm.userForm = {
            isLoading: false,
            model: {
                phone: '420'
            },
            validations: {
                phone: {},
                password: {
                    'password-verify': 'Введенные пароли не совпадают'
                },
                passwordConf: {
                    'password-verify': 'Введенные пароли не совпадают'
                }
            }
        };

        vm.codeForm = {
            model: {}
        };

        vm.signUp = signUp;
        vm.sendCode = sendCode;
        vm.checkUserName = checkUserName;

        activate();

        function activate() {
            $timeout(function () {
                vm.userForm.model.phone = 420;
            }, 1250);
        }

        function signUp() {
            var data = angular.copy(vm.userForm.model);

            if (vm.userForm.model.phone) {
                data.phone = vm.userForm.model.phone.toString().replace(/\s{2,}/g, ' ');
            }

            if (vm.isAdditionalEmail) {
                data.phone = undefined;
                data.code = undefined;
            }

            if (!vm.isAdditionalEmail) {
                data.email = undefined;
            }

            vm.userForm.isLoading = true;

            $auth.submitRegistration(data)
                .then(function (response) {
                    vm.userForm.isLoading = false;
                    // $state.go('signIn');
                    console.log('response', response);

                    profile.addStorageProfile(response.data.data);

                    if (!response.data.data.profile.timezone) {
                        var profileModel = {};
                        profileModel.timezone = 'Europe/Belgrade';
                        profile.put({}, profileModel);
                    }

                    $auth.setAuthHeaders({
                        "Authorization": response.data.data.access_token
                    });

                    $state.go('mail.inbox', {mbox: 'INBOX'});
                })
                .catch(function (response) {
                    vm.userForm.isLoading = false;
                    vm.userForm.errors = response.data.data;
                    vm.error = response.data.data;
                });
        }

        function sendCode() {
            var phone = vm.userForm.model.phone.replace(/\s{2,}/g, ' ');
            authService.sendCode({}, {phone: phone})
                .then(function (response) {
                    vm.codeResult = response.data;
                })
                .catch(function (response) {
                    vm.userForm.errors = response.data.data;
                    console.log('error', response);
                });
        }

        function checkUserName() {
            authService.checkUserName({}, {username: vm.userForm.model.username}).then(function (response) {
                _.forEach(vm.userForm.errors, function (item, index) {
                    console.log('item', item, index);
                    if (item.field === 'username') {
                        vm.userForm.errors[0] = {};
                    }
                });
            }).catch(function (response) {
                vm.userForm.isLoading = false;
                vm.userForm.errors = _.assign(vm.userForm.errors, response.data.data);
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
                    title: 'Регистрация',
                    resolve: {
                        configResolve: function (config) {
                            return config.getIndex();
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
        .module('auth.signTemp')
        .controller('SignTempController', SignTempController);

    SignTempController.$inject = ['$scope', '$state', '$stateParams', '$auth', 'authService', 'profile', 'CONFIG'];
    /* @ngInject */
    function SignTempController($scope, $state, $stateParams, $auth, authService, profile, CONFIG) {
        var vm = this;

        vm.CONFIG = CONFIG;

        vm.user = $auth.user;

        vm.userForm = {
            isLoading: false,
            isChange: false,
            model: {}
        };

        // $scope.$watch('vm.userForm.model', function (data, oldData) {
        //     if (!_.isEqual(data, oldData)) {
        //         vm.userForm.errors = '';
        //     }
        // }, true);

        vm.socialComplete = socialComplete;

        activate();

        function activate() {
            console.log('$auth', $auth);
            vm.$state = $state;
            vm.$stateParams = $stateParams;

            if ($state.params.token) {
                $state.go('home', vm.$state.params);
                return;
            }
        }

        function socialComplete() {
            var data = {
                social_id: vm.$stateParams.social_id,
                username: vm.userForm.model.username,
                agree: vm.userForm.model.agree
            };

            vm.userForm.isLoading = true;
            authService.socialComplete({}, data).then(function (response) {
                vm.userForm.isLoading = false;

                profile.addStorageProfile(response.data);

                if (!response.data.profile.timezone) {
                    var profileModel = {};
                    profileModel.timezone = 'Europe/Belgrade';
                    profile.put({}, profileModel);
                }

                $auth.setAuthHeaders({
                    "Authorization": response.data.access_token
                });

                $state.go('mail.inbox', {mbox: 'INBOX'});

            }, function (response) {
                vm.userForm.isLoading = false;
                vm.userForm.errors = response.data.data;
            });
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('auth.signTemp')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'signTemp',
                config: {
                    url: '/sign-temp?social_id&success',
                    templateUrl: 'app/auth/sign-temp/sign-temp.html',
                    controller: 'SignTempController',
                    controllerAs: 'vm',
                    title: 'Подтверждение пользователя',
                    resolve: {
                        configResolve: function (config) {
                            return config.getIndex();
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
        .module('auth.signIn')
        .controller('SignInController', SignInController);

    SignInController.$inject = ['$scope', '$state', '$auth', '$cookies', 'profile', 'CONFIG'];
    /* @ngInject */
    function SignInController($scope, $state, $auth, $cookies, profile, CONFIG) {
        var vm = this;

        vm.CONFIG = CONFIG;

        vm.user = $auth.user;

        vm.userForm = {
            isLoading: false,
            isChange: false,
            model: {}
        };

        $scope.$watch('vm.userForm.model', function (data, oldData) {
            if (!_.isEqual(data, oldData)) {
                vm.userForm.errors = '';
            }
        }, true);

        vm.login = login;

        activate();

        function activate() {
            vm.$state = $state;

            if ($state.params.token) {
                $state.go('home', vm.$state.params);
                return;
            }
        }

        function login() {
            vm.userForm.isLoading = true;
            $auth.submitLogin(vm.userForm.model).then(function (response) {
                vm.userForm.isLoading = false;

                profile.addStorageProfile(response);

                if (!response.profile.timezone) {
                    var profileModel = {};
                    profileModel.timezone = 'Europe/Belgrade';
                    profile.put({}, profileModel);
                }

                $state.go('mail.inbox', {mbox: 'INBOX'});

            }).catch(function (response) {
                vm.userForm.isLoading = false;
                vm.userForm.errors = 'WRONG_LOGIN_OF_PASSWORD';
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
                    url: '/sign-in?token&compose',
                    templateUrl: 'app/auth/sign-in/sign-in.html',
                    controller: 'SignInController',
                    controllerAs: 'vm',
                    title: 'Войти',
                    resolve: {
                        configResolve: function (config) {
                            return config.getIndex();
                        }
                    }
                }
            },
            {
                state: 'logout',
                config: {
                    url: '/logout',
                    onEnter: function ($auth, $state) {
                        $auth.signOut();
                        $state.go('signIn');
                    }
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
        RouterHelper.$inject = ['$location', '$rootScope', '$state', '$timeout', 'logger', 'mailBox'];
        /* @ngInject */
        function RouterHelper($location, $rootScope, $state, $timeout, logger, mailBox) {
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
                        // logger.warning(msg, [toState]);
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
                        document.body.scrollTop = document.documentElement.scrollTop = 0;

                        stateCounts.changes++;
                        handlingStateChangeError = false;

                        console.log('toParams', toParams);

                        $rootScope.isOpenMenu = false;
                        $rootScope.isOpenSettingsMenu = false;

                        if (toState.name === 'mail.inbox' || toState.name === 'mail.message') {
                            if (!toParams.filter) {
                                var folder = _.find(mailBox.getCacheList().items, {'name': toParams.mbox});
                            }

                            if (toParams.filter === 'unseen') {
                                folder = {name: 'UNREAD'};
                            }

                            if (toParams.filter === 'attach') {
                                folder = {name: 'SEARCH_IS_ATTACH'};
                            }

                            if (toParams.filter === 'flagged') {
                                folder = {name: 'IMPORTANT'};
                            }

                            $rootScope.folder = folder;

                            console.log('$rootScope.folder', $rootScope.folder);
                        }
                    }
                );
            }
        }
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

    MenuMainController.$inject = ['$timeout', '$scope', '$rootScope', '$uibModal', '$auth', '$state', 'mail', 'mailBox', 'tag', 'profile', 'CONFIG'];

    /* @ngInject */
    function MenuMainController($timeout, $scope, $rootScope, $uibModal, $auth, $state, mail, mailBox, tag, profile, CONFIG) {
        var vm = this;

        vm.standartFolders = [
            {
                name: 'INBOX',
                icon: 'icon-inbox-old'
            },
            {
                name: 'Drafts',
                icon: 'icon-draft-line'
            },
            {
                name: 'Trash',
                icon: 'icon-basket'
            },
            {
                name: 'Sent',
                icon: 'icon-sent-old'
            },
            {
                name: 'Junk',
                icon: 'icon-spam'
            },
            // {
            //     name: 'Outbox',
            //     icon: 'icon-strelka'
            // },
            {
                name: 'Outbox',
                icon: 'icon-time'
            }
        ];

        vm.folders = {};

        vm.tags = {
            items: []
        };

        vm.user = $auth.user;

        vm.profiles = [];

        $scope.$on('mail:sync', function () {
            getMailBox();
        });

        $scope.$on('folders:sync', function () {
            getMailBox();
        });

        $scope.$on('mailBox:update:success', function () {
            getMailBox();
        });

        $scope.$on('mailBox:create:success', function () {
            getMailBox();
        });

        $scope.$on('mailBox:destroy:success', function () {
            getMailBox();
        });

        $scope.$on('mailBox:sync', function () {
            getMailBox();
        });

        $scope.$on('tag:update:success', function () {
            getTag();
        });

        $scope.$on('tag:create:success', function () {
            getTag();
        });

        $scope.$on('tag:destroy:success', function () {
            getTag();
        });


        vm.openFolderCreatePopup = openFolderCreatePopup;
        vm.closeMenu = closeMenu;
        vm.setAuthProfile = setAuthProfile;
        vm.clearFolder = clearFolder;
        vm.goToDesktopVersion = goToDesktopVersion;
        vm.logout = logout;


        activate();

        function activate() {
            getMailBox();
            getTag();
            getProfiles();

            vm.user = $auth.user;
            vm.CONFIG = CONFIG;
        }

        function goToDesktopVersion(target) {
            var url = window.location.origin + target; //+ '&token=' + vm.user.access_token.split(' ')[1];
            window.location.href = url;
        }

        function getMailBox() {
            mailBox.get().then(function (response) {
                vm.folders = _.assign(vm.folders, response.data);
                setIcons();
                getMailBoxFormatted();
            });
        }

        function getMailBoxFormatted() {
            _.forEach(vm.folders.items, function (folder) {
                var isSub = true;

                folder.isOpen = false;

                _.forEach(vm.standartFolders, function (standartFolder) {
                    if (folder.name == standartFolder.name) {
                        isSub = false;
                    }
                });

                if (isSub) {
                    folder.isSub = true;
                } else {
                    folder.isSub = false;
                }
            });

            sortFolder();
        }

        function sortFolder() {
            vm.folders.items = _.sortBy(vm.folders.items, 'caption').reverse();
            vm.folders.items = _.sortBy(vm.folders.items, [
                {'name': 'INBOX'},
                {'isSub': true},
                {'name': 'Sent'},
                {'name': 'Trash'},
                {'name': 'Junk'},
                {'name': 'Drafts'},
                {'name': 'Outbox'}
            ]).reverse();
        }

        function setIcons() {
            _.forEach(vm.folders.items, function (item) {
                _.forEach(vm.standartFolders, function (standartFolder) {
                    if (item.name === standartFolder.name) {
                        item.icon = standartFolder.icon;
                    }
                });
            });
        }

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

        function getTag() {
            tag.get().then(function (response) {
                vm.tags.items = response.data;
            });
        }

        function closeMenu() {
            $rootScope.isOpenMenu = false;
        }

        function getProfiles() {
            vm.profiles = profile.getStorageProfiles();
        }

        function setAuthProfile(profile) {
            $auth.user.access_token = profile.access_token;

            $timeout(function () {
                $('#iframe--auth').on('load', function () {
                    $timeout(function () {
                        window.location.href = '/mail/inbox?mbox=INBOX';
                    }, 250);
                });
            }, 250);
        }

        function clearFolder(e, folder) {
            e.stopPropagation();
            mail.deleteAll({}, {
                mbox: folder.name,
                connection_id: vm.user.profile.default_connection_id
            }).then(function () {
                $scope.$emit('mail:sync');
            });
        }

        function logout() {
            var profiles = profile.destroyStorageProfile($auth.user);

            console.log('profiles', profiles);

            if (profiles && profiles.length) {
                setAuthProfile(profiles[0]);
                return;
            }

            $auth.signOut();
            $state.go('signIn');
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('app.layout')
        .component('header', {
            bindings: {
                folder: '='
            },
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

    HeaderController.$inject = ['$rootScope', '$scope', '$state', '$timeout', 'mail'];

    /* @ngInject */
    function HeaderController($rootScope, $scope, $state, $timeout, mail) {
        var vm = this;

        vm.searchForm = {
            model: {}
        };

        vm.currentFolder = {};

        vm.notify = {};

        vm.openMenu = openMenu;
        vm.closeMenu = closeMenu;
        vm.openSettingsMenu = openSettingsMenu;
        vm.closeSettingsMenu = closeSettingsMenu;

        vm.clearSearch = clearSearch;
        vm.search = search;
        vm.send = send;
        vm.closeCompose = closeCompose;

        $scope.$watch('vm.$state.params.mbox', function () {
            getCurrentFolder();
        });

        $scope.$on('notify:message', function (e, data) {
            console.log('data', data);
            vm.notify.isOpen = true;

            vm.message = data.message;
            vm.folderMessage = data.folder;

            $timeout(function () {
                vm.notify.isOpen = false;
            }, 800);
        });

        $scope.$on('mail:isSend', function (e, data) {
            console.log('mail:isSend', data);
            vm.isSend = data.isSend;
        });

        $scope.$on('mail:isUploading', function (e, data) {
            console.log('mail:isUploading', data);
            vm.isUploading = data.isUploading;
        });

        $scope.$on('mail.paginate', function (e, data) {
            vm.paginate = data.paginate;
        });

        $scope.$watch('vm.searchForm.model.search', function (data, oldData) {
            if (data === '') {
                clearSearch();
            }
        });

        ////

        activate();

        function activate() {
            vm.$state = $state;
            vm.paginate = mail.paginate;

            console.log('vm.$state', vm.$state);

            getCurrentFolder();
        }

        function openMenu() {
            $rootScope.isOpenMenu = !$rootScope.isOpenMenu;
        }

        function closeMenu() {
            $rootScope.isOpenMenu = !$rootScope.isOpenMenu;
        }

        function openSettingsMenu() {
            $rootScope.isOpenSettingsMenu = !$rootScope.isOpenSettingsMenu;
        }

        function closeSettingsMenu() {
            $rootScope.isOpenSettingsMenu = !$rootScope.isOpenSettingsMenu;
        }

        function getCurrentFolder() {
            if (vm.folder) {
                _.forEach(vm.folder.data.items, function (folder) {
                    if (folder.name === vm.$state.params.mbox) {
                        vm.currentFolder = folder;
                        console.log('vm.currentFolder', vm.currentFolder);
                    }
                });
            }
        }

        function search() {
            var data = {};

            if (vm.searchForm.model.search) {
                data.search = vm.searchForm.model.search;
            }

            $rootScope.$broadcast('search:mailQuery', {
                search: data
            });
        }

        function clearSearch() {
            vm.searchForm.model.search = '';
            $rootScope.$broadcast('search:close');
        }

        function send() {
            $rootScope.$broadcast('mail:send');
        }

        function closeCompose() {
            $rootScope.$broadcast('mail:compose:close');
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

    MenuSettingsController.$inject = ['$uibModal', '$auth', '$timeout', 'lang', '$rootScope', 'timezone', 'CONFIG'];

    /* @ngInject */
    function MenuSettingsController($uibModal, $auth, $timeout, lang, $rootScope, timezone, CONFIG) {
        var vm = this;

        vm.getTimezoneName = getTimezoneName;
        vm.openPasswordChangePopup = openPasswordChangePopup;

        vm.closeSettingsMenu = closeSettingsMenu;

        $rootScope.$on('$translateLoadingSuccess', function (e, data) {
            $timeout(function () {
                vm.useLang = lang.getCurrentLang();
            });
        });

        activate();

        ////

        function activate() {
            vm.user = $auth.user;
            vm.profile = $auth.user.profile;

            vm.useLang = lang.getCurrentLang();
            vm.CONFIG = CONFIG;
        }

        function closeSettingsMenu() {
            $rootScope.isOpenSettingsMenu = false;
        }

        function openPasswordChangePopup() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/components/password-change/password-change-popup.html',
                controller: ["$scope", "$uibModalInstance", function ($scope, $uibModalInstance) {
                    $scope.cancel = cancel;

                    function cancel() {
                        $uibModalInstance.dismiss('cancel');
                    }
                }],
                size: 'sm',
                windowClass: 'popup popup--password-change'
            });
        }

        function getTimezoneName() {
            return timezone.getCurrent();
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('marketing.home')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$auth', '$state', '$stateParams', 'profile'];
    /* @ngInject */
    function HomeController($auth, $state, $stateParams, profile) {
        var vm = this;

        activate();

        ////

        function activate() {
            var params = {};

            if ($stateParams.compose) {
                params.compose = $state.params.compose
            }

            if ($stateParams.page) {
                $state.go($stateParams.page, params);
                return;
            }

            if ($stateParams.token) {
                $auth.setAuthHeaders({
                    "Authorization": 'Bearer ' + $stateParams.token
                });

                $auth.validateUser().then(function (response) {
                    profile.addStorageProfile(response);
                });

                $state.go('mail.inbox', {mbox: 'INBOX'});

                return;
            }

            params.mbox = 'INBOX';

            $state.go('mail.inbox', params);
        }
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
                    url: '/?version&token&page&compose&success',
                    controller: 'HomeController',
                    controllerAs: 'vm'
                }
            }
        ];
    }
})();
(function () {
    'use strict';

    angular
        .module('app.components')
        .component('attachItem', {
            bindings: {
                attach: '=',
                message: '='
            },
            templateUrl: 'app/components/attach-item/attach-item.html',
            controller: 'AttachItemController',
            controllerAs: 'vm'
        });
})();
(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('AttachItemController', AttachItemController);

    AttachItemController.$inject = ['$auth', 'CONFIG'];
    /* @ngInject */
    function AttachItemController($auth, CONFIG) {
        var vm = this;

        vm.assocFormats = [
            {
                id: 1,
                name: 'doc'
            },
            {
                id: 2,
                name: 'xlsx'
            },
            {
                id: 3,
                name: 'eml'
            }
        ];

        vm.formats = [
            {name: 'accdb'},
            {name: 'avi'},
            {name: 'bat'},
            {name: 'bmp'},
            {name: 'CDA'},
            {name: 'chm'},
            {name: 'css'},
            {name: 'djvu'},
            {
                name: 'doc',
                assocId: 1
            },
            {
                name: 'docx',
                assocId: 1
            },
            {
                name: 'msword',
                assocId: 1
            },
            {
                name: 'vnd.openxmlformats-officedocument.wordprocessingml.document',
                assocId: 1
            },
            {name: 'eps'},
            {name: 'exe'},
            {name: 'fb2'},
            {name: 'gif'},
            {name: 'hlp'},
            {name: 'htm'},
            {name: 'html'},
            {name: 'jpeg'},
            {name: 'jpg'},
            {name: 'mdb'},
            {name: 'mdv'},
            {name: 'mov'},
            {name: 'mp3'},
            {name: 'mpeg'},
            {name: 'mpg'},
            {name: 'odp'},
            {name: 'ods'},
            {name: 'odt'},
            {name: 'other'},
            {name: 'pdf'},
            {name: 'png'},
            {name: 'ppt'},
            {name: 'pptx'},
            {name: 'rar'},
            {name: 'rtf'},
            {name: 'svg+xml'},
            {name: 'tiff'},
            {name: 'ttf'},
            {name: 'txt'},
            {name: 'wav'},
            {name: 'wma'},
            {name: 'xls'},
            {name: 'xlsx'},
            {name: 'vnd.openxmlformats-officedocument.spreadsheetml.sheet', assocId: 2},
            {name: 'zip'},
            {name: 'eml'},
            {name: 'rfc822', assocId: 3}
        ];

        vm.fileFormat = null;

        vm.viewAppUrl = 'https://view.officeapps.live.com/op/view.aspx?src=';

        vm.openAttach = openAttach;

        activate();

        ////

        function activate() {
            vm.user = $auth.user;
            vm.CONFIG = CONFIG;

            findFormat();
        }

        function findFormat() {
            var result = _.find(vm.formats, function (item) {
                return item.name === vm.attach.mime.split('/')[1];
            });

            if (result) {
                if (result.assocId) {
                    vm.fileFormat = _.result(_.find(vm.assocFormats, {id: result.assocId}), 'name');
                    console.log('vm.fileFormat', vm.fileFormat);
                    return;
                }
                vm.fileFormat = result.name;
                return;
            }

            return vm.fileFormat = 'other';
        }

        function openAttach() {
            vm.url = vm.CONFIG.AttachUrl + vm.message.number + '?mbox=' + vm.message.mbox + '&part=attach&filename=' + vm.attach.fileName + '&token=' + vm.user.access_token + '&connection_id=' + vm.message.connection_id;

            if (vm.attach.mime === 'application/pdf') {
                window.open(vm.url + '&screen=true', '_blank');
                return;
            }

            if (vm.attach.mime !== 'image/png' && vm.attach.mime !== 'image/jpeg') {
                // var url = vm.CONFIG.AttachUrl + vm.message.number + '?mbox=' + vm.message.mbox + '&part=attach&filename=' + vm.attach.fileName + '&token=' + vm.user.access_token + '&connection_id=' + vm.message.connection_id;
                window.open(vm.viewAppUrl + encodeURIComponent(url), '_blank');
                return;
            }

            if (vm.attach.mime === 'image/png' || vm.attach.mime === 'image/jpeg') {
                // var url = vm.CONFIG.AttachUrl + vm.message.number + '?mbox=' + vm.message.mbox + '&part=attach&filename=' + vm.attach.fileName + '&token=' + vm.user.access_token + '&connection_id=' + vm.message.connection_id;
                window.open(url, '_blank');
            }
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('app.components')
        .component('attachUpload', {
            bindings: {
                attachmentsData: '=',
                message: '=',
                isUploading: '='
            },
            templateUrl: 'app/components/attach-upload/attach-upload.html',
            controller: 'AttachUploadController',
            controllerAs: 'vm'
        });
})();
(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('AttachUploadController', AttachUploadController);

    AttachUploadController.$inject = ['$auth', '$state', 'CONFIG'];
    /* @ngInject */
    function AttachUploadController($auth, $state, CONFIG) {
        var vm = this;

        vm.getLink = getLink;
        vm.remove = remove;

        activate();

        function activate() {
            vm.user = $auth.user;
            vm.$state = $state;
        }

        function getLink(attachment) {
            var link = [
                CONFIG.AttachUrl,
                vm.message.model.number,
                "?mbox=",
                vm.message.model.mbox || 'Drafts',
                "&part=attach&filename=",
                attachment.fileName,
                "&token=",
                vm.user.access_token,
                "&connection_id=",
                vm.message.model.connection_id
            ].join("");

            console.log('link', link);

            return link;
        }

        function remove(attachment) {
            _.remove(vm.attachmentsData, function (item) {
                return item === attachment;
            });
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('app.components')
        .component('avatarName', {
            bindings: {
                name: '=?',
                email: '=?'
            },
            templateUrl: 'app/components/avatar-name/avatar-name.html',
            controller: 'AvatarNameController',
            controllerAs: 'vm'
        });
})();
(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('AvatarNameController', AvatarNameController);

    AvatarNameController.$inject = ['$scope'];
    /* @ngInject */
    function AvatarNameController($scope) {
        var vm = this;

        vm.title = "AvatarNameController";

        $scope.$watch('vm.name', function (data) {
            if (data) {
                getNames();
            }
        });

        $scope.$watch('vm.email', function (data) {
            if (data) {
                getNames();
            }
        });

        activate();

        function activate() {
        }

        function getNames() {
            if (vm.name) {
                var name = vm.name.replace(/[^A-Za-zА-Яа-яЁё0-9]/g, "");
                var firstLetter = name.split(' ')[0].slice(0, 1);
                vm.firstLetter = firstLetter.replace(/ /g, '').replace(/[^A-Za-zА-Яа-яЁё0-9]/g, "");
                if (vm.name.split(' ')[1]) {
                    var lastLetter = vm.name.split(' ')[1].slice(0, 1);
                    vm.lastLetter = lastLetter.replace(/ /g, '').replace(/[^A-Za-zА-Яа-яЁё0-9]/g, "");
                }
                return;
            }
            vm.emailLetter = vm.email.slice(0, 1);
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('app.components')
        .component('avatarUpload', {
            bindings: {
                onClose: '&'
            },
            templateUrl: 'app/components/avatar-upload/avatar-upload.html',
            controller: 'AvatarUploadController',
            controllerAs: 'vm'
        });
})();
(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('AvatarUploadController', AvatarUploadController);

    AvatarUploadController.$inject = ['$timeout', 'Upload', 'profile', 'profile'];
    /* @ngInject */
    function AvatarUploadController($timeout, Upload, profile) {
        var vm = this;

        vm.avatar = {
            croppedDataUrl: ''
        };

        vm.close = close;
        vm.upload = upload;

        function upload(dataUrl, name) {
            var blob = Upload.dataUrltoBlob(dataUrl, name);

            vm.avatar.upload = profile.uploadAvatar({imageFile: blob});

            vm.avatar.isLoading = true;

            vm.avatar.upload.then(function (response) {

                vm.avatar.isLoading = false;

                $timeout(function () {
                    close();
                });
            }, function (response) {
                // toastr.success('Не удалось загрузить аватар, пожалуйста, повторите попытку', 'Ошибка');
            }, function (evt) {
                // file.progress = Math.min(100, parseInt(100.0 *
                //                          evt.loaded / evt.total));
            });
        }

        function close() {
            vm.onClose();
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('app.components')
        .component('choiceLanguage', {
            bindings: {
                data: '='
            },
            templateUrl: 'app/components/choice-language/choice-language.html',
            controller: 'ChoiceLanguageController',
            controllerAs: 'vm'
        });
})();
(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('ChoiceLanguageController', ChoiceLanguageController);

    ChoiceLanguageController.$inject = ['$rootScope', '$translate', 'lang', '$timeout'];
    /* @ngInject */
    function ChoiceLanguageController($rootScope, $translate, lang, $timeout) {
        var vm = this;

        vm.lang = {
            selected: {},
            items: []
        };

        vm.selectLang = selectLang;

        $rootScope.$on('$translateLoadingSuccess', function (e, data) {
            activate();
        });

        activate();

        ////

        function activate() {
            $timeout(function () {
                vm.lang.items = lang.getList();

                var useLang = $translate.use();

                _.forEach(vm.lang.items, function (item) {
                    if (item.lang === useLang) {
                        vm.lang.selected = item;
                    }
                });

                sortLang(useLang);
            }, 250);
        }

        function selectLang(selectLang) {
            vm.lang.selected = selectLang;

            sortLang(lang.selectLang(selectLang).lang);
        }

        function sortLang(useLang) {
            vm.lang.items = _.sortBy(vm.lang.items, {'lang': useLang});
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
        .component('contactToAddSelect', {
            bindings: {
                addresses: '=',
                disabled: '@?',
                placeholder: '@?',
                isAutofocus: '=?'
            },
            templateUrl: 'app/components/contact-to-add-select/contact-to-add-select.html',
            controller: 'ContactToAddSelectController',
            controllerAs: 'vm'
        });
})();
(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('ContactToAddSelectController', ContactToAddSelectController);

    ContactToAddSelectController.$inject = ['$uibModal', '$scope', 'contact'];
    /* @ngInject */
    function ContactToAddSelectController($uibModal, $scope, contact) {
        var vm = this;

        vm.contacts = {
            items: {}
        };

        vm.selectContact = {};

        vm.getContacts = getContacts;
        vm.findContacts = findContacts;
        vm.makeContact = makeContact;
        vm.openContactToAddPopup = openContactToAddPopup;
        vm.onTagAdding = onTagAdding;

        ////

        activate();

        function activate() {
            getContacts();
        }

        function getContacts() {
            contact.get().then(function (response) {
                vm.contacts.items = response.data;
            });
        }

        function findContacts(q, isTagFocus) {
            if (isTagFocus) {
                if (q) {
                    var res = contact.find({}, {q: q});
                } else {
                    var res = contact.get({q: q});
                }

                return res.then(function (response) {
                    var contacts = response.data;

                    _.forEach(contacts, function (item) {
                        if (!item.first_name) {
                            item.first_name = item.emails[0].value;
                        }
                    });

                    return contacts;
                });
            }
        }

        function makeContact(email) {
            return {
                first_name: email,
                emails: [{value: email}]
            };
        }

        function openContactToAddPopup() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/components/contact-to-add/contact-to-add-popup.html',
                controller: ["$scope", "$uibModalInstance", "addresses", function ($scope, $uibModalInstance, addresses) {
                    $scope.addresses = addresses;

                    $scope.cancel = cancel;
                    $scope.close = close;

                    function close(result) {
                        $uibModalInstance.close(result);
                    }

                    function cancel() {
                        $uibModalInstance.dismiss('cancel');
                    }
                }],
                size: 'sm',
                windowClass: 'popup popup--contact-group-add',
                resolve: {
                    addresses: function () {
                        return vm.addresses;
                    }
                }
            });

            modalInstance.result.then(function (response) {
                vm.addresses = response;
            });
        }

        function onTagAdding($tag) {
            $tag.id = _.uniqueId("tag-");

            console.log('$tag', $tag);
            return $tag;
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('app.components')
        .component('dateSort', {
            bindings: {
                from: '=',
                to: '='
            },
            templateUrl: 'app/components/date-sort/date-sort.html',
            controller: 'DateSortController',
            controllerAs: 'vm'
        });
})();
(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('DateSortController', DateSortController);

    DateSortController.$inject = ['$scope'];
    /* @ngInject */
    function DateSortController($scope) {
        var vm = this;

        vm.monthList = [];

        vm.selectDate = selectDate;
        vm.selectDefault = selectDefault;

        ////

        activate();

        function activate() {
            getMonthList();
        }

        function getMonthList() {
            vm.currentMonth = moment().month();
            _.forEach(moment.months(), function (month, i) {
                if (i <= vm.currentMonth) {
                    console.log('month', month);
                    vm.monthList.push(month);
                }
            });
        }
        
        function selectDate(i) {
            var selectedMonth = moment().month(i);
            vm.from = selectedMonth.startOf('month').unix();
            vm.to = selectedMonth.endOf('month').unix();
            console.log(vm.from, vm.to);
        }
        
        function selectDefault() {
            var startMonth = moment().month(0);
            var endMonth = moment().month(vm.currentMonth);
            vm.from = startMonth.startOf('month').unix();
            vm.to = endMonth.endOf('month').unix();
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('app.components')
        .component('folderClearConfirm', {
            bindings: {
                folder: '=',
                onClose: '&',
                onCancel: '&'
            },
            templateUrl: 'app/components/folder-clear-confirm/folder-clear-confirm.html',
            controller: 'FolderClearConfirmController',
            controllerAs: 'vm'
        });
})();
(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('FolderClearConfirmController', FolderClearConfirmController);

    FolderClearConfirmController.$inject = [];
    /* @ngInject */
    function FolderClearConfirmController() {
        var vm = this;

        vm.close = close;
        vm.cancel = cancel;

        activate();

        function activate() {
        }

        function close() {
            vm.onClose();
        }

        function cancel() {
            vm.onCancel();
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('app.components')
        .component('folderCreate', {
            bindings: {
                onСlose: '&'
            },
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

    FolderCreateController.$inject = ['mailBox'];
    /* @ngInject */
    function FolderCreateController(mailBox) {
        var vm = this;

        vm.form = {
            model: {}
        };

        vm.create = create;
        vm.close = close;

        activate();

        function activate() {
            console.log('cancel()', vm);
        }

        function create(form) {
            if (form.$invalid) return;

            mailBox.create({}, vm.form.model).then(function (response) {
                console.log('response', response);
                close();
            });
        }

        function close() {
            vm.onСlose();
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('app.components')
        .component('folderDeleteConfirm', {
            bindings: {
                folder: '=',
                onClose: '&',
                onCancel: '&'
            },
            templateUrl: 'app/components/folder-delete-confirm/folder-delete-confirm.html',
            controller: 'FolderDeleteConfirmController',
            controllerAs: 'vm'
        });
})();
(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('FolderDeleteConfirmController', FolderDeleteConfirmController);

    FolderDeleteConfirmController.$inject = [];
    /* @ngInject */
    function FolderDeleteConfirmController() {
        var vm = this;

        vm.close = close;
        vm.cancel = cancel;

        activate();

        function activate() {
        }

        function close() {
            vm.onClose();
        }

        function cancel() {
            vm.onCancel();
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('app.components')
        .component('folderEdit', {
            bindings: {
                model: '=',
                onСlose: '&'
            },
            templateUrl: 'app/components/folder-edit/folder-edit.html',
            controller: 'FolderEditController',
            controllerAs: 'vm'
        });
})();
(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('FolderEditController', FolderEditController);

    FolderEditController.$inject = ['mailBox'];
    /* @ngInject */
    function FolderEditController(mailBox) {
        var vm = this;

        vm.form = {
            model: {}
        };

        vm.update = update;
        vm.close = close;

        activate();

        function activate() {
            vm.form.model.mbox = angular.copy(vm.model).name;
            vm.form.model.mboxnew = angular.copy(vm.model).name;

            // vm.form.model
            console.log('vm.form.model', vm.form.model);
        }

        function update(form) {
            if (form.$invalid) return;

            mailBox.update({}, vm.form.model).then(function (response) {
                console.log('response', response);
                close();
            });
        }

        function close() {
            vm.onСlose();
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('app.components')
        .component('folderLayout', {
            bindings: {
                messages: '='
            },
            templateUrl: 'app/components/folder-layout/folder-layout.html',
            controller: 'FolderLayoutController',
            controllerAs: 'vm'
        });
})();
(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('FolderLayoutController', FolderLayoutController);

    FolderLayoutController.$inject = ['$scope', '$auth', '$state', '$uibModal', 'mailBox', 'mail'];
    /* @ngInject */
    function FolderLayoutController($scope, $auth, $state, $uibModal, mailBox, mail) {
        var vm = this;

        vm.folders = {};
        vm.standartFolders = [
            {
                name: 'INBOX',
                icon: 'icon-folder-desk'
            },
            {
                name: 'Drafts',
                icon: 'icon-draft-line'
            },
            {
                name: 'Trash',
                icon: 'icon-basket'
            },
            {
                name: 'Sent',
                icon: 'icon-sent-old'
            },
            {
                name: 'Junk',
                icon: 'icon-spam'
            },
            {
                name: 'Archive',
                icon: 'icon-archive-desk'
            }
        ];

        vm.folders = {};

        vm.move = move;
        vm.close = close;
        vm.openFolderCreatePopup = openFolderCreatePopup;

        $scope.$on('mailBox:layout:open', function() {
            open();
        });

        $scope.$on('mailBox:update:success', function () {
            getMailBox();
        });

        $scope.$on('mailBox:create:success', function () {
            getMailBox();
        });

        $scope.$on('mailBox:destroy:success', function () {
            getMailBox();
        });

        /////

        activate();

        function activate() {
            // console.log('vm.messages', vm.messages, $state);

            vm.$state = $state;

            getMailBox();
        }

        function open() {
            console.log('vm.messages', vm.messages, $state);
            vm.isOpen = true;
        }

        function close() {
            vm.isOpen = false;
        }

        function getMailBox() {
            mailBox.get().then(function (response) {
                vm.folders = _.assign(vm.folders, response.data);
                setIcons();
                getMailBoxFormatted();
            });
        }

        function setIcons() {
            _.forEach(vm.folders.items, function (item) {
                _.forEach(vm.standartFolders, function (standartFolder) {
                    if (item.name === standartFolder.name) {
                        item.icon = standartFolder.icon;
                    }
                });
            });
        }

        function getMailBoxFormatted() {
            _.forEach(vm.folders.items, function (folder) {
                var isSub = true;

                _.forEach(vm.standartFolders, function (standartFolder) {
                    if (folder.name == standartFolder.name) {
                        isSub = false;
                    }
                });

                if (isSub) {
                    folder.isSub = true;
                } else {
                    folder.isSub = false;
                }
            });

            sortFolder();
        }

        function sortFolder() {
            vm.folders.items = _.sortBy(vm.folders.items, [
                {'name': 'INBOX'},
                {'isSub': true},
                {'name': 'Sent'},
                {'name': 'Trash'},
                {'name': 'Junk'},
                {'name': 'Drafts'}
            ]).reverse();
        }

        function move(folder) {
            vm.messages = mail.moveToFolder(folder, vm.messages);
            close();
        }

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
        .component('inboxFooter', {
            bindings: {
                messages: '='
            },
            templateUrl: 'app/components/inbox-footer/inbox-footer.html',
            controller: 'InboxFooterController',
            controllerAs: 'vm'
        });
})();
(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('InboxFooterController', InboxFooterController);

    InboxFooterController.$inject = ['$state', '$scope', '$uibModal', 'mail', 'mailBox'];
    /* @ngInject */
    function InboxFooterController($state, $scope, $uibModal, mail, mailBox) {
        var vm = this;

        vm.isSeen = true;
        vm.isMoreSwitch = false;
        vm.isShowFeatures = false;

        vm.checkedAllMessages = checkedAllMessages;
        vm.syncMail = syncMail;
        vm.move = move;
        vm.destroy = destroy;
        vm.triggerSeen = triggerSeen;
        vm.goToAnswer = goToAnswer;
        vm.goToFwd = goToFwd;
        vm.openTagListPopup = openTagListPopup;
        vm.openLayoutFolder = openLayoutFolder;

        $scope.$watch('vm.messages.checked', function (data) {
            if (data && !data.length) {
                vm.isAllChecked = false;
            }
        }, true);

        activate();

        function activate() {
            vm.$state = $state;
            console.log('vm.state', vm.$state.current.name);
        }

        function checkedAllMessages() {
            if (vm.isAllChecked && vm.messages.items) {
                vm.messages.checked = angular.copy(vm.messages.items);
                return;
            }
            vm.messages.checked = [];
        }

        function syncMail() {
            if ($state.current.name === 'mail.inbox') {
                $scope.$emit('mail:sync');
                return;
            }
            $scope.$emit('folders:sync');
            $state.go('mail.inbox', {mbox: 'INBOX'});
        }

        function move(folder) {
            vm.messages = mail.moveToFolder(folder, vm.messages);
        }

        function destroy() {
            vm.messages = mail.destroy(vm.messages);
            vm.messages = [];
        }

        function triggerSeen() {
            vm.isSeen ? setUnSeen() : setSeen();
            vm.isSeen = !vm.isSeen;
        }

        function setSeen() {
            vm.messages = mail.setSeen(vm.messages);
        }

        function setUnSeen() {
            vm.messages = mail.setUnSeen(vm.messages);
        }

        function goToAnswer() {
            var data = mail.getAnswerData();
            $state.go('mail.compose', {
                // to: data.fromAddress,
                connection_id: data.connection_id,
                mbox: data.mbox,
                id: data.number,
                re: true
            });
        }

        function goToFwd() {
            console.log('vm.messages.checked', vm.messages.checked);
            var ids = [];

            _.forEach(vm.messages.checked, function (item) {
                ids.push(item.number);
            });

            console.log('ids', ids);

            mail.setFwdData(vm.messages.checked);

            $state.go('mail.compose', {
                ids: ids,
                fwd: true
            });
        }

        function openTagListPopup() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/components/tag-list/tag-list.html',
                controller: 'TagListController',
                controllerAs: 'vm',
                resolve: {
                    messages: function () {
                        return vm.messages;
                    }
                },
                size: 'sm',
                windowClass: 'popup popup--tags'
            });

            modalInstance.result.then(function (response) {
                vm.messages = response.result.messages;
                // console.log('response', response);
            });
        }

        function openLayoutFolder() {
            mailBox.openLayoutFolder();
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
                message: '=',
                messages: '='
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

    InboxMessageController.$inject = ['$state', '$scope', 'mail', 'tag', '$rootScope', '$uibModal'];
    /* @ngInject */
    function InboxMessageController($state, $scope, mail, tag, $rootScope, $uibModal) {
        var vm = this;

        vm.getDate = getDate;
        vm.goToUrl = goToUrl;
        vm.setSeen = setSeen;
        vm.setImportant = setImportant;
        vm.openMessageMenu = openMessageMenu;

        activate();

        function activate() {
            vm.$state = $state;
        }

        function getDate(date) {
            var newDate = new Date(date);

            return moment(newDate).calendar(null, {
                sameDay: 'hh:mm',
                nextDay: '[Tomorrow]',
                nextWeek: 'dddd',
                lastDay: 'D MMM',
                lastWeek: 'D MMM YY',
                sameElse: 'D MMM YY'
            });
        }

        function goToUrl() {
            if ($state.params.mbox === 'Drafts') {
                $state.go('mail.compose', {
                    id: vm.message.number,
                    mbox: vm.message.mbox,
                    connection_id: vm.message.connection_id
                });
                return;
            }

            if ($state.params.mbox === 'Templates') {
                $state.go('mail.compose', {
                    id: vm.message.number,
                    mbox: vm.message.mbox,
                    connection_id: vm.message.connection_id,
                    template: true
                });
                return;
            }

            $state.go('mail.message', {
                id: vm.message.number,
                mbox: vm.message.mbox,
                connection_id: vm.message.connection_id
            });
        }

        function setSeen() {
            if (vm.message.seen && !vm.message.isLoading) {
                vm.message.isLoading = true;
                mail.deflag({}, {
                    messages: [vm.message],
                    flag: 'Seen'
                }).then(function () {
                    vm.message.isLoading = false;
                    $rootScope.$broadcast('mailBox:sync');
                });
                vm.message.seen = !vm.message.seen;
                return;
            }

            vm.message.isLoading = true;
            mail.flag({}, {
                messages: [vm.message],
                flag: 'Seen'
            }).then(function () {
                vm.message.isLoading = false;
                $rootScope.$broadcast('mailBox:sync');
            });
            vm.message.seen = !vm.message.seen
        }

        function setImportant() {
            if (vm.message.important && !vm.message.isLoading) {
                vm.message.isLoading = true;
                mail.deflag({}, {
                    messages: [vm.message],
                    flag: 'Flagged'
                }).then(function () {
                    vm.message.isLoading = false;
                });
                vm.message.important = !vm.message.important;
                return;
            }

            vm.message.isLoading = true;
            mail.flag({}, {
                messages: [vm.message],
                flag: 'Flagged'
            }).then(function () {
                vm.message.isLoading = false;
            });
            vm.message.important = !vm.message.important;
        }

        function getTags() {
            tag.getTagsByMessage({}, {
                mbox: vm.message.mbox,
                id: vm.message.number
            }).then(function (response) {
                vm.message.tags = response.data;
            })
        }

        function openMessageMenu() {
            vm.messages.checked = [vm.message];
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/components/message-menu/message-menu.html',
                controller: 'MessageMenuController',
                controllerAs: 'vm',
                resolve: {
                    message: function () {
                        return vm.message;
                    },
                    messages: function () {
                        return vm.messages;
                    }
                },
                size: 'sm',
                windowClass: 'popup'
            });

            modalInstance.result.then(function (response) {
                vm.messages = response.result.messages;
                // console.log('response', response);
            });
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
        .component('menuBottom', {
            bindings: {
                isOpen: '=',
                onSave: '&'
            },
            templateUrl: 'app/components/menu-bottom/menu-bottom.html',
            controller: 'MenuBottomController',
            controllerAs: 'vm'
        });
})();
(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('MenuBottomController', MenuBottomController);

    MenuBottomController.$inject = ['$state', '$stateParams', 'mail'];
    /* @ngInject */
    function MenuBottomController($state, $stateParams, mail) {
        var vm = this;

        vm.save = save;
        vm.destroy = destroy;

        function save() {
            vm.onSave();
            vm.isOpen = false;
            $state.go('mail.inbox', {mbox: 'INBOX'});
        }

        function destroy() {
            vm.isOpen = false;

            if ($stateParams.id) {
                mail.destroyOne({
                    mbox: $stateParams.mbox,
                    number: $stateParams.id,
                    connection_id: $stateParams.connection_id
                });

                $state.go('mail.inbox', {mbox: 'INBOX'});
            }
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('app.components')
        .component('langList', {
            bindings: {
                messages: '=',
                onClose: '&?',
                useLang: '=?'
            },
            templateUrl: 'app/components/lang-list/lang-list.html',
            controller: 'LangListController',
            controllerAs: 'vm'
        });
})();
(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('LangListController', LangListController);

    LangListController.$inject = ['$translate', '$http', '$timeout', 'lang'];
    /* @ngInject */
    function LangListController($translate, $http, $timeout, lang) {
        var vm = this;

        vm.lang = {
            selected: {},
            items: []
        };

        vm.selectLang = selectLang;

        activate();

        function activate() {
            vm.lang.items = lang.getList();

            var lng = $translate.use();
            moment.locale(lng);

            $http.defaults.headers.common["Accept-Language"] = lng;

            _.forEach(vm.lang.items, function (item) {
                if (item.lang === lng) {
                    vm.lang.selected = item;
                }
            });
        }

        function selectLang(lng) {
            vm.lang.selected = lng;

            $timeout(function () {
                $translate.use(lng.lang);
                moment.locale(lng.lang);

                $timeout(function () {
                    vm.useLang = lang.getCurrentLang();
                }, 50);

                $http.defaults.headers.common["Accept-Language"] = lng.lang;

                close();
            });
        }

        function close() {
            vm.onClose();
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('app.components')
        .component('messageAvatar', {
            bindings: {
                message: '=',
                classNames: '@?'
            },
            templateUrl: 'app/components/message-avatar/message-avatar.html',
            controller: 'MessageAvatarController',
            controllerAs: 'vm'
        });
})();
(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('MessageAvatarController', MessageAvatarController);

    MessageAvatarController.$inject = ['$state', '$scope', 'mail', 'tag', '$rootScope', '$uibModal'];
    /* @ngInject */
    function MessageAvatarController($state, $scope, mail, tag, $rootScope, $uibModal) {
        var vm = this;

        activate();

        ////

        function activate() {
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('app.components')
        .component('messageMenu', {
            bindings: {
                messages: '='
            },
            templateUrl: 'app/components/message-menu/message-menu.html',
            controller: 'MessageMenuController',
            controllerAs: 'vm'
        });
})();
(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('MessageMenuController', MessageMenuController);

    MessageMenuController.$inject = ['$state', '$scope', '$uibModal', 'mail', 'mailBox', '$uibModalInstance', 'message', 'messages'];
    /* @ngInject */
    function MessageMenuController($state, $scope, $uibModal, mail, mailBox, $uibModalInstance, message, messages) {
        var vm = this;

        vm.isSeen = true;

        vm.move = move;
        vm.destroy = destroy;
        vm.triggerSeen = triggerSeen;
        vm.goToAnswer = goToAnswer;
        vm.goToFwd = goToFwd;
        vm.openTagListPopup = openTagListPopup;
        vm.openLayoutFolder = openLayoutFolder;
        vm.close = close;
        vm.setImportant = setImportant;

        activate();

        function activate() {
            vm.$state = $state;
            vm.messages = messages;
            vm.message = message;

            // console.log('vm.message', vm.message);
            // console.log('vm.messages', vm.messages);

            mail.setAnswerData(vm.message);
        }

        function move(folder) {
            vm.messages = mail.moveToFolder(folder, vm.messages);
            close();
        }

        function destroy() {
            vm.messages = mail.destroy(vm.messages);
            vm.messages = [];
            close();
        }

        function triggerSeen() {
            vm.message.seen ? setUnSeen() : setSeen();
            vm.message.seen = !vm.message.seen;
        }

        function setSeen() {
            vm.messages = mail.setSeen(vm.messages);
            close();
        }

        function setUnSeen() {
            vm.messages = mail.setUnSeen(vm.messages);
            close();
        }

        function goToAnswer() {
            var data = mail.getAnswerData();
            $state.go('mail.compose', {
                connection_id: data.connection_id,
                mbox: data.mbox,
                id: data.number,
                re: true
            });

            close();
        }

        function goToFwd() {
            console.log('vm.messages.checked', vm.messages.checked);
            var ids = [];

            _.forEach(vm.messages.checked, function (item) {
                ids.push(item.number);
            });

            // console.log('ids', ids);

            mail.setFwdData(vm.messages.checked);

            $state.go('mail.compose', {
                id: ids,
                fwd: true,
                mbox: vm.messages.checked[0].mbox,
                connection_id: vm.messages.checked[0].connection_id
            });

            close();
        }

        function openTagListPopup() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/components/tag-list/tag-list.html',
                controller: 'TagListController',
                controllerAs: 'vm',
                resolve: {
                    messages: function () {
                        return vm.messages;
                    }
                },
                size: 'sm',
                windowClass: 'popup popup--tags'
            });

            modalInstance.result.then(function (response) {
                vm.messages = response.result.messages;
            });

            close();
        }

        function setImportant() {
            if (vm.message.important && !vm.message.isLoading) {
                vm.message.isLoading = true;
                mail.deflag({}, {
                    messages: [vm.message],
                    flag: 'Flagged'
                }).then(function () {
                    vm.message.isLoading = false;
                });
                vm.message.important = !vm.message.important;
                return;
            }

            vm.message.isLoading = true;
            mail.flag({}, {
                messages: [vm.message],
                flag: 'Flagged'
            }).then(function () {
                vm.message.isLoading = false;
            });
            vm.message.important = !vm.message.important;
        }

        function openLayoutFolder() {
            mailBox.openLayoutFolder();
            close();
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        function close() {
            $uibModalInstance.close({result: {messages: vm.messages}});
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('app.components')
        .component('profileForm', {
            bindings: {},
            templateUrl: 'app/components/profile-form/profile-form.html',
            controller: 'ProfileFormController',
            controllerAs: 'vm'
        });
})();
(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('ProfileFormController', ProfileFormController);

    ProfileFormController.$inject = ['$auth', '$state', 'profile', 'country'];
    /* @ngInject */
    function ProfileFormController($auth, $state, profile, country) {
        var vm = this;

        vm.profileForm = {};

        vm.monthList = moment.months();
        vm.countryList = [];
        vm.citiesList = [];

        vm.logout = logout;
        vm.save = save;
        vm.resetForm = resetForm;

        activate();

        function activate() {
            vm.profile = $auth.user.profile;
            vm.profileForm = angular.copy($auth.user.profile);

            getCountries();
        }

        function logout() {
            profile.destroyStorageProfile($auth.user);
            $auth.signOut();
            $state.go('signIn');
        }

        function save() {
            var data = {
                first_name: vm.profileForm.first_name,
                last_name: vm.profileForm.last_name,
                gender: vm.profileForm.gender,
                country: vm.profileForm.country,
                city: vm.profileForm.city,
                user_name: vm.profileForm.user_name
            };

            if (vm.profileForm.bDay && vm.profileForm.bMonth && vm.profileForm.bYear) {
                var date = moment(vm.profileForm.bDay + ' ' + vm.profileForm.bMonth + ' ' + vm.profileForm.bYear);
                data.birthday = date.format('YYYY-MM-DD');
            }

            profile.put({}, data);
        }

        function resetForm() {
            vm.profileForm = angular.copy($auth.user.profile);
        }

        function getCountries() {
            country.get().then(function (response) {
                vm.countryList = [];
                _.forEach(response, function (item) {
                    vm.countryList.push(item.name);
                });
            });
        }
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

    SearchMailController.$inject = ['$scope', '$rootScope', 'tag', 'mailBox'];
    /* @ngInject */
    function SearchMailController($scope, $rootScope, tag, mailBox) {
        var vm = this;

        vm.isOpenDate = false;

        vm.date = {};

        vm.tags = {
            selected: {
                tag_name: 'ALL_TAGS',
                id: undefined
            },
            items: [{
                tag_name: 'ALL_TAGS',
                id: undefined
            }]
        };

        vm.standartFolders = [
            {
                caption: 'ALL_FOLDERS',
                name: 'ALL',
                icon: 'icon-incoming'
            },
            {
                name: 'INBOX',
                icon: 'icon-incoming'
            },
            {
                name: 'Drafts',
                icon: 'icon-draft-line'
            },
            {
                name: 'Trash',
                icon: 'icon-bin'
            },
            {
                name: 'Sent',
                icon: 'icon-sent-old'
            },
            {
                name: 'Junk',
                icon: 'icon-spam'
            }
        ];

        vm.folders = {
            selected: {
                caption: 'ALL_FOLDERS',
                name: 'ALL',
                icon: 'icon-incoming'
            }
        };

        vm.searchParts = {
            selected: {
                'name': 'SEARCH_ENTIRE_LETTER',
                'value': 'all'
            },
            list: [
                {
                    'name': 'SEARCH_ENTIRE_LETTER',
                    'value': 'all'
                },
                {
                    'name': 'IN_THE_SENDER_FIELD',
                    'value': 'from'
                },
                {
                    'name': 'IN_THE_FIELD_RECIPIENT',
                    'value': 'to'
                },
                {
                    'name': 'IN_THE_BODY_OF_THE_LETTER',
                    'value': 'body'
                },
                {
                    'name': 'IN_THE_TEXT_OF_THE_LETTER',
                    'value': 'text'
                }
            ]
        };

        vm.searchForm = {
            model: {}
        };

        vm.search = search;
        vm.onSearchChange = onSearchChange;

        $scope.$watch('vm.from', function (data, oldData) {
            if (data) {
                search();
                vm.isOpenFilters = false;
            }
        });

        $scope.$watch('vm.to', function (data, oldData) {
            if (data) {
                search();
                vm.isOpenFilters = false;
            }
        });

        activate();

        function activate() {
            getTags();
            getMailBox();
        }

        function search() {
            var data = {};

            if (vm.folders.selected.name === 'ALL') {
                data.search_part = 'text';
            }

            if (vm.searchParts.selected.value && vm.searchParts.selected.value !== 'all') {
                data.search_part = vm.searchParts.selected.value;
            }

            if (vm.tags.selected.id) {
                data.search_tag_id = vm.tags.selected.id;
            }

            if (vm.searchForm.isAttach) {
                data.filter = 'attach';
            }

            if (vm.searchForm.model.search) {
                data.search = vm.searchForm.model.search;
            }

            if (vm.folders.selected.name && vm.folders.selected.name !== 'ALL') {
                data.mbox = vm.folders.selected.name;
            }

            if (vm.from && vm.to) {
                data.search_start = vm.from;
                data.search_end = vm.to;
            }

            console.log('params', data);

            // return;

            $rootScope.$broadcast('search:mail', {
                search: data
            });
        }

        function getTags() {
            tag.get().then(function (response) {
                vm.tags.items = vm.tags.items.concat(response.data);
            });
        }

        function getMailBox() {
            mailBox.get().then(function (response) {
                vm.folders = _.assign(vm.folders, response.data);
                getMailBoxFormatted();
            });
        }

        function getMailBoxFormatted() {
            _.forEach(vm.folders.items, function (folder) {
                var isSub = true;

                _.forEach(vm.standartFolders, function (standartFolder) {
                    if (folder.name == standartFolder.name) {
                        isSub = false;
                    }
                });

                if (isSub) {
                    folder.isSub = true;
                } else {
                    folder.isSub = false;
                }
            });

            vm.folders.items.push(vm.standartFolders[0]);

            sortFolder();
        }

        function sortFolder() {
            vm.folders.items = _.sortBy(vm.folders.items, [
                {'name': 'ALL'},
                {'name': 'INBOX'},
                {'isSub': true},
                {'name': 'Sent'},
                {'name': 'Trash'},
                {'name': 'Junk'},
                {'name': 'Drafts'}
            ]).reverse();
        }

        function onSearchChange() {
            if (!vm.searchForm.model.search) {
                $rootScope.$broadcast('search:close', {});
            }
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('app.components')
        .component('socialAuth', {
            bindings: {},
            templateUrl: 'app/components/social-auth/social-auth.html',
            controller: 'SocialAuthController',
            controllerAs: 'vm'
        });
})();
(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('SocialAuthController', SocialAuthController);

    SocialAuthController.$inject = ['$auth', 'CONFIG'];
    /* @ngInject */
    function SocialAuthController($auth, CONFIG) {
        var vm = this;

        ////

        activate();

        function activate() {
            vm.user = $auth.user;
            vm.CONFIG = CONFIG;
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
        .component('spinner', {
            bindings: {
                isGlobal: '=',
                isOpen: '=?'
            },
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
            $timeout(function () {
                if (vm.isGlobal) {
                    vm.isOpen = true;
                }
            });
        });

        $scope.$on('httpCallStopped', function () {
            $timeout(function () {
                if (vm.isGlobal) {
                    vm.isOpen = false;
                }
            });
        });

    }
})();

(function () {
    'use strict';

    angular
        .module('app.components')
        .component('tagCreate', {
            bindings: {
                onClose: '&',
                messages: '='
            },
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

    TagCreateController.$inject = ['$rootScope', '$timeout', 'tag', 'list'];
    /* @ngInject */
    function TagCreateController($rootScope, $timeout, tag, list) {
        var vm = this;

        vm.paletteForm = {
            model: {
                color: '#fff'
            }
        };

        vm.palette = {
            items: []
        };

        vm.create = create;
        vm.select = select;
        vm.close = close;

        ////

        activate();

        function activate() {
            getColors();
        }

        function getColors() {
            _.forEach(list.getColors(), function (color, i) {
                vm.palette.items.push({
                    active: false,
                    color: color
                });
            });

            select(vm.palette.items[0]);
        }

        function select(palette) {
            $timeout(function () {
                vm.palette.selected = palette;
                vm.paletteForm.model.bgcolor = palette.color;
            });
        }

        function create(form) {
            if (form.$invalid || vm.paletteForm.isLoading) return;

            vm.paletteForm.isLoading = true;
            tag.create({}, vm.paletteForm.model).then(function (response) {
                if (vm.messages) {
                    tag.setTag(response.data, vm.messages, {sync: true}).then(function () {
                        vm.paletteForm.isLoading = false;
                        $rootScope.$broadcast('mail:sync');
                        close();
                    });
                } else {
                    close();
                }
            });
        }

        function close() {
            vm.onClose();
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('app.components')
        .component('tagEdit', {
            bindings: {
                onClose: '&',
                model: '='
            },
            templateUrl: 'app/components/tag-edit/tag-edit.html',
            controller: 'TagEditController',
            controllerAs: 'vm'
        });
})();
(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('TagEditController', TagEditController);

    TagEditController.$inject = ['$timeout', 'tag', 'list'];
    /* @ngInject */
    function TagEditController($timeout, tag, list) {
        var vm = this;

        vm.paletteForm = {
            model: {
                color: '#fff'
            }
        };

        vm.palette = {
            items: []
        };

        vm.update = update;
        vm.select = select;
        vm.close = close;

        ////

        activate();

        function activate() {
            getColors();

            vm.palette.selected = angular.copy(vm.model);
            vm.paletteForm.model = angular.copy(vm.model);
            // select(vm.paletteForm.model);
            // console.log('vm.palette.selected', vm.palette.selected);
        }

        function getColors() {
            _.forEach(list.getColors(), function (color, i) {
                vm.palette.items.push({
                    active: false,
                    color: color,
                    bgcolor: color
                });
            });
        }

        function select(palette) {
            $timeout(function () {
                vm.palette.selected = palette;
                vm.paletteForm.model.bgcolor = palette.bgcolor;
            });
        }

        function update(form) {
            // console.log('vm.paletteForm', vm.paletteForm.model, form);

            if (form.$invalid) return;

            tag.update({}, vm.paletteForm.model).then(function (response) {
                close();
            });
        }

        function close() {
            vm.onClose();
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('app.components')
        .component('tagList', {
            bindings: {
                messages: '='
            },
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

    TagListController.$inject = ['$uibModal', '$rootScope', '$scope', '$uibModalInstance', 'tag', 'mail', 'messages'];
    /* @ngInject */
    function TagListController($uibModal, $rootScope, $scope, $uibModalInstance, tag, mail, messages) {
        var vm = this;

        vm.tags = {
            checked: [],
            items: []
        };

        vm.unTags = {
            items: []
        };

        vm.setTag = setTag;
        vm.setUnTag = setUnTag;
        vm.setSeen = setSeen;
        vm.setUnSeen = setUnSeen;
        vm.setImportant = setImportant;
        vm.close = close;
        vm.triggerTag = triggerTag;

        // $scope.$watch('vm.unTags.items', function (data, oldData) {
        //     // console.log('unTags', data);
        // }, true);

        ////

        activate();

        function activate() {
            vm.messages = messages;

            vm.isImportant = true;

            if (_.find(vm.messages.checked, {important: false})) {
                vm.isImportant = false;
            }

            get();
        }

        function get() {
            tag.get().then(function (response) {
                vm.tags.items = response.data;
                getFormattedTags();
            });
        }

        function getFormattedTags() {
            var unTags = [];

            _.forEach(vm.messages.checked, function (messageChecked) {
                unTags = unTags.concat(messageChecked.tags);
            });

            vm.unTags.items = _.uniqBy(unTags, 'id');
        }

        function triggerTag(item, checked) {
            if (checked) {
                setTag(item);
                return;
            }

            setUnTag(item);
        }

        function setTag(item) {
            vm.messages = tag.setTag(item, vm.messages);

            getFormattedTags();
        }

        function setUnTag(item) {
            vm.messages = tag.setUnTag(item, vm.messages);

            getFormattedTags();
        }

        function setSeen() {
            vm.messages = mail.setSeen(vm.messages);
        }

        function setUnSeen() {
            vm.messages = mail.setUnSeen(vm.messages);
        }

        function setImportant() {
            if (_.find(vm.messages.checked, {important: false})) {
                vm.messages = mail.setImportant(vm.messages);
                return;
            }

            vm.messages = mail.setUnImportant(vm.messages);
        }

        function close() {
            $uibModalInstance.close({
                result: {
                    messages: vm.messages
                }
            });

            $rootScope.$broadcast('mail:inbox:messages:update', vm.messages);
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('app.components')
        .component('timezoneList', {
            bindings: {
                messages: '=',
                onClose: '&?'
            },
            templateUrl: 'app/components/timezone-list/timezone-list.html',
            controller: 'TimezoneListController',
            controllerAs: 'vm'
        });
})();
(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('TimezoneListController', TimezoneListController);

    TimezoneListController.$inject = ['$state', 'profile', 'timezone'];
    /* @ngInject */
    function TimezoneListController($state, profile, timezone) {
        var vm = this;

        vm.timezoneList = [];

        vm.setTimezone = setTimezone;

        activate();

        function activate() {
            getTimezoneList();
        }

        function getTimezoneList() {
            vm.timezoneList = timezone.getTimezoneList();
        }

        function setTimezone(tz) {
            moment.tz.setDefault(tz.utc[0]);

            profile.put({}, {timezone: tz.utc[0]});

            close();
        }

        function close() {
            vm.onClose();
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
        .component('toDate', {
            bindings: {
                date: '=',
                dateUnix: '=',
                isSmall: '=?'
            },
            templateUrl: 'app/components/to-date/to-date.html',
            controller: 'ToDateController',
            controllerAs: 'vm'
        });
})();
(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('ToDateController', ToDateController);

    ToDateController.$inject = ['$scope', '$translate'];
    /* @ngInject */
    function ToDateController($scope, $translate) {
        var vm = this;

        vm.convertDate = '';

        vm.calendarFormat = {
            // sameDay: 'HH:mm',
            // nextDay: '[завтра]',
            // nextWeek: 'dddd HH:mm',
            // lastDay: '[вчера] hh:mm',
            // lastWeek: 'DD MMMM YYYY [в] hh:mm',
            // sameElse: 'DD MMMM YYYY [в] hh:mm'
        };

        vm.calendarSmallFormat = {
            // sameDay: 'HH:mm',
            // nextDay: '[завтра] HH:mm',
            // nextWeek: 'dddd HH:mm',
            // lastDay: 'D MMM',
            // lastWeek: 'D MMM',
            // sameElse: 'D MMM'
        };

        vm.sendTimeFormat = {
            // sameDay: '[сегодня в] HH:mm',
            // nextDay: '[завтра] HH:mm',
            // nextWeek: 'dddd HH:mm',
            // lastDay: '[вчера] hh:mm',
            // lastWeek: 'DD MMMM YYYY [в] hh:mm',
            // sameElse: 'DD MMMM YYYY [в] hh:mm'
        };

        vm.getConvert = getConvert;

        $scope.$watch('vm.date', function (data, newData) {
            if (data) {
                console.log('data', data);
                var newDate = moment(data);
                vm.convertDate = getConvert(newDate);
            }
        });

        $scope.$watch('vm.dateUnix', function (data, newData) {
            if (data) {
                vm.convertDate = getUnixConvert(data);
            }
        });

        activate();

        function activate() {
            if (vm.isSmall) {
                moment.locale('ru', {
                    calendar: {
                        sameDay: 'HH:mm',
                        lastDay: 'D MMM',
                        nextDay: '[завтра]',
                        nextWeek: 'dddd HH:mm',
                        lastWeek: 'D MMM',
                        sameElse: 'D MMM'
                    }
                });

                moment.locale('en', {
                    calendar: {
                        sameDay: 'HH:mm',
                        lastDay: 'D MMM',
                        nextDay: '[tomorrow at]',
                        nextWeek: 'dddd HH:mm',
                        lastWeek: 'D MMM',
                        sameElse: 'D MMM'
                    }
                });

                moment.locale('cs', {
                    calendar: {
                        sameDay: 'HH:mm',
                        lastDay: 'D MMM',
                        nextDay: '[zítra]',
                        nextWeek: 'dddd HH:mm',
                        lastWeek: 'D MMM',
                        sameElse: 'D MMM'
                    }
                });

                moment.locale('sk', {
                    calendar: {
                        sameDay: 'HH:mm',
                        lastDay: 'D MMM',
                        nextDay: '[zítra]',
                        nextWeek: 'dddd HH:mm',
                        lastWeek: 'D MMM',
                        sameElse: 'D MMM'
                    }
                });

                moment.locale('uk', {
                    calendar: {
                        sameDay: 'HH:mm',
                        lastDay: 'D MMM',
                        nextDay: '[завтра]',
                        nextWeek: 'dddd HH:mm',
                        lastWeek: 'D MMM',
                        sameElse: 'D MMM'
                    }
                });

                moment.locale($translate.use());

                return;
            }

            if (vm.isSendTime) {
                moment.locale('ru', {
                    calendar: {
                        sameDay: '[сегодня в] HH:mm',
                        lastDay: '[вчера] hh:mm',
                        nextDay: '[завтра]',
                        nextWeek: 'dddd HH:mm',
                        lastWeek: 'DD MMMM YYYY [в] hh:mm',
                        sameElse: 'DD MMMM YYYY [в] hh:mm'
                    }
                });

                moment.locale('en', {
                    calendar: {
                        sameDay: '[today] HH:mm',
                        lastDay: '[yesterday] hh:mm',
                        nextDay: '[tomorrow at]',
                        nextWeek: 'dddd HH:mm',
                        lastWeek: 'DD MMMM YYYY [at] hh:mm',
                        sameElse: 'DD MMMM YYYY [at] hh:mm'
                    }
                });

                moment.locale('cs', {
                    calendar: {
                        sameDay: '[dnes] HH:mm',
                        lastDay: '[včera] hh:mm',
                        nextDay: '[zítra]',
                        nextWeek: 'dddd HH:mm',
                        lastWeek: 'DD MMMM YYYY [v] hh:mm',
                        sameElse: 'DD MMMM YYYY [v] hh:mm'
                    }
                });

                moment.locale('sk', {
                    calendar: {
                        sameDay: '[dnes] HH:mm',
                        lastDay: '[včera] hh:mm',
                        nextDay: '[zítra]',
                        nextWeek: 'dddd HH:mm',
                        lastWeek: 'DD MMMM YYYY [v] hh:mm',
                        sameElse: 'DD MMMM YYYY [v] hh:mm'
                    }
                });

                moment.locale('uk', {
                    calendar: {
                        sameDay: '[сьогодні] HH:mm',
                        lastDay: '[вчора] hh:mm',
                        nextDay: '[завтра]',
                        nextWeek: 'dddd HH:mm',
                        lastWeek: 'DD MMMM YYYY [в] hh:mm',
                        sameElse: 'DD MMMM YYYY [в] hh:mm'
                    }
                });

                moment.locale($translate.use());

                return
            }

            moment.locale('ru', {
                calendar: {
                    sameDay: 'HH:mm',
                    lastDay: '[вчера] hh:mm',
                    nextDay: '[завтра]',
                    nextWeek: 'dddd HH:mm',
                    lastWeek: 'DD MMMM YYYY [в] hh:mm',
                    sameElse: 'DD MMMM YYYY [в] hh:mm'
                }
            });

            moment.locale('en', {
                calendar: {
                    sameDay: 'HH:mm',
                    lastDay: '[yesterday] hh:mm',
                    nextDay: '[tomorrow at]',
                    nextWeek: 'dddd HH:mm',
                    lastWeek: 'DD MMMM YYYY [at] hh:mm',
                    sameElse: 'DD MMMM YYYY [at] hh:mm'
                }
            });

            moment.locale('cs', {
                calendar: {
                    sameDay: 'HH:mm',
                    lastDay: '[včera] hh:mm',
                    nextDay: '[zítra]',
                    nextWeek: 'dddd HH:mm',
                    lastWeek: 'DD MMMM YYYY [v] hh:mm',
                    sameElse: 'DD MMMM YYYY [v] hh:mm'
                }
            });

            moment.locale('sk', {
                calendar: {
                    sameDay: 'HH:mm',
                    lastDay: '[včera] hh:mm',
                    nextDay: '[zítra]',
                    nextWeek: 'dddd HH:mm',
                    lastWeek: 'DD MMMM YYYY [v] hh:mm',
                    sameElse: 'DD MMMM YYYY [v] hh:mm'
                }
            });

            moment.locale('uk', {
                calendar: {
                    sameDay: 'HH:mm',
                    lastDay: '[вчора] hh:mm',
                    nextDay: '[завтра]',
                    nextWeek: 'dddd HH:mm',
                    lastWeek: 'DD MMMM YYYY [в] hh:mm',
                    sameElse: 'DD MMMM YYYY [в] hh:mm'
                }
            });

            moment.locale($translate.use());
        }

        function getConvert(date) {
            return moment(date).calendar();
        }

        function getUnixConvert(date) {
            return moment.unix(date).calendar();
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('app.components')
        .component('userConnectionDefault', {
            bindings: {},
            templateUrl: 'app/components/user-connection-default/user-connection-default.html',
            controller: 'UserConnectionDefaultController',
            controllerAs: 'vm'
        });
})();
(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('UserConnectionDefaultController', UserConnectionDefaultController);

    UserConnectionDefaultController.$inject = ['$auth', 'profile'];
    /* @ngInject */
    function UserConnectionDefaultController($auth, profile) {
        var vm = this;

        vm.connections = {
            selected: {},
            items: []
        };

        vm.update = update;

        ////

        activate();

        function activate() {
            vm.user = $auth.user;
            getList();
        }

        function getList() {
            var userConnection = {
                id: vm.user.profile.default_connection_id,
                email: vm.user.profile.email
            };

            vm.connections.items.push(userConnection);

            vm.connections.items = vm.connections.items.concat(vm.user.profile.connections);

            _.forEach(vm.connections.items, function (connection) {
                if (vm.user.profile.selected_connection_id === connection.id) {
                    vm.connections.selected = connection;
                }
            });

            if (!vm.user.profile.selected_connection_id) {
                vm.connections.selected = userConnection;
            }

            // console.log('connections', vm.connections);
        }

        function update(connection) {
            var data = {};
            data.selected_connection_id = connection.id;
            profile.put({}, data);
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
        .component('userSignatures', {
            bindings: {},
            templateUrl: 'app/components/user-signatures/user-signatures.html',
            controller: 'UserSignaturesController',
            controllerAs: 'vm'
        });
})();
(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('UserSignaturesController', UserSignaturesController);

    UserSignaturesController.$inject = ['$auth', '$timeout', '$sce', 'profile', 'sign', 'connection'];
    /* @ngInject */
    function UserSignaturesController($auth, $timeout, $sce, profile, sign, connection) {
        var vm = this;

        vm.signatureForm = {
            model: {
                sign: ""
            }
        };

        vm.signatures = {
            items: []
        };

        vm.connections = {};

        vm.getTrustHtml = getTrustHtml;
        vm.save = save;
        vm.add = add;
        vm.edit = edit;
        vm.destroy = destroy;
        vm.getEmailBySign = getEmailBySign;

        ////

        activate();

        function activate() {
            vm.user = $auth.user;

            getList();
            getConnectionsList();
        }

        function getList() {
            sign.get().then(function (response) {
                vm.signatures.items = response.data;
                vm.signatures.items.reverse();
                console.log('signatures', vm.signatures.items);
            });
        }

        function add() {
            var data = {};

            data.sign = vm.signatureForm.model.sign;

            if (vm.signatureForm.model.isSignConnected) {
                data.connection_id = vm.signatureForm.model.connection_id;
                updateConnectionSign(data);
            }

            sign.post({}, data).then(function (response) {
                vm.signatures.items.unshift(response.data);
                vm.signatureForm.model.sign = '';

                $timeout(function () {
                    getList();
                    getConnectionsList();
                }, 250);
            });
        }

        function edit(model) {
            _.forEach(vm.signatures.items, function (item) {
                item.isEdit = false;
            });
            model.isEdit = true;
        }

        function save(model) {
            var data = {};

            data.id = model.id;
            data.sign = model.sign;
            data.connection_id = model.connection_id;

            console.log('data', data);

            if (model.isSignConnected) {
                data.connection_id = model.connection_id;
                updateConnectionSign(data);
            }

            sign.put({}, {id: data.id, sign: data.sign}).then(function (response) {
                model.isEdit = false;

                $timeout(function () {
                    getList();
                    getConnectionsList();
                }, 250);
            });
        }

        function destroy(model) {
            if (_.isEqual(model.sign, vm.user.profile.sign)) {
                profile.put({}, {
                    sign: ''
                });
            }

            sign.destroy({id: model.id}).then(function (response) {
                _.remove(vm.signatures.items, function (item) {
                    return model === item;
                });
            });
        }

        function getTrustHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function getConnectionsList() {
            vm.connections.items = [];

            var userConnection = {
                id: vm.user.profile.default_connection_id,
                email: vm.user.profile.email,
                sign: vm.user.profile.sign
            };

            vm.connections.items.push(userConnection);

            vm.connections.items = vm.connections.items.concat(vm.user.profile.connections);

            _.forEach(vm.connections.items, function (connection) {
                if (vm.user.profile.selected_connection_id === connection.id) {
                    vm.connections.selected = connection;
                }
            });

            if (!vm.user.profile.selected_connection_id) {
                vm.connections.selected = userConnection;
            }

            vm.signatureForm.model.connection_id = vm.connections.selected.id;
        }

        function updateConnectionSign(data) {
            if (vm.user.profile.default_connection_id === data.connection_id) {
                profile.put({}, {
                    sign: data.sign
                });
                return;
            }

            connection.update({id: data.connection_id}, {sign: data.sign});

            profile.put({}, {
                sign: ''
            });
        }

        function getEmailBySign(data) {
            return _.result(_.find(vm.connections.items, {'sign': data.sign}), 'email');
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
                server: '=?',
                messages: '=?'
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
        .module('mail.compose')
        .controller('ComposeController', ComposeController);

    ComposeController.$inject = ['mail', '$timeout', '$interval', '$state', '$scope', '$rootScope', '$auth', '$translate', '$uibModal', 'Upload'];
    /* @ngInject */
    function ComposeController(mail, $timeout, $interval, $state, $scope, $rootScope, $auth, $translate, $uibModal, Upload) {
        var vm = this;

        vm.connections = {
            selected: {},
            items: []
        };

        vm.interval = {};

        vm.message = {};

        vm.isSaveDraft = false;

        vm.fwd = {
            items: [],
            checked: []
        };

        vm.isUploading = false;

        vm.isCopy = false;
        vm.isCopyHidden = false;

        vm.tags = [];

        vm.sendForm = {
            model: {}
        };

        vm.toList = {
            model: {}
        };

        vm.send = send;
        vm.save = save;
        vm.upload = upload;
        vm.saveTemplate = saveTemplate;
        vm.close = close;

        $scope.$on('mail:compose:close', function () {
            close();
        });

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            $interval.cancel(vm.interval);
        });

        $scope.$on('mail:send', function () {
            send($scope.form);
        });

        $scope.$watch('vm.sendForm.model.to', function (data, oldData) {
            if (data && data.length) {
                $rootScope.$broadcast('mail:isSend', {isSend: true});
            } else {
                $rootScope.$broadcast('mail:isSend', {isSend: false});
            }
        }, true);

        $scope.$watch('vm.sendForm.model.body', function (data, oldData) {
            if (data) {
                if (!vm.isSaveDraft && !$state.params.fwd && !$state.params.re && !$state.params.template) {
                    save({isGoDrafts: true});
                    vm.interval = $interval(function () {
                        if (vm.sendForm.model.to && !vm.$state.params.template) {
                            save({isGoDrafts: true});
                        }
                    }, 1000 * 60);
                    vm.isSaveDraft = true;
                }
            }
        });

        activate();

        function activate() {
            vm.user = $auth.user;
            vm.$state = $state;

            $translate('SENDING_MESSAGE').then(function (translationValue) {
                vm.resendTitle = translationValue;
            }, function (translationId) {
                vm.resendTitle = translationId;
            });

            if ($state.params.id && $state.params.mbox && !$state.params.fwd && !$state.params.re) {
                vm.sendForm.id = $state.params.id;
                getMessage();
            }

            if ($state.params.to) {
                vm.sendForm.model.to = $state.params.to;
            }

            // if ($state.params.fwd) {
            //     $translate('SENDING_MESSAGE')
            //         .then(function (translateValue) {
            //             pasteFwd(translateValue);
            //         }, function (translateValue) {
            //             pasteFwd(translateValue);
            //         });
            // }

            if ($state.params.fwd && $state.params.mbox !== 'Drafts') {
                // if (_.isArray($state.params.ids) && $state.params.ids.length > 1) {
                //     pasteFwdList();
                //     return;
                // }

                copyFwdMessage();
            }

            if ($state.params.re && $state.params.mbox === 'Drafts') {
                vm.sendForm.id = $state.params.id;
                pasteRe();
            }

            if ($state.params.re && $state.params.mbox !== 'Drafts') {
                vm.sendForm.id = $state.params.id;
                copyReMessage();
            }

            pasteSign();
            getConnectionsList();
        }

        function send(form) {
            if (form.$invalid) return;

            var data = getFormattedData();

            if (!data.sdate) {
                data.cmd = 'send';
            }

            if (vm.fwd.checked.length) {
                data.body += pasteListFwd();
            }

            data.mbox = $state.params.mbox || 'Drafts';

            if ($state.params.id) {
                mail.put({id: $state.params.id}, data);
            } else {
                mail.post({}, data);
            }

            $rootScope.$broadcast('notify:message', {
                message: 'EMAIL_SUCCESS_SENT'
            });

            $state.go('mail.inbox', {mbox: 'INBOX'});
        }

        function save(options) {
            options = options || {};

            var data = getFormattedData();

            data.mbox = $state.params.mbox || 'Drafts';

            var result = {};

            if (!vm.sendForm.id) {
                result = mail.post({}, data);
            }

            if (vm.sendForm.id) {
                if ($state.params.template) {
                    data.mbox = $state.params.mbox;
                    data.connection_id = $state.params.connection_id;
                }

                result = mail.put({id: vm.sendForm.id}, data);
            }

            result.then(function (response) {
                if (response.success) {
                    vm.sendForm.id = response.data.id;
                    vm.sendForm.model.date = {
                        date: setNowTime()
                    };

                    if (options.isGoDrafts || $state.params.mbox === 'Drafts') {
                        $state.go('mail.compose', {
                            id: vm.sendForm.id,
                            mbox: 'Drafts',
                            connection_id: vm.user.profile.default_connection_id
                        }, {notify: false});
                    }
                }
            });
        }

        function saveTemplate() {
            var data = getFormattedData();

            data.mbox = 'Drafts';
            data.number = vm.sendForm.id;
            data.connection_id = vm.user.profile.default_connection_id;

            mail.move({}, {
                mboxnew: 'Templates',
                messages: [data]
            }).then(function () {
                $state.go('mail.inbox', {
                    mbox: 'Templates'
                });
            });
        }

        function getMessage() {
            mail.getById({
                id: $state.params.id,
                mbox: $state.params.mbox,
                connection_id: $state.params.connection_id,
                part: 'headnhtml'
            }).then(function (response) {
                vm.sendForm.model = response.data;
                vm.sendForm.model.subject = vm.sendForm.model.Subject;

                if (vm.sendForm.model.to.length) {
                    vm.sendForm.model.to = getEmailSelectFormat({
                        first_name: vm.sendForm.model.to[0].address,
                        email: vm.sendForm.model.to[0].address
                    });
                }

                getConnectionsList();
            });
        }

        function setNowTime() {
            return moment().toDate();
        }

        function getFormattedData() {
            var data = {};

            if (vm.sendForm.model.to) {
                data.to = getMailsFromContact(vm.sendForm.model.to);
            }

            if (vm.sendForm.model.toCopy) {
                data.toCopy = getMailsFromContact(vm.sendForm.model.toCopy);
            }

            if (vm.sendForm.model.toCopyHidden) {
                data.toCopyHidden = getMailsFromContact(vm.sendForm.model.toCopyHidden);
            }

            if (vm.sendForm.model.subject) {
                data.subject = vm.sendForm.model.subject;
            }

            if (vm.sendForm.model.body) {
                data.body = vm.sendForm.model.body;
            }

            if (vm.sendForm.model.sdate) {
                data.sdate = vm.sendForm.model.sdate;
            }

            if (vm.sendForm.model.from_connection) {
                data.from_connection = vm.sendForm.model.from_connection;
            }

            if (vm.sendForm.model.attachmentsData) {
                data.attaches = [];
                _.forEach(vm.sendForm.model.attachmentsData, function (attach) {
                    data.attaches.push(attach.fileName);
                });
            }

            vm.sendForm.model.connection_id = vm.user.profile.default_connection_id;

            return data;
        }

        function getMailsFromContact(data) {
            var to = [];

            _.forEach(data, function (item) {
                if (item.emails) {
                    to.push(item.emails[0].value);
                    return;
                }
                to.push(item.first_name);
            });

            return to;
        }

        function upload(files, invalidFiles) {
            if (vm.sendForm.model.attachmentsData) {
                vm.sendForm.model.attachmentsData = vm.sendForm.model.attachmentsData.concat(
                    getFormattedAttach(files)
                );
            } else {
                vm.sendForm.model.attachmentsData = getFormattedAttach(files);
            }

            vm.isUploading = true;

            $rootScope.$broadcast('mail:isUploading', {isUploading: vm.isUploading});

            mail.upload({
                id: $state.params.id,
                mbox: $state.params.mbox
            }, {}, files).then(function (response) {
                vm.isUploading = false;

                $rootScope.$broadcast('mail:isUploading', {isUploading: vm.isUploading});

                vm.sendForm.id = response.data.data;
                vm.sendForm.model.number = vm.sendForm.id;

                $state.go('mail.compose', {
                    id: response.data.data
                }, {notify: false});

                if (!vm.sendForm.model.attachmentsData) {
                    vm.sendForm.model.attachmentsData = [];
                }

                _.forEach(files, function (file) {
                    file.number = vm.sendForm.id;
                });
            });
        }

        function getFormattedAttach(files) {
            _.forEach(files, function (file) {
                file.number = vm.sendForm.id;
                file.fileName = file.name;
                file.mime = file.type;
            });
            return files;
        }

        function pasteSign() {
            if (vm.user.profile.sign && !vm.sendForm.model.body && !$state.params.fwd && !$state.params.re) {
                vm.sendForm.model.body = '<br><br>' + vm.user.profile.sign;
            }
        }

        function pasteFwdList() {
            var messages = mail.getFwdData();
            console.log('messages fwd', messages);
            _.forEach(messages, function (message) {
                getFwdMessageById(message, messages);
            });
        }

        function getFwdMessageById(message, messages) {
            return mail.getById({
                id: message.number,
                mbox: message.mbox,
                connection_id: message.connection_id,
                part: 'headnhtml'
            }).then(function (response) {
                if (messages.length === 1) {
                    pasteOneFwd(response.data);
                    return;
                }
                vm.fwd.items.push(response.data);
                vm.fwd.checked.push(response.data);
            });
        }

        function pasteFwd(resendTitle) {
            mail.getById({
                id: $state.params.id,
                mbox: $state.params.mbox,
                connection_id: $state.params.connection_id,
                part: 'headnhtml'
            }).then(function (response) {
                var message = response.data;

                var html = '<br><br><br>';
                html += '--------' + resendTitle + '--------<br>';
                html += moment(message.date.date).format('DD.MM.YYYY HH.mm');
                html += ' ';
                html += message.fromAddress || '';
                html += '<br><br>';
                html += message.body + '<br>';
                html += '<br><br>';
                html += vm.user.profile.sign || '';

                vm.sendForm.id = message.number;

                vm.sendForm.model.number = message.number;
                vm.sendForm.model.mbox = message.mbox;
                vm.sendForm.model.connection_id = message.connection_id;
                vm.sendForm.model.attachmentsData = message.attachmentsData;
                vm.sendForm.model.subject = 'Fwd: ';
                vm.sendForm.model.subject += message.Subject || '';
                vm.sendForm.model.body = html;

                // vm.sendForm.model.to = getEmailSelectFormat({
                //     first_name: message.from,
                //     email: message.fromAddress
                // });
            });
        }

        function pasteListFwd() {
            var fwd = '';

            _.forEach(vm.fwd.checked, function (item) {
                fwd += '-------- Пересылаемое сообщение--------<br>';
                fwd += moment(item.date.date).format('DD.MM.YYYY HH.mm');
                fwd += item.from || '';
                fwd += ' <br>';
                fwd += item.body + '<br>';
                fwd += '-------- Конец пересылаемого сообщения --------';
                fwd += '<br><br>';
            });

            return fwd;
        }

        function pasteRe() {
            mail.getById({
                id: $state.params.id,
                mbox: $state.params.mbox,
                connection_id: $state.params.connection_id,
                part: 'headnhtml'
            }).then(function (response) {
                var message = response.data;

                var html = '<br><br><br>';
                html += moment(message.date.date).format('DD.MM.YYYY HH.mm');
                html += ' ';
                html += message.from || '';
                html += ' <br>';
                html += message.body + '<br>';
                html += '<br>';
                html += vm.user.profile.sign || '';

                vm.sendForm.id = message.number;

                vm.sendForm.model.number = message.number;
                vm.sendForm.model.mbox = message.mbox;
                vm.sendForm.model.connection_id = message.connection_id;
                vm.sendForm.model.attachmentsData = message.attachmentsData;
                vm.sendForm.model.subject = 'Re: ';
                vm.sendForm.model.subject += message.Subject || '';
                vm.sendForm.model.body = html;

                vm.sendForm.model.to = getEmailSelectFormat({
                    first_name: message.from,
                    email: message.fromAddress
                });
            });
        }

        function getEmailSelectFormat(data) {
            return [{
                first_name: data.first_name,
                emails: [{
                    value: data.email
                }]
            }];
        }

        function getConnectionsList() {
            vm.connections.items = [];

            var userConnection = {
                id: vm.user.profile.default_connection_id,
                email: vm.user.profile.email,
                sign: vm.user.profile.sign,
                user_name: vm.user.profile.user_name
            };

            vm.connections.items.push(userConnection);

            vm.connections.items = vm.connections.items.concat(vm.user.profile.connections);

            _.forEach(vm.connections.items, function (connection) {
                if (vm.user.profile.selected_connection_id === connection.id) {
                    vm.connections.selected = connection;
                }
            });

            if (!vm.user.profile.selected_connection_id) {
                vm.connections.selected = userConnection;
            }

            vm.sendForm.model.from_connection = vm.connections.selected.id;

            console.log('vm.sendForm.model', vm.sendForm.model);
        }

        function copyReMessage() {
            var data = {
                id: $state.params.id,
                mboxfrom: $state.params.mbox,
                connection_id: $state.params.connection_id,
                cmd: 'reply'
            };
            mail.post({}, data).then(function (response) {
                vm.sendForm.id = response.data.id;

                $state.go('mail.compose', {
                    id: response.data.id,
                    mbox: 'Drafts',
                    connection_id: vm.user.profile.default_connection_id,
                }, {notify: false});

                pasteRe();
            });
        }

        function copyFwdMessage() {
            var data = {
                id: $state.params.id,
                mboxfrom: $state.params.mbox,
                connection_id: $state.params.connection_id,
                cmd: 'forward'
            };

            // console.log('data', data);

            mail.post({}, data).then(function (response) {
                vm.sendForm.id = response.data.id;

                $state.go('mail.compose', {
                    id: response.data.id,
                    mbox: 'Drafts',
                    connection_id: vm.user.profile.default_connection_id
                }, {notify: false});

                $timeout(function () {
                    $translate('SENDING_MESSAGE')
                        .then(function (translateValue) {
                            pasteFwd(translateValue);
                        }, function (translateValue) {
                            pasteFwd(translateValue);
                        });
                }, 250);


                // pasteFwd();
            });
        }

        function close() {
            $interval.cancel(vm.interval);

            if ($state.params.mbox === 'Drafts' || vm.sendForm.id) {
                vm.isMenuBottomOpen = true;
                return;
            }

            $state.go('mail.inbox', {mbox: 'INBOX'});
        }
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
                    url: '/compose?id&mbox&ids&to&connection_id&template&fwd&re',
                    templateUrl: 'app/mail/compose/compose.html',
                    controller: 'ComposeController',
                    controllerAs: 'vm',
                    title: 'Compose'
                }
            },
            {
                state: 'mail.composeDraft',
                config: {
                    url: '/compose?id&mbox&connection_id',
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

    InboxController.$inject = ['$scope', '$state', '$http', '$auth', 'mail', 'mailBox', 'profile', 'messages'];
    /* @ngInject */
    function InboxController($scope, $state, $http, $auth, mail, mailBox, profile, messages) {
        var vm = this;

        vm.user = $auth.user;

        vm.messages = {
            params: {
                'per-page': 10,
                'len': 100,
                'part': 'bodytext'
            },
            defaultParams: {
                'per-page': 10,
                'len': 100,
                'part': 'bodytext'
            },
            searchParams: {},
            checked: []
        };

        vm.folders = {};

        $scope.$on('mail:sync', function () {
            get();
        });

        $scope.$on('mail:inbox:messages:update', function (e, data) {
            // console.log(data);
            vm.messages = data;
            // get();
        });

        $scope.$on('search:mailQuery', function (e, data) {
            console.log('data', data);
            vm.messages.searchParams.search = data.search.search;
            vm.searchQuery = data.search.search;
            vm.messages.isSearch = true;

            if (!vm.messages.searchParams.search_part) {
                vm.messages.searchParams.search_part = 'text';
            }

            get();
        });

        $scope.$on('search:mail', function (e, data) {
            console.log('search:mail', data);
            // vm.messages.params = data.search;
            vm.messages.searchParams = data.search;
            vm.messages.searchParams.search = vm.searchQuery;
            vm.messages.isSearch = true;
            get();
        });

        $scope.$on('search:close', function (e, data) {
            vm.messages.params = angular.copy(vm.messages.defaultParams);
            vm.messages.params.mbox = $state.params.mbox;
            vm.messages.isSearch = false;
            get();
        });

        vm.openTagList = openTagList;
        vm.paginate = paginate;
        vm.clearFolder = clearFolder;

        activate();

        function activate() {
            vm.$state = $state;

            if ($state.params.filter) {
                vm.messages.params.filter = $state.params.filter;
            }

            if ($state.params.mbox) {
                vm.messages.params.mbox = $state.params.mbox;
            }

            if ($state.params.tag_id) {
                vm.messages.params.tag_id = $state.params.tag_id;
            }

            getMailBox();

            console.log('messages', messages.$promise);

            messages.$promise.then(function (response) {
                vm.messages.params.search = null;
                vm.messages.checked = [];
                vm.messages = _.assign(vm.messages, response.data);
                _.forEach(vm.messages.items, function (message) {
                    message.body = message.body ? String(message.body).replace(/<[^>]+>/gm, '') : '';
                });
            });
        }

        function get() {
            vm.messages.isLoading = true;

            var params = {};

            if (vm.messages.isSearch) {
                params = vm.messages.searchParams;
            } else {
                params = vm.messages.params;
            }

            mail.get(params).then(function (response) {
                vm.messages.isLoading = false;
                vm.messages.checked = [];
                vm.messages = _.assign(vm.messages, response.data);
                _.forEach(vm.messages.items, function (message) {
                    message.body = message.body ? String(message.body).replace(/<[^>]+>/gm, '') : '';
                });
            });
        }

        function getMailBox() {
            mailBox.get().then(function (response) {
                vm.folders = _.assign(vm.folders, response.data);
            });
        }

        function openTagList() {
            vm.isOpenTagList = true;
        }

        function paginate() {
            if (vm.messages._links.next && !vm.messages.isLoading) {
                vm.messages.isLoading = true;
                $http.get(vm.messages._links.next.href).then(function (response) {
                    vm.messages.isLoading = false;
                    vm.messages.items = vm.messages.items.concat(response.data.data.items);
                    vm.messages._links = response.data.data._links;
                    vm.messages._meta = response.data.data._meta;

                    console.log('pag', vm.messages);
                });
            }
        }

        function clearFolder(e, folder) {
            e.stopPropagation();
            mail.deleteAll({}, {
                mbox: folder.name,
                connection_id: vm.user.profile.default_connection_id
            }).then(function () {
                get();
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
                    url: '/inbox?mbox&filter&tag_id&attach&search',
                    templateUrl: 'app/mail/inbox/inbox.html',
                    controller: 'InboxController',
                    controllerAs: 'vm',
                    title: 'Inbox',
                    resolve: {
                        messages: function (mail, $stateParams) {
                            var messages = {
                                params: {
                                    'per-page': 10,
                                    'len': 100,
                                    'part': 'bodytext'
                                },
                                checked: []
                            };

                            if ($stateParams.filter) {
                                messages.params.filter = $stateParams.filter;
                            }

                            if ($stateParams.mbox) {
                                messages.params.mbox = $stateParams.mbox;
                            }

                            if ($stateParams.tag_id) {
                                messages.params.tag_id = $stateParams.tag_id;
                            }

                            return mail.get(messages.params);
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
        .module('mail.message')
        .controller('MessageController', MessageController);

    MessageController.$inject = ['mail', '$scope', '$state', '$sce', '$auth', '$stateParams', 'message', 'tag', '$rootScope', '$uibModal', '$timeout'];
    /* @ngInject */
    function MessageController(mail, $scope, $state, $sce, $auth, $stateParams, message, tag, $rootScope, $uibModal, $timeout) {
        var vm = this;

        vm.message = {};

        vm.messages = {
            checked: []
        };

        vm.sendForm = {
            model: {}
        };

        vm.isSendTextOpen = false;

        vm.isFromOpen = false;

        vm.isCloseBanner = true;

        vm.getDate = getDate;
        vm.getTrustHtml = getTrustHtml;
        vm.setUnTag = setUnTag;
        vm.send = send;
        vm.setImportant = setImportant;
        vm.move = move;
        vm.destroy = destroy;
        vm.openMessageMenu = openMessageMenu;
        vm.resolveImage = resolveImage;

        $scope.$on('tag:message:add:success', function (e, data) {
            getTags();
        });

        $scope.$on('tag:message:delete:success', function (e, data) {
            getTags();
        });

        activate();

        /////

        function activate() {
            vm.$state = $state;
            vm.user = $auth.user;
            // getMessage();

            message.$promise.then(function (response) {
                vm.message.model = response.data;
                // vm.message.model = response.data;
                vm.messages.checked.push(vm.message.model);

                $rootScope.$broadcast('mailBox:sync');

                getTags();

                mail.setAnswerData(vm.message.model);

                getPaginateMessage(vm.message.model);
            });
        }

        function getTags() {
            tag.getTagsByMessage({}, {
                mbox: vm.message.model.mbox,
                id: vm.message.model.number,
                connection_id: vm.message.model.connection_id
            }).then(function (response) {
                vm.message.model.tags = response.data;
            })
        }

        function setUnTag(item) {
            var ids = [];

            _.remove(vm.message.model.tags, function (tag) {
                return tag.id === item.id;
            });

            ids.push(vm.message.model.number);

            tag.deleteTagFromMessages({}, {
                messages: [vm.message.model],
                tag_id: item.id
            }).then(function (response) {
                // vm.messages.checked = [];
            });
        }

        function getDate(date) {
            var newDate = new Date(date);
            return moment(newDate).format("MMM Do YY");
        }

        function getTrustHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function send(form) {
            copyReMessage();
            $state.go('mail.inbox', {mbox: 'INBOX'});
        }

        function copyReMessage() {
            var data = {
                id: $state.params.id,
                mboxfrom: $state.params.mbox,
                connection_id: $state.params.connection_id,
                cmd: 'reply'
            };
            mail.post({}, data).then(function (response) {
                pasteRe(response.data.id);
            });
        }

        function pasteRe(id) {
            mail.getById({
                id: id,
                mbox: 'Drafts',
                connection_id: $state.params.connection_id,
                part: 'headnhtml'
            }).then(function (response) {
                var message = response.data;

                var html = '<br><br><br>';
                html += moment(message.date.date).format('DD.MM.YYYY HH.mm');
                html += ' ';
                html += message.from || '';
                html += ' <br>';
                html += message.body + '<br>';
                html += '<br>';
                html += vm.user.profile.sign || '';

                vm.sendForm.id = message.number;

                vm.sendForm.model.number = message.number;
                vm.sendForm.model.mbox = message.mbox;
                vm.sendForm.model.connection_id = message.connection_id;
                vm.sendForm.model.attachmentsData = message.attachmentsData;
                vm.sendForm.model.subject = 'Re: ';
                vm.sendForm.model.subject += message.Subject || '';
                vm.sendForm.model.body += html;

                vm.sendForm.model.to = message.fromAddress;

                var data = getFormattedData();

                console.log('vm.sendForm', data);

                data.cmd = 'send';
                mail.post({}, data).then(function (response) {
                    console.log('response', response);
                });
            });
        }

        function getFormattedData() {
            var data = {};

            if (vm.sendForm.model.to) {
                data.to = vm.sendForm.model.to.split(',');
            }

            if (vm.sendForm.model.toCopy) {
                data.toCopy = vm.sendForm.model.toCopy.split(',');
            }

            if (vm.sendForm.model.toCopyHidden) {
                data.toCopyHidden = vm.sendForm.model.toCopyHidden.split(',');
            }

            if (vm.sendForm.model.subject) {
                data.subject = vm.sendForm.model.subject;
            }

            if (vm.sendForm.model.body) {
                data.body = vm.sendForm.model.body;
            }

            if (vm.sendForm.model.attaches) {
                data.attaches = vm.sendForm.model.attaches;
            }

            vm.sendForm.model.connection_id = vm.user.profile.default_connection_id;
            data.from_connection = vm.user.profile.default_connection_id;

            return data;
        }

        function setImportant() {
            if (vm.message.model.important && !vm.message.model.isLoading) {
                vm.message.isLoading = true;
                mail.deflag({}, {
                    messages: [vm.message.model],
                    flag: 'Flagged'
                }).then(function () {
                    vm.message.isLoading = false;
                });
                vm.message.model.important = !vm.message.model.important;
                return;
            }

            vm.message.isLoading = true;
            mail.flag({}, {
                messages: [vm.message.model],
                flag: 'Flagged'
            }).then(function () {
                vm.message.isLoading = false;
            });
            vm.message.model.important = !vm.message.model.important;
        }

        function move(folder) {
            vm.messages = mail.moveToFolder(folder, vm.messages);
        }

        function destroy() {
            vm.messages = mail.destroy(vm.messages);
            vm.messages = [];
        }

        function openMessageMenu() {
            // vm.messages.checked = [vm.message.model];
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/components/message-menu/message-menu.html',
                controller: 'MessageMenuController',
                controllerAs: 'vm',
                resolve: {
                    message: function () {
                        return vm.message.model;
                    },
                    messages: function () {
                        return vm.messages;
                    }
                },
                size: 'sm',
                windowClass: 'popup'
            });

            modalInstance.result.then(function (response) {
                vm.messages = response.result.messages;
                // console.log('response', response);
            });
        }

        function getPaginateMessage() {
            mail.getById({
                id: $state.params.id,
                mbox: $state.params.mbox,
                connection_id: $state.params.connection_id,
                part: 'head',
                neighbours: 1
            }).then(function (response) {
                vm.paginate = response.data;

                mail.setPaginate(vm.paginate);
            })
        }

        function resolveImage() {
            mail.getById({
                id: $stateParams.id,
                mbox: $stateParams.mbox,
                connection_id: $stateParams.connection_id,
                part: 'headnhtml',
                foreignImages: 1
            }).then(function (response) {
                vm.message.model = response.data;
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
                    url: '/message/:mbox/:id?connection_id',
                    templateUrl: 'app/mail/message/message.html',
                    controller: 'MessageController',
                    controllerAs: 'vm',
                    title: 'Message',
                    resolve: {
                        message: function (mail, $stateParams) {
                            return mail.getById({
                                id: $stateParams.id,
                                mbox: $stateParams.mbox,
                                connection_id: $stateParams.connection_id,
                                part: 'headnhtml'
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
        .module('settings.accounts')
        .controller('AccountsController', AccountsController);

    AccountsController.$inject = ['$scope', 'connection'];
    /* @ngInject */
    function AccountsController($scope, connection) {
        var vm = this;

        vm.isConnected = false;

        vm.accountsConf = {
            isFirst: true,
            selected: null,
            list: [
                {
                    parts: [
                        'seznam.cz',
                        'email.cz',
                        'post.cz'
                    ],
                    imap: 'imap.seznam.cz',
                    port: 993
                },
                {
                    parts: [
                        'gmail.com'
                    ],
                    imap: 'imap.gmail.com',
                    port: 993
                },
                {
                    parts: [
                        'volny.cz'
                    ],
                    imap: 'imap.volny.cz',
                    port: 993
                },
                {
                    parts: [
                        'centrum.cz'
                    ],
                    imap: 'imap.centrum.cz',
                    port: 993
                },
                {
                    parts: [
                        'centrum.cz'
                    ],
                    imap: 'imap.centrum.cz',
                    port: 993
                },
                {
                    parts: [
                        'tiscali.cz',
                        'wo.cz'
                    ],
                    imap: 'imap.tiscali.cz',
                    port: 993
                }
            ]
        };

        vm.accountForm = {
            model: {
                enable: 0
            }
        };

        vm.accounts = {
            items: []
        };

        // $scope.$watch('vm.accountForm.model.email', function (data, oldData) {
        //     console.log('data', data);
        //     _.forEach(vm.accountsConf, function (item) {
        //         console.log('find', _.find(item, data));
        //     });
        //
        //     // accountsConf();
        // }, true);

        vm.create = create;
        vm.destroy = destroy;
        vm.enableTrigger = enableTrigger;
        vm.getConf = getConf;

        activate();

        function activate() {
            get();
        }

        function get() {
            connection.get()
                .then(function (response) {
                    vm.accounts.items = response.data;
                });
        }

        function create() {
            connection.create({}, vm.accountForm.model)
                .then(function (response) {
                    vm.isConnected = true;

                    vm.accounts.items.push(response.data);

                    vm.accountForm = {
                        model: {
                            enabled: false
                        }
                    };

                    vm.error = {};

                }, function (response) {
                    vm.error = response.data.data;
                    console.log('response', response);
                });
        }

        function enableTrigger(account) {
            console.log('account', account);
            connection.update({id: account.id}, {enable: account.enable})
                .then(function (response) {
                    // account.enable = !account.enable;
                });
        }

        function destroy(account) {
            connection.destroy({id: account.id})
                .then(function (response) {
                    _.remove(vm.accounts.items, function (item) {
                        return account.id === item.id;
                    });
                });
        }

        function getConf(form) {
            vm.accountsConf.selected = null;

            vm.accountsConf.isFirst = false;

            if (form.email.$invalid) return;

            var emailPart = vm.accountForm.model.email.split('@');

            _.forEach(vm.accountsConf.list, function (item) {
                _.forEach(item.parts, function (part) {
                    if (part === emailPart[1]) {
                        vm.accountsConf.selected = item;
                    }
                });
            });

            if (vm.accountsConf.selected) {
                vm.accountForm.model.login = vm.accountForm.model.email.split('@')[0];
                vm.accountForm.model.server = vm.accountsConf.selected.imap;
                vm.accountForm.model.port = vm.accountsConf.selected.port.toString();
                return;
            }

            vm.accountForm.model.login = emailPart[0];
            vm.accountForm.model.server = '';
            vm.accountForm.model.port = '';

            // vm.accountsConf.selected = null;

            console.log('vm.accountsConf.selected', vm.accountsConf.selected);
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('settings.accounts')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'settings.accounts',
                config: {
                    url: '/accounts',
                    templateUrl: 'app/settings/accounts/accounts.html',
                    controller: 'AccountsController',
                    controllerAs: 'vm',
                    title: 'Rules'
                }
            }
        ];
    }
})();

(function () {
    'use strict';

    angular
        .module('settings.contacts')
        .controller('СontactsController', СontactsController);

    СontactsController.$inject = ['$uibModal', '$translatePartialLoader', '$translate'];
    /* @ngInject */
    function СontactsController($uibModal, $translatePartialLoader, $translate) {
        var vm = this;

        $translatePartialLoader.addPart('settings');
        $translate.refresh();

        vm.openContactImportFilePopup = openContactImportFilePopup;
        vm.openContactExportFilePopup = openContactExportFilePopup;

        function openContactImportFilePopup() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/components/contact-import-file/contact-import-file-popup.html',
                controller: ["$scope", "$uibModalInstance", function ($scope, $uibModalInstance) {
                    $scope.cancel = cancel;

                    function cancel() {
                        $uibModalInstance.dismiss('cancel');
                    }
                }],
                size: 'sm',
                windowClass: 'popup popup--contact-import-file'
            });
        }

        function openContactExportFilePopup() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/components/contact-export-file/contact-export-file-popup.html',
                controller: ["$scope", "$uibModalInstance", function ($scope, $uibModalInstance) {
                    $scope.cancel = cancel;

                    function cancel() {
                        $uibModalInstance.dismiss('cancel');
                    }
                }],
                size: 'sm',
                windowClass: 'popup popup--contact-import-file'
            });
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('settings.contacts')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'settings.contacts',
                config: {
                    url: '/contacts',
                    templateUrl: 'app/settings/contacts/contacts.html',
                    controller: 'СontactsController',
                    controllerAs: 'vm',
                    title: 'Сontacts'
                }
            }
        ];
    }
})();

(function () {
    'use strict';

    angular
        .module('settings.folders')
        .controller('FoldersController', FoldersController);

    FoldersController.$inject = ['$scope', '$auth', '$state', '$uibModal', 'mailBox', 'mail'];
    /* @ngInject */
    function FoldersController($scope, $auth, $state, $uibModal, mailBox, mail) {
        var vm = this;

        vm.standartFolders = [
            {
                name: 'INBOX',
                icon: 'icon-inbox-old'
            },
            {
                name: 'Drafts',
                icon: 'icon-draft-line'
            },
            {
                name: 'Trash',
                icon: 'icon-basket'
            },
            {
                name: 'Sent',
                icon: 'icon-sent-old'
            },
            {
                name: 'Junk',
                icon: 'icon-spam'
            },
            {
                name: 'Outbox',
                icon: 'icon-spam'
            }
        ];

        vm.folders = {};


        vm.openFolderCreatePopup = openFolderCreatePopup;
        vm.openFolderEditPopup = openFolderEditPopup;
        vm.move = move;
        vm.destroy = destroy;
        vm.openFolderDeleteConfirmPopup = openFolderDeleteConfirmPopup;
        vm.openFolderClearConfirmPopup = openFolderClearConfirmPopup;


        $scope.$on('mailBox:update:success', function () {
            getMailBox();
        });

        $scope.$on('mailBox:create:success', function () {
            getMailBox();
        });

        $scope.$on('mailBox:destroy:success', function () {
            getMailBox();
        });

        activate();

        /////

        function activate() {
            vm.$state = $state;
            vm.user = $auth.user;
            getMailBox();
        }

        function getMailBox() {
            mailBox.get().then(function (response) {
                vm.folders = _.assign(vm.folders, response.data);
                getMailBoxFormatted();
            });
        }

        function getMailBoxFormatted() {
            _.forEach(vm.folders.items, function (folder) {
                var isSub = true;

                _.forEach(vm.standartFolders, function (standartFolder) {
                    if (folder.name === standartFolder.name) {
                        isSub = false;
                    }
                });

                if (isSub) {
                    folder.isSub = true;
                } else {
                    folder.isSub = false;
                }
            });

            sortFolder();
        }

        function sortFolder() {
            vm.folders.items = _.sortBy(vm.folders.items, 'caption').reverse();
            vm.folders.items = _.sortBy(vm.folders.items, [
                {'name': 'INBOX'},
                {'isSub': true},
                {'name': 'Sent'},
                {'name': 'Trash'},
                {'name': 'Junk'},
                {'name': 'Drafts'},
                {'name': 'Outbox'}
            ]).reverse();
        }

        function move(folder) {
            var ids = [];

            _.forEach(vm.messages.checked, function (message) {
                ids.push(message.number);
            });

            mail.move({}, {
                ids: ids,
                mbox: vm.messages.checked[0].mbox,
                mboxnew: folder.name
            }).then(function (response) {
                vm.messages.checked = [];
                $scope.$emit('mail:sync');
            });
        }

        function openFolderCreatePopup() {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/components/folder-create/folder-create-popup.html',
                controller: ["$scope", "$uibModalInstance", function ($scope, $uibModalInstance) {
                    $scope.cancel = cancel;

                    function cancel() {
                        $uibModalInstance.dismiss('cancel');
                    }
                }],
                size: 'sm',
                windowClass: 'popup popup--folder-create'
            });
        }

        function openFolderEditPopup(folder) {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/components/folder-edit/folder-edit-popup.html',
                controller: ["$scope", "$uibModalInstance", "model", function ($scope, $uibModalInstance, model) {
                    $scope.model = model;

                    $scope.cancel = cancel;

                    function cancel() {
                        $uibModalInstance.dismiss('cancel');
                    }
                }],
                resolve: {
                    model: function () {
                        return folder;
                    }
                },
                size: 'sm',
                windowClass: 'popup popup--folder-create'
            });
        }

        function destroy(folder) {
            mailBox.destroy({}, {
                mbox: folder.name
            });
        }

        function clearFolder(folder) {
            console.log('v', folder);
            mail.deleteAll({}, {
                mbox: folder.name,
                connection_id: vm.user.profile.default_connection_id
            }).then(function () {
                getMailBox();
            });
        }

        function openFolderDeleteConfirmPopup(folder) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/components/folder-delete-confirm/folder-delete-confirm-popup.html',
                controller: ["$scope", "$uibModalInstance", "folderResolve", function ($scope, $uibModalInstance, folderResolve) {
                    $scope.cancel = cancel;
                    $scope.close = close;

                    $scope.folder = folderResolve;

                    function cancel() {
                        $uibModalInstance.dismiss('cancel');
                    }

                    function close(data) {
                        $uibModalInstance.close(data);
                    }
                }],
                size: 'sm',
                resolve: {
                    folderResolve: function () {
                        return folder;
                    }
                },
                windowClass: 'popup popup--folder-create'
            });

            modalInstance.result.then(function (response) {
                destroy(folder);
            });
        }

        function openFolderClearConfirmPopup(folder) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/components/folder-clear-confirm/folder-clear-confirm-popup.html',
                controller: ["$scope", "$uibModalInstance", "folderResolve", function ($scope, $uibModalInstance, folderResolve) {
                    $scope.cancel = cancel;
                    $scope.close = close;

                    $scope.folder = folderResolve;

                    function cancel() {
                        $uibModalInstance.dismiss('cancel');
                    }

                    function close(data) {
                        $uibModalInstance.close(data);
                    }
                }],
                size: 'sm',
                resolve: {
                    folderResolve: function () {
                        return folder;
                    }
                },
                windowClass: 'popup popup--folder-create'
            });

            modalInstance.result.then(function (response) {
                clearFolder(folder);
            });
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('settings.folders')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'settings.folders',
                config: {
                    url: '/folders',
                    templateUrl: 'app/settings/folders/folders.html',
                    controller: 'FoldersController',
                    controllerAs: 'vm',
                    title: 'Tags'
                }
            }
        ];
    }
})();

(function () {
    'use strict';

    angular
        .module('settings.main')
        .controller('SettingsMainController', SettingsMainController);

    SettingsMainController.$inject = ['$uibModal', '$sce', '$auth', 'profile'];
    /* @ngInject */
    function SettingsMainController($uibModal, $sce, $auth, profile) {
        var vm = this;

        vm.openAvatarUploadPopup = openAvatarUploadPopup;
        vm.openPasswordChangePopup = openPasswordChangePopup;
        // vm.openEmailChangePopup = openEmailChangePopup;
        vm.openEmailAddPopup = openEmailAddPopup;
        vm.openPhoneChangePopup = openPhoneChangePopup;
        vm.destroy = destroy;
        vm.getTrustHtml = getTrustHtml;
        vm.updateSign = updateSign;
        vm.removeAvatar = removeAvatar;
        vm.destroyEmail = destroyEmail;

        activate();

        ////

        function activate() {
            vm.user = $auth.user;
        }

        function openAvatarUploadPopup() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/components/avatar-upload/avatar-upload-popup.html',
                controller: ["$scope", "$uibModalInstance", function ($scope, $uibModalInstance) {
                    $scope.cancel = cancel;

                    function cancel() {
                        $uibModalInstance.dismiss('cancel');
                    }
                }],
                size: 'sm',
                windowClass: 'popup popup--avatar-upload'
            });
        }

        function openPasswordChangePopup() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/components/password-change/password-change-popup.html',
                controller: ["$scope", "$uibModalInstance", function ($scope, $uibModalInstance) {
                    $scope.cancel = cancel;

                    function cancel() {
                        $uibModalInstance.dismiss('cancel');
                    }
                }],
                size: 'sm',
                windowClass: 'popup popup--password-change'
            });
        }

        function openEmailAddPopup() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/components/email-add/email-add-popup.html',
                controller: ["$scope", "$uibModalInstance", function ($scope, $uibModalInstance) {
                    $scope.cancel = cancel;
                    $scope.close = close;

                    function cancel() {
                        $uibModalInstance.dismiss('cancel');
                    }

                    function close() {
                        $uibModalInstance.close();
                    }
                }],
                size: 'sm',
                windowClass: 'popup popup--email-change'
            });

            modalInstance.result.then(function (response) {
                // console.log('response', response);
                profile.get().then(function () {
                    vm.user = $auth.user;
                });
            });
        }

        function openPhoneChangePopup() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/components/phone-change/phone-change-popup.html',
                controller: ["$scope", "$uibModalInstance", function ($scope, $uibModalInstance) {
                    $scope.cancel = cancel;

                    function cancel() {
                        $uibModalInstance.dismiss('cancel');
                    }
                }],
                size: 'sm',
                windowClass: 'popup popup--phone-change'
            });
        }

        function removeAvatar() {
            profile.put({}, {photo: null});
        }

        function destroy() {
            profile.destroy();
        }

        function getTrustHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function updateSign() {
            vm.user.profile.sign = vm.signature ? vm.signature : '';

            var data = {};

            data.sign = '-- <br>' + angular.copy(vm.user.profile.sign);

            profile.put({}, data);
        }

        function destroyEmail() {
            profile.put({}, {
                deleteAdditionalEmails: 1
            });
        }
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
                    controller: 'SettingsMainController',
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
        .module('settings.rules')
        .controller('RulesController', RulesController);

    RulesController.$inject = ['$state', 'sieve'];
    /* @ngInject */
    function RulesController($state, sieve) {
        var vm = this;

        vm.$state = $state;

        vm.sieve = {
            items: []
        };

        vm.remove = remove;
        vm.enableTrigger = enableTrigger;

        activate();

        function activate() {

            if (vm.$state.params.id) {
                return
            }

            get();
        }

        function get() {
            sieve.get().then(function (response) {
                vm.sieve.items = response.data;
            });
        }

        function remove(rule) {
            sieve.destroy({id: rule.id}).then(function(response) {
                get();
            });
        }

        function enableTrigger(rule) {
            sieve.put({id: rule.id}, {enable: rule.enable}).then(function(response) {
                // get();
            });
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('settings.rules')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'settings.rules',
                config: {
                    url: '/rules',
                    templateUrl: 'app/settings/rules/rules.html',
                    controller: 'RulesController',
                    controllerAs: 'vm',
                    title: 'Rules'
                }
            }
        ];
    }
})();

(function () {
    'use strict';

    angular
        .module('settings.ruleAdd')
        .controller('RuleAddController', RuleAddController);

    RuleAddController.$inject = ['sieve', '$state', 'mailBox', 'tag'];
    /* @ngInject */
    function RuleAddController(sieve, $state, mailBox, tag) {
        var vm = this;

        vm.$state = $state;

        vm.tags = {};

        vm.folders = {};

        vm.standartFolders = [
            {
                name: 'INBOX',
                icon: 'icon-inbox-old'
            },
            {
                name: 'Drafts',
                icon: 'icon-draft-line'
            },
            {
                name: 'Trash',
                icon: 'icon-basket'
            },
            {
                name: 'Sent',
                icon: 'icon-sent-old'
            },
            {
                name: 'Junk',
                icon: 'icon-spam'
            },
            {
                name: 'Outbox',
                icon: 'icon-up'
            },
            {
                name: 'Archive',
                icon: 'icon-up'
            },
            {
                name: 'Templates',
                icon: 'icon-up'
            }
        ];

        vm.spamAccept = {
            list: [
                {
                    name: 'RULE_FOR_ONLY_SPAM',
                    value: 'only'
                },
                {
                    name: 'RULE_ALL_NOT_SPAM',
                    value: 'except'
                },
                {
                    name: 'RULE_ALL_MAILS',
                    value: 'include'
                }
            ]
        };

        vm.attachmentAccept = {
            list: [
                {
                    name: 'RULE_IS_ALL_ATTACH',
                    value: 'all'
                },
                {
                    name: 'RULE_IS_ATTACH',
                    value: 'with'
                },
                {
                    name: 'RULE_IS_NOT_ATTACH',
                    value: 'without'
                }
            ]
        };

        vm.sieveRules = {
            list: [
                {
                    name: 'NAME_OF_ATTACHMENT',
                    value: 'attachment'
                },
                {
                    name: 'BODY_LETTER',
                    value: 'body'
                },
                {
                    name: 'IS_COPY',
                    value: 'copy'
                },
                {
                    name: 'FROM_WHOM_U',
                    value: 'from'
                },
                {
                    name: 'HEADER',
                    value: 'header',
                    options: {
                        "header": "some header"
                    }
                },
                {
                    name: 'SUBJECT',
                    value: 'subject'
                },
                {
                    name: 'TO',
                    value: 'to'
                },
                {
                    name: 'TO_WHOM_OR_COPY',
                    value: 'to_copy'
                }
            ]
        };

        vm.compareTypes = {
            list: [
                {
                    name: 'CONTAINS',
                    value: 'contain'
                },
                {
                    name: 'MATCHES',
                    value: 'match'
                },
                {
                    name: 'NOT_CONTAINS',
                    value: 'not_contain'
                },
                {
                    name: 'NOT_MATCHES',
                    value: 'not_match'
                }
            ]
        };

        vm.ruleForms = [
            {
                "type": "attachment",
                "compare_type": "match",
                "value": "example@example.com"
            }
        ];

        vm.sieveActions = {
            move: {
                type: 'move'
            },
            flag: {
                type: 'flag'
            },
            resend: {
                type: 'resend'
            },
            notify: {
                type: 'notify'
            },
            answer: {
                type: 'answer'
            },
            option: {
                type: 'option'
            }
        };

        vm.sieve = {
            model: {}
        };

        vm.sieveForm = {
            model: {
                sieveRules: []
            }
        };

        vm.addRule = addRule;
        vm.removeRule = removeRule;
        vm.update = update;
        vm.add = add;
        // vm.getFolders = getFolders;
        // vm.getTags = getTags;

        activate();

        function activate() {
            if (vm.$state.params.id) {
                getById();
            }

            if (vm.$state.params.subject) {
                vm.sieveForm.model.sieveRules.push({
                    "type": "from",
                    "compare_type": "match",
                    "value": vm.$state.params.subject
                });

                vm.sieveActions.move = {"type": "move", "value": "Junk"};
            }

            if (vm.$state.params.email) {
                vm.sieveForm.model.sieveRules.push({
                    "type": "from",
                    "compare_type": "match",
                    "value": vm.$state.params.email
                });
            }

            if (vm.$state.params.subject || vm.$state.params.email) {
                vm.sieveForm.model.sieveActions = [{"type": "move", "value": "Junk"}];
            }

            if (vm.$state.params.folder) {
                vm.sieveActions.move = {
                    "type": "move",
                    "value": vm.$state.params.folder
                };

                vm.sieveForm.model.sieveActions = [{
                    "type": "move",
                    "value": vm.$state.params.folder
                }];
            }

            getTags();
            getFolders();
        }

        function setSieveActions() {
            _.forEach(vm.sieveActions, function (item) {
                _.forEach(vm.sieveForm.model.sieveActions, function (itemServer) {
                    if (itemServer.type === item.type) {
                        item.value = itemServer.value;
                    }
                });
            });
        }

        function getById() {
            sieve.getById({id: vm.$state.params.id}).then(function (response) {
                vm.sieve.model = response.data;
                vm.sieveForm.model = response.data;

                setSieveActions();
            });
        }

        function addRule() {
            vm.sieveForm.model.sieveRules.push({
                "type": "",
                "compare_type": "",
                "value": ""
            });
        }

        function removeRule(rule) {
            _.remove(vm.sieveForm.model.sieveRules, function (item) {
                return rule === item;
            });
        }

        function add(sieveForm) {
            console.log('sieveForm', sieveForm);

            // if (sieveForm.$invalid) return;

            sieve.post({}, vm.sieveForm.model).then(function () {
                vm.$state.go('settings.rules');
            }, function (response) {
                vm.sieveForm.errors = response.data.data;
            });
        }

        function update(sieveForm) {
            console.log('sieveForm', sieveForm);

            // if (sieveForm.$invalid) return;

            sieve.put({}, vm.sieveForm.model).then(function () {
                vm.$state.go('settings.rules');
            }, function (response) {
                vm.sieveForm.errors = response.data.data;
            });
        }

        function getFolders() {
            mailBox.get().then(function (response) {
                vm.folders = response.data;

                getMailBoxFormatted();
            });
        }

        function getTags() {
            tag.get().then(function (response) {
                vm.tags.items = response.data;
            });
        }

        function getMailBoxFormatted() {
            _.forEach(vm.folders.items, function (folder) {
                var isSub = true;

                _.forEach(vm.standartFolders, function (standartFolder) {
                    if (folder.name == standartFolder.name) {
                        isSub = false;
                    }
                });

                if (isSub) {
                    folder.isSub = true;
                } else {
                    folder.isSub = false;
                }

                if (folder.name === 'INBOX') {
                    folder.isOpen = true;
                }
            });

            sortFolder();
        }

        function sortFolder() {
            _.remove(vm.folders.items, function (item) {
                return item.name === 'INBOX';
            });

            vm.folders.items = _.sortBy(vm.folders.items, [
                {'isSub': true},
                {'name': 'INBOX'},
                {'name': 'Sent'},
                {'name': 'Trash'},
                {'name': 'Junk'},
                {'name': 'Drafts'},
                {'name': 'Outbox'},
                {'name': 'Archive'},
                {'name': 'Templates'}
            ]).reverse();
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('settings.ruleAdd')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'settings.ruleAdd',
                config: {
                    url: '/rule-add?id&subject&email&folder',
                    templateUrl: 'app/settings/rule-add/rule-add.html',
                    controller: 'RuleAddController',
                    controllerAs: 'vm',
                    title: 'Rules'
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

    TagsController.$inject = ['$scope', '$state', '$uibModal', 'tag'];
    /* @ngInject */
    function TagsController($scope, $state, $uibModal, tag) {
        var vm = this;

        vm.tags = {};

        vm.selected = null;

        vm.openTagCreatePopup = openTagCreatePopup;
        vm.openTagEditPopup = openTagEditPopup;
        vm.select = select;
        vm.destroy = destroy;

        $scope.$on('tag:update:success', function () {
            get();
        });

        $scope.$on('tag:create:success', function () {
            get();
        });

        $scope.$on('tag:destroy:success', function () {
            get();
        });

        /////

        activate();

        function activate() {
            vm.$state = $state;
            get();
        }

        function get() {
            tag.get().then(function (response) {
                vm.tags.items = response.data;
            });
        }

        function openTagCreatePopup() {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/components/tag-create/tag-create-popup.html',
                controller: ["$scope", "$uibModalInstance", function ($scope, $uibModalInstance) {
                    $scope.cancel = cancel;

                    function cancel() {
                        $uibModalInstance.dismiss('cancel');
                    }
                }],
                size: 'sm',
                windowClass: 'popup popup--folder-create'
            });
        }

        function openTagEditPopup() {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/components/tag-edit/tag-edit-popup.html',
                controller: ["$scope", "$uibModalInstance", "model", function ($scope, $uibModalInstance, model) {
                    $scope.model = model;

                    $scope.cancel = cancel;

                    function cancel() {
                        $uibModalInstance.dismiss('cancel');
                    }
                }],
                resolve: {
                    model: function () {
                        return vm.selected;
                    }
                },
                size: 'sm',
                windowClass: 'popup popup--folder-create'
            });
        }

        function select(tagItem) {
            _.forEach(vm.tags.items, function (item) {
                item.isSelected = false;
            });

            tagItem.isSelected = true;
            vm.selected = tagItem;
        }

        function destroy() {
            tag.destroy({id: vm.selected.id}, {});
            _.remove(vm.tags.items, function(item) {
                return item.id == vm.selected.id;
            });
        }
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
$templateCache.put('app/mail/mail.html','<div class="main-layout"><section class="main-layout__header"><header folder="vm.folder"></header><!-- \u041E\u0441\u043D\u043E\u0432\u043D\u043E\u0435 \u043C\u0435\u043D\u044E--><nav class="main-layout__menu" ng-class="{\'main-layout__menu--is-active-menu\': isOpenMenu}"><div class="main-layout__menu-content"><menu-main></menu-main></div><button class="main-layout__menu-closer btn--not-events btn--not-style" type="button" ng-click="vm.closeMenu()"></button></nav></section><main class="main-layout__inner"><!--layout-height --><ui-view class=""></ui-view></main></div><div class="menu-bottom-bg" ng-if="isMenuBottomOpen"></div>');
$templateCache.put('app/settings/settings.html','<section class="main-layout"><div class="main-layout__header"><header folder="vm.folder"></header><!-- \u041C\u0435\u043D\u044E \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043A--><div class="main-layout__menu main-layout__menu--settings" ng-class="{\'main-layout__menu--is-active-menu\': isOpenSettingsMenu}"><div class="main-layout__menu-content"><menu-settings></menu-settings></div><button class="main-layout__menu-closer btn--not-events btn--not-style" type="button" ng-click="vm.closeSettingsMenu()"></button></div></div><div class="main-layout__inner wrap-content"><ui-view></ui-view></div></section>');
$templateCache.put('app/auth/password-update/password-update.html','<div class="auth-layout"><div class="password-reset-layout__content"><div class="password-reset-layout__form"><div class="card card--black"><div class="auth-form"><div class="main-title-text text-center color--white">{{ \'ACCESS_RECOVERY_STEP_2\' | translate }}<br>{{ vm.username }}@mail.{{ vm.CONFIG.domainZone }}</div><hr><div class="text-center mrg--b30 color--white" ng-if="vm.step === 1" ng-bind-html="\'ENTER_PHONE_OR_EMAIL\' | translate"></div><div class="text-center mrg--b30 color--white" ng-if="vm.step === 2"><div ng-if="vm.isEmail(vm.passwordResetForm.model.mail_or_phone)">{{ \'ENTER_MAIL_CODE\' | translate }}</div><div ng-if="!vm.isEmail(vm.passwordResetForm.model.mail_or_phone)">{{ \'ENTER_PHONE_CODE\' | translate }}</div></div><form class="form form--dark form--validation" name="passwordResetForm" ng-if="vm.step === 1" ng-submit="vm.requestPasswordReset(passwordResetForm)" novalidate><div class="form__field-item mrg--b6"><div class="field-style"><div class="field-style__group flex align-items--cn"><label class="mrg--r20 color--white">{{ \'PHONE_OR_EMAIL\' | translate }}:</label><input class="input input--size_l input--up-shadow width--inh" type="text" name="mail_or_phone" ng-model="vm.passwordResetForm.model.mail_or_phone" required></div><validation-errors data="passwordResetForm.mail_or_phone" server="vm.passwordResetForm.errors" messages="vm.passwordResetForm.validations.mail_or_phone"></validation-errors></div></div><!-- \u043A\u043D\u043E\u043F\u043A\u0430 \u0414\u0430\u043B\u0435\u0435 --><div class="form__field-item mrg--t25"><div class="field-style"><button class="btn btn--size_l btn--yellow width--inh" type="submit">{{ \'CONTINUE\' | translate }}</button></div></div></form><form class="form" name="userForm" ng-submit="vm.resetPassword(userForm)" ng-if="vm.step === 2" novalidate><div class="form__field-item mrg--b6"><div class="field-style"><div class="field-style__group"><input class="input input--size_l width--inh input--up-shadow font__center" type="text" name="code" ng-model="vm.userForm.model.code" placeholder="{{ \'INPUT_PLACEHOLDER_ENTER_SMS_CODE\' | translate }} " required><validation-errors data="userForm.code" server="vm.userForm.errors" messages="vm.userForm.validations.code"></validation-errors></div></div></div><!-- \u041F\u0430\u0440\u043E\u043B\u044C--><div class="form__field-item mrg--b6"><div class="field-style"><div class="field-style__group"><input class="input input--size_l width--inh input--up-shadow font__center" type="password" name="newpassword" ng-model="vm.userForm.model.newpassword" placeholder="{{ \'INPUT_PLACEHOLDER_ENTER_NEW_PASSWORD\' | translate }}" required><validation-errors data="userForm.newpassword" server="vm.userForm.errors" messages="vm.userForm.validations.newpassword"></validation-errors></div></div></div><!-- \u041F\u0430\u0440\u043E\u043B\u044C 2--><div class="form__field-item"><div class="field-style"><div class="field-style__group"><input class="input input--size_l width--inh input--up-shadow font__center" type="password" name="passwordConf" ng-model="vm.userForm.model.passwordConf" placeholder="{{ \'INPUT_PLACEHOLDER_CONFIRM_NEW_PASSWORD\' | translate }}" required><validation-errors data="userForm.passwordConf" server="vm.userForm.errors" messages="vm.userForm.validations.passwordConf"></validation-errors></div></div></div><div class="validation mrg--b10 text-center"><div class="validation__message validation__message--red">{{ vm.error.message }}</div></div><!-- \u043A\u043D\u043E\u043F\u043A\u0430 \u0414\u0430\u043B\u0435\u0435 --><div class="form__field-item mrg--t25"><div class="field-style"><button class="btn btn--size_l btn--yellow width--inh" type="submit">{{ \'BTN_SAVE_AND_CONTINUE\' | translate }}</button></div></div></form></div></div></div><!-- \u0444\u0443\u0442\u0442\u0435\u0440 \u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438--><div class="footer footer__auth"><!-- \u041A\u043E\u043F\u0438\u0440\u0430\u0439\u0442--><div class="footer__copyright"><span class="">\xA9 2001\u20142017 \xABMail.{{ vm.CONFIG.domainZone }}\xBB Group a.s.</span></div><!-- \u041E\u0441\u043D\u043E\u0432\u043D\u043E\u0435 \u043C\u0435\u043D\u044E--><div class="footer__menu"><div class="navigation"><div class="navigation__row"><div class="navigation__item"><!--<a class="navigation__link navigation__link&#45;&#45;footer-a" href="">\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B</a>--></div></div></div></div><!-- \u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0435 \u043C\u0435\u043D\u044E \u0441 \u0432\u044B\u0431\u043E\u0440\u043E\u043C \u044F\u0437\u044B\u043A\u0430--><div class="footer__right-menu mrg--f-right"><div class="navigation"><div class="navigation__row"><div class="navigation__item pos--rel width--size28"><!-- \u042F\u0437\u044B\u043A\u043E\u0432\u043E\u0435 \u043C\u0435\u043D\u044E--><choice-language></choice-language></div><!--<div class="navigation__item"><a class="navigation__link" href="">{{ \'CONTACTS\' | translate }}</a></div>--><!--<div class="navigation__item"><a class="navigation__link" href="">\u0420\u0435\u043A\u043B\u0430\u043C\u0430</a></div>--></div></div></div></div></div><div class="auth-layout__bg"></div></div>');
$templateCache.put('app/auth/password-reset/password-reset.html','<div class="password-reset-layout"><div class="password-reset-layout__content"><div class="password-reset-layout__form"><div class="card card--black"><div class="auth-form"><div class="auth-form__logo mrg--b16"><a href="{{ vm.CONFIG.parentHost }}"><img class="img-responsive mrg--auto" src="/images/domains/{{ vm.CONFIG.domainZone }}/logo-mail-white.svg" style="width: 141px" logo-hover></a></div><div class="auth-form__title">{{ \'ACCESS_RECOVERY\' | translate }}<!--<div class="main-title-text color&#45;&#45;white">{{ \'ACCESS_RECOVERY\' | translate }}</div>--></div><form class="form form--dark form--validation mrg--t20" name="userForm" ng-submit="vm.preRequestPasswordReset(userForm)" novalidate><!-- \u0412\u0430\u0448 \u043C\u0430\u0439\u043B--><div class="field-style"><label class="field-style__title font--size13 mrg--t30 mrg--b10">{{ \'AUTH_SPECIFY_LOGIN\' | translate }}</label><div class="field-style__group pdd--b20"><input class="input input--size_l input--up-shadow input--focus-icon width--inh font--size12" type="text" name="username" ng-model="vm.userForm.model.username" placeholder="{{ \'INPUT_PLACEHOLDER_LOGIN_OR_EMAIL\' | translate }}" required><validation-errors ng-if="userForm.$submitted" data="userForm.username" server="vm.userForm.errors" messages="vm.userForm.validations.username" class="validation--form-auth validation--top-no-radius"></validation-errors><!-- <div class="validation">\n                                     <div class="validation__message validation__message&#45;&#45;red">\n                                         \u042D\u0442\u043E \u0438\u043C\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u0443\u0436\u0435 \u0437\u0430\u043D\u044F\u0442\u043E. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435\n                                         \u0434\u0440\u0443\u0433\u043E\u0435\n                                     </div>\n                                 </div>--></div><div class="flex mrg--t30 mrg--b10"><button class="btn btn--size_l btn--yellow mrg--auto" type="submit">{{ \'BTN_FURTHER\' | translate }}</button></div></div></form></div></div></div><!-- \u0444\u0443\u0442\u0442\u0435\u0440 \u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438--><div class="footer footer__auth"><!-- \u041A\u043E\u043F\u0438\u0440\u0430\u0439\u0442--><div class="footer__copyright"><span class="">\xA9 2001\u20142017 \xABMail.{{ vm.CONFIG.domainZone }}\xBB Group a.s.</span></div><!-- \u041E\u0441\u043D\u043E\u0432\u043D\u043E\u0435 \u043C\u0435\u043D\u044E--><div class="footer__menu"><div class="navigation"><div class="navigation__row"><div class="navigation__item"><!--<a class="navigation__link navigation__link&#45;&#45;footer-a" href="">\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B</a>--></div></div></div></div><!-- \u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0435 \u043C\u0435\u043D\u044E \u0441 \u0432\u044B\u0431\u043E\u0440\u043E\u043C \u044F\u0437\u044B\u043A\u0430--><div class="footer__right-menu mrg--f-right"><div class="navigation"><div class="navigation__row"><div class="navigation__item pos--rel width--size28"><!-- \u042F\u0437\u044B\u043A\u043E\u0432\u043E\u0435 \u043C\u0435\u043D\u044E--><choice-language></choice-language></div><!--<div class="navigation__item"><a class="navigation__link" href="">{{ \'CONTACTS\' | translate }}</a></div>--><!--<div class="navigation__item"><a class="navigation__link" href="">\u0420\u0435\u043A\u043B\u0430\u043C\u0430</a></div>--></div></div></div></div></div><div class="auth-layout__bg"></div></div>');
$templateCache.put('app/auth/sign-in/sign-in.html','<div class="auth-layout"><div class="auth-layout__content"><div class="auth-layout__form"><div class="card card--black"><div class="text-center" ng-if="vm.isTokenAuthLoading"><spinner is-global="false" is-open="true"></spinner></div><div class="auth-form" ng-if="!vm.isTokenAuthLoading"><div class="auth-form__logo mrg--b16"><a href="{{ vm.CONFIG.parentHost }}"><img class="img-responsive mrg--auto" src="/images/domains/{{ vm.CONFIG.domainZone }}/logo-mail-white.svg" style="width: 141px" logo-hover></a><hr class="hr hr--auth mrg--t16"></div><form class="form form--dark form--validation" name="userForm" ng-submit="vm.login(userForm) " novalidate><!-- \u043B\u043E\u0433\u0438\u043D --><div class="form__field-item mrg--b20"><div class="field-style field-style--light pos--rel"><div class="field-style__group field-style__focus"><span class="input-plash input-plash--top13 font--size13">@mail.{{ vm.CONFIG.domainZone }}</span> <input class="input input--size_l input--up-shadow input--focus-icon width--inh font--size12 pdd--l38 pdd--r70" type="text" placeholder="{{ \'INPUT_PLACEHOLDER_LOGIN\' | translate }}" ng-model="vm.userForm.model.username" login-format required><div class="input-icon flex"><span class="icon-email mrg--auto"></span></div></div><validation-errors data="userForm.username" messages="vm.userForm.validations.username"></validation-errors></div></div><!-- \u043F\u0430\u0440\u043E\u043B\u044C --><div class="form__field-item mrg--b10"><div class="field-style field-style--light"><div class="field-style__group field-style__focus"><input class="input input--size_l input--up-shadow input--focus-icon width--inh font--size12 pdd--l38" type="{{ vm.isPasswordShow ? \'text\' : \'password\' }}" ng-model="vm.userForm.model.password" required placeholder="{{ \'INPUT_PLACEHOLDER_PASSWORD\' | translate }}"><div class="input-icon flex"><span class="icon-password mrg--auto"></span></div><button class="btn btn--not-style btn--size_l font--size18 view-pass view-pass--right-input flex" type="button" ng-click="vm.isPasswordShow = !vm.isPasswordShow"><span class="icon-show-password mrg--auto" ng-class="{\'icon-hide-password\' : vm.isPasswordShow, \'icon-show-password\' : !vm.isPasswordShow }"></span></button></div></div><validation-errors data="userForm.password" messages="vm.userForm.validations.password"></validation-errors></div><!-- \u0412\u0430\u043B\u0438\u0434\u0430\u0446\u0438\u044F--><div class="validation validation--form-auth" ng-if="vm.userForm.errors"><div class="validation__message validation__message--red">{{ vm.userForm.errors | translate }}</div></div><!-- \u0432\u043E\u0439\u0442\u0438 --><div class="form__field-item pdd--t10 mrg--b20"><div class="field-style field-style--light text-center"><button class="btn btn--size_l btn--yellow width--inh" type="submit" ng-if="!vm.userForm.isLoading">{{ \'SING_IN\' | translate }}</button><div ng-if="vm.userForm.isLoading"><spinner is-global="false" is-open="true"></spinner></div></div></div><!-- \u0437\u0430\u043F\u043E\u043C\u043D\u0438\u0442\u044C / \u0437\u0430\u0431\u044B\u043B\u0438--><div class="form__field-item mrg--b10 flex flex--just-s-a"><div class="field-style widtn--inh"><!--\u043D\u0430\u0448 \u0447\u0435\u043A\u0431\u043E\u043A\u0441 --><label class="checkbox-y__label checkbox-y" for="isChecked"><input class="checkbox-y__input" id="isChecked" type="checkbox" name="isChecked" ng-model="isChecked"><div class="checkbox-y__body"><span class="checkbox-y__icon"></span></div><span class="checkbox__text color--white" role="presentation">{{\'REMEMBER_ME\' | translate }}</span></label></div><div class="field-style widtn--inh font--right"><a class="link link--yellow" ui-sref="passwordReset">{{ \'FORGOT_YOUR_PASSWORD\' | translate }}</a></div></div></form><hr class="hr hr--auth"><button class="btn btn--size_l btn--normal width--inh btn--s-gradient" ui-sref="signUp">{{ \'CHECK_IN\' | translate }}</button><div class="text-center mrg--t20"><social-auth></social-auth></div></div></div></div><!-- \u0444\u0443\u0442\u0442\u0435\u0440 \u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438--><div class="footer footer__auth"><!-- \u041A\u043E\u043F\u0438\u0440\u0430\u0439\u0442--><div class="footer__copyright"><span class="">\xA9 2001\u20142017 \xABMail.{{ vm.CONFIG.domainZone }}\xBB Group a.s.</span></div><!-- \u041E\u0441\u043D\u043E\u0432\u043D\u043E\u0435 \u043C\u0435\u043D\u044E--><div class="footer__menu"><div class="navigation"><div class="navigation__row"><div class="navigation__item"><!--<a class="navigation__link navigation__link&#45;&#45;footer-a" href="">\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B</a>--></div></div></div></div><!-- \u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0435 \u043C\u0435\u043D\u044E \u0441 \u0432\u044B\u0431\u043E\u0440\u043E\u043C \u044F\u0437\u044B\u043A\u0430--><div class="footer__right-menu mrg--f-right"><div class="navigation"><div class="navigation__row"><div class="navigation__item pos--rel width--size28"><!-- \u042F\u0437\u044B\u043A\u043E\u0432\u043E\u0435 \u043C\u0435\u043D\u044E--><choice-language></choice-language></div><!--<div class="navigation__item">\n                            <a class="navigation__link" href="">\n                                {{ \'CONTACTS\' | translate }}\n                            </a>\n                        </div>--><!--<div class="navigation__item"><a class="navigation__link" href="">\u0420\u0435\u043A\u043B\u0430\u043C\u0430</a></div>--></div></div></div></div></div><div class="auth-layout__bg"></div></div><!--<div class="auth-layout hide">--><!--<div class="auth-layout__content">--><!--<header-auth></header-auth>--><!--<div class="auth-layout__form">--><!--<div class="card card&#45;&#45;black">--><!--<div class="text-center" ng-if="vm.isTokenAuthLoading">--><!--<spinner is-global="false"--><!--is-open="true">--><!--</spinner>--><!--</div>--><!--<div class="auth-form" ng-if="!vm.isTokenAuthLoading">--><!--<div class="auth-form__logo mrg&#45;&#45;b16">--><!--<a href="{{ vm.CONFIG.parentHost }}">--><!--<img class="img-responsive mrg&#45;&#45;auto"--><!--src="/images/domains/{{ vm.CONFIG.domainZone }}/logo-mail-white.svg"--><!--style="width: 141px;"--><!--logo-hover>--><!--</a>--><!--<hr class="hr hr&#45;&#45;auth mrg&#45;&#45;t16">--><!--</div>--><!--<form class="form form&#45;&#45;dark form&#45;&#45;validation" name="userForm" ng-submit="vm.login(userForm)"--><!--novalidate>--><!--&lt;!&ndash; \u043B\u043E\u0433\u0438\u043D &ndash;&gt;--><!--<div class="form__field-item mrg&#45;&#45;b20">--><!--<div class="field-style field-style&#45;&#45;light pos--rel">--><!--<div class="field-style__group field-style__focus">--><!--<span class="input-plash input-plash&#45;&#45;top13 font&#45;&#45;size13">@mail.cz</span>--><!--<input class="input input&#45;&#45;size_l input&#45;&#45;up-shadow input&#45;&#45;focus-icon width&#45;&#45;inh font&#45;&#45;size12 pdd&#45;&#45;l38 pdd&#45;&#45;r70"--><!--type="text"--><!--placeholder="{{ \'INPUT_PLACEHOLDER_LOGIN\' | translate }}"--><!--ng-model="vm.userForm.model.username"--><!--login-format--><!--required>--><!--<div class="input-icon flex">--><!--<span class="icon-email mrg&#45;&#45;auto"></span>--><!--</div>--><!--</div>--><!--<validation-errors data="userForm.username"--><!--messages="vm.userForm.validations.username">--><!--</validation-errors>--><!--</div>--><!--</div>--><!--&lt;!&ndash; \u043F\u0430\u0440\u043E\u043B\u044C &ndash;&gt;--><!--<div class="form__field-item mrg&#45;&#45;b10">--><!--<div class="field-style field-style&#45;&#45;light">--><!--<div class="field-style__group field-style__focus">--><!--<input class="input input&#45;&#45;size_l input&#45;&#45;up-shadow input&#45;&#45;focus-icon width&#45;&#45;inh font&#45;&#45;size12 pdd&#45;&#45;l38"--><!--type="{{ vm.isPasswordShow ? \'text\' : \'password\' }}"--><!--ng-model="vm.userForm.model.password" required--><!--placeholder="{{ \'INPUT_PLACEHOLDER_PASSWORD\' | translate }}">--><!--<div class="input-icon flex">--><!--<span class="icon-password mrg&#45;&#45;auto"></span>--><!--</div>--><!--<button class="btn btn&#45;&#45;not-style btn&#45;&#45;size_l font&#45;&#45;size18 view-pass view-pass&#45;&#45;right-input flex"--><!--type="button"--><!--ng-click="vm.isPasswordShow = !vm.isPasswordShow">--><!--<span class="icon-show-password mrg&#45;&#45;auto"--><!--ng-class="{\'icon-hide-password\' : vm.isPasswordShow, \'icon-show-password\' : !vm.isPasswordShow }"></span>--><!--</button>--><!--</div>--><!--</div>--><!--<validation-errors data="userForm.password"--><!--messages="vm.userForm.validations.password">--><!--</validation-errors>--><!--</div>--><!--&lt;!&ndash; \u0412\u0430\u043B\u0438\u0434\u0430\u0446\u0438\u044F&ndash;&gt;--><!--<div class="validation validation&#45;&#45;form-auth" ng-if="vm.userForm.errors">--><!--<div class="validation__message validation__message&#45;&#45;red">--><!--{{ vm.userForm.errors | translate }}--><!--</div>--><!--</div>--><!--&lt;!&ndash; \u0432\u043E\u0439\u0442\u0438 &ndash;&gt;--><!--<div class="form__field-item pdd&#45;&#45;t10 mrg&#45;&#45;b20">--><!--<div class="field-style field-style&#45;&#45;light text-center">--><!--<button class="btn btn&#45;&#45;size_l btn&#45;&#45;yellow width&#45;&#45;inh" type="submit"--><!--ng-if="!vm.userForm.isLoading">{{ \'SING_IN\' | translate }}--><!--</button>--><!--<div ng-if="vm.userForm.isLoading">--><!--<spinner is-global="false"--><!--is-open="true">--><!--</spinner>--><!--</div>--><!--</div>--><!--</div>--><!--&lt;!&ndash; \u0437\u0430\u043F\u043E\u043C\u043D\u0438\u0442\u044C / \u0437\u0430\u0431\u044B\u043B\u0438&ndash;&gt;--><!--<div class="form__field-item mrg&#45;&#45;b10 flex flex&#45;&#45;just-s-a">--><!--<div class="field-style widtn&#45;&#45;inh">--><!--&lt;!&ndash;\u043D\u0430\u0448 \u0447\u0435\u043A\u0431\u043E\u043A\u0441 &ndash;&gt;--><!--<label class="checkbox-y__label checkbox-y" for="isChecked">--><!--<input class="checkbox-y__input" id="isChecked" type="checkbox" name="isChecked"--><!--ng-model="isChecked">--><!--<div class="checkbox-y__body">--><!--<span class="checkbox-y__icon">--><!--</span>--><!--</div>--><!--<span class="checkbox__text color&#45;&#45;white" role="presentation">--><!--{{\'REMEMBER_ME\' | translate }}--><!--</span>--><!--</label>--><!--</div>--><!--<div class="field-style widtn&#45;&#45;inh font&#45;&#45;right">--><!--<a class="link link&#45;&#45;yellow" ui-sref="passwordReset">--><!--{{ \'FORGOT_YOUR_PASSWORD\' | translate }}--><!--</a>--><!--</div>--><!--</div>--><!--</form>--><!--<hr class="hr hr&#45;&#45;auth ">--><!--<button class="btn btn&#45;&#45;size_l btn&#45;&#45;normal width&#45;&#45;inh btn&#45;&#45;s-gradient" ui-sref="signUp">{{--><!--\'CHECK_IN\' | translate }}--><!--</button>--><!--<div class="text-center mrg&#45;&#45;t20">--><!--<social-auth></social-auth>--><!--</div>--><!--</div>--><!--</div>--><!--</div>--><!--&lt;!&ndash; \u0444\u0443\u0442\u0442\u0435\u0440 \u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438&ndash;&gt;--><!--<footer-auth></footer-auth>--><!--</div>--><!--<div class="auth-layout__bg"></div>--><!--</div>--><!--<form class="form form&#45;&#45;dark form&#45;&#45;validation" name="userForm" ng-submit="vm.login(userForm)" novalidate>--><!--&lt;!&ndash; \u043B\u043E\u0433\u0438\u043D &ndash;&gt;--><!--<div class="form__field-item mrg&#45;&#45;b10">--><!--<div class="field-style pos--rel">--><!--<span class="input-plash input-plash&#45;&#45;top13 font__size13">@mail.{{ CONFIG.domainZone }}</span>--><!--<input class="input input&#45;&#45;size_l input&#45;&#45;up-shadow width&#45;&#45;inh"--><!--type="text"--><!--placeholder="{{ \'INPUT_PLACEHOLDER_LOGIN\' | translate }}"--><!--ng-model="vm.userForm.model.username"--><!--login-format--><!--required>--><!--<validation-errors data="userForm.username"--><!--messages="vm.userForm.validations.username">--><!--</validation-errors>--><!--</div>--><!--</div>--><!--&lt;!&ndash; \u043F\u0430\u0440\u043E\u043B\u044C &ndash;&gt;--><!--<div class="form__field-item mrg&#45;&#45;b10">--><!--<div class="field-style">--><!--<input class="input input&#45;&#45;size_l input&#45;&#45;up-shadow width&#45;&#45;inh"--><!--type="password"--><!--ng-model="vm.userForm.model.password" required placeholder="{{ \'INPUT_PLACEHOLDER_PASSWORD\' | translate }}">--><!--</div>--><!--<validation-errors data="userForm.password"--><!--messages="vm.userForm.validations.password">--><!--</validation-errors>--><!--</div>--><!--&lt;!&ndash; \u0432\u043E\u0439\u0442\u0438 &ndash;&gt;--><!--<div class="form__field-item mrg&#45;&#45;b10">--><!--<div class="field-style text-center">--><!--<button class="btn btn&#45;&#45;size_l btn&#45;&#45;yellow width&#45;&#45;inh" type="submit"--><!--ng-if="!vm.userForm.isLoading">{{ \'SING_IN\' | translate }}</button>--><!--<div ng-if="vm.userForm.isLoading">--><!--<spinner is-global="false"--><!--is-open="true"></spinner>--><!--</div>--><!--</div>--><!--</div>--><!--<div class="validation mrg&#45;&#45;b10" ng-if="vm.userForm.errors">--><!--<div class="validation__message validation__message&#45;&#45;red">--><!--{{ vm.userForm.errors | translate }}--><!--</div>--><!--</div>--><!--&lt;!&ndash; \u0437\u0430\u043F\u043E\u043C\u043D\u0438\u0442\u044C / \u0437\u0430\u0431\u044B\u043B\u0438&ndash;&gt;--><!--<div class="form__field-item mrg&#45;&#45;b10 flex flex&#45;&#45;just-s-a">--><!--<div class="field-style widtn&#45;&#45;inh">--><!--&lt;!&ndash;\u043D\u0430\u0448 \u0447\u0435\u043A\u0431\u043E\u043A\u0441 &ndash;&gt;--><!--<label class="checkbox-y__label checkbox-y" for="isChecked">--><!--<input class="checkbox-y__input" id="isChecked" type="checkbox" name="isChecked"--><!--ng-model="isChecked">--><!--<div class="checkbox-y__body">--><!--<span class="checkbox-y__icon">--><!--</span>--><!--</div>--><!--<span class="checkbox__text color&#45;&#45;white" role="presentation">--><!--{{\'REMEMBER_ME\' | translate }}--><!--</span>--><!--</label>--><!--</div>--><!--<div class="field-style widtn&#45;&#45;inh font__right">--><!--<a class="link link&#45;&#45;yellow" ui-sref="passwordReset">{{ \'FORGOT_YOUR_PASSWORD\' | translate }}</a>--><!--</div>--><!--</div>--><!--</form>-->');
$templateCache.put('app/auth/sign-temp/sign-temp.html','<div class="auth-layout"><div class="auth-layout__content"><div class="auth-layout__form"><div class="card"><div class="text-center" ng-if="vm.isTokenAuthLoading"><spinner is-global="false" is-open="true"></spinner></div><div class="auth-form" ng-if="!vm.isTokenAuthLoading"><div class="auth-form__logo mrg--b16"><a href="{{ vm.CONFIG.parentHost }}"><img class="img-responsive mrg--auto" src="/images/domains/{{ vm.CONFIG.domainZone }}/logo-mail-white.svg" style="width: 141px" logo-hover></a><hr class="hr hr--auth mrg--t16"></div><form class="form" name="userForm" ng-submit="vm.socialComplete(userForm)" novalidate><div class="form__field-item mrg--b10"><label class="font__size13">{{ \'SELECT_YOUR_NAME\' | translate : {name: \'mail.cz\'} }}</label><div class="field-style pos--rel"><span class="input-plash input-plash--top13 font__size13">@mail.{{ CONFIG.domainZone }}</span> <input class="input input--size_l input--up-shadow width--inh" type="text" name="username" placeholder="{{ \'INPUT_PLACEHOLDER_MAIL_NAME\' | translate }}" ng-model="vm.userForm.model.username" login-format required></div><validation-errors data="userForm.username" server="vm.userForm.errors" messages="vm.userForm.validations.username"></validation-errors></div><div class="form__field-item mrg--b10"><div class="field-style widtn--inh"><!--\u043D\u0430\u0448 \u0447\u0435\u043A\u0431\u043E\u043A\u0441 --><label class="checkbox-y__label checkbox-y--size15 checkbox-y checkbox-y--chek-top" for="isChecked"><input class="checkbox-y__input" id="isChecked" type="checkbox" name="agree" ng-model="vm.userForm.model.agree"><div class="checkbox-y__body"><span class="checkbox-y__icon"></span></div><span class="checkbox__text font__size12 color--silver" role="presentation">{{ \'AUTH_CHECKBOX_CONFORMING_1\' | translate }} <a class="link link-aith" href="{{ vm.CONFIG.parentHost }}/obchodni-podminky/" target="_blank">{{ \'AUTH_CHECKBOX_CONFORMING_2\' | translate }}</a></span></label><validation-errors data="userForm.agree" server="vm.userForm.errors" messages="vm.userForm.validations.agree"></validation-errors></div></div><hr class="hr hr--auth"><div class="form__field-item mrg--b10"><div class="field-style text-center"><button class="btn btn--size_l btn--yellow width--inh" type="submit" ng-if="!vm.userForm.isLoading">{{ \'BTN_SING_UP_NOW\' | translate }}</button><div ng-if="vm.userForm.isLoading"><spinner is-global="false" is-open="true"></spinner></div></div></div></form></div></div></div><!-- \u0444\u0443\u0442\u0442\u0435\u0440 \u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438--><div class="footer footer__auth"><!-- \u041A\u043E\u043F\u0438\u0440\u0430\u0439\u0442--><div class="footer__copyright"><span class="">\xA9 2001\u20142017 \xABMail.{{ vm.CONFIG.domainZone }}\xBB Group a.s.</span></div><!-- \u041E\u0441\u043D\u043E\u0432\u043D\u043E\u0435 \u043C\u0435\u043D\u044E--><div class="footer__menu"><div class="navigation"><div class="navigation__row"><div class="navigation__item"><!--<a class="navigation__link navigation__link&#45;&#45;footer-a" href="">\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B</a>--></div></div></div></div><!-- \u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0435 \u043C\u0435\u043D\u044E \u0441 \u0432\u044B\u0431\u043E\u0440\u043E\u043C \u044F\u0437\u044B\u043A\u0430--><div class="footer__right-menu mrg--f-right"><div class="navigation"><div class="navigation__row"><div class="navigation__item pos--rel width--size28"><!-- \u042F\u0437\u044B\u043A\u043E\u0432\u043E\u0435 \u043C\u0435\u043D\u044E--><choice-language></choice-language></div><!--<div class="navigation__item">\n                            <a class="navigation__link" href="">\n                                {{ \'CONTACTS\' | translate }}\n                            </a>\n                        </div>--><!--<div class="navigation__item"><a class="navigation__link" href="">\u0420\u0435\u043A\u043B\u0430\u043C\u0430</a></div>--></div></div></div></div></div><div class="auth-layout__bg"></div></div>');
$templateCache.put('app/auth/sign-up/sign-up.html','<div class="auth-layout"><div class="auth-layout__content"><div class="auth-layout__form auth-layout__form--wd388"><div class="card card--black"><div class="auth-form"><div class="auth-form__logo mrg--b16"><a href="{{ vm.CONFIG.parentHost }}"><img class="img-responsive mrg--auto" src="/images/domains/{{ vm.CONFIG.domainZone }}/logo-mail-white.svg" style="width: 141px" logo-hover></a><hr class="hr hr--auth mrg--t16"></div><form class="form form--dark form--validation" name="userForm" ng-submit="vm.signUp(userForm)" novalidate><!-- \u0418\u043C\u044F \u0438 \u0444\u0430\u043C\u0438\u043B\u0438\u044F --><div class="form__field-item mrg--b20 flex--inline width--all"><div class="field-style mrg--r5"><input class="input input--size_l input--up-shadow input--focus-icon width--inh font--size12" type="text" name="first_name" ng-model="vm.userForm.model.first_name" placeholder="{{ \'INPUT_PLACEHOLDER_NAME\' | translate }}"><validation-errors data="userForm.first_name" server="vm.userForm.errors" messages="vm.userForm.validations.first_name"></validation-errors></div><div class="field-style"><input class="input input--size_l input--up-shadow input--focus-icon width--inh font--size12" type="text" name="last_name" ng-model="vm.userForm.model.last_name" placeholder="{{ \'INPUT_PLACEHOLDER_LAST_MANE\' | translate }}"><validation-errors data="userForm.last_name" server="vm.userForm.errors" messages="vm.userForm.validations.last_name"></validation-errors></div></div><!-- \u041B\u043E\u0433\u0438\u043D \u0432 \u0431\u0430\u0437\u0435 --><div class="form__field-item mrg--b20"><div class="field-style"><label class="field-style__title font--size13">{{ \'AUTH_CREATE_A_USER_NAME\' | translate }}</label><div class="field-style__group field-style__focus"><span class="input-plash input-plash--top13 font--size13">@mail.{{ vm.CONFIG.domainZone }}</span> <input class="input input--size_l input--up-shadow input--focus-icon width--inh font--size12 pdd--l38 pdd--r70" type="text" name="username" ng-model="vm.userForm.model.username" ng-change="vm.checkUserName()" placeholder="{{\'INPUT_PLACEHOLDER_MAIL_NAME\' | translate }}" login-format required><div class="input-icon flex"><span class="icon-email mrg--auto"></span></div></div><validation-errors data="userForm.username" server="vm.userForm.errors" messages="vm.userForm.validations.username" class="validation--form-auth validation--top-no-radius"></validation-errors></div></div><!-- \u041F\u0430\u0440\u043E\u043B\u044C --><div class="form__field-item mrg--b6"><div class="field-style"><div class="field-style__group field-style__focus m-input__body"><input class="input input--size_l input--up-shadow input--focus-icon width--inh font--size12 pdd--l38" type="{{ vm.isPasswordShow ? \'text\' : \'password\' }}" name="password" ng-model="vm.userForm.model.password" placeholder="{{ \'INPUT_PLACEHOLDER_PASSWORD\' | translate }}" password-verify="{{ vm.userForm.model.passwordConf }}" required><div class="input-icon flex"><span class="icon-password mrg--auto"></span></div><button class="btn btn--not-style btn--size_l font--size18 view-pass view-pass--right-input flex" type="button" ng-click="vm.isPasswordShow = !vm.isPasswordShow"><span class="icon-show-password mrg--auto" ng-class="{\'icon-hide-password\' : vm.isPasswordShow, \'icon-show-password\' : !vm.isPasswordShow }"></span></button></div><validation-errors data="userForm.password" server="vm.userForm.errors" messages="vm.userForm.validations.password" class="validation--form-auth validation--top-no-radius"></validation-errors></div><div class="progress-bar--password mrg--t5" ng-password-strength="vm.userForm.model.password" strength="passStrength" inner-class="progress-bar progress-bar--password" inner-class-prefix="progress-bar-"></div></div><!-- \u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u0435 \u043F\u0430\u0440\u043E\u043B\u044F --><div class="form__field-item mrg--b10"><div class="field-style"><input class="input input--size_l input--up-shadow input--focus-icon width--inh font--size12" type="{{ vm.isPasswordShow ? \'text\' : \'password\' }}" name="passwordConf" ng-model="vm.userForm.model.passwordConf" placeholder="{{ \'INPUT_PLACEHOLDER_PASSWORD_CONFIRMATION\' | translate }}" password-verify="{{ vm.userForm.model.password }}" required><validation-errors data="userForm.passwordConf" server="vm.userForm.errors" messages="vm.userForm.validations.passwordConf" class="validation--form-auth validation--top-no-radius"></validation-errors></div></div><!--\u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u0430\u0434\u0440\u0435\u0441: \u0442\u0435\u043B\u0435\u0444\u043E\u043D--><div class="mrg__t10" ng-if="!vm.isAdditionalEmail"><!-- \u0421\u041C\u0421 \u0432\u0430\u043B\u0438\u0434\u0430\u0446\u0438\u044F --><label class="field-style__title font--size13">{{ \'ACTIVE_PHONE\' | translate }} <a class="pull-right link--yellow" ng-click="vm.isAdditionalEmail = true">{{ \'NO_PHONE\' | translate }}</a></label><div class="form__field-item mrg--b25 flex flex--row-wrap"><div class="field-style width--size177"><input class="input input--size_l input--up-shadow input--focus-icon width--inh font--size12" type="text" name="phone" ng-model="vm.userForm.model.phone" ui-mask-placeholder ui-mask-placeholder-char="x" ui-mask="+999 999-999-999" ui-options="{allowInvalidValue: true, clearOnBlur: false}" required></div><div class="field-style width--inh width--max126"><button class="btn btn--size_l btn--normal width--inh btn--s-gradient" type="button" ng-click="vm.sendCode()">{{ \'BTN_TO_GET_THE_CODE\' | translate }}</button></div><validation-errors data="userForm.phone" server="vm.userForm.errors" messages="vm.userForm.validations.phone" class="validation--form-auth validation--top-no-radius"></validation-errors><span class="notific notific--auth" ng-if="vm.codeResult && vm.userForm.model.phone">{{ \'AUTH_NOTIFIC_PHONE_1\' | translate }} +{{ vm.userForm.model.phone }} {{ \'AUTH_NOTIFIC_PHONE_2\' | translate }}</span></div><!-- \u0421\u041C\u0421 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u0435 \u043A\u043E\u0434\u0430 --><div class="form__field-item mrg--b20 mrg--t16" ng-if="vm.codeResult.code || vm.userForm.errors"><div class="width-inh flex--inline align-items--cn"><div class="field-style mrg--r5 width--size177"><input class="input input--size_l input--up-shadow input--focus-icon width--inh font--size12" type="text" name="code" ng-model="vm.userForm.model.code" placeholder="{{ \'INPUT_PLACEHOLDER_ENTER_SMS_CODE\' | translate }}" required></div></div><div class="color--red">{{ vm.error.message }}</div><validation-errors data="userForm.code" server="vm.userForm.errors" messages="vm.userForm.validations.code" class="validation--form-auth validation--top-no-radius"></validation-errors></div></div><!--\u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u0430\u0434\u0440\u0435\u0441: email--><div class="mrg__t10" ng-if="vm.isAdditionalEmail"><label class="field-style__title font--size13">{{ \'ACTIVE_EMAIL\' | translate }} <a class="pull-right link--yellow" ng-click="vm.isAdditionalEmail = false">{{ \'NO_EMAIL\' | translate }}</a></label><div class="form__field-item mrg--b25 flex flex--row-wrap"><div class="field-style"><input class="input input--size_l input--up-shadow input--focus-icon width--inh font--size12" type="email" name="email" ng-model="vm.userForm.model.email" required><validation-errors data="userForm.email" server="vm.userForm.errors" messages="vm.userForm.validations.email" class="validation--form-auth validation--top-no-radius"></validation-errors></div></div></div><!-- \u0421\u043E\u0433\u043B\u0430\u0448\u0435\u043D\u0438\u0435 --><div class="form__field-item mrg--b10"><div class="field-style widtn--inh"><!--\u043D\u0430\u0448 \u0447\u0435\u043A\u0431\u043E\u043A\u0441 --><label class="checkbox-y__label checkbox-y--size15 checkbox-y checkbox-y--chek-top" for="isChecked"><input class="checkbox-y__input" id="isChecked" type="checkbox" name="agree" ng-model="vm.userForm.model.agree"><div class="checkbox-y__body"><span class="checkbox-y__icon"></span></div><span class="checkbox__text font--size12 color--white" role="presentation">{{ \'AUTH_CHECKBOX_CONFORMING_1\' | translate }} <a class="link link--yellow" href="{{ vm.CONFIG.parentHost }}/obchodni-podminky/" target="_blank">{{ \'AUTH_CHECKBOX_CONFORMING_2\' | translate }}</a></span></label><validation-errors data="userForm.agree" server="vm.userForm.errors" messages="vm.userForm.validations.agree" class="validation--form-auth validation--mrg-t5"></validation-errors></div></div><!-- \u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u0441\u044F --><div class="form__field-item mrg--b10"><hr class="hr hr--auth"><div class="field-style text-center"><button class="btn btn--size_l btn--yellow width--inh" type="submit" ng-if="!vm.userForm.isLoading">{{ \'BTN_SING_UP_NOW\' | translate }}</button><div ng-if="vm.userForm.isLoading"><spinner is-global="false" is-open="true"></spinner></div></div></div></form><button class="btn btn--size_l btn--link-style link--yellow" ui-sref="signIn">{{ \'SING_IN\' | translate }}</button><div class="text-center mrg--t20"><social-auth></social-auth></div></div></div></div><div class="footer footer__auth"><div class="footer__copyright"><span class="">\xA9 2001\u20142017 \xABMail.{{ CONFIG.domainZone }}\xBB Group a.s.</span></div><div class="footer__menu"><div class="navigation"><div class="navigation__row"><div class="navigation__item"><!--<a class="navigation__link navigation__link&#45;&#45;footer-a" href="">\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B</a>--></div></div></div></div><div class="footer__right-menu mrg--f-right"><div class="navigation"><div class="navigation__row"><div class="navigation__item pos--rel width--size28"><choice-language></choice-language></div><!--<div class="navigation__item">\n                            <a class="navigation__link" href="">\n                                {{ \'CONTACTS\' | translate }}\n                            </a>\n                        </div>--><!--<div class="navigation__item"><a class="navigation__link" href="">\u0420\u0435\u043A\u043B\u0430\u043C\u0430</a></div>--></div></div></div></div></div><div class="auth-layout__bg"></div></div>');
$templateCache.put('app/core/errors/404.html','404');
$templateCache.put('app/layout/header/header.html','<div class="main-header"><!-- --><!-- \u0425\u0435\u0434\u0435\u0440 \u0434\u043B\u044F \u0433\u043B\u0430\u0432\u043D\u043E\u0439 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0438 --><div class="main-header__main is-active" ng-if="!vm.isSearch && vm.$state.current.name === \'mail.inbox\'"><div class="main-header__container"><div class="main-header__left"><button class="main-header__left-button icon-menu btn btn--not-style btn--main-mobile-color header__icon pdd--l0" ng-click="vm.openMenu()"></button></div><div class="main-header__center"><span class="main-header__title-text">{{ vm.currentFolder.name | translate }}</span> <span class="main-header__count-letters">{{ vm.currentFolder.messagesCount || \'\' }}</span></div><div class="main-header__right"><button class="main-header__right-button search-block__icon icon-search btn btn--not-style btn--main-mobile-color header__icon mrg--f-right pdd--r0" type="button" set-focus="search-input" ng-click="vm.isSearch = true;"></button></div><hr class="hr hr--header hr--yellow"></div></div><!-- \u0425\u0435\u0434\u0435\u0440 \u0434\u043B\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0438 \u043F\u043E\u0438\u0441\u043A\u0430--><div class="main-header__search is-active" ng-if="vm.isSearch && vm.$state.current.name === \'mail.inbox\'"><div class="main-header__container"><div class="main-header__right width--inh"><form class="search-block widtn-inh search-block" ng-submit="vm.search()"><button class="main-header__left-button search-block__icon icon-search btn btn--not-style btn--main-mobile-color header__icon padding mrg--f-right" type="submit"></button> <input class="input input--no-border input--no-focus input--size_l width--all" id="search-input" type="text" placeholder="{{ \'SEARCH_FOR_LETTERS\' | translate }}" ng-model="vm.searchForm.model.search"></form></div><div class="main-header__left"><button class="main-header__right-button icon-close btn btn--not-style btn--size_xl btn--main-mobile-color" type="button" ng-click="vm.isSearch = false; vm.clearSearch();"></button></div></div></div><!-- \u0425\u0435\u0434\u0435\u0440 \u0434\u043B\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0438 \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0430 \u043F\u0438\u0441\u044C\u043C\u0430--><div class="main-header__massege-replay is-active" ng-if="vm.$state.current.name === \'mail.message\'"><div class="main-header__container"><div class="main-header__left"><button class="main-header__left-button icon-arrow-left btn btn--not-style btn--main-mobile-color header__icon flex--inline align-items--cn pdd--l0" type="button" ui-sref="mail.inbox({mbox: vm.$state.params.mbox})"><span class="font--arial font--size15 mrg--l5">{{ \'BACK\' | translate }}</span></button></div><div class="main-header__right"><button class="icon-arrow-up btn btn--not-style btn--main-mobile-color header__icon mrg--f-right pdd--r2" type="button" ng-if="vm.paginate.next" ui-sref="mail.message({id: vm.paginate.next.number, connection_id: vm.paginate.next.connection_id, mbox: vm.paginate.next.mbox})"></button> <button class="icon-arrow-down btn btn--not-style btn--main-mobile-color header__icon mrg--f-right pdd--r0" type="button" ng-if="vm.paginate.prev" ui-sref="mail.message({id: vm.paginate.prev.number, connection_id: vm.paginate.prev.connection_id, mbox: vm.paginate.prev.mbox})"></button></div><hr class="hr hr--header hr--yellow"></div></div><!-- \u0425\u0435\u0434\u0435\u0440 \u0434\u043B\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0438 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u043F\u0438\u0441\u044C\u043C\u0430--><div class="main-header__message-new is-active" ng-if="vm.$state.current.name === \'mail.compose\'"><div class="main-header__container"><div class="main-header__left"><button class="main-header__left-button icon-close btn btn--not-style btn--main-mobile-color header__icon header__icon--close" ng-click="vm.closeCompose()"></button></div><div class="main-header__center"><span class="main-header__title-text font--size18 font--bold">{{ \'NEW_LETTER\' | translate }}</span></div><div class="main-header__right"><button class="main-header__right-button main-header__right-button--size22 btn btn--not-style btn--mail-send header__icon mrg--f-right font--arial icon-send-mail" type="button" ng-click="vm.send()" ng-disabled="!vm.isSend || vm.isUploading"></button></div></div></div><!-- \u0425\u0435\u0434\u0435\u0440 \u0434\u043B\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446  \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043A --><div class="main-header__main is-active" ng-if="!vm.isSearch && vm.$state.current.name === \'settings.main\'"><div class="main-header__container"><div class="main-header__left"><button class="main-header__left-button icon-menu btn btn--not-style btn--main-mobile-color header__icon pdd--l0" ng-click="vm.openSettingsMenu()"></button></div><div class="main-header__center"><span class="main-header__title-text">{{ \'MANAGE_ACCOUNT\' | translate }}</span></div><div class="main-header__right"><button class="main-header__right-button btn btn--not-style btn--main-mobile-color mrg--f-right" disabled="disabled"></button></div><hr class="hr hr--header hr--yellow"></div></div><div class="main-header__main is-active" ng-if="!vm.isSearch && vm.$state.current.name === \'settings.folders\'"><div class="main-header__container"><div class="main-header__left"><button class="main-header__left-button icon-menu btn btn--not-style btn--main-mobile-color header__icon pdd--l0" ng-click="vm.openSettingsMenu()"></button></div><div class="main-header__center"><span class="main-header__title-text">{{ \'FOLDERS\' | translate }}</span></div><div class="main-header__right"><button class="main-header__right-button btn btn--not-style btn--main-mobile-color mrg--f-right" disabled="disabled"></button></div><hr class="hr hr--header hr--yellow"></div></div><div class="main-header__main is-active" ng-if="!vm.isSearch && vm.$state.current.name === \'settings.tags\'"><div class="main-header__container"><div class="main-header__left"><button class="main-header__left-button icon-menu btn btn--not-style btn--main-mobile-color header__icon pdd--l0" ng-click="vm.openSettingsMenu()"></button></div><div class="main-header__center"><span class="main-header__title-text">{{ \'TAGS\' | translate }}</span></div><div class="main-header__right"><button class="main-header__right-button btn btn--not-style btn--main-mobile-color mrg--f-right" disabled="disabled"></button></div><hr class="hr hr--header hr--yellow"></div></div><div class="main-header__main is-active" ng-if="!vm.isSearch && vm.$state.current.name === \'settings.rules\'"><div class="main-header__container"><div class="main-header__left"><button class="main-header__left-button icon-menu btn btn--not-style btn--main-mobile-color header__icon pdd--l0" ng-click="vm.openSettingsMenu()"></button></div><div class="main-header__center"><span class="main-header__title-text">{{ \'PROCESSING_RULES\' | translate }}</span></div><div class="main-header__right"><button class="main-header__right-button btn btn--not-style btn--main-mobile-color mrg--f-right" disabled="disabled"></button></div><hr class="hr hr--header hr--yellow"></div></div><div class="main-header__main is-active" ng-if="!vm.isSearch && vm.$state.current.name === \'settings.ruleAdd\'"><div class="main-header__container"><div class="main-header__left"><button class="main-header__left-button icon-menu btn btn--not-style btn--main-mobile-color header__icon pdd--l0" ng-click="vm.openSettingsMenu()"></button></div><div class="main-header__center"><span class="main-header__title-text">{{ \'CREATE_RULE\' | translate }}</span></div><div class="main-header__right"><button class="main-header__right-button btn btn--not-style btn--main-mobile-color mrg--f-right" disabled="disabled"></button></div><hr class="hr hr--header hr--yellow"></div></div><div class="main-header__main is-active" ng-if="!vm.isSearch && vm.$state.current.name === \'settings.accounts\'"><div class="main-header__container"><div class="main-header__left"><button class="main-header__left-button icon-menu btn btn--not-style btn--main-mobile-color header__icon pdd--l0" ng-click="vm.openSettingsMenu()"></button></div><div class="main-header__center"><span class="main-header__title-text">{{ \'MAILS_FROM_OTHER_BOXES\' | translate }}</span></div><div class="main-header__right"><button class="main-header__right-button btn btn--not-style btn--main-mobile-color mrg--f-right" disabled="disabled"></button></div><hr class="hr hr--header hr--yellow"></div></div><div class="main-header__main is-active" ng-if="!vm.isSearch && vm.$state.current.name === \'settings.contacts\'"><div class="main-header__container"><div class="main-header__left"><button class="main-header__left-button icon-menu btn btn--not-style btn--main-mobile-color header__icon pdd--l0" ng-click="vm.openSettingsMenu()"></button></div><div class="main-header__center"><span class="main-header__title-text">{{ \'SETTINGS_CONTACTS\' | translate }}</span></div><div class="main-header__right"><button class="main-header__right-button btn btn--not-style btn--main-mobile-color mrg--f-right" disabled="disabled"></button></div><hr class="hr hr--header hr--yellow"></div></div><!-- \u0423\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F \u0438 \u0441\u0442\u0430\u0442\u0443\u0441\u044B--><div class="pop-up-notification pop-up-notification--vg-style" ng-class="{\'is-show\': vm.notify.isOpen}"><div class="pop-up-notification__container"><span class="pop-up-notification__validate-icon"></span> <span class="pop-up-notification__notific" ng-bind-html="vm.message | translate:{folder: (vm.folderMessage.name | translate)}"></span> <button class="pop-up-notification__close btn--not-style icon-remove-thick btn--main-mobile-color" type="button"></button></div><hr class="hr hr--header hr--size-h1"></div></div>');
$templateCache.put('app/layout/menu-main/menu-main.html','<div class="menu-main-layout scroll-fix"><div class="menu-main-layout__header"><img class="menu-main-layout__header__logo img-responsive" src="/images/domains/{{ vm.CONFIG.domainZone }}/logo-mail-dark.svg"><!--<button class="menu-main-layout__button-close btn font&#45;&#45;size16"--><!--type="button"--><!--ng-click="vm.closeMenu()">--><!--<span class="icon-double-arrow-left"></span>--><!--</button>--></div><div class="menu-main-layout__user-info"><div class="menu-main-layout__user-info-container" scroll-left><div class="menu-main-layout__users-list"><div class="menu-main-layout__user-item" ng-repeat="profile in vm.profiles" ng-if="profile.profile.email !== vm.user.profile.email"><button class="menu-main-layout__avatar" ng-click="vm.setAuthProfile(profile)"><div class="avatar avatar--size53 avatar--second-style" ng-if="profile.profile.photo"><img class="avatar__image" media-url="profile.profile.photo" fallback-src="{{\'/images/avatar-personal.svg\'}}"></div><avatar-name class="avatar avatar--size53 avatar--second-style" ng-if="!profile.profile.photo" name="profile.profile.user_name" email="profile.profile.email"></avatar-name></button></div><div class="menu-main-layout__user-item menu-main-layout__user-item--active"><div class="menu-main-layout__avatar"><div class="avatar avatar--size53 avatar--second-style" ng-if="vm.user.profile.photo"><img class="avatar__image" media-url="vm.user.profile.photo" fallback-src="{{\'/images/avatar-personal.svg\'}}"></div><avatar-name class="avatar avatar--size53 avatar--second-style" ng-if="!vm.user.profile.photo" name="vm.user.profile.user_name" email="vm.user.profile.email"></avatar-name><button class="menu-main-layout__add-btn icon-close btn--circle btn--size_40 rotate--am90 font--size13" type="button" ui-sref="signIn()"></button></div><span class="menu-main-layout__user-name mrg--t10">{{ vm.user.profile.username }}</span> <span class="menu-main-layout__user-mail">{{ vm.user.profile.email }}</span></div></div></div></div><!--\u043E\u0441\u043D\u043E\u0432\u043D\u043E\u0435 \u043C\u0435\u043D\u044E --><div class="menu-main-layout__item"><ul class="menu-main"><li class="menu-main__item is-sub-menu" ng-hide="folder.name === \'Outbox\' && !folder.messagesCount" ng-class="{\'is-sub-menu--open\': folder.isOpen}" ng-repeat="folder in vm.folders.items"><div class="menu-main__item-content" ng-if="!folder.isSub && folder.name !== \'Archive\'"><a class="menu-main__link" ng-click="vm.closeMenu();" ui-sref="mail.inbox({mbox: folder.name, filter: undefined, tag_id: undefined})" ui-sref-active="menu-main__link--active"><span class="{{ folder.icon }} menu-main__icon"></span><!--<span class="menu-main__title">{{ folder.caption }}</span>--> <span class="menu-main__title">{{ folder.name | translate }}</span></a><div class="menu-main__additional-option"><button class="menu-main__clear-brush icon-clear btn--not-style font--size12" type="button" ng-class="{\'menu-main__link--gray\': !folder.messagesCount,\n                                    \'menu-main__clear-brush--active\': (folder.name === \'Junk\' || folder.name === \'Trash\') && folder.messagesCount\n                                }" ng-click="vm.clearFolder($event, folder);"></button> <span class="menu-main__count" ng-if="folder.messagesCount">{{ folder.unseen || \'\' }}</span> <button class="menu-main__show-additional icon-arrow-down btn--not-style" type="button" ng-if="folder.name === \'INBOX\' || folder.name === \'Drafts\'" ng-click="folder.isOpen = !folder.isOpen"></button></div></div><div ng-if="folder.isOpen"><div class="menu-main__item-content" ng-repeat="folderSub in vm.folders.items" ng-if="folderSub.isSub && (folder.name === \'INBOX\' || folder.name === \'Drafts\')"><ul class="menu-main menu-main--additional" ng-if="(folderSub.name !== \'Templates\' && folder.name === \'INBOX\') || (folderSub.name === \'Templates\' && folder.name === \'Drafts\')"><li class="menu-main__item-sub"><a class="menu-main__link" ng-click="vm.closeMenu();" ui-sref="mail.inbox({mbox: folderSub.name, filter: undefined, tag_id: undefined})" ui-sref-active="menu-main__link--active"><span class="menu-main__icon" ng-class="{\'icon-template\': folderSub.name === \'Templates\', \'icon-archive\': folderSub.name !== \'Templates\'}"></span> <span class="menu-main__title">{{ folderSub.name | translate }}</span></a><div class="menu-main__additional-option"><span class="menu-main__count">{{ folderSub.unseen || \'\' }}</span></div></li></ul></div></div></li></ul><!--<hr class="hr hr&#45;&#45;main-menu">--><div class="menu-main__filter"><ul class="menu-main-filter"><li class="menu-main-filter__item" ui-sref="mail.inbox({mbox: undefined, filter: \'attach\', tag_id: undefined})" ui-sref-active="menu-main-filter__item--active" ng-click="vm.closeMenu();"><span class="icon-affix menu-main-filter__icon"></span></li><li class="menu-main-filter__item" ui-sref="mail.inbox({mbox: undefined, filter: \'unseen\', tag_id: undefined})" ui-sref-active="menu-main-filter__item--active" ng-click="vm.closeMenu();"><span class="icon-elevation menu-main-filter__icon font--size12"></span></li><li class="menu-main-filter__item" ui-sref="mail.inbox({mbox: undefined, filter: \'flagged\', tag_id: undefined})" ui-sref-active="menu-main-filter__item--active" ng-click="vm.closeMenu();"><span class="icon-flagged menu-main-filter__icon"></span></li></ul></div><!-- --><!--<hr class="hr hr&#45;&#45;main-menu">--><ul class="menu-main"><li class="menu-main__item" ng-repeat="tag in vm.tags.items"><div class="menu-main__item-content"><a class="menu-main__link" ui-sref="mail.inbox({mbox: undefined, filter: undefined, tag_id: tag.id})" ng-click="vm.closeMenu();"><span class="icon-marker-mobile-bg menu-main__icon menu-main__icon--select" style="color: {{ tag.bgcolor }}"></span> <span class="menu-main__title">{{ tag.tag_name }}</span></a></div></li><!--<li class="menu-main__item">\n                <div class="menu-main__item-content">\n                    <a class="menu-main__link" href>\n                        <span class="icon-filter menu-main__icon"></span>\n                        <span class="menu-main__title">{{ \'FILTERS\' | translate }}</span>\n                    </a>\n                    <div class="menu-main__additional-option">\n                        <div class="radio-button">\n                            <input type="checkbox" name="fiter" class="radio-button__checkbox" id="filter-switch"\n                                   checked>\n                            <label class="radio-button__label" for="filter-switch">\n                                <span class="radio-button__inner"></span>\n                                <span class="radio-button__switch"></span>\n                            </label>\n                        </div>\n                    </div>\n                </div>\n            </li>--><li class="menu-main__item"><div class="menu-main__item-content"><a class="menu-main__link" ui-sref="settings.main"><span class="icon-settings menu-main__icon"></span> <span class="menu-main__title">{{ \'SETTING\' | translate }}</span></a></div></li><li class="menu-main__item"><div class="menu-main__item-content"><a class="menu-main__link" ng-click="vm.logout()" target="_blank"><span class="icon-out-rotate menu-main__icon"></span> <span class="menu-main__title">{{ \'LOGOUT\' | translate }}</span></a></div></li></ul></div><!--<div class="menu-main-layout__footer-menu">\n        <hr class="hr hr&#45;&#45;main-menu">\n        <div class="flex align-items&#45;&#45;cn mrg--l10 mrg--t10 mrg--b20">\n            <div class="flex flex&#45;&#45;row-wrap align-items&#45;&#45;cn ">\n                <div class="link link&#45;&#45;gray"\n                     ng-click="vm.goToDesktopVersion(\'/mail/inbox?mbox=INBOX&version=desktop\')">\n                    {{ \'FULL\' | translate }} |\n                </div>\n                <div class="font&#45;&#45;normal">\n                    {{ \'MOBILE\' | translate }} v 1.0\n                </div>\n            </div>\n\n            <div class="menu-main-layout__footer-lang">\n                <choice-language></choice-language>\n            </div>\n        </div>\n    </div>--></div>');
$templateCache.put('app/layout/menu-settings/menu-settings.html','<div class="menu-main-layout scroll-fix"><div class="menu-main-layout__header"><button class="btn btn--size_m btn--yellow" type="button" ui-sref="mail.inbox({mbox: \'INBOX\'})"><span class="icon-arrow-left"></span> {{ \'RETURN_TO_MAIL\' | translate }}</button><!--<img class="menu-main-layout__header__logo img-responsive"\n             src="/images/domains/{{ vm.CONFIG.domainZone }}/logo-mail-dark.svg">\n        <button class="menu-main-layout__button-close btn font&#45;&#45;size16"\n                type="button"\n                ng-click="vm.closeSettingsMenu()">\n            <span class="icon-double-arrow-left"></span>\n        </button>--></div><!--\u043E\u0441\u043D\u043E\u0432\u043D\u043E\u0435 \u043C\u0435\u043D\u044E --><div class="menu-settings mrg--t16"><div class="menu-settings__list"><div class="menu-settings__item"><a class="menu-settings__link" ui-sref="settings.main" ui-sref-active="menu-settings__link--active">{{ \'MANAGE_ACCOUNT\' | translate }}</a></div><div class="menu-settings__item"><a class="menu-settings__link" ui-sref="settings.folders" ui-sref-active="menu-settings__link--active">{{ \'FOLDERS\' | translate }}</a></div><div class="menu-settings__item"><a class="menu-settings__link" ui-sref="settings.tags" ui-sref-active="menu-settings__link--active">{{ \'TAGS\' | translate }}</a></div><div class="menu-settings__item"><a class="menu-settings__link" ui-sref="settings.rules" ui-sref-active="menu-settings__link--active">{{ \'PROCESSING_RULES\' | translate }}</a></div><div class="menu-settings__item"><a class="menu-settings__link" ui-sref="settings.accounts" ui-sref-active="menu-settings__link--active">{{ \'MAILS_FROM_OTHER_BOXES\' | translate }}</a></div><!--<div class="menu-settings__item">--><!--<a class="menu-settings__link" ui-sref="settings.contacts" ui-sref-active="menu-settings__link&#45;&#45;active">--><!--{{ \'SETTINGS_CONTACTS\' | translate }}</a>--><!--</div>--></div><div class="menu-settings__list"><div class="menu-settings__item"><a class="menu-settings__link" href password-change-link>{{ \'ACCOUNT_SECURITY\' | translate }}</a></div></div><div class="menu-settings__list"><div class="menu-settings__item"><div class="menu-settings__link menu-settings__link--not-decoration flex mrg--r5" href><span class="mrg--r18">{{ \'LANGUAGE\' | translate }}:</span><div class="pos--rel width--all"><div class="menu-settings__link-choose-element" uib-popover-template="\'app/components/lang-list/lang-list-popover.html\'" popover-class="popover--choose-lang popover--no-arrow" popover-placement="bottom" popover-animation="true" popover-trigger="\'outsideClick\'" popover-is-open="vm.isOpenLangList"><img class="width--size20" src="images/country/{{ vm.useLang.icon }}"> <span class="mrg--l10">{{ vm.useLang.lang | translate }}</span> <span class="icon-arrow-down mrg--f-right font--size12" ng-class="{\'icon-arrow-up\': vm.isOpenLangList, \'icon-arrow-down\': !vm.isOpenLangList }"></span></div></div></div></div><div class="menu-settings__item mrg--t20"><div class="menu-settings__link menu-settings__link--not-decoration flex mrg--r5"><span class="mrg--r18">{{ \'CLOCK\' | translate }}:</span><div class="pos--rel width--all"><div class="menu-settings__link-choose-element" uib-popover-template="\'app/components/timezone-list/timezone-list-popover.html\'" popover-class="popover--choose-time-zone popover--no-arrow" popover-placement="bottom" popover-animation="true" popover-trigger="\'outsideClick\'" popover-is-open="vm.isOpen"><span class="text--dots">{{ vm.getTimezoneName(vm.user.profile.timezone) }}</span> <span class="icon-arrow-down mrg--f-right font--size12" ng-class="{\'icon-arrow-up\': vm.isOpen, \'icon-arrow-down\': !vm.isOpen }"></span></div></div></div></div></div><div class="pdd--14"><button class="btn btn--size_m btn--normal width--inh btn--s-gradient" type="button" password-change-link>{{ \'BTN_CHANGE_PASSWORD\' | translate }}</button><p class="menu-settings-layout__pass-info mrg--t8 mrg--b0">{{ \'SETTINGS_MENU_NOTIFIC_RECOMENDATION\' | translate }}.</p></div></div><!--\u0424\u0443\u0442\u0442\u0435\u0440--><!--<div class="menu-main-layout__footer">\n        <div class="flex flex&#45;&#45;row-wrap align-items&#45;&#45;cn ">\n            <div class="link link&#45;&#45;gray"\n                 ng-click="vm.goToDesktopVersion(\'/mail/inbox?mbox=INBOX&version=desktop\')">\n                {{ \'FULL\' | translate }} |\n            </div>\n            <div class="font&#45;&#45;normal">\n                {{ \'MOBILE\' | translate }} v 1.0\n            </div>\n        </div>\n\n        <div class="menu-main-layout__footer-lang">\n            <choice-language></choice-language>\n        </div>\n    </div>--></div>');
$templateCache.put('app/components/attach-item/attach-item.html','<div class="attach-item"><div class="attach-item__body"><a ng-click="vm.openAttach()"><div class="attach-item__image" ng-if="vm.attach.mime === \'image/png\' || vm.attach.mime === \'image/jpeg\'" style="background-image: url(\'{{ vm.CONFIG.AttachUrl }}{{ vm.message.number }}?mbox={{ vm.message.mbox }}&part=attach&filename={{ vm.attach.fileName }}&token={{ vm.user.access_token }}&connection_id={{ vm.message.connection_id }}\')"></div><div class="attach-item__image" ng-if="vm.attach.mime === \'image/svg+xml\'" style="background-image: url(\'{{ vm.CONFIG.AttachUrl }}{{ vm.message.number }}?mbox={{ vm.message.mbox }}&part=attach&filename={{ vm.attach.fileName }}&token={{ vm.user.access_token }}&connection_id={{ vm.message.connection_id }}&screen=true\')"></div><div class="attach-item__image" ng-if="vm.attach.mime === \'application/pdf\'" style="background-image: url(\'{{ vm.CONFIG.AttachUrl }}{{ vm.message.number }}?mbox={{ vm.message.mbox }}&part=attach&filename={{ vm.attach.fileName }}&token={{ vm.user.access_token }}&connection_id={{ vm.message.connection_id }}&preview=1\')"></div><div class="attach-item__image attach-item__image--file" style="background-image: url(images/attachments/{{ vm.fileFormat }}.png)"></div></a></div><div class="attach-item__name2">{{ vm.attach.title }}</div></div>');
$templateCache.put('app/components/attach-upload/attach-upload.html','<div class="attach-upload"><div class="attach-upload__list"><div class="attach-upload__item" ng-repeat="attachment in vm.attachmentsData"><!--            <div class="attach-upload__image"\n                 ng-class="{\'attach-upload__image&#45;&#45;shadow\': attachment.mime === \'image/jpeg\' || attachment.mime === \'image/png\'}">\n                <img ng-src="{{ vm.getLink(attachment) }}"\n                     fallback-src="{{\'/images/upload-image.png\'}}"\n                     ng-if="attachment.mime === \'image/jpeg\' || attachment.mime === \'image/png\'">\n                <img src="/images/upload-file.png"\n                     ng-if="attachment.mime !== \'image/jpeg\' && attachment.mime !== \'image/png\'">\n            </div>--><div class="attach-upload__image" style="background-image: url(\'{{ vm.getLink(attachment) }}\')" ng-if="attachment.mime === \'image/jpeg\' || attachment.mime === \'image/png\'" ng-class="{\'attach-upload__image--shadow\': attachment.mime === \'image/jpeg\' || attachment.mime === \'image/png\'}"></div><div class="attach-upload__image" style="background-image: url(\'/images/upload-file.png\')" ng-if="attachment.mime !== \'image/jpeg\' && attachment.mime !== \'image/png\'"></div><div class="attach-upload__name">{{ attachment.mime.split(\'/\')[1]; }}</div><div class="attach-upload__links" ng-if="!vm.isUploading"><a class="attach-upload__delete icon-delete" href ng-click="vm.remove(attachment)"></a></div><div class="attach-upload__spinner"><spinner is-global="false" is-open="true" ng-if="vm.isUploading"></spinner></div></div></div></div>');
$templateCache.put('app/components/avatar-name/avatar-name.html','<img class="avatar__image" src="/images/avatar-personal.svg" alt="" ng-if="!vm.firstLetter && !vm.emailLetter"><div class="avatar__symbol-image" ng-if="vm.firstLetter || vm.emailLetter"><div class="avatar__first-name">{{ vm.firstLetter ? vm.firstLetter : vm.emailLetter }}</div><div class="avatar__last-name" ng-if="vm.lastLetter">{{ vm.lastLetter }}</div></div>');
$templateCache.put('app/components/avatar-upload/avatar-upload-popup.html','<avatar-upload on-close="cancel()"></avatar-upload>');
$templateCache.put('app/components/avatar-upload/avatar-upload.html','<form name="uploadForm" ng-submit="vm.upload(vm.avatar.croppedDataUrl, vm.avatar.picFile.name)"><div class="popup__head"><span class="popup__head-title">{{ \'PROFILE_PORTRAIT\' | translate }}</span> <button class="icon-close btn btn--not-style btn--main-mobile-color btn--size_s" type="button" ng-click="vm.close()"></button><hr class="hr hr--popup"></div><div class="popup__content pdd--20"><div class="flex flex--just-cn"><div class="avatar-upload__crop" ngf-drop ngf-pattern="image/*" ng-if="vm.avatar.picFile" style="width:283px;height:283px"><img-crop image="vm.avatar.picFile | ngfDataUrl" result-image="vm.avatar.croppedDataUrl"></img-crop></div><img class="avatar-upload__default img-responsive" style="width:260px;height:260px" src="/images/avatar-300.png" ng-if="!vm.avatar.picFile"></div><div class="font--center"><button class="btn btn--size_l btn--normal mrg--t30" ngf-select accept="image/*" ngf-max-size="50MB" ng-model="vm.avatar.picFile">{{ \'AVATAR_LOAD_IMAGE\' | translate }}</button><p class="font--size12 color--gray mrg--t10">{{ \'AVATAR_UPLOAD_TEXT_NOTYF\' | translate }}</p></div></div><div class="popup__footer"><button class="btn btn--yellow btn--no-radius width--all height--min-inh font--size20" type="submit">{{ \'SAVE\' | translate }}</button></div></form>');
$templateCache.put('app/components/choice-language/choice-language.html','<div class="choice-language choice-language--main-footer" ng-class="{\'choice-language--open\': vm.isOpen}"><a class="choice-language__link" href ng-click="vm.selectLang(lang); vm.isOpen = !vm.isOpen;" ng-repeat="lang in vm.lang.items" ng-class="{\'choice-language--active\': lang.lang === vm.lang.selected.lang}"><img class="choice-language__country" src="images/country/{{ lang.icon }}"></a></div>');
$templateCache.put('app/components/compose-header/compose-header.html','<div class="inbox-header"><div class="inbox-header__row"><div class="inbox-header__item"><a class="inbox-header__link" href><span class="icon-redo inbox-header__icon inbox-header__icon--green"></span> <span class="inbox-header__name">\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C</span></a></div><!--        <div class="inbox-header__item pull-right">\n            <a class="inbox-header__link" href>\n                <span class="icon-redo inbox-header__icon inbox-header__icon&#45;&#45;green"></span>\n                <span class="inbox-header__name">\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C</span>\n            </a>\n        </div>--></div></div>');
$templateCache.put('app/components/contact-to-add-select/contact-to-add-select.html','<tags-input class="tags-input" ng-model="vm.addresses" type="email" name="{{ vm.name }}" template="tag-template" template-scope="vm" key-property="id" display-property="first_name" on-tag-adding="vm.onTagAdding($tag)" replace-spaces-with-dashes="true" allow-dblclick-to-edit="true" ng-focus="isTagFocus = true" ng-blur="isTagFocus = false" add-on-space="true" placeholder="{{ vm.placeholder }}" autofocus="vm.isAutofocus"><auto-complete source="vm.findContacts($query, isTagFocus)" min-length="0" load-on-focus="true" load-on-empty="false" max-results-to-show="5" template="autocomplete-template"></auto-complete></tags-input><script type="text/ng-template" id="tag-template"><div class="tag-contact font-sizer--bigger-15 tag-contact__autocomplete-item"\n         ng-dblclick="$event.stopPropagation();">\n        <div class="avatar avatar--size20 mrg--r7">\n            <avatar-name name="data.first_name" email="data.emails[0].value"></avatar-name>\n        </div>\n        <div class="tag-contact__name" ng-if="data.first_name">\n            {{ data.first_name }}\n            {{ data.last_name }}\n        </div>\n        <div class="tag-contact__email" ng-if="!data.first_name">\n            {{ data.emails[0].value }}\n        </div>\n        <a class="tag-remove btn btn--not-style icon-close"\n           href\n           ng-click="$removeTag()"></a>\n    </div></script><script type="text/ng-template" id="autocomplete-template"><div class="tag-contact">\n        <div class="tag-contact__avatar avatar avatar--size28 mrg--r16 avatar--bg-color">\n            <avatar-name name="data.first_name" email="data.emails[0].value"></avatar-name>\n        </div>\n\n        <div class="tag-contact__info">\n            <div class="tag-contact__name">\n                {{ data.first_name }}\n                {{ data.last_name }}\n            </div>\n            <div class="tag-contact__email"\n\n                 ng-if="data.emails[0].value">\n                {{ data.emails[0].value }}\n            </div>\n            <!--ng-class="{\'mrg--l10\': data.first_name}"-->\n\n        </div>\n\n        <div class="tag-contact__phone"\n             ng-class="{\'mrg--l10\': data.first_name || data.emails[0].value}"\n             ng-if="data.phone">\n            {{ data.phone }}\n        </div>\n    </div></script>');
$templateCache.put('app/components/date-sort/date-sort.html','<div class="radiobutton main-switch-3 radiobutton--size_sm"><button class="search-filters__button-tab" type="button" ng-click="vm.selectDefault();">2017:</button> <button class="search-filters__button-tab search-filters__button-tab--is-choose" type="button" ng-click="vm.selectDate($index);" ng-repeat="month in vm.monthList">{{ month }}</button> <button class="search-filters__button-tab" type="button" ng-click="vm.selectDefault();">{{ \'ALL_MAIL2\' | translate }}</button></div>');
$templateCache.put('app/components/folder-clear-confirm/folder-clear-confirm-popup.html','<folder-clear-confirm folder="folder" on-close="close(result)" on-cancel="cancel()"></folder-clear-confirm>');
$templateCache.put('app/components/folder-clear-confirm/folder-clear-confirm.html','<div class="popup__head"><span class="popup__head-title">{{ \'EMPTY_THE_FOLDER\' | translate }}</span> <button class="icon-close btn btn--not-style btn--main-mobile-color btn--size_s" type="button" ng-click="vm.cancel()"></button><hr class="hr hr--popup"></div><div class="popup__content pdd--20"><div class="font--center">{{ \'EMPTY_THE_FOLDER_MSG\' | translate: {folder: (vm.folder.name | translate)} }}</div></div><div class="popup__footer"><!--<button class="btn btn&#45;&#45;normal btn&#45;&#45;size_l  float&#45;&#45;left"--><!--type="button"--><!--ng-click="vm.cancel(">{{ \'CANCEL\' | translate }}--><!--</button>--> <button class="btn btn--yellow btn--no-radius width--all height--min-inh font--size20" type="button" ng-click="vm.close()">{{ \'DELETE_WITH_LETTERS\' | translate }}</button></div>');
$templateCache.put('app/components/folder-create/folder-create-popup.html','<folder-create on-\u0441lose="cancel()"></folder-create>');
$templateCache.put('app/components/folder-create/folder-create.html','<div class="popup__head"><span class="popup__head-title">{{ \'CREATED_FOLDER\' | translate }}</span> <button class="icon-close btn btn--not-style btn--main-mobile-color btn--size_s" type="button" ng-click="vm.close()"></button><hr class="hr hr--popup"></div><form name="form" ng-submit="vm.create(form)" novalidate><div class="popup__content pdd--20"><div><input class="input input--size_l width--all font--center" ng-class="{\'input--error\': form.mboxnew.$invalid}" name="mboxnew" ng-model="vm.form.model.mboxnew" type="text" autofocus="true" ng-maxlength="20" required placeholder="{{ \'NAME\' | translate }}"><!--<a class="link link&#45;&#45;dotted link&#45;&#45;violet font--size13" href="">\u0412\u043B\u043E\u0436\u0438\u0442\u044C \u0432 \u0434\u0440\u0443\u0433\u0443\u044E \u043F\u0430\u043F\u043A\u0443</a>--></div></div><div class="popup__footer"><button class="btn btn--yellow btn--no-radius width--all height--min-inh font--size20" type="submit">{{ \'CREATE_FOLDER\' | translate }}</button></div></form>');
$templateCache.put('app/components/folder-delete-confirm/folder-delete-confirm-popup.html','<folder-delete-confirm folder="folder" on-close="close(result)" on-cancel="cancel()"></folder-delete-confirm>');
$templateCache.put('app/components/folder-delete-confirm/folder-delete-confirm.html','<div class="popup__head"><span class="popup__head-title">{{ \'DELETING_FOLDER\' | translate }}</span> <button class="icon-close btn btn--not-style btn--main-mobile-color btn--size_s" type="button" ng-click="vm.cancel()"></button><hr class="hr hr--popup"></div><div class="popup__content pdd--20"><div class="mrg--b6 font--size16">{{ \'DELETING_FOLDER_MSG\' | translate: {folder: (vm.folder.name | translate), messageCount: vm.folder.messagesCount} }}</div></div><div class="popup__footer"><button class="btn btn--yellow btn--no-radius width--all height--min-inh font--size20" type="button" ng-click="vm.close()">{{ \'DELETE_WITH_LETTERS\' | translate }}</button></div>');
$templateCache.put('app/components/folder-edit/folder-edit-popup.html','<folder-edit model="model" on-\u0441lose="cancel()"></folder-edit>');
$templateCache.put('app/components/folder-edit/folder-edit.html','<div class="popup__head"><span class="popup__head-title">{{ \'RENAME_FOLDER\' | translate }}</span> <button class="icon-close btn btn--not-style btn--main-mobile-color btn--size_s" type="button" ng-click="vm.close()"></button><hr class="hr hr--popup"></div><form name="form" ng-submit="vm.update(form)" novalidate><div class="popup__content pdd--20"><!--<div class="mrg&#45;&#45;b6">--><!--<span>{{ \'NAME\' | translate }}</span>--><!--</div>--><div><input class="input input--size_l width--all font--center" name="mboxnew" ng-model="vm.form.model.mboxnew" type="text" autofocus="true" ng-maxlength="20" required placeholder="{{ \'NAME\' | translate }}"><!--<a class="link link&#45;&#45;dotted link&#45;&#45;violet font--size13" href="">\u0412\u043B\u043E\u0436\u0438\u0442\u044C \u0432 \u0434\u0440\u0443\u0433\u0443\u044E \u043F\u0430\u043F\u043A\u0443</a>--></div></div><div class="popup__footer"><button class="btn btn--yellow btn--no-radius width--all height--min-inh font--size20" type="submit">{{ \'SAVE\' | translate }}</button></div></form>');
$templateCache.put('app/components/folder-layout/folder-layout.html','<div class="folder-layout" ng-if="vm.isOpen"><div class="folder-layout__container"><div class="folder-layout__header"><div class=""><span class="icon-d-folder folder-layout__icon"></span> <span>{{ \'FOLDERS\' | translate }}</span></div><span class="font--size12" ng-click="vm.close()">{{ \'CLOSE\' | translate }}</span><!--<hr class="hr hr&#45;&#45;folders hr&#45;&#45;bottom">\u044B--></div><div class="folder-layout__content scroll-fix"><hr class="hr hr--folders hr--top"><!-- \u0421\u0432\u043E\u0438 \u043F\u0430\u043F\u043A\u0438--><!-- \u041E\u0442\u0434\u0435\u043B\u0438\u0442\u0435\u043B\u044C--><div class="folder-layout__separate mrg--b10"><span class="font--size12">{{ \'MY_FOLDERS\' | translate }}</span><hr class="hr hr--folders hr--bottom"></div><!-- \u0421\u0430\u043C\u0438 \u0438\u0442\u0435\u043C\u044B--><div class="folder-layout__item" ng-repeat="folder in vm.folders.items" ng-click="vm.move(folder)" ng-if="folder.isSub"><span class="icon-folder-desk folder-layout__icon"></span> <span class="folder-layout__title">{{ folder.name | translate }}</span></div><!--            <div class="folder-layout__item">\n                            <span class="icon-folder folder-layout__icon"></span>\n                            <span class="folder-layout__title">\u041C\u043E\u044F \u043F\u0430\u043F\u043A\u0430 1</span>\n                        </div>\n\n                        <div class="folder-layout__item">\n                            <span class="icon-folder folder-layout__icon"></span>\n                            <span class="folder-layout__title">\u041C\u043E\u044F \u043F\u0430\u043F\u043A\u0430 2</span>\n                        </div>\n\n                        <div class="folder-layout__item">\n                            <span class="icon-folder folder-layout__icon"></span>\n                            <span class="folder-layout__title">\u041C\u043E\u044F \u043F\u0430\u043F\u043A\u0430 3</span>\n                        </div>--><!-- \u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u043D\u044B\u0435 \u043F\u0430\u043F\u043A\u0438--><!-- \u041E\u0442\u0434\u0435\u043B\u0438\u0442\u0435\u043B\u044C--><div class="folder-layout__separate mrg--b10"><span class="font--size12">{{ \'MAIN_FOLDERS\' | translate }}</span><hr class="hr hr--folders hr--bottom"></div><div class="folder-layout__item" ng-repeat="folder in vm.folders.items" ng-click="vm.move(folder)" ng-if="!folder.isSub && folder.name !== vm.$state.params.mbox"><span class="{{ folder.icon }} folder-layout__icon"></span> <span class="folder-layout__title">{{ folder.name | translate }}</span></div></div><!--<div class="folder-layout__footer">--><!--<hr class="hr hr&#45;&#45;folders hr&#45;&#45;top">--><!--<span class="icon-settings folder-layout__icon"></span>--><!--<span class="folder-layout__title">\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043F\u0430\u043F\u043A\u0430\u043C\u0438</span>--><!--</div>--></div></div>');
$templateCache.put('app/components/inbox-footer/inbox-footer.html','<div class="inbox-footer"><div class="inbox-footer__content"><!-- \u041A\u043D\u043E\u043F\u043A\u0430 \u043F\u0435\u0440\u0435\u0445\u043E\u0434\u0430 \u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u043F\u0438\u0441\u044C\u043C\u0430--><div class="inbox-footer__new-message" ng-if="!vm.messages.checked.length"><button class="btn btn--red btn--size_50 btn--radius_3 btn--padding-5 icon-write" ui-sref="mail.compose"></button></div><hr class="hr hr--inbox-footer"><!-- \u041D\u0438\u0436\u043D\u0435\u0435 \u043C\u0435\u043D\u044E \u043E\u043F\u0446\u0438\u0439 \u0434\u043B\u044F \u0432\u044B\u0434\u0435\u043B\u0435\u043D\u044B\u0445 \u043F\u0438\u0441\u0435\u043C --><div class="inbox-footer__group-option" ng-if="vm.messages.checked.length" ng-class="{\'is-more-switch\': vm.isMoreSwitch}"><div class="inbox-footer__group-option-wrapper"><div class="inbox-footer__group-option-content"><!-- \u043F\u0435\u0440\u0432\u0438\u0447\u043D\u044B\u0435 \u043A\u043D\u043E\u043F\u043A\u0438--> <button class="inbox-footer__group-option-item btn btn--not-style icon-delete font--size20 flex flex--column align-items--cn color--light-red padding" type="button" ng-if="vm.$state.params.mbox !== \'Trash\'" ng-click="vm.move({name: \'Trash\', caption: (\'BASKET\' | translate)})"><span class="font--arial font--size14 mrg--t5">{{ \'DELETE\' | translate }}</span></button> <button class="inbox-footer__group-option-item btn btn--not-style icon-delete font--size20 flex flex--column align-items--cn color--light-red padding" type="button" ng-if="vm.$state.params.mbox === \'Trash\'" ng-click="vm.destroy({name: \'Trash\'})"><span class="font--arial font--size14 mrg--t5">{{ \'DELETE\' | translate }}</span></button> <button class="inbox-footer__group-option-item btn btn--not-style icon-spam font--size20 flex flex--column align-items--cn color--yellow padding" type="button" ng-if="vm.$state.params.mbox !== \'Junk\'" ng-click="vm.move({name: \'Junk\', caption: (\'SPAM\' | translate)})"><span class="font--arial font--size14 mrg--t5">{{ \'SPAM\' | translate }}</span></button> <button class="inbox-footer__group-option-item btn btn--not-style icon-spam font--size20 flex flex--column align-items--cn color--yellow padding" type="button" ng-if="vm.$state.params.mbox === \'Junk\'" ng-click="vm.move({name: \'Inbox\', caption: (\'INBOX\' | translate)})"><span class="font--arial font--size14 mrg--t5">{{ \'NOT_SPAM\' | translate }}</span></button> <button class="inbox-footer__group-option-item btn btn--not-style btn--not-events icon-email font--size20 flex flex--column align-items--cn padding" type="button" ng-click="vm.triggerSeen()"><span class="font--arial font--size14 mrg--t5" ng-if="vm.isSeen">{{ \'NOT_READ\' | translate }}</span> <span class="font--arial font--size14 mrg--t5" ng-if="!vm.isSeen">{{ \'READ\' | translate }}</span></button><!-- \u043F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0430\u0442\u0435\u043B\u044C--> <button class="inbox-footer__group-option-item inbox-footer__group-option-item-switch btn btn--not-style icon-double-arrow-right font--size20 flex flex--column align-items--cn padding" type="button" ng-click="vm.isMoreSwitch = !vm.isMoreSwitch"><span class="font--arial font--size14 mrg--t5">{{ \'YET\' | translate }}</span></button><!-- \u0432\u0442\u043E\u0440\u0438\u0447\u043D\u044B\u0435 \u043A\u043D\u043E\u043F\u043A\u0438--> <button class="inbox-footer__group-option-item btn btn--not-style icon-folders font--size20 flex flex--column align-items--cn padding" type="button" ng-click="vm.openLayoutFolder()"><span class="font--arial font--size14 mrg--t5">{{ \'IN_FOLDER\' | translate }}</span></button> <button class="inbox-footer__group-option-item btn btn--not-style icon-markers font--size20 flex flex--column align-items--cn padding" type="openTagListPopup" ng-click="vm.openTagListPopup()"><span class="font--arial font--size14 mrg--t5">{{ \'TAGS\' | translate }}</span></button> <button class="inbox-footer__group-option-item btn btn--not-style btn--not-events icon-archive font--size20 flex flex--column align-items--cn padding" type="button" ng-click="vm.move({name: \'Archive\', caption: (\'Archive\' | translate)})"><span class="font--arial font--size14 mrg--t5">{{ \'Archive\' | translate }}</span></button></div></div></div></div></div>');
$templateCache.put('app/components/inbox-header/inbox-header.html','<!--\n<div class="inbox-header">\n    <div class="inbox-header__row">\n        <div class="inbox-header__item">\n            <a class="inbox-header__link" ui-sref="mail.compose">\n                <span class="icon-write inbox-header__icon inbox-header__icon--blue"></span>\n                <span class="inbox-header__name">\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C</span>\n            </a>\n        </div>\n        <div class="inbox-header__item">\n            <a class="inbox-header__link" href>\n                <span class="icon-redo inbox-header__icon inbox-header__icon--green"></span>\n                <span class="inbox-header__name">\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C</span>\n            </a>\n        </div>\n        <div class="inbox-header__item">\n            <a class="inbox-header__link" href>\n                <span class="icon-forward-old inbox-header__icon inbox-header__icon--blue"></span>\n                <span class="inbox-header__name">\u041F\u0435\u0440\u0435\u0441\u043B\u0430\u0442\u044C</span>\n            </a>\n        </div>\n        <div class="inbox-header__item">\n            <a class="inbox-header__link" href>\n                <span class="icon-bin inbox-header__icon inbox-header__icon--red"></span>\n                <span class="inbox-header__name">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</span>\n            </a>\n        </div>\n        <div class="inbox-header__item">\n            <a class="inbox-header__link" href>\n                <span class="icon-spam inbox-header__icon inbox-header__icon--yellow"></span>\n                <span class="inbox-header__name">\u0421\u043F\u0430\u043C</span>\n            </a>\n        </div>\n        <div class="inbox-header__item">\n            <a class="inbox-header__link" href>\n                <span class="icon-unread inbox-header__icon inbox-header__icon--blue"></span>\n                <span class="inbox-header__name">\u041D\u0435 \u043F\u0440\u043E\u0447\u0438\u0442\u0430\u043D\u043E</span>\n            </a>\n        </div>\n        <div class="inbox-header__item">\n            <a class="inbox-header__link" href\n               uib-popover-template="\'app/components/tag-list/tag-list-popover.html\'"\n               popover-class="popover--tag-list"\n               popover-placement="bottom"\n               popover-animation="true"\n               popover-trigger="\'outsideClick\'">\n                <span class="icon-tag inbox-header__icon inbox-header__icon--blue"></span>\n                <div class="inbox-header__name">\n                    \u0422\u044D\u0433\n                    <span class="icon-arrow-down inbox-header__name-icon"></span>\n                </div>\n            </a>\n        </div>\n        <div class="inbox-header__item">\n            <a class="inbox-header__link" href\n               uib-popover-template="\'app/components/folder-list/folder-list-popover.html\'"\n               popover-class="popover--folder-list"\n               popover-placement="bottom"\n               popover-animation="true"\n               popover-trigger="\'outsideClick\'">\n                <span class="icon-folder inbox-header__icon inbox-header__icon--blue"></span>\n                <div class="inbox-header__name">\n                    \u0412 \u043F\u0430\u043F\u043A\u0443\n                    <span class="icon-arrow-down inbox-header__name-icon"></span>\n                </div>\n            </a>\n        </div>\n        <div class="inbox-header__item">\n            <a class="inbox-header__link" href>\n                <span class="icon-archive inbox-header__icon inbox-header__icon--blue"></span>\n                <span class="inbox-header__name">\u0410\u0440\u0445\u0438\u0432\u0438\u0440\u043E\u0432\u0430\u0442\u044C</span>\n            </a>\n        </div>\n        <div class="inbox-header__item">\n            <a class="inbox-header__link" href>\n                <span class="icon-pin inbox-header__icon inbox-header__icon--blue"></span>\n                <span class="inbox-header__name">\u0417\u0430\u043A\u0440\u0435\u043F\u0438\u0442\u044C</span>\n            </a>\n        </div>\n        <div class="inbox-header__item">\n            <a class="inbox-header__link" href>\n                <span class="icon-mobile-menu-hinbox-header__icon inbox-header__icon--blue"></span>\n                <span class="inbox-header__name">\u0415\u0449\u0435</span>\n            </a>\n        </div>\n    </div>\n</div>\n-->');
$templateCache.put('app/components/inbox-message/inbox-message.html','<div class="inbox-message" ng-class="{\'inbox-message--importmant\': vm.message.important,\n                \'inbox-message--new\': !vm.message.seen,\n                \'inbox-message--checked\': vm.message.isChecked}" ng-mouseover="vm.message.hover = true" ng-mouseleave="vm.message.hover = false" ng-click="vm.goToUrl()" inbox-message-hover><div class="inbox-message__left"><label ng-click="$event.stopPropagation();"><div class="inbox-message__avatar"><message-avatar message="vm.message"></message-avatar></div></label><div class="inbox-message__round" ng-click="vm.setSeen(); $event.stopPropagation();"><div class="round round--border" ng-class="{\'round--yellow\': !vm.message.seen}"></div></div></div><div class="inbox-message__center"><div class="inbox-message__head"><div class="inbox-message__importance" ng-if="vm.message.important"><span class="important-tags important-tags--active"></span></div><div class="inbox-message__name" ng-if="vm.$state.params.mbox !== \'Sent\' && vm.$state.params.mbox !== \'Drafts\'">{{ vm.message.from ? vm.message.from : vm.message.fromAddress }}</div><div class="inbox-message__name" ng-if="vm.$state.params.mbox === \'Sent\' || vm.$state.params.mbox === \'Drafts\'">{{ vm.message.to[0].address }}</div><div class="inbox-message__head-right"><div class="inbox-message__attach" ng-if="vm.message.attachments"><span class="icon-affix"></span></div><div class="inbox-message__data"><to-date date="vm.message.date.date" is-small="true"></to-date></div></div></div><div class="inbox-message__text"><div class="inbox-message__subject">{{ vm.message.Subject }}</div><div class="inbox-message__message"><div class="text--dots" ng-bind-html="vm.message.body"></div></div></div><div class="inbox-message__labels"><div class="inbox-message__label letter-tags" ng-repeat="tag in vm.message.tags track by $index" style="background: {{ tag.bgcolor }}"><span class="letter-tags__name">{{ tag.tag_name }}</span><!--<span class="letter-tags__icon icon-label-message font&#45;&#45;size21" style="color: {{ tag.bgcolor }}"></span>--> <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16 16" style="enable-background:new 0 0 16 16" xml:space="preserve" id="ico_label-message" class="letter-tags__icon"><path class="" style="fill: {{ tag.bgcolor }}" d="M8.2,0H0v16h8.2c7.7,0,7.8-7.9,7.8-7.9C16,0.1,8.3,0,8.2,0z M8,5.8c1.2,0,2.2,1,2.2,2.2c0,1.2-1,2.2-2.2,2.2S5.8,9.2,5.8,8\n                    C5.8,6.8,6.8,5.8,8,5.8z"/></svg><!--<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 40 36" id="ico_label-message"  class="letter-tags__icon" >--><!--&lt;!&ndash;<use xlink:href="#ico_label-message" style="fill: {{ tag.bgcolor }}"></use>&ndash;&gt;--><!--<g >--><!--<path  d="M29.7532378,33.5724399 C28.7839322,34.9145554 26.6584255,36 25.0035095,36 L2.99649048,36 C1.3504982,36 0,34.6535323 0,32.9925801 L0,3.00741988 C0,1.34553934 1.34157448,0 2.99649048,0 L25.0035095,0 C26.6495018,0 28.7849513,1.08685567 29.7532378,2.42756009 L39.2467622,15.5724399 C40.2160678,16.9145554 40.2150487,19.0868557 39.2467622,20.4275601 L29.7532378,33.5724399 L29.7532378,33.5724399 Z M26,14 C28.209139,14 30,15.790861 30,18 C30,20.209139 28.209139,22 26,22 C23.790861,22 22,20.209139 22,18 C22,15.790861 23.790861,14 26,14 L26,14 Z">--><!--</path>--><!--</g>--><!--</svg>--></div></div></div><div class="inbox-message__right"><button class="inbox-message__right-btn btn btn--size_m btn--size_28 icon-mobile-menu-h btn--not-style btn--not-events" type="button" ng-click="vm.openMessageMenu(); $event.stopPropagation();"></button></div></div>');
$templateCache.put('app/components/inbox-message-list/inbox-message-list.html','<div class="inbox-message-list" ng-class="{\'inbox-message-list--indentation\': vm.messages.checked.length}"><inbox-message message="message" messages="vm.messages" ng-repeat="message in vm.messages.items"></inbox-message><div class="inbox-message-list__spinner"><spinner is-open="vm.messages.isLoading"></spinner></div></div>');
$templateCache.put('app/components/lang-list/lang-list-popover.html','<lang-list messages="vm.messages" use-lang="vm.useLang" on-close="vm.isOpenLangList = false"></lang-list>');
$templateCache.put('app/components/lang-list/lang-list.html','<div class="lang-list lang-list--auto-height"><div class="lang-list__links"><a class="lang-list__link" href ng-repeat="lang in vm.lang.items" ng-click="vm.selectLang(lang)"><img class="lang-list__country" src="images/country/{{ lang.icon }}"> <span class="lang-list__name">{{ lang.lang | translate }}</span></a></div></div>');
$templateCache.put('app/components/menu-bottom/menu-bottom.html','<div class="menu-bottom" ng-if="vm.isOpen"><div class="menu-bottom__container flex flex--column"><div class="menu-bottom__caption">{{ \'SAVE_CHANGES\' | translate }}?</div><div class="mrg--auto"><button class="btn btn--size_l btn--yellow mrg--b10 width--all" type="button" ng-click="vm.destroy()">{{ \'NOT_SAVE\' | translate }}</button> <button class="btn btn--size_l btn--yellow width--all" type="button" ng-click="vm.save()">{{ \'SAVE_AND_GO\' | translate }}</button></div></div><button class="menu-bottom__cancel btn--not-style" type="button" ng-click="vm.isOpen = false;"></button></div>');
$templateCache.put('app/components/message-avatar/message-avatar.html','<div class="{{ vm.classNames }}" ng-class="{\'avatar avatar--settings avatar--size42 avatar--second-style\': !vm.classNames}"><avatar-name name="vm.message.from" email="vm.message.fromAddress" ng-if="(!vm.message.avatar || !vm.isAvatarIsSuccess) && (vm.$state.params.mbox !== \'Sent\' && vm.$state.params.mbox !== \'Drafts\')"></avatar-name><avatar-name name="vm.message.to[0].name" email="vm.message.to[0].address" ng-if="(!vm.message.avatar || !vm.isAvatarIsSuccess) && (!vm.user.profile.photo && (vm.$state.params.mbox === \'Sent\' || vm.$state.params.mbox === \'Drafts\'))"></avatar-name><img class="avatar__image" ng-hide="!vm.isAvatarIsSuccess" ng-if="vm.message.avatar && !vm.isAvatarIsError" ng-src="{{ vm.message.avatar }}" image-load image-load-is-error="vm.isAvatarIsError" image-load-is-success="vm.isAvatarIsSuccess" image-load-is-loading="vm.isAvatarIsLoading"><div class="inbox-message__check-message"></div><input type="checkbox" ng-model="vm.message.isChecked" style="display: none" data-checklist-model="vm.messages.checked" data-checklist-value="vm.message"></div>');
$templateCache.put('app/components/message-menu/message-menu.html','<div class="popup__head"><span class="popup__head-title">{{ \'MESSAGE_ACTION\' | translate }}</span> <button class="icon-close btn btn--not-style btn--main-mobile-color btn--size_s" type="button" ng-click="vm.close()"></button><hr class="hr hr--popup"></div><div class="popup__content scroll-fix"><div class="popup__item" ng-click="vm.goToAnswer()"><span class="icon-replied-old popup__icon"></span> <span class="popup__item__title">{{ \'REPLAY\' | translate }}</span></div><!--<div class="popup__item" ng-click="vm.goToFwd()">--><!--<span class="icon-reply-all popup__icon"></span>--><!--<span class="popup__item__title">\u041E\u0442\u0432\u0435\u0442\u0438\u0442\u044C \u0432\u0441\u0435\u043C</span>--><!--</div>--><div class="popup__item" ng-click="vm.goToFwd()"><span class="icon-forward-old popup__icon"></span> <span class="popup__item__title">{{ \'FORWARD\' | translate }}</span></div><div class="popup__item" ng-if="vm.$state.params.mbox !== \'Trash\'" ng-click="vm.move({name: \'Trash\', caption: (\'Trash\' | translate)})"><span class="icon-delete popup__icon color--light-red"></span> <span class="popup__item__title">{{ \'DELETE\' | translate }}</span></div><div class="popup__item" ng-if="vm.$state.params.mbox === \'Trash\'" ng-click="vm.destroy({name: \'Trash\'})"><span class="icon-delete popup__icon color--light-red"></span> <span class="popup__item__title">{{ \'DELETE\' | translaste }}</span></div><div class="popup__item" ng-click="vm.triggerSeen()"><span class="icon-email popup__icon"></span> <span class="popup__item__title" ng-if="!vm.message.seen">{{ \'READ\' | translate }}</span> <span class="popup__item__title" ng-if="vm.message.seen">{{ \'NOT_READ\' | translate }}</span></div><div class="popup__item" ng-click="vm.openLayoutFolder()"><span class="icon-folders popup__icon"></span> <span class="popup__item__title">{{ \'IN_FOLDER\' | translate }}</span></div><div class="popup__item" ng-click="vm.openTagListPopup()"><span class="icon-markers popup__icon"></span> <span class="popup__item__title">{{ \'TAGS\' | translate }}</span></div><div class="popup__item" ng-click="vm.move({name: \'Archive\', caption: (\'Archive\' | translate)})"><span class="icon-archive popup__icon"></span> <span class="popup__item__title">{{ \'TO_ARCHIVE\' | translate }}</span></div><div class="popup__item" ng-if="vm.$state.params.mbox === \'Junk\'" ng-click="vm.move({name: \'INBOX\', caption: (\'INBOX\' | translate)})"><span class="icon-spam popup__icon color--yellow"></span> <span class="popup__item__title">{{ \'NOT_SPAM\' | translate }}</span></div><div class="popup__item" ng-if="vm.$state.params.mbox !== \'Junk\'" ng-click="vm.move({name: \'Junk\', caption: (\'SPAM\' | translate) })"><span class="icon-spam popup__icon color--yellow"></span> <span class="popup__item__title">{{ \'SPAM\' | translate }}</span></div><!--    <div class="popup__item">\n            <span class="icon-pin popup__icon"></span>\n            <span class="popup__item__title">\u0417\u0430\u043A\u0440\u0435\u043F\u0438\u0442\u044C</span>\n        </div>--><div class="popup__item" ng-click="vm.setImportant()"><span class="icon-flagged_bg popup__icon color--semi-dark-red"></span> <span class="popup__item__title" ng-if="!vm.message.important">{{ \'IMPORTANT_ONE\' | translate }}</span> <span class="popup__item__title" ng-if="vm.message.important">{{ \'NO_IMPORTANT_ONE\' | translate }}</span></div></div>');
$templateCache.put('app/components/profile-form/profile-form.html','<form class="form" name="form" ng-submit="vm.save(form)"><div class="personal-info__user-name"><div class="personal-info__user-info-title main-title-text font--size16 font--bold">{{ \'YOUR_NAME\' | translate }}</div><div class="flex"><div class="width--all mrg--r10"><input class="input input--size_m width--inh font--size14" type="text" placeholder="{{ \'INPUT_PLACEHOLDER_YOUR_NAME\' | translate }}" ng-model="vm.profileForm.user_name"><!--<span class="notific mrg&#45;&#45;t5 font&#45;&#45;size15">{{ \'YOUR_LOGIN_NOT_CHANGED\' | translate }}</span>--></div><button class="btn btn--size_m btn--y-gradient btn--border-dark float--right" type="submit">{{ \'SAVE\' | translate }}</button></div></div></form>');
$templateCache.put('app/components/search-mail/search-mail.html','<div class="search-mail wrap-content"><div class="search-mail__header"><div class="radiobutton main-switch radiobutton--size_sm width--all"><input class="main-switch__input" type="radio" name="folder" ng-change="vm.search()" ng-value="\'ALL\'" ng-model="vm.folders.selected.name"> <span class="radiobutton--size_sm main-switch__btn main-switch__btn--firs width--inh font--size15">{{ \'ALL_MAIL2\' | translate }}</span> <input class="main-switch__input" type="radio" name="folder" ng-change="vm.search()" ng-value="\'INBOX\'" ng-model="vm.folders.selected.name"> <span class="radiobutton--size_sm main-switch__btn main-switch__btn--last width--inh font--size15">{{ \'INBOX\' | translate }}</span></div><button class="search-mail__button-filter btn btn--not-style btn--size_sm btn--main-mobile-color font--size18 pdd--r0" type="button" ng-click="vm.isOpenFilters = !vm.isOpenFilters"><span class="icon-filter"></span></button><hr class="hr hr--header hr--size-h1"></div><div class="search-filters" ng-if="vm.isOpenFilters"><div class="search-filters__item"><ui-select ng-model="vm.searchParts.selected" search-enabled="false" class="select-list select-list--size_m select-list--not-border-of-sides width--all" theme="select2" on-select="vm.search(); vm.isOpenFilters = false"><ui-select-match class="select-list__body select-list--size_m width--inh pdd--r30 pdd--l12">{{ $select.selected.name | translate }}</ui-select-match><ui-select-choices repeat="item in vm.searchParts.list track by $index"><div ng-bind-html="item.name | translate"></div></ui-select-choices></ui-select></div><div class="search-filters__item"><ui-select ng-model="vm.folders.selected" class="select-list select-list--size_m select-list--not-border-of-sides width--all" search-enabled="false" theme="select2" on-select="vm.search(); vm.isOpenFilters = false"><ui-select-match class="select-list__body select-list--size_m width--inh pdd--r30 pdd--l12">{{ $select.selected.name | translate }}</ui-select-match><ui-select-choices repeat="item in vm.folders.items track by $index"><div ng-class="{\'mrg--l10\': item.isSub}" ng-bind-html="item.name | translate"></div></ui-select-choices></ui-select></div><div class="search-filters__item"><ui-select ng-model="vm.tags.selected" search-enabled="false" class="select-list select-list--size_m select-list--not-border-of-sides width--all" theme="select2" on-select="vm.search(); vm.isOpenFilters = false"><ui-select-match class="select-list__body select-list--size_m width--inh pdd--r30 pdd--l12">{{ $select.selected.tag_name | translate }}</ui-select-match><ui-select-choices repeat="item in vm.tags.items track by $index">{{ item.tag_name | translate }}</ui-select-choices></ui-select></div><div class="search-filters__item"><label class="checkbox-big__label checkbox-big checkbox-big--size15" for="isAttach"><input class="checkbox-big__input" id="isAttach" type="checkbox" name="isAttach" ng-model="vm.searchForm.isAttach" ng-change="vm.search(); vm.isOpenFilters = false" value="important"><div class="checkbox-big__body"></div><span class="checkbox-big__text" role="presentation">{{ \'SEARCH_IS_ATTACH\' | translate }}</span></label></div><div class="search-filters__item"><date-sort from="vm.from" to="vm.to" class="search-filters__date-sort"></date-sort></div></div></div>');
$templateCache.put('app/components/settings-menu/settings-menu.html','<div class="settings-menu"><div class="settings-menu__body"><a class="settings-menu__title" ui-sref="settings.main">\u0412\u0441\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438</a><div class="settings-menu__row"><div class="row row--size15 mrg--t20"><div class="col-xs-6"><span class="icon-folder-star color--yellow font--size18"></span> <a class="settings-menu__link" href="">\u041F\u0430\u043F\u043A\u0438</a></div><div class="col-xs-6"><span class="icon-rules color--green font--size18"></span> <a class="settings-menu__link" href="">\u041F\u0440\u0430\u0432\u0438\u043B\u0430 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438</a></div></div><div class="row row--size15 mrg--t20"><div class="col-xs-6"><span class="icon-tag-star color--green font--size18"></span> <a class="settings-menu__link" href="">\u041F\u0440\u0430\u0432\u0438\u043B\u0430 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438</a></div><div class="col-xs-6"><span class="icon-contacts color--green font--size18"></span> <a class="settings-menu__link" href="">\u041F\u0440\u0430\u0432\u0438\u043B\u0430 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438</a></div></div></div></div></div>');
$templateCache.put('app/components/social-auth/social-auth.html','<div class="social-auth"><div class="social-icons width--inh"><a class="social-icons__icon social-icons__icon--s34 social-icons__icon--border-yellow social-icons--fb" href="{{ vm.CONFIG.APIHost }}/auth/social?authclient=facebook"><span class="icon-soc-fb"></span> </a><a class="social-icons__icon social-icons__icon--s34 social-icons__icon--border-yellow social-icons--gp" href="{{ vm.CONFIG.APIHost }}/auth/social?authclient=google"><span class="icon-soc-g"></span> </a><a class="social-icons__icon social-icons__icon--s34 social-icons__icon--border-yellow social-icons--tw" href="{{ vm.CONFIG.APIHost }}/auth/social?authclient=twitter"><span class="icon-soc-tw"></span> </a><a class="social-icons__icon social-icons__icon--s34 social-icons__icon--border-yellow social-icons--ln" href="{{ vm.CONFIG.APIHost }}/auth/social?authclient=linkedin"><span class="icon-soc-in"></span></a></div></div>');
$templateCache.put('app/components/spinner/spinner.html','<div class="spinner" ng-show="vm.isOpen"></div>');
$templateCache.put('app/components/tag-create/tag-create-popup.html','<tag-create messages="messages" on-close="cancel()"></tag-create>');
$templateCache.put('app/components/tag-create/tag-create.html','<div class="popup__head"><span class="popup__head-title">{{ \'CREATE_LABEL\' | translate }}</span> <button class="icon-close btn btn--not-style btn--main-mobile-color btn--size_s" type="button" ng-click="vm.close()"></button><hr class="hr hr--popup"></div><form name="paletteForm" ng-submit="vm.create(paletteForm)" novalidate><div class="popup__content pdd--20"><div><input class="input input--size_l width--all font--center" type="text" name="tag_name" ng-model="vm.paletteForm.model.tag_name" autofocus="true" ng-maxlength="20" required placeholder="{{ \'NAME\' | translate }}"></div><div class="palette-list"><input type="hidden" name="palette" ng-model="vm.paletteForm.model.bgcolor" required><div class="palette-list__item" style="background-color: {{ palette.color }}" ng-repeat="palette in vm.palette.items track by $index" ng-click="vm.select(palette)"><span class="palette-list__icon icon-check-box-mark" ng-if="palette.color === vm.palette.selected.color"></span></div></div></div><div class="popup__footer"><button class="btn btn--yellow btn--no-radius width--all height--min-inh font--size20" type="submit">{{ \'CREATE_TAG\' | translate }}</button></div></form>');
$templateCache.put('app/components/tag-edit/tag-edit-popup.html','<tag-edit model="model" on-close="cancel()"></tag-edit>');
$templateCache.put('app/components/tag-edit/tag-edit.html','<div class="popup__head"><span class="popup__head-title">{{ \'CREATE_LABEL\' | translate }}</span> <button class="icon-close btn btn--not-style btn--main-mobile-color btn--size_s" type="button" ng-click="vm.close()"></button><hr class="hr hr--popup"></div><form name="paletteForm" ng-submit="vm.update(paletteForm)" novalidate><div class="popup__content pdd--20"><div><input class="input input--size_l width--all font--center" type="text" name="tag_name" ng-model="vm.paletteForm.model.tag_name" autofocus="true" ng-maxlength="20" required placeholder="{{ \'NAME\' | translate }}"></div><div class="palette-list"><input type="hidden" name="palette" ng-model="vm.paletteForm.model.bgcolor" required><div class="palette-list__item" style="background-color: {{ palette.bgcolor }}" ng-repeat="palette in vm.palette.items track by $index" ng-click="vm.select(palette)"><span class="palette-list__icon icon-check-box-mark" ng-if="palette.bgcolor === vm.palette.selected.bgcolor"></span></div></div></div><div class="popup__footer"><button class="btn btn--yellow btn--no-radius width--all height--min-inh font--size20" type="submit">{{ \'RELOAD_LABEL\' | translate }}</button></div></form>');
$templateCache.put('app/components/time-send/time-send-popover.html','<time-send></time-send>');
$templateCache.put('app/components/time-send/time-send.html','<div class="time-send" ng-class="{\'time-send--info-open\': vm.isInfoOpen}"><div class="time-send__close" ng-click="vm.close()"><img class="img-responsive" src="/images/cancel.svg"></div><div class="time-send__content"><div class="time-send__info font--size13" ng-if="vm.isInfoOpen">{{ \'TIME_SEND_TITLE\' | translate }}</div><div class="time-send__planing mrg--t10"><div class="time-send__planing-item"><div class="checkbox-y checkbox-y--size15"><label class="checkbox-y__label" for="isChecked"><input class="checkbox-y__input" id="isChecked" type="checkbox" name="isChecked" ng-model="isChecked"><div class="checkbox-y__body"><span class="checkbox-y__icon icon-mark"></span></div></label></div></div><div class="time-send__planing-item font--size15"><div uib-datepicker-popup="\'dd-MMMM-yyyy\'" ng-model="vm.dateModel" is-open="vm.isDateOpen" datepicker-options="vm.dateOptions"></div>\u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C <a href ng-click="vm.isDateOpen = !vm.isDateOpen">\u0441\u0435\u0433\u043E\u0434\u043D\u044F</a> \u0432</div><div class="time-send__planing-item"><button class="btn-y btn-y--border">15:00 <span class="btn-y__icon btn-y__icon--arrow icon-arrow-down"></span></button></div><div class="time-send__planing-item"><a class="link link--gray font--size18" href ng-click="vm.isInfoOpen = !vm.isInfoOpen"><span class="icon-info"></span></a></div></div></div></div>');
$templateCache.put('app/components/tag-list/tag-list.html','<div class="popup__head"><span class="popup__head-title">{{ \'TAGS\' | translate }}</span> <button class="icon-close btn btn--not-style btn--main-mobile-color btn--size_s" type="button" ng-click="vm.close()"></button><hr class="hr hr--popup"></div><div class="popup__content scroll-fix"><label class="tag-list__item"><div class="letter-tags"><span class="icon-flagged_bg popup__icon popup__icon--not-size color--semi-dark-red"></span></div><span class="tag-list__title tag-list__title--mrg-left" ng-if="vm.isImportant">{{ \'IMPORTANT_ONE\' | translate }}</span> <span class="tag-list__title tag-list__title--mrg-left" ng-if="!vm.isImportant">{{ \'NO_IMPORTANT_ONE\' | translate }}</span> <input class="tag-list__checked" type="checkbox" ng-model="vm.isImportant" ng-change="vm.setImportant()"> <span class="tag-list__tick is-selected"></span></label><label class="tag-list__item" ng-repeat="tag in vm.tags.items"><div class="letter-tags" style="color: {{ tag.bgcolor }}"><span class="letter-tags__icon icon-marker-mobile-bg font--size21"></span></div><span class="tag-list__title tag-list__title--mrg-left">{{ tag.tag_name }}</span> <input class="tag-list__checked" type="checkbox" ng-change="vm.triggerTag(tag, checked)" data-checklist-model="vm.unTags.items" data-checklist-value="tag"> <span class="tag-list__tick is-selected"></span></label></div><div class="popup__footer"><button class="btn btn--yellow btn--no-radius width--all height--min-inh font--size20" ng-click="vm.close()">{{ \'IS_DONE\' | translate }}</button></div>');
$templateCache.put('app/components/timezone-list/timezone-list-popover.html','<timezone-list messages="vm.messages" on-close="vm.isOpen = false"></timezone-list>');
$templateCache.put('app/components/timezone-list/timezone-list.html','<div class="timezone-list timezone-list--height150"><div class="timezone-list__links"><a class="timezone-list__link" href ng-repeat="timezone in vm.timezoneList" ng-click="vm.setTimezone(timezone)"><span class="timezone-list__name">{{ timezone.text }}</span></a></div></div>');
$templateCache.put('app/components/to-date/to-date.html','<span>{{ vm.convertDate }}</span>');
$templateCache.put('app/components/user-connection-default/user-connection-default.html','<div class="user-connection-default"><p class="user-connection-default__title font--size16 font--bold"><strong>{{ \'SEND_MAIL_IS_ADDRESS\' | translate }}</strong></p><div class="user-connection-default__item" ng-repeat="connection in vm.connections.items"><div class="radiobutton-y" ng-class="{\'radiobutton-y--bold\': connection === vm.connections.selected}"><label class="radiobutton-y__label"><div class="radiobutton-y__radio"><input class="radiobutton-y__input" name="connection" type="radio" ng-change="vm.update(connection)" ng-model="vm.connections.selected" ng-value="connection"><div class="radiobutton-y__round"><div class="radiobutton-y__inside"></div></div></div><div class="radiobutton-y__text">{{ connection.email }}</div></label></div></div></div>');
$templateCache.put('app/components/user-menu/user-menu-popover.html','<user-menu></user-menu>');
$templateCache.put('app/components/user-menu/user-menu.html','<div class="user-menu"><div class="user-menu__body user-menu__body--bg-gray"><div class="user-menu__item"><a class="user-menu__link user-menu__link--red" href=""><div class="avatar avatar--size28"><img class="avatar__image" src="/images/avatar.png"></div><div class="user-menu__title">lovealldevelop@gmail.com</div></a></div><div class="user-menu__item"><a class="user-menu__link" href=""><svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" viewBox="0 0 28 28" class="dropdown-user-add-svg"><path d="M13.28,8 L14.72,8 L14.72,13.28 L20,13.28 L20,14.72 L14.72,14.72 L14.72,20 L13.28,20 L13.28,14.72 L8,14.72 L8,13.28 L13.28,13.28 L13.28,8 Z" id="+" fill-opacity="0.5"></path><path d="M28,14 C28,6.2680135 21.7319865,0 14,0 C6.2680135,0 0,6.2680135 0,14 C0,21.7319865 6.2680135,28 14,28 C21.7319865,28 28,21.7319865 28,14 Z M1,14 C1,6.82029825 6.82029825,1 14,1 C21.1797017,1 27,6.82029825 27,14 C27,21.1797017 21.1797017,27 14,27 C6.82029825,27 1,21.1797017 1,14 Z" id="Oval" fill-opacity="0.15"></path></svg><div class="user-menu__title">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F</div></a></div></div><div class="user-menu__body user-menu__body--no-mrg"><div class="user-menu__item"><a class="user-menu__link user-menu__link--hover-gray" href=""><div class="user-menu__title">\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0430\u043A\u0430\u0443\u043D\u0442\u043E\u043C</div></a></div><div class="user-menu__item"><a class="user-menu__link user-menu__link--hover-gray" href=""><div class="user-menu__title">\u041F\u043E\u043C\u043E\u0449\u044C</div></a></div><div class="user-menu__item"><a class="user-menu__link user-menu__link--hover-gray" href=""><div class="user-menu__title">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u044F\u0449\u0438\u043A</div></a></div><div class="user-menu__item"><a class="user-menu__link user-menu__link--hover-gray" href ng-click="vm.logout()"><div class="user-menu__title">\u0412\u044B\u0445\u043E\u0434</div></a></div></div></div>');
$templateCache.put('app/components/validation-errors/validation-errors.html','<div class="validation"><div ng-messages="vm.data.$error" ng-if="vm.data.$invalid && vm.data.$submitted"><div class="validation__message validation__message--red" ng-message="{{ key }}" ng-repeat="(key, value) in vm.messages">{{ value | translate }}</div></div><div class="validation__message validation__message--red" ng-repeat="error in vm.server" ng-if="error.field == vm.data.$name">{{ error.message }}</div></div>');
$templateCache.put('app/components/user-signatures/user-signatures.html','<div class="user-signatures"><div class="user-signatures__title main-title-text">{{ \'YOUR_SIGNATURE\' | translate }}</div><div class="user-signatures__edit-text"><div message-textarea is-sign="true" ng-model="vm.signatureForm.model.sign" message-textarea-html="vm.signatureForm.model.sign"></div></div><div class="user-signatures__connection mrg--b20"><div class="mrg--t20"><div class="checkbox-y checkbox-y--size14 text--no-wrap mrg--r10"><label class="checkbox-y__label"><input class="checkbox-y__input ng-untouched ng-valid ng-not-empty ng-dirty ng-valid-parse" type="checkbox" ng-model="vm.signatureForm.model.isSignConnected"><div class="checkbox-y__body"><span class="checkbox-y__icon"></span></div><div class="checkbox-y__text">{{ \'BIND_TO_ADDRESS\' | translate }}</div></label></div></div><div class="mrg--t20"><ui-select ng-model="vm.signatureForm.model.connection_id" class="select-list-new select-list-new--size_l select-list-new--auto-width" theme="select2" search-enabled="false"><ui-select-match class="select-list-new__body select-list-new--size_l">{{ $select.selected.email }}</ui-select-match><ui-select-choices repeat="connection.id as connection in vm.connections.items" ng-value="$select.selected.id"><div ng-bind="connection.email"></div></ui-select-choices></ui-select></div><div class="mrg--t20 mrg--f-right"><button class="btn btn--size_m btn--yellow" type="button" ng-click="vm.add()">{{ \'ADD_SIGNATURE\' | translate }}</button></div></div><div class="" ng-if="vm.signatures.items.length"><div class="mrg--b20" ng-repeat="signature in vm.signatures.items"><div class="user-signatures__view" ng-if="!signature.isEdit"><div class="user-signatures__buttons"><button class="btn--not-style mrg--r10" ng-click="vm.edit(signature)"><span class="icon-edit-pen"></span></button> <button class="btn--not-style" ng-click="vm.destroy(signature)"><span class="icon-delete"></span></button></div><div class="user-signatures__text"><span ng-bind-html="vm.getTrustHtml(signature.sign);"></span></div><span class="user-signatures__connection-email">{{ vm.getEmailBySign(signature) }}</span></div><div ng-if="signature.isEdit"><div class="user-signatures__edit-text"><div message-textarea params="{}" is-sign="true" message-textarea-html="signature.sign" ng-model="signature.sign"></div></div><div class="mrg--t10 user-signatures__connection"><div class="checkbox-y checkbox-y--size14 mrg--r5"><label class="checkbox-y__label"><input class="checkbox-y__input ng-untouched ng-valid ng-not-empty ng-dirty ng-valid-parse" type="checkbox" ng-model="signature.isSignConnected"><div class="checkbox-y__body"><span class="checkbox-y__icon"></span></div><div class="checkbox-y__text">{{ \'BIND_TO_ADDRESS\' | translate }}</div></label></div><ui-select ng-model="signature.connection_id" class="select-list select-list--size_l" theme="select2" search-enabled="false"><ui-select-match class="select-list__body select-list--size_l">{{ $select.selected.email }}</ui-select-match><ui-select-choices repeat="connection.id as connection in vm.connections.items" ng-value="$select.selected.id"><div ng-bind="connection.email"></div></ui-select-choices></ui-select></div><div class="mrg--t10"><button class="btn btn--normal btn--size_s" ng-click="vm.save(signature)">{{ \'UPDATE_SIGNATURE\' | translate }}</button></div></div></div></div></div>');
$templateCache.put('app/mail/compose/compose.html','<div class="compose"><form name="form"><div class="compose__container"><div class="compose__header"><div class="compose__from" ng-class="{\'is-show-features\': vm.isShowFeatures}"><div class="input-line flex align-items--cn"><ui-select ng-model="vm.sendForm.model.from_connection" class="select-input-line select-input-line--compose select-list select-list--size_l select-input-line--min-height select-list--no-border select-list--not-border-of-sides width-inh" theme="select2" search-enabled="false"><ui-select-match class="select-list__body select-list--size_l width--all" placeholder="{{ \'FROM_WHOM\' | translate }}"><div ng-if="$select.selected.user_name">{{ $select.selected.user_name }} ({{ $select.selected.email }})</div><div ng-if="!$select.selected.user_name">{{ $select.selected.email }}</div></ui-select-match><ui-select-choices repeat="connection.id as connection in vm.connections.items" ng-value="$select.selected.id"><div ng-bind="connection.email"></div></ui-select-choices></ui-select></div><div class="input-line input-line--full input-line--right-padding" ng-class="{\'is-active\': vm.sendForm.model.to.length}"><label class="input-line__label width--all"><contact-to-add-select class="width--all" placeholder="{{ \'TO\' | translate }}" addresses="vm.sendForm.model.to"></contact-to-add-select><button class="compose__btn-additional input-line__btn-more btn btn--not-style btn--light-hover font__size16" type="button" ng-click="vm.isShowFeatures = !vm.isShowFeatures">{{ \'IS_COPY\' | translate }}</button></label></div><div class="compose__from--add-features" ng-if="vm.isShowFeatures"><div class="input-line input-line--full" ng-class="{\'is-active\': vm.sendForm.model.toCopy.length}"><div class="input-line__label width--all"><contact-to-add-select class="width--all" placeholder="{{ \'IS_COPY\' | translate }}" addresses="vm.sendForm.model.toCopy" is-autofocus="true"></contact-to-add-select></div></div><div class="input-line input-line--full" ng-class="{\'is-active\': vm.sendForm.model.toCopyHidden.length}"><div class="input-line__label width--all"><contact-to-add-select class="width--all" placeholder="{{ \'IS_HIDDEN_COPY\' | translate }}" addresses="vm.sendForm.model.toCopyHidden"></contact-to-add-select></div></div></div><div class="compose__letter-subject"><div class="input-line input-line--full" ng-class="{\'is-active\': vm.sendForm.model.subject.length}"><label class="input-line__label width--all"><input class="input--compose-line input-line__input width--all" type="text" ng-model="vm.sendForm.model.subject" placeholder="{{ \'SUBJECT\' | translate }}"></label></div><button class="compose__btn-additional compose__btn-attach btn btn--not-style btn--light-hover font--size16" type="button" type="file" multiple="multiple" accept="**/*" ngf-select="vm.upload($files, $invalidFiles)"><!--<img src="/images/icon-screpka-plus.svg">--> <span class="icon-affix-plus"></span></button></div></div><div class="compose__attachments-upload"><attach-upload attachments-data="vm.sendForm.model.attachmentsData" message="vm.sendForm" is-uploading="vm.isUploading"></attach-upload></div><div class="compose__content"><div class="compose__message" contenteditable="true" ng-model="vm.sendForm.model.body" ng-model-options="{ debounce: 250 }" required placeholder="{{ \'INPUT_PLACEHOLDER_ENTER_YOUR_MESSAGE\' | translate }}..." onclick="$(this).focus();"><div><br></div></div></div></div></div></form></div><menu-bottom is-open="vm.isMenuBottomOpen" on-save="vm.save()"></menu-bottom>');
$templateCache.put('app/mail/inbox/inbox.html','<!--<inbox-header></inbox-header>--><!--<div class="search-result" ng-if="vm.isNoResult">\n    <strong>\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B \u043F\u043E\u0438\u0441\u043A\u0430 \xABinfo\xBB</strong>\n</div>--><search-mail ng-if="vm.messages.searchParams.search"></search-mail><div class="search-result search-result--active search-result--no-result" ng-if="vm.messages.params.search && !vm.messages.items.length"><div class="search-result__content"><span class="search-result__message-hint">{{ \'SEARCH_NO_RESULT\' | translate }}</span> <span class="search-result__message-hint"></span><div class="search-result__message-hint">{{ \'TRY_SEARCH\' | translate }} <a class="search-result__link">{{ \'ALL_MAIL\' | translate }}</a></div></div></div><!--vm.data._links.next--><div class="inbox-plash" ng-if="vm.messages.items.length && vm.$state.params.mbox === \'Junk\'"><div class="inbox-plash__message"><div class="main-plash__text">{{ \'SPAM_PLASH_TEXT_THIS_FOLDER_CONTAINS\' | translate }}</div><button class="btn btn--normal btn--not-events btn--size_s font--size12 mrg--t5" type="button" ng-click="vm.clearFolder($event, {name: \'Junk\'})">{{ \'CLEAR_FOLDER\' | translate }}</button></div></div><div class="inbox-list"><div infinite-scroll="vm.paginate()" infinite-scroll-distance="1"><inbox-message-list messages="vm.messages"></inbox-message-list></div></div><div class="inbox-empty" ng-if="vm.messages.params.mbox && !vm.messages.params.search && !vm.messages.items.length ||\n            (vm.messages.params.filter === \'unseen\' || vm.messages.params.filter === \'attach\' ||\n            vm.messages.params.filter === \'flagged\' || vm.messages.params.tag_id) && !vm.messages.items.length"><span class="inbox-empty__icon"></span> <span class="inbox-empty__notif">{{ \'EMPTY_FOLDER\' | translate }}</span> <span class="inbox-empty__text" ng-if="vm.messages.params.mbox !== \'INBOX\'">{{ \'GO_TO_FOLDER\' | translate }} <a class="inbox-empty__link" ui-sref="mail.inbox({mbox: \'INBOX\'})">\xAB{{ \'INBOX\' | translate }}\xBB</a></span></div><folder-layout messages="vm.messages"></folder-layout><inbox-footer messages="vm.messages"></inbox-footer>');
$templateCache.put('app/mail/message/message.html','<div class="mail-message"><!-- \u0425\u0435\u0434\u0435\u0440 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F --><div class="mail-message__title-message" ng-if="vm.message.model.Subject"><span>{{ vm.message.model.Subject }}</span><div class="mail-message__plash"></div></div><!-- \u042D\u043B\u0435\u043C\u0435\u043D\u0442\u044B \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F--><!-- message-header-sticky offset-top="48"  sticky-class="mail-message__head-info--sticky"--><div class="mail-message__head-info mail-message__head-info--sticky wrap-content"><div class="info-sender width--all"><div class="info-sender__head flex--inline"><div class="info-sender__avatar flex"><message-avatar message="vm.message.model"></message-avatar><!--<div class="avatar avatar&#45;&#45;settings avatar&#45;&#45;size42 avatar&#45;&#45;second-style">\n                        <avatar-name name="vm.message.model.from"\n                                     email="vm.message.model.to[0].fromAddress">\n                        </avatar-name>\n                    </div>--></div><div class="info-sender__title"><div class="info-sender__from-whom"><div class="info-sender__important-tags info-sender__important-tags--small-title important-tags important-tags--active" ng-if="vm.message.model.important"></div>{{ vm.message.model.from ? vm.message.model.from : vm.message.model.fromAddress }} <button class="btn btn--not-style btn--not-events btn--main-mobile-color font--size12 pdd--r2 pdd--l2 mrg--l5" ng-class="{\'icon-arrow-down\': !vm.isOpenMessageInfo, \'icon-arrow-up\': vm.isOpenMessageInfo}" type="button" ng-click="vm.isOpenMessageInfo = !vm.isOpenMessageInfo"></button></div><div class="info-sender__date"><to-date date="vm.message.model.date.date"></to-date></div></div><div class="info-sender__right-menu mrg--f-right"><button class="btn btn--not-events btn--not-style btn--mail-control btn--main-mobile-color icon-mobile-menu-h" type="button" ng-click="vm.openMessageMenu(); $event.stopPropagation();"></button> <button class="btn btn--not-events btn--not-style btn--mail-control btn--main-mobile-color icon-delete color--light-red pdd" type="button" ng-if="vm.$state.params.mbox !== \'Trash\'" ng-click="vm.move({name: \'Trash\', caption: (\'Trash\' | translate)})"></button> <button class="btn btn--not-events btn--not-style btn--mail-control btn--main-mobile-color icon-delete color--light-red pdd" type="button" ng-if="vm.$state.params.mbox === \'Trash\'" ng-click="vm.destroy({name: \'Trash\'})"></button> <button class="btn btn--not-events btn--not-style btn--mail-control btn--main-mobile-color icon-replied-old pdd--r0" type="button" ui-sref="mail.compose({mbox: vm.message.model.mbox, id: vm.message.model.number, connection_id: vm.message.model.connection_id})"></button></div></div><div class="info-sender__message-info is-active" ng-if="vm.isOpenMessageInfo"><div class="info-sender__message-info-item to-whom"><span class="to-whom__title width--min60">{{ \'TO\' | translate }}</span><div class="to-round" ng-class="{\'to-round--active\': vm.isToEmail}"><div class="to-round__body"><div class="avatar avatar--settings avatar--size28 avatar--second-style"><avatar-name name="vm.message.model.to[0].name" email="vm.message.model.to[0].address"></avatar-name></div><div class="to-whom__mail-recipient" ng-click="vm.isToEmail = !vm.isToEmail">{{ vm.isToEmail ? (vm.message.model.to[0].address ? vm.message.model.to[0].address : vm.message.model.to[0].name) : (vm.message.model.to[0].name ? vm.message.model.to[0].name : vm.message.model.to[0].address) }}</div></div></div></div><div class="info-sender__message-info-item to-whom" ng-click="vm.isFromEmail = !vm.isFromEmail"><span class="to-whom__title width--min60">{{ \'FROM_WHOM_U\' | translate }}</span><div class="to-round" ng-class="{\'to-round--active\': vm.isFromEmail}"><div class="to-round__body"><div class="avatar avatar--settings avatar--size28 avatar--second-style"><avatar-name name="vm.message.model.from" email="vm.message.model.fromAddress"></avatar-name></div><div class="to-whom__mail-recipient">{{ vm.isFromEmail ? (vm.message.model.fromAddress ? vm.message.model.fromAddress : vm.message.model.from) : (vm.message.model.from ? vm.message.model.from : vm.message.model.fromAddress) }}</div></div></div></div><div class="info-sender__message-info-item to-whom"><span class="to-whom__title width--min60">{{ \'FOLDER\' | translate }}</span><div class="to-whom__folders"><div class="to-whom__folder">{{ vm.message.model.mbox | translate }}</div></div></div><div class="info-sender__message-info-item to-whom"><span class="to-whom__title width--min60">{{ \'TAGS\' | translate }}</span><div class="inbox-message__labels"><button class="info-sender__important-tags important-tags btn--not-style btn--not-events" ng-class="{\'important-tags--active\': vm.message.model.important}" type="button" ng-click="vm.setImportant()"></button><div class="inbox-message__label letter-tags letter-tags--poss-remove" style="background: {{ tag.bgcolor }}; color: {{ tag.color }}" ng-repeat="tag in vm.message.model.tags"><span class="letter-tags__name">{{ tag.tag_name }}</span> <button class="btn btn--not-style btn--circle letter-tags__icon" ng-click="vm.setUnTag(tag)"><span class="letter-tags__remove-icon icon-close"></span></button></div></div></div></div></div></div><div class="mail-message__main-content"><!-- \u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 --><div class="mail-message__images-resolve" ng-if="vm.message.model.hasForeignImages && !vm.message.model.showForeignImages" ng-click="vm.resolveImage()"><div class="images-resolve"><span class="icon-draft"></span> <strong>{{ \'SHOW_IMAGES\' | translate }}</strong> {{ \'SHOW_IMAGES_2\' | translate }}</div></div><!-- \u0410\u0442\u0442\u0430\u0447\u0438 --><div class="mail-message__mail-attachments"><div class="attachments"><div class="attachments__item" ng-repeat="attachment in vm.message.model.attachmentsData"><attach-item attach="attachment" message="vm.message.model"></attach-item></div></div></div><!-- \u0422\u0435\u043B\u043E \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F --><div class="mail-message__body"><div class="body-message"><!--\u0421\u0430\u043C\u043E \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435--><div class="body-message__content" ng-bind-html="vm.getTrustHtml(vm.message.model.body)"></div></div></div><!--        <div style="width: 340px; height: 290px;">\n            <adsense ad-client="ca-pub-7169913763254428"\n                     ad-slot="6322227439"\n                     inline-style="display:inline-block;width:330px;height:280px">\n            </adsense>\n        </div>--><!-- \u0420\u0435\u043A\u043B\u0430\u043C\u0430--><div class="mail-message__banner mrg--f-bottom"><div class="banner-block banner-block--view-caption" banner-block-caption=" {{ \'BANNER_BLOCK_CAPTION\' | translate }}"><!--<div style="width: 340px; height: 290px;">--><adsense ad-client="ca-pub-7169913763254428" ad-slot="6322227439" inline-style="display:inline-block;width:300px;height:250px"></adsense><!--</div>--></div></div></div><!-- \u0411\u044B\u0441\u0442\u0440\u044B\u0439 \u043E\u0442\u0432\u0435\u0442--><!--\n    <div class="mail-message__reply">\n        <form class="message-reply" name="sendForm" ng-submit="vm.send(sendForm)">\n            <div class="message-reply__container">\n                <div class="quick-reply">\n                    <button class="quick-reply__write btn btn--not-style icon-write"></button>\n                    <div class="quick-reply__message">\n                        <div class="quick-reply__message-input"\n                             contenteditable="true"\n                             ng-model="vm.sendForm.model.body"\n                             required\n                             placeholder="{{ \'QUICK_RESPONSE\' | translate }}">\n                        </div>\n                    </div>\n                    <button class="quick-reply__send btn btn--not-style">{{ \'SEND_SHORT\' | translate }}</button>\n                </div>\n            </div>\n        </form>\n    </div>\n    --></div><folder-layout messages="vm.messages"></folder-layout>');
$templateCache.put('app/marketing/home/home.html','<h1>Welcome to <a ui-sref="mail.inbox({mbox: \'INBOX\'})">mail</a></h1>');
$templateCache.put('app/settings/accounts/accounts.html','<div class="settings-accounts"><!-- \u0412\u0435\u0440\u0445\u043D\u044F\u044F \u0447\u0430\u0441\u0442\u044C--><div class="settings-accounts__header"><div class="settings-accounts__message">{{ \'SETTINGS_ACCOUNTS_MESSAGE_OTHER_MAILS\' | translate }}.</div></div><!-- \u041E\u0441\u043D\u043E\u0432\u043D\u0430\u044F \u0447\u0430\u0441\u0442\u044C--><div class="accounts-settings__content"><!----><div class="settings-accounts__list" ng-if="vm.accounts.items.length"><div class="settings-accounts__caption">{{ \'CONNECTED_BOXES\' | translate }}</div><div class="settings-accounts__items"><div class="settings-accounts__item" ng-repeat="account in vm.accounts.items"><div class="settings-accounts__title">{{ account.email }}</div><form class="settings-accounts__item-content-right"><div class="radio-switch radio-switch--size-s mrg--r16"><input class="radio-switch__input" type="radio" name="toggle" ng-checked="{{ account.enable }}" ng-value="0" ng-model="account.enable" ng-change="vm.enableTrigger(account)"> <input class="radio-switch__input" type="radio" name="toggle" ng-checked="{{ account.enable }}" ng-value="1" ng-model="account.enable" ng-change="vm.enableTrigger(account)"> <span class="radio-switch__on-off" data-checked="{{ \'ON\' | translate }}" data-unchecked="{{ \'OF\' | translate }}"></span></div><button class="btn btn--not-style btn--size_xl pdd--r2 pdd--l2 color--silver" type="button" ng-click="vm.destroy(account)"><span class="icon-delete"></span></button></form></div></div></div><div class="notific--layout-light mrg--t20" ng-if="vm.isConnected">{{ \'CONNECTED_SUCCESS_COLLECTION_OF_MAILS\' | translate }}.</div></div><form name="accountForm" ng-submit="vm.create(accountForm)"><div class="settings-accounts__content"><div class="settings-accounts__caption">{{ \'COLLECTION_OF_MAIL\' | translate }}</div><div class="flex--inline align-items--cn just-content--f-st width--all mrg--b9"><label class="settings-accounts__label">{{ \'MAIL\' | translate }}</label><input class="input input--size_m width--all" type="email" name="email" ng-model="vm.accountForm.model.email" ng-blur="vm.getConf(accountForm)" placeholder="{{ \'INPUT_PLACEHOLDER_ENTER_EMAIL\' | translate }}" required></div><div class="flex--inline align-items--cn just-content--f-st width--all mrg--b9"><label class="settings-accounts__label">{{ \'INPUT_PLACEHOLDER_PASSWORD\' | translate }}</label><input class="input input--size_m width--all" type="password" name="password" ng-model="vm.accountForm.model.password" placeholder="{{ \'INPUT_PLACEHOLDER_ENTER_PASSWORD\' | translate }}" required></div><div ng-if="!vm.accountsConf.selected && !vm.accountsConf.isFirst && vm.accountForm.model.email && vm.accountForm.model.password"><div class="settings-accounts__caption">{{ \'PARAMETERS_OF_YOUR_MAIL_SERVER\' | translate }}</div><div class="flex--inline align-items--cn just-content--f-st width--all mrg--b9"><label class="settings-accounts__label">{{ \'INPUT_PLACEHOLDER_LOGIN\' | translate }}</label><input class="input input--size_m width--all" type="text" name="login" ng-model="vm.accountForm.model.login" login-format placeholder="{{ \'INPUT_PLACEHOLDER_ENTER_LOGIN\' | translate }}" required></div><div class="flex--inline align-items--cn just-content--f-st width--all mrg--b9"><label class="settings-accounts__label">{{ \'SERVER\' | translate }}</label><input class="input input--size_m width--all" type="text" name="server" ng-model="vm.accountForm.model.server" placeholder="{{ \'INPUT_PLACEHOLDER_ENTER_SERVER_ADDRESS\' | translate }}" required></div><div class="flex--inline align-items--cn just-content--f-st width--all mrg--b9"><label class="settings-accounts__label">{{ \'PORT\' | translate }}</label><input class="input input--size_m width--all" type="text" name="port" ng-model="vm.accountForm.model.port" placeholder="{{ \'INPUT_PLACEHOLDER_ENTER_PORT\' | translate }}" required></div><div class="settings-accounts__verification-message" ng-if="vm.error.message">{{ \'WRONG_LOGIN_OF_PASSWORD\' | translate }}</div></div></div><div class="settings-accounts__footer"><button class="btn btn--size_m btn--y-gradient btn--border-dark" type="submit">{{ \'ENABLED_COLLECTOR\' | translate }}</button></div></form></div>');
$templateCache.put('app/settings/contacts/contacts.html','<div class="settings-contacts"><div class="settings-contacts__header"><button class="btn btn--size_m btn--yellow" ng-click="vm.openContactGroupCreatePopup()">{{ \'CREATE_GROUP\' | translate }}</button></div><div class="settings-contacts__list"><div class="settings-contacts__item" ng-repeat="contact in vm.contactGroup.items"><div class="settings-contacts__item-content" ng-class="{\'tags-settings__item--active\': tag.isSelected}" ng-click="vm.select(tag)"><div class="settings-contacts__item-content-left"><div class="settings-contacts__caption">{{ contact.name }}</div><div class="settings-contacts__counter">{{ vm.contactGroup.items.length }}</div></div><div class="settings-contacts__item-content-right"><button class="btn btn--not-style btn--size_xl pdd--r2 pdd--l2 mrg--r5 color--silver" ng-click="vm.openContactGroupEditPopup()" ng-click="vm.openContactGroupEditPopup()" ng-disabled="!vm.selected"><span class="icon-edit-pen"></span></button> <button class="btn btn--not-style btn--size_xl pdd--r2 pdd--l2 color--silver" ng-disabled="!vm.selected" ng-click="vm.destroy()"><span class="icon-delete"></span></button></div></div></div></div></div>');
$templateCache.put('app/settings/folders/folders.html','<div class="settings-folders"><div class="settings-folders__header"><button class="btn btn--size_m btn--yellow" ng-click="vm.openFolderCreatePopup()">{{ \'CREATE_FOLDER\' | translate }}</button></div><div class="settings-folders__list" ng-repeat="folder in vm.folders.items"><div class="settings-folders__item" ng-if="!folder.isSub"><div class="settings-folders__item-content"><div><span class="settings-folders__caption">{{ folder.name | translate }}</span> <span class="settings-folders__counter">{{ folder.messagesCount }}</span></div><div class="flex align-items--cn"><button class="btn btn--not-style btn--size_xl pdd--r2 pdd--l2 color--silver" type="button" ng-click="vm.openFolderClearConfirmPopup(folder)" ng-disabled="!folder.messagesCount"><span class="icon-clear"></span></button></div></div><div class="settings-folders__list settings-folders__list--sub" ng-repeat="subFolder in vm.folders.items" ng-if="subFolder.isSub && (folder.name === \'INBOX\' && subFolder.name !== \'Templates\') || (folder.name === \'Drafts\' && subFolder.name === \'Templates\')"><div class="settings-folders__item"><div class="settings-folders__item-content"><div class=""><span class="settings-folders__caption">{{ subFolder.name | translate }}</span> <span class="settings-folders__counter">{{ subFolder.messagesCount }}</span></div><div class="flex align-items--cn"><button class="btn btn--not-style btn--size_xl pdd--r2 pdd--l2 mrg--r5 color--silver" type="button" ng-click="vm.openFolderEditPopup(subFolder)" ng-disabled="subFolder.name === \'Archive\' || subFolder.name === \'Templates\'"><span class="icon-edit-pen"></span></button> <button class="btn btn--not-style btn--size_xl pdd--r2 pdd--l2 mrg--r5 color--silver" type="button" ng-click="vm.openFolderClearConfirmPopup(subFolder)" ng-disabled="!subFolder.messagesCount"><span class="icon-clear"></span></button> <button class="btn btn--not-style btn--size_xl pdd--r2 pdd--l2 color--silver" type="button" ng-click="subFolder.messagesCount ? vm.openFolderDeleteConfirmPopup(subFolder) : vm.destroy(subFolder)" ng-disabled="subFolder.name === \'Archive\' || subFolder.name === \'Templates\'"><span class="icon-delete"></span></button></div></div></div></div></div></div></div>');
$templateCache.put('app/settings/main/settings.html','<article class="settings-main"><!-- \u041F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 --><section class="settings-main__block"><div class="personal-info"><div class="personal-info__user-avatar"><div class="personal-info__user-info-title main-title-text font--size16 font--bold">{{ \'YOUR_PHOTO\' | translate }}</div><div class="flex--inline"><div class="avatar avatar--settings avatar--size90 avatar--second-style"><img class="avatar__image" media-url="vm.user.profile.photo" fallback-src="/images/avatar-personal.svg" ng-if="!vm.avatar.picFile"> <button class="btn--not-style btn--not-events btn--opacity width--all" ng-click="vm.openAvatarUploadPopup()"></button> <button class="avatar__edit btn btn--not-style btn--size_xs color--silver mrg--t10" type="button" ng-if="vm.user.profile.photo" ng-click="vm.removeAvatar()">{{ \'DELETE\' | translate }}</button></div><div class="flex flex--column mrg--l20"><button class="btn btn--size_m btn--y-gradient btn--border-dark mrg--f-right" type="button" ng-click="vm.openAvatarUploadPopup()">{{ \'AVATAR_LOAD_IMAGE\' | translate }}</button><p class="font--size12 mrg--t10 font--right">{{ \'AVATAR_UPLOAD_TEXT_NOTYF\' | translate }}</p></div></div></div></div></section><!-- \u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u043F\u0440\u043E\u0444\u0438\u043B\u044F --><section class="settings-main__block"><div class="personal-info"><profile-form></profile-form></div></section><!-- \u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0431\u043B\u043E\u043A \u0441 \u043F\u0440\u0430\u0432\u0430 --><section class="settings-main__block"><user-connection-default></user-connection-default></section><!-- \u0412\u0430\u0448\u0438 \u043F\u043E\u0434\u043F\u0438\u0441\u0438 --><section class="settings-main__block"><user-signatures></user-signatures></section></article>');
$templateCache.put('app/settings/rule-add/rule-add.html','<div class="settings-rule-add"><form class="form" name="sieveForm" ng-submit="vm.sieveForm.model.id ? vm.update(sieveForm) : vm.add(sieveForm)" form-server-errors="vm.sieveForm.errors" novalidate><div class="settings-rule-add__section"><div class="settings-rule-add__item"><span class="settings-rule-add__label">{{ \'NAME\' | translate }}</span> <input class="input input--size_m width--all" ng-class="{\'input--error\': sieveForm.name.$invalid}" type="text" name="name" placeholder="{{ \'INPUT_PLACEHOLDER_NAME_RULE\' | translate }}" ng-model="vm.sieveForm.model.name" server-error required></div></div><div class="settings-rule-add__section"><div class="settings-rule-add__item"><span class="settings-rule-add__label">{{ \'IS_APPLY\' | translate }}</span><ui-select ng-model="vm.sieveForm.model.spam_accept" class="select-list select-list--size_m select-list--not-border-of-sides mrg--b8" ng-class="{\'select-list--error\': sieveForm.spam_accept.$invalid}" theme="select2" name="spam_accept" search-enabled="false" server-error ng-required="true"><ui-select-match class="select-list__body select-list--size_m width--all" placeholder="{{ \'RULE_ADD_SELECT_FOR_ALL_LETTERS\' | translate }}">{{ $select.selected.name | translate }}</ui-select-match><ui-select-choices repeat="item.value as item in vm.spamAccept.list" value="{{ $select.selected.value }}"><div ng-bind-html="item.name | translate"></div></ui-select-choices></ui-select><ui-select ng-model="vm.sieveForm.model.attachment_accept" class="select-list select-list--size_m select-list--not-border-of-sides" ng-class="{\'select-list--error\': sieveForm.attachment_accept.$invalid}" theme="select2" name="attachment_accept" search-enabled="false" server-error ng-required="true"><ui-select-match class="select-list__body select-list--size_m width--all" placeholder="{{ \'RULE_ADD_SELECT_IS_ATTACH_0R_NOT\' | translate }}">{{ $select.selected.name | translate }}</ui-select-match><ui-select-choices repeat="item.value as item in vm.attachmentAccept.list" value="{{ $select.selected.value }}"><div ng-bind-html="item.name | translate"></div></ui-select-choices></ui-select></div></div><div class="settings-rule-add__section"><div class="settings-rule-add__item settings-rule-add__item--border"><div class="settings-rule-add__caption">{{ \'IF\' | translate }}</div><button class="btn btn--size_m btn--s-gradient btn--border-silver" type="button" ng-click="vm.addRule()">{{ \'ADD_CONDITION\' | translate }}</button></div><div class="settings-rule-add__conditions"><div class="settings-rule-add__conditions-item" ng-repeat="rule in vm.sieveForm.model.sieveRules"><ui-select ng-model="rule.type" class="select-list select-list--size_m select-list--not-border-of-sides mrg--b8" ng-class="{\'select-list--error\': sieveForm.type_{{$index}}.$invalid}" theme="select2" name="type_{{$index}}" search-enabled="false" server-error ng-required="true"><ui-select-match class="select-list__body select-list--size_m width--all" placeholder="{{ \'FROM_WHOM_U\' | translate }}">{{ $select.selected.name | translate }}</ui-select-match><ui-select-choices repeat="item.value as item in vm.sieveRules.list" value="{{ $select.selected.value }}"><div ng-bind-html="item.name | translate"></div></ui-select-choices></ui-select><ui-select ng-model="rule.compare_type" class="select-list select-list--size_m select-list--not-border-of-sides mrg--b8" ng-class="{\'select-list--error\': sieveForm.compare_type_{{$index}}.$invalid}" theme="select2" name="compare_type_{{$index}}" search-enabled="false" server-error ng-required="true"><ui-select-match class="select-list__body select-list--size_m width--all" placeholder="{{ \'RULE_ADD_SELECT_IS_COINCIDES\' | translate }}">{{ $select.selected.name | translate }}</ui-select-match><ui-select-choices repeat="item.value as item in vm.compareTypes.list" value="{{ $select.selected.value }}"><div ng-bind-html="item.name | translate"></div></ui-select-choices></ui-select><input class="input input--size_m width--all" ng-class="{\'input--error\': sieveForm.value_{{$index}}.$invalid}" type="text" name="value_{{$index}}" ng-model="rule.value" placeholder="{{ \'INPUT_PLACEHOLDER_NAME_RULE\' | translate }}" required><div class="flex flex--just-f-e width--all mrg--t20"><button class="settings-rule-add__condition-remove btn btn--not-style btn--not-events" type="button" ng-click="vm.removeRule(rule)"><span class="mrg--r5">\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0443\u0441\u043B\u043E\u0432\u0438\u0435</span> <span class="icon-delete"></span></button></div></div></div></div><!--\u0412\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u044C \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435--><div class="settings-rule-add__section"><div class="settings-rule-add__item"><div class="settings-rule-add__caption">{{ \'RUN_ACTION\' | translate }}</div></div><div class="settings-rule-add__item mrg--b8"><label class="checkbox-y__label checkbox-y"><input class="checkbox-y__input" type="checkbox" data-checklist-model="vm.sieveForm.model.sieveActions" data-checklist-value="{ \'type\': \'delete\' }" checklist-comparator=".type"><div class="checkbox-y__body"><span class="checkbox-y__icon"></span></div><span class="checkbox__text" role="presentation">{{ \'DELETE\' | translate }}</span></label></div><div class="settings-rule-add__item mrg--b8"><label class="checkbox-y__label checkbox-y"><input class="checkbox-y__input" type="checkbox" data-checklist-model="vm.sieveForm.model.sieveActions" data-checklist-value="{ \'type\': \'read\' }" checklist-comparator=".type"><div class="checkbox-y__body"><span class="checkbox-y__icon"></span></div><span class="checkbox__text" role="presentation">{{ \'MARK_AS_READ\' | translate }}</span></label></div><div class="settings-rule-add__item flex align-items--center mrg--b8"><label class="checkbox-y__label checkbox-y mrg--r10"><input class="checkbox-y__input" type="checkbox" ng-model="vm.isFolder" data-checklist-model="vm.sieveForm.model.sieveActions" data-checklist-value="vm.sieveActions.move" checklist-comparator=".type"><div class="checkbox-y__body"><span class="checkbox-y__icon"></span></div><span class="checkbox__text" role="presentation">{{ \'PUT_IN_FOLDER\' | translate }}</span></label><ui-select ng-model="vm.sieveActions.move.value" class="select-list select-list--size_m select-list--not-border-of-sides select-list--settings-rule" ng-class="{\'select-list--error\': sieveForm.move.$invalid}" name="move" theme="select2" ng-disabled="!vm.isFolder" search-enabled="false" ng-required="true"><ui-select-match class="select-list__body select-list--size_m width--al" placeholder="{{ \'CHOOSE\' | translate }}">{{ $select.selected.name | translate }}</ui-select-match><ui-select-choices repeat="item.name as item in vm.folders.items" value="{{ $select.selected.name }}"><div ng-bind-html="item.name | translate"></div></ui-select-choices></ui-select></div><!-- \u041F\u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u043C\u0435\u0442\u043A\u0443--><!--\n            <div class="settings-rule-add__item flex align-items--center">\n                <label class="checkbox-y__label checkbox-y mrg--r10">\n                    <input class="checkbox-y__input" type="checkbox"\n                           ng-model="vm.isFlag"\n                           data-checklist-model="vm.sieveForm.model.sieveActions"\n                           data-checklist-value="vm.sieveActions.flag"\n                           checklist-comparator=".type">\n                    <div class="checkbox-y__body">\n                        <span class="checkbox-y__icon"></span>\n                    </div>\n                    <span class="checkbox__text" role="presentation">{{ \'SET_TAG\' | translate }}</span>\n                </label>\n\n                <ui-select ng-model="vm.sieveActions.flag.value"\n                           class="select-list select-list--size_m select-list--not-border-of-sides"\n                           theme="select2"\n                           title="Choose a person"\n                           ng-disabled="!vm.isFlag"\n                           search-enabled="false">\n                    <ui-select-match\n                            class="select-list__body select-list--size_m width--all"\n                            placeholder="{{ \'CHOOSE\' | translate }}">\n                        {{ $select.selected.tag_name }}\n                    </ui-select-match>\n                    <ui-select-choices repeat="item.tag_name as item in vm.tags.items"\n                                       value="{{ $select.selected.tag_name }}">\n                        <div ng-bind-html="item.tag_name"></div>\n                    </ui-select-choices>\n                </ui-select>\n            </div>\n            --></div><!-- \u041F\u0435\u0440\u0435\u0441\u044B\u043B\u043A\u0430 \u043F\u0438\u0441\u0435\u043C --><div class="settings-rule-add__section"><div class="settings-rule-add__item mrg--b0"><div class="settings-rule-add__caption">\u041F\u0435\u0440\u0435\u0441\u044B\u043B\u043A\u0430 \u043F\u0438\u0441\u0435\u043C</div><div class="settings-rule-add__info flex align-items--cn"><span class="icon-info mrg--r10"></span> <span>{{ \'RULE_ADD_MESSAGE_WHEN_ACTIVE_RULE\' | translate }}</span></div></div><div class="settings-rule-add__item mrg--t20"><label class="checkbox-y__label"><input class="checkbox-y__input" type="checkbox" ng-model="vm.isResend" data-checklist-model="vm.sieveForm.model.sieveActions" data-checklist-value="vm.sieveActions.resend" checklist-comparator=".type"><div class="checkbox-y__body"><span class="checkbox-y__icon"></span></div><span class="checkbox__text" role="presentation">{{ \'FORWARD_TO\' | translate }}</span></label><input class="input input--size_m width--all mrg--t5" ng-class="{\'input--error\': sieveForm.resend.$invalid}" name="resend" type="text" placeholder="{{ \'FORWARD_TO\' | translate }}" ng-model="vm.sieveActions.resend.value" ng-disabled="!vm.isResend" required><label class="checkbox-y__label checkbox-y width--inh"><input class="checkbox-y__input" type="checkbox" ng-model="vm.sieveActions.resend.option"><div class="checkbox-y__body"><span class="checkbox-y__icon"></span></div><span class="checkbox__text" role="presentation">{{ \'RULE_ADD_MESSAGE_SAVE_COPY\' | translate }}</span></label></div><div class="settings-rule-add__item mrg--t20"><label class="checkbox-y__label checkbox-y"><input class="checkbox-y__input" type="checkbox" ng-model="vm.isNotify" data-checklist-model="vm.sieveForm.model.sieveActions" data-checklist-value="vm.sieveActions.notify" checklist-comparator=".type"><div class="checkbox-y__body"><span class="checkbox-y__icon"></span></div><span class="checkbox__text" role="presentation">{{ \'RULE_ADD_MESSAGE_NOTIFY_BY_EMAIL\' | translate }}</span></label><input class="input input--size_m width--all mrg--t5" ng-class="{\'input--error\': sieveForm.notify.$invalid}" type="text" name="notify" ng-model="vm.sieveActions.notify.value" ng-disabled="!vm.isNotify" placeholder="{{ \'RULE_ADD_MESSAGE_NOTIFY_BY_EMAIL\' | translate }}" required></div><div class="settings-rule-add__item mrg--t20"><label class="align-items-st checkbox-y__label checkbox-y width--inh"><input class="checkbox-y__input" type="checkbox" ng-model="vm.isAnswer" data-checklist-model="vm.sieveForm.model.sieveActions" data-checklist-value="vm.sieveActions.answer" checklist-comparator=".type"><div class="checkbox-y__body"><span class="checkbox-y__icon"></span></div><span class="checkbox__text" role="presentation">{{ \'RULE_ADD_MESSAGE_REPLY_TEXT\' | translate }}</span></label><textarea class="rule-add__textarea textarea textarea--not-resize textarea--normal font--size13 mrg--t5" ng-class="{\'textarea--error\': sieveForm.answer.$invalid}" name="answer" cols="10" rows="10" placeholder="{{ \'INPUT_PLACEHOLDER_ENTER_MESSAGE_TEXT\' | translate }}" ng-model="vm.sieveActions.answer.value" ng-disabled="!vm.isAnswer" required>\n                </textarea></div><div class="settings-rule-add__item mrg--t20 flex flex--just-s-b"><button class="btn btn--size_m btn--y-gradient btn--border-dark" type="submit" ng-if="!vm.sieveForm.model.id">{{ \'CREATE_RULE\' | translate }}</button><!--<button class="btn btn&#45;&#45;size_m btn&#45;&#45;y-gradient btn&#45;&#45;border-dark"--><!--type="submit"--><!--ng-if="vm.sieveForm.model.id">--><!--{{ \'BTN_SAVE_CHANGE\' | translate }}--><!--</button>--><!--<button class="btn btn&#45;&#45;size_m btn&#45;&#45;y-gradient btn&#45;&#45;border-dark"--><!--type="button">--><!--{{ \'BTN_APPLY_TO_EXISTING_EMAILS\' | translate }}--><!--</button>--> <button class="btn btn--size_m btn--s-gradient btn--border-dark btn--border-silver" type="button" ui-sref="settings.rules">{{ \'BTN_CANCEL\' | translate }}</button></div></div></form></div>');
$templateCache.put('app/settings/rules/rules.html','<div class="settings-rules"><div class="settings-rules__header"><button class="btn btn--size_m btn--yellow" ui-sref="settings.ruleAdd">{{ \'CREATE_RULE\' | translate }}</button><div class="settings-rules__message font--size14">{{ \'RULES_MESSAGE_IS_HELP_RULES_WE\' | translate }}.</div><div class="settings-rules__title">{{ \'YOUR_CREATED_RULES\' | translate }}.</div></div><!-- \u0421\u043F\u0438\u0441\u043E\u043A \u043F\u0440\u0430\u0432\u0438\u043B--><form class="settings-rules__list" ng-repeat="sieve in vm.sieve.items"><div class="settings-rules__item"><div class="settings-rules__item-content"><div class="settings-rules__name">{{ sieve.name }}</div><div class="flex align-items--cn"><!-- \u041F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0430\u0442\u0435\u043B\u044C --><div class="radio-switch radio-switch--size-s mrg--r10"><input class="radio-switch__input" type="radio" name="toggle" ng-checked="{{ sieve.enable }}" ng-value="0" ng-model="sieve.enable" ng-change="vm.enableTrigger(sieve)"> <input class="radio-switch__input" type="radio" name="toggle" ng-checked="{{ sieve.enable }}" ng-value="1" ng-model="sieve.enable" ng-change="vm.enableTrigger(sieve)"> <span class="radio-switch__on-off" data-checked="{{ \'ON\' | translate }}" data-unchecked="{{ \'OF\' | translate }}"></span></div><!-- \u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0437\u0430\u043F\u0438\u0441\u0438 --> <button class="btn btn--not-style btn--size_xl pdd--r2 pdd--l2 mrg--r5 color--silver" ui-sref="settings.ruleAdd({id: sieve.id})"><span class="icon-edit-pen"></span></button><!-- \u0423\u0434\u0430\u043B\u0438\u0442\u044C \u043F\u0440\u0430\u0432\u0438\u043B\u043E --> <button class="btn btn--not-style btn--size_xl pdd--r2 pdd--l2 color--silver" ng-click="vm.remove(sieve)"><span class="icon-delete"></span></button></div></div></div></form></div>');
$templateCache.put('app/settings/tags/tags.html','<div class="settings-tags"><div class="settings-tags__header"><button class="btn btn--size_m btn--yellow" ng-click="vm.openTagCreatePopup()">{{ \'CREATE_TAG\' | translate }}</button></div><div class="settings-tags__list"><div class="settings-tags__item" ng-repeat="tag in vm.tags.items"><div class="settings-tags__item-content" ng-class="{\'tags-settings__item--active\': tag.isSelected}" ng-click="vm.select(tag)"><div class="settings-tags__item-content-left"><div class="settings-tags__color-tag" style="background-color: {{ tag.bgcolor }}"></div><div class="settings-tags__caption">{{ tag.tag_name }}</div><!--<div class="settings-tags__counter">(25)</div>--></div><div class="settings-tags__item-content-right"><button class="btn btn--not-style btn--size_xl pdd--r2 pdd--l2 mrg--r5 color--silver" ng-click="vm.openTagEditPopup()" ng-disabled="!vm.selected"><span class="icon-edit-pen"></span></button><!--<button class="btn btn&#45;&#45;not-style btn&#45;&#45;size_xl pdd&#45;&#45;r2 pdd&#45;&#45;l2 mrg&#45;&#45;r5 color&#45;&#45;silver">\n                        <span class="icon-clear"></span>\n                    </button>--> <button class="btn btn--not-style btn--size_xl pdd--r2 pdd--l2 color--silver" ng-disabled="!vm.selected" ng-click="vm.destroy()"><span class="icon-delete"></span></button></div></div></div></div></div>');}]);