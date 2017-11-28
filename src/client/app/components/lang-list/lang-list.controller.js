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
