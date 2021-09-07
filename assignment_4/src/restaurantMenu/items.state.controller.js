(function () {
    'use strict';
    
    angular.module('restaurantModule')
    .controller('itemsStateController', ItemsStateController);
    
    ItemsStateController.$inject = ['dataDownloadService', 'items']
    function ItemsStateController(dataDownloadService, items){
        var itemCtrl = this;
        itemCtrl.items=items;
    }

})();