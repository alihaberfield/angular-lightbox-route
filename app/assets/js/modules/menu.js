angular.module('myApp.menu', ['ngRoute'])
    .controller('MenuCtrl', ['$scope', '$rootScope', 'DataService', function($scope, $rootScope, DataService) {

        $scope.cards = loadData();

        function loadData() {
            // The articleService returns a promise.
            DataService.getJSON()
                .then(
                function( articles ) {
                    console.log("at then, articles is: ");
                    console.log(articles);
                    $scope.cards = articles;


                }
            );
        }

    }]);