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
  
  CommunityResource.rules({id: $scope.entityable.community_slug}).$promise.then (data) ->
    $scope.community_rules = data

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