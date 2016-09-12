(function() {
    angular
        .module('app')
        .config(config);

    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'MainController',
                controllerAs: 'vm',
                templateUrl: 'core/main/main.html'
            });
    
        $locationProvider.html5Mode(true);
    }
})();
