(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('AttachItemController', AttachItemController);

    AttachItemController.$inject = ['$auth', 'CONFIG'];
    /* @ngInject */
    function AttachItemController($auth, CONFIG) {
        var vm = this;

        vm.assocFormats = [
            {
                id: 1,
                name: 'doc'
            }
        ];

        vm.formats = [
            {name: 'accdb'},
            {name: 'avi'},
            {name: 'bat'},
            {name: 'bmp'},
            {name: 'CDA'},
            {name: 'chm'},
            {name: 'css'},
            {name: 'djvu'},
            {
                name: 'doc',
                assocId: 1
            },
            {
                name: 'docx',
                assocId: 1
            },
            {
                name: 'msword',
                assocId: 1
            },
            {
                name: 'vnd.openxmlformats-officedocument.wordprocessingml.document',
                assocId: 1
            },
            {name: 'eps'},
            {name: 'exe'},
            {name: 'fb2'},
            {name: 'gif'},
            {name: 'hlp'},
            {name: 'htm'},
            {name: 'html'},
            {name: 'jpeg'},
            {name: 'jpg'},
            {name: 'mdb'},
            {name: 'mdv'},
            {name: 'mov'},
            {name: 'mp3'},
            {name: 'mpeg'},
            {name: 'mpg'},
            {name: 'odp'},
            {name: 'ods'},
            {name: 'odt'},
            {name: 'other'},
            {name: 'pdf'},
            {name: 'png'},
            {name: 'ppt'},
            {name: 'pptx'},
            {name: 'rar'},
            {name: 'rtf'},
            {name: 'svg+xml'},
            {name: 'tiff'},
            {name: 'ttf'},
            {name: 'txt'},
            {name: 'wav'},
            {name: 'wma'},
            {name: 'xls'},
            {name: 'xlsx'},
            {name: 'zip'}
        ];

        vm.fileFormat = null;

        ////

        activate();

        function activate() {
            vm.user = $auth.user;
            vm.CONFIG = CONFIG;

            findFormat();
        }

        function findFormat() {
            var result = _.find(vm.formats, function (item) {
                return item.name === vm.attach.mime.split('/')[1];
            });

            if (result) {
                if (result.assocId) {
                    vm.fileFormat = _.result(_.find(vm.assocFormats, {id: result.assocId}), 'name');
                    console.log('vm.fileFormat', vm.fileFormat);
                    return;
                }
                vm.fileFormat = result.name;
                return;
            }

            return vm.fileFormat = 'other';
        }
    }
})();
