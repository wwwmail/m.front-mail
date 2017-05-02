(function () {
    'use strict';

    angular
        .module('app.core')
        .constant('CONFIG',
            {
                DebugMode: true,
                APIHost: 'http://apimail.devogic.com',
                MediaUrl: 'http://apimail.devogic.com/'
            }
        );
})();
