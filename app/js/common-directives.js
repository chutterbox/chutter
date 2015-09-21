(function() {
  var app;

  app = angular.module("Chutter");

  app.directive("commentList", function() {
    return {
      restrict: "E",
      controller: "commentListCtrl as commentListCtrl"
    };
  });

  app.directive('comment', [
    "$compile", function($compile) {
      return {
        restrict: "E",
        scope: {
          comment: "=",
          parent: "=",
          post: "="
        },
        require: "^commentList",
        templateUrl: "../app/partials/shared/comments/comment.html",
        link: function($scope, $element, attrs, commentListCtrl) {
          $scope.commentListCtrl = commentListCtrl;
          if (Object.prototype.toString.call($scope.comment.children) !== '[object Array]') {
            $scope.comment.children = [];
          }
          if ($scope.comment && $scope.comment.children.length > 0) {
            $scope.comment.depth = $scope.comment.path.match(/[0-9]+/g).length;
            switch ($scope.comment.depth) {
              case 2:
              case 6:
              case 12:
                $scope.comment.depthColor = 1;
                break;
              case 3:
              case 7:
              case 13:
                $scope.comment.depthColor = 2;
                break;
              case 4:
              case 8:
              case 14:
                $scope.comment.depthColor = 3;
            }
            $compile('<comment class="child" color="{{comment.depthColor}}" collapsed="false" layout="column" ng-repeat="child in comment.children" id="c{{child.path}}" parent="commentListCtrl.comment" post="post" comment="child"></comment>')($scope, function(cloned, scope) {
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
          $scope.comment.compileElementForFirstChild = function() {
            return $compile('<comment class="child primary-content" color="{{comment.depthColor}}" collapsed="false" layout="column" ng-repeat="child in comment.children" id="c{{child.path}}" parent="commentListCtrl.comment" post="post" comment="child"></comment>')($scope, function(cloned, scope) {
              return $element.append(cloned);
            });
          };
          $scope.comment.toggle = function() {
            if ($scope.comment.open) {
              $scope.comment.open = false;
              return window.requestAnimationFrame(function() {
                $scope.comment.elements["main layout layout-row"].className = "main layout layout-row active";
                $scope.comment.elements["collapsed layout layout-column layout-fill"].className = "collapsed layout layout-column layout-fill active";
                _.each($scope.comment.childIds, function(id) {
                  return document.getElementById(id).className = "ng-scope ng-isolate-scope shrunk";
                });
                return $scope.comment.element.setAttribute("collapsed", true);
              });
            } else {
              $scope.comment.open = true;
              return window.requestAnimationFrame(function() {
                $scope.comment.element.setAttribute("collapsed", false);
                $scope.comment.elements["main layout layout-row"].className = "main layout layout-row";
                $scope.comment.elements["collapsed layout layout-column layout-fill"].className = "collapsed layout layout-column layout-fill";
                return _.each($scope.comment.childIds, function(id) {
                  return document.getElementById(id).className = "ng-scope ng-isolate-scope";
                });
              });
            }
          };
          return $scope.comment.appendFirstChild = function() {
            return $compile('<comment class="child primary-content" color="{{comment.depthColor}}" collapsed="false" layout="column" ng-repeat="child in comment.children" id="c{{child.path}}" parent="commentListCtrl.comment" post="post" comment="child"></comment>')($scope, function(cloned, scope) {
              return $element.append(cloned);
            });
          };
        }
      };
    }
  ]);

}).call(this);
