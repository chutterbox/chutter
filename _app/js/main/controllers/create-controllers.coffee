app = angular.module("MainApp")

app.controller "createCtrl", ["$scope", "CommunityResource",  "$state", "$filter", "Page",  ($scope, CommunityResource, $state, $filter, Page) ->
  $scope.flowState =
    selectedNetwork: {}
    loading: false
  $scope.page = Page #respnse intercepter sets network subscriptions once they are resolved
  $scope.newCommunity = 
    network_id: ""
    name: ""
  
  $scope.slug = () ->
    $scope.newCommunity.name

  $scope.$watch("newCommunity.name", _.debounce((newVal, oldVal) ->
      $scope.flowState.loading = true
      # if newVal != oldVal
        # communitySvc.checkName($scope.slug(), $scope.newCommunity.network_id).success (data) ->
        #   $scope.flowState.loading = false
        #   if data
        #     $scope.available = true
        #   else
        #     $scope.available = false


    , 500)
  )
  $scope.$watch("flowState.selectedNetwork", (newVal, oldVal) ->
    console.log newVal
    if newVal and newVal.id
      $scope.newCommunity.network_id = newVal.id
  )
  $scope.nameValid = () ->
    if $scope.newCommunity.name and $scope.newCommunity.name.length > 0
      true
    else
      false



  $scope.selectedStep = 0

  $scope.next = () ->
    $scope.selectedStep += 1  
  
  $scope.back = () ->
    $scope.selectedStep -= 1


  $scope.submit = () ->
    CommunityResource.save({community: $scope.newCommunity}).$promise.then (data) ->
        $state.transitionTo("home.community", {community: data.community.slug})


]