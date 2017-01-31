(function () {
   app.controller('RegisterCtrl', function($rootScope, $scope, $location, $http)
   {
      $(window).scrollTop(0);
      $rootScope.activetab = $location.path();
      $scope.looged = false;
      //registration
      $scope.getRegistrationData = function() {
         if (!$scope.register.registrationUsername || !$scope.register.registrationEmail || !$scope.register.registrationPassword || !$scope.register.confirmedPassword){
            $scope.registerInfoRequired = true;
         } else {
            if ($scope.register.registrationPassword !== $scope.register.confirmedPassword) {
               $scope.passwordsDoNotMatch = true;
            } else {
               $scope.passwordsDoNotMatch = undefined;
               var registeredUserData = {
                  username: $scope.register.registrationUsername,
                  email: $scope.register.registrationEmail,
                  password: $scope.register.registrationPassword
               }
               $http.post('/register', registeredUserData).then(function(res){
                  // show err ( if email or password already exists) .. else redirect
                  if(!res.data.err){
                     $location.path('/:0');
                  } else {
                     $scope.errEmailOrPassExists = res.data.err;
                     res.config.data = '';
                  }
               })
            }
         }
      }
   });
})();
