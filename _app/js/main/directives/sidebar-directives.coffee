app = angular.module("MainApp")

app.directive 'allSidebar', ->
  restrict: "E"
  templateUrl: '../app/partials/main/sidebar/all.html'

app.directive 'commentSidebar', ->
  restrict: "E"
  templateUrl: '../app/partials/main/sidebar/comment.html'

app.directive 'communitySidebar', ->
  restrict: "E"
  templateUrl: '../app/partials/main/sidebar/community.html'

app.directive 'networkSidebar', ->
  restrict: "E"
  templateUrl: '../app/partials/main/sidebar/network.html'

app.directive 'submissionSidebar', ->
  restrict: "E"
  templateUrl: '../app/partials/main/sidebar/submission.html'

