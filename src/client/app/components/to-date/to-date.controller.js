(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('ToDateController', ToDateController);

    ToDateController.$inject = ['$scope', '$translate'];
    /* @ngInject */
    function ToDateController($scope, $translate) {
        var vm = this;

        vm.convertDate = '';

        vm.calendarFormat = {
            // sameDay: 'HH:mm',
            // nextDay: '[завтра]',
            // nextWeek: 'dddd HH:mm',
            // lastDay: '[вчера] hh:mm',
            // lastWeek: 'DD MMMM YYYY [в] hh:mm',
            // sameElse: 'DD MMMM YYYY [в] hh:mm'
        };

        vm.calendarSmallFormat = {
            // sameDay: 'HH:mm',
            // nextDay: '[завтра] HH:mm',
            // nextWeek: 'dddd HH:mm',
            // lastDay: 'D MMM',
            // lastWeek: 'D MMM',
            // sameElse: 'D MMM'
        };

        vm.sendTimeFormat = {
            // sameDay: '[сегодня в] HH:mm',
            // nextDay: '[завтра] HH:mm',
            // nextWeek: 'dddd HH:mm',
            // lastDay: '[вчера] hh:mm',
            // lastWeek: 'DD MMMM YYYY [в] hh:mm',
            // sameElse: 'DD MMMM YYYY [в] hh:mm'
        };

        vm.getConvert = getConvert;

        $scope.$watch('vm.date', function (data, newData) {
            if (data) {
                console.log('data', data);
                var newDate = moment(data);
                vm.convertDate = getConvert(newDate);
            }
        });

        $scope.$watch('vm.dateUnix', function (data, newData) {
            if (data) {
                vm.convertDate = getUnixConvert(data);
            }
        });

        activate();

        function activate() {
            if (vm.isSmall) {
                moment.locale('ru', {
                    calendar: {
                        sameDay: 'HH:mm',
                        lastDay: 'D MMM',
                        nextDay: '[завтра]',
                        nextWeek: 'dddd HH:mm',
                        lastWeek: 'D MMM',
                        sameElse: 'D MMM'
                    }
                });

                moment.locale('en', {
                    calendar: {
                        sameDay: 'HH:mm',
                        lastDay: 'D MMM',
                        nextDay: '[tomorrow at]',
                        nextWeek: 'dddd HH:mm',
                        lastWeek: 'D MMM',
                        sameElse: 'D MMM'
                    }
                });

                moment.locale('cs', {
                    calendar: {
                        sameDay: 'HH:mm',
                        lastDay: 'D MMM',
                        nextDay: '[zítra]',
                        nextWeek: 'dddd HH:mm',
                        lastWeek: 'D MMM',
                        sameElse: 'D MMM'
                    }
                });

                moment.locale('sk', {
                    calendar: {
                        sameDay: 'HH:mm',
                        lastDay: 'D MMM',
                        nextDay: '[zítra]',
                        nextWeek: 'dddd HH:mm',
                        lastWeek: 'D MMM',
                        sameElse: 'D MMM'
                    }
                });

                moment.locale('uk', {
                    calendar: {
                        sameDay: 'HH:mm',
                        lastDay: 'D MMM',
                        nextDay: '[завтра]',
                        nextWeek: 'dddd HH:mm',
                        lastWeek: 'D MMM',
                        sameElse: 'D MMM'
                    }
                });

                moment.locale($translate.use());

                return;
            }

            if (vm.isSendTime) {
                moment.locale('ru', {
                    calendar: {
                        sameDay: '[сегодня в] HH:mm',
                        lastDay: '[вчера] hh:mm',
                        nextDay: '[завтра]',
                        nextWeek: 'dddd HH:mm',
                        lastWeek: 'DD MMMM YYYY [в] hh:mm',
                        sameElse: 'DD MMMM YYYY [в] hh:mm'
                    }
                });

                moment.locale('en', {
                    calendar: {
                        sameDay: '[today] HH:mm',
                        lastDay: '[yesterday] hh:mm',
                        nextDay: '[tomorrow at]',
                        nextWeek: 'dddd HH:mm',
                        lastWeek: 'DD MMMM YYYY [at] hh:mm',
                        sameElse: 'DD MMMM YYYY [at] hh:mm'
                    }
                });

                moment.locale('cs', {
                    calendar: {
                        sameDay: '[dnes] HH:mm',
                        lastDay: '[včera] hh:mm',
                        nextDay: '[zítra]',
                        nextWeek: 'dddd HH:mm',
                        lastWeek: 'DD MMMM YYYY [v] hh:mm',
                        sameElse: 'DD MMMM YYYY [v] hh:mm'
                    }
                });

                moment.locale('sk', {
                    calendar: {
                        sameDay: '[dnes] HH:mm',
                        lastDay: '[včera] hh:mm',
                        nextDay: '[zítra]',
                        nextWeek: 'dddd HH:mm',
                        lastWeek: 'DD MMMM YYYY [v] hh:mm',
                        sameElse: 'DD MMMM YYYY [v] hh:mm'
                    }
                });

                moment.locale('uk', {
                    calendar: {
                        sameDay: '[сьогодні] HH:mm',
                        lastDay: '[вчора] hh:mm',
                        nextDay: '[завтра]',
                        nextWeek: 'dddd HH:mm',
                        lastWeek: 'DD MMMM YYYY [в] hh:mm',
                        sameElse: 'DD MMMM YYYY [в] hh:mm'
                    }
                });

                moment.locale($translate.use());

                return
            }

            moment.locale('ru', {
                calendar: {
                    sameDay: 'HH:mm',
                    lastDay: '[вчера] hh:mm',
                    nextDay: '[завтра]',
                    nextWeek: 'dddd HH:mm',
                    lastWeek: 'DD MMMM YYYY [в] hh:mm',
                    sameElse: 'DD MMMM YYYY [в] hh:mm'
                }
            });

            moment.locale('en', {
                calendar: {
                    sameDay: 'HH:mm',
                    lastDay: '[yesterday] hh:mm',
                    nextDay: '[tomorrow at]',
                    nextWeek: 'dddd HH:mm',
                    lastWeek: 'DD MMMM YYYY [at] hh:mm',
                    sameElse: 'DD MMMM YYYY [at] hh:mm'
                }
            });

            moment.locale('cs', {
                calendar: {
                    sameDay: 'HH:mm',
                    lastDay: '[včera] hh:mm',
                    nextDay: '[zítra]',
                    nextWeek: 'dddd HH:mm',
                    lastWeek: 'DD MMMM YYYY [v] hh:mm',
                    sameElse: 'DD MMMM YYYY [v] hh:mm'
                }
            });

            moment.locale('sk', {
                calendar: {
                    sameDay: 'HH:mm',
                    lastDay: '[včera] hh:mm',
                    nextDay: '[zítra]',
                    nextWeek: 'dddd HH:mm',
                    lastWeek: 'DD MMMM YYYY [v] hh:mm',
                    sameElse: 'DD MMMM YYYY [v] hh:mm'
                }
            });

            moment.locale('uk', {
                calendar: {
                    sameDay: 'HH:mm',
                    lastDay: '[вчора] hh:mm',
                    nextDay: '[завтра]',
                    nextWeek: 'dddd HH:mm',
                    lastWeek: 'DD MMMM YYYY [в] hh:mm',
                    sameElse: 'DD MMMM YYYY [в] hh:mm'
                }
            });

            moment.locale($translate.use());
        }

        function getConvert(date) {
            return moment(date).calendar();
        }

        function getUnixConvert(date) {
            return moment.unix(date).calendar();
        }
    }
})();
