(function () {
    'use strict';

    angular
        .module('app')
        .service('loginService', loginService);

    //$q?
    loginService.$inject = ['$http', '$window', '$localStorage', 'jwtHelper', '$state'];
    function loginService($http, $window, $localStorage, jwtHelper, $state){


        function login(username, password) {
            var url = 'http://localhost:8080/activiti-rest/service/identity/users/' + username;
            var auth = "Basic " + btoa(username + ':' + password);
            $http.defaults.headers.common['Authorization'] = auth;

            var req = {
             method: 'GET',
             url: url,
             headers: {
                'Content-Type' : 'application/json'             },
            };

            return $http(req).then(
                function successCallback(response) {
                    
                    if (response) {
                        var currentUser = response.data;
                        currentUser.authorization = auth;
                        $localStorage.currentUser = currentUser;
                        return currentUser;
                        //$state.go('root.home');
                        //$window.location = "/activiti-rest/index.html#!";
                        //$window.location.reload();
                    } else {
                        console.log("err");
                    }
                },function errorCallback(response){
                    console.log("error");
                });
                

        }

        function logout() {
            // uklonimo korisnika iz lokalnog skladišta
            delete $localStorage.currentUser;
            //$http.defaults.headers.common.Authorization = '';
            $state.go('root.login');
            //$window.location = "/activiti-rest/index.html#!/login";
            //$window.location.reload();
        }

        function getCurrentUser() {
            return $localStorage.currentUser;
        }


        return {
            login: login,
            logout: logout,
            getCurrentUser: getCurrentUser
        };

    }

})();