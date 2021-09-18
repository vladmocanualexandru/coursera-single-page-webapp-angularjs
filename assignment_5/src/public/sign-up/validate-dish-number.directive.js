(function () {
    "use strict";
    
    angular.module('public')
    .directive('validateDishNumber', ["MenuService", function(MenuService) {
        return {
          require: 'ngModel',

          link: function(scope, elm, attrs, ctrl) {

            ctrl.$asyncValidators.validateDishNumber = function(modelValue, viewValue) {
                if (viewValue) {
                    return MenuService.getMenuItem(viewValue.toUpperCase()).then(function (response) {
                        ctrl.$setValidity('validDishNumber', true);
                    }).catch(function(e){
                        ctrl.$setValidity('validDishNumber', false);
                    });
                }
            };
          } 
        }
    
    }]);
})();
    