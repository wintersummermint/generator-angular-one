angular.module('test', ['newDep', 'newDep2']);

angular.module('test').config(function($routeProvider) {

    $routeProvider.when('/home',{templateUrl: 'partial/home/home.html'});
    $routeProvider.when('/testing/awesome',{templateUrl: 'partial/testing/testing.html'});
    /* Add New Routes Above */
    $routeProvider.otherwise({redirectTo:'/home'});

});

angular.module('test').run(function($rootScope) {

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});
