(function () {
    'use strict';

    angular
		.module('app')
		.controller('rootController', rootController);

	rootController.$inject = ['$http', '$state', 'rootService', 'loginService', '$scope'];
    function rootController($http, $state, rootService, loginService, $scope) {
    	var rc = this;
        rc.currentUser = loginService.getCurrentUser();
        rc.user = {};
        rc.isDoktorant = false;
        
        if(!rc.currentUser){
            $state.go('root.login');
    	}

        rc.login=function () {
            loginService.login(rc.user.username,rc.user.password).then(function(response){
                rc.currentUser = response;
                 rootService.getUserGroups(rc.currentUser.id).then(function(response){
                    rc.currentUser.groups = response.data;
                    rc.currentUser.isDoktorant = (rc.currentUser.groups.filter(function(e) { return e.id == 'user'; }).length > 0);
                });
                rootService.getProcessInstanceStartedByUser(rc.currentUser.id).then(function(response){
                    if(response.data.length > 0)
                        rc.currentUser.startedProcess = response.data[0].id;
                    else
                        rc.currentUser.startedProcess = false;

                });
            });
           
            $state.go('root.home');
        };

        rc.logout = function(){
            loginService.logout();
            rc.currentUser = null;
        }

        rc.startProcess = function(){
            rootService.startProcess('process:1:20008', rc.currentUser.id).then(function(response){
                rc.currentUser.startedProcess = response.id;
                rootService.getTaskAssignee(rc.currentUser.id).then(function(response){
                    console.log(response);
                    var taskId = response.data[0].id;
                    console.log(taskId);
                    $state.go('root.home'); //root.form sa parametrom
                });

            });
        }
    }

})();