(function () {
    'use strict';

    angular
		.module('app')
		.controller('formController', formController);

	formController.$inject = ['rootService', '$stateParams', '$state', '$timeout'];
    function formController(rootService, $stateParams, $state, $timeout) {
        var fc = this;
        fc.formData = {};
        fc.state;
        
        fc.taskId = $stateParams.taskId;
        fc.taskName = $stateParams.taskName;
        fc.processInstanceId = $stateParams.processInstanceId;
        fc.all = [];
        fc.ftn = [];
        fc.others = [];
        fc.mails = {};

        fc.filter = function(arr1, arr2){
            var ret = [];
            for(var i in arr1){
                var exists = (arr2.filter(function(e) { return e.id == arr1[i].id; }).length > 0);
                if (!exists)
                    ret.push(arr1[i]);
            }
            return ret;
        }

        fc.preprocessForm = function(){
            if(fc.taskName == "Predlog komisije o podobnosti" || fc.taskName == "Odluka o komisiji za podobnost"){
                rootService.getMembersOfGroup('profesor').then(function(response){
                    fc.all = response.data;
                    for(var i in fc.all){
                        fc.mails[fc.all[i].id] = fc.all[i].email;
                    }
                    rootService.getMembersOfGroup('ftn').then(function(response){
                        fc.ftn = response.data
                        fc.others = fc.filter(fc.all, fc.ftn);
                        fc.state = 1;
                        if(fc.taskName == "Odluka o komisiji za podobnost"){
                            rootService.getVariable(fc.processInstanceId, "clan1_komisija1").then(function(response){
                                fc.formData['clan1_komisija1'] = response.value;
                            });
                            rootService.getVariable(fc.processInstanceId, "clan2_komisija1").then(function(response){
                                fc.formData['clan2_komisija1'] = response.value;
                            });
                            rootService.getVariable(fc.processInstanceId, "clan3_komisija1").then(function(response){
                                fc.formData['clan3_komisija1'] = response.value;
                            });
                            rootService.getVariable(fc.processInstanceId, "clan4_komisija1").then(function(response){
                                fc.formData['clan4_komisija1'] = response.value;
                            });
                            rootService.getVariable(fc.processInstanceId, "clan5_komisija1").then(function(response){
                                fc.formData['clan5_komisija1'] = response.value;
                            });
                        }

                    });
                });
            }else if(fc.taskName == "Konacan predlog naslova"){
                rootService.getForm(fc.taskId).then(function(response){
                    fc.form = response;
                    console.log(fc.form);
                    rootService.getVariable(fc.processInstanceId, "naslov_disertacije").then(function(response){
                        fc.formData['naslov_disertacije'] = response.value;
                    });

                });
            }else if(fc.taskName == "Odluka o prihvatanju i odredjivanje mentora"){
                rootService.getMembersOfGroup('profesor').then(function(response){
                    fc.ftn = response.data;
                    fc.state = 2;
                });
            }else if(fc.taskName == "Predlog komisije o oceni" || fc.taskName == "Odluka o komisiji za ocenu"){
                rootService.getMembersOfGroup('profesor').then(function(response){
                    fc.all = response.data;
                    for(var i in fc.all){
                        fc.mails[fc.all[i].id] = fc.all[i].email;
                    }
                    rootService.getMembersOfGroup('ftn').then(function(response){
                        fc.ftn = response.data
                        fc.others = fc.filter(fc.all, fc.ftn);
                        fc.state = 3;
                        if(fc.taskName == "Odluka o komisiji za ocenu"){
                            rootService.getVariable(fc.processInstanceId, "clan1_komisija2").then(function(response){
                                fc.formData['clan1_komisija2'] = response.value;
                            });
                            rootService.getVariable(fc.processInstanceId, "clan2_komisija2").then(function(response){
                                fc.formData['clan2_komisija2'] = response.value;
                            });
                            rootService.getVariable(fc.processInstanceId, "clan3_komisija2").then(function(response){
                                fc.formData['clan3_komisija2'] = response.value;
                            });
                            rootService.getVariable(fc.processInstanceId, "clan4_komisija2").then(function(response){
                                fc.formData['clan4_komisija2'] = response.value;
                            });
                            rootService.getVariable(fc.processInstanceId, "clan5_komisija2").then(function(response){
                                fc.formData['clan5_komisija2'] = response.value;
                            });
                        }

                    });
                });
            }else{
                rootService.getForm(fc.taskId).then(function(response){
                    fc.form = response;
                    console.log(fc.form);
                });
            }
        }

        

        rootService.getTask(fc.taskId).then(function(response){
            fc.task = response;
            console.log(fc.task);
        });



        fc.preprocessForm();

        fc.submit = function(){

            //fc.processData();

                var properties = [];
                var keys = Object.keys(fc.formData);

                for(var key in keys){
                    var k = keys[key];
                    var temp = {};
                    temp.id = k;
                    temp.value = fc.formData[k];
                    properties.push(temp);
                }
                
                rootService.submitForm(fc.taskId, properties).then(function(response){
                    $state.go('root.tasks', null, {reload: true});
                });

               	
        }

        fc.processData = function(){
            
            if(fc.taskName == "Odluka o komisiji za podobnost"){
                var properties = [];
                var obj = {"name": "komisija1email", "value": [], "scope": "local"};
                var obj2 = {"name": "komisija1", "value": [], "scope": "local"};
                var obj3 = {"name": "potpisuju1", "value": 0, "scope": "local", "type": "integer"};
                var obj4 = {"name": "potpisuju2", "value": 0, "scope": "local", "type": "integer"};
                var obj5 = {"name": "prisutnih", "value": 0, "scope": "local", "type": "integer"};
                var obj6 = {"name": "fakultetemail", "value": "vuletic93@gmail.com", "scope": "local", "type": "string"};
                var keys = Object.keys(fc.formData);
                for(var key in keys){
                    var k = keys[key];
                    var temp = {};
                    temp.id = k;
                    temp.value = fc.formData[k];
                    obj.value.push(fc.mails[temp.value]);
                    obj2.value.push(temp.value);
                }
                properties.push(obj);
                properties.push(obj2);
                properties.push(obj3);
                properties.push(obj4);
                properties.push(obj5);
                properties.push(obj6);
                rootService.setVariable(fc.processInstanceId, properties);
                $timeout(fc.submit, 500);
            }else if(fc.taskName == "Odluka o komisiji za ocenu"){
                var properties = [];
                var obj = {"name": "komisija2email", "value": [], "scope": "local"};
                var obj2 = {"name": "komisija2", "value": [], "scope": "local"};
                var keys = Object.keys(fc.formData);
                for(var key in keys){
                    var k = keys[key];
                    var temp = {};
                    temp.id = k;
                    temp.value = fc.formData[k];
                    obj.value.push(fc.mails[temp.value]);
                    obj2.value.push(temp.value);
                }
                properties.push(obj);
                properties.push(obj2);
                rootService.setVariable(fc.processInstanceId, properties);
                $timeout(fc.submit, 500);

            }else{
                fc.submit();
            }
        
        }

 	}


})();