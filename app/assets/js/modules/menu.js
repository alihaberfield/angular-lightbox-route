angular.module('myApp.menu', ['ngRoute'])
    .controller('MenuCtrl', ['$scope', 'DataService', function($scope, DataService) {


        $scope.categories = buildCategories();

        function buildCategories() {

            DataService.getJSON('categories')
                .then(
                    function( arr ) {
                        $scope.categories = arr;

                        for (var i = 0; i < arr.length; i++) {
                            loadActivityData(arr[i].shortName, i);
                        };
                    }
                )

        }


        function loadActivityData(activity, index) {
            // The articleService returns a promise.
            DataService.getJSON(activity)
                .then(
                function( articles ) {

                    var arr = $.map(articles, function(el) { return el; });
                    $scope.categories[index].activities = arr;

                }
            );

        }


    }]);