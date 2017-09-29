(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('AttachItemController', AttachItemController);

    AttachItemController.$inject = ['$auth', 'CONFIG'];
    /* @ngInject */
    function AttachItemController($auth, CONFIG) {
        var vm = this;

        vm.formats = [
            'accdb',
            'avi',
            'bat',
            'bmp',
            'CDA',
            'chm',
            'css',
            'djvu',
            'doc',
            'docx',
            'eps',
            'exe',
            'fb2',
            'gif',
            'hlp',
            'htm',
            'html',
            'jpeg',
            'jpg',
            'mdb',
            'mdv',
            'mov',
            'mp3',
            'mpeg',
            'mpg',
            'odp',
            'ods',
            'odt',
            'other',
            'pdf',
            'png',
            'ppt',
            'pptx',
            'rar',
            'rtf',
            'svg+xml',
            'tiff',
            'ttf',
            'txt',
            'wav',
            'wma',
            'xls',
            'xlsx',
            'zip'
        ];

        vm.getFileExt = getFileExt;
        // vm.openGallery = openGallery;

        activate();

        function activate() {
            vm.user = $auth.user;
            vm.CONFIG = CONFIG;

            findFormat();
        }

        // function openGallery() {
        //     gallery.openGallery({
        //         attachIndex: vm.index,
        //         attach: vm.attach,
        //         attachments: vm.attachments,
        //         message: vm.message
        //     });
        // }

        function getFileExt() {
            return vm.attach.mime.split('/')[1];
        }

        function findFormat() {
            var isFind = false;
            _.forEach(vm.formats, function (item) {
                if (item === vm.attach.mime.split('/')[1]) {
                    isFind = true;
                }
            });

            vm.isIcon = isFind;
            console.log('isFind', isFind);
        }
    }
})();
