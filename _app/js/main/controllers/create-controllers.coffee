app = angular.module("MainApp")

app.controller "createCtrl", ["$scope", "CommunityResource",  "$state", "$filter", "Page", "$mdDialog", "CommunityRule",  ($scope, CommunityResource, $state, $filter, Page, $mdDialog, CommunityRule) ->
  $scope.flowState =
    selectedNetwork: {}
    loading: false
  
  $scope.page = Page #respnse intercepter sets network subscriptions once they are resolved
  
  $scope.newCommunity = 
    network_id: ""
    name: ""
    rules_attributes: []
  
  $scope.slug = () ->
    $scope.newCommunity.name

  $scope.$watch("newCommunity.name", _.debounce((newVal, oldVal) ->
      $scope.flowState.loading = true
    , 500)
  )
  $scope.$watch("flowState.selectedNetwork", (newVal, oldVal) ->
    if newVal and newVal.id
      $scope.newCommunity.network_id = newVal.id
  )
  $scope.nameValid = () ->
    if $scope.newCommunity.name and $scope.newCommunity.name.length > 0
      true
    else
      false


  $scope.createCommunityRule = ($event) ->
    $scope.newRule = new CommunityRule
    $scope.newCommunity.rules_attributes.push($scope.newRule)
    $mdDialog.show
      controller: 'createCommunityRuleCtrl'
      templateUrl: '/partials/shared/createCommunityRule.html'
      parent: angular.element(document.body)
      scope: $scope
      targetElement: $event
      preserveScope: true
      clickOutsideToClose:true

  $scope.$on "cancelSave", () ->
    $scope.newCommunity.rules_attributes.pop()
    $scope.newRule.$destroy
  $scope.selectedStep = 0

  $scope.next = () ->
    $scope.selectedStep += 1  
  
  $scope.back = () ->
    $scope.selectedStep -= 1


  $scope.submit = () ->
    CommunityResource.save({community: $scope.newCommunity}).$promise.then (data) ->
        $state.transitionTo("home.community", {community: data.community.slug})


]