(function(){
    'use strict'; 

    angular.module("assignment3App", [])
        .controller("menuController", MenuController)
        .service("menuSearchService", MenuSearchService)
        .directive("foundItems", FoundItemsDirective)
        .constant('apiBaseUrl', 'http://davids-restaurant.herokuapp.com')

    MenuController.$inject=['menuSearchService']
    function MenuController(menuSearchService){
        var menuCtrl = this;

        menuCtrl.searchInTitle = false;
        menuCtrl.found = [];
        menuCtrl.isLoading = false;
        menuCtrl.firstTime = true;

        menuCtrl.search = function(){
            menuCtrl.isLoading = true;

            menuSearchService.downloadMenu()
            .then(function(response){

                var searchCriteria = menuCtrl.searchCriteria || "";
                menuCtrl.found = [];

                if (searchCriteria!="") {
                    response.data.menu_items.forEach(item => {
                        if (
                            (item.description.toLowerCase().indexOf(searchCriteria.toLowerCase())>-1) ||
                            (menuCtrl.searchInTitle && item.name.toLowerCase().indexOf(searchCriteria.toLowerCase())>-1) ) {

                            menuCtrl.found.push(item)
                        }
                    });
                }

                menuCtrl.isLoading = false;
                menuCtrl.firstTime = false;

            })
            .catch(function(response){
                alert(response.statusText);
            })
        }

        menuCtrl.removeItem = function(index){
            menuCtrl.found.splice(index, 1);
        }
    }

    MenuSearchService.$inject = ['$http', 'apiBaseUrl']
    function MenuSearchService($http, apiBaseUrl){
        var service = this;

        service.downloadMenu = function(){
            return $http({
                url: apiBaseUrl+'/menu_items.json'
            });
        }
    }

    function FoundItemsDirective(){
        var ddo = {
            templateUrl:"foundItems.html",
            scope:{
                searchResults:"<",
                removeItemRef:"&"
            },
        }

        return ddo;
    }
    
})();