(function () {
    'use strict';

    angular
		.module('app')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise("/");

      $stateProvider
        .state('root', { 
            url: '',
            templateUrl: 'app/components/root/root.html',
            controller: 'rootController',
            controllerAs: 'rc'
        })
        .state('root.home', { //root.home
            url: '/',
            templateUrl: 'app/components/home/home.html',
            controller: 'homeController',
            controllerAs: 'hc'
        })
        .state('root.form', { 
            url: '/form/{taskId:int}',
            templateUrl: 'app/components/form/form.html',
            controller: 'formController',
            controllerAs: 'fc'
        })
        .state('root.login', {
            url: '/login',
            templateUrl: 'app/components/login/login.html',
            controller: 'loginController',
            controllerAs: 'lc'
        });


    }]);


})();
