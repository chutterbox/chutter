app = angular.module("MainApp")

app.directive "imageSubmitForm", ->
  restrict: "E"
  templateUrl: "/partials/main/submit/image.html"
  controller: "imageSubmitCtrl"

app.directive "musicSubmitForm", ->
  restrict: "E"
  templateUrl: "/partials/main/submit/music.html"
  controller: "musicSubmitCtrl"

app.directive "videoSubmitForm", ->
  restrict: "E"
  templateUrl: "/partials/main/submit/video.html"
  controller: "videoSubmitCtrl"

app.directive "discussionSubmitForm", ->
  restrict: "E"
  templateUrl: "/partials/main/submit/discussion.html"
  controller: "discussionSubmitCtrl"

app.directive "webpageSubmitForm", ->
  restrict: "E"
  templateUrl: "/partials/main/submit/webpage.html"
  controller: "webpageSubmitCtrl"

