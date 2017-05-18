(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('AttachUploadController', AttachUploadController);

    AttachUploadController.$inject = ['$auth', '$state'];
    /* @ngInject */
    function AttachUploadController($auth, $state) {
        var vm = this;

        vm.getLink = getLink;
        vm.remove = remove;

        activate();

        function activate() {
            vm.user = $auth.user;
            vm.$state = $state;
        }

        function getLink(attachment) {
            var link = [
                "http://apimail.devogic.com/mail/",
                attachment.number,
                "?mbox=",
                vm.$state.params.mbox ? vm.$state.params.mbox : 'Drafts',
                "&part=attach&filename=",
                attachment.fileName,
                "&token=",
                vm.user.access_token,
                "&connection_id=",
                vm.message.model.connection_id
            ].join("");

            console.log('link', link);

            return link;
        }

        function remove(attachment) {
            _.remove(vm.attachmentsData, function (item) {
                return item === attachment;
            });
        }
    }
})();
