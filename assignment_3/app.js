(function(){
    'use strict'; 

    angular.module("assignment3App", [])
        .controller("menuController", MenuController)
        .service("menuSearchService", MenuSearchService)
        .directive("foundItems", FoundItemsDirective)
        .constant('apiBaseUrl', 'https://davids-restaurant.herokuapp.com')

    MenuController.$inject=['menuSearchService', '$sce']
    function MenuController(menuSearchService, $sce){
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

        menuCtrl.highlightCriteria = function(text){
            return $sce.trustAsHtml(text.replace(new RegExp(menuCtrl.searchCriteria, 'gi'), '<span class="searchWord">$&</span>'));
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
                removeItemRef:"&",
                highlightRef:"&",
                highlightTitle:"<"
            },
        }

        return ddo;
    }
    
})();