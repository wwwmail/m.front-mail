(function () {
    'use strict';

    angular
        .module('app.components')
        .component('avatarUpload', {
            bindings: {
                onClose: '&'
            },
            templateUrl: 'app/components/avatar-upload/avatar-upload.html',
            controller: 'AvatarUploadController',
            controllerAs: 'vm'
        });
})();