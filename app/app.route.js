(function () {
    'use strict';

    angular
		.module('app')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise("/home");

      $stateProvider
        .state('root', { 
            url: '/',
            templateUrl: 'app/components/root/root.html',
            controller: 'rootController',
            controllerAs: 'rc'
        })
        .state('root.home', { //root.home
            url: 'home',
            templateUrl: 'app/components/home/home.html',
            controller: 'homeController',
            controllerAs: 'hc'
        })
        .state('root.form', { 
            url: 'form/{taskId:int}/{taskName}/{processInstanceId:int}',
            templateUrl: 'app/components/form/form.html',
            controller: 'formController',
            controllerAs: 'fc'
        })
        .state('root.tasks', { 
            url: 'tasks',
            templateUrl: 'app/components/tasks/tasks.html',
            controller: 'tasksController',
            controllerAs: 'tc',
        })
        .state('root.login', {
            url: 'login',
            templateUrl: 'app/components/login/login.html',
            controller: 'loginController',
            controllerAs: 'lc'
        });

        


    }]);


})();
