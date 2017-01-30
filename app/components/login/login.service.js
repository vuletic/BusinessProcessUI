(function () {
    'use strict';

    angular
        .module('app')
        .service('loginService', loginService);

    //$q?
    processService.$inject = ['$http', '$window', '$localStorage', 'jwtHelper'];
    function loginService($http, $window, $localStorage, jwtHelper){


        function login(username, password, callback) {


            $.post( '/api/korisnici/login', { username: username, password: password } )
                .done(function (response) {
                    // ukoliko postoji token, prijava je uspesna
                    if (response) {
                        // korisnicko ime, token i rola (ako postoji) cuvaju se u lokalnom skladištu
                        var currentUser = { username: username, token: response }
                        var tokenPayload = jwtHelper.decodeToken(response);
                        if(tokenPayload.role){
                            currentUser.role = tokenPayload.role;
                        }
                        // prijavljenog korisnika cuva u lokalnom skladistu
                        $localStorage.currentUser = currentUser;
                        // jwt token dodajemo u to auth header za sve $http zahteve
                        $http.defaults.headers.common.Authorization = response;
                        console.log(response);
                        // callback za uspesan login
                        callback(true);
                    } else {
                        // callback za neuspesan login
                        callback(false);
                    }
                });

        }

        function logout() {
            // uklonimo korisnika iz lokalnog skladišta
            delete $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = '';
            $window.location = "#/main";
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