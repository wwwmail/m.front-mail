(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('ContactToAddSelectController', ContactToAddSelectController);

    ContactToAddSelectController.$inject = ['$uibModal', '$scope', 'contact'];
    /* @ngInject */
    function ContactToAddSelectController($uibModal, $scope, contact) {
        var vm = this;

        vm.contacts = {
            items: {}
        };

        // vm.addresses = [];

        vm.selectContact = {};

        vm.getContacts = getContacts;
        vm.findContacts = findContacts;
        vm.makeContact = makeContact;
        vm.openContactToAddPopup = openContactToAddPopup;

        // $scope.$watch('vm.contacts.items', function (data) {
        //
        // }, true);

        activate();

        function activate() {
            getContacts();
        }

        function getContacts() {
            contact.get().then(function (response) {
                vm.contacts.items = response.data;

                // vm.contacts.items.push({isMore: true});

                // console.log(vm.contacts.items);
            });
        }

        function findContacts(q) {
            if (q) {
                contact.get({q: q}).then(function (response) {
                    vm.contacts.items = response.data;
                });
            }

            getContacts();
        }

        function makeContact(email) {
            return {
                first_name: email,
                emails: [{value: email}]
            };
        }

        function openContactToAddPopup() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/components/contact-to-add/contact-to-add-popup.html',
                controller: function ($scope, $uibModalInstance, addresses) {
                    $scope.addresses = addresses;

                    $scope.cancel = cancel;
                    $scope.close = close;

                    function close(result) {
                        $uibModalInstance.close(result);
                    }

                    function cancel() {
                        $uibModalInstance.dismiss('cancel');
                    }
                },
                size: 'sm',
                windowClass: 'popup popup--contact-group-add',
                resolve: {
                    addresses: function () {
                        return vm.addresses;
                    }
                }
            });

            modalInstance.result.then(function (response) {
                vm.addresses = response;
            });
        }
    }
})();
