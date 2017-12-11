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
