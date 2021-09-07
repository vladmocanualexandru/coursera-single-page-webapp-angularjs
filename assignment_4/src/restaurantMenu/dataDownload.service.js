(function () {
    'use strict';

    angular.module('restaurantModule')
        .service('dataDownloadService', DataDownloadService)
        .constant('apiBaseUrl', 'https://davids-restaurant.herokuapp.com')

    DataDownloadService.$inject = ['$http', 'apiBaseUrl'];
    function DataDownloadService($http, apiBaseUrl){
        var service = this;

        service.getCategories = function(){
            return $http({
                url: apiBaseUrl+'/categories.json'
            });
        }

        service.getItemsForCategory = function(catShortName){
            console.log(catShortName);
            return $http({
                method: "GET",
                url: apiBaseUrl+'/menu_items.json?category='+catShortName,
                // data: {"category": catShortName}
            });
        }
    }

})();
