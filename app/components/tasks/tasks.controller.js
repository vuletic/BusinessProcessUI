(function () {
    'use strict';

    angular
		.module('app')
		.controller('tasksController', tasksController);

	tasksController.$inject = ['rootService', 'loginService', '$stateParams', '$state', '$scope'];
    function tasksController(rootService, loginService, $stateParams, $state, $scope) {
        var tc = this;
        tc.currentUser = $scope.$parent.rc.currentUser;
        tc.tasks = [];
        tc.starters = {};

        rootService.getTaskAssignee(tc.currentUser.id).then(function(response){
            console.log(response.data);
            var tmp = [];
            var j = 0;
            for (var i in response.data){
                tmp[i] = response.data[i];
                tc.tasks.push(response.data[i]);
                rootService.getVariable(response.data[i].processInstanceId, "doktorant").then(function(response){
                    rootService.getUser(response.value).then(function(response){
                        tc.starters[tmp[j].processInstanceId] = response.firstName + " " + response.lastName;
                        j++; 
                    });
                });
            }  
            console.log(tc.tasks);
        });

        rootService.getTaskCandidateUser(tc.currentUser.id).then(function(response){
            console.log(response.data);
            var tmp = [];
            var j = 0;
            for (var i in response.data){
                tmp[i] = response.data[i];
                tc.tasks.push(response.data[i]);
                rootService.getVariable(response.data[i].processInstanceId, "doktorant").then(function(response){
                    rootService.getUser(response.value).then(function(response){
                        tc.starters[tmp[j].processInstanceId] = response.firstName + " " + response.lastName;
                        j++; 
                    });
                });
            }  
            console.log(tc.tasks);
        });

        /*if (!tc.currentUser.isDoktorant){
            rootService.getTaskCandidateGroup(tc.currentUser.groups[0]).then(function(response){
                // videti i od kojih grupa da se uzme
                console.log(response.data);
                for (var i in response.data){
                    tc.tasks.push(response.data[i]);
                }
                console.log(tc.tasks);
            });
        }*/

        tc.goToForm = function(id, name, proc){
            $state.go('root.form', {taskId: id, taskName: name, processInstanceId: proc}, {reload:true});
        }

        console.log(tc.tasks);

 	}


})();