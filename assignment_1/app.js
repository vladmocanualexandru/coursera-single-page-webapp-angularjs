(function () {
    'use strict';

    
    angular.module('assignment1App', [])
        .controller('lunchCheckerController', lunchCheckerControllerLogic);

    lunchCheckerControllerLogic.$inject = ['$scope'];

    function lunchCheckerControllerLogic($scope){
        $scope.resultMessage = ""
        $scope.warningMessage = ""
        $scope.items = ""
        $scope.borderColor = "#FFF"
        $scope.fontColor = "#000"
        
        $scope.checkItems = function(){
            var items = getItems($scope.items)
            var itemCount = 0
            
            $scope.warningMessage = ""
            
            items.forEach(element => {
                if (element.trim() != "") {
                    itemCount++;
                } else {
                    $scope.warningMessage = "Empty items (i.e. ', ,') not counted!"
                }
            });

            
            if(itemCount==0) {
                $scope.resultMessage = "Please enter data first";
                $scope.borderColor = "#F00"
                $scope.fontColor = "#F00"
            } else if (itemCount<=3) {
                $scope.resultMessage = "Enjoy!";
                $scope.borderColor = "#0a0"
                $scope.fontColor = "#0a0"
            } else {
                $scope.resultMessage = "Too much!";
                $scope.borderColor = "#0a0"
                $scope.fontColor = "#0a0"
            }
        }
    }

    function getItems(items){
        return items.split(",")
    }
})();