(function () {

   app.controller('LoginCtrl', function($rootScope, $scope, $location, $http)
   {  $(window).scrollTop(0);
      $rootScope.activetab = $location.path();
      $rootScope.google = false;
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

      //login
      $scope.getLoginData = function() {
         if (!$scope.loginUsername || !$scope.loginPassword) {
            console.log($scope.loginUsername, $scope.loginPassword);
            $scope.loginInfoRequired = true;
         } else {
            var loginUserData = {
               username: $scope.loginUsername,
               password: $scope.loginPassword
            }
            console.log(loginUserData);
            $http.post('/login', loginUserData).then(function(res) {
               //get a "true" value when login info correct and a message when incorrect
               console.log(res);
               //check pass on server and getting back response wheather it is valid or not
               res.config.data = '';
               $scope.incorrectLoginCredintials = res.data.error;
               if (!res.data.error) {
                  $location.path("/:0");
               }
            });
         }
      }

      $scope.logout = function () {
         $scope.username = undefined;
         FB.logout();
         if ($rootScope.google == true) {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut();
            $scope.google.logged= false;
         }
         $http.get('/logout').then(function(res){
            $location.path("/:0");
            $scope.logged = false;
         })
      }

      $scope.facebookLogin = function() {
         FB.login(function(res) {
            if (res.status === 'connected') {
               datarequest()
            } else {
               //need to notify
               console.log('loginerror');
            }
         }),{scope: 'public_profile,email'};
         function datarequest() {
            FB.api('me?fields=id,name,email', function(res){
               var data = {
                  email: res.email,
                  name: res.name,
                  id: res.id
               };
               console.log(data);
               $http.post('/sociallogin', data).then(function(res){
                  res.config.data = '';
                  if (!res.data.error){
                     //need to store username
                     $scope.username = res.data.username;
                     $scope.logged = true;
                     $location.path("/:0");
                  }
               });
            });
         }
      };
      function onSignIn(googleUser) {
         if ($rootScope.google) {
            return
         }
         $rootScope.google = true;
         var profile = googleUser.getBasicProfile();
         var data = {
            email: profile.getEmail(),
            name: profile.getName()
         }
         $http.post('/sociallogin', data).then(function(res){
            res.config.data = '';
            if (!res.data.error){
               //need to store username
               $location.path("/:0");
            }
         });
      }
   });
})();
