'use strict'

app = angular.module("Chutter")

app.controller "createCommunityRuleCtrl", ["$scope", "$mdDialog", ($scope, $mdDialog) -> 
  $scope.selectedAppliesTo = ""
  $scope.selectedSeverity  = ""

  #these functions ensures that only one checkbox gets set. 
  #we use this over radio buttons because the backend has bitfield flags (incase we want to add more rules later)
  #so we need to just individual properties to true/false rather than a single property to a dynamic string value
  $scope.setSelectedAppliesTo = (value) ->
    $scope.newRule[$scope.selectedAppliesTo] = false
    $scope.selectedAppliesTo = value
  
  $scope.setSelectedSeverity = (value) ->
    $scope.newRule[$scope.selectedSeverity] = false
    $scope.selectedSeverity = value
  $scope.submit

  $scope.saveRule = () ->
    $mdDialog.hide()

  $scope.cancelSave = () ->
    $scope.$emit "cancelSave"
    $mdDialog.hide()
]

app.controller "modSheetCtrl", ["$scope", "entityable", "entityableType", "CommunityResource", "PostResource", "ActivityLogEntry", ($scope, entityable, entityableType, CommunityResource, PostResource, ActivityLogEntry) ->
  $scope.entityable_post             = entityable if entityableType is "post"
  $scope.entityable_comment          = entityable if entityableType is "comment"
  $scope.entityable                  = entityable
  

  $scope.activityLogEntry = new ActivityLogEntry

  $scope.post = $scope.entityable_post #just for the embedded post section
  
  CommunityResource.reportableRules({id: $scope.entityable.community_slug}).$promise.then (data) ->
    $scope.communityRules = _.filter data, (rule) -> (rule.sitewide || rule.posts)

  #id here is assumed to be the id of the route we want to post to, i.e. /posts/12/remove
  $scope.activityLogEntry.id = $scope.entityable.id
  
  $scope.submitEntityableForm = () ->
    #this is the id for the entity being moderated, not the activity log entry id
    if entityableType is "post"
      PostResource.delete($scope.activityLogEntry)
  
  
  $scope.submitUserForm = () ->
    if entityableType is "post"
      PostResource.ban($scope.activityLogEntry)  

]


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
      parent: angular.element(document.body)
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

app.controller "postsCtrl", ["$scope", "Page", "Posts", ($scope, Page, Posts) ->
  $scope.page = Page
  $scope.page.posts = Posts
]

app.controller "subscriptionDialogCtrl", ["$scope", ($scope) ->

]