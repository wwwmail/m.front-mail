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
            var e = _.find(timezoneList, function(o) {
                return _.some(o.utc, function(utc) {
                    return utc === $auth.user.profile.timezone;
                });
            });
            return  e.text;
        }

        return {
            get: get,
            getCurrent: getCurrent,
            getTimezoneList: getTimezoneList
        }
    }

})();