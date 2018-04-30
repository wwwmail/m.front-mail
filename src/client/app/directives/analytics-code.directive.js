(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('analyticsCode', analyticsCode);

    analyticsCode.$inject = ['$sce', '$compile', '$timeout', 'CONFIG', 'config'];

    /* @ngInject */
    function analyticsCode($sce, $compile, $timeout, CONFIG, config) {
        var directive = {
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {

            activate();

            ////

            function activate() {
                config.getIndex().then(function (value) {
                    if (value.data.analiticsId) {
                        pasteHtml(
                            getHtmlCode(
                                value.data.analiticsId
                            )
                        );
                    }
                });
            }

            function pasteHtml(html) {
                $timeout(function () {
                    element.html(
                        html
                    );
                });
            }

            function getHtmlCode(id) {
                return [
                    "<!-- Global site tag (gtag.js) - Google Analytics -->",
                    "<script async src=\"https://www.googletagmanager.com/gtag/js?id=" + id + "\"></script>",
                    "<script>",
                    "window.dataLayer = window.dataLayer || [];",
                    "function gtag(){dataLayer.push(arguments);}",
                    "gtag('js', new Date());",
                    "gtag('config', '" + id + "');",
                    "</script>"
                ].join(" ");
            }
        }
    }

})();
