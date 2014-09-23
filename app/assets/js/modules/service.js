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