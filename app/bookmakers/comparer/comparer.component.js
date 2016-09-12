(function() {
    var comparer = {
        templateUrl: 'bookmakers/comparer/comparer.html',
        controller: comparerController
    };

    angular
        .module('app.bookmakers')
        .component('bmComparer', comparer);

    function comparerController(bookmakersService) {
        var vm = this; 

        vm.sortType = ['name'];
        vm.sortReverse = false;

        vm.selectedTeam = '';
        vm.odds = [];
        vm.bestOdds = [];
        vm.showExpandedInfo = false;
        vm.expandedInfo = {};

        vm.sortBy = sortBy;
        vm.mouseOverTeam = mouseOverTeam;
        vm.mouseLeaveTeam = mouseLeaveTeam;

        this.$onInit = function() {
            bookmakersService.getBookmakers()
                .then(function(response) {
                    vm.odds = response.data;
                    vm.bestOdds = prepareData(vm.odds);
                });
        };

        /**
         * Sorts by column name. If column clicked twice, sort is reversed
         */
        function sortBy(column) {
            if (column == vm.sortType) {
                vm.sortReverse = !vm.sortReverse;
            }
            vm.sortType = column;
        }

        /**
         * Get the best odds to show in a table
         * @param Object data Odds from bookmakers
         * @return Object
         */
        function prepareData(data) {
            var preparedData = [];
            var team = {};
            data.forEach(function(value) {
                bestOdds = getBestOddsFor(value.team, value);
                team = {
                    "name": value.team,
                    "backOdd": bestOdds.back,
                    "layOdd": bestOdds.lay
                };
                preparedData.push(team);
            });
            return preparedData;
        }

        /**
         * Get the best odds for back and lay with the name of the bookmaker
         * @param string name
         * @param Object team
         * @return Object
         */
        function getBestOddsFor(name, team) {
            var bestOdds = {
                "back": { "odd": 0, "bookmaker": "" },
                "lay": { "odd": 0, "bookmaker": "" }
            };
            var bookmakerObj = {};
            for(var bookmaker in team.bookmakers) {
                bookmakerObj = team.bookmakers[bookmaker];
                if (bookmakerObj.back > bestOdds.back.odd) {
                    bestOdds.back.odd = bookmakerObj.back;
                    bestOdds.back.bookmaker = bookmaker;
                }
                if (bookmakerObj.lay > bestOdds.lay.odd) {
                    bestOdds.lay.odd = bookmakerObj.lay;
                    bestOdds.lay.bookmaker = bookmaker;
                }
            }
            return bestOdds;
        }

        /**
         * On mouse over team with index "index" updates expanded info and show it
         * @param index int
         */
        function mouseOverTeam(index) {
            vm.expandedInfo = vm.odds[index];
            vm.showExpandedInfo = true;
        }

        /**
         * On mouse leave a team row, hide expanded info
         */
        function mouseLeaveTeam() {
            vm.showExpandedInfo = false;
        }
    }
})();
