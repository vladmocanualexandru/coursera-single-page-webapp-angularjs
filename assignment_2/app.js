(function () {
    'use strict'; 

    angular.module("assignment2App", [])
        .controller("toBuyController", ToBuyController)
        .controller("alreadyBoughtController", AlreadyBoughtController)
        .service("shoppingCartService", ShoppingListCheckOffService )

    ToBuyController.$inject = ['shoppingCartService']
    function ToBuyController(shoppingCartService){
        var toBuyCtrl = this;

        toBuyCtrl.getItems = function(){
            return shoppingCartService.stuffToBuy;
        }

        toBuyCtrl.addItemToBought = function(index){
            shoppingCartService.buyItem(index)
        }
    }
    
    AlreadyBoughtController.$inject = ['shoppingCartService']
    function AlreadyBoughtController(shoppingCartService){
        var alreadyBoughtCtrl = this;

        alreadyBoughtCtrl.getItems = function(){
            return shoppingCartService.boughtStuff;
        }

        alreadyBoughtCtrl.addItemToToBuy = function(index){
            shoppingCartService.undoItem(index)
        }
    }

    function ShoppingListCheckOffService (){
        var cartService = this
        
        cartService.stuffToBuy = [
            { name: "Flour", quantity: "1kg" },
            { name: "Sugar", quantity: "2kg" },
            { name: "Baking powder", quantity: "250g" },
            { name: "Salt", quantity: "1kg" },
            { name: "Milk", quantity: "1L" }
        ]

        cartService.boughtStuff = []

        cartService.buyItem = function(index) {
            cartService.boughtStuff.push(cartService.stuffToBuy[index]);
            cartService.stuffToBuy.splice(index,1);
        }

        cartService.undoItem = function(index) {
            cartService.stuffToBuy.push(cartService.boughtStuff[index]);
            cartService.boughtStuff.splice(index,1);
        }
    }
})();