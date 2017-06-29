(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('ChoiceLanguageController', ChoiceLanguageController);

    ChoiceLanguageController.$inject = ['$http', '$timeout', '$translate'];
    /* @ngInject */
    function ChoiceLanguageController($http, $timeout, $translate) {
        var vm = this;

        vm.lang = {
            selected: {},
            items: [
                // {
                //     lang: 'sq',
                //     icon: 'sq.svg'
                // },
                // {
                //     lang: 'bs',
                //     icon: 'bs.svg'
                // },
                // {
                //     lang: 'hr',
                //     icon: 'hr.svg'
                // },
                {
                    lang: 'cs',
                    icon: 'cs.svg'
                },
                {
                    lang: 'sk',
                    icon: 'sk.svg'
                },
                // {
                //     lang: 'sl',
                //     icon: 'sl.svg'
                // },
                {
                    lang: 'en',
                    icon: 'en.svg'
                },
                // {
                //     lang: 'mk',
                //     icon: 'mk.svg'
                // },
                {
                    lang: 'ru',
                    icon: 'ru.svg'
                },
                // {
                //     lang: 'sk',
                //     icon: 'sk.svg'
                // },
                {
                    lang: 'uk',
                    icon: 'uk.svg'
                }
            ]
        };

        vm.selectLang = selectLang;

        activate();

        function activate() {
            $timeout(function () {
                var lang = $translate.use();
                moment.locale(lang);

                $http.defaults.headers.common["Accept-Language"] = lang;

                _.forEach(vm.lang.items, function (item) {
                    if (item.lang === lang) {
                        vm.lang.selected = item;
                    }
                });

            });
        }

        function selectLang(lang) {
            vm.lang.selected = lang;

            $timeout(function () {
                $translate.use(lang.lang);
                moment.locale(lang.lang);

                $http.defaults.headers.common["Accept-Language"] = lang.lang;
            });
        }
    }
})();
