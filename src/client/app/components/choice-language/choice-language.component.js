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