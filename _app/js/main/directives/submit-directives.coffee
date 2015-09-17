app = angular.module("MainApp")

app.directive "musicSubmitForm", ->
  restrict: "E"
  templateUrl: "/partials/main/submit/music.html"
  controller: "musicSubmitCtrl"

app.directive "discussionSubmitForm", ->
  restrict: "E"
  templateUrl: "/partials/main/submit/discussion.html"
  controller: "discussionSubmitCtrl"

app.directive "linkSubmitForm", ->
  restrict: "E"
  templateUrl: "/partials/main/submit/link.html"
  controller: "linkSubmitCtrl"

