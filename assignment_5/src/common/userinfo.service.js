(function () {
    "use strict";
    
    angular.module('common')
    .service('UserInfoService', UserInfoService);
    
    
    // UserInfoService.$inject = ['$http', 'ApiPath'];
    function UserInfoService() {
      var service = this;

      service.userSignedUp = false;
      service.userInfo = {}

      service.isUserSignedUp = function(){
          return service.userSignedUp;
      }

      service.signUp = function(userInfo){
        service.userInfo = userInfo;
        service.userSignedUp = true;
      }

      service.getUserInfo = function(){
          return service.userInfo;
      };

    }
    })();
    