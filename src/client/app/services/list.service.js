(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('list', list);

    list.$inject = [];

    function list() {

        function getMonths() {
            return moment.months();
        }

        function getDays() {
            var arr = [];
            for (var i = 1; i <= 31; i++) {
                if (i < 10) {
                    var value = '0' + i;
                    arr.push({
                        id: i,
                        name: value
                    });
                    continue;
                }
                arr.push({
                    id: i,
                    name: i
                });
            }
            return arr;
        }

        function getYears() {
            var arr = [];
            for (var i = 1935; i < 2018; i++) {
                arr.push({
                    id: i,
                    name: i
                });
            }
            return arr;
        }

        function getColors() {
            return [
                '#31c73b',
                '#7cc3c4',
                '#5a8eff',
                '#ba99ff',
                '#a8bcce',
                '#c1be00',
                '#f99000',
                '#ff8985',
                '#28a931',
                '#67a3a4',
                '#5080e7',
                '#a488e2',
                '#8e9faf',
                '#a19f00',
                '#db7f00',
                '#ff3f30',
                '#1d8925',
                '#508182',
                '#456ec8',
                '#8e75c4',
                '#73818e',
                '#807e00',
                '#bb6c00',
                '#f32300',
                '#136619',
                '#395e5f',
                '#385ca8',
                '#7760a4',
                '#57616c',
                '#5c5a00',
                '#9c5800',
                '#d51e00'
            ]
        }

        return {
            getMonths: getMonths,
            getYears: getYears,
            getDays: getDays,
            getColors: getColors
        }
    }

})();