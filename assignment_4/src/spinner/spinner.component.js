(function(){
    'use strict';
    
    angular.module('spinner')
        .component('spinner', {
            templateUrl : "src/spinner/spinner.html",
            controller: SpinnerController
        });

    SpinnerController.$inject = ['$rootScope']
    function SpinnerController($rootScope){
        var $ctrl = this;
        $ctrl.isSpinning = false;

        var cancellers = []
        $ctrl.$onInit =  function(){
            cancellers.push($rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options){
                $ctrl.isSpinning = true;
            }));

            cancellers.push($rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
                $ctrl.isSpinning = false;
            }));

            cancellers.push($rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
                console.log(error);
                $ctrl.isSpinning = false;
            }));
        }

        $ctrl.$onDestroy = function(){
            cancellers.forEach(c => {
                c();
            });
        }
    }
})();