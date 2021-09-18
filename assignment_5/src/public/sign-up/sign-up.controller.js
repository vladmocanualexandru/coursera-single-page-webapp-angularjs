(function () {
    "use strict";
    
    angular.module('public')
    .controller('SignUpController', SignUpController);
    
    SignUpController.$inject = ['UserInfoService'];
    function SignUpController(UserInfoService) {
      var $ctrl = this;
      $ctrl.userInfo = {}

      $ctrl.isUserSignedUp = function(){
        return UserInfoService.isUserSignedUp();
      }

      $ctrl.signUp = function(){
        $ctrl.userInfo.favDish = $ctrl.userInfo.favDish.toUpperCase();
        UserInfoService.signUp($ctrl.userInfo);
      }

    }
    
    
    })();
    