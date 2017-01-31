(function() {

   app.controller('HomeCtrl', function($rootScope, $location, $scope, $http) {
      //login//
      //display posts//
      $(window).scrollTop(0);
      $scope.pageCounter = 0;
      $rootScope.activetab = $location.path();
      queryHomeRequest($scope, $http);
      $scope.morePage = function() {
         $scope.pageCounter++;
         queryHomeRequest($scope, $http);
      };
      $scope.getPostInfo = function(post) {
         $rootScope.postData = post;
      };
      $scope.addToFav = function(postsid) {
         var data = {
            posts_id: postsid
         };
         console.log(data);
         $http.post('/addfavorite', data).then(function(res){
            if (res.data.success) {
               $scope.posts.map(function(element, index) {
                  if (element.id == postsid) {
                     $scope.posts[index].favorite = true;
                  }
               });
            }
         });
      };
      $scope.usernameGet = function(userId) {
         $rootScope.username = userId;
         console.log(userId);
         console.log($scope.username);
         console.log($scope.logged);
         if (userId === $scope.username && $scope.logged){
            $location.path('/myposts=' + userId);
         } else {
            $location.path('/userposts=' + userId);
         }
      };
   });
})();

var queryHomeRequest = function($scope, $http) {
   $http.get('/home/' + $scope.pageCounter).then(function(resp) {
      $scope.logged = false;
      if (resp.data.session) {
         $scope.username = resp.data.session;
         $scope.logged = true;
      }
      //add counter to posts
      $scope.counter = resp.data.totalPosts;
      $scope.posts = resp.data.posts;
      //add counter to posts data
      $scope.posts.forEach(function(element) {
         if (element.posts_id) {
            element.favorite = true;
         }
         console.log(element);
         $scope.counter.forEach(function(el, index) {
            if (element.id == el.post_id) {
               element.counter = parseInt(el.count);
            }
         });
      })
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
      })
   });
};
