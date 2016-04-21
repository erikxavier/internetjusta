var angular = require('angular');
var relatorio = require('./relatorio-franquia')

var app = angular.module('InternetJusta', []);


function MainCtrl() {
    
    //this.relatorio = new relatorio(4 , 80);
    this.calcular = function(vel, franq) {
        this.relatorio = new relatorio(vel, franq);
    }
}
app.controller('MainCtrl', MainCtrl)