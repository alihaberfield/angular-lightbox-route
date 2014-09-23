angular.module('myApp.modal', ['ngRoute'])


    .controller('ModalCtrl',['$scope', '$modal', '$route', '$location', 'DataService', function($scope, $modal, $route, $location, DataService) {

        var modalInstance, modalDetailInstance, detail;

        detail = $route.current.pathParams.cardname;

        if (!modalInstance) {
            modalInstance = $modal.open({
                templateUrl : '../assets/templates/modal-category.html',
                controller: 'ModalCategoryCtrl'
            });
        }

        if (detail && !modalDetailInstance) {
            modalDetailInstance = $modal.open({
                templateUrl : '../assets/templates/modal-detail.html',
                controller: 'ModalDetailCtrl'
            });
        }

        $scope.$on("$locationChangeStart", function (event, nextLocation, currentLocation) {
            modalInstance.close();
            if (modalDetailInstance) {
                modalDetailInstance.close();
            }
        });

        //When modal overlay is clicked, return to menu
        $scope.close = function () {
            $modalInstance.dismiss();
            $location.path('/menu');
        };

    }])

    .controller('ModalCategoryCtrl', ['$scope', '$route', '$location', '$sce', '$timeout', '$modalInstance', 'DataService', function($scope, $route, $location, $sce, $timeout, $modalInstance, DataService) {

        var name = $route.current.pathParams.catname
        $scope.category = DataService.getCategory(name);

        //When close button is clicked, return to menu
        $scope.close = function () {
            $modalInstance.dismiss();
            $location.path('/menu');
        };


        //Get next & previous category links
        $scope.next = DataService.getCatNext(name, DataService.categories);
        $scope.prev = DataService.getCatPrev(name);


        $scope.TrustDangerousSnippet = function(post) {
            return $sce.trustAsHtml(post);
        };


    }]).controller('ModalDetailCtrl', ['$scope', '$route', '$location', '$sce', '$timeout', '$modalInstance', 'DataService', function($scope, $route, $location, $sce, $timeout, $modalInstance, DataService) {


        var name = $route.current.pathParams.cardname;
        $scope.category = DataService.getCategory($route.current.pathParams.catname);

        //When close button is clicked, return to menu
        $scope.closeDetail = function () {
            $modalInstance.dismiss();
            $location.path('/cat/' + $route.current.pathParams.catname);
        };

        $scope.next = DataService.getCardNext(name, $scope.category.activities);
        $scope.prev = DataService.getCardPrev(name, $scope.category.activities);


        $scope.TrustDangerousSnippet = function(post) {
            return $sce.trustAsHtml(post);
        };


        //Find activity in category
        function findActivity(name) {
            for (var i=0; i<$scope.category.activities.length; i++) {
                if (name == $scope.category.activities[i].shortName) {
                    $scope.activity = $scope.category.activities[i];
                }
            }
        }

        findActivity(name)

    }]);
