(function () {

   app.controller('HomeCtrl', function($rootScope, $location)
   {
      $rootScope.activetab = $location.path();
   });

   app.controller('AboutCtrl', function($rootScope, $location)
   {
      $rootScope.activetab = $location.path();
   });

   app.controller('LoginCtrl', function($rootScope, $location)
   {
      $rootScope.activetab = $location.path();
   });
})();
