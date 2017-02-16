(function () {
    'use strict';

    angular
		.module('app')
		.controller('loginController', loginController);

	loginController.$inject = ['loginService'];
    function loginController(loginService) {
        var lc = this;
        lc.user = {};
        
    }


})();