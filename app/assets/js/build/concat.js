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


angular.module('myApp.menu', ['ngRoute'])
    .controller('MenuCtrl', ['$scope', 'DataService', function($scope, DataService) {

        $scope.cards = loadData();

        function loadData() {
            // The articleService returns a promise.
            DataService.getJSON()
                .then(
                function( articles ) {
                    $scope.cards = $.map(articles, function(el) { return el; });

                }
            );
        }
    }]);
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

angular.module('myApp.services', [])
    .service('DataService', ['$http', '$q', function($http, $q) {

        // Return public API.
        return({
            getJSON: getJSON,
            getCard: getCard,
            getNext: getNext,
            getPrev: getPrev
        });

        var card,
            cards,
            next,
            prev,
            nextIndex,
            prevIndex;

        function getCard(name) {
            var i;
            if (cards) {
                for (i = 0; i<cards.length;i++) {
                    if (cards[i].shortName == name) {
                        card = cards[i];
                        nextIndex = i + 1;
                        prevIndex = i - 1;
                        next = cards[nextIndex];
                        prev = cards[prevIndex];
                        return card;
                    }
                }
            }
            return card;
        }

        function getNext() {
            if (next) {
                return next.shortName;
            } else {
                return cards[0].shortName;
            }

        }

        function getPrev() {
            if (prev) {
                return prev.shortName;
            } else {

                return cards[cards.length-1].shortName;
            }

        }


        function getJSON() {
            var request = $http({
                method: "get",
                dataType: 'jsonp',
                url: "../assets/json/activities.json",
                params: {
                    action: "get"
                }
            });

            if (!cards) {
                return( request.then( handleSuccess, handleError ) );
            } else {
                return cards;
            }

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
            return( cards );

        }

    }])
    .service('InputService', ['', function() {

        //Public API
        return ({

        })

    }]);