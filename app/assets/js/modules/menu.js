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