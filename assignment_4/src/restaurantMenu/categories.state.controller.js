(function () {
    'use strict';
    
    angular.module('restaurantModule')
    .controller('categoriesStateController', CategoriesStateController);
    
    CategoriesStateController.$inject = ['dataDownloadService', 'cats']
    function CategoriesStateController(dataDownloadService, cats){
        var catCtrl = this;
        console.log(cats);
        catCtrl.cats=cats;
    }

})();