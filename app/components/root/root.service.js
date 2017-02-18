(function () {
    'use strict';

    angular
        .module('app')
        .service('rootService', rootService);

    rootService.$inject = ['$http', '$window', '$state'];
    function rootService($http, $window, $state){

    	var host = 'http://localhost:8080/activiti-rest/'

    	function getProcess(id) { //process:1:20008
            var url = 'service/repository/process-definitions/' + id;

            var req = {
             method: 'GET',
             url: url,
             headers: {
                'Content-Type' : 'application/json'             },
            };

            return $http(req).then(
                function successCallback(response) {
                    if (response) {
                        return response.data;
                    } else {
                        console.log("err");
                    }
                },function errorCallback(response){
                    console.log("error");
             	});
                
        }

        function startProcess(id, initiator) { //process:1:20008
            var url = 'service/runtime/process-instances';
            console.log($http.defaults.headers.common['Authorization']);
            var req = {
             method: 'POST',
             url: url,
             headers: {'Content-Type' : 'application/json'},
             data: { "processDefinitionId": id, "variables": [{"name":"test", "value": initiator}]}
            };

            return $http(req).then(
                function successCallback(response) {
                    if (response) {
                        return response.data;
                    } else {
                        console.log("err");
                    }
                },function errorCallback(response){
                    console.log("error");
             	});
                
        }

        function getProcessInstance(id) { 
            var url = 'service/runtime/process-instances/' + id;

            var req = {
             method: 'GET',
             url: url,
             headers: {'Content-Type' : 'application/json'}
            };

            return $http(req).then(
                function successCallback(response) {
                    if (response) {
                        return response.data;
                    } else {
                        console.log("err");
                    }
                },function errorCallback(response){
                    console.log("error");
             	});       
        }

        function getTask(id){
            var url = 'service/runtime/tasks/' + id;

            var req = {
             method: 'GET',
             url: url,
             headers: {'Content-Type' : 'application/json'}
            };

            return $http(req).then(
                function successCallback(response) {
                    if (response) {
                        return response.data;
                    } else {
                        console.log("err");
                    }
                },function errorCallback(response){
                    console.log("error");
                });     
        }

        function completeTask(id){ //// VEROVATNO NE TREBA
            var url = 'service/runtime/tasks/' + id;

            var req = {
             method: 'POST',
             url: url,
             headers: {'Content-Type' : 'application/json'},
             data: {"action" : "complete", "variables" : []}
            };

            return $http(req).then(
                function successCallback(response) {
                    if (response) {
                        return response.data;
                    } else {
                        console.log("err");
                    }
                },function errorCallback(response){
                    console.log("error");
                });  
        }

        function claimTask(id, user){
            var url = 'service/runtime/tasks/' + id;

            var req = {
             method: 'POST',
             url: url,
             headers: {'Content-Type' : 'application/json'},
             data: {"action" : "claim", "assignee" : user}
            };

            return $http(req).then(
                function successCallback(response) {
                    if (response) {
                        return response.data;
                    } else {
                        console.log("err");
                    }
                },function errorCallback(response){
                    console.log("error");
                });  
        }


        function getTaskVariables(task_id, variable){ //// VEROVATNO NE TREBA
            var url = 'service/runtime/tasks/' + taskId + '/variables/' + variable;

            var req = {
             method: 'GET',
             url: url,
             headers: {'Content-Type' : 'application/json'}
            };

            return $http(req).then(
                function successCallback(response) {
                    if (response) {
                        return response.data;
                    } else {
                        console.log("err");
                    }
                },function errorCallback(response){
                    console.log("error");
                });  
        }

        function setTaskVariables(id, variables){
            var url = 'service/runtime/tasks/' + taskId + '/variables/';

         /*   [
              {
                "name" : "myTaskVariable",
                "scope" : "local",
                "type" : "string",
                "value" : "Hello my friend"
              },
              {

              }
            ]*/

            var req = {
             method: 'PUT',
             url: url,
             headers: {'Content-Type' : 'application/json'},
             data: variables     // pitanje je da li ovo radi
            };

            return $http(req).then(
                function successCallback(response) {
                    if (response) {
                        return response.data;
                    } else {
                        console.log("err");
                    }
                },function errorCallback(response){
                    console.log("error");
                });  
        }
		
         function getForm(task_id){
            var url = 'service/form/form-data?taskId=' + task_id;

            var req = {
             method: 'GET',
             url: url,
             headers: {'Content-Type' : 'application/json'}
            };

            return $http(req).then(
                function successCallback(response) {
                    if (response) {
                        return response.data;
                    } else {
                        console.log("err");
                    }
                },function errorCallback(response){
                    console.log("error");
                });  
        }

        function submitForm(task_id, properties){
            var url = 'service/form/form-data';

           /* "properties" : [
                {
                  "id" : "room",
                  "value" : "normal"
                }
              ]*/

            var req = {
             method: 'POST',
             url: url,
             headers: {'Content-Type' : 'application/json'},
             data: {'taskId': task_id, 'properties': properties}
            };

            return $http(req).then(
                function successCallback(response) {
                    if (response) {
                        return response.data;
                    } else {
                        console.log("err");
                    }
                },function errorCallback(response){
                    console.log("error");
                });  
        }

         function getTaskAssignee(user){
            var url = 'service/runtime/tasks?assignee=' + user; 

            var req = {
             method: 'GET',
             url: url,
             headers: {'Content-Type' : 'application/json'}
            };

            return $http(req).then(
                function successCallback(response) {
                    if (response) {
                        return response.data;
                    } else {
                        console.log("err");
                    }
                },function errorCallback(response){
                    console.log("error");
                });     
        }

        function getTaskCandidateUser(user){
            var url = 'service/runtime/tasks?candidateUser=' + user; 

            var req = {
             method: 'GET',
             url: url,
             headers: {'Content-Type' : 'application/json'}
            };

            return $http(req).then(
                function successCallback(response) {
                    if (response) {
                        return response.data;
                    } else {
                        console.log("err");
                    }
                },function errorCallback(response){
                    console.log("error");
                });     
        }

        function getTaskCandidateGroup(group){
            var url = 'service/runtime/tasks?candidateGroup=' + group; 

            var req = {
             method: 'GET',
             url: url,
             headers: {'Content-Type' : 'application/json'}
            };

            return $http(req).then(
                function successCallback(response) {
                    if (response) {
                        return response.data;
                    } else {
                        console.log("err");
                    }
                },function errorCallback(response){
                    console.log("error");
                });     
        }

        function getAllVariables(id){
            var url = 'service/runtime/process-instances/' + id + '/variables'; 

            var req = {
             method: 'GET',
             url: url,
             headers: {'Content-Type' : 'application/json'}
            };

            return $http(req).then(
                function successCallback(response) {
                    if (response) {
                        return response.data;
                    } else {
                        console.log("err");
                    }
                },function errorCallback(response){
                    console.log("error");
                });  

        }

         function getUserGroups(id){
            var url = 'service/identity/groups?member=' + id; 

            var req = {
             method: 'GET',
             url: url,
             headers: {'Content-Type' : 'application/json'}
            };

            return $http(req).then(
                function successCallback(response) {
                    if (response) {
                        return response.data;
                    } else {
                        console.log("err");
                    }
                },function errorCallback(response){
                    console.log("error");
                });  

        }

        function getProcessInstanceStartedByUser(id){
           var url = 'service/query/process-instances';

            var req = {
             method: 'POST',
             url: url,
             headers: {'Content-Type' : 'application/json'},
             data: {"variables":[{"name" : "initiator","value" : id,"operation" : "equals","type" : "string"}]}
            };

            return $http(req).then(
                function successCallback(response) {
                    if (response) {
                        return response.data;
                    } else {
                        console.log("err");
                    }
                },function errorCallback(response){
                    console.log("error");
                });  

        }
           

		return {
	             getProcess: getProcess,
	             startProcess: startProcess,
	             getProcessInstance: getProcessInstance,
                getTask: getTask,
                completeTask: completeTask,
                claimTask: claimTask,
                getTaskVariables: getTaskVariables,
                setTaskVariables: setTaskVariables,
                getForm: getForm,
                submitForm: submitForm,
                getTaskAssignee: getTaskAssignee,
                getTaskCandidateUser: getTaskCandidateUser,
                getTaskCandidateGroup: getTaskCandidateGroup,
                getAllVariables: getAllVariables,
                getUserGroups: getUserGroups,
                getProcessInstanceStartedByUser: getProcessInstanceStartedByUser
	    };

    }

})();