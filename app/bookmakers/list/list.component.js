(function() {
    var list = {
        templateUrl: 'bookmakers/list/list.html',
        controller: listController
    };

    angular
        .module('app.bookmakers')
        .component('bmList', list);

    function listController(bookmakersService) {
        var vm = this;

        vm.bookmakers = [];

        vm.$onInit = function() {
            bookmakersService.getBookmakersList()
                .then(function(response) {
                    vm.bookmakers = response.data;
                });
        }
    }
})();
