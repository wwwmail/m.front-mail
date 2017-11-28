(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('UserConnectionDefaultController', UserConnectionDefaultController);

    UserConnectionDefaultController.$inject = ['$auth', 'profile'];
    /* @ngInject */
    function UserConnectionDefaultController($auth, profile) {
        var vm = this;

        vm.connections = {
            selected: {},
            items: []
        };

        vm.update = update;

        ////

        activate();

        function activate() {
            vm.user = $auth.user;
            getList();
        }

        function getList() {
            var userConnection = {
                id: vm.user.profile.default_connection_id,
                email: vm.user.profile.email
            };

            vm.connections.items.push(userConnection);

            vm.connections.items = vm.connections.items.concat(vm.user.profile.connections);

            _.forEach(vm.connections.items, function (connection) {
                if (vm.user.profile.selected_connection_id === connection.id) {
                    vm.connections.selected = connection;
                }
            });

            if (!vm.user.profile.selected_connection_id) {
                vm.connections.selected = userConnection;
            }

            // console.log('connections', vm.connections);
        }

        function update(connection) {
            var data = {};
            data.selected_connection_id = connection.id;
            profile.put({}, data);
        }
    }
})();
