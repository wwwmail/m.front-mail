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
