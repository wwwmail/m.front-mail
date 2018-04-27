(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('analyticsCode', analyticsCode);

    analyticsCode.$inject = ['$compile', '$timeout', 'CONFIG', 'config'];

    /* @ngInject */
    function analyticsCode($compile, $timeout, CONFIG, config) {
        var directive = {
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {

            var html = [
                "<!-- Global site tag (gtag.js) - Google Analytics -->",
                "<script async src=\"https://www.googletagmanager.com/gtag/js?id={{ id }}\"></script>",
                "<script>",
                "window.dataLayer = window.dataLayer || [];",
                "function gtag(){dataLayer.push(arguments);}",
                "gtag('js', new Date());",
                "gtag('config', 'UA-114945160-1');",
                "</script>"
            ].join(" ");

            activate();

            ////

            function activate() {
                config.getIndex().then(function (value) {
                    console.log('value', value);
                    if (value.analiticsId) {
                        pasteHtml(html);
                    }
                });
            }

            function pasteHtml(html) {
                $timeout(function () {
                    element.html(
                        $compile(html)(scope)
                    );
                });
            }
        }
    }

})();
