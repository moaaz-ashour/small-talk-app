(function() {

   app.controller('favoriteCtrl', function($rootScope, $location, $scope, $http) {
      $(window).scrollTop(0);
      $rootScope.activetab = $location.path();
      queryRequestFavorites($scope, $http);
      $scope.counter = 0;
      $scope.morePage = function() {
         $scope.counter++;
         queryRequestFavorites($scope, $http);
      };

      $scope.deletePost = function(postId) {
         var data = {
            deleteId: postId
         };
         if (window.confirm("Do you really want to remove this link from your favorites?")) {
            $http.post('/deletefavorite', data).then(function(resp) {
               if (resp.data.success) {
                  $scope.posts.map(function(element, index) {
                     if (element.id == postId) {
                        $scope.posts.splice(index, 1);
                     }
                  });
               }
            });
         }
      };
   });
})();

var queryRequestFavorites = function($scope, $http) {
   $http.get('/user/getfavorites').then(function(resp) {
      $scope.username = resp.data.session;
      $scope.logged = true;
      $scope.posts = resp.data.favorites;
      console.log($scope.posts);
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
