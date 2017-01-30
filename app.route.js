(function () {
    'use strict';

    angular
		.module('app')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise("/");

      $stateProvider
        .state('home', { //root.home
            url: '/',
            templateUrl: 'app/components/home/home.html',
            controller: 'homeController',
            controllerAs: 'hc'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'app/components/login/login.html',
            controller: 'loginController',
            controllerAs: 'lc'
        });


    }]);


})();
