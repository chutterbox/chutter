app = angular.module("MainApp")
VIEW_URL = "../app/partials/main" 
app.directive "allSidebar", ->
  restrict: "E"
  templateUrl: "#{VIEW_URL}/sidebar/all-sidebar.html"
  scope: 
    page: "="

  controller: ["$scope", "$mdDialog", "NetworkResource", ($scope, $mdDialog, NetworkResource) ->
    $scope.openSubscriptionDialog = () ->
      $mdDialog.show
       controller: 'subscriptionDialogCtrl'
       templateUrl: '../app/partials/shared/subscriptionDialog.html'
       parent: angular.element(document.body)
       clickOutsideToClose: true
    $scope.news = []
    NetworkResource.news().$promise.then (data) ->
      $scope.news = data


  ]
app.directive "commentsSidebar", ->
  restrict: "E"
  templateUrl: "#{VIEW_URL}/sidebar/comments-sidebar.html"
  scope: 
    page: "="
app.directive "networkSidebar", ->
  restrict: "E"
  templateUrl: "#{VIEW_URL}/sidebar/network-sidebar.html"
  scope: 
    page: "="
app.directive "submissionSidebar", ->
  restrict: "E"
  templateUrl: "#{VIEW_URL}/sidebar/submission-sidebar.html"
  scope: 
    page: "="
app.directive "footerSidebar", ->
  restrict: "E"
  templateUrl: "#{VIEW_URL}/sidebar/footer-sidebar.html"
  scope:
    page: "="
