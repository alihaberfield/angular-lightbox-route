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


        function getJSON(activity) {
            var url = "../assets/json/" + activity + ".json",
                request = $http({
                method: "get",
                dataType: 'jsonp',
                url: url,
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
            return( cards );

        }

    }])
    .service('InputService', ['', function() {

        //Public API
        return ({

        })

    }]);