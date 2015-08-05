app = angular.module("MainApp")

app.controller "commentsCtrl", ["$scope", "Comments", "Post", "Page", "$mdBottomSheet", "CommentResource", ($scope, Comments, Post, Page, $mdBottomSheet, CommentResource) ->
  $scope.page = Page
  $scope.page.post = Post
  $scope.page.comments = Comments
  $scope.resource = CommentResource


  $scope.reply = (comment) ->
    $mdBottomSheet.show({
      templateUrl: '/partials/main/comments/replyPanel.html'
      #has to have leading digit on id
      parent: "#comments"
      controller: "replyCtrl"
      disableParentScroll: true
      locals:
        comment: comment
    })


  _x = (STR_XPATH, children) ->
    if children
      STR_XPATH = "//div[contains(@data-path, \"#{STR_XPATH}\")]"
    else 
      STR_XPATH = "//div[@data-path=\"#{STR_XPATH}\" and contains(@class, \"comment\")]"
    xresult = document.evaluate(STR_XPATH, document, null, XPathResult.ANY_TYPE, null)
    xnodes = []
    xres = undefined
    while xres = xresult.iterateNext()
      xnodes.push xres
    xnodes

]

app.controller "replyCtrl", ["$scope", "Page", "CommentResource", "$mdBottomSheet", "comment", ($scope, Page, CommentResource, $mdBottomSheet, comment) ->
  $scope.page = Page
  $scope.comment = comment
  $scope.newComment = 
    post_id: $scope.page.post.id
    parent_id: $scope.comment.id if $scope.comment && $scope.comment.id
    body: ""
  $scope.create = () -> 
    CommentResource.save({comment: $scope.newComment}).$promise.then (newCreatedComment) -> 
      $mdBottomSheet.hide()
      newCreatedComment.username = newCreatedComment.user.username
      if $scope.comment && $scope.comment.id
        $scope.comment.children = [] unless $scope.comment.children and $scope.comment.children[0]
        $scope.comment.children.unshift(newCreatedComment)
      else
        $scope.page.comments.unshift(newCreatedComment)



]