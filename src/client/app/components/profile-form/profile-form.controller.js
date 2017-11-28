(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('ProfileFormController', ProfileFormController);

    ProfileFormController.$inject = ['$auth', '$state', 'profile', 'country'];
    /* @ngInject */
    function ProfileFormController($auth, $state, profile, country) {
        var vm = this;

        vm.profileForm = {};

        vm.monthList = moment.months();
        vm.countryList = [];
        vm.citiesList = [];

        vm.logout = logout;
        vm.save = save;
        vm.resetForm = resetForm;

        activate();

        function activate() {
            vm.profile = $auth.user.profile;
            vm.profileForm = angular.copy($auth.user.profile);

            getCountries();
        }

        function logout() {
            profile.destroyStorageProfile($auth.user);
            $auth.signOut();
            $state.go('signIn');
        }

        function save() {
            var data = {
                first_name: vm.profileForm.first_name,
                last_name: vm.profileForm.last_name,
                gender: vm.profileForm.gender,
                country: vm.profileForm.country,
                city: vm.profileForm.city,
                user_name: vm.profileForm.user_name
            };

            if (vm.profileForm.bDay && vm.profileForm.bMonth && vm.profileForm.bYear) {
                var date = moment(vm.profileForm.bDay + ' ' + vm.profileForm.bMonth + ' ' + vm.profileForm.bYear);
                data.birthday = date.format('YYYY-MM-DD');
            }

            profile.put({}, data);
        }

        function resetForm() {
            vm.profileForm = angular.copy($auth.user.profile);
        }

        function getCountries() {
            country.get().then(function (response) {
                vm.countryList = [];
                _.forEach(response, function (item) {
                    vm.countryList.push(item.name);
                });
            });
        }
    }
})();
