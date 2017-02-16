(function () {
    'use strict';

    angular
		.module('app')
		.controller('rootController', rootController);

	rootController.$inject = ['$http', '$state', 'rootService', 'loginService'];
    function rootController($http, $state, rootService, loginService) {
    	var rc = this;
        rc.currentUser = loginService.getCurrentUser();
        rc.user = {};
        
        if(!rc.currentUser){
            $state.go('root.login');
    	}

        rc.login=function () {
            loginService.login(rc.user.username,rc.user.password).then(function(response){
                rc.currentUser = response;
            });
            $state.go('root.home');
        };

        rc.logout = function(){
            loginService.logout();
            rc.currentUser = null;
        }

        rootService.startProcess('process:1:20008', rc.currentUser.id).then(function(response){
            rc.process = response;
            console.log(rc.process);
        });
        
    }

})();