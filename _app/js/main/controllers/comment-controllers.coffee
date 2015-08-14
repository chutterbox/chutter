app = angular.module("MainApp")

app.controller "commentsCtrl", ["$scope", "Comments", "Post", "Page", "$mdBottomSheet", "CommentResource", ($scope, Comments, Post, Page, $mdBottomSheet, CommentResource) ->
  $scope.page = Page
  $scope.page.post = Post
  $scope.page.comments = Comments
  $scope.resource = CommentResource


  $scope.reply = () ->
    $mdBottomSheet.show({
      templateUrl: '/partials/main/comments/replyPanel.html'
      #has to have leading digit on id
      controller: "replyCtrl"
      disableParentScroll: true
      #important, do not remove since we're passing in scope reference
      preserveScope: true
      parent: "#content"
      clickOutsideToClose: true
    })

]

app.controller "replyCtrl", ["$scope", "Page", "CommentResource", "$mdBottomSheet", ($scope, Page, CommentResource, $mdBottomSheet) ->
  $scope.page = Page
  $scope.newComment = 
    post_id: $scope.page.post.id
    parent_id: $scope.comment.id if $scope.comment && $scope.comment.id
    body: ""
  
  $scope.create = () -> 
    CommentResource.save({comment: $scope.newComment}).$promise.then (newCreatedComment) -> 
      $mdBottomSheet.hide()
      newCreatedComment.username = newCreatedComment.user.username
      if $scope.comment && $scope.comment.id       
        $scope.comment.children.unshift(newCreatedComment)     
      else
        $scope.page.comments.unshift(newCreatedComment)


]