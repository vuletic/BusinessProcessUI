(function () {
    'use strict';

    angular
		.module('app')
		.controller('homeController', homeController);

	homeController.$inject = ['rootService'];
    function homeController(rootService) {
        var hc = this;
        hc.home = "Home";

        /*rootService.getProcess('process:3:55004').then(function(response){
            hc.process = response;
            console.log(hc.process);
        });*/


       rootService.getProcessInstance('').then(function(response){
            hc.process = response.data;
            console.log(hc.process);
        });
/*
        rootService.getTask(32507).then(function(response){
            hc.process = response.data;
            console.log(hc.process);
        });*/

        /*rootService.getAllVariables(32501).then(function(response){
            hc.process = response;
            console.log(hc.process);
        });*/


      /*  rootService.getTaskAssignee('kermit').then(function(response){
            hc.process = response.data;
            console.log(hc.process);
        });

        rootService.getTaskCandidateUser('kermit').then(function(response){
            hc.process = response.data;
            console.log(hc.process);
        });

        rootService.getTaskCandidateGroup('user').then(function(response){
            hc.process = response.data;
            console.log(hc.process);
        });*/

      /*  rootService.getForm(32507).then(function(response){
            hc.process = response;
            console.log(hc.process);
        });*/

        /*var properties = [{'id': 'ime_doktoranta', 'value': 'djole'}, {'id': 'prezime_doktoranta', 'value': 'djolevic'}];
        rootService.submitForm('22547', properties).then(function(response){
            hc.process = response;
            console.log(hc.process);
        });*/

        
    }


})();