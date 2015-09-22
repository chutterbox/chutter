app = angular.module("MainApp")

app.controller "createCtrl", ["$scope", "CommunityResource",  "$state", "$filter", "Page", "$mdDialog", "CommunityRule", "Networks",  ($scope, CommunityResource, $state, $filter, Page, $mdDialog, CommunityRule, Networks) ->
  $scope.flowState =
    selectedNetwork: {}
    loading: false
  
  $scope.networks = Networks
  
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


  $scope.submit = () ->
    CommunityResource.save({community: $scope.newCommunity}).$promise.then (data) ->
        $state.transitionTo("frontpage.community.hot", {community: data.community.slug})


]