(function () {
    'use strict';

    angular
		.module('app')
		.controller('formController', formController);

	formController.$inject = ['rootService', '$stateParams'];
    function formController(rootService, $stateParams) {
        var fc = this;
        
        fc.taskId = $stateParams.taskId;

        rootService.getForm(fc.taskId).then(function(response){
            fc.form = response;
            console.log(fc.form);
        });

 	}


})();