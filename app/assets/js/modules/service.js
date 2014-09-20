angular.module('myApp.services', [])
    .service('DataService', ['$http', '$q', function($http, $q) {

        // Return public API.
        return({
            getJSON: getJSON,
            getCard: getCard
        });

        var cards,
            card;

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
                console.log("cards not loaded yet - loading")
                return( request.then( handleSuccess, handleError ) );
            } else {
                return cards;
            }

        }

        function getCard(name) {
            if (cards) {
                card = cards[name];
            }
            return card;
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
            cards = response.data;
            return( cards );

        }

    }]);