'use strict';

angular.module('myApp', [
    'ngRoute',
    'ui.bootstrap',
    'myApp.menu',
    'myApp.services',
    'myApp.modal'

])
.config(function($routeProvider) {
    $routeProvider
        .when('/cat/:catname/card/:cardname', {
            templateUrl : 'modalContainer',
            controller : 'ModalCtrl'
        })
        .when('/cat/:catname', {
            templateUrl : 'modalContainer',
            controller : 'ModalCtrl'
        })

        .when('/menu', {
            controller : 'MenuCtrl'
        })
        .otherwise({redirectTo: '/menu'});
});

