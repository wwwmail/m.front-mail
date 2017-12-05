(function () {
    'use strict';

    angular
        .module('app.core', [
            'ngSanitize',
            'ngResource',
            'ui.router',
            'ui.bootstrap',
            'ui.mask',
            'toastr',
            'checklist-model',
            'blocks.logger',
            'blocks.router',
            'ng-token-auth',
            'ngFileUpload',
            'ngImgCrop',
            'ui.select',
            'dcbImgFallback',
            'ngFileSaver',
            'infinite-scroll',
            'content-editable',
            'LocalStorageModule',
            'ngTagsInput',
            'pascalprecht.translate',
            'ngCookies',
            'ngPasswordStrength',
            'angular-google-adsense'
        ]);
})();
