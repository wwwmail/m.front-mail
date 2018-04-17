(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('search', search);

    search.$inject = ['CONFIG', '$resource', '$rootScope', '$auth', '$state'];

    function search(CONFIG, $resource, $rootScope, $auth, $state) {
        
        function query(params) {
            var data = params ? params : getParams();

            $state.go('.', data, {notify: false});

            $rootScope.$broadcast('search:mail', {
                search: data
            });
        }

        function getParams() {
            var data = {};

            if ($state.params.search) {
                data.search = $state.params.search;
            }

            if ($state.params.search_part) {
                data.search_part = $state.params.search_part;
            }

            if ($state.params.search_tag_id) {
                data.search_tag_id = $state.params.search_tag_id;
            }

            if ($state.params.search_start) {
                data.search_start = $state.params.search_start;
            }

            if ($state.params.search_end) {
                data.search_end = $state.params.search_end;
            }

            if ($state.params.smbox) {
                data.smbox = $state.params.smbox;
            }
            if ($state.params.filter) {
                data.filter = $state.params.filter;
            }

            return data;
        }

        return {
            query: query
        }
    }

})();