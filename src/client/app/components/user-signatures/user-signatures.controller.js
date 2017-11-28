(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('UserSignaturesController', UserSignaturesController);

    UserSignaturesController.$inject = ['$auth', '$timeout', '$sce', 'profile', 'sign', 'connection'];
    /* @ngInject */
    function UserSignaturesController($auth, $timeout, $sce, profile, sign, connection) {
        var vm = this;

        vm.signatureForm = {
            model: {
                sign: ""
            }
        };

        vm.signatures = {
            items: []
        };

        vm.connections = {};

        vm.getTrustHtml = getTrustHtml;
        vm.save = save;
        vm.add = add;
        vm.edit = edit;
        vm.destroy = destroy;
        vm.getEmailBySign = getEmailBySign;

        ////

        activate();

        function activate() {
            vm.user = $auth.user;

            getList();
            getConnectionsList();
        }

        function getList() {
            sign.get().then(function (response) {
                vm.signatures.items = response.data;
                vm.signatures.items.reverse();
                console.log('signatures', vm.signatures.items);
            });
        }

        function add() {
            var data = {};

            data.sign = vm.signatureForm.model.sign;

            if (vm.signatureForm.model.isSignConnected) {
                data.connection_id = vm.signatureForm.model.connection_id;
                updateConnectionSign(data);
            }

            sign.post({}, data).then(function (response) {
                vm.signatures.items.unshift(response.data);
                vm.signatureForm.model.sign = '';

                $timeout(function () {
                    getList();
                    getConnectionsList();
                }, 250);
            });
        }

        function edit(model) {
            _.forEach(vm.signatures.items, function (item) {
                item.isEdit = false;
            });
            model.isEdit = true;
        }

        function save(model) {
            var data = {};

            data.id = model.id;
            data.sign = model.sign;
            data.connection_id = model.connection_id;

            console.log('data', data);

            if (model.isSignConnected) {
                data.connection_id = model.connection_id;
                updateConnectionSign(data);
            }

            sign.put({}, {id: data.id, sign: data.sign}).then(function (response) {
                model.isEdit = false;

                $timeout(function () {
                    getList();
                    getConnectionsList();
                }, 250);
            });
        }

        function destroy(model) {
            if (_.isEqual(model.sign, vm.user.profile.sign)) {
                profile.put({}, {
                    sign: ''
                });
            }

            sign.destroy({id: model.id}).then(function (response) {
                _.remove(vm.signatures.items, function (item) {
                    return model === item;
                });
            });
        }

        function getTrustHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function getConnectionsList() {
            vm.connections.items = [];

            var userConnection = {
                id: vm.user.profile.default_connection_id,
                email: vm.user.profile.email,
                sign: vm.user.profile.sign
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

            vm.signatureForm.model.connection_id = vm.connections.selected.id;
        }

        function updateConnectionSign(data) {
            if (vm.user.profile.default_connection_id === data.connection_id) {
                profile.put({}, {
                    sign: data.sign
                });
                return;
            }

            connection.update({id: data.connection_id}, {sign: data.sign});

            profile.put({}, {
                sign: ''
            });
        }

        function getEmailBySign(data) {
            return _.result(_.find(vm.connections.items, {'sign': data.sign}), 'email');
        }
    }
})();
