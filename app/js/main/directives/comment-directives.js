(function() {
  var app;

  app = angular.module("MainApp");

  app.directive('commentEmbed', function() {
    return {
      templateUrl: "/partials/main/comments/commentEmbed.html"
    };
  });

  app.directive('comment', [
    "$compile", "$mdBottomSheet", "CommentResource", function($compile, $mdBottomSheet, CommentResource) {
      return {
        restrict: "E",
        scope: {
          comment: "=",
          parent: "="
        },
        link: function($scope, $element) {
          if ($scope.comment && $scope.comment.children.length > 0) {
            $compile('<comment class="child" layout="column" ng-repeat="child in comment.children" id="c{{child.path}}" parent="comment" comment="child"></comment>')($scope, function(cloned, scope) {
              return $element.append(cloned);
            });
          }
          $scope.comment.elements = {};
          $scope.comment.element = $element[0];
          _.each($element[0].children, function(child) {
            return $scope.comment.elements[child.className] = child;
          });
          $scope.offsetTop = $scope.comment.element.offsetTop;
          $scope.offsetLeft = $scope.comment.element.offsetLeft;
          $scope.comment.childIds = _.map($scope.comment.children, function(child) {
            return "c" + child.path;
          });
          $scope.toggle = function() {
            if ($scope.comment.open) {
              $scope.comment.open = false;
              return window.requestAnimationFrame(function() {
                $scope.comment.elements.main.className = "main active";
                $scope.comment.elements.collapsed.className = "collapsed active";
                _.each($scope.comment.childIds, function(id) {
                  return document.getElementById(id).className = "ng-scope ng-isolate-scope shrunk";
                });
                return $scope.comment.element.style.cssText = "height: 35px;";
              });
            } else {
              $scope.comment.open = true;
              return window.requestAnimationFrame(function() {
                $scope.comment.element.style.cssText = "";
                $scope.comment.elements.main.className = "main";
                $scope.comment.elements.collapsed.className = "collapsed";
                return _.each($scope.comment.childIds, function(id) {
                  return document.getElementById(id).className = "ng-scope ng-isolate-scope";
                });
              });
            }
          };
          $scope.comment.updateVote = function(vote) {
            if ($scope.comment.vote === vote) {
              vote = 0;
            }
            $scope.comment.vote = vote;
            return CommentResource.vote({
              id: $scope.comment.id,
              vote: vote
            });
          };
          return $scope.reply = function() {
            return $mdBottomSheet.show({
              templateUrl: '/partials/main/comments/replyPanel.html',
              parent: "#comments",
              controller: "replyCtrl",
              locals: {
                comment: $scope.comment
              }
            });
          };
        },
        templateUrl: "/partials/main/comments/comment.html"
      };
    }
  ]);

}).call(this);
