(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('DateSortController', DateSortController);

    DateSortController.$inject = ['$scope'];
    /* @ngInject */
    function DateSortController($scope) {
        var vm = this;

        vm.monthList = [];

        vm.selectDate = selectDate;
        vm.selectDefault = selectDefault;

        ////

        activate();

        function activate() {
            getMonthList();
        }

        function getMonthList() {
            vm.currentMonth = moment().month();
            _.forEach(moment.months(), function (month, i) {
                if (i <= vm.currentMonth) {
                    console.log('month', month);
                    vm.monthList.push(month);
                }
            });
        }
        
        function selectDate(i) {
            var selectedMonth = moment().month(i);
            vm.from = selectedMonth.startOf('month').unix();
            vm.to = selectedMonth.endOf('month').unix();
            console.log(vm.from, vm.to);
        }
        
        function selectDefault() {
            var startMonth = moment().month(0);
            var endMonth = moment().month(vm.currentMonth);
            vm.from = startMonth.startOf('month').unix();
            vm.to = endMonth.endOf('month').unix();
        }
    }
})();
