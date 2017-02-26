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
        rc.taskNum = 0;

        rc.countTasks = function(){
            rootService.getTaskAssignee(rc.currentUser.id).then(function(response){
                rc.taskNum += response.data.length;
            });

            rootService.getTaskCandidateUser(rc.currentUser.id).then(function(response){
                rc.taskNum += response.data.length;
            });

            /*if (!rc.currentUser.isDoktorant){
                rootService.getTaskCandidateGroup(rc.currentUser.groups[0]).then(function(response){
                    rc.taskNum += response.data.length;
                });
            }*/
        }
        
        if(!rc.currentUser){
            $state.go('root.login');
    	}else{
             rc.countTasks();
        }

        rc.login=function () {
            loginService.login(rc.user.username,rc.user.password).then(function(response){
                rc.currentUser = response;
                 rootService.getUserGroups(rc.currentUser.id).then(function(response){
                    rc.currentUser.groups = response.data;
                    rc.currentUser.isDoktorant = (rc.currentUser.groups.filter(function(e) { return e.id == 'user'; }).length > 0);
                });
                rootService.getProcessInstanceStartedByUser(rc.currentUser.id).then(function(response){
                    //console.log(response.data);
                    if(response.data.length > 0)
                        rc.currentUser.startedProcess = response.data[0].id;
                    else
                        rc.currentUser.startedProcess = false;

                    rc.countTasks();

                });
            });
           
            $state.go('root.home');
        };

        rc.logout = function(){
            loginService.logout();
            rc.currentUser = null;
        }

        rc.startProcess = function(){
            rootService.startProcess('process:6:72504', rc.currentUser.id).then(function(response){
                rc.currentUser.startedProcess = response.id;
                rootService.getTaskAssignee(rc.currentUser.id).then(function(response){
                    console.log(response);
                    var taskId = response.data[0].id;
                    var name = response.data[0].name;
                    console.log(taskId);
                    $state.go('root.form', {taskId: taskId, taskName:name, processInstanceId: 0}, {reload: true}); //root.form sa parametrom
                });

            });
        }

        rc.viewTasks = function(){
            $state.go('root.tasks', null, {reload: true});
        }

        
    }

})();