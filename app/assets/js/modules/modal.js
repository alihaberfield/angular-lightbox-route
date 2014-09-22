angular.module('myApp.modal', ['ngRoute'])

    .controller('ModalContainerCtrl',['$scope', '$modal', '$route', '$location', function($scope, $modal, $route, $location) {


        var modalInstance = $modal.open({
            templateUrl : '../assets/templates/modal.html',
            controller: 'ModalCtrl'
        });

        $scope.activity = $route.current.pathParams.name;


        $scope.$on("$locationChangeStart", function (event, nextLocation, currentLocation) {
            modalInstance.close();
        });

        //When modal overlay is clicked, return to menu
        $scope.close = function () {
            console.log("ModalContainer close")
            $modalInstance.dismiss();
            $location.path('/menu');
        };

    }])
    .controller('ModalCtrl', ['$scope', '$route', '$location', '$sce', '$timeout', '$modalInstance', 'DataService', function($scope, $route, $location, $sce, $timeout, $modalInstance, DataService) {


        //When close button is clicked, return to menu
        $scope.close = function () {
            $modalInstance.dismiss();
            $location.path('/menu');
        };

        $scope.activity = $route.current.pathParams.name;

        $scope.card = DataService.getCard($scope.activity);
        $scope.next = DataService.getNext();
        $scope.prev = DataService.getPrev();


        $scope.TrustDangerousSnippet = function(post) {
            return $sce.trustAsHtml(post);
        };


    }]);
