(function() {
    angular
        .module('app.bookmakers')
        .service('bookmakersService', bookmakersService);

    function bookmakersService($http) {

        /**
         * Get all bookmakers
         */
        this.getBookmakers = function() {
            return $http.get('bookmakers/data/premier-league.json');
        }

        /**
         * Get a bookmaker
         */
        this.getBookmakersList = function() {
            return $http.get('bookmakers/data/bookmakers.json');
        }

        /**
         * Get a bookmaker
         * @param string [betfair, bet475, netbet]
         */
        this.getBookmaker = function(bookmaker) {
            return $http.get('bookmakers/data/' + bookmaker + '.json');
        }
    }
})();
