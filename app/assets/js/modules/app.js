'use strict';

angular.module('myApp', [
    'ngRoute',
    'ui.bootstrap',
    'myApp.services',
    'myApp.menu',
    'myApp.modal'

])
.config(function($routeProvider) {
    $routeProvider
        .when('/card/:name', {
            templateUrl : 'modalContainer',
            controller : 'ModalContainerCtrl'
        })
        .when('/menu', {
            controller : 'MenuCtrl'
        })
        .otherwise({redirectTo: '/menu'});
});

