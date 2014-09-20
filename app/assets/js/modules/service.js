angular.module('myApp.services', [])
    .service('DataService', ['$http', '$q', function($http, $q) {

        // Return public API.
        return({
            getJSON: getJSON
        });

        function getJSON() {

            var request = $http({
                method: "get",
                dataType: 'jsonp',
                url: "../assets/json/activities.json",
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
            console.log("success");
            console.log("data");
            return( response.data );

        }

    }]);