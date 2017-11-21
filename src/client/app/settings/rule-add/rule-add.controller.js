(function () {
    'use strict';

    angular
        .module('settings.ruleAdd')
        .controller('RuleAddController', RuleAddController);

    RuleAddController.$inject = ['sieve', '$state', 'mailBox', 'tag'];
    /* @ngInject */
    function RuleAddController(sieve, $state, mailBox, tag) {
        var vm = this;

        vm.$state = $state;

        vm.tags = {};

        vm.folders = {};

        vm.standartFolders = [
            {
                name: 'INBOX',
                icon: 'icon-inbox-old'
            },
            {
                name: 'Drafts',
                icon: 'icon-draft-line'
            },
            {
                name: 'Trash',
                icon: 'icon-basket'
            },
            {
                name: 'Sent',
                icon: 'icon-sent-old'
            },
            {
                name: 'Junk',
                icon: 'icon-spam'
            },
            {
                name: 'Outbox',
                icon: 'icon-up'
            },
            {
                name: 'Archive',
                icon: 'icon-up'
            },
            {
                name: 'Templates',
                icon: 'icon-up'
            }
        ];

        vm.spamAccept = {
            list: [
                {
                    name: 'RULE_FOR_ONLY_SPAM',
                    value: 'only'
                },
                {
                    name: 'RULE_ALL_NOT_SPAM',
                    value: 'except'
                },
                {
                    name: 'RULE_ALL_MAILS',
                    value: 'include'
                }
            ]
        };

        vm.attachmentAccept = {
            list: [
                {
                    name: 'RULE_IS_ALL_ATTACH',
                    value: 'all'
                },
                {
                    name: 'RULE_IS_ATTACH',
                    value: 'with'
                },
                {
                    name: 'RULE_IS_NOT_ATTACH',
                    value: 'without'
                }
            ]
        };

        vm.sieveRules = {
            list: [
                {
                    name: 'NAME_OF_ATTACHMENT',
                    value: 'attachment'
                },
                {
                    name: 'BODY_LETTER',
                    value: 'body'
                },
                {
                    name: 'IS_COPY',
                    value: 'copy'
                },
                {
                    name: 'FROM_WHOM_U',
                    value: 'from'
                },
                {
                    name: 'HEADER',
                    value: 'header',
                    options: {
                        "header": "some header"
                    }
                },
                {
                    name: 'SUBJECT',
                    value: 'subject'
                },
                {
                    name: 'TO',
                    value: 'to'
                },
                {
                    name: 'TO_WHOM_OR_COPY',
                    value: 'to_copy'
                }
            ]
        };

        vm.compareTypes = {
            list: [
                {
                    name: 'CONTAINS',
                    value: 'contain'
                },
                {
                    name: 'MATCHES',
                    value: 'match'
                },
                {
                    name: 'NOT_CONTAINS',
                    value: 'not_contain'
                },
                {
                    name: 'NOT_MATCHES',
                    value: 'not_match'
                }
            ]
        };

        vm.ruleForms = [
            {
                "type": "attachment",
                "compare_type": "match",
                "value": "example@example.com"
            }
        ];

        vm.sieveActions = {
            move: {
                type: 'move'
            },
            flag: {
                type: 'flag'
            },
            resend: {
                type: 'resend'
            },
            notify: {
                type: 'notify'
            },
            answer: {
                type: 'answer'
            },
            option: {
                type: 'option'
            }
        };

        vm.sieve = {
            model: {}
        };

        vm.sieveForm = {
            model: {
                sieveRules: []
            }
        };

        vm.addRule = addRule;
        vm.removeRule = removeRule;
        vm.update = update;
        vm.add = add;
        // vm.getFolders = getFolders;
        // vm.getTags = getTags;

        activate();

        function activate() {
            if (vm.$state.params.id) {
                getById();
            }

            if (vm.$state.params.subject) {
                vm.sieveForm.model.sieveRules.push({
                    "type": "from",
                    "compare_type": "match",
                    "value": vm.$state.params.subject
                });

                vm.sieveActions.move = {"type": "move", "value": "Junk"};
            }

            if (vm.$state.params.email) {
                vm.sieveForm.model.sieveRules.push({
                    "type": "from",
                    "compare_type": "match",
                    "value": vm.$state.params.email
                });
            }

            if (vm.$state.params.subject || vm.$state.params.email) {
                vm.sieveForm.model.sieveActions = [{"type": "move", "value": "Junk"}];
            }

            if (vm.$state.params.folder) {
                vm.sieveActions.move = {
                    "type": "move",
                    "value": vm.$state.params.folder
                };

                vm.sieveForm.model.sieveActions = [{
                    "type": "move",
                    "value": vm.$state.params.folder
                }];
            }

            getTags();
            getFolders();
        }

        function setSieveActions() {
            _.forEach(vm.sieveActions, function (item) {
                _.forEach(vm.sieveForm.model.sieveActions, function (itemServer) {
                    if (itemServer.type === item.type) {
                        item.value = itemServer.value;
                    }
                });
            });
        }

        function getById() {
            sieve.getById({id: vm.$state.params.id}).then(function (response) {
                vm.sieve.model = response.data;
                vm.sieveForm.model = response.data;

                setSieveActions();
            });
        }

        function addRule() {
            vm.sieveForm.model.sieveRules.push({
                "type": "",
                "compare_type": "",
                "value": ""
            });
        }

        function removeRule(rule) {
            _.remove(vm.sieveForm.model.sieveRules, function (item) {
                return rule === item;
            });
        }

        function add(sieveForm) {
            console.log('sieveForm', sieveForm);

            // if (sieveForm.$invalid) return;

            sieve.post({}, vm.sieveForm.model).then(function () {
                vm.$state.go('settings.rules');
            }, function (response) {
                vm.sieveForm.errors = response.data.data;
            });
        }

        function update(sieveForm) {
            console.log('sieveForm', sieveForm);

            // if (sieveForm.$invalid) return;

            sieve.put({}, vm.sieveForm.model).then(function () {
                vm.$state.go('settings.rules');
            }, function (response) {
                vm.sieveForm.errors = response.data.data;
            });
        }

        function getFolders() {
            mailBox.get().then(function (response) {
                vm.folders = response.data;

                getMailBoxFormatted();
            });
        }

        function getTags() {
            tag.get().then(function (response) {
                vm.tags.items = response.data;
            });
        }

        function getMailBoxFormatted() {
            _.forEach(vm.folders.items, function (folder) {
                var isSub = true;

                _.forEach(vm.standartFolders, function (standartFolder) {
                    if (folder.name == standartFolder.name) {
                        isSub = false;
                    }
                });

                if (isSub) {
                    folder.isSub = true;
                } else {
                    folder.isSub = false;
                }

                if (folder.name === 'INBOX') {
                    folder.isOpen = true;
                }
            });

            sortFolder();
        }

        function sortFolder() {
            _.remove(vm.folders.items, function (item) {
                return item.name === 'INBOX';
            });

            vm.folders.items = _.sortBy(vm.folders.items, [
                {'isSub': true},
                {'name': 'INBOX'},
                {'name': 'Sent'},
                {'name': 'Trash'},
                {'name': 'Junk'},
                {'name': 'Drafts'},
                {'name': 'Outbox'},
                {'name': 'Archive'},
                {'name': 'Templates'}
            ]).reverse();
        }
    }
})();
