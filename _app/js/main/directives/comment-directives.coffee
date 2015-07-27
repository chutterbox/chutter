app = angular.module("MainApp")

app.directive 'commentEmbed', ->
  templateUrl: "/partials/main/comments/commentEmbed.html"

app.directive 'comment', ["$compile", "$mdBottomSheet", "CommentResource", ($compile, $mdBottomSheet, CommentResource) ->
  restrict: "E"
  scope: 
    comment: "="
    parent: "="
  link: ($scope, $element) ->
    if $scope.comment && $scope.comment.children.length > 0
      $compile('<comment class="child" layout="column" ng-repeat="child in comment.children" id="c{{child.path}}" parent="comment" comment="child"></comment>') $scope, (cloned, scope) ->
         $element.append(cloned) 
    $scope.comment.elements = {}
    $scope.comment.element = $element[0]
    _.each $element[0].children, (child) ->
      $scope.comment.elements[child.className] = child
    $scope.offsetTop = $scope.comment.element.offsetTop
    $scope.offsetLeft = $scope.comment.element.offsetLeft
    $scope.comment.childIds = _.map $scope.comment.children, (child) ->
      return "c#{child.path}"

    $scope.toggle = ->
      if $scope.comment.open
        $scope.comment.open = false
        window.requestAnimationFrame () ->
          $scope.comment.elements.main.className = "main active"
          $scope.comment.elements.collapsed.className = "collapsed active"
          _.each $scope.comment.childIds, (id) ->
            document.getElementById(id).className = "ng-scope ng-isolate-scope shrunk"
          $scope.comment.element.style.cssText = "height: 35px;"

      else 
        $scope.comment.open = true
        window.requestAnimationFrame () ->
          $scope.comment.element.style.cssText = ""
          $scope.comment.elements.main.className = "main"
          $scope.comment.elements.collapsed.className = "collapsed"
          _.each $scope.comment.childIds, (id) ->
            document.getElementById(id).className = "ng-scope ng-isolate-scope"

    $scope.comment.updateVote = (vote) -> 
      if $scope.comment.vote == vote 
        vote = 0
      $scope.comment.vote = vote
      CommentResource.vote({id: $scope.comment.id, vote: vote}) 

    $scope.reply = ->
      $mdBottomSheet.show({
        templateUrl: '/partials/main/comments/replyPanel.html'
        parent: "#comments"
        controller: "replyCtrl"
        locals:
          comment: $scope.comment
      })
  templateUrl: "/partials/main/comments/comment.html"
]  
 
