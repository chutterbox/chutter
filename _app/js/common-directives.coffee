#common directives used by all 3 apps

app = angular.module("Chutter")
#         $scope.post.currentMedia.audio = new audio("#{$scope.post.currentMedia.stream_link}?client_id=d26dfbcb4ff9b9c8e712bcbcc37db120")

app.directive "commentList", () ->
  restrict: "E"
  controller: "commentListCtrl as commentListCtrl"

app.directive 'comment', ["$compile", ($compile) ->
  restrict: "E"
  scope: 
    comment: "="
    parent: "="
    post: "="
  require: "^commentList"
  templateUrl: "../app/partials/shared/comments/comment.html"
  link: ($scope, $element, attrs, commentListCtrl) ->
    $scope.commentListCtrl = commentListCtrl
    #apparently stack overflow thinks this is the best way to tell if the object property is an array or object literal
    #redis cjson.encode returns nested tables (from lua) as json object literals, when they should be arrays. depending
    #on the severity of this, we may need to move this into a more general approach
    unless Object.prototype.toString.call( $scope.comment.children ) is '[object Array]'
      $scope.comment.children = []
    if $scope.comment && $scope.comment.children.length > 0
      $scope.comment.depth = $scope.comment.path.match(/[0-9]+/g).length
      switch $scope.comment.depth
        when 2,6,12 then $scope.comment.depthColor = 1
        when 3,7,13 then $scope.comment.depthColor = 2
        when 4,8,14 then $scope.comment.depthColor = 3
      $compile('<comment class="child primary-content" color="{{comment.depthColor}}" collapsed="false" layout="column" ng-repeat="child in comment.children" id="c{{child.path}}" parent="commentListCtrl.comment" post="post" comment="child"></comment>') $scope, (cloned, scope) ->
         $element.append(cloned) 
    $scope.comment.elements = {}
    $scope.comment.element = $element[0]
    _.each $element[0].children, (child) ->
      $scope.comment.elements[child.className] = child
    $scope.offsetTop = $scope.comment.element.offsetTop
    $scope.offsetLeft = $scope.comment.element.offsetLeft
    $scope.comment.childIds = _.map $scope.comment.children, (child) ->
      return "c#{child.path}"
    $scope.comment.compileElementForFirstChild = () ->
      #in the event that a new child comment needs to be created (and other children dont exists)
      $compile('<comment class="child primary-content" color="{{comment.depthColor}}" collapsed="false" layout="column" ng-repeat="child in comment.children" id="c{{child.path}}" parent="commentListCtrl.comment" post="post" comment="child"></comment>') $scope, (cloned, scope) ->
         $element.append(cloned)
    $scope.comment.toggle = ->
      if $scope.comment.open
        $scope.comment.open = false
        window.requestAnimationFrame () ->
          $scope.comment.elements["main layout layout-row"].className = "main layout layout-row active"
          $scope.comment.elements["collapsed layout layout-column layout-fill"].className = "collapsed layout layout-column layout-fill active"
          _.each $scope.comment.childIds, (id) ->
            document.getElementById(id).className = "ng-scope ng-isolate-scope shrunk"
          $scope.comment.element.setAttribute("collapsed", true)

      else 
        $scope.comment.open = true
        window.requestAnimationFrame () ->
          $scope.comment.element.setAttribute("collapsed", false)
          $scope.comment.elements["main layout layout-row"].className = "main layout layout-row"
          $scope.comment.elements["collapsed layout layout-column layout-fill"].className = "collapsed layout layout-column layout-fill"
          _.each $scope.comment.childIds, (id) ->
            document.getElementById(id).className = "ng-scope ng-isolate-scope"

    $scope.comment.appendFirstChild = ->
      $compile('<comment class="child primary-content" color="{{comment.depthColor}}" collapsed="false" layout="column" ng-repeat="child in comment.children" id="c{{child.path}}" parent="commentListCtrl.comment" post="post" comment="child"></comment>') $scope, (cloned, scope) ->
        $element.append(cloned) 
] 