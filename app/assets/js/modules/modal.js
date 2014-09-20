angular.module('myApp.modal', ['ngRoute'])

    .controller('ModalContainerCtrl',['$scope', '$modal', '$route', '$location', function($scope, $modal, $route, $location) {

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

        $scope.$on("$locationChangeStart", function (event, nextLocation, currentLocation) {
            modalInstance.close();
        });

    }])
    .controller('ModalCtrl', ['$scope', '$route', '$location', '$sce', '$timeout', '$modalInstance', 'DataService', function($scope, $route, $location, $sce, $timeout, $modalInstance, DataService) {

        //Modal controls
        $scope.close = function () {
            $modalInstance.dismiss();
            $location.path('/newValue');
        };

        $scope.activity = $route.current.pathParams.name;

        $scope.card = DataService.getCard($scope.activity)

        $scope.TrustDangerousSnippet = function(post) {
            return $sce.trustAsHtml(post);
        };



    }]);
