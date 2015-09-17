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

app.controller "modSheetCtrl", ["$mdBottomSheet", "$scope", "entityable", "entityableType", "CommunityResource", "PostResource", "ActivityLogEntry", ($mdBottomSheet, $scope, entityable, entityableType, CommunityResource, PostResource, ActivityLogEntry) ->
  $scope.post             = entityable if entityableType is "post"
  $scope.comment          = entityable if entityableType is "comment"
  $scope.entityable       = entityable
  

  $scope.activityLogEntry = new ActivityLogEntry

  CommunityResource.reportableRules({id: $scope.entityable.community_slug}).$promise.then (data) ->
    $scope.communityRules = _.filter data, (rule) -> (rule.sitewide || rule.posts)

  #id here is assumed to be the id of the route we want to post to, i.e. /posts/12/remove
  $scope.activityLogEntry.id = $scope.entityable.id
  
  $scope.submitEntityableForm = () ->
    #this is the id for the entity being moderated, not the activity log entry id
    if entityableType is "post"
      PostResource.delete($scope.activityLogEntry).$promise.then (data) ->
        if data.status is 200
          $scope.closeSheet()
        else
          $scope.closeSheet()
  
  
  $scope.submitUserForm = () ->
    if entityableType is "post"
      PostResource.ban($scope.activityLogEntry)  

  $scope.closeModSheet = () ->
    $mdBottomSheet.hide()

]

app.controller "reportSheetCtrl", ["$mdBottomSheet", "$scope", "entityable", "entityableType", "CommunityResource", "PostResource", "ActivityLogEntry", ($mdBottomSheet, $scope, entityable, entityableType, CommunityResource, PostResource, ActivityLogEntry) ->
  $scope.post             = entityable if entityableType is "post"
  $scope.comment          = entityable if entityableType is "comment"
  $scope.entityable       = entityable
  


  CommunityResource.reportableRules({id: $scope.entityable.community_slug}).$promise.then (data) ->
    $scope.communityRules = _.filter data, (rule) -> (rule.sitewide || rule.posts)
  
  $scope.activityLogEntry = new ActivityLogEntry
  #id here is assumed to be the id of the route we want to post to, i.e. /posts/12/remove
  $scope.activityLogEntry.id = $scope.entityable.id

  $scope.submitEntityableForm = () ->
    #this is the id for the entity being moderated, not the activity log entry id
    if entityableType is "post"
      PostResource.report($scope.activityLogEntry).$promise.then (data) ->
        if data.status is 200
          $scope.closeSheet(true)
          entityable.reported = true
        else
          $scope.closeSheet(false)

  
  
  $scope.closeSheet = (reported) ->
    $mdBottomSheet.hide(reported)

]

app.controller "replyCtrl", ["$scope", "CommentResource", "$mdBottomSheet", "parentComment", "post", ($scope, CommentResource, $mdBottomSheet, parentComment, post) ->
  console.log parentComment
  $scope.newComment = 
    post_id: post.id
    parent_id: parentComment.id if parentComment && parentComment.id
    body: ""
  
  $scope.create = () -> 
    CommentResource.save({comment: $scope.newComment}).$promise.then (newCreatedComment) -> 
      $mdBottomSheet.hide()
      newCreatedComment.username = newCreatedComment.user.username
      if parentComment && parentComment.id       
        parentComment.children.unshift(newCreatedComment)     
      else
        post.comments.unshift(newCreatedComment)

]



app.controller "subscriptionDialogCtrl", ["$scope", ($scope) ->

]