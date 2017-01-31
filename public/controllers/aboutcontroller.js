(function() {
   app.controller('AboutCtrl', function($rootScope, $scope, $location, $http) {
      $(window).scrollTop(0);
      $rootScope.activetab = $location.path();
      $http.get('/profile').then(function(resp) {
         $scope.email = resp.data.userData[0].email;
         $scope.username = resp.data.session;
         $scope.about = resp.data.userData[0].about;
         $scope.logged = true;
      })
      //username field
      $scope.userCheckingNewUsername = function(username) {
         if ($scope.username === username) {
            $scope.showUsernameCheckButton = false;
            $scope.sameUsername = true;
         } else {
            $scope.showUsernameCheckButton = true;
         }
      }
      $scope.attemptToUpdateUsername = function(username) {
         $http.post('/profile/username', {
            username: username
         }).then(function(res) {
            if (res.data.usernameExists === false) {
               $scope.showUsernameCheckButton = false;
               $scope.updateUsernameFailed = false;
               $scope.updateUsernameSuccess = true;
            } else if (res.data.usernameExists === true) {
               $scope.showUsernameCheckButton = false;
               $scope.updateUsernameSuccess = false;
               $scope.updateUsernameFailed = true;
            }
         })
      }
      //email field
      $scope.userCheckingNewEmail = function(email) {
         if ($scope.email === email) {
            $scope.showEmailCheckButton = false;
            $scope.sameEmail = true; 
         } else {
            $scope.showEmailCheckButton = true;
         }
      }
      $scope.attemptToUpdateEmail = function(email) {
         $http.post('/profile/email', {
            email: email
         }).then(function(res) {
            if (res.data.emailExists === false) {
               $scope.showEmailCheckButton = false;
               $scope.updateEmailFailed = false;
               $scope.updateEmailSuccess = true;
            } else if (res.data.emailExists === true) {
               $scope.showEmailCheckButton = false;
               $scope.updateEmailSuccess = false;
               $scope.updateEmailFailed = true;
            }
         })
      }
      $scope.updateProfile = function(username, email, about, password) {
         var updatedData = {
            username: username,
            email: email,
            password: password,
            about: about
         }
         $http.post('/profile/update', updatedData).then(function(res) {
            console.log(res);
            res.config.data = "";
            res.data = "";
            $location.path("/:0");
         })
      }
   })
})();
