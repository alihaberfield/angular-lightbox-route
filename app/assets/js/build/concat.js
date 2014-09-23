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


angular.module('myApp.menu', ['ngRoute'])
    .controller('MenuCtrl', ['$scope', 'DataService', function($scope, DataService) {


        $scope.categories = loadData();

        function loadData() {
            DataService.getJSON()
                .then(
                function( articles ) {
                    $scope.categories = $.map(articles, function(el) { return el; });

                }
            );

        }


    }]);
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

angular.module('myApp.services', [])
    .service('DataService', ['$http', '$q', function($http, $q) {

        var card,
            cards,
            next,
            prev,
            nextIndex,
            prevIndex,
            categories = {};

        // Return public API.
        return({
            getJSON: getJSON,
            getCatNext: getCatNext,
            getCatPrev: getCatPrev,
            getCardNext: getCardNext,
            getCardPrev: getCardPrev,
            setCategory: setCategory,
            getCategory: getCategory,
            categories: categories
        });


        function setCategory(name, category) {
            categories[name] = category;
        }

        function getCategory(name) {
            var category;
            for (var i = 0; i < categories.length; i++) {
                if (categories[i].shortName == name) {
                    category = categories[i];
                }
            }
            return category;
        }


        function getCardNext(name, arr) {
            var self = findIndex(name, arr),
                next;

            next = arr[self+1];
            if(!next) {
                next = arr[0];
            }
            return next.shortName;
        }

        function getCardPrev(name, arr) {
            var self = findIndex(name, arr),
                prev;

            prev = arr[self-1];
            if (!prev) {
                prev = arr[arr.length-1];
            }

            return prev.shortName;
        }

        function getCatNext(name) {
            var self = findIndex(name, categories),
                next;

            next = categories[self+1];
            if (!next) {
                next = categories[0];
            }
            return next.shortName;

        }

        function getCatPrev(name) {
            var self = findIndex(name, categories),
                prev;
            prev = categories[self-1];

            if (!prev) {
                prev = categories[categories.length-1];
            }
            return prev.shortName;
        }

        function findIndex(name, arr) {
            var index;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].shortName == name) {
                    index = i;
                }
            }
            return index;
        }

        function getJSON(activity) {
            var request = $http({
                method: "get",
                dataType: 'jsonp',
                url: "../assets/json/categories.json",
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
            cards = response.data;
            categories = response.data;
            return( categories );

        }

    }]);