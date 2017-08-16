(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('timezone', timezone);

    timezone.$inject = ['CONFIG', '$resource', '$http', '$auth', '$rootScope'];

    function timezone(CONFIG, $resource, $http, $auth, $rootScope) {

        var timezoneList = null;

        $rootScope.$on('auth:validation-success', function () {
            var tz = _.find(timezoneList, {'value': $auth.user.profile.timezone});
            moment.tz.setDefault(tz.utc[0]);
            console.log('tz', tz);
        });

        $rootScope.$on('auth:login-success', function () {
            var tz = _.find(timezoneList, {'value': $auth.user.profile.timezone});
            moment.tz.setDefault(tz.utc[0]);
        });

        function get(params, data) {
            return $http.get('/json/timezone.json', data).then(function (response) {
                timezoneList = response.data;
                return response.data;
            });
        }

        function getTimezoneList() {
            return timezoneList;
        }

        function getCurrent() {
            console.log('getCurrent', _.result(_.find(timezoneList, {'value': $auth.user.profile.timezone}), 'text'));
            return _.result(_.find(timezoneList, {'value': $auth.user.profile.timezone}), 'text');
        }

        return {
            get: get,
            getCurrent: getCurrent,
            getTimezoneList: getTimezoneList
        }
    }

})();

