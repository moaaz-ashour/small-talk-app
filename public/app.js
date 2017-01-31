const app = angular.module("app", ["ngRoute"]);

(function() {
   app.config(function($routeProvider, $locationProvider) {
      $routeProvider
      .when('/', {
         templateUrl: 'views/home.html',
         controller: 'HomeCtrl'
      })

      .when('/post:id', {
         templateUrl: 'views/post.html',
         controller: 'PostCtrl'
      })

      .when('/myposts=:id', {
         templateUrl: 'views/mypost.html',
         controller: 'myPostsCtrl'
      })
      .when('/userposts=:id', {
         templateUrl: 'views/user.html',
         controller: 'UserCtrl'
      })

      .when('/about', {
         templateUrl: 'views/about.html',
         controller: 'AboutCtrl'
      })

      .when('/submit', {
         templateUrl: 'views/submit.html',
         controller: 'SubmitCtrl'
      })

      .when('/login', {
         templateUrl: 'views/login.html',
         controller: 'LoginCtrl'
      })

      .when('/register', {
         templateUrl: 'views/register.html',
         controller: 'RegisterCtrl'
      })

      .when('/favorites=:id', {
         templateUrl: 'views/favorites.html',
         controller: 'favoriteCtrl'
      })

      .otherwise({
         redirectTo: '/'
      });

      // remove the # from url
      $locationProvider.html5Mode(true);
   });
})();
