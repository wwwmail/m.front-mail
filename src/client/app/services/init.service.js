(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('init', init);

    init.$inject = ['$q'];

    function init($q) {
        var d = $q.defer();

        return {
            $defer: d,
            $promise: d.promise
        }
    }
})();