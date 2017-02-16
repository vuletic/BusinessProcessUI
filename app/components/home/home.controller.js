(function () {
    'use strict';

    angular
		.module('app')
		.controller('homeController', homeController);

	homeController.$inject = ['rootService'];
    function homeController(rootService) {
        var hc = this;
        hc.home = "Home";

        rootService.getProcess('process:1:20008').then(function(response){
            hc.process = response;
            console.log(hc.process);
        });


        rootService.getProcessInstance('').then(function(response){
            hc.process = response.data;
            console.log(hc.process);
        });
        
    }


})();