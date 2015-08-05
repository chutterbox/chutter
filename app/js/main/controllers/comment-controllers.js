(function() {
  var app;

  app = angular.module("MainApp");

  app.controller("commentsCtrl", [
    "$scope", "Comments", "Post", "Page", "$mdBottomSheet", "CommentResource", function($scope, Comments, Post, Page, $mdBottomSheet, CommentResource) {
      var _x;
      $scope.page = Page;
      $scope.page.post = Post;
      $scope.page.comments = Comments;
      $scope.resource = CommentResource;
      $scope.reply = function(comment) {
        return $mdBottomSheet.show({
          templateUrl: '/partials/main/comments/replyPanel.html',
          parent: "#comments",
          controller: "replyCtrl",
          disableParentScroll: true,
          locals: {
            comment: comment
          }
        });
      };
      return _x = function(STR_XPATH, children) {
        var xnodes, xres, xresult;
        if (children) {
          STR_XPATH = "//div[contains(@data-path, \"" + STR_XPATH + "\")]";
        } else {
          STR_XPATH = "//div[@data-path=\"" + STR_XPATH + "\" and contains(@class, \"comment\")]";
        }
        xresult = document.evaluate(STR_XPATH, document, null, XPathResult.ANY_TYPE, null);
        xnodes = [];
        xres = void 0;
        while (xres = xresult.iterateNext()) {
          xnodes.push(xres);
        }
        return xnodes;
      };
    }
  ]);

  app.controller("replyCtrl", [
    "$scope", "Page", "CommentResource", "$mdBottomSheet", "comment", function($scope, Page, CommentResource, $mdBottomSheet, comment) {
      $scope.page = Page;
      $scope.comment = comment;
      $scope.newComment = {
        post_id: $scope.page.post.id,
        parent_id: $scope.comment && $scope.comment.id ? $scope.comment.id : void 0,
        body: ""
      };
      return $scope.create = function() {
        return CommentResource.save({
          comment: $scope.newComment
        }).$promise.then(function(newCreatedComment) {
          $mdBottomSheet.hide();
          newCreatedComment.username = newCreatedComment.user.username;
          if ($scope.comment && $scope.comment.id) {
            if (!($scope.comment.children && $scope.comment.children[0])) {
              $scope.comment.children = [];
            }
            return $scope.comment.children.unshift(newCreatedComment);
          } else {
            return $scope.page.comments.unshift(newCreatedComment);
          }
        });
      };
    }
  ]);

}).call(this);
