app = angular.module("MainApp")

app.directive 'createCommunityNetwork', ->
  restrict: "E"
  templateUrl: '../app/partials/main/create/network.html'

app.directive 'createCommunityDetails', ->
  restrict: "E"
  templateUrl: '../app/partials/main/create/details.html'

app.directive 'createCommunityCustomize', ->
  restrict: "E"
  templateUrl: '../app/partials/main/create/customize.html'

app.directive 'createCommunityReview', ->
  restrict: "E"
  templateUrl: '../app/partials/main/create/review.html'
app.directive 'createCommunityRules', ->
  restrict: "E"
  templateUrl: '../app/partials/main/create/rules.html'
