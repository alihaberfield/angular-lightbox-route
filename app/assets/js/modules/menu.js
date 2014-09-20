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