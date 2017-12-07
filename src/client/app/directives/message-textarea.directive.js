(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('messageTextarea', messageTextarea);

    messageTextarea.$inject = ['$sce', '$timeout', '$compile', 'googleTranslation', 'lang', '$translate'];

    /* @ngInject */
    function messageTextarea($sce, $timeout, $compile, googleTranslation, lang, $translate) {
        var directive = {
            template: '<div class="message-textarea"><div class="{{ targetElement }} message-textarea"></div></div>',
            link: link,
            require: '?ngModel',
            restrict: 'EA',
            scope: {
                params: '=?',
                messageTextareaHtml: '=?',
                messageTextareaIsTranslate: '=?',
                messageTextareaIsTranslateShow: '=?',
                messageTextareaHtmlTranslate: '=?',
                messageTextareaHtmlSign: '=?',
                messageTextareaHtmlFwd: '=?',
                messageTextareaHtmlRe: '=?',
                messageTextareaTimeLoad: '@?',
                isSign: '=?'
            },
            replace: true
        };
        return directive;

        function link(scope, element, attrs, ngModel) {
            var isLoadedModel = false;
            var timeLoad = scope.messageTextareaTimeLoad || 250;
            var $summetnote;
            var body = '';

            scope.translateFrom = {};
            scope.translateTo = {};
            scope.language = '';

            // scope.setClear = setClear;

            scope.targetElement = _.uniqueId('summernote_');

            scope.$watch('translateTo', function (data, oldData) {
                scope.language = data.language;
                translate(ngModel.$viewValue);
            }, true);

            scope.$watch('messageTextareaHtmlSign', function (data, oldData) {
                if (data) {
                    scope.signHTML = $sce.trustAsHtml(data);
                    // console.log('signHTML', scope.signHTML);

                    $timeout(function () {
                        updateModel();
                    }, 250);
                }
            });

            scope.$watch('messageTextareaHtmlRe', function (data, oldData) {
                if (data) {
                    scope.reHTML = $sce.trustAsHtml(data);
                    // console.log('reHTML', scope.reHTML);

                    $timeout(function () {
                        updateModel();
                    }, 250);
                }
            });

            scope.$watch('messageTextareaHtmlFwd', function (data, oldData) {
                if (data) {
                    scope.fwdHTML = $sce.trustAsHtml(data);
                    // console.log('fwdHTML', scope.fwdHTML);

                    $timeout(function () {
                        updateModel();
                    }, 250);
                }
            });

            $translate('TRANSLATOR').then(function (translation) {
                var HelloButton = function (context) {
                    var ui = $.summernote.ui;

                    if (scope.messageTextareaIsTranslateShow) {
                        var button = ui.button({
                            className: 'btn--normal',
                            contents: translation,
                            tooltip: translation,
                            click: function () {
                                scope.messageTextareaIsTranslate = !scope.messageTextareaIsTranslate;

                                if (scope.messageTextareaIsTranslate) {
                                    showTextareaTranslate();
                                } else {
                                    hideTextareaTranslate();
                                }
                                scope.$apply();
                            }
                        });

                        return button.render();
                    }
                };

                $timeout(function () {
                    var useLang = lang.getCurrentLang().ico;
                    scope.$watch('messageTextareaHtml', function (newValue) {
                            if (newValue && !isLoadedModel && !scope.params.new && !scope.params.re && !scope.params.fwd && (scope.params.mbox === 'Drafts' || scope.params.mbox === 'Outbox' || scope.params.mbox === 'Templates')) {
                                isLoadedModel = true;

                                console.log('newValue', scope.bodyHTML);

                                scope.bodyHTML = ngModel.$viewValue;
                                // element.find('.note-editable--body').html(ngModel.$viewValue);
                                return;
                            }

                            if (scope.isSign && !newValue) {
                                $summetnote.summernote('code', '');
                            }

                            if (scope.isSign && newValue && !isLoadedModel) {
                                $summetnote.summernote('code', newValue);
                                isLoadedModel = true;
                            }
                        }
                    );

                    $summetnote = $('.' + scope.targetElement).summernote({
                        fontSizes: ['8', '9', '10', '11', '12', '14', '16', '18', '24', '36'],
                        minHeight: 400,
                        dialogsInBody: true,
                        callbacks: {
                            onInit: function () {
                                $('.note-recent-color').css('background-color', 'rgb(255, 255, 255)');
                            },
                            onChange: function (contents, $editable) {
                                if (!scope.isSign) {
                                    // alert();
                                }

                                ngModel.$setViewValue(contents);

                                if (scope.messageTextareaIsTranslate) {
                                    translate(contents);
                                }
                            }

                        },
                        lang: useLang,
                        toolbar: [
                            ['undo', ['undo', 'redo']],
                            ['font', ['bold', 'italic', 'underline', 'strikethrough', 'fontname']],
                            // ['color'],
                            // ['fontname', ['fontname']],
                            ['color', ['color']],
                            ['para', ['ol', 'ul']],
                            ['para', ['paragraph']],
                            // ['para', ['alignCenter']],
                            ['fontsize', ['fontsize']],
                            // ['height', ['height', 'fontsize']],
                            // ['table', ['table']],
                            ['insert', ['link', 'picture']],
                            // ['view', ['fullscreen', 'codeview']],

                            ['clear', ['clear']],

                            ['mybutton', ['hello']]
                            // ['help', ['help']]
                        ],
                        buttons: {
                            hello: HelloButton
                        },
                        icons: {
                            undo: 'icon-undo',
                            redo: 'icon-redo',
                            bold: 'icon-bold-en',
                            italic: 'icon-italic-en',
                            underline: 'icon-underline',
                            eraser: 'icon-style',
                            'current-color': 'icon-font-color',
                            // font: 'icon-background-color',
                            fontname: 'icon-font-family',
                            fontsize: 'icon-font-size',
                            orderedlist: 'icon-ol',
                            unorderedlist: 'icon-ul',
                            link: 'icon-link',
                            unlink: 'icon-unlink',
                            picture: 'icon-background',
                            arrowsAlt: 'icon-full-screen',
                            strikethrough: 'icon-thru',

                            align: 'icon-align-c',
                            alignCenter: 'icon-align-c',
                            alignLeft: 'icon-align-l',
                            alignRight: 'icon-align-r',
                            caret: 'icon-arrow-down'
                        }
                    });

                    $('.note-statusbar').html("<span class='summernote__resize'>◢</span>");

                    pasteStructureHtml();

                }, timeLoad);
            });

            function showTextareaTranslate() {
                scope.$noteEditingArea = element.find('.note-editing-area');
                scope.$noteToolbar = element.find('.note-toolbar');
                scope.$textareaTranslateMenu = $compile('<textarea-translate-menu translate-from="translateFrom" translate-to="translateTo"></textarea-translate-menu>')(scope);
                scope.$noteToolbar.after(scope.$textareaTranslateMenu);
                scope.$noteEditingArea.append('<div class="note-editing-area-translate"></div>');
                scope.$noteEditingAreaTranslate = element.find('.note-editing-area-translate');
                scope.$noteEditingArea.addClass('message-textarea__note-editing-area--translate');
                translate(ngModel.$viewValue);
            }

            function hideTextareaTranslate() {
                scope.$noteEditingAreaTranslate.remove();
                scope.$textareaTranslateMenu.remove();
            }

            function translate(contents) {
                if (contents && scope.messageTextareaIsTranslate && scope.language) {
                    googleTranslation.translate({}, {
                        "q": contents,
                        "target": scope.language
                    }).then(function (response) {
                        scope.messageTextareaHtmlTranslate = response.data.translations[0].translatedText;
                        scope.$noteEditingAreaTranslate.html(scope.messageTextareaHtmlTranslate);
                    });
                }
            }

            function pasteStructureHtml() {
                var html = [
                    '<div class="note-editable--body" ng-bind-html="bodyHTML"></div>',
                    '<div class="note-editable--re" ng-bind-html="reHTML"></div>',
                    '<div class="note-editable--sign" ng-bind-html="signHTML"></div>',
                    '<div class="note-editable--fwd" ng-bind-html="fwdHTML"></div>'
                ].join(' ');
                element.find('.note-editable').append($compile(html)(scope));
            }

            function updateModel() {
                ngModel.$setViewValue($summetnote.summernote('code'));
            }
        }
    }

})();
