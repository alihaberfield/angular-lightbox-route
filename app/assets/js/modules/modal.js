angular.module('myApp.modal', ['ngRoute'])

.controller('ModalContainerCtrl',['$scope', '$modal', '$route', function($scope, $modal, $route) {

    var modalInstance = $modal.open({
        templateUrl : '../assets/templates/modal.html',
        controller: 'ModalCtrl'
    });

    $scope.activity = $route.current.pathParams.name;
    console.log($scope.activity);

    //Modal controls
    $scope.close = function () {
        console.log("close!");
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