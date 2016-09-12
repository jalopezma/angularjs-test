(function() {
    var about = {
        templateUrl: 'core/about/about.html',
        controller: function AboutController() {
            this.author = 'Jose Lopez';
            this.date = '12/09/2016';
            this.github = 'https://github.com/jalopezma/angularjs-test';
        }
    };

    angular
        .module('app')
        .component('coAbout', about);

})();
