(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('MenuSettingsController', MenuSettingsController);

    MenuSettingsController.$inject = ['$uibModal', '$auth', '$timeout', 'lang', '$rootScope', 'timezone', 'CONFIG'];

    /* @ngInject */
    function MenuSettingsController($uibModal, $auth, $timeout, lang, $rootScope, timezone, CONFIG) {
        var vm = this;

        vm.getTimezoneName = getTimezoneName;
        vm.openPasswordChangePopup = openPasswordChangePopup;

        vm.closeSettingsMenu = closeSettingsMenu;

        $rootScope.$on('$translateLoadingSuccess', function (e, data) {
            $timeout(function () {
                vm.useLang = lang.getCurrentLang();
            });
        });

        activate();

        ////

        function activate() {
            vm.user = $auth.user;
            vm.profile = $auth.user.profile;

            vm.useLang = lang.getCurrentLang();
            vm.CONFIG = CONFIG;
        }

        function closeSettingsMenu() {
            $rootScope.isOpenSettingsMenu = false;
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

        function getTimezoneName() {
            return timezone.getCurrent();
        }
    }
})();
