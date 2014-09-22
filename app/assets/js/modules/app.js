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
        .when('/cat/:catname', {
            templateUrl : 'modalContainer',
            controller : 'ModalCategoryCtrl'
        })
        .when('/cat/:catname/card/:name', {
            templateUrl : 'modalContainer',
            controller : 'ModalDetailCtrl'
        })
        .when('/menu', {
            controller : 'MenuCtrl'
        })
        .otherwise({redirectTo: '/menu'});
});

