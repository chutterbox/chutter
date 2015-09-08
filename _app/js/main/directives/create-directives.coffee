app = angular.module("MainApp")

app.directive 'createCommunityNetwork', ->
  restrict: "E"
  templateUrl: '../app/partials/main/create/network.html'
  controller: 'createCtrl'

app.directive 'createCommunityDetails', ->
  restrict: "E"
  templateUrl: '../app/partials/main/create/details.html'
  controller: 'createCtrl'

app.directive 'createCommunityCustomize', ->
  restrict: "E"
  templateUrl: '../app/partials/main/create/customize.html'
  controller: 'createCtrl'

app.directive 'createCommunityReview', ->
  restrict: "E"
  templateUrl: '../app/partials/main/create/review.html'
  controller: 'createCtrl'

app.directive 'createCommunityRules', ->
  restrict: "E"
  templateUrl: '../app/partials/main/create/rules.html'
  controller: 'createCtrl'