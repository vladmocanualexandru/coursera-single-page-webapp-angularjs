(function () {
    'use strict';

    angular.module('restaurantModule')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider){
        //define default route for unrecognizable URLs
        $urlRouterProvider.otherwise('/');

        //states definitions
        $stateProvider
            .state('home', {
                url:'/',
                templateUrl:'src/restaurantMenu/states/home.state.html'
            })
            .state('categories', {
                url:'/categories',
                templateUrl:'src/restaurantMenu/states/categories.state.html',
                controller: 'categoriesStateController as catCtrl', 
                resolve: {
                    cats: ['dataDownloadService', function(dataDownloadService){
                        return dataDownloadService.getCategories();
                    }]
                }
            })
            .state('items', {
                url:'/items/{catShortName}',
                templateUrl:'src/restaurantMenu/states/items.state.html',
                controller: 'itemsStateController as itemCtrl',
                resolve: {
                    items: ['dataDownloadService', '$stateParams', function(dataDownloadService, $stateParams){
                        return dataDownloadService.getItemsForCategory($stateParams.catShortName);
                    }]
                }
            })
    }

})();
