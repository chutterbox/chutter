app = angular.module("MainApp")
VIEW_URL = "../app/partials/main" 
app.directive "allSidebar", ->
  restrict: "E"
  templateUrl: "#{VIEW_URL}/sidebar/all-sidebar.html"
  scope: 
    page: "="
app.directive "commentSidebar", ->
  restrict: "E"
  templateUrl: "#{VIEW_URL}/sidebar/comments-sidebar.html"
  scope: 
    page: "="
app.directive "communitySidebar", ->
  restrict: "E"
  templateUrl: "#{VIEW_URL}/sidebar/community-sidebar.html"
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
