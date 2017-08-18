(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('timezone', timezone);

    timezone.$inject = ['CONFIG', '$resource', '$http', '$auth', '$rootScope'];

    function timezone(CONFIG, $resource, $http, $auth, $rootScope) {

        var timezoneList = null;

        $rootScope.$on('auth:validation-success', function () {
            moment.tz.setDefault($auth.user.profile.timezone);
        });

        $rootScope.$on('auth:login-success', function () {
            moment.tz.setDefault($auth.user.profile.timezone);
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

