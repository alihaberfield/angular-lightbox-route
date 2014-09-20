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
        .when('/page/:name', {
            templateUrl : 'modalContainer',
            controller : 'ModalContainerCtrl'
        })
        .when('/menu', {
            controller : 'MenuCtrl'
        })
        .otherwise({redirectTo: '/menu'});
});


angular.module('myApp.menu', ['ngRoute'])
    .controller('MenuCtrl', ['$scope', '$rootScope', 'DataService', function($scope, $rootScope, DataService) {

        $rootScope.cards = loadData();

        function loadData() {
            // The articleService returns a promise.
            DataService.getJSON()
                .then(
                function( articles ) {
                    
                    
                    $rootScope.cards = articles;

                }
            );
        }

    }]);
angular.module('myApp.modal', ['ngRoute'])

.controller('ModalContainerCtrl',['$scope', '$modal', '$route', function($scope, $modal, $route) {

    var modalInstance = $modal.open({
        templateUrl : '../assets/templates/modal.html',
        controller: 'ModalCtrl'
    });

    $scope.activity = $route.current.pathParams.name;
    

    //Modal controls
    $scope.close = function () {
        
        $modalInstance.close();
    };

}])
.controller('ModalCtrl', ['$scope', '$route', '$location', '$modalInstance', function($scope, $route, $location, $modalInstance) {
    //Modal controls
    $scope.close = function () {
        $modalInstance.dismiss();
        $location.path('/newValue');
    };

    $scope.activity = $route.current.pathParams.name;

}]);
angular.module('myApp.services', [])
    .service('DataService', ['$http', '$q', function($http, $q) {

        // Return public API.
        return({
            getJSON: getJSON
        });

        function getJSON() {

            var request = $http({
                method: "get",
                dataType: 'jsonp',
                url: "../assets/json/activities.json",
                params: {
                    action: "get"
                }
            });
            return( request.then( handleSuccess, handleError ) );
        }

        function handleError( response ) {
            if (
                ! angular.isObject( response.data ) ||
                    ! response.data.message
                ) {

                return( $q.reject( "An unknown error occurred." ) );
            }
            return( $q.reject( response.data.message ) );

        }

        function handleSuccess( response ) {
            
            
            return( response.data );

        }

    }]);