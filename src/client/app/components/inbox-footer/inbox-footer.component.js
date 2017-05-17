(function () {
    'use strict';

    angular
        .module('app.components')
        .component('inboxFooter', {
            bindings: {
                messages: '='
            },
            templateUrl: 'app/components/inbox-footer/inbox-footer.html',
            controller: 'InboxFooterController',
            controllerAs: 'vm'
        });
})();