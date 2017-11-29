(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('TimezoneListController', TimezoneListController);

    TimezoneListController.$inject = ['$state', 'profile', 'timezone'];
    /* @ngInject */
    function TimezoneListController($state, profile, timezone) {
        var vm = this;

        vm.timezoneList = [];

        vm.setTimezone = setTimezone;

        activate();

        function activate() {
            getTimezoneList();
        }

        function getTimezoneList() {
            vm.timezoneList = timezone.getTimezoneList();
        }

        function setTimezone(tz) {
            moment.tz.setDefault(tz.utc[0]);

            profile.put({}, {timezone: tz.utc[0]});

            close();
        }

        function close() {
            vm.onClose();
        }
    }
})();
