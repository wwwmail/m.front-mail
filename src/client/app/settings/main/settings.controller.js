(function () {
    'use strict';

    angular
        .module('settings.main')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['$uibModal', '$sce', '$auth', 'profile', '$translatePartialLoader', '$translate'];
    /* @ngInject */
    function SettingsController($uibModal, $sce, $auth, profile, $translatePartialLoader, $translate) {
        var vm = this;

        // $translatePartialLoader.addPart('settings');
        // $translate.refresh();

        vm.openAvatarUploadPopup = openAvatarUploadPopup;
        vm.openPasswordChangePopup = openPasswordChangePopup;
        // vm.openEmailChangePopup = openEmailChangePopup;
        vm.openEmailAddPopup = openEmailAddPopup;
        vm.openPhoneChangePopup = openPhoneChangePopup;
        vm.destroy = destroy;
        vm.getTrustHtml = getTrustHtml;
        vm.updateSign = updateSign;
        vm.removeAvatar = removeAvatar;
        vm.destroyEmail = destroyEmail;

        activate();

        function activate() {
            vm.user = $auth.user;
        }

        function openAvatarUploadPopup() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/components/avatar-upload/avatar-upload-popup.html',
                controller: function ($scope, $uibModalInstance) {
                    $scope.cancel = cancel;

                    function cancel() {
                        $uibModalInstance.dismiss('cancel');
                    }
                },
                size: 'sm',
                windowClass: 'popup popup--avatar-upload'
            });
        }

        function openPasswordChangePopup() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/components/password-change/password-change-popup.html',
                controller: function ($scope, $uibModalInstance) {
                    $scope.cancel = cancel;

                    function cancel() {
                        $uibModalInstance.dismiss('cancel');
                    }
                },
                size: 'sm',
                windowClass: 'popup popup--password-change'
            });
        }

        function openEmailAddPopup() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/components/email-add/email-add-popup.html',
                controller: function ($scope, $uibModalInstance) {
                    $scope.cancel = cancel;
                    $scope.close = close;

                    function cancel() {
                        $uibModalInstance.dismiss('cancel');
                    }

                    function close() {
                        $uibModalInstance.close();
                    }
                },
                size: 'sm',
                windowClass: 'popup popup--email-change'
            });

            modalInstance.result.then(function (response) {
                // console.log('response', response);
                profile.get().then(function () {
                    vm.user = $auth.user;
                });
            });
        }

        function openPhoneChangePopup() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/components/phone-change/phone-change-popup.html',
                controller: function ($scope, $uibModalInstance) {
                    $scope.cancel = cancel;

                    function cancel() {
                        $uibModalInstance.dismiss('cancel');
                    }
                },
                size: 'sm',
                windowClass: 'popup popup--phone-change'
            });
        }

        function removeAvatar() {
            profile.put({}, {photo: null});
        }

        function destroy() {
            profile.destroy();
        }

        function getTrustHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function updateSign() {
            vm.user.profile.sign = vm.signature ? vm.signature : '';

            var data = {};

            data.sign = '-- <br>' + angular.copy(vm.user.profile.sign);

            profile.put({}, data);
        }

        function destroyEmail() {
            profile.put({}, {
                deleteAdditionalEmails: 1
            });
        }
    }
})();
