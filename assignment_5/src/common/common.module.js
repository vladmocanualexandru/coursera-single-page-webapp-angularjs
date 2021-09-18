(function() {
"use strict";

angular.module('common', [])
.constant('ApiPath', 'https://glacial-reef-94932.herokuapp.com')
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
