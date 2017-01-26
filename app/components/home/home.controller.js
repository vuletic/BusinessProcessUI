(function () {
    'use strict';

    angular
		.module('app')
		.controller('homeController', homeController);

	homeController.$inject = ['$http'];
    function homeController($http) {
        var hc = this;
        hc.home = "Home";

        $http.get("http://kermit:kermit@localhost:8080/activiti-rest/service/identity/groups").then(function (response) {
                alert(JSON.stringify(response.data));
            });

    }


})();