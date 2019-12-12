function aplicaCor() {
    var x = document.getElementsByClassName('resultado');
    for (var i = 0; i < x.length; i++) {
        if(x[i].textContent == "OK"){
            x[i].style.color = "GREEN"
        }else{
            x[i].style.color = "RED"
        };
    }                
};

var pathName = window.location.search;
var jsonFile = 'relatorios'

if (pathName.indexOf('?tipo=') != -1) {
    jsonFile = pathName.replace('?tipo=','');
    console.log(jsonFile);
}

function downloadFile() {
   return window.open('csv/'+jsonFile+'.csv');
}

var app = angular.module("myApp", []);

app.controller("myCtrl", function($scope, $http) {
    $scope.entidade = "STARViterbocloud_1";

    $http.get('json/'+jsonFile+'.json')
        .then(function(response) {
          $scope.jsonData = response.data;
          $scope.totalOk = 0;
          $scope.totalErro = 0;
          $scope.totalNaoEncontrado = 0;
          if(jsonFile != 'relatorios'){
            for (var i = 0; i < ($scope.jsonData.content).length; i++) {
                if($scope.jsonData.content[i].resultado == "OK") { $scope.totalOk++; } 
                if($scope.jsonData.content[i].resultado == "POSSUI ERRO") { $scope.totalErro++; } 
                if($scope.jsonData.content[i].resultado == "NÃO ENCONTRADO") { $scope.totalNaoEncontrado++; } 
            }
          }
        });
});

