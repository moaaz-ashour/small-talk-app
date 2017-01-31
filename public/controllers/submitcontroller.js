(function () {
   app.controller('SubmitCtrl', function($rootScope, $location, $scope, $http)
   {   $(window).scrollTop(0);
      $rootScope.activetab = $location.path();
      $http.get('submit/checksession').then(function(resp){
         $scope.username = resp.data.username;
      });
      $scope.logged = true;
      $scope.submit = (formTitle, formUrl, formText) => {
         if (!formTitle && (!formUrl || !formText)) {
            $scope.submiterror = true;
         } else {
            var data = {
               username: $scope.username,
               title: formTitle,
               url: formUrl,
               text: formText
            };
            console.log(data);
            $http.post('/submit', data).then(function(resp){
               $scope.posts = resp.data.posts;
               $location.path('/:0');
            });
         }
      };
   });
})();
