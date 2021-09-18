(function () {
    "use strict";
    
    angular.module('public')
    .controller('MyInfoController', MyInfoController);
    
    MyInfoController.$inject = ['UserInfoService', 'MenuService', 'favDishData', 'ApiPath'];
    function MyInfoController(UserInfoService, MenuService, favDishData, ApiPath) {
      var $ctrl = this;

      $ctrl.favDishData = favDishData;
      $ctrl.basePath = ApiPath;

      $ctrl.isUserSignedUp = function(){
          return UserInfoService.isUserSignedUp();
      }

      $ctrl.getUserInfo = function(){
          return UserInfoService.getUserInfo();
      }

    }
    
    
    })();
