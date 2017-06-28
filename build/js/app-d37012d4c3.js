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
        'mail'
        // 'settings'
    ]);
})();

(function() {
  'use strict';

  angular.module('app.components', []);
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
            'ng-token-auth',
            'ngFileUpload',
            'ngImgCrop',
            'ui.select',
            'dcbImgFallback',
            'ngFileSaver',
            'infinite-scroll',
            'content-editable',
            'LocalStorageModule',
            'ngTagsInput'
        ]);
})();

(function() {
  'use strict';

  angular.module('app.layout', [
    'app.core'
  ]);
})();

(function() {
    'use strict';

    angular.module('app.directives', []);
})();

(function () {
    'use strict';

    angular.module('marketing', [
        'marketing.home'
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

    angular.module('settings', [
        'settings.main',
        'settings.tags'
    ]);
})();
(function() {
  'use strict';

  angular.module('app.services', [
      'app.core'
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

  angular.module('blocks.router', [
    'ui.router',
    'blocks.logger'
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

(function () {
    'use strict';

    angular.module('mail.inbox', []);
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

    angular.module('mail.message', []);
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

    moment.locale('ru');
    
    var core = angular.module('app.core');

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

                console.log(' response.token',  response.data.access_token);
                $auth.persistData('auth_headers', {
                    'Authorization': response.data.access_token
                });

                return response.data;
            },
            handleAccountUpdateResponse: function (response) {
                return response.data;
            },
            handleTokenValidationResponse: function (response) {
                // alert();
                // console.log('handleTokenValidationResponse', profile.get());
                return response.data;
            }
        });
    }])

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
                var mediaUrl = CONFIG.MediaUrl + scope.$eval(attrs.mediaUrl);
                element.attr('src', mediaUrl);
            });
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
            element.on('click', function () {
                $timeout(function () {
                    var el = $window.document.getElementById(attrs.setFocus);
                    console.log('element', el);
                    el.focus();
                }, 250);
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

        activate();

        function activate() {
            vm.folder = folder;
            vm.tag = tagResolve;
        }
        
        function closeMenu() {
            $rootScope.isOpenMenu = false;
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

    mailBox.$inject = ['CONFIG', '$resource', '$http', '$rootScope'];

    function mailBox(CONFIG, $resource, $http, $rootScope) {
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

    mail.$inject = ['CONFIG', '$resource', '$http', '$rootScope', 'Upload', '$state'];

    function mail(CONFIG, $resource, $http, $rootScope, Upload, $state) {
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

            _.forEach(files, function (file, i){
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
            return resource.move(params, data).$promise;
        }

        function moveToFolder(folder, data) {
            var messages = angular.copy(data);

            if (messages.isLoading || !messages.checked.length) return;

            // console.log('folder', folder.caption);

            $rootScope.$broadcast('notify:message', {
                message: (messages.checked.length > 1 ? 'Письма' : 'Письмо') + ' ' + (messages.checked.length > 1 ? 'перемещены' : 'перемещено') + ' в папку <strong>' + folder.caption + '</strong>'
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
            _.forEach(messages, function(item) {
                data.push({
                    number: item.number,
                    connection_id: item.connection_id,
                    mbox: item.mbox
                })
            });
            return data;
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
            setPaginate: setPaginate
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

            var isSet = false;

            _.forEach(profiles, function (item) {
                if (item.profile.email === user.profile.email) {
                    isSet = true;
                }
            });

            if (!isSet) {
                profiles.push(user);
                localStorageService.set('profiles', profiles);
            }
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

    AttachItemController.$inject = ['$auth'];
    /* @ngInject */
    function AttachItemController($auth) {
        var vm = this;

        activate();

        function activate() {
            vm.user = $auth.user;

            console.log('attach', vm.attach);
            console.log('message', vm.message);
            console.log('user', vm.user);
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

    AttachUploadController.$inject = ['$auth', '$state'];
    /* @ngInject */
    function AttachUploadController($auth, $state) {
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
                "http://apimail.devogic.com/mail/",
                vm.message.model.number,
                "?mbox=",
                vm.message.model.mbox || 'Drafts',
                // vm.$state.params.mbox ? vm.$state.params.mbox : 'Drafts',
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
                vm.firstLetter = vm.name.split(' ')[0].slice(0, 1);

                if (vm.name.split(' ')[1]) {
                    vm.lastLetter = vm.name.split(' ')[1].slice(0, 1);
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
        .component('folderCreate', {
            bindings: {
                onClose: '&'
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

        // vm.onClose
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
                icon: 'icon-draft-desk'
            },
            {
                name: 'Trash',
                icon: 'icon-bin-desk'
            },
            {
                name: 'Sent',
                icon: 'icon-sent-desk'
            },
            {
                name: 'Junk',
                icon: 'icon-spam-desk'
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

            console.log('vm.message', vm.message);
            console.log('vm.messages', vm.messages);
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

            console.log('ids', ids);

            mail.setFwdData(vm.messages.checked);

            $state.go('mail.compose', {
                ids: ids,
                fwd: true
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
                tag_name: 'Все метки',
                id: undefined
            },
            items: [{
                tag_name: 'Все тэги',
                id: undefined
            }]
        };

        vm.standartFolders = [
            {
                caption: 'Все папки',
                name: 'ALL',
                icon: 'icon-incoming'
            },
            {
                name: 'INBOX',
                icon: 'icon-incoming'
            },
            {
                name: 'Drafts',
                icon: 'icon-draft'
            },
            {
                name: 'Trash',
                icon: 'icon-bin'
            },
            {
                name: 'Sent',
                icon: 'icon-sent'
            },
            {
                name: 'Junk',
                icon: 'icon-spam'
            }
        ];

        vm.folders = {
            selected: {
                caption: 'Все папки',
                name: 'ALL',
                icon: 'icon-incoming'
            }
        };

        vm.searchParts = {
            selected: {
                'name': 'Искать по всему письму',
                'value': 'all'
            },
            list: [
                {
                    'name': 'Искать по всему письму',
                    'value': 'all'
                },
                {
                    'name': 'в поле "Отправитель"',
                    'value': 'from'
                },
                {
                    'name': 'в поле "Получатель"',
                    'value': 'to'
                },
                {
                    'name': 'в теле письма',
                    'value': 'body'
                },
                {
                    'name': 'в тексте письма',
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

    ToDateController.$inject = ['$scope'];
    /* @ngInject */
    function ToDateController($scope) {
        var vm = this;

        vm.convertDate = '';

        vm.calendarFormat = {
            sameDay: 'HH:mm',
            nextDay: '[завтра]',
            nextWeek: 'dddd',
            lastDay: '[вчера] hh:mm',
            lastWeek: 'DD [го] MMMM YYYY [в] hh:mm',
            sameElse: 'DD [го] MMMM YYYY [в] hh:mm'
        };

        vm.calendarSmallFormat = {
            sameDay: 'HH:mm',
            nextDay: '[Tomorrow]',
            nextWeek: 'dddd',
            lastDay: 'D MMM',
            lastWeek: 'D MMM YY',
            sameElse: 'D MMM YY'
        };

        vm.getConvert = getConvert;

        $scope.$watch('vm.date', function (data, newData) {
            if (data) {
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
            // moment().format('LLL');  // 11 мая 2017 г., 22:14
        }

        function getConvert(date) {
            if (vm.isSmall) {
                return moment(date).calendar(null, vm.calendarSmallFormat);
            }
            return moment(date).calendar(null, vm.calendarFormat);
        }

        function getUnixConvert(date) {
            if (vm.isSmall) {
                return moment.unix(date).calendar(null, vm.calendarSmallFormat);
            }
            return moment.unix(date).calendar(null, vm.calendarFormat);
        }
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
                username: {
                    'required': 'Введите email или логин'
                }
            }
        };

        vm.requestPasswordReset = requestPasswordReset;

        function requestPasswordReset(form) {
            if (form.$invalid) return;
            // console.log(vm.userForm);
            vm.userForm.isLoading = true;
            $auth.requestPasswordReset(vm.userForm.model)
                .then(function (response) {
                    vm.userForm.isLoading = false;
                    $state.go('passwordUpdate', {
                        username: vm.userForm.model.username
                    });
                })
                .catch(function (response) {
                    // handle error response
                    vm.userForm.errors = response.data.data;
                    console.log('error',vm.userForm.errors);
                });
        }

        // function sendCode() {
        //     if (!vm.userForm.model.phone) return;
        //
        //     var phone = '420' + vm.userForm.model.phone.replace(/\s{2,}/g, ' ');
        //
        //     // console.log('vm.userForm.model.phone', phone);
        //     authService.sendCode({}, {phone: phone})
        //         .then(function (response) {
        //             console.log('response', response);
        //             vm.codeResult = response;
        //         })
        //         .catch(function (response) {
        //             vm.userForm.errors = response.data;
        //             console.log('error', response);
        //         });
        // }
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
        .module('auth.signIn')
        .controller('SignInController', SignInController);

    SignInController.$inject = ['$scope', '$state', '$auth', 'profile'];
    /* @ngInject */
    function SignInController($scope, $state, $auth, profile) {
        var vm = this;

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
                signWidthToken();
            }
        }

        function signWidthToken() {
            vm.isTokenAuthLoading = true;

            $auth.setAuthHeaders({
                "Authorization": "Bearer " + $state.params.token
            });

            $auth.validateUser().then(function() {
                if ($state.params.compose) {
                    $state.go('mail.compose');
                }

                if (!$state.params.compose) {
                    $state.go('mail.inbox', {mbox: 'INBOX'});
                }
            });
        }

        function login() {
            console.log(vm.userForm);
            vm.userForm.isLoading = true;
            $auth.submitLogin(vm.userForm.model)
                .then(function (response) {
                    vm.userForm.isLoading = false;

                    profile.addStorageProfile(response);

                    $state.go('mail.inbox', {mbox: 'INBOX'});
                })
                .catch(function (response) {
                    vm.userForm.errors = "Не правильный логин или пароль";
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
            model: {},
            validations: {
                code: {
                    'required': 'Введите код'
                },
                newpassword: {
                    'required': 'Введите новый пароль'
                },
                passwordConf: {
                    'required': 'Повторите новый пароль'
                }
            }
        };

        vm.resetPassword = resetPassword;

        activate();

        function activate() {
            // alert($state.params.username);
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
                    // handle error response
                    vm.userForm.errors = response.data.data;
                    console.log('error', vm.userForm.errors);
                });
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
                        // var title = config.docTitle + ' ' + (toState.title || '');
                        var title = 'Mail.cz';

                        if (toState.name === 'mail.inbox') {
                            var folderName = _.result(_.find(mailBox.getCacheList().items, {'name': toParams.mbox}), 'caption');
                            title = folderName + ' - ' + title;
                        }

                        $rootScope.title = title;
                        $rootScope.isOpenMenu = false;
                    }
                );
            }
        }
    }
})();

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
            model: {
                phone: '420'
            },
            validations: {
                phone: {}
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
                    vm.userForm.errors = response.data.data;
                    console.log('error', response);
                });
        }

        function sendCode() {
            var phone = '420' + vm.userForm.model.phone.replace(/\s{2,}/g, ' ');
            // console.log('vm.userForm.model.phone', phone);
            authService.sendCode({}, {phone: phone})
                .then(function (response) {
                    console.log('response', response);
                    vm.codeResult = response.data;
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
        vm.title = 'Header';

        vm.searchForm = {
            model: {}
        };

        vm.currentFolder = {};

        vm.notify = {};

        vm.openMenu = openMenu;
        vm.closeMenu = closeMenu;
        vm.clearSearch = clearSearch;
        vm.search = search;
        vm.send = send;

        $scope.$watch('vm.$state.params.mbox', function () {
            getCurrentFolder();
        });

        $scope.$on('notify:message', function (e, data) {
            console.log('data', data);
            vm.notify.isOpen = true;
            vm.notify.message = data.message;
            $timeout(function () {
                vm.notify.isOpen = false;
            }, 3000);
        });

        $scope.$on('mail:isSend', function (e, data) {
            console.log('mail:isSend', data);
            vm.isSend = data.isSend;
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

        function getCurrentFolder() {
            _.forEach(vm.folder.data.items, function (folder) {
                if (folder.name === vm.$state.params.mbox) {
                    vm.currentFolder = folder;
                }
            });
        }

        function search() {
            var data = {};

            if (vm.searchForm.model.search) {
                data.search = vm.searchForm.model.search;
                data.search_part = 'text';
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

    MenuMainController.$inject = ['$scope', '$rootScope', '$uibModal', '$auth', 'mail', 'mailBox', 'tag', 'profile', 'CONFIG'];

    /* @ngInject */
    function MenuMainController($scope, $rootScope, $uibModal, $auth, mail, mailBox, tag, profile, CONFIG) {
        var vm = this;

        vm.standartFolders = [
            {
                name: 'INBOX',
                icon: 'icon-incoming-desk'
            },
            {
                name: 'Drafts',
                icon: 'icon-draft-desk'
            },
            {
                name: 'Trash',
                icon: 'icon-bin-desk'
            },
            {
                name: 'Sent',
                icon: 'icon-sent-desk'
            },
            {
                name: 'Junk',
                icon: 'icon-spam-desk'
            },
            {
                name: 'Archive',
                icon: 'icon-archive-desk'
            }
        ];

        vm.folders = {};

        vm.tags = {
            items: []
        };

        vm.user = $auth.user;

        vm.profiles = [];

        $rootScope.$on('mail:sync', function () {
            getMailBox();
        });

        $rootScope.$on('folders:sync', function () {
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

        activate();

        function activate() {
            getMailBox();
            getTag();
            getProfiles();

            // vm.user = $auth.user;

            // vm.user.profile.photo = CONFIG.MediaUrl + vm.user.profile.photo;
            // console.log('vm.user', vm.user);
        }
        
        function goToDesktopVersion(target) {
            // alert(target);
            window.location.href = target;
            // window.location.reload(true);
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
            vm.folders.items = _.sortBy(vm.folders.items, [
                {'name': 'INBOX'},
                {'isSub': true},
                {'name': 'Sent'},
                {'name': 'Trash'},
                {'name': 'Junk'},
                {'name': 'Drafts'}
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
            $auth.setAuthHeaders({
                "Authorization": profile.access_token
            });
            location.reload();
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
    }
})();

(function () {
    'use strict';

    angular
        .module('mail.inbox')
        .controller('InboxController', InboxController);

    InboxController.$inject = ['$rootScope', '$state', '$http', 'mail', 'mailBox', 'profile', 'messages'];
    /* @ngInject */
    function InboxController($rootScope, $state, $http, mail, mailBox, profile, messages) {
        var vm = this;

        vm.messages = {
            params: {
                'per-page': 10,
                'len': 100
            },
            defaultParams: {
                'per-page': 10,
                'len': 100
            },
            checked: []
        };

        vm.folders = {};

        $rootScope.$on('mail:sync', function () {
            get();
        });

        $rootScope.$on('mail:inbox:messages:update', function (e, data) {
            // console.log(data);
            vm.messages = data;
            // get();
        });

        $rootScope.$on('search:mailQuery', function (e, data) {
            vm.messages.params = data.search;
            vm.searchQuery = data.search;
            vm.messages.isSearch = true;
            get();
        });

        $rootScope.$on('search:mail', function (e, data) {
            vm.messages.params = data.search;
            vm.messages.params = _.assign(vm.messages.params, vm.searchQuery);
            vm.messages.isSearch = true;
            get();
        });

        $rootScope.$on('search:close', function (e, data) {
            vm.messages.params = angular.copy(vm.messages.defaultParams);
            vm.messages.params.mbox = $state.params.mbox;
            vm.messages.isSearch = false;
            get();
        });

        vm.openTagList = openTagList;
        vm.paginate = paginate;

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
            mail.get(vm.messages.params).then(function (response) {
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
                    url: '/inbox?mbox&filter&tag_id',
                    templateUrl: 'app/mail/inbox/inbox.html',
                    controller: 'InboxController',
                    controllerAs: 'vm',
                    title: 'Inbox',
                    resolve: {
                        messages: function (mail, $stateParams) {
                            var messages = {
                                params: {
                                    'per-page': 10,
                                    'len': 100
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
        .module('mail.compose')
        .controller('ComposeController', ComposeController);

    ComposeController.$inject = ['mail', '$interval', '$state', '$scope', '$rootScope', '$auth', 'contact', '$uibModal', 'Upload'];
    /* @ngInject */
    function ComposeController(mail, $interval, $state, $scope, $rootScope, $auth, contact, $uibModal, Upload) {
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
                    save();
                    vm.interval = $interval(function () {
                        if (vm.sendForm.model.to && !vm.$state.params.template) {
                            save();
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

            if ($state.params.id && $state.params.mbox && !$state.params.fwd && !$state.params.re) {
                vm.sendForm.id = $state.params.id;
                getMessage();
            }

            if ($state.params.to) {
                vm.sendForm.model.to = $state.params.to;
            }

            if ($state.params.fwd && $state.params.mbox === 'Drafts') {
                pasteFwd();
            }

            if ($state.params.fwd && $state.params.mbox !== 'Drafts') {
                vm.sendForm.id = $state.params.ids;

                if (_.isArray($state.params.ids)) {
                    pasteFwdList();
                    return;
                }

                copyFwdMessage();
            }

            if ($state.params.re && $state.params.mbox === 'Drafts') {
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
                mail.put({id: vm.sendForm.id}, data);
            } else {
                mail.post({}, data);
            }

            $rootScope.$broadcast('notify:message', {
                message: 'Письмо успешно отправлено'
            });

            $state.go('mail.inbox', {mbox: 'INBOX'});
        }

        function save() {
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

                    $state.go('mail.compose', {
                        id: vm.sendForm.id,
                        mbox: 'Drafts',
                        connection_id: vm.user.profile.default_connection_id
                    }, {notify: false});

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

            mail.upload({
                id: $state.params.id,
                mbox: $state.params.mbox
            }, {}, files).then(function (response) {
                vm.isUploading = false;
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

        function pasteFwd() {
            mail.getById({
                id: $state.params.id,
                mbox: $state.params.mbox,
                connection_id: $state.params.connection_id,
                part: 'headnhtml'
            }).then(function (response) {
                var message = response.data;

                var html = '<br><br><br>';
                html += '-------- Пересылаемое сообщение--------<br>';
                html += moment(message.date.date).format('DD.MM.YYYY HH.mm');
                html += ' ';
                html += message.fromAddress || '';
                html += '<br><br>';
                html += message.body + '<br>';
                html += '-------- Конец пересылаемого сообщения --------';
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

                vm.sendForm.model.to = getEmailSelectFormat({
                    first_name: message.from,
                    email: message.fromAddress
                });
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
                id: $state.params.ids,
                mboxfrom: $state.params.mbox,
                connection_id: $state.params.connection_id,
                cmd: 'forward'
            };
            mail.post({}, data).then(function (response) {
                vm.sendForm.id = response.data.id;

                $state.go('mail.compose', {
                    id: response.data.id,
                    mbox: 'Drafts',
                    connection_id: vm.user.profile.default_connection_id
                }, {notify: false});

                pasteFwd();
            });
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
        .module('mail.message')
        .controller('MessageController', MessageController);

    MessageController.$inject = ['mail', '$scope', '$state', '$sce', 'message', 'tag', '$rootScope', '$uibModal'];
    /* @ngInject */
    function MessageController(mail, $scope, $state, $sce, message, tag, $rootScope,  $uibModal) {
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

        vm.getDate = getDate;
        vm.getTrustHtml = getTrustHtml;
        vm.setUnTag = setUnTag;
        vm.send = send;
        vm.setImportant = setImportant;
        vm.move = move;
        vm.destroy = destroy;
        vm.openMessageMenu = openMessageMenu;

        $scope.$on('tag:message:add:success', function (e, data) {
            // console.log('data', data);
            // vm.message.model.tags.push(data.tag);
            getTags();
        });

        $scope.$on('tag:message:delete:success', function (e, data) {
            // console.log('data', data);
            // vm.message.model.tags.push(data.tag);
            getTags();
        });

        activate();

        function activate() {
            vm.$state = $state;
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
                // ids: ids,
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
            if (form.$invalid) return;

            var data = {
                to: vm.message.model.fromAddress,
                body: vm.sendForm.model.body
            };

            data.cmd = 'send';
            mail.post({}, data).then(function (response) {
                console.log('response', response);
                if (response.success) {
                    $state.go('mail.inbox');
                }
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
                part: 'headnhtml',
                neighbours: 1
            }).then(function (response) {
                vm.paginate = response.data;

                mail.setPaginate(vm.paginate);
            })
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
$templateCache.put('app/mail/mail.html','<section class="layout"><div class="layout__header"><header folder="vm.folder"></header><div class="layout__menu" ng-class="{\'layout__menu--is-active-menu\': isOpenMenu}"><div class="layout__menu-content"><menu-main></menu-main></div><button class="layout__menu-closer btn--not-events btn--not-style" type="button" ng-click="vm.closeMenu()"></button></div></div><div class="layout__inner" layout-height><div class="layout__content"><ui-view class="height--min-inh height--all"></ui-view></div></div></section>');
$templateCache.put('app/settings/settings.html','<section class="layout"><div class="layout__header"><header></header></div><div class="layout__inner" layout-height><div class="layout__menu"><menu-settings></menu-settings></div><div class="layout__content"><ui-view></ui-view></div></div></section>');
$templateCache.put('app/auth/password-reset/password-reset.html','<div class="password-reset-layout"><div class="password-reset-layout__content"><div class="password-reset-layout__form password-reset-layout__form--wd388"><div class="card"><div class="auth-form"><div class="main-title-text line-h--h-1">\u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0434\u043E\u0441\u0442\u0443\u043F\u0430</div><form class="form" name="userForm" ng-submit="vm.requestPasswordReset(userForm)" novalidate><!-- \u0412\u0430\u0448 \u043C\u0430\u0439\u043B--><div class="form__field-item mrg__bottom10"><div class="field-style"><label class="field-style__title font--size13">\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u043B\u043E\u0433\u0438\u043D, \u0434\u043B\u044F \u043A\u043E\u0442\u043E\u0440\u043E\u0433\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C</label><div class="field-style__group"><input class="input input--size_l input--up-shadow width--inh" type="text" name="username" ng-model="vm.userForm.model.username" placeholder="\u041B\u043E\u0433\u0438\u043D \u0438\u043B\u0438 email" required><validation-errors data="userForm.username" server="vm.userForm.errors" messages="vm.userForm.validations.username"></validation-errors><!-- <div class="validation">\n                                         <div class="validation__message validation__message&#45;&#45;red">\n                                             \u042D\u0442\u043E \u0438\u043C\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u0443\u0436\u0435 \u0437\u0430\u043D\u044F\u0442\u043E. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435\n                                             \u0434\u0440\u0443\u0433\u043E\u0435\n                                         </div>\n                                     </div>--></div></div></div><!-- \u0421\u041C\u0421 \u0432\u0430\u043B\u0438\u0434\u0430\u0446\u0438\u044F --><!--<div class="form__field-item mrg__bottom10 mrg__top20 sms-bg">--><!--&lt;!&ndash; \u0414\u043E \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438 \u0421\u041C\u0421&ndash;&gt;--><!--<div class="width&#45;&#45;inh">--><!--<div class="field-style flex&#45;&#45;inline mrg__top5">--><!--<input class="input input&#45;&#45;size_l input&#45;&#45;up-shadow width&#45;&#45;inh mrg__right5"--><!--type="text"--><!--name="phone"--><!--ng-model="vm.userForm.model.phone"--><!--placeholder="+420 xxx xxx xxx"--><!--ui-mask="+420 999-999-999"--><!--required>--><!--<button class="btn btn&#45;&#45;size_l btn&#45;&#45;normal width&#45;&#45;min126" type="button"--><!--ng-click="vm.sendCode()">\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u043A\u043E\u0434--><!--</button>--><!--</div>--><!--<validation-errors data="userForm.phone"--><!--server="vm.userForm.errors"--><!--messages="vm.userForm.validations.phone"></validation-errors>--><!--<span class="notific notific&#45;&#45;auth mrg__top5" ng-if="vm.codeResult">--><!--\u041D\u0430 \u043D\u043E\u043C\u0435\u0440 +420 xxx xxx xxx \u0431\u044B\u043B \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D \u043A\u043E\u0434 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438 (\u0432\u0440\u0435\u043C\u0435\u043D\u043D\u043E)--><!--<span class="color&#45;&#45;red">{{ vm.codeResult }}</span>--><!--</span>--><!--</div>--><!--&lt;!&ndash; \u041F\u043E\u0441\u043B\u0435 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438 \u0421\u041C\u0421&ndash;&gt;--><!--&lt;!&ndash;<div class="width&#45;&#45;inh mrg__top5">&ndash;&gt;--><!--&lt;!&ndash;<div class="field-style flex&#45;&#45;inline align-items&#45;&#45;cn">&ndash;&gt;--><!--&lt;!&ndash;<input class="input input&#45;&#45;size_l input&#45;&#45;up-shadow width&#45;&#45;inh mrg__right5"&ndash;&gt;--><!--&lt;!&ndash;type="text"&ndash;&gt;--><!--&lt;!&ndash;name="code"&ndash;&gt;--><!--&lt;!&ndash;ng-model="vm.userForm.model.code"&ndash;&gt;--><!--&lt;!&ndash;placeholder="\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u043E\u0434 \u0438\u0437 \u0441\u043C\u0441"&ndash;&gt;--><!--&lt;!&ndash;required>&ndash;&gt;--><!--&lt;!&ndash;&lt;!&ndash;<button class="btn btn&#45;&#45;size_l btn&#45;&#45;normal width&#45;&#45;min126" type="button">\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C</button>&ndash;&gt;&ndash;&gt;--><!--&lt;!&ndash;<span class="ok-validates width&#45;&#45;inh">\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D</span>&ndash;&gt;--><!--&lt;!&ndash;</div>&ndash;&gt;--><!--&lt;!&ndash;<validation-errors data="userForm.code"&ndash;&gt;--><!--&lt;!&ndash;server="vm.userForm.errors"&ndash;&gt;--><!--&lt;!&ndash;messages="vm.userForm.validations.code">&ndash;&gt;--><!--&lt;!&ndash;</validation-errors>&ndash;&gt;--><!--&lt;!&ndash;</div>&ndash;&gt;--><!--</div>--><!----><div class="form__field-item form__field-item--flex-start mrg__top25"><div class="field-style"><button class="btn btn--size_l btn--red" type="submit">\u0414\u0430\u043B\u0435\u0435</button></div></div></form></div></div></div><!-- \u0444\u0443\u0442\u0442\u0435\u0440 \u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438--><div class="footer footer__auth"><!-- \u041A\u043E\u043F\u0438\u0440\u0430\u0439\u0442--><div class="footer__copyright"><span class="">\xA9 2001\u20142017 \xABMail.cz\xBB Group a.s.</span></div><!-- \u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0435 \u043C\u0435\u043D\u044E \u0441 \u0432\u044B\u0431\u043E\u0440\u043E\u043C \u044F\u0437\u044B\u043A\u0430--><div class="footer__right-menu mrg__right"><div class="navigation"><div class="navigation__row"><div class="navigation__item position width--size28"><div class="choice-language"><a class="choice-language__link choice-language--active" href=""><img class="choice-language__country" src="images/country/albania.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/bosnia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/croatia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/cz.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/macedonia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/russia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/serbia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/slovakia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/Slovenia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/uk.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/ukraine.svg" alt=""></a></div></div></div></div></div></div></div><div class="auth-layout__bg"></div></div>\u0430\u0448');
$templateCache.put('app/auth/password-update/password-update.html','<div class="auth-layout"><div class="password-reset-layout__content"><div class="password-reset-layout__form"><div class="card"><div class="auth-form"><div class="main-title-text line-h--h-1">\u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0434\u043E\u0441\u0442\u0443\u043F\u0430</div><form class="form" name="userForm" ng-submit="vm.resetPassword(userForm)" novalidate><!-- Code--><div class="form__field-item mrg__bottom6"><div class="field-style"><div class="field-style__group"><input class="input input--size_l input--up-shadow width--inh" type="text" name="code" ng-model="vm.userForm.model.code" placeholder="\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u043E\u0434 \u0438\u0437 \u0441\u043C\u0441" required><validation-errors ng-if="userForm.$submitted" data="userForm.code" server="vm.userForm.errors" messages="vm.userForm.validations.code"></validation-errors></div></div></div><!-- \u041F\u0430\u0440\u043E\u043B\u044C--><div class="form__field-item mrg__bottom6"><div class="field-style"><div class="field-style__group"><input class="input input--size_l input--up-shadow width--inh" type="password" name="newpassword" ng-model="vm.userForm.model.newpassword" placeholder="\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u043E\u0432\u044B\u0439 \u043F\u0430\u0440\u043E\u043B\u044C" required><validation-errors ng-if="userForm.$submitted" data="userForm.newpassword" server="vm.userForm.errors" messages="vm.userForm.validations.newpassword"></validation-errors></div></div></div><!-- \u041F\u0430\u0440\u043E\u043B\u044C 2--><div class="form__field-item"><div class="field-style"><div class="field-style__group"><input class="input input--size_l input--up-shadow width--inh" type="password" name="passwordConf" ng-model="vm.userForm.model.passwordConf" placeholder="\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u043E\u0432\u044B\u0439 \u043F\u0430\u0440\u043E\u043B\u044C" required><validation-errors ng-if="userForm.$submitted" data="userForm.passwordConf" server="vm.userForm.errors" messages="vm.userForm.validations.passwordConf"></validation-errors></div></div></div><!-- \u043A\u043D\u043E\u043F\u043A\u0430 \u0414\u0430\u043B\u0435\u0435 --><div class="form__field-item mrg__top25"><div class="field-style"><button class="btn btn--size_l btn--red width--inh" type="submit">\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0438 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C</button></div></div></form></div></div></div><!-- \u0444\u0443\u0442\u0442\u0435\u0440 \u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438--><div class="footer footer__auth"><!-- \u041A\u043E\u043F\u0438\u0440\u0430\u0439\u0442--><div class="footer__copyright"><span class="">\xA9 2001\u20142017 \xABMail.cz\xBB Group a.s.</span></div><!-- \u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0435 \u043C\u0435\u043D\u044E \u0441 \u0432\u044B\u0431\u043E\u0440\u043E\u043C \u044F\u0437\u044B\u043A\u0430--><div class="footer__right-menu mrg__right"><div class="navigation"><div class="navigation__row"><div class="navigation__item position width--size28"><div class="choice-language"><a class="choice-language__link choice-language--active" href=""><img class="choice-language__country" src="images/country/albania.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/bosnia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/croatia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/cz.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/macedonia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/russia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/serbia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/slovakia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/Slovenia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/uk.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/ukraine.svg" alt=""></a></div></div></div></div></div></div></div><div class="auth-layout__bg"></div></div>');
$templateCache.put('app/auth/sign-in/sign-in.html','<div class="auth-layout"><div class="auth-layout__content"><div class="auth-layout__form"><div class="card"><div class="auth-form"><div class="auth-form__logo mrg__bottom16"><img class="img-responsive mrg__auto" src="/images/logo.png"><hr class="hr hr--auth mrg__top16"></div><form class="form" name="userForm" ng-submit="vm.login(userForm)" novalidate><!-- \u043B\u043E\u0433\u0438\u043D --><div class="form__field-item mrg__bottom10"><div class="field-style"><input class="input input--size_l input--up-shadow width--inh" type="text" ng-model="vm.userForm.model.username" required placeholder="\u041B\u043E\u0433\u0438\u043D"><validation-errors data="userForm.username" server="vm.userForm.errors" messages="vm.userForm.validations.username"></validation-errors></div></div><!-- \u043F\u0430\u0440\u043E\u043B\u044C --><div class="form__field-item mrg__bottom10"><div class="field-style"><input class="input input--size_l input--up-shadow width--inh" type="password" ng-model="vm.userForm.model.password" required placeholder="\u041F\u0430\u0440\u043E\u043B\u044C"></div><validation-errors data="userForm.password" server="vm.userForm.errors" messages="vm.userForm.validations.password"></validation-errors></div><!-- \u0432\u043E\u0439\u0442\u0438 --><div class="form__field-item mrg__bottom10"><div class="field-style"><button class="btn btn--size_l btn--yellow width--inh" type="submit">\u0412\u043E\u0439\u0442\u0438</button></div></div><div class="validation mrg__bottom10"><div class="validation__message validation__message--red">{{ vm.userForm.errors }}</div></div><!-- \u0437\u0430\u043F\u043E\u043C\u043D\u0438\u0442\u044C / \u0437\u0430\u0431\u044B\u043B\u0438--><div class="form__field-item mrg__bottom10 flex flex--just-s-a"><div class="field-style widtn--inh"><!--\u043D\u0430\u0448 \u0447\u0435\u043A\u0431\u043E\u043A\u0441 --><label class="checkbox-y__label checkbox-y" for="isChecked"><input class="checkbox-y__input" id="isChecked" type="checkbox" name="isChecked" ng-model="isChecked"><div class="checkbox-y__body"><span class="checkbox-y__icon icon-mark"></span></div><span class="checkbox__text" role="presentation">\u0417\u0430\u043F\u043E\u043C\u043D\u0438\u0442\u044C \u043C\u0435\u043D\u044F</span></label></div><div class="field-style widtn--inh font--right"><a class="link link-aith" ui-sref="passwordReset">\u0417\u0430\u0431\u044B\u043B\u0438 \u043F\u0430\u0440\u043E\u043B\u044C?</a></div></div></form><hr class="hr hr--auth"><button class="btn btn--size_l btn--normal width--inh btn--s-gradient" ui-sref="signUp">\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F</button></div></div></div><!-- \u0444\u0443\u0442\u0442\u0435\u0440 \u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438--><div class="footer footer__auth"><!-- \u041A\u043E\u043F\u0438\u0440\u0430\u0439\u0442--><div class="footer__copyright"><span class="">\xA9 2001\u20142017 \xABMail.cz\xBB Group a.s.</span></div><!-- \u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0435 \u043C\u0435\u043D\u044E \u0441 \u0432\u044B\u0431\u043E\u0440\u043E\u043C \u044F\u0437\u044B\u043A\u0430--><div class="footer__right-menu mrg__right"><div class="navigation"><div class="navigation__row"><div class="navigation__item position width--size28"><div class="choice-language"><a class="choice-language__link choice-language--active" href=""><img class="choice-language__country" src="images/country/albania.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/bosnia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/croatia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/cz.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/macedonia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/russia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/serbia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/slovakia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/Slovenia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/uk.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/ukraine.svg" alt=""></a></div></div></div></div></div></div></div><div class="auth-layout__bg"></div></div>');
$templateCache.put('app/auth/sign-up/sign-up.html','<div class="auth-layout"><div class="auth-layout__content"><div class="auth-layout__form auth-layout__form--wd388"><div class="card"><div class="auth-form"><div class="auth-form__logo mrg__bottom16"><img class="img-responsive mrg__auto" src="/images/logo.png"><hr class="hr hr--auth mrg__top16"></div><form class="form" name="userForm" ng-submit="vm.signUp(userForm)" novalidate><!-- \u0438\u043C\u044F \u0438 \u0444\u0430\u043C\u0438\u043B\u0438\u044F --><div class="form__field-item form__field-item--mob-modif mrg__bottom8 flex--inline"><div class="field-style mrg__right5 mrg__bottom6"><input class="input input--size_l input--up-shadow width--inh" type="text" name="first_name" ng-model="vm.userForm.model.first_name" placeholder="\u0418\u043C\u044F" required><validation-errors data="userForm.first_name" server="vm.userForm.errors" messages="vm.userForm.validations.first_name"></validation-errors></div><div class="field-style mrg__bottom6"><input class="input input--size_l input--up-shadow width--inh" type="text" ng-model="vm.userForm.model.last_name" placeholder="\u0424\u0430\u043C\u0438\u043B\u0438\u044F" required><validation-errors data="userForm.last_name" server="vm.userForm.errors" messages="vm.userForm.validations.last_name"></validation-errors></div></div><!-- \u043B\u043E\u0433\u0438\u043D \u0432 \u0431\u0430\u0437\u0435 --><div class="form__field-item mrg__bottom10"><div class="field-style"><label class="field-style__title font--size13">\u041F\u0440\u0438\u0434\u0443\u043C\u0430\u0439\u0442\u0435 \u0438\u043C\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F</label><div class="field-style__group"><div class="width--inh position"><span class="input-plash input-plash--top13 font--size13">@mail.cz</span> <input class="input input--size_l input--up-shadow width--inh" type="text" name="username" ng-model="vm.userForm.model.username" placeholder="\u0418\u043C\u044F \u043F\u043E\u0447\u0442\u044B" required></div><validation-errors data="userForm.username" server="vm.userForm.errors" messages="vm.userForm.validations.username"></validation-errors><!-- <div class="validation">\n                                        <div class="validation__message validation__message&#45;&#45;red">\n                                            \u042D\u0442\u043E \u0438\u043C\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u0443\u0436\u0435 \u0437\u0430\u043D\u044F\u0442\u043E. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435\n                                            \u0434\u0440\u0443\u0433\u043E\u0435\n                                        </div>\n                                    </div>--></div><!--<div class="input-data-valide-test mrg__top10 mrg__bottom10 ">--><!--\u0421\u0432\u043E\u0431\u043E\u0434\u043D\u043E: <span class="input-data-valide-test__we-offer">abc779736</span>--><!--</div>--></div></div><!-- \u043F\u0430\u0440\u043E\u043B\u044C --><div class="form__field-item mrg__bottom6"><div class="field-style"><input class="input input--size_l input--up-shadow width--inh" type="password" name="password" ng-model="vm.userForm.model.password" placeholder="\u041F\u0430\u0440\u043E\u043B\u044C" required><validation-errors data="userForm.password" server="vm.userForm.errors" messages="vm.userForm.validations.password"></validation-errors></div></div><!-- \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u0435 \u043F\u0430\u0440\u043E\u043B\u044F --><div class="form__field-item mrg__bottom10"><div class="field-style"><input class="input input--size_l input--up-shadow width--inh" type="password" name="passwordConf" ng-model="vm.userForm.model.passwordConf" placeholder="\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u0435 \u043F\u0430\u0440\u043E\u043B\u044F" required><validation-errors data="userForm.passwordConf" server="vm.userForm.errors" messages="vm.userForm.validations.passwordConf"></validation-errors></div></div><!-- \u0421\u041C\u0421 \u0432\u0430\u043B\u0438\u0434\u0430\u0446\u0438\u044F --><!--\u0434\u043B\u044F \u041E\u0442\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F \u0432\u044B\u0434\u0435\u043B\u0435\u043D\u0438\u044F \u0431\u043B\u043E\u043A\u0430 \u043F\u043E\u0434\u043B\u043E\u0436\u043A\u043E\u0439 \u043F\u0440\u043E\u0441\u0442\u043E \u0434\u043E\u0431\u0430\u0432\u043B\u044F\u0435\u043C \u044Esms-bg  --><div class="form__field-item mrg__bottom25 mrg__top30 flex flex--row-wrap"><div class="field-style flex--inline"><input class="input input--size_l input--up-shadow width--inh" type="text" name="phone" ng-model="vm.userForm.model.phone" ui-mask-placeholder ui-mask-placeholder-char="x" ui-mask="+999 999-999-999" ui-options="{allowInvalidValue: true, clearOnBlur: false}" required> <button class="btn btn--size_l btn--normal width--inh btn--s-gradient" type="button" ng-click="vm.sendCode()">\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u043A\u043E\u0434</button></div><div class="field-style width--inh"><validation-errors data="userForm.phone" server="vm.userForm.errors" messages="vm.userForm.validations.phone"></validation-errors><span class="notific notific--auth" ng-if="vm.codeResult">\u041D\u0430 \u043D\u043E\u043C\u0435\u0440 +420 xxx xxx xxx \u0431\u044B\u043B \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D \u043A\u043E\u0434 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438</span></div></div><!-- \u0421\u041C\u0421 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u0435 \u043A\u043E\u0434\u0430 --><div class="form__field-item mrg__bottom20 mrg__top16 flex flex--row-wrap" ng-if="vm.codeResult.code"><div class="width-inh flex--inline align-items--cn"><div class="field-style mrg__right5 width--size177"><input class="input input--size_l input--up-shadow width--inh" type="text" name="code" ng-model="vm.userForm.model.code" placeholder="\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u043E\u0434 \u0438\u0437 \u0441\u043C\u0441" required></div><div class="field-style width--aut"><!--<button class="btn btn--size_l btn--normal width--inh btn--s-gradient" type="button">\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C--><!--</button>--> <span class="ok-validates width--inh">\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D</span></div></div><validation-errors data="userForm.code" server="vm.userForm.errors" messages="vm.userForm.validations.code"></validation-errors></div><!-- \u0421\u041C\u0421 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u0435 \u043A\u043E\u0434\u0430 --><!--<div class="form__field-item mrg__bottom20 mrg__top16 flex flex&#45;&#45;row-wrap ">--><!--<div class="field-style flex&#45;&#45;inline align-items&#45;&#45;cn">--><!--<input class="input input&#45;&#45;size_l input&#45;&#45;up-shadow width&#45;&#45;inh mrg__right5"--><!--type="text"--><!--name="code"--><!--ng-model="vm.userForm.model.code"--><!--placeholder="\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u043E\u0434 \u0438\u0437 \u0441\u043C\u0441"--><!--required>--><!--<button class="btn btn&#45;&#45;size_l btn&#45;&#45;normal width&#45;&#45;inh btn&#45;&#45;s-gradient" type="button">\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C--><!--</button>--><!--&lt;!&ndash;<span class="ok-validates width&#45;&#45;inh">\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D</span>&ndash;&gt;--><!--</div>--><!--<div class="field-style width&#45;&#45;aut">--><!--<validation-errors  data="userForm.code"--><!--server="vm.userForm.errors"--><!--messages="vm.userForm.validations.code"></validation-errors>--><!--</div>--><!--</div>--><!-- \u0421\u043E\u0433\u043B\u0430\u0448\u0435\u043D\u0438\u0435 --><div class="form__field-item mrg__bottom10"><div class="field-style widtn--inh"><!--\u043D\u0430\u0448 \u0447\u0435\u043A\u0431\u043E\u043A\u0441 --><label class="checkbox-y__label checkbox-y checkbox-y--chek-top" for="isChecked"><input class="checkbox-y__input" id="isChecked" type="checkbox" name="agree" ng-model="vm.userForm.model.agree"><div class="checkbox-y__body"><span class="checkbox-y__icon icon-mark"></span></div><span class="checkbox__text font--size12 color--silver" role="presentation">\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0430\u044F \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044E \u0432\u044B \u043F\u0440\u0438\u043D\u0438\u043C\u0430\u0435\u0442\u0435 \u043F\u0440\u0430\u0432\u0438\u043B\u0430 \u043E\u043F\u0438\u0441\u0430\u043D\u043D\u044B\u0435 \u0432 <a class="link link-aith" href="">\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u043E\u043C \u0441\u043E\u0433\u043B\u0430\u0448\u0435\u043D\u0438\u0438</a></span></label><validation-errors data="userForm.agree" server="vm.userForm.errors" messages="vm.userForm.validations.agree"></validation-errors></div></div><!-- \u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u0441\u044F --><div class="form__field-item mrg__bottom10"><hr class="hr hr--auth"><div class="field-style"><button class="btn btn--size_l btn--yellow width--inh" type="submit">\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u0441\u044F</button></div></div></form><!--<hr class="hr hr&#45;&#45;auth ">--> <button class="btn btn--size_l btn--link-style" ui-sref="signIn">\u0412\u043E\u0439\u0442\u0438</button></div></div></div><!-- \u0444\u0443\u0442\u0442\u0435\u0440 \u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438--><div class="footer footer__auth"><!-- \u041A\u043E\u043F\u0438\u0440\u0430\u0439\u0442--><div class="footer__copyright"><span class="">\xA9 2001\u20142017 \xABMail.cz\xBB Group a.s.</span></div><!-- \u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0435 \u043C\u0435\u043D\u044E \u0441 \u0432\u044B\u0431\u043E\u0440\u043E\u043C \u044F\u0437\u044B\u043A\u0430--><div class="footer__right-menu mrg__right"><div class="navigation"><div class="navigation__row"><div class="navigation__item position width--size28"><div class="choice-language"><a class="choice-language__link choice-language--active" href=""><img class="choice-language__country" src="images/country/albania.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/bosnia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/croatia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/cz.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/macedonia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/russia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/serbia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/slovakia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/Slovenia.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/uk.svg" alt=""></a><!----> <a class="choice-language__link" href=""><img class="choice-language__country" src="images/country/ukraine.svg" alt=""></a></div></div></div></div></div></div></div><div class="auth-layout__bg"></div></div>');
$templateCache.put('app/core/errors/404.html','404');
$templateCache.put('app/components/attach-upload/attach-upload.html','<div class="attach-upload"><div class="attach-upload__list"><div class="attach-upload__item" ng-repeat="attachment in vm.attachmentsData"><!--            <div class="attach-upload__image"\n                 ng-class="{\'attach-upload__image&#45;&#45;shadow\': attachment.mime === \'image/jpeg\' || attachment.mime === \'image/png\'}">\n                <img ng-src="{{ vm.getLink(attachment) }}"\n                     fallback-src="{{\'/images/upload-image.png\'}}"\n                     ng-if="attachment.mime === \'image/jpeg\' || attachment.mime === \'image/png\'">\n                <img src="/images/upload-file.png"\n                     ng-if="attachment.mime !== \'image/jpeg\' && attachment.mime !== \'image/png\'">\n            </div>--><div class="attach-upload__image" style="background-image: url(\'{{ vm.getLink(attachment) }}\')" ng-if="attachment.mime === \'image/jpeg\' || attachment.mime === \'image/png\'" ng-class="{\'attach-upload__image--shadow\': attachment.mime === \'image/jpeg\' || attachment.mime === \'image/png\'}"></div><div class="attach-upload__image" style="background-image: url(\'/images/upload-file.png\')" ng-if="attachment.mime !== \'image/jpeg\' && attachment.mime !== \'image/png\'"></div><div class="attach-upload__name">{{ attachment.mime.split(\'/\')[1]; }}</div><div class="attach-upload__links" ng-if="!vm.isUploading"><a class="attach-upload__delete icon-delete" href ng-click="vm.remove(attachment)"></a></div><div class="attach-upload__spinner"><spinner is-global="false" is-open="true" ng-if="vm.isUploading"></spinner></div></div></div></div>');
$templateCache.put('app/components/attach-item/attach-item.html','<div class="attach-item"><a href="http://apimail.devogic.com/mail/{{ vm.message.number }}?mbox={{ vm.message.mbox }}&part=attach&screen=true&filename={{ vm.attach.fileName }}&token={{ vm.user.access_token }}&connection_id={{ vm.message.connection_id }}" target="_blank"><div><div class="attach-item__image-block"><div class="attach-item__image" ng-if="vm.attach.mime === \'image/png\' || vm.attach.mime === \'image/jpeg\'" style="background-image: url(\'http://apimail.devogic.com/mail/{{ vm.message.number }}?mbox={{ vm.message.mbox }}&part=attach&filename={{ vm.attach.fileName }}&token={{ vm.user.access_token }}&connection_id={{ vm.message.connection_id }}\')"></div><div class="attach-item__image" ng-if="vm.attach.mime !== \'image/png\' && vm.attach.mime !== \'image/jpeg\'" style="background-image: url(\'images/upload-file.png\')"></div></div><div class="attach-item__name" ng-if="vm.attach.mime !== \'image/png\' && vm.attach.mime !== \'image/jpeg\'"><span class="attach-item__file-name">{{ vm.attach.fileName }}</span></div><div class="attach-item__type"><span class="attach-item__type-name">{{ vm.attach.mime.split(\'/\')[1]; }}</span></div><div class="attach-item__size">{{ vm.attach.size / 1024 | number:2 }} kb</div><button class="attach-item__button btn--not-style btn--not-events"><span class="icon-download"></span></button></div></a></div>');
$templateCache.put('app/components/avatar-name/avatar-name.html','<img class="avatar__image" src="/images/avatar-personal.svg" alt="" ng-if="!vm.firstLetter && !vm.emailLetter"><div class="avatar__symbol-image" ng-if="vm.firstLetter || vm.emailLetter"><div class="avatar__first-name">{{ vm.firstLetter ? vm.firstLetter : vm.emailLetter }}</div><div class="avatar__last-name" ng-if="vm.lastLetter">{{ vm.lastLetter }}</div></div>');
$templateCache.put('app/components/compose-header/compose-header.html','<div class="inbox-header"><div class="inbox-header__row"><div class="inbox-header__item"><a class="inbox-header__link" href><span class="icon-redo inbox-header__icon inbox-header__icon--green"></span> <span class="inbox-header__name">\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C</span></a></div><!--        <div class="inbox-header__item pull-right">\n            <a class="inbox-header__link" href>\n                <span class="icon-redo inbox-header__icon inbox-header__icon&#45;&#45;green"></span>\n                <span class="inbox-header__name">\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C</span>\n            </a>\n        </div>--></div></div>');
$templateCache.put('app/components/contact-to-add-select/contact-to-add-select.html','<tags-input class="tags-input" ng-model="vm.addresses" type="email" name="{{ vm.name }}" template="tag-template" template-scope="vm" display-property="first_name" key-property="id" replace-spaces-with-dashes="true" allow-dblclick-to-edit="true" ng-focus="isTagFocus = true" ng-blur="isTagFocus = false" placeholder="{{ vm.placeholder }}" autofocus="vm.isAutofocus"><auto-complete source="vm.findContacts($query, isTagFocus)" min-length="0" load-on-focus="true" load-on-empty="true" max-results-to-show="5" template="autocomplete-template"></auto-complete></tags-input><script type="text/ng-template" id="tag-template"><div class="tag-contact font-sizer--bigger-15 tag-contact__autocomplete-item"\n         ng-dblclick="$event.stopPropagation();">\n        <div class="avatar avatar--size20 mrg__right7">\n            <avatar-name name="data.first_name" email="data.emails[0].value"></avatar-name>\n        </div>\n        <div class="tag-contact__name" ng-if="data.first_name">\n            {{ data.first_name }}\n            {{ data.last_name }}\n        </div>\n        <div class="tag-contact__email" ng-if="!data.first_name">\n            {{ data.emails[0].value }}\n        </div>\n        <a class="tag-remove btn btn--not-style icon-cancel"\n           href\n           ng-click="$removeTag()"></a>\n    </div></script><script type="text/ng-template" id="autocomplete-template"><div class="tag-contact">\n        <div class="tag-contact__avatar avatar avatar--size28 mrg__right16 avatar--bg-color">\n            <avatar-name name="data.first_name" email="data.emails[0].value"></avatar-name>\n        </div>\n\n        <div class="tag-contact__info">\n            <div class="tag-contact__name">\n                {{ data.first_name }}\n                {{ data.last_name }}\n            </div>\n            <div class="tag-contact__email"\n\n                 ng-if="data.emails[0].value">\n                {{ data.emails[0].value }}\n            </div>\n            <!--ng-class="{\'mrg__left10\': data.first_name}"-->\n\n        </div>\n\n        <div class="tag-contact__phone"\n             ng-class="{\'mrg__left10\': data.first_name || data.emails[0].value}"\n             ng-if="data.phone">\n            {{ data.phone }}\n        </div>\n    </div></script>');
$templateCache.put('app/components/date-sort/date-sort.html','<div class="radiobutton main-switch-3 radiobutton--size_sm"><button class="search-filters__button-tab" type="button" ng-click="vm.selectDefault();">2017:</button> <button class="search-filters__button-tab search-filters__button-tab--is-choose" type="button" ng-click="vm.selectDate($index);" ng-repeat="month in vm.monthList">{{ month }}</button> <button class="search-filters__button-tab" type="button" ng-click="vm.selectDefault();">\u0412\u0441\u044F \u043F\u043E\u0447\u0442\u0430</button></div>');
$templateCache.put('app/components/example/example.html','<div class="card exp-parcel-card"><div class="card__header exp-parcel-card__header"><div class="row"><div class="col-md-7 col-sm-7 col-xs-7"><div class="exp-parcel-card__name pointer"><span>\u041D\u043E\u0432\u044B\u0439 \u0430\u0434\u0440\u0435\u0441</span></div></div><div class="col-md-5 col-sm-5 col-xs-5"><a class="exp-parcel-card__button" href ng-click="vm.close()"><img class="svg svg--size16" src="/images/svg/products-warehouse/card/close.svg"></a></div></div></div><div class="card__body exp-parcel-card__body row"><form class="col-lg-12 col-md-12 col-sm-12 col-xs-12" name="addressForm" ng-submit="vm.add(addressForm)" novalidate><div class="row"><div class="col-md-6"><label class="form__label">\u041F\u0440\u0438\u0432\u044F\u0437\u0430\u0442\u044C \u043F\u043E\u043B\u0443\u0447\u0430\u0442\u0435\u043B\u044F:</label><recipient-select selected="vm.addressForm.recipient" model=""></recipient-select></div><div class="col-md-6 mobile-group--size10"><label class="form__label">\u0421\u0442\u0440\u0430\u043D\u0430:</label><country-select selected="vm.addressForm.country" name="country" params="{id: \'USA\'}" required="true" is-no-select="true" on-selected="vm.clearAfterCountry()"></country-select><tooltip-validation ng-if="addressForm.country.$invalid && (addressForm.$submitted || addressForm.country.$touched)" tooltip-placement="bottom" tooltip-validation-errors="addressForm.country.$error" tooltip-validation-messages="vm.address.validations.country"></tooltip-validation></div><div class="col-md-6 form__group--size10"><label class="form__label">\u0420\u0435\u0433\u0438\u043E\u043D:</label><region-select name="region" selected="vm.addressForm.region" country-id="vm.addressForm.country.id" required="true" disabled="vm.addressForm.country.id" on-selected="vm.clearAfterRegion()"></region-select><tooltip-validation ng-if="addressForm.region.$invalid && (addressForm.$submitted || addressForm.region.$touched) && addressForm.country.$valid" tooltip-placement="bottom" tooltip-validation-errors="addressForm.region.$error" tooltip-validation-messages="vm.address.validations.region"></tooltip-validation></div><div class="col-md-6 form__group--size10"><label class="form__label">\u0413\u043E\u0440\u043E\u0434:</label><city-select name="city" selected="vm.addressForm.city" region-id="vm.addressForm.region.id" disabled="vm.addressForm.region.id" required="true" on-selected="vm.clearAfterCity()"></city-select><tooltip-validation ng-if="addressForm.city.$invalid && (addressForm.$submitted || addressForm.city.$touched) && addressForm.region.$valid" tooltip-placement="bottom" tooltip-validation-errors="addressForm.city.$error" tooltip-validation-messages="vm.address.validations.city"></tooltip-validation></div><div class="col-md-6 form__group--size10"><label class="form__label">\u0418\u043D\u0434\u0435\u043A\u0441:</label><input class="form__input" type="text" name="postalCode" ng-model="vm.addressForm.postalCode" required><tooltip-validation ng-if="addressForm.postalCode.$invalid && (addressForm.$submitted || addressForm.postalCode.$touched) && addressForm.city.$valid" tooltip-placement="bottom" tooltip-validation-errors="addressForm.postalCode.$error" tooltip-validation-messages="vm.address.validations.postalCode"></tooltip-validation></div><div class="col-md-6 form__group--size10"><label class="form__label">\u0423\u043B\u0438\u0446\u0430:</label><input class="form__input" type="text" name="street" ng-model="vm.addressForm.street" required><tooltip-validation ng-if="addressForm.street.$invalid && (addressForm.$submitted || addressForm.street.$touched) && addressForm.postalCode.$valid" tooltip-placement="bottom" tooltip-validation-errors="addressForm.street.$error" tooltip-validation-messages="vm.address.validations.street"></tooltip-validation></div><div class="col-md-12 form__group--size10"><label class="form__label">\u0414\u043E\u043C, \u043A\u043E\u0440\u043F\u0443\u0441, \u043A\u0432\u0430\u0440\u0442\u0438\u0440\u0430:</label><div class="row-inputs clearfix"><div class="row-inputs__item w50"><input class="form__input" type="text" name="house" ng-model="vm.addressForm.house" required><tooltip-validation ng-if="addressForm.house.$invalid && (addressForm.$submitted || addressForm.house.$touched) && addressForm.street.$valid" tooltip-placement="bottom" tooltip-validation-errors="addressForm.house.$error" tooltip-validation-messages="vm.address.validations.house"></tooltip-validation></div><div class="row-inputs__item w25"><input class="form__input" type="text" name="building" ng-model="vm.addressForm.building"><tooltip-validation ng-if="addressForm.building.$invalid && (addressForm.$submitted || addressForm.building.$touched) && addressForm.house.$valid" tooltip-placement="bottom" tooltip-validation-errors="addressForm.building.$error" tooltip-validation-messages="vm.address.validations.building"></tooltip-validation></div><div class="row-inputs__item w25"><input class="form__input" type="text" name="apartment" ng-model="vm.addressForm.apartment"><tooltip-validation ng-if="addressForm.apartment.$invalid && (addressForm.$submitted || addressForm.apartment.$touched) && addressForm.building.$valid" tooltip-placement="bottom" tooltip-validation-errors="addressForm.apartment.$error" tooltip-validation-messages="vm.address.validations.apartment"></tooltip-validation></div></div></div></div><div class="col-md-12 form__buttons__group text-center"><button class="btn-round btn-round--grey" type="button" ng-click="vm.close()">\u041E\u0442\u043C\u0435\u043D\u0430</button> <button class="btn-round btn-round--blue" type="submit">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C</button></div></form></div></div>');
$templateCache.put('app/components/folder-create/folder-create-popup.html','<div><div class="popup__close" ng-click="cancel()">\xD7</div><folder-create on-close="cancel()"></folder-create></div>');
$templateCache.put('app/components/folder-create/folder-create.html','<div class="folder-create"><div class="tag-create__title">\u0421\u043E\u0437\u0434\u0430\u0451\u043C \u043F\u0430\u043F\u043A\u0443</div><div class="mrg__top15"><form novalidate><div class="folder-create__input mrg__top15"><div class="mrg__right10"><span class="font--size13">\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435</span></div><div><input class="input input--size_s width--inh input--fc-sh-yellow" type="text" required> <a class="link link--dotted link--violet font--size13" href="">\u0412\u043B\u043E\u0436\u0438\u0442\u044C \u0432 \u0434\u0440\u0443\u0433\u0443\u044E \u043F\u0430\u043F\u043A\u0443</a></div></div><!--<div class="palette-list folder-create__palette mrg__top30">--><!--<div class="palette-list__item"--><!--style="background-color: {{ palette.color }}"--><!--ng-repeat="palette in vm.palette.items track by $index">--><!--<span class="palette-list__icon icon-mark" ng-if="palette.active"></span>--><!--</div>--><!--</div>--><div class="folder-create__btn mrg__top40"><button class="btn-y btn-y--border" type="submit">\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043F\u0430\u043F\u043A\u0443</button> <button class="btn-y btn-y--border">\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C</button></div></form></div></div>');
$templateCache.put('app/components/inbox-footer/inbox-footer.html','<div class="inbox-footer"><div class="inbox-footer__content"><!-- \u041A\u043D\u043E\u043F\u043A\u0430 \u043F\u0435\u0440\u0435\u0445\u043E\u0434\u0430 \u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u043F\u0438\u0441\u044C\u043C\u0430--><div class="inbox-footer__new-message" ng-if="!vm.messages.checked.length"><button class="btn btn--red btn--size_50 btn--radius_3 btn--padding-5 icon-write" ui-sref="mail.compose"></button></div><hr class="hr hr--inbox-footer"><!-- \u041D\u0438\u0436\u043D\u0435\u0435 \u043C\u0435\u043D\u044E \u043E\u043F\u0446\u0438\u0439 \u0434\u043B\u044F \u0432\u044B\u0434\u0435\u043B\u0435\u043D\u044B\u0445 \u043F\u0438\u0441\u0435\u043C --><div class="inbox-footer__group-option" ng-if="vm.messages.checked.length" ng-class="{\'is-more-switch\': vm.isMoreSwitch}"><div class="inbox-footer__group-option-wrapper"><div class="inbox-footer__group-option-content"><!-- \u043F\u0435\u0440\u0432\u0438\u0447\u043D\u044B\u0435 \u043A\u043D\u043E\u043F\u043A\u0438--> <button class="inbox-footer__group-option-item btn btn--not-style icon-delete font--size20 flex flex--column align-items--cn color--light-red padding" type="button" ng-if="vm.$state.params.mbox !== \'Trash\'" ng-click="vm.move({name: \'Trash\', caption: \'\u041A\u043E\u0440\u0437\u0438\u043D\u0430\'})"><span class="font--arial font--size14 mrg__top5">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</span></button> <button class="inbox-footer__group-option-item btn btn--not-style icon-delete font--size20 flex flex--column align-items--cn color--light-red padding" type="button" ng-if="vm.$state.params.mbox === \'Trash\'" ng-click="vm.destroy({name: \'Trash\'})"><span class="font--arial font--size14 mrg__top5">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</span></button> <button class="inbox-footer__group-option-item btn btn--not-style icon-spam font--size20 flex flex--column align-items--cn color--yellow padding" type="button" ng-if="vm.$state.params.mbox !== \'Junk\'" ng-click="vm.move({name: \'Junk\', caption: \'\u0421\u043F\u0430\u043C\'})"><span class="font--arial font--size14 mrg__top5">\u042D\u0442\u043E \u0441\u043F\u0430\u043C</span></button> <button class="inbox-footer__group-option-item btn btn--not-style icon-spam font--size20 flex flex--column align-items--cn color--yellow padding" type="button" ng-if="vm.$state.params.mbox === \'Junk\'" ng-click="vm.move({name: \'Inbox\', caption: \'\u0412\u0445\u043E\u0434\u044F\u0449\u0438\u0435\'})"><span class="font--arial font--size14 mrg__top5">\u041D\u0435 \u0441\u043F\u0430\u043C</span></button> <button class="inbox-footer__group-option-item btn btn--not-style btn--not-events icon-unread font--size20 flex flex--column align-items--cn padding" type="button" ng-click="vm.triggerSeen()"><span class="font--arial font--size14 mrg__top5" ng-if="vm.isSeen">\u041D\u0435 \u043F\u0440\u043E\u0447\u0438\u0442\u0430\u043D\u043E</span> <span class="font--arial font--size14 mrg__top5" ng-if="!vm.isSeen">\u041F\u0440\u043E\u0447\u0438\u0442\u0430\u043D\u043E</span></button><!-- \u043F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0430\u0442\u0435\u043B\u044C--> <button class="inbox-footer__group-option-item inbox-footer__group-option-item-switch btn btn--not-style icon-double-arrow-right font--size20 flex flex--column align-items--cn padding" type="button" ng-click="vm.isMoreSwitch = !vm.isMoreSwitch"><span class="font--arial font--size14 mrg__top5">\u0415\u0449\u0435</span></button><!-- \u0432\u0442\u043E\u0440\u0438\u0447\u043D\u044B\u0435 \u043A\u043D\u043E\u043F\u043A\u0438--> <button class="inbox-footer__group-option-item btn btn--not-style icon-folder font--size20 flex flex--column align-items--cn padding" type="button" ng-click="vm.openLayoutFolder()"><span class="font--arial font--size14 mrg__top5">\u0412 \u043F\u0430\u043F\u043A\u0443</span></button> <button class="inbox-footer__group-option-item btn btn--not-style icon-tag font--size20 flex flex--column align-items--cn padding" type="openTagListPopup" ng-click="vm.openTagListPopup()"><span class="font--arial font--size14 mrg__top5">\u041C\u0435\u0442\u043A\u0438</span></button> <button class="inbox-footer__group-option-item btn btn--not-style btn--not-events icon-archive font--size20 flex flex--column align-items--cn padding" type="button" ng-click="vm.move({name: \'Archive\', caption: \'\u0410\u0440\u0445\u0438\u0432\'})"><span class="font--arial font--size14 mrg__top5">\u0410\u0440\u0445\u0438\u0432</span></button></div></div></div></div></div>');
$templateCache.put('app/components/folder-layout/folder-layout.html','<div class="folder-layout" ng-if="vm.isOpen"><div class="folder-layout__container"><div class="folder-layout__header"><div class=""><span class="icon-d-folder folder-layout__icon"></span> <span>\u041F\u0430\u043F\u043A\u0438</span></div><span class="font--size12" ng-click="vm.close()">\u0417\u0430\u043A\u0440\u044B\u0442\u044C</span><!--<hr class="hr hr&#45;&#45;folders hr&#45;&#45;bottom">\u044B--></div><div class="folder-layout__content scrollables"><hr class="hr hr--folders hr--top"><!-- \u0421\u0432\u043E\u0438 \u043F\u0430\u043F\u043A\u0438--><!-- \u041E\u0442\u0434\u0435\u043B\u0438\u0442\u0435\u043B\u044C--><div class="folder-layout__separate mrg__bottom10"><span class="font--size12">\u041C\u043E\u0438 \u043F\u0430\u043F\u043A\u0438</span><hr class="hr hr--folders hr--bottom"></div><!-- \u0421\u0430\u043C\u0438 \u0438\u0442\u0435\u043C\u044B--><div class="folder-layout__item" ng-repeat="folder in vm.folders.items" ng-click="vm.move(folder)" ng-if="folder.isSub"><span class="icon-folder-desk folder-layout__icon"></span> <span class="folder-layout__title">{{ folder.caption }}</span></div><!--            <div class="folder-layout__item">\n                            <span class="icon-folder folder-layout__icon"></span>\n                            <span class="folder-layout__title">\u041C\u043E\u044F \u043F\u0430\u043F\u043A\u0430 1</span>\n                        </div>\n\n                        <div class="folder-layout__item">\n                            <span class="icon-folder folder-layout__icon"></span>\n                            <span class="folder-layout__title">\u041C\u043E\u044F \u043F\u0430\u043F\u043A\u0430 2</span>\n                        </div>\n\n                        <div class="folder-layout__item">\n                            <span class="icon-folder folder-layout__icon"></span>\n                            <span class="folder-layout__title">\u041C\u043E\u044F \u043F\u0430\u043F\u043A\u0430 3</span>\n                        </div>--><!-- \u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u043D\u044B\u0435 \u043F\u0430\u043F\u043A\u0438--><!-- \u041E\u0442\u0434\u0435\u043B\u0438\u0442\u0435\u043B\u044C--><div class="folder-layout__separate mrg__bottom10"><span class="font--size12">\u041E\u0441\u043D\u043E\u0432\u043D\u044B\u0435 \u043F\u0430\u043F\u043A\u0438</span><hr class="hr hr--folders hr--bottom"></div><div class="folder-layout__item" ng-repeat="folder in vm.folders.items" ng-click="vm.move(folder)" ng-if="!folder.isSub && folder.name !== vm.$state.params.mbox"><span class="{{ folder.icon }} folder-layout__icon"></span> <span class="folder-layout__title">{{ folder.caption }}</span></div></div><!--<div class="folder-layout__footer">--><!--<hr class="hr hr&#45;&#45;folders hr&#45;&#45;top">--><!--<span class="icon-settings folder-layout__icon"></span>--><!--<span class="folder-layout__title">\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043F\u0430\u043F\u043A\u0430\u043C\u0438</span>--><!--</div>--></div></div>');
$templateCache.put('app/components/inbox-message-list/inbox-message-list.html','<div class="inbox-message-list" ng-class="{\'inbox-message-list--indentation\': vm.messages.checked.length}"><inbox-message message="message" messages="vm.messages" ng-repeat="message in vm.messages.items"></inbox-message><div class="inbox-message-list__spinner"><spinner is-open="vm.messages.isLoading"></spinner></div></div>');
$templateCache.put('app/components/inbox-message/inbox-message.html','<div class="inbox-message" ng-class="{\'inbox-message--importmant\': vm.message.important,\n                \'inbox-message--new\': !vm.message.seen,\n                \'inbox-message--checked\': vm.message.isChecked}" ng-mouseover="vm.message.hover = true" ng-mouseleave="vm.message.hover = false" ng-click="vm.goToUrl()" inbox-message-hover><div class="inbox-message__left"><label ng-click="$event.stopPropagation();"><div class="inbox-message__avatar"><div class="avatar avatar--settings avatar--size42 avatar--second-style mrg__auto"><avatar-name name="vm.message.from" email="vm.message.fromAddress" ng-if="vm.$state.params.mbox !== \'Sent\' && vm.$state.params.mbox !== \'Drafts\'"></avatar-name><avatar-name name="vm.message.to[0].name" email="vm.message.to[0].address" ng-if="vm.$state.params.mbox === \'Sent\' || vm.$state.params.mbox === \'Drafts\'"></avatar-name><div class="inbox-message__check-message"></div><input type="checkbox" ng-model="vm.message.isChecked" style="display: none" data-checklist-model="vm.messages.checked" data-checklist-value="vm.message"></div></div></label><div class="inbox-message__round" ng-click="vm.setSeen(); $event.stopPropagation();"><div class="round round--border" ng-class="{\'round--yellow\': !vm.message.seen}"></div></div></div><div class="inbox-message__center"><div class="inbox-message__head"><div class="inbox-message__importance" ng-if="vm.message.important"><span class="important-tags important-tags--active"></span></div><div class="inbox-message__name">{{ vm.message.from }}</div><div class="inbox-message__data"><to-date date="vm.message.date.date" is-small="true"></to-date></div></div><div class="inbox-message__text"><div class="inbox-message__subject">{{ vm.message.Subject }}</div><div class="inbox-message__message"><div class="text-overflow" ng-bind-html="vm.message.body"></div></div></div><div class="inbox-message__labels"><div class="inbox-message__label letter-tags" ng-repeat="tag in vm.message.tags track by $index" style="background: {{ tag.bgcolor }}"><span class="letter-tags__name">{{ tag.tag_name }}</span><!--<span class="letter-tags__icon icon-label-message font&#45;&#45;size21" style="color: {{ tag.bgcolor }}"></span>--> <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 40 36" id="ico_label-message" class="letter-tags__icon"><!--<use xlink:href="#ico_label-message" style="fill: {{ tag.bgcolor }}"></use>--><g><path class="" style="fill: {{ tag.bgcolor }}" d="M29.7532378,33.5724399 C28.7839322,34.9145554 26.6584255,36 25.0035095,36 L2.99649048,36 C1.3504982,36 0,34.6535323 0,32.9925801 L0,3.00741988 C0,1.34553934 1.34157448,0 2.99649048,0 L25.0035095,0 C26.6495018,0 28.7849513,1.08685567 29.7532378,2.42756009 L39.2467622,15.5724399 C40.2160678,16.9145554 40.2150487,19.0868557 39.2467622,20.4275601 L29.7532378,33.5724399 L29.7532378,33.5724399 Z M26,14 C28.209139,14 30,15.790861 30,18 C30,20.209139 28.209139,22 26,22 C23.790861,22 22,20.209139 22,18 C22,15.790861 23.790861,14 26,14 L26,14 Z"></path></g></svg></div></div></div><div class="inbox-message__right"><button class="inbox-message__right-btn btn btn--size_m btn--size_28 icon-more btn--not-style btn--not-events" type="button" ng-click="vm.openMessageMenu(); $event.stopPropagation();"></button></div></div>');
$templateCache.put('app/components/message-menu/message-menu.html','<div class="popup__head"><span class="popup__head__title">\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F \u0441 \u043F\u0438\u0441\u044C\u043C\u043E\u043C</span> <button class="icon-cancel btn btn--not-style btn--main-mobile-color btn--size_s" type="button" ng-click="vm.close()"></button><hr class="hr hr--popup"></div><div class="popup__content scrollables"><div class="popup__item" ng-click="vm.goToAnswer()"><span class="icon-reply popup__icon"></span> <span class="popup__item__title">\u041E\u0442\u0432\u0435\u0442\u0438\u0442\u044C</span></div><!--<div class="popup__item" ng-click="vm.goToFwd()">--><!--<span class="icon-reply-all popup__icon"></span>--><!--<span class="popup__item__title">\u041E\u0442\u0432\u0435\u0442\u0438\u0442\u044C \u0432\u0441\u0435\u043C</span>--><!--</div>--><div class="popup__item" ng-click="vm.goToFwd()"><span class="icon-forward popup__icon"></span> <span class="popup__item__title">\u041F\u0435\u0440\u0435\u0441\u043B\u0430\u0442\u044C</span></div><div class="popup__item" ng-if="vm.$state.params.mbox !== \'Trash\'" ng-click="vm.move({name: \'Trash\', caption: \'\u041A\u043E\u0440\u0437\u0438\u043D\u0430\'})"><span class="icon-delete popup__icon color--light-red"></span> <span class="popup__item__title">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</span></div><div class="popup__item" ng-if="vm.$state.params.mbox === \'Trash\'" ng-click="vm.destroy({name: \'Trash\'})"><span class="icon-delete popup__icon color--light-red"></span> <span class="popup__item__title">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</span></div><div class="popup__item" ng-click="vm.triggerSeen()"><span class="icon-unread popup__icon"></span> <span class="popup__item__title" ng-if="!vm.message.seen">\u041F\u0440\u043E\u0447\u0438\u0442\u0430\u043D\u043E</span> <span class="popup__item__title" ng-if="vm.message.seen">\u041D\u0435 \u043F\u0440\u043E\u0447\u0438\u0442\u0430\u043D\u043E</span></div><div class="popup__item" ng-click="vm.openLayoutFolder()"><span class="icon-folder popup__icon"></span> <span class="popup__item__title">\u0412 \u043F\u0430\u043F\u043A\u0443</span></div><div class="popup__item" ng-click="vm.openTagListPopup()"><span class="icon-tag popup__icon"></span> <span class="popup__item__title">\u041C\u0435\u0442\u043A\u0438</span></div><div class="popup__item" ng-click="vm.move({name: \'Archive\', caption: \'\u0410\u0440\u0445\u0438\u0432\'})"><span class="icon-archive popup__icon"></span> <span class="popup__item__title">\u0412 \u0430\u0440\u0445\u0438\u0432</span></div><div class="popup__item" ng-if="vm.$state.params.mbox === \'Junk\'" ng-click="vm.move({name: \'INBOX\', caption: \'\u0412\u0445\u043E\u0434\u044F\u0449\u0438\u0435\'})"><span class="icon-spam popup__icon color--yellow"></span> <span class="popup__item__title">\u041D\u0435 \u0441\u043F\u0430\u043C</span></div><div class="popup__item" ng-if="vm.$state.params.mbox !== \'Junk\'" ng-click="vm.move({name: \'Junk\', caption: \'\u0421\u043F\u0430\u043C\'})"><span class="icon-spam popup__icon color--yellow"></span> <span class="popup__item__title">\u0421\u043F\u0430\u043C</span></div><!--    <div class="popup__item">\n            <span class="icon-pin popup__icon"></span>\n            <span class="popup__item__title">\u0417\u0430\u043A\u0440\u0435\u043F\u0438\u0442\u044C</span>\n        </div>--><div class="popup__item" ng-click="vm.setImportant()"><span class="icon-important-solid popup__icon color--semi-dark-red"></span> <span class="popup__item__title" ng-if="!vm.message.important">\u0412\u0430\u0436\u043D\u043E\u0435</span> <span class="popup__item__title" ng-if="vm.message.important">\u041D\u0435 \u0432\u0430\u0436\u043D\u043E\u0435</span></div></div>');
$templateCache.put('app/components/inbox-header/inbox-header.html','<!--\n<div class="inbox-header">\n    <div class="inbox-header__row">\n        <div class="inbox-header__item">\n            <a class="inbox-header__link" ui-sref="mail.compose">\n                <span class="icon-write inbox-header__icon inbox-header__icon--blue"></span>\n                <span class="inbox-header__name">\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C</span>\n            </a>\n        </div>\n        <div class="inbox-header__item">\n            <a class="inbox-header__link" href>\n                <span class="icon-redo inbox-header__icon inbox-header__icon--green"></span>\n                <span class="inbox-header__name">\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C</span>\n            </a>\n        </div>\n        <div class="inbox-header__item">\n            <a class="inbox-header__link" href>\n                <span class="icon-forward inbox-header__icon inbox-header__icon--blue"></span>\n                <span class="inbox-header__name">\u041F\u0435\u0440\u0435\u0441\u043B\u0430\u0442\u044C</span>\n            </a>\n        </div>\n        <div class="inbox-header__item">\n            <a class="inbox-header__link" href>\n                <span class="icon-bin inbox-header__icon inbox-header__icon--red"></span>\n                <span class="inbox-header__name">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</span>\n            </a>\n        </div>\n        <div class="inbox-header__item">\n            <a class="inbox-header__link" href>\n                <span class="icon-spam inbox-header__icon inbox-header__icon--yellow"></span>\n                <span class="inbox-header__name">\u0421\u043F\u0430\u043C</span>\n            </a>\n        </div>\n        <div class="inbox-header__item">\n            <a class="inbox-header__link" href>\n                <span class="icon-unread inbox-header__icon inbox-header__icon--blue"></span>\n                <span class="inbox-header__name">\u041D\u0435 \u043F\u0440\u043E\u0447\u0438\u0442\u0430\u043D\u043E</span>\n            </a>\n        </div>\n        <div class="inbox-header__item">\n            <a class="inbox-header__link" href\n               uib-popover-template="\'app/components/tag-list/tag-list-popover.html\'"\n               popover-class="popover--tag-list"\n               popover-placement="bottom"\n               popover-animation="true"\n               popover-trigger="\'outsideClick\'">\n                <span class="icon-tag inbox-header__icon inbox-header__icon--blue"></span>\n                <div class="inbox-header__name">\n                    \u0422\u044D\u0433\n                    <span class="icon-arrow-down inbox-header__name-icon"></span>\n                </div>\n            </a>\n        </div>\n        <div class="inbox-header__item">\n            <a class="inbox-header__link" href\n               uib-popover-template="\'app/components/folder-list/folder-list-popover.html\'"\n               popover-class="popover--folder-list"\n               popover-placement="bottom"\n               popover-animation="true"\n               popover-trigger="\'outsideClick\'">\n                <span class="icon-folder inbox-header__icon inbox-header__icon--blue"></span>\n                <div class="inbox-header__name">\n                    \u0412 \u043F\u0430\u043F\u043A\u0443\n                    <span class="icon-arrow-down inbox-header__name-icon"></span>\n                </div>\n            </a>\n        </div>\n        <div class="inbox-header__item">\n            <a class="inbox-header__link" href>\n                <span class="icon-archive inbox-header__icon inbox-header__icon--blue"></span>\n                <span class="inbox-header__name">\u0410\u0440\u0445\u0438\u0432\u0438\u0440\u043E\u0432\u0430\u0442\u044C</span>\n            </a>\n        </div>\n        <div class="inbox-header__item">\n            <a class="inbox-header__link" href>\n                <span class="icon-pin inbox-header__icon inbox-header__icon--blue"></span>\n                <span class="inbox-header__name">\u0417\u0430\u043A\u0440\u0435\u043F\u0438\u0442\u044C</span>\n            </a>\n        </div>\n        <div class="inbox-header__item">\n            <a class="inbox-header__link" href>\n                <span class="icon-more inbox-header__icon inbox-header__icon--blue"></span>\n                <span class="inbox-header__name">\u0415\u0449\u0435</span>\n            </a>\n        </div>\n    </div>\n</div>\n-->');
$templateCache.put('app/components/search-mail/search-mail.html','<div><div class="search-result__header"><div class="radiobutton main-switch radiobutton--size_sm width--all"><input class="main-switch__input" type="radio" name="folder" ng-change="vm.search()" ng-value="\'ALL\'" ng-model="vm.folders.selected.name"> <span class="radiobutton--size_sm main-switch__btn main-switch__btn--firs width--inh font--size15">\u0412\u0441\u044F \u043F\u043E\u0447\u0442\u0430</span> <input class="main-switch__input" type="radio" name="folder" ng-change="vm.search()" ng-value="\'INBOX\'" ng-model="vm.folders.selected.name"> <span class="radiobutton--size_sm main-switch__btn main-switch__btn--last width--inh font--size15">\u0412\u0445\u043E\u0434\u044F\u0449\u0438\u0435</span></div><button class="search-result__button-filter btn btn--not-style btn--size_sm btn--main-mobile-color font--size18 padding--right" type="button" ng-click="vm.isOpenFilters = !vm.isOpenFilters"><span class="icon-equalize"></span></button><hr class="hr hr--header hr--size-h1"></div><div class="search-filters" ng-if="vm.isOpenFilters"><div class="search-filters__item"><ui-select ng-model="vm.searchParts.selected" search-enabled="false" class="select-list select-list--size_m select-list--not-border-of-sides width--all" theme="select2" on-select="vm.search(); vm.isOpenFilters = false"><ui-select-match class="select-list__body select-list--size_m width--inh padding--right30 padding--left_12">{{ $select.selected.name }}</ui-select-match><ui-select-choices repeat="item in vm.searchParts.list track by $index"><div ng-bind-html="item.name"></div></ui-select-choices></ui-select></div><div class="search-filters__item"><ui-select ng-model="vm.folders.selected" class="select-list select-list--size_m select-list--not-border-of-sides width--all" search-enabled="false" theme="select2" on-select="vm.search(); vm.isOpenFilters = false"><ui-select-match class="select-list__body select-list--size_m width--inh padding--right30 padding--left_12">{{ $select.selected.caption }}</ui-select-match><ui-select-choices repeat="item in vm.folders.items track by $index"><div ng-class="{\'mrg__left10\': item.isSub}" ng-bind-html="item.caption"></div></ui-select-choices></ui-select></div><div class="search-filters__item"><ui-select ng-model="vm.tags.selected" search-enabled="false" class="select-list select-list--size_m select-list--not-border-of-sides width--all" theme="select2" on-select="vm.search(); vm.isOpenFilters = false"><ui-select-match class="select-list__body select-list--size_m width--inh padding--right30 padding--left_12">{{ $select.selected.tag_name }}</ui-select-match><ui-select-choices repeat="item in vm.tags.items track by $index">{{ item.tag_name }}</ui-select-choices></ui-select></div><div class="search-filters__item"><label class="checkbox-big__label checkbox-big checkbox-big--size15" for="isAttach"><input class="checkbox-big__input" id="isAttach" type="checkbox" name="isAttach" ng-model="vm.searchForm.isAttach" ng-change="vm.search(); vm.isOpenFilters = false" value="important"><div class="checkbox-big__body"></div><span class="checkbox-big__text" role="presentation">\u0421 \u0432\u043B\u043E\u0436\u0435\u043D\u0438\u044F\u043C\u0438</span></label></div><div class="search-filters__item"><date-sort from="vm.from" to="vm.to" class="search-filters__date-sort"></date-sort></div></div></div>');
$templateCache.put('app/components/settings-menu/settings-menu.html','<div class="settings-menu"><div class="settings-menu__body"><a class="settings-menu__title" ui-sref="settings.main">\u0412\u0441\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438</a><div class="settings-menu__row"><div class="row row--size15 mrg__top20"><div class="col-xs-6"><span class="icon-folder-star color--yellow font--size18"></span> <a class="settings-menu__link" href="">\u041F\u0430\u043F\u043A\u0438</a></div><div class="col-xs-6"><span class="icon-rules color--green font--size18"></span> <a class="settings-menu__link" href="">\u041F\u0440\u0430\u0432\u0438\u043B\u0430 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438</a></div></div><div class="row row--size15 mrg__top20"><div class="col-xs-6"><span class="icon-tag-star color--green font--size18"></span> <a class="settings-menu__link" href="">\u041F\u0440\u0430\u0432\u0438\u043B\u0430 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438</a></div><div class="col-xs-6"><span class="icon-contacts color--green font--size18"></span> <a class="settings-menu__link" href="">\u041F\u0440\u0430\u0432\u0438\u043B\u0430 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438</a></div></div></div></div></div>');
$templateCache.put('app/components/spinner/spinner.html','<div class="spinner" ng-show="vm.isOpen"></div>');
$templateCache.put('app/components/tag-create/tag-create-popup.html','<div><div class="popup__close" ng-click="cancel()">\xD7</div><tag-create></tag-create></div>');
$templateCache.put('app/components/tag-create/tag-create.html','<div class="tag-create"><div class="tag-create__title">\u0421\u043E\u0437\u0434\u0430\u0435\u043C \u0442\u044D\u0433</div><div class="mrg__top15"><form novalidate><div class="tag-create__input mrg__top15"><div class="mrg__right10"><span class="font--size13">\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435</span></div><div><input class="input input--size_s width--inh input--fc-sh-yellow" type="text" required></div></div><div class="palette-list tag-create__palette mrg__top30"><div class="palette-list__item" style="background-color: {{ palette.color }}" ng-repeat="palette in vm.palette.items track by $index"><span class="palette-list__icon icon-mark" ng-if="palette.active"></span></div></div><div class="tag-create__btn mrg__top40"><button class="btn-y btn-y--border" type="submit">\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0442\u044D\u0433</button> <button class="btn-y btn-y--border">\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C</button></div></form></div></div>');
$templateCache.put('app/components/tag-list/tag-list.html','<div class="popup__head"><span class="popup__head__title">\u041C\u0435\u0442\u043A\u0438</span> <button class="icon-cancel btn btn--not-style btn--main-mobile-color btn--size_s" type="button" ng-click="vm.close()"></button><hr class="hr hr--popup"></div><div class="popup__content scrollables"><label class="tag-list__item"><div class="letter-tags"><span class="icon-important popup__icon popup__icon--not-size color--semi-dark-red"></span></div><span class="tag-list__title tag-list__title--mrg-left" ng-if="vm.isImportant">\u0412\u0430\u0436\u043D\u043E\u0435</span> <span class="tag-list__title tag-list__title--mrg-left" ng-if="!vm.isImportant">\u041D\u0435 \u0432\u0430\u0436\u043D\u043E\u0435</span> <input class="tag-list__checked" type="checkbox" ng-model="vm.isImportant" ng-change="vm.setImportant()"> <span class="tag-list__tick is-selected"></span></label><label class="tag-list__item" ng-repeat="tag in vm.tags.items"><div class="letter-tags" style="color: {{ tag.bgcolor }}"><span class="letter-tags__icon icon-label-message font--size21"></span><!--<svg class="">--><!--<use xlink:href="#ico_label-message"></use>--><!--</svg>--></div><span class="tag-list__title tag-list__title--mrg-left">{{ tag.tag_name }} </span><input class="tag-list__checked" type="checkbox" ng-change="vm.triggerTag(tag, checked)" data-checklist-model="vm.unTags.items" data-checklist-value="tag"> <span class="tag-list__tick is-selected"></span></label></div><div class="popup__footer"><button class="btn btn--yellow btn--no-radius width--all height--min-inh font--size20" ng-click="vm.close()">\u0413\u043E\u0442\u043E\u0432\u043E</button></div>');
$templateCache.put('app/components/time-send/time-send-popover.html','<time-send></time-send>');
$templateCache.put('app/components/time-send/time-send.html','<div class="time-send" ng-class="{\'time-send--info-open\': vm.isInfoOpen}"><div class="time-send__close pointer" ng-click="vm.close()"><img class="img-responsive" src="/images/cancel.svg"></div><div class="time-send__content"><div class="time-send__info font--size13" ng-if="vm.isInfoOpen">\u0412\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u0443\u043A\u0430\u0437\u0430\u0442\u044C \u0434\u0430\u0442\u0443 \u0438 \u0432\u0440\u0435\u043C\u044F, \u043A\u043E\u0433\u0434\u0430 \u043F\u0438\u0441\u044C\u043C\u043E \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E. \u041E\u0442\u043F\u0440\u0430\u0432\u043A\u0443 \u043F\u0438\u0441\u044C\u043C\u0430 \u043C\u043E\u0436\u043D\u043E \u043E\u0442\u043B\u043E\u0436\u0438\u0442\u044C \u043D\u0435 \u0431\u043E\u043B\u0435\u0435 \u0447\u0435\u043C \u043D\u0430 \u043E\u0434\u0438\u043D \u0433\u043E\u0434 \u0441 \u0442\u0435\u043A\u0443\u0449\u0435\u0439 \u0434\u0430\u0442\u044B.</div><div class="time-send__planing mrg__top10"><div class="time-send__planing-item"><div class="checkbox-y checkbox-y--size15"><label class="checkbox-y__label" for="isChecked"><input class="checkbox-y__input" id="isChecked" type="checkbox" name="isChecked" ng-model="isChecked"><div class="checkbox-y__body"><span class="checkbox-y__icon icon-mark"></span></div></label></div></div><div class="time-send__planing-item font--size15"><div uib-datepicker-popup="\'dd-MMMM-yyyy\'" ng-model="vm.dateModel" is-open="vm.isDateOpen" datepicker-options="vm.dateOptions"></div>\u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C <a href ng-click="vm.isDateOpen = !vm.isDateOpen">\u0441\u0435\u0433\u043E\u0434\u043D\u044F</a> \u0432</div><div class="time-send__planing-item"><button class="btn-y btn-y--border">15:00 <span class="btn-y__icon btn-y__icon--arrow icon-arrow-down"></span></button></div><div class="time-send__planing-item"><a class="link link--gray font--size18" href ng-click="vm.isInfoOpen = !vm.isInfoOpen"><span class="icon-info"></span></a></div></div></div></div>');
$templateCache.put('app/components/to-date/to-date.html','<span>{{ vm.convertDate }}</span>');
$templateCache.put('app/components/user-menu/user-menu-popover.html','<user-menu></user-menu>');
$templateCache.put('app/components/user-menu/user-menu.html','<div class="user-menu"><div class="user-menu__body user-menu__body--bg-gray"><div class="user-menu__item"><a class="user-menu__link user-menu__link--red" href=""><div class="avatar avatar--size28"><img class="avatar__image" src="/images/avatar.png"></div><div class="user-menu__title">lovealldevelop@gmail.com</div></a></div><div class="user-menu__item"><a class="user-menu__link" href=""><svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" viewBox="0 0 28 28" class="dropdown-user-add-svg"><path d="M13.28,8 L14.72,8 L14.72,13.28 L20,13.28 L20,14.72 L14.72,14.72 L14.72,20 L13.28,20 L13.28,14.72 L8,14.72 L8,13.28 L13.28,13.28 L13.28,8 Z" id="+" fill-opacity="0.5"></path><path d="M28,14 C28,6.2680135 21.7319865,0 14,0 C6.2680135,0 0,6.2680135 0,14 C0,21.7319865 6.2680135,28 14,28 C21.7319865,28 28,21.7319865 28,14 Z M1,14 C1,6.82029825 6.82029825,1 14,1 C21.1797017,1 27,6.82029825 27,14 C27,21.1797017 21.1797017,27 14,27 C6.82029825,27 1,21.1797017 1,14 Z" id="Oval" fill-opacity="0.15"></path></svg><div class="user-menu__title">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F</div></a></div></div><div class="user-menu__body user-menu__body--no-mrg"><div class="user-menu__item"><a class="user-menu__link user-menu__link--hover-gray" href=""><div class="user-menu__title">\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0430\u043A\u0430\u0443\u043D\u0442\u043E\u043C</div></a></div><div class="user-menu__item"><a class="user-menu__link user-menu__link--hover-gray" href=""><div class="user-menu__title">\u041F\u043E\u043C\u043E\u0449\u044C</div></a></div><div class="user-menu__item"><a class="user-menu__link user-menu__link--hover-gray" href=""><div class="user-menu__title">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u044F\u0449\u0438\u043A</div></a></div><div class="user-menu__item"><a class="user-menu__link user-menu__link--hover-gray" href ng-click="vm.logout()"><div class="user-menu__title">\u0412\u044B\u0445\u043E\u0434</div></a></div></div></div>');
$templateCache.put('app/components/validation-errors/validation-errors.html','<div class="validation"><div ng-messages="vm.data.$error" ng-if="vm.data.$invalid"><div class="validation__message validation__message--red" ng-message="{{ key }}" ng-repeat="(key, value) in vm.messages">{{ value }}</div></div><div class="validation__message validation__message--red" ng-repeat="error in vm.server" ng-if="error.field == vm.data.$name">{{ error.message }}</div></div>');
$templateCache.put('app/directives/message-textarea/message-textarea.html','<div></div>');
$templateCache.put('app/layout/footer/footer.html','<div class="footer"><div class="footer__row"><div class="footer-left"><div class="footer__date-info">\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0439 \u0432\u0445\u043E\u0434 31 \u043C\u0430\u0440\u0442\u0430 2017 \u0433\u043E\u0434\u0430 \u0432 17:30</div></div><div class="footer-right">\u041F\u043E\u043C\u043E\u0449\u044C \xA9 2017, Mail.cz</div></div></div>');
$templateCache.put('app/layout/header/header.html','<div class="header"><!--\n        \u0443 \u043D\u0430\u0441 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0441\u044F \u0440\u0430\u0437\u043D\u044B\u0439 \u0445\u0435\u0434\u0435\u0440 \u0434\u043B\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446\n        \u0434\u043B\u044F \u0430\u043A\u0442\u0438\u0432\u0430\u0446\u0438\u0438 \u043D\u0443\u0436\u043D\u043E\u0445\u043E \u0445\u0435\u0434\u0435\u0440\u0430 \u043F\u0440\u043E\u0441\u0442\u043E  \u043D\u0443\u0436\u043D\u043E \u0434\u043E\u0431\u0430\u0432\u043B\u044F\u0442\u044C \u043A\u043B\u0430\u0441\u0441 is-active\n        \u043F\u0440\u0438 \u0443\u0441\u043B\u043E\u0432\u0438\u0438 \u043E\u0442\u043A\u0440\u0438\u0442\u0438\u044F \u043D\u0443\u0436\u043D\u043E\u0439 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0438\n    --><!-- \u0425\u0435\u0434\u0435\u0440 \u0434\u043B\u044F \u0433\u043B\u0430\u0432\u043D\u043E\u0439 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0438 --><div class="header__main is-active" ng-if="!vm.isSearch && vm.$state.current.name === \'mail.inbox\'"><div class="header__container"><div class="header__left"><button class="icon-menu btn btn--not-style btn--main-mobile-color header__icon padding--left" ng-click="vm.openMenu()"></button></div><div class="header__center"><span class="header__title-text">{{ vm.currentFolder.caption }}</span> <span class="header__count-letters">{{ vm.currentFolder.messagesCount || \'\' }}</span></div><div class="header__right"><button class="search-block__icon icon-lens btn btn--not-style btn--main-mobile-color header__icon mrg__right padding--right" type="button" set-focus="search-input" ng-click="vm.isSearch = true;"></button></div><hr class="hr hr--header hr--yellow"></div></div><!-- \u0425\u0435\u0434\u0435\u0440 \u0434\u043B\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0438 \u043F\u043E\u0438\u0441\u043A\u0430--><div class="header__search is-active" ng-if="vm.isSearch && vm.$state.current.name === \'mail.inbox\'"><div class="header__container"><div class="header__right width--inh"><form class="search-block widtn-inh search-block" ng-submit="vm.search()"><button class="search-block__icon icon-lens btn btn--not-style btn--main-mobile-color header__icon padding mrg__right" type="submit"></button> <input class="input input--no-border input--no-focus input--size_l width--all" id="search-input" type="text" placeholder="\u041F\u043E\u0438\u0441\u043A \u043F\u0438\u0441\u0435\u043C" ng-model="vm.searchForm.model.search"></form></div><div class="header__left"><button class="icon-cancel btn btn--not-style btn--size_xl btn--main-mobile-color padding" type="button" ng-click="vm.isSearch = false; vm.clearSearch();"></button></div></div></div><!-- \u0425\u0435\u0434\u0435\u0440 \u0434\u043B\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0438 \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0430 \u043F\u0438\u0441\u044C\u043C\u0430--><div class="header__massege-replay is-active" ng-if="vm.$state.current.name === \'mail.message\'"><div class="header__container"><div class="header__left"><button class="icon-arrow-left btn btn--not-style btn--main-mobile-color header__icon flex--inline align-items--cn padding--left" type="button" ui-sref="mail.inbox({mbox: vm.$state.params.mbox})"><span class="font--arial font--size15 mrg__left5">\u041D\u0430\u0437\u0430\u0434</span></button></div><div class="header__right"><button class="icon-arrow-up btn btn--not-style btn--main-mobile-color header__icon mrg__right padding--right_2" type="button" ng-if="vm.paginate.prev" ui-sref="mail.message({id: vm.paginate.prev.number, connection_id: vm.paginate.prev.connection_id, mbox: vm.paginate.prev.mbox})"></button> <button class="icon-arrow-down btn btn--not-style btn--main-mobile-color header__icon mrg__right padding--right" type="button" ng-if="vm.paginate.next" ui-sref="mail.message({id: vm.paginate.next.number, connection_id: vm.paginate.next.connection_id, mbox: vm.paginate.next.mbox})"></button></div><hr class="hr hr--header hr--yellow"></div></div><!-- \u0425\u0435\u0434\u0435\u0440 \u0434\u043B\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0438 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u043F\u0438\u0441\u044C\u043C\u0430--><!-- \u0425\u0435\u0434\u0435\u0440 \u0434\u043B\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0438 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u043F\u0438\u0441\u044C\u043C\u0430--><div class="header__message-new is-active" ng-if="vm.$state.current.name === \'mail.compose\'"><div class="header__container"><div class="header__left"><button class="icon-cancel btn btn--not-style btn--main-mobile-color header__icon header__icon--close padding--hor12" ui-sref="mail.inbox({mbox: \'INBOX\'})"></button></div><div class="header__center"><span class="header__title-text font--size18 font--bold">\u041D\u043E\u0432\u043E\u0435 \u043F\u0438\u0441\u044C\u043C\u043E</span></div><div class="header__right"><button class="btn btn--not-style btn--mail-send header__icon mrg__right font--arial font--size15 padding--hor12 icon-send" type="button" ng-click="vm.send()" ng-disabled="!vm.isSend"></button></div><!--<hr class="hr hr&#45;&#45;header hr&#45;&#45;yellow">--></div></div><!--<div class="header__message-new is-active" ng-if="vm.$state.current.name === \'mail.compose\'">--><!--<div class="header__container">--><!--<div class="header__left">--><!--<button class="icon-cancel btn btn&#45;&#45;not-style btn&#45;&#45;main-mobile-color header__icon header__icon&#45;&#45;close padding&#45;&#45;hor12"--><!--ui-sref="mail.inbox({mbox: \'INBOX\'})">--><!--</button>--><!--</div>--><!--<div class="header__right">--><!--<button class="btn btn&#45;&#45;mail-send btn&#45;&#45;size_s header__icon mrg__right14 font&#45;&#45;arial font&#45;&#45;size15 padding&#45;&#45;hor12 width&#45;&#45;inh"--><!--type="button"--><!--ng-click="vm.send()"--><!--ng-disabledd="!vm.isSend">--><!--\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C--><!--</button>--><!--</div>--><!--&lt;!&ndash;<hr class="hr hr&#45;&#45;header hr&#45;&#45;yellow">&ndash;&gt;--><!--</div>--><!--</div>--><!-- \u0423\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F \u0438 \u0441\u0442\u0430\u0442\u0443\u0441\u044B--><div class="pop-up-notification pop-up-notification--vg-style" ng-class="{\'is-show\': vm.notify.isOpen}"><div class="pop-up-notification__container"><span class="pop-up-notification__validate-icon"></span> <span class="pop-up-notification__notific" ng-bind-html="vm.notify.message">\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u0431\u044B\u043B\u043E \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043D\u043E.<!--<a class="pop-up-notification__link"> \u0421\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u043F\u043E\u0447\u0442\u0443</a>--> </span><button class="pop-up-notification__close btn--not-style icon-remove-thick btn--main-mobile-color" type="button"></button></div><hr class="hr hr--header hr--size-h1"></div></div><!-- \u0425\u0435\u0434\u0435\u0440 \u0434\u043B\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0438 \u043F\u043E\u0438\u0441\u043A\u0430--><!--\n<div class="header__search is-active" ng-if="vm.isSearch && vm.$state.current.name === \'mail.inbox\'">\n    <div class="header__container">\n        <div class="header__left">\n            <button class="icon-arrow-left btn btn--not-style btn--main-mobile-color header__icon padding--left"\n                    type="button"\n                    ng-click="vm.isSearch = false; vm.clearSearch();"></button>\n        </div>\n        <div class="header__right width--inh">\n            <form class="search-block widtn-inh search-block" ng-submit="vm.search()">\n                <input class="input input--no-border input--no-focus input--size_l width--all"\n                       type="text"\n                       placeholder="\u041F\u043E\u0438\u0441\u043A \u043F\u0438\u0441\u0435\u043C"\n                       ng-model="vm.searchForm.model.search">\n                <button class="search-block__icon-close icon-cancel btn btn--not-style btn--main-mobile-color btn--size_s mrg__right"\n                        type="button"\n                        ng-click="vm.clearSearch()"></button>\n                <button class="search-block__icon icon-lens btn btn--not-style btn--main-mobile-color header__icon mrg__right"\n                        type="submit"></button>\n            </form>\n        </div>\n        <!--<hr class="hr hr&#45;&#45;header hr&#45;&#45;yellow">--><!--\n    </div>\n</div>\n-->');
$templateCache.put('app/layout/menu-settings/menu-settings.html','<div class="menu-settings-layout"><div class="menu-settings"><div class="menu-settings__list"><div class="menu-settings__item"><a class="menu-settings__link" ui-sref="settings.main" ui-sref-active="menu-settings__link--active">\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u043E\u043C</a></div><div class="menu-settings__item"><a class="menu-settings__link" href="">\u041F\u0430\u043F\u043A\u0438</a></div><div class="menu-settings__item"><a class="menu-settings__link" ui-sref="settings.tags" ui-sref-active="menu-settings__link--active">\u0422\u044D\u0433\u0438</a></div><div class="menu-settings__item"><a class="menu-settings__link" href="">\u0421\u043F\u0430\u043C</a></div><div class="menu-settings__item"><a class="menu-settings__link" href="">\u0427\u0435\u0440\u043D\u043E\u0432\u0438\u043A\u0438</a></div></div></div><hr class="hr hr--dashed menu-settings-layout__hr"><div class="menu-settings"><div class="menu-settings__list"><div class="menu-settings__item"><a class="menu-settings__link" href="">\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u043E\u0432</a></div></div></div><hr class="hr hr--dashed menu-settings-layout__hr"><div class="menu-settings"><div class="menu-settings__list"><div class="menu-settings__item"><a class="menu-settings__link" href="">\u042F\u0437\u044B\u043A: \u0420\u0443\u0441\u0441\u043A\u0438\u0439</a></div><div class="menu-settings__item mrg__top20"><a class="menu-settings__link" href="">\u0427\u0430\u0441\u044B: (GMT+02:00) \u041A\u0438\u0435\u0432</a></div></div></div><div class="menu-settings-layout__padding"><button class="btn-y btn-y--size26 btn-y--border pointer mrg__top20" type="button">\u041F\u043E\u043C\u0435\u043D\u044F\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C</button><p class="menu-settings-layout__pass-info">\u0420\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0443\u0435\u043C \u0432\u0430\u043C \u0432 \u0446\u0435\u043B\u044F\u0445 \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438 \u043C\u0435\u043D\u044F\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C \u043A\u0430\u0436\u0434\u044B\u0435 6 \u043C\u0435\u0441\u044F\u0446\u0435\u0432, \u0430 \u0442\u0430\u043A\u0436\u0435 \u0443\u043A\u0430\u0437\u0430\u0442\u044C \u0434\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u043E \u0441\u0435\u0431\u0435 \u2014 \u044D\u0442\u043E \u043F\u043E\u043C\u043E\u0436\u0435\u0442 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C, \u0435\u0441\u043B\u0438 \u0432\u044B \u0435\u0433\u043E \u0437\u0430\u0431\u0443\u0434\u0435\u0442\u0435.</p></div></div>');
$templateCache.put('app/layout/menu-main/menu-main.html','<div class="menu-main-layout scrollables"><!-- \u0445\u0435\u0434\u0435\u0440 \u043C\u0435\u043D\u044E--><div class="menu-main-layout__header"><img class="menu-main-layout__header__logo img-responsive" src="/images/logo.png"> <button class="menu-main-layout__button-close btn" type="button" ng-click="vm.closeMenu()"><span class="icon-double-arrow-left"></span></button></div><div class="menu-main-layout__user-info"><div class="menu-main-layout__user-info-container" scroll-left><div class="menu-main-layout__users-list"><div class="menu-main-layout__user-item" ng-repeat="profile in vm.profiles" ng-if="profile.profile.email !== vm.user.profile.email"><button class="menu-main-layout__avatar" ng-click="vm.setAuthProfile(profile)"><div class="avatar avatar--size53 avatar--second-style"><img class="avatar__image" media-url="profile.profile.photo" fallback-src="{{\'/images/avatar-personal.svg\'}}"></div></button></div><div class="menu-main-layout__user-item menu-main-layout__user-item--active"><div class="menu-main-layout__avatar"><div class="avatar avatar--size53 avatar--second-style"><img class="avatar__image" media-url="vm.user.profile.photo" fallback-src="{{\'/images/avatar-personal.svg\'}}"></div><button class="menu-main-layout__add-btn icon-cancel btn--circle btn--size_40 rotate--am90" type="button" ui-sref="signIn()"></button></div><span class="menu-main-layout__user-name mrg__top10">{{ vm.user.profile.username }}</span> <span class="menu-main-layout__user-mail">{{ vm.user.profile.email }}</span></div></div></div></div><!--\u043E\u0441\u043D\u043E\u0432\u043D\u043E\u0435 \u043C\u0435\u043D\u044E --><div class="menu-main-layout__item"><ul class="menu-main"><li class="menu-main__item is-sub-menu" ng-class="{\'is-sub-menu--open\': folder.isOpen}" ng-repeat="folder in vm.folders.items"><div class="menu-main__item-content" ng-if="!folder.isSub"><a class="menu-main__link" ng-click="vm.closeMenu();" ui-sref="mail.inbox({mbox: folder.name, filter: undefined})"><span class="{{ folder.icon }} menu-main__icon"></span> <span class="menu-main__title">{{ folder.caption }}</span></a><div class="menu-main__additional-option"><button class="menu-main__clear-brush icon-brush btn--not-style font--size12" type="button" ng-class="{\'menu-main__link--gray\': !folder.messagesCount,\n                                    \'menu-main__clear-brush--active\': (folder.name === \'Junk\' || folder.name === \'Trash\') && folder.messagesCount\n                                }" ng-click="vm.clearFolder($event, folder);"></button> <span class="menu-main__count" ng-if="folder.messagesCount">{{ folder.messagesCount || \'\' }}</span> <button class="menu-main__show-additional icon-arrow-down btn--not-style" type="button" ng-if="folder.name === \'INBOX\'" ng-click="folder.isOpen = !folder.isOpen"></button></div></div><div ng-if="folder.isOpen"><div class="menu-main__item-content" ng-repeat="folderSub in vm.folders.items" ng-if="folderSub.isSub"><ul class="menu-main menu-main--additional"><li class="menu-main__item-sub"><a class="menu-main__link" ng-click="vm.closeMenu();" ui-sref="mail.inbox({mbox: folderSub.name, filter: undefined})"><span class="icon-folder-desk menu-main__icon"></span> <span class="menu-main__title">{{ folderSub.caption }}</span></a><div class="menu-main__additional-option"><span class="menu-main__count">{{ folderSub.messagesCount || \'\' }}</span></div></li></ul></div></div></li></ul><hr class="hr hr--main-menu"><ul class="menu-main"><li class="menu-main__item"><div class="menu-main__item-content"><a class="menu-main__link" ui-sref="mail.inbox({mbox: undefined, filter: \'flagged\'})" ng-click="vm.closeMenu();"><span class="icon-important-desk menu-main__icon"></span> <span class="menu-main__title">\u0412\u0430\u0436\u043D\u044B\u0435</span></a><div class="menu-main__additional-option"></div></div></li><li class="menu-main__item"><div class="menu-main__item-content"><a class="menu-main__link" ui-sref="mail.inbox({mbox: undefined, filter: \'attaches\'})" ng-click="vm.closeMenu();"><span class="icon-attach-desk menu-main__icon"></span> <span class="menu-main__title">\u0421 \u0432\u043B\u043E\u0436\u0435\u043D\u0438\u044F\u043C\u0438</span></a></div></li><li class="menu-main__item"><div class="menu-main__item-content"><a class="menu-main__link" ui-sref="mail.inbox({mbox: undefined, filter: \'unseen\'})" ng-click="vm.closeMenu();"><span class="icon-unread-solid-desk menu-main__icon"></span> <span class="menu-main__title">\u041D\u0435\u043F\u0440\u043E\u0447\u0438\u0442\u0430\u043D\u043D\u044B\u0435</span></a></div></li></ul><!-- --><hr class="hr hr--main-menu"><!-- --><ul class="menu-main"><li class="menu-main__item" ng-repeat="tag in vm.tags.items"><div class="menu-main__item-content"><a class="menu-main__link" ui-sref="mail.inbox({mbox: undefined, filter: undefined, tag_id: tag.id})" ng-click="vm.closeMenu();"><span class="icon-tag-solid menu-main__icon menu-main__icon--select" style="color: {{ tag.bgcolor }}"></span> <span class="menu-main__title">{{ tag.tag_name }}</span></a></div></li><li class="menu-main__item"><div class="menu-main__item-content"><a class="menu-main__link" href><span class="icon-filter menu-main__icon"></span> <span class="menu-main__title">\u0424\u0438\u043B\u044C\u0442\u0440\u044B</span></a><div class="menu-main__additional-option"><div class="radio-button"><input type="checkbox" name="fiter" class="radio-button__checkbox" id="filter-switch" checked="checked"><label class="radio-button__label" for="filter-switch"><span class="radio-button__inner"></span> <span class="radio-button__switch"></span></label></div></div></div></li><li class="menu-main__item"><div class="menu-main__item-content"><a class="menu-main__link" href="http://mailcz.devogic.com/settings/main" target="_blank"><span class="icon-settings-desk menu-main__icon"></span> <span class="menu-main__title">\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438</span></a></div></li></ul></div><div class="menu-main-layout__footer-menu"><hr class="hr hr--main-menu"><div class="mrg__left10 mrg__top10 mrg__bottom5"><span class="link link--gray" ng-click="vm.goToDesktopVersion(\'http://m.mailcz.devogic.com?version=desktop\')">\u041F\u043E\u043B\u043D\u0430\u044F |</span> <span class="font--normal">\u041C\u043E\u0431\u0438\u043B\u044C\u043D\u0430\u044F v 1.0</span></div></div><div class="scrollables--y"></div></div>');
$templateCache.put('app/marketing/home/home.html','<h1>Welcome to <a ui-sref="mail.inbox({mbox: \'INBOX\'})">mail</a></h1>');
$templateCache.put('app/mail/compose/compose.html','<div class="compose"><form name="form"><div class="compose__container"><div class="compose__header"><div class="compose__from" ng-class="{\'is-show-features\': vm.isShowFeatures}"><div class="input-line flex align-items--cn"><ui-select ng-model="vm.sendForm.model.from_connection" class="select-input-line select-list select-list--size_l select-input-line--min-height select-list--no-border select-list--not-border-of-sides width-inh" theme="select2" search-enabled="false"><ui-select-match class="select-list__body select-list--size_l width--all" placeholder="\u041E\u0442 \u043A\u043E\u0433\u043E"><div ng-if="$select.selected.user_name">{{ $select.selected.user_name }} ({{ $select.selected.email }})</div><div ng-if="!$select.selected.user_name">{{ $select.selected.email }}</div></ui-select-match><ui-select-choices repeat="connection.id as connection in vm.connections.items" ng-value="$select.selected.id"><div ng-bind="connection.email"></div></ui-select-choices></ui-select></div><div class="input-line input-line--full input-line--right-padding" ng-class="{\'is-active\': vm.sendForm.model.to.length}"><label class="input-line__label width--all"><contact-to-add-select class="width--all" placeholder="\u041A\u043E\u043C\u0443" addresses="vm.sendForm.model.to"></contact-to-add-select><button class="input-line__btn-more btn btn--not-style btn--light-hover font__size16" type="button" ng-click="vm.isShowFeatures = !vm.isShowFeatures">\u041A\u043E\u043F\u0438\u044F</button></label></div><div class="compose__from--add-features" ng-if="vm.isShowFeatures"><div class="input-line input-line--full" ng-class="{\'is-active\': vm.sendForm.model.toCopy.length}"><div class="input-line__label width--all"><contact-to-add-select class="width--all" placeholder="\u041A\u043E\u043F\u0438\u044F" addresses="vm.sendForm.model.toCopy" is-autofocus="true"></contact-to-add-select></div></div><div class="input-line input-line--full" ng-class="{\'is-active\': vm.sendForm.model.toCopyHidden.length}"><div class="input-line__label width--all"><contact-to-add-select class="width--all" placeholder="\u0421\u043A\u0440\u044B\u0442\u0430\u044F \u043A\u043E\u043F\u0438\u044F" addresses="vm.sendForm.model.toCopyHidden"></contact-to-add-select></div></div></div><div class="compose__letter-subject"><div class="input-line input-line--full" ng-class="{\'is-active\': vm.sendForm.model.subject.length}"><label class="input-line__label width--all"><input class="input--compose-line input-line__input width--all" type="text" ng-model="vm.sendForm.model.subject" placeholder="\u0422\u0435\u043C\u0430"></label></div><button class="compose__btn-attach btn btn--not-style btn--light-hover icon-clip font--size16" type="button" type="file" multiple="multiple" accept="**/*" ngf-select="vm.upload($files, $invalidFiles)"></button></div></div><div class="compose__attachments-upload"><attach-upload attachments-data="vm.sendForm.model.attachmentsData" message="vm.sendForm" is-uploading="vm.isUploading"></attach-upload></div><div class="compose__content"><div class="compose__message" contenteditable="true" ng-model="vm.sendForm.model.body" ng-model-options="{ debounce: 250 }" required placeholder="\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435..." onclick="$(this).focus();"><div><br></div></div></div></div></div></form></div>');
$templateCache.put('app/mail/inbox/inbox.html','<inbox-header></inbox-header><div class="search-result" ng-if="vm.isNoResult"><strong>\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B \u043F\u043E\u0438\u0441\u043A\u0430 \xABinfo\xBB</strong></div><search-mail ng-if="vm.messages.params.search"></search-mail><div class="search-result search-result--active search-result--no-result" ng-if="vm.messages.params.search && !vm.messages.items.length"><div class="search-result__content"><span class="search-result__message-hint">\u041D\u0435 \u043D\u0430\u0448\u043B\u043E\u0441\u044C \u043F\u0438\u0441\u0435\u043C \u043F\u043E \u0432\u0430\u0448\u0435\u043C\u0443 \u0437\u0430\u043F\u0440\u043E\u0441\u0443</span> <span class="search-result__message-hint"></span><div class="search-result__message-hint">\u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u043F\u043E\u0438\u0441\u043A\u0430\u0442\u044C <a class="search-result__link">\u043F\u043E \u0432\u0441\u0435\u0439 \u043F\u043E\u0447\u0442\u0435</a></div></div></div><!--vm.data._links.next--><div class="inbox-plash hide-elm"><div class="inbox-plash__message"><div class="main-plash__text">\u0412 \u044D\u0442\u0443 \u043F\u0430\u043F\u043A\u0443 \u043F\u043E\u043F\u0430\u0434\u0430\u044E\u0442 \u043F\u0438\u0441\u044C\u043C\u0430, \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0451\u043D\u043D\u044B\u0435, \u043A\u0430\u043A \u043D\u0435\u0436\u0435\u043B\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u0438\u043B\u0438 \u0432\u0440\u0435\u0434\u043E\u043D\u043E\u0441\u043D\u044B\u0435.</div><button class="btn btn--normal btn--not-events btn--size_s mrg__top8 font--size12 mrg__top5" type="button">\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u043F\u0430\u043F\u043A\u0443</button></div></div><div class="inbox-list"><div infinite-scroll="vm.paginate()" infinite-scroll-distance="1"><inbox-message-list messages="vm.messages"></inbox-message-list></div></div><div class="inbox-empty" ng-if="vm.messages.params.mbox && !vm.messages.params.search && !vm.messages.params.tag_id && !vm.messages.params.filter &&!vm.messages.items.length"><span class="inbox-empty__icon"></span> <span class="inbox-empty__notif">\u041F\u0443\u0441\u0442\u0430\u044F \u043F\u0430\u043F\u043A\u0430</span> <span class="inbox-empty__text" ng-if="vm.messages.params.mbox !== \'INBOX\'">\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u0432 \u043F\u0430\u043F\u043A\u0443<a class="inbox-empty__link" ui-sref="mail.inbox({mbox: \'INBOX\'})">\xAB\u0412\u0445\u043E\u0434\u044F\u0449\u0438\u0435\xBB</a></span></div><folder-layout messages="vm.messages"></folder-layout><inbox-footer messages="vm.messages"></inbox-footer>');
$templateCache.put('app/mail/message/message.html','<div class="mail-message"><div class="mail-message__main-info"><!-- \u0425\u0435\u0434\u0435\u0440 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F --><div class="mail-message__title wrapper">{{ vm.message.model.Subject }}</div><div class="mail-message__main-content wrapper"><!--<div class="mail-message__header">--><!--<div class="mail-message__header-container">--><!--</div>--><!--</div>--><!----><div class="mail-message__info position--sticky wrapper wrapper--is-margin"><div class="info-sender width--all"><div class="info-sender__head flex--inline"><div class="info-sender__avatar flex"><div class="avatar avatar--settings avatar--size42 avatar--second-style"><avatar-name name="vm.message.model.from" email="vm.message.model.to[0].fromAddress"></avatar-name></div></div><div class="info-sender__title"><div class="info-sender__from-whom"><div class="info-sender__important-tags info-sender__important-tags--small-title important-tags--active" ng-if="vm.message.model.important"></div>{{ vm.message.model.from }} <button class="btn btn--not-style btn--not-events btn--main-mobile-color font--size12 padding--right_2 padding--left_2 mrg__left5" ng-class="{\'icon-arrow-down\': !vm.isOpenMessageInfo, \'icon-arrow-up\': vm.isOpenMessageInfo}" type="button" ng-click="vm.isOpenMessageInfo = !vm.isOpenMessageInfo"></button></div><div class="info-sender__date"><to-date date="vm.message.model.date.date"></to-date></div></div><div class="info-sender__right-menu mrg__right"><div class="btn btn--not-events btn--not-style btn--size_20 btn--main-mobile-color icon-more" ng-click="vm.openMessageMenu(); $event.stopPropagation();"></div><div class="btn btn--not-events btn--not-style btn--size_20 btn--main-mobile-color icon-delete color--light-red padding--right" ng-if="vm.$state.params.mbox !== \'Trash\'" ng-click="vm.move({name: \'Trash\', caption: \'\u041A\u043E\u0440\u0437\u0438\u043D\u0430\'})"></div><div class="btn btn--not-events btn--not-style btn--size_20 btn--main-mobile-color icon-delete color--light-red padding--right" ng-if="vm.$state.params.mbox === \'Trash\'" ng-click="vm.destroy({name: \'Trash\'})"></div><div class="btn btn--not-events btn--not-style btn--size_20 btn--main-mobile-color icon-reply padding--right" ui-sref="mail.compose({mbox: vm.message.model.mbox, id: vm.message.model.number, connection_id: vm.message.model.connection_id})"></div></div></div><!--\n                        \u0434\u043B\u044F \u0442\u043E\u0433\u043E \u0447\u0442\u043E\u0431\u044B \u043E\u0442\u043E\u0431\u0440\u0430\u0437\u0438\u0442\u044C \u0431\u043E\u043B\u0435 \u043F\u043E\u0434\u0440\u043E\u0431\u043D\u0443\u044E \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E \u043F\u043E \u043F\u0438\u0441\u044C\u044E,\n                        \u043F\u0440\u0438 \u043D\u0430\u0436\u0430\u0442\u0438\u0438 \u043D\u0430 \u043A\u043D\u043E\u043F\u0443 \u0432\u043E\u0437\u043B\u0435 \u0438\u043C\u0435\u043D\u0438 \u043D\u0443\u0436\u043D\u043E \u043A\n                        info-sender__message-info \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C is-active\n                        \u0430 info-sender__from-whom > button \u043D\u0443\u0436\u043D\u043E \u0437\u0430\u043C\u0435\u043D\u0438\u0442\u044C icon-arrow-down \u043D\u0430 icon-arrow-up\n                        \u043D\u0443 \u0438\u043B\u0438 \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C btn--rotate\n                    --><div class="info-sender__message-info is-active" ng-if="vm.isOpenMessageInfo"><div class="info-sender__message-info-item to-whom"><span class="to-whom__title width--min60">\u041A\u043E\u043C\u0443</span><div class="avatar avatar--settings avatar--size28 avatar--second-style"><avatar-name name="vm.message.model.to[0].name" email="vm.message.model.to[0].address"></avatar-name></div><span class="to-whom__mail-recipient">{{ vm.message.model.to[0].name ? vm.message.model.to[0].name : vm.message.model.to[0].address }}</span></div><div class="info-sender__message-info-item to-whom"><span class="to-whom__title width--min60">\u041E\u0442 \u041A\u043E\u0433\u043E</span><div class="avatar avatar--settings avatar--size28 avatar--second-style" ng-if="vm.isFromOpen && vm.$state.params.mbox !== \'Sent\'"><avatar-name name="vm.message.model.from" email="vm.message.model.fromAddress"></avatar-name></div><span class="to-whom__mail-recipient to-whom__mail-recipient--name">{{ vm.message.model.from ? vm.message.model.from : vm.message.model.fromAddress }}</span></div><div class="info-sender__message-info-item to-whom"><span class="to-whom__title width--min60">\u041F\u0430\u043F\u043A\u0430</span><div class="to-whom__folders"><div class="to-whom__folder">{{ vm.message.model.mboxi18n }}</div></div></div><div class="info-sender__message-info-item to-whom"><span class="to-whom__title width--min60">\u041C\u0435\u0442\u043A\u0438</span><div class="inbox-message__labels"><button class="info-sender__important-tags important-tags btn--not-style btn--not-events" ng-class="{\'important-tags--active\': vm.message.model.important}" type="button" ng-click="vm.setImportant()"></button><div class="inbox-message__label letter-tags letter-tags--poss-remove" style="background: {{ tag.bgcolor }}; color: {{ tag.color }}" ng-repeat="tag in vm.message.model.tags"><span class="letter-tags__name">{{ tag.tag_name }}</span> <button class="btn btn--not-style btn--circle letter-tags__icon" ng-click="vm.setUnTag(tag)"><span class="letter-tags__remove-icon icon-remove-thick"></span></button></div></div></div></div></div></div><!-- \u0410\u0442\u0442\u0430\u0447\u0438 --><div class="mail-message__mail-attachments"><div class="attachments"><div class="attachments__item" ng-repeat="attachment in vm.message.model.attachmentsData"><attach-item attach="attachment" message="vm.message.model"></attach-item></div></div></div><!-- \u0422\u0435\u043B\u043E \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F --><div class="mail-message__body"><div class="body-message"><!--\u0421\u0430\u043C\u043E \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435--><div class="body-message__content" ng-bind-html="vm.getTrustHtml(vm.message.model.body)"></div></div></div></div></div><!-- \u0411\u044B\u0441\u0442\u0440\u044B\u0439 \u043E\u0442\u0432\u0435\u0442--><div class="mail-message__reply"><form class="message-reply" name="sendForm" ng-submit="vm.send(sendForm)"><div class="message-reply__container"><div class="quick-reply"><button class="quick-reply__write btn btn--not-style icon-write"></button><div class="quick-reply__message"><div class="quick-reply__message-input" contenteditable="true" ng-model="vm.text" required placeholder="\u0411\u044B\u0441\u0442\u0440\u044B\u0439 \u043E\u0442\u0432\u0435\u0442"></div></div><button class="quick-reply__send btn btn--not-style">\u041E\u0442\u043F\u0440.</button></div></div></form></div><!--<div class="mail-message__footer">--><!--<div class="btn btn&#45;&#45;not-events btn&#45;&#45;not-style btn&#45;&#45;main-mobile-color btn&#45;&#45;size_20 icon-more mrg__right"></div>--><!--</div>--></div>');
$templateCache.put('app/settings/main/settings.html','<div class="layout__bread-crumbs mrg__bottom15"><div class="bread-crumbs"><a class="bread-crumbs__item" href="#">\u041F\u043E\u0447\u0442\u0430</a> <a class="bread-crumbs__item" href="#">\u0412\u0441\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438</a> <a class="bread-crumbs__item bread-crumbs--active" href="#">\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u043E\u043C</a></div></div><article class="layout-settings"><!----><section class="layout-settings__col width--aut"><!-- \u041F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 --><div class="personal-info"><div class="personal-info__user-avatar mrg__bottom45"><div class="avatar avatar--settings avatar--size203 avatar--second-style"><img class="avatar__image" src="/images/avatar-personal.svg" alt=""> <span class="avatar__edit avatar__edit--add"></span></div></div><div class="personal-info__user-info"><div class="personal-info__user-info-title main-title-text">\u041F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435</div><form class="form" action=""><div class="form__fields"><!-- \u0418\u043C\u044F \u0438 \u0444\u0430\u043C\u0438\u043B\u0438\u044F --><div class="form__field-item"><div class="field-style field-style--max-wd260 mrg__right18"><label class="field-style__title">\u0418\u043C\u044F \u0438 \u0444\u0430\u043C\u0438\u043B\u0438\u044F:</label><input class="input input--size_l width--inh" type="text" placeholder="\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043C\u044F"></div><div class="field-style field-style--max-wd260"><label class="field-style__title hide-elm">&nbsp;&nbsp;</label><input class="input input--size_l width--inh" type="name" placeholder="\u0412\u0430\u0448\u0430 \u0424\u0430\u043C\u0438\u043B\u0438\u044F"></div></div><!-- \u041B\u043E\u0433\u0438\u043D/\u0438\u043C\u044F \u0432 \u0431\u0430\u0437\u0435 --><div class="form__field-item"><div class="field-style field-style--max-wd260 mrg__right18"><label class="field-style__title">\u0418\u043C\u044F \u043D\u0430 mail.cz:</label><div class="select select_mode_radio select_theme_islands select_size_l i-bem width--inh" data-bem=\'{"select":{"name":"select2"}}\'><input class="select__control" type="hidden" name="select2" value="2" autocomplete="off"> <button class="button button_size_l button_theme_islands button__control select__button i-bem" data-bem=\'{"button":{}}\' role="listbox" type="button" aria-owns="uniq148861608057241 uniq148861608057242 uniq148861608057243" aria-labelledby="uniq148861608057244"><span class="button__text" id="uniq148861608057244">@mail.cz</span> <span class="icon select__tick"></span></button><div class="popup popup_target_anchor popup_theme_islands popup_autoclosable i-bem" data-bem=\'{"popup":{"directions":["bottom-left","bottom-right","top-left","top-right"]}}\' aria-hidden="true"><div class="menu menu_size_l menu_theme_islands menu_mode_radio menu__control select__menu i-bem" data-bem=\'{"menu":{}}\'><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":1}}\' role="option" id="uniq148861608057241" aria-checked="false">@mail.cz</div><div class="menu__item menu__item_checked menu__item_theme_islands" data-bem=\'{"menu__item":{"val":2}}\' role="option" id="uniq148861608057242" aria-checked="true">@mail.cz</div><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":3}}\' role="option" id="uniq148861608057243" aria-checked="false">@mail.cz</div></div></div></div></div><div class="field-style field-style--max-wd260"><label class="field-style__title hide-elm">&nbsp;&nbsp;</label><input class="input input--size_l width--inh" type="name" placeholder="\u0412\u0430\u0448 \u043B\u043E\u0433\u0438\u043D \u043F\u043E\u0447\u0442\u044B "><!-- bem \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442 --><!-- <span class="input input_theme_islands input_size_l i-bem"data-bem=\'{"input":{}}\'>\n                                    <span class="input__box">\n                                        <input class="input__control" placeholder="\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043C\u044F"/>\n                                    </span>\n                                </span> --></div><div class="notific mrg__top7">\u042D\u0442\u043E \u0438\u043C\u044F \u0441\u043C\u043E\u0433\u0443\u0442 \u0432\u0438\u0434\u0435\u0442\u044C \u0434\u0440\u0443\u0433\u0438\u0435 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438 Mail.cz \u2014 \u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440, \u0438\u043C \u0431\u0443\u0434\u0435\u0442 \u043F\u043E\u0434\u043F\u0438\u0441\u0430\u043D\u0430 \u0432\u0430\u0448\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430</div></div><!-- \u0414\u0430\u0442\u0430 / \u041F\u043E\u043B --><div class="form__field-item"><!--\u0414\u0430\u0442\u0430 \u0440\u043E\u0436\u0434\u0435\u043D\u0438\u044F--><div class="field-style field-style--max-wd260 mrg__right18"><label class="field-style__title">\u0414\u0430\u0442\u0430 \u0440\u043E\u0436\u0434\u0435\u043D\u0438\u044F:</label><div class="field-style__container width--inh"><!-- \u0414\u0435\u043D\u044C --> <input class="input input--size_l width--size65" type="name" placeholder="\u0414\u0435\u043D\u044C"><!-- bem \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442 --><!-- <span class="input input_theme_islands input_size_l i-bem input&#45;&#45;width65 " data-bem=\'{"input":{}}\'>\n                                        <span class="input__box">\n                                         <input class="input__control" placeholder="\u0414\u0435\u043D\u044C"/>\n                                        </span>\n                                    </span>--><!-- \u041C\u0435\u0441\u044F\u0446 --><div class="select select_mode_radio-check select_theme_islands select_size_l i-bem width--inh" data-bem=\'{"select":{"name":"select3","text":"\u2014"}}\'><input class="select__control" type="hidden" name="select3" value="2" autocomplete="off"> <button class="button button_size_l button_theme_islands button_checked button__control select__button i-bem" data-bem=\'{"button":{}}\' role="listbox" type="button" aria-owns="uniq148861606894041 uniq148861606894042 uniq148861606894043" aria-labelledby="uniq148861606894044"><span class="button__text" id="uniq148861606894044">\u041C\u0435\u0441\u044F\u0446</span> <span class="icon select__tick"></span></button><div class="popup popup_target_anchor popup_theme_islands popup_autoclosable i-bem" data-bem=\'{"popup":{"directions":["bottom-left","bottom-right","top-left","top-right"]}}\' aria-hidden="true"><div class="menu menu_size_l menu_theme_islands menu_mode_radio-check menu__control select__menu i-bem" data-bem=\'{"menu":{}}\'><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":1}}\' role="option" id="uniq148861606894041" aria-checked="false">\u042F\u043D\u0432\u0430\u0440\u044C</div><div class="menu__item menu__item_checked menu__item_theme_islands" data-bem=\'{"menu__item":{"val":2}}\' role="option" id="uniq148861606894042" aria-checked="true">\u0424\u0435\u0432\u0440\u0430\u043B\u044C</div><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":3}}\' role="option" id="uniq148861606894043" aria-checked="false">\u041C\u0430\u0440\u0442</div><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":3}}\' role="option" id="uniq148861606894043" aria-checked="false">\u0410\u043F\u0440\u0435\u043B\u044C</div><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":3}}\' role="option" id="uniq148861606894043" aria-checked="false">\u041C\u0430\u0439</div><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":3}}\' role="option" id="uniq148861606894043" aria-checked="false">\u0418\u044E\u043D\u044C</div><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":3}}\' role="option" id="uniq148861606894043" aria-checked="false">\u0418\u044E\u043B\u044C</div><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":3}}\' role="option" id="uniq148861606894043" aria-checked="false">\u0410\u0432\u0433\u0443\u0441\u0442</div><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":3}}\' role="option" id="uniq148861606894043" aria-checked="false">\u0421\u0435\u043D\u0442\u044F\u0431\u0440\u044C</div><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":3}}\' role="option" id="uniq148861606894043" aria-checked="false">\u041E\u043A\u0442\u044F\u0431\u0440\u044C</div><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":3}}\' role="option" id="uniq148861606894043" aria-checked="false">\u041D\u043E\u044F\u0431\u0440\u044C</div><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":3}}\' role="option" id="uniq148861606894043" aria-checked="false">\u0414\u0435\u043A\u0430\u0431\u043B\u044C</div></div></div></div><!-- \u0413\u043E\u0434--> <input class="input input--size_l width--size65" type="name" placeholder="\u0413\u043E\u0434"><!-- bem \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442 --><!-- <span class="input input_theme_islands input_size_l i-bem input&#45;&#45;width65 " data-bem=\'{"input":{}}\'>\n                                        <span class="input__box">\n                                        <input class="input__control" placeholder="\u0414\u0435\u043D\u044C"/>\n                                        </span>\n                                    </span>--></div></div><!-- \u041F\u043E\u043B --><div class="field-style field-style--max-wd260"><label class="field-style__title">\u041F\u043E\u043B:</label><span class="radio-group radio-group_theme_islands radio-group_size_l radio-group_type_button control-group i-bem" data-bem=\'{"radio-group":{}}\' role="radiogroup"><label class="radio radio_type_button radio_theme_islands radio_size_l radio_checked i-bem mrg__none" data-bem=\'{"radio":{}}\'><button class="button button_togglable_radio button_checked button_theme_islands button_size_l button__control i-bem" data-bem=\'{"button":{}}\' role="button" type="button" aria-pressed="true"><span class="button__text">\u041C\u0443\u0436\u0441\u043A\u043E\u0439</span></button> <input class="radio__control" type="radio" autocomplete="off" name="radio-islands" value="2" checked="checked"></label><label class="radio radio_type_button radio_theme_islands radio_size_l i-bem mrg__none" data-bem=\'{"radio":{}}\'><button class="button button_togglable_radio button_theme_islands button_size_l button__control i-bem" data-bem=\'{"button":{}}\' role="button" type="button" aria-pressed="false"><span class="button__text">\u0416\u0435\u043D\u0441\u043A\u0438\u0439</span></button> <input class="radio__control" type="radio" autocomplete="off" name="radio-islands" value="3"></label></span></div></div><!-- \u0421\u0442\u0440\u0430\u043D\u0430 / \u0413\u043E\u0440\u043E\u0434 --><div class="form__field-item"><!-- \u0421\u0442\u0440\u0430\u043D\u0430 --><div class="field-style field-style--max-wd260 mrg__right18"><label class="field-style__title">\u0421\u0442\u0440\u0430\u043D\u0430</label><div class="select select_mode_radio-check select_theme_islands select_size_l i-bem width--inh" data-bem=\'{"select":{"name":"select3","text":"\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0443"}}\'><input class="select__control" type="hidden" name="select3" value="2" autocomplete="off"> <button class="button button_size_l button_theme_islands button_checked button__control select__button i-bem" data-bem=\'{"button":{}}\' role="listbox" type="button" aria-owns="uniq148861608062641 uniq148861608062642 uniq148861608062643" aria-labelledby="uniq148861608062644"><span class="button__text" id="uniq148861608062644">\u041C\u0430\u0441\u0442\u0435\u0440-\u043A\u043B\u0430\u0441\u0441</span><span class="icon select__tick"></span></button><div class="popup popup_target_anchor popup_theme_islands popup_autoclosable i-bem" data-bem=\'{"popup":{"directions":["bottom-left","bottom-right","top-left","top-right"]}}\' aria-hidden="true"><div class="menu menu_size_l menu_theme_islands menu_mode_radio-check menu__control select__menu i-bem" data-bem=\'{"menu":{}}\'><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":1}}\' role="option" id="uniq148861608062641" aria-checked="false">\u0420\u043E\u0441\u0441\u0438\u044F</div><div class="menu__item menu__item_checked menu__item_theme_islands" data-bem=\'{"menu__item":{"val":2}}\' role="option" id="uniq148861608062642" aria-checked="true">\u0427\u0435\u0445\u0438\u044F</div><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":3}}\' role="option" id="uniq148861608062643" aria-checked="false">\u0423\u043A\u0440\u0430\u0438\u043D\u0430</div></div></div></div></div><!-- \u0413\u043E\u0440\u043E\u0434 --><div class="field-style field-style--max-wd260"><label class="field-style__title">\u0413\u043E\u0440\u043E\u0434:</label><div class="select select_mode_radio-check select_theme_islands select_size_l i-bem width--inh" data-bem=\'{"select":{"name":"select3","text":"\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0433\u043E\u0440\u043E\u0434"}}\'><input class="select__control" type="hidden" name="select3" value="2" autocomplete="off"> <button class="button button_size_l button_theme_islands button_checked button__control select__button i-bem" data-bem=\'{"button":{}}\' role="listbox" type="button" aria-owns="uniq148861606894041 uniq148861606894042 uniq148861606894043" aria-labelledby="uniq148861606894044"><span class="button__text" id="uniq148861606894044">\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0433\u043E\u0440\u043E\u0434</span><span class="icon select__tick"></span></button><div class="popup popup_target_anchor popup_theme_islands popup_autoclosable i-bem" data-bem=\'{"popup":{"directions":["bottom-left","bottom-right","top-left","top-right"]}}\' aria-hidden="true"><div class="menu menu_size_l menu_theme_islands menu_mode_radio-check menu__control select__menu i-bem" data-bem=\'{"menu":{}}\'><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":1}}\' role="option" id="uniq148861606894041" aria-checked="false">\u041A\u0438\u0435\u0432</div><div class="menu__item menu__item_checked menu__item_theme_islands" data-bem=\'{"menu__item":{"val":2}}\' role="option" id="uniq148861606894042" aria-checked="true">\u041F\u0440\u0430\u0433\u0430</div><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":3}}\' role="option" id="uniq148861606894043" aria-checked="false">\u041B\u044C\u0432\u043E\u0432</div></div></div></div></div></div><!-- \u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C / \u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C  --><div class="forms__field-item mrg__top40"><div class="field-style field-style--max-wd260 mrg__right18"><button class="btn btn--normal btn--size_l width--size168 float--left">\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C</button><!-- bem \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442 --><!--<button class="button button_theme_islands button_size_l button__control i-bem width&#45;&#45;size168 float&#45;&#45;left"\n                                        data-bem=\'{"button":{}}\' role="button" type="button"><span\n                                        class="button__text">\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C</span></button>--></div><div class="field-style field-style--max-wd260"><button class="btn btn--size_l btn--red width--size168 float--right">\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C</button><!-- bem \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442 --><!--<button class="button button_theme_islands button_size_l button__control i-bem width&#45;&#45;size168 btn&#45;&#45;red float&#45;&#45;right"\n                                        data-bem=\'{"button":{}}\' role="button" type="button"><span\n                                        class="button__text">\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C</span></button>--></div></div><div class="notific font--center mrg__top10 mrg__bottom45">Mail.cz \u043D\u0438 \u043F\u0440\u0438 \u043A\u0430\u043A\u0438\u0445 \u043E\u0431\u0441\u0442\u043E\u044F\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u0430\u0445 \u043D\u0435 \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u0442 \u0442\u0440\u0435\u0442\u044C\u0438\u043C \u043B\u0438\u0446\u0430\u043C \u043D\u0438\u043A\u0430\u043A\u0438\u0445 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445 \u0441\u0432\u043E\u0438\u0445 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439, \u043A\u0440\u043E\u043C\u0435 \u0441\u043B\u0443\u0447\u0430\u0435\u0432, \u043F\u0440\u044F\u043C\u043E \u043F\u0440\u0435\u0434\u0443\u0441\u043C\u043E\u0442\u0440\u0435\u043D\u043D\u044B\u0445 \u0432<br><a class="notific__link" href="">\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0435 \u041A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438.</a></div></div></form></div></div></section><!----><section class="layout-settings__col width--aut"><!-- \u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0431\u043B\u043E\u043A \u0441 \u043F\u0440\u0430\u0432\u0430 --><div class="additional-info"><!-- \u0411\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u044C \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430 --><div class="additional-info__block"><div class="main-title-text main-title-text__icon"><img class="main-title-text__icon--size27" src="images/safety-g.svg" alt=""> \u0411\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u044C \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430</div><!--<div class="additional-info__block__option">--><!--<a class="additional-info__block__link link&#45;&#45;disabled" href="#">\u0410\u043A\u043A\u0430\u0443\u043D\u0442 \u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u0437\u0430\u0449\u0438\u0449\u0435\u043D</a>--><!--<a class="additional-info__block__link" href="#">\u0421\u043C\u0435\u043D\u0438\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C</a>--><!--<a class="additional-info__block__link" href="#">\u041F\u0440\u0438\u0432\u044F\u0437\u0430\u0442\u044C \u0437\u0430\u043F\u0430\u0441\u043D\u043E\u0439 e-mail</a>--><!--<a class="additional-info__block__link" href="#">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430</a>--><!--</div>--><div class="additional-info__block__option"><a class="additional-info__block__link link link--disabled" href="#">\u0410\u043A\u043A\u0430\u0443\u043D\u0442 \u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u0437\u0430\u0449\u0438\u0449\u0435\u043D</a> <a class="additional-info__block__link link mrg__bottom10" href="#">\u0421\u043C\u0435\u043D\u0438\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C</a><div class="additional-info__block__link"><span class="additional-info__block__title">additional@mail.com</span> <button class="additional-info__block__link link btn btn--not-style">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C/\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0437\u0430\u043F\u0430\u0441\u043D\u043E\u0439 e-mail</button></div><div class="additional-info__block__link"><span class="additional-info__block__title">+38050*** **23</span> <button class="additional-info__block__link link btn btn--not-style">\u0414\u043E\u0431\u0430\u0432\u0438\u0442/\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430</button></div></div></div><!-- \u0414\u0440\u0443\u0433\u0438\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 --><div class="additional-info__block"><div class="main-title-text main-title-text__icon"><img class="main-title-text__icon--size27" src="images/other-settings.svg" alt=""> \u0414\u0440\u0443\u0433\u0438\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438</div><div class="additional-info__block__option"><a class="additional-info__block__link" href="#">\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0430\u043A\u043A\u0430\u0443\u043D\u0442</a></div></div><!-- \u041F\u0440\u0438\u0432\u044F\u0437\u0430\u0442\u044C \u043F\u0440\u043E\u0444\u0438\u043B\u044C--><div class="additional-info__block"><div class="main-title-text main-title-text__icon"><img class="main-title-text__icon--size27 hide-elm" src="images/other-settings.svg" alt=""> \u041F\u0440\u0438\u0432\u044F\u0437\u0430\u0442\u044C \u043F\u0440\u043E\u0444\u0438\u043B\u044C</div><div class="additional-info__block__snap-profile"><div class="social-icons"><button class="social-icons__icon social-icons--vk-icon social-icons--btn-tied btn" type="button"></button> <button class="social-icons__icon social-icons--fb-icon btn" type="button"></button> <button class="social-icons__icon social-icons--tw-icon btn" type="button"></button> <button class="social-icons__icon social-icons--gp-icon btn" type="button"></button></div></div></div><!-- \u0427\u0435\u043A\u0431\u043E\u043A\u0441\u044B --><div class="additional-info__block"><div class="font--bold font--size13">\u0420\u0430\u0437\u0440\u0435\u0448\u0438\u0442\u044C \u0434\u043E\u0441\u0442\u0443\u043F \u043A \u043F\u043E\u0447\u0442\u043E\u0432\u043E\u043C\u0443 \u044F\u0449\u0438\u043A\u0443 \u0441 \u043F\u043E\u043C\u043E\u0449\u044C\u044E \u043F\u043E\u0447\u0442\u043E\u0432\u044B\u0445 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432</div><form class="additional-info__allow form" action=""><label class="checkbox checkbox_theme_islands checkbox_size_m i-bem mrg__bottom5" data-bem=\'{"checkbox":{}}\'><span class="checkbox__box"><input class="checkbox__control" type="checkbox" autocomplete="off" name="name1" value="val_1"> </span><span class="checkbox__text" role="presentation">\u0421 \u0441\u0435\u0440\u0432\u0435\u0440\u0430 imap.yandex.ru \u043F\u043E \u043F\u0440\u043E\u0442\u043E\u043A\u043E\u043B\u0443 IMAP</span></label><label class="checkbox checkbox_theme_islands checkbox_size_m i-bem mrg__bottom5" data-bem=\'{"checkbox":{}}\'><span class="checkbox__box"><input class="checkbox__control" type="checkbox" autocomplete="off" name="name1" value="val_1"> </span><span class="checkbox__text" role="presentation">\u0421 \u0441\u0435\u0440\u0432\u0435\u0440\u0430 pop.yandex.ru \u043F\u043E \u043F\u0440\u043E\u0442\u043E\u043A\u043E\u043B\u0443 POP3</span></label></form></div></div></section><!----><section class="layout-settings__row separate--top mrg__top30"><!-- \u0412\u0430\u0448\u0438 \u043F\u043E\u0434\u043F\u0438\u0441\u0438 --><div class="user-signatures"><div class="user-signatures__title main-title-text">\u0412\u0430\u0448\u0438 \u043F\u043E\u0434\u043F\u0438\u0441\u0438</div><div class="user-signatures__edit-text col-md-6 mrg__right20">\u0417\u0434\u0435\u0441\u044C \u0432\u0438\u0434\u0436\u0435\u0442 \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u043F\u043E\u0434\u043F\u0438\u0441\u0438</div><div class="user-signatures__view col-md-6">\u0412\u0438\u0434 \u041D\u0430\u0448\u0435\u0439 \u043F\u043E\u0434\u043F\u0438\u0441\u0438</div></div></section></article><div class="layout__footer"><footer></footer></div>');
$templateCache.put('app/settings/tags/tags.html','<div class="layout__bread-crumbs mrg__bottom15"><div class="bread-crumbs"><a class="bread-crumbs__item" href="#">\u041F\u043E\u0447\u0442\u0430</a> <a class="bread-crumbs__item" href="#">\u0412\u0441\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438</a> <a class="bread-crumbs__item bread-crumbs--active" href="#">\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u043E\u043C</a></div></div><article class="layout-settings"><!----><section class="layout-settings__col width--aut"><!-- \u041F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 --><div class="personal-info"><div class="personal-info__user-avatar mrg__bottom45"><div class="avatar avatar--settings avatar--size203 avatar--second-style"><img class="avatar__image" src="/images/avatar-personal.svg" alt=""> <span class="avatar__edit avatar__edit--add"></span></div></div><div class="personal-info__user-info"><div class="personal-info__user-info-title main-title-text">\u041F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435</div><form class="form" action=""><div class="form__fields"><!-- \u0418\u043C\u044F \u0438 \u0444\u0430\u043C\u0438\u043B\u0438\u044F --><div class="form__field-item"><div class="field-style field-style--max-wd260 mrg__right18"><label class="field-style__title">\u0418\u043C\u044F \u0438 \u0444\u0430\u043C\u0438\u043B\u0438\u044F:</label><input class="input input--size_l width--inh" type="name" placeholder="\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043C\u044F"></div><div class="field-style field-style--max-wd260"><label class="field-style__title hide-elm">&nbsp;&nbsp;</label><input class="input input--size_l width--inh" type="name" placeholder="\u0412\u0430\u0448\u0430 \u0424\u0430\u043C\u0438\u043B\u0438\u044F"></div></div><!-- \u041B\u043E\u0433\u0438\u043D/\u0438\u043C\u044F \u0432 \u0431\u0430\u0437\u0435 --><div class="form__field-item"><div class="field-style field-style--max-wd260 mrg__right18"><label class="field-style__title">\u0418\u043C\u044F \u043D\u0430 mail.cz:</label><div class="select select_mode_radio select_theme_islands select_size_l i-bem width--inh" data-bem=\'{"select":{"name":"select2"}}\'><input class="select__control" type="hidden" name="select2" value="2" autocomplete="off"> <button class="button button_size_l button_theme_islands button__control select__button i-bem" data-bem=\'{"button":{}}\' role="listbox" type="button" aria-owns="uniq148861608057241 uniq148861608057242 uniq148861608057243" aria-labelledby="uniq148861608057244"><span class="button__text" id="uniq148861608057244">@mail.cz</span> <span class="icon select__tick"></span></button><div class="popup popup_target_anchor popup_theme_islands popup_autoclosable i-bem" data-bem=\'{"popup":{"directions":["bottom-left","bottom-right","top-left","top-right"]}}\' aria-hidden="true"><div class="menu menu_size_l menu_theme_islands menu_mode_radio menu__control select__menu i-bem" data-bem=\'{"menu":{}}\'><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":1}}\' role="option" id="uniq148861608057241" aria-checked="false">@mail.cz</div><div class="menu__item menu__item_checked menu__item_theme_islands" data-bem=\'{"menu__item":{"val":2}}\' role="option" id="uniq148861608057242" aria-checked="true">@mail.cz</div><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":3}}\' role="option" id="uniq148861608057243" aria-checked="false">@mail.cz</div></div></div></div></div><div class="field-style field-style--max-wd260"><label class="field-style__title hide-elm">&nbsp;&nbsp;</label><input class="input input--size_l width--inh" type="name" placeholder="\u0412\u0430\u0448 \u043B\u043E\u0433\u0438\u043D \u043F\u043E\u0447\u0442\u044B "><!-- bem \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442 --><!-- <span class="input input_theme_islands input_size_l i-bem"data-bem=\'{"input":{}}\'>\n                                    <span class="input__box">\n                                        <input class="input__control" placeholder="\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043C\u044F"/>\n                                    </span>\n                                </span> --></div><div class="notific mrg__top7">\u042D\u0442\u043E \u0438\u043C\u044F \u0441\u043C\u043E\u0433\u0443\u0442 \u0432\u0438\u0434\u0435\u0442\u044C \u0434\u0440\u0443\u0433\u0438\u0435 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438 Mail.cz \u2014 \u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440, \u0438\u043C \u0431\u0443\u0434\u0435\u0442 \u043F\u043E\u0434\u043F\u0438\u0441\u0430\u043D\u0430 \u0432\u0430\u0448\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430</div></div><!-- \u0414\u0430\u0442\u0430 / \u041F\u043E\u043B --><div class="form__field-item"><!--\u0414\u0430\u0442\u0430 \u0440\u043E\u0436\u0434\u0435\u043D\u0438\u044F--><div class="field-style field-style--max-wd260 mrg__right18"><label class="field-style__title">\u0414\u0430\u0442\u0430 \u0440\u043E\u0436\u0434\u0435\u043D\u0438\u044F:</label><div class="field-style__container width--inh"><!-- \u0414\u0435\u043D\u044C --> <input class="input input--size_l width--size65" type="name" placeholder="\u0414\u0435\u043D\u044C"><!-- bem \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442 --><!-- <span class="input input_theme_islands input_size_l i-bem input&#45;&#45;width65 " data-bem=\'{"input":{}}\'>\n                                        <span class="input__box">\n                                         <input class="input__control" placeholder="\u0414\u0435\u043D\u044C"/>\n                                        </span>\n                                    </span>--><!-- \u041C\u0435\u0441\u044F\u0446 --><div class="select select_mode_radio-check select_theme_islands select_size_l i-bem width--inh" data-bem=\'{"select":{"name":"select3","text":"\u2014"}}\'><input class="select__control" type="hidden" name="select3" value="2" autocomplete="off"> <button class="button button_size_l button_theme_islands button_checked button__control select__button i-bem" data-bem=\'{"button":{}}\' role="listbox" type="button" aria-owns="uniq148861606894041 uniq148861606894042 uniq148861606894043" aria-labelledby="uniq148861606894044"><span class="button__text" id="uniq148861606894044">\u041C\u0435\u0441\u044F\u0446</span> <span class="icon select__tick"></span></button><div class="popup popup_target_anchor popup_theme_islands popup_autoclosable i-bem" data-bem=\'{"popup":{"directions":["bottom-left","bottom-right","top-left","top-right"]}}\' aria-hidden="true"><div class="menu menu_size_l menu_theme_islands menu_mode_radio-check menu__control select__menu i-bem" data-bem=\'{"menu":{}}\'><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":1}}\' role="option" id="uniq148861606894041" aria-checked="false">\u042F\u043D\u0432\u0430\u0440\u044C</div><div class="menu__item menu__item_checked menu__item_theme_islands" data-bem=\'{"menu__item":{"val":2}}\' role="option" id="uniq148861606894042" aria-checked="true">\u0424\u0435\u0432\u0440\u0430\u043B\u044C</div><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":3}}\' role="option" id="uniq148861606894043" aria-checked="false">\u041C\u0430\u0440\u0442</div><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":3}}\' role="option" id="uniq148861606894043" aria-checked="false">\u0410\u043F\u0440\u0435\u043B\u044C</div><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":3}}\' role="option" id="uniq148861606894043" aria-checked="false">\u041C\u0430\u0439</div><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":3}}\' role="option" id="uniq148861606894043" aria-checked="false">\u0418\u044E\u043D\u044C</div><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":3}}\' role="option" id="uniq148861606894043" aria-checked="false">\u0418\u044E\u043B\u044C</div><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":3}}\' role="option" id="uniq148861606894043" aria-checked="false">\u0410\u0432\u0433\u0443\u0441\u0442</div><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":3}}\' role="option" id="uniq148861606894043" aria-checked="false">\u0421\u0435\u043D\u0442\u044F\u0431\u0440\u044C</div><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":3}}\' role="option" id="uniq148861606894043" aria-checked="false">\u041E\u043A\u0442\u044F\u0431\u0440\u044C</div><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":3}}\' role="option" id="uniq148861606894043" aria-checked="false">\u041D\u043E\u044F\u0431\u0440\u044C</div><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":3}}\' role="option" id="uniq148861606894043" aria-checked="false">\u0414\u0435\u043A\u0430\u0431\u043B\u044C</div></div></div></div><!-- \u0413\u043E\u0434--> <input class="input input--size_l width--size65" type="name" placeholder="\u0413\u043E\u0434"><!-- bem \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442 --><!-- <span class="input input_theme_islands input_size_l i-bem input&#45;&#45;width65 " data-bem=\'{"input":{}}\'>\n                                        <span class="input__box">\n                                        <input class="input__control" placeholder="\u0414\u0435\u043D\u044C"/>\n                                        </span>\n                                    </span>--></div></div><!-- \u041F\u043E\u043B --><div class="field-style field-style--max-wd260"><label class="field-style__title">\u041F\u043E\u043B:</label><span class="radio-group radio-group_theme_islands radio-group_size_l radio-group_type_button control-group i-bem" data-bem=\'{"radio-group":{}}\' role="radiogroup"><label class="radio radio_type_button radio_theme_islands radio_size_l radio_checked i-bem mrg__none" data-bem=\'{"radio":{}}\'><button class="button button_togglable_radio button_checked button_theme_islands button_size_l button__control i-bem" data-bem=\'{"button":{}}\' role="button" type="button" aria-pressed="true"><span class="button__text">\u041C\u0443\u0436\u0441\u043A\u043E\u0439</span></button> <input class="radio__control" type="radio" autocomplete="off" name="radio-islands" value="2" checked="checked"></label><label class="radio radio_type_button radio_theme_islands radio_size_l i-bem mrg__none" data-bem=\'{"radio":{}}\'><button class="button button_togglable_radio button_theme_islands button_size_l button__control i-bem" data-bem=\'{"button":{}}\' role="button" type="button" aria-pressed="false"><span class="button__text">\u0416\u0435\u043D\u0441\u043A\u0438\u0439</span></button> <input class="radio__control" type="radio" autocomplete="off" name="radio-islands" value="3"></label></span></div></div><!-- \u0421\u0442\u0440\u0430\u043D\u0430 / \u0413\u043E\u0440\u043E\u0434 --><div class="form__field-item"><!-- \u0421\u0442\u0440\u0430\u043D\u0430 --><div class="field-style field-style--max-wd260 mrg__right18"><label class="field-style__title">\u0421\u0442\u0440\u0430\u043D\u0430</label><div class="select select_mode_radio-check select_theme_islands select_size_l i-bem width--inh" data-bem=\'{"select":{"name":"select3","text":"\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0443"}}\'><input class="select__control" type="hidden" name="select3" value="2" autocomplete="off"> <button class="button button_size_l button_theme_islands button_checked button__control select__button i-bem" data-bem=\'{"button":{}}\' role="listbox" type="button" aria-owns="uniq148861608062641 uniq148861608062642 uniq148861608062643" aria-labelledby="uniq148861608062644"><span class="button__text" id="uniq148861608062644">\u041C\u0430\u0441\u0442\u0435\u0440-\u043A\u043B\u0430\u0441\u0441</span><span class="icon select__tick"></span></button><div class="popup popup_target_anchor popup_theme_islands popup_autoclosable i-bem" data-bem=\'{"popup":{"directions":["bottom-left","bottom-right","top-left","top-right"]}}\' aria-hidden="true"><div class="menu menu_size_l menu_theme_islands menu_mode_radio-check menu__control select__menu i-bem" data-bem=\'{"menu":{}}\'><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":1}}\' role="option" id="uniq148861608062641" aria-checked="false">\u0420\u043E\u0441\u0441\u0438\u044F</div><div class="menu__item menu__item_checked menu__item_theme_islands" data-bem=\'{"menu__item":{"val":2}}\' role="option" id="uniq148861608062642" aria-checked="true">\u0427\u0435\u0445\u0438\u044F</div><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":3}}\' role="option" id="uniq148861608062643" aria-checked="false">\u0423\u043A\u0440\u0430\u0438\u043D\u0430</div></div></div></div></div><!-- \u0413\u043E\u0440\u043E\u0434 --><div class="field-style field-style--max-wd260"><label class="field-style__title">\u0413\u043E\u0440\u043E\u0434:</label><div class="select select_mode_radio-check select_theme_islands select_size_l i-bem width--inh" data-bem=\'{"select":{"name":"select3","text":"\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0433\u043E\u0440\u043E\u0434"}}\'><input class="select__control" type="hidden" name="select3" value="2" autocomplete="off"> <button class="button button_size_l button_theme_islands button_checked button__control select__button i-bem" data-bem=\'{"button":{}}\' role="listbox" type="button" aria-owns="uniq148861606894041 uniq148861606894042 uniq148861606894043" aria-labelledby="uniq148861606894044"><span class="button__text" id="uniq148861606894044">\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0433\u043E\u0440\u043E\u0434</span><span class="icon select__tick"></span></button><div class="popup popup_target_anchor popup_theme_islands popup_autoclosable i-bem" data-bem=\'{"popup":{"directions":["bottom-left","bottom-right","top-left","top-right"]}}\' aria-hidden="true"><div class="menu menu_size_l menu_theme_islands menu_mode_radio-check menu__control select__menu i-bem" data-bem=\'{"menu":{}}\'><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":1}}\' role="option" id="uniq148861606894041" aria-checked="false">\u041A\u0438\u0435\u0432</div><div class="menu__item menu__item_checked menu__item_theme_islands" data-bem=\'{"menu__item":{"val":2}}\' role="option" id="uniq148861606894042" aria-checked="true">\u041F\u0440\u0430\u0433\u0430</div><div class="menu__item menu__item_theme_islands" data-bem=\'{"menu__item":{"val":3}}\' role="option" id="uniq148861606894043" aria-checked="false">\u041B\u044C\u0432\u043E\u0432</div></div></div></div></div></div><!-- \u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C / \u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C  --><div class="forms__field-item mrg__top40"><div class="field-style field-style--max-wd260 mrg__right18"><button class="btn btn--normal btn--size_l width--size168 float--left">\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C</button><!-- bem \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442 --><!--<button class="button button_theme_islands button_size_l button__control i-bem width&#45;&#45;size168 float&#45;&#45;left"\n                                        data-bem=\'{"button":{}}\' role="button" type="button"><span\n                                        class="button__text">\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C</span></button>--></div><div class="field-style field-style--max-wd260"><button class="btn btn--size_l btn--red width--size168 float--right">\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C</button><!-- bem \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442 --><!--<button class="button button_theme_islands button_size_l button__control i-bem width&#45;&#45;size168 btn&#45;&#45;red float&#45;&#45;right"\n                                        data-bem=\'{"button":{}}\' role="button" type="button"><span\n                                        class="button__text">\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C</span></button>--></div></div><div class="notific font--center mrg__top10 mrg__bottom45">Mail.cz \u043D\u0438 \u043F\u0440\u0438 \u043A\u0430\u043A\u0438\u0445 \u043E\u0431\u0441\u0442\u043E\u044F\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u0430\u0445 \u043D\u0435 \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u0442 \u0442\u0440\u0435\u0442\u044C\u0438\u043C \u043B\u0438\u0446\u0430\u043C \u043D\u0438\u043A\u0430\u043A\u0438\u0445 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445 \u0441\u0432\u043E\u0438\u0445 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439, \u043A\u0440\u043E\u043C\u0435 \u0441\u043B\u0443\u0447\u0430\u0435\u0432, \u043F\u0440\u044F\u043C\u043E \u043F\u0440\u0435\u0434\u0443\u0441\u043C\u043E\u0442\u0440\u0435\u043D\u043D\u044B\u0445 \u0432<br><a class="notific__link" href="">\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0435 \u041A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438.</a></div></div></form></div></div></section><!----><section class="layout-settings__col width--aut"><!-- \u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0431\u043B\u043E\u043A \u0441 \u043F\u0440\u0430\u0432\u0430 --><div class="additional-info"><!-- \u0411\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u044C \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430 --><div class="additional-info__block"><div class="main-title-text main-title-text__icon"><img class="main-title-text__icon--size27" src="images/safety-g.svg" alt=""> \u0411\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u044C \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430</div><!--<div class="additional-info__block__option">--><!--<a class="additional-info__block__link link&#45;&#45;disabled" href="#">\u0410\u043A\u043A\u0430\u0443\u043D\u0442 \u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u0437\u0430\u0449\u0438\u0449\u0435\u043D</a>--><!--<a class="additional-info__block__link" href="#">\u0421\u043C\u0435\u043D\u0438\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C</a>--><!--<a class="additional-info__block__link" href="#">\u041F\u0440\u0438\u0432\u044F\u0437\u0430\u0442\u044C \u0437\u0430\u043F\u0430\u0441\u043D\u043E\u0439 e-mail</a>--><!--<a class="additional-info__block__link" href="#">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430</a>--><!--</div>--><div class="additional-info__block__option"><a class="additional-info__block__link link link--disabled" href="#">\u0410\u043A\u043A\u0430\u0443\u043D\u0442 \u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u0437\u0430\u0449\u0438\u0449\u0435\u043D</a> <a class="additional-info__block__link link mrg__bottom10" href="#">\u0421\u043C\u0435\u043D\u0438\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C</a><div class="additional-info__block__link"><span class="additional-info__block__title">additional@mail.com</span> <button class="additional-info__block__link link btn btn--not-style">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C/\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0437\u0430\u043F\u0430\u0441\u043D\u043E\u0439 e-mail</button></div><div class="additional-info__block__link"><span class="additional-info__block__title">+38050*** **23</span> <button class="additional-info__block__link link btn btn--not-style">\u0414\u043E\u0431\u0430\u0432\u0438\u0442/\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430</button></div></div></div><!-- \u0414\u0440\u0443\u0433\u0438\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 --><div class="additional-info__block"><div class="main-title-text main-title-text__icon"><img class="main-title-text__icon--size27" src="images/other-settings.svg" alt=""> \u0414\u0440\u0443\u0433\u0438\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438</div><div class="additional-info__block__option"><a class="additional-info__block__link" href="#">\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0430\u043A\u043A\u0430\u0443\u043D\u0442</a></div></div><!-- \u041F\u0440\u0438\u0432\u044F\u0437\u0430\u0442\u044C \u043F\u0440\u043E\u0444\u0438\u043B\u044C--><div class="additional-info__block"><div class="main-title-text main-title-text__icon"><img class="main-title-text__icon--size27 hide-elm" src="images/other-settings.svg" alt=""> \u041F\u0440\u0438\u0432\u044F\u0437\u0430\u0442\u044C \u043F\u0440\u043E\u0444\u0438\u043B\u044C</div><div class="additional-info__block__snap-profile"><div class="social-icons"><button class="social-icons__icon social-icons--vk-icon social-icons--btn-tied btn" type="button"></button> <button class="social-icons__icon social-icons--fb-icon btn" type="button"></button> <button class="social-icons__icon social-icons--tw-icon btn" type="button"></button> <button class="social-icons__icon social-icons--gp-icon btn" type="button"></button></div></div></div><!-- \u0427\u0435\u043A\u0431\u043E\u043A\u0441\u044B --><div class="additional-info__block"><div class="font--bold font--size13">\u0420\u0430\u0437\u0440\u0435\u0448\u0438\u0442\u044C \u0434\u043E\u0441\u0442\u0443\u043F \u043A \u043F\u043E\u0447\u0442\u043E\u0432\u043E\u043C\u0443 \u044F\u0449\u0438\u043A\u0443 \u0441 \u043F\u043E\u043C\u043E\u0449\u044C\u044E \u043F\u043E\u0447\u0442\u043E\u0432\u044B\u0445 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432</div><form class="additional-info__allow form" action=""><label class="checkbox checkbox_theme_islands checkbox_size_m i-bem mrg__bottom5" data-bem=\'{"checkbox":{}}\'><span class="checkbox__box"><input class="checkbox__control" type="checkbox" autocomplete="off" name="name1" value="val_1"> </span><span class="checkbox__text" role="presentation">\u0421 \u0441\u0435\u0440\u0432\u0435\u0440\u0430 imap.yandex.ru \u043F\u043E \u043F\u0440\u043E\u0442\u043E\u043A\u043E\u043B\u0443 IMAP</span></label><label class="checkbox checkbox_theme_islands checkbox_size_m i-bem mrg__bottom5" data-bem=\'{"checkbox":{}}\'><span class="checkbox__box"><input class="checkbox__control" type="checkbox" autocomplete="off" name="name1" value="val_1"> </span><span class="checkbox__text" role="presentation">\u0421 \u0441\u0435\u0440\u0432\u0435\u0440\u0430 pop.yandex.ru \u043F\u043E \u043F\u0440\u043E\u0442\u043E\u043A\u043E\u043B\u0443 POP3</span></label></form></div></div></section><!----><section class="layout-settings__row separate--top mrg__top30"><!-- \u0412\u0430\u0448\u0438 \u043F\u043E\u0434\u043F\u0438\u0441\u0438 --><div class="user-signatures"><div class="user-signatures__title main-title-text">\u0412\u0430\u0448\u0438 \u043F\u043E\u0434\u043F\u0438\u0441\u0438</div><div class="user-signatures__edit-text col-md-6 mrg__right20">\u0417\u0434\u0435\u0441\u044C \u0432\u0438\u0434\u0436\u0435\u0442 \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u043F\u043E\u0434\u043F\u0438\u0441\u0438</div><div class="user-signatures__view col-md-6">\u0412\u0438\u0434 \u041D\u0430\u0448\u0435\u0439 \u043F\u043E\u0434\u043F\u0438\u0441\u0438</div></div></section></article><div class="layout__footer"><footer></footer></div>');}]);