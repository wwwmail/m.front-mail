(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('MenuMainController', MenuMainController);

    MenuMainController.$inject = ['mailBox'];

    /* @ngInject */
    function MenuMainController(mailBox) {
        var vm = this;
        vm.title = 'Menu';

        vm.icons = [
            {
                name: 'INBOX',
                icon: 'icon-incoming'
            },
            {
                name: 'INBOX.Drafts',
                icon: 'icon-draft'
            },
            {
                name: 'INBOX.Trash',
                icon: 'icon-bin'
            },
            {
                name: 'INBOX.Sent',
                icon: 'icon-sent'
            },
            {
                name: 'INBOX.Junk',
                icon: 'icon-spam'
            }
        ];

        vm.folders = {};

        activate();

        function activate() {
            getMailBox();
        }

        function getMailBox() {
            mailBox.get().then(function (response) {
                vm.folders = _.assign(vm.folders, response);
                setIcons();
            });
        }

        function setIcons() {
            _.merge(vm.folders.items, vm.icons);
        }
    }
})();
