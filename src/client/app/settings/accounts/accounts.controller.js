(function () {
    'use strict';

    angular
        .module('settings.accounts')
        .controller('AccountsController', AccountsController);

    AccountsController.$inject = ['$scope', 'connection'];
    /* @ngInject */
    function AccountsController($scope, connection) {
        var vm = this;

        vm.isConnected = false;

        vm.accountsConf = {
            isFirst: true,
            selected: null,
            list: [
                {
                    parts: [
                        'seznam.cz',
                        'email.cz',
                        'post.cz'
                    ],
                    imap: 'imap.seznam.cz',
                    port: 993
                },
                {
                    parts: [
                        'gmail.com'
                    ],
                    imap: 'imap.gmail.com',
                    port: 993
                },
                {
                    parts: [
                        'volny.cz'
                    ],
                    imap: 'imap.volny.cz',
                    port: 993
                },
                {
                    parts: [
                        'centrum.cz'
                    ],
                    imap: 'imap.centrum.cz',
                    port: 993
                },
                {
                    parts: [
                        'centrum.cz'
                    ],
                    imap: 'imap.centrum.cz',
                    port: 993
                },
                {
                    parts: [
                        'tiscali.cz',
                        'wo.cz'
                    ],
                    imap: 'imap.tiscali.cz',
                    port: 993
                }
            ]
        };

        vm.accountForm = {
            model: {
                enable: 0
            }
        };

        vm.accounts = {
            items: []
        };

        // $scope.$watch('vm.accountForm.model.email', function (data, oldData) {
        //     console.log('data', data);
        //     _.forEach(vm.accountsConf, function (item) {
        //         console.log('find', _.find(item, data));
        //     });
        //
        //     // accountsConf();
        // }, true);

        vm.create = create;
        vm.destroy = destroy;
        vm.enableTrigger = enableTrigger;
        vm.getConf = getConf;

        activate();

        function activate() {
            get();
        }

        function get() {
            connection.get()
                .then(function (response) {
                    vm.accounts.items = response.data;
                });
        }

        function create() {
            connection.create({}, vm.accountForm.model)
                .then(function (response) {
                    vm.isConnected = true;

                    vm.accounts.items.push(response.data);

                    vm.accountForm = {
                        model: {
                            enabled: false
                        }
                    };

                    vm.error = {};

                }, function (response) {
                    vm.error = response.data.data;
                    console.log('response', response);
                });
        }

        function enableTrigger(account) {
            console.log('account', account);
            connection.update({id: account.id}, {enable: account.enable})
                .then(function (response) {
                    // account.enable = !account.enable;
                });
        }

        function destroy(account) {
            connection.destroy({id: account.id})
                .then(function (response) {
                    _.remove(vm.accounts.items, function (item) {
                        return account.id === item.id;
                    });
                });
        }

        function getConf(form) {
            vm.accountsConf.selected = null;

            vm.accountsConf.isFirst = false;

            if (form.email.$invalid) return;

            var emailPart = vm.accountForm.model.email.split('@');

            _.forEach(vm.accountsConf.list, function (item) {
                _.forEach(item.parts, function (part) {
                    if (part === emailPart[1]) {
                        vm.accountsConf.selected = item;
                    }
                });
            });

            if (vm.accountsConf.selected) {
                vm.accountForm.model.login = vm.accountForm.model.email.split('@')[0];
                vm.accountForm.model.server = vm.accountsConf.selected.imap;
                vm.accountForm.model.port = vm.accountsConf.selected.port.toString();
                return;
            }

            vm.accountForm.model.login = emailPart[0];
            vm.accountForm.model.server = '';
            vm.accountForm.model.port = '';

            // vm.accountsConf.selected = null;

            console.log('vm.accountsConf.selected', vm.accountsConf.selected);
        }
    }
})();
