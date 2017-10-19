(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('ChoiceLanguageController', ChoiceLanguageController);

    ChoiceLanguageController.$inject = ['$http', '$timeout', '$translate', 'lang', 'config'];
    /* @ngInject */
    function ChoiceLanguageController($http, $timeout, $translate, lang, config) {
        var vm = this;

        vm.config = {};

        vm.lang = {
            selected: {},
            items: []
        };

        vm.selectLang = selectLang;

        activate();

        function activate() {
            vm.config = config.getConfig();

            if (!$translate.use()) {
                selectLang(
                    lang.getLangByIco(vm.config.language)
                );
            }

            vm.lang.items = lang.getList();

            $timeout(function () {
                var useLang = $translate.use();

                moment.locale(useLang);

                $http.defaults.headers.common["Accept-Language"] = useLang;

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

            $timeout(function () {
                $translate.use(selectLang.lang);

                moment.locale(selectLang.lang);

                $http.defaults.headers.common["Accept-Language"] = selectLang.lang;

                sortLang(selectLang.lang);
            });
        }

        function sortLang(useLang) {
            vm.lang.items = _.sortBy(vm.lang.items, {'lang': useLang});
        }
    }
})();
