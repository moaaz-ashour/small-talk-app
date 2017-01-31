(function() {
   app.controller('UserCtrl', function($rootScope, $location, $scope, $http) {
      $(window).scrollTop(0);
      $rootScope.activetab = $location.path();
      queryRequest($scope, $http , $rootScope);
      $scope.counter = 0;
      $scope.morePage = function() {
         $scope.counter++;
         queryRequest($scope, $http);
      };
   });
})();

var queryRequest = function($scope, $http, $rootScope) {
   $http.get('/user/posts/' + $rootScope.username).then(function(resp) {
      $scope.logged = false;
      if (resp.data.session) {
         $scope.username = resp.data.session;
         $scope.logged = true;
      }
      $scope.posts = resp.data.userPosts;
      $scope.posts.sort(function(a,b) {
         return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()

      });
      $scope.posts.map(function(element) {
         var currentTime = new Date();
         var postTime = new Date(element.created_at.replace(' ', 'T'));
         var displayTime = (currentTime - postTime) / 1000;
         if (displayTime < 3600) {
            element.created_at = Math.round(displayTime / 60) + " minutes ago";
         } else if (displayTime < 86400) {
            element.created_at = Math.round(displayTime / 3600) + " hours ago";
         } else {
            element.created_at = Math.round(displayTime / 86400) + " days ago";
         }
      });
   });
};
