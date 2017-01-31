(function() {
   app.controller('PostCtrl', function($rootScope, $location, $scope, $http, $location) {
      $(window).scrollTop(0);
      $rootScope.activetab = $location.path();
      var postId = window.location.pathname.replace("/post=", '');
      queryCommentsRequest($location, $scope, $http, postId);

      $scope.submitComment = function() {
         $http.post("/addcomment", {
            username: $scope.username,
            post_id: postId,
            comment: $scope.newComment
         }).then(function(resp) {
            $scope.newComment = "";
            $("#display-comments").empty();
            queryCommentsRequest($location, $scope, $http, postId);
         })
      }
      // need to work on the reply button
      $scope.replyButton = function(comments) {
         console.log(comments);
         var displayReply = "$scope.button" + comments.id
         console.log(displayReply);
         displayReply = true;
      }
      $(document).on('click', function(e) {
         $scope.comments.forEach(function(element) {
            if (parseInt(e.target.id.replace("reply", "")) == element.id) {
               e.stopPropagation();
               $("#" + e.target.id).after('<div><textarea id="replyText" ng-model="newComment" rows="4" cols="50" placeholder="Type your comment" class="form-control" style="margin-top: 10px"></textarea><button ng-click="submitComment()" class="btn btn-primary" id="replyButton">Reply</button></div>');
               $("#" + e.target.id).remove();
               var replyId = e.target.id.replace("reply", "");
               var commentObject = $scope.comments.filter(function(element, index) {
                  if (element.id == parseInt(replyId)) {
                     return element
                  }
               })
               $("#replyButton").on('click', function() {
                  var reply = {
                     username: $scope.username,
                     post_id: commentObject[0].post_id,
                     comment_id: replyId,
                     comment: $("#replyText").val()
                  }
                  $.post("/submit/reply", reply, function(data) {
                     if (data.sucess == false) {
                        $('#replyButton').append("<div>Login to marke comments</div>");
                     } else {
                        location.reload();
                     }
                  })

               })
            }
         })


      })
   });

})();

var queryCommentsRequest = function($location, $scope, $http, postId) {
   $http.get("/getpost=" + postId).then(function(resp) {
      console.log($scope);
      if (resp.data.username) {
         $scope.username = resp.data.username;
         $scope.logged = true;
      }
      $scope.comments = resp.data.comments;
      $scope.postData = resp.data.postData;
      $scope.comments.map(function(element) {
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

      $scope.postData.map(function(element) {
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

      var i = 0;
      $scope.comments.forEach(function(findReply) {
         if (!findReply.comment_id) {
            $("#display-comments").prepend('<div class="panel panel-default"><li class="panel-body">  ' + findReply.comment + '</li><div class="panel-footer clearfix">Posted by ' + findReply.username + ' <span class="label label-primary">' + findReply.created_at + '</span><span class="label label-success" id="reply' + findReply.id + '">reply</span></span></div><ul id ="commentid' + findReply.id + '"></div></ul></div>')
         } else if (findReply.comment_id) {
            $scope.comments.forEach(function(findPostEqualToReply) {
               if (findReply.comment_id == findPostEqualToReply.id) {
                  if (findPostEqualToReply.reply) {
                     findPostEqualToReply.reply.push(findReply.comment);
                     $("#commentid" + findReply.comment_id).prepend('<ul id ="commentid' + findReply.id + '" style="margin-left:30px"><div class="panel panel-default"><li class="panel-body"><i class="fa fa-level-down" aria-hidden="true"></i> ' + findReply.comment + '</li><div class="panel-footer clearfix">Posted by ' + findReply.username + ' <span class="label label-primary">' + findReply.created_at + '</span><span class="label label-success" id="reply' + findReply.id + '">reply</span></div></div></ul>');
                  } else {
                     findPostEqualToReply.reply = [];
                     findPostEqualToReply.reply[0] = findReply.comment;
                     $("#commentid" + findReply.comment_id).append('<ul id ="commentid' + findReply.id + '" style="margin-left:30px"><div class="panel panel-default"><li class="panel-body"><i class="fa fa-level-down" aria-hidden="true"></i> ' + findReply.comment + '</li><div class="panel-footer clearfix">Posted by ' + findReply.username + ' <span class="label label-primary">' + findReply.created_at + '</span><span class="label label-success" id="reply' + findReply.id + '">reply</span></span></div></div></ul>');
                  }
               }

            })
         }
      })
   })

};
