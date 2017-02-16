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

		

		return {
	            getProcess: getProcess,
	            startProcess: startProcess,
	            getProcessInstance: getProcessInstance
	    };

    }

})();