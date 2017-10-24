(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('ChoiceLanguageController', ChoiceLanguageController);

    ChoiceLanguageController.$inject = ['$translate', 'lang'];
    /* @ngInject */
    function ChoiceLanguageController($translate, lang) {
        var vm = this;

        vm.lang = {
            selected: {},
            items: []
        };

        vm.selectLang = selectLang;

        activate();

        ////

        function activate() {
            vm.lang.items = lang.getList();

            var useLang = $translate.use();

            _.forEach(vm.lang.items, function (item) {
                if (item.lang === useLang) {
                    vm.lang.selected = item;
                }
            });

            sortLang(useLang);
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
