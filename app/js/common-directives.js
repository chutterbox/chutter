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
            $compile('<comment class="child primary-content" color="{{comment.depthColor}}" collapsed="false" layout="column" ng-repeat="child in comment.children" id="c{{child.path}}" parent="commentListCtrl.comment" post="post" comment="child"></comment>')($scope, function(cloned, scope) {
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
                $scope.comment.elements["main flex flex-true layout layout-row"].className = "main flex flex-true layout layout-row active";
                $scope.comment.elements["collapsed layout layout-column layout-fill"].className = "collapsed layout layout-column layout-fill active";
                _.each($scope.comment.childIds, function(id) {
                  return document.getElementById(id).className = "ng-scope ng-isolate-scope shrunk child";
                });
                return $scope.comment.element.setAttribute("collapsed", true);
              });
            } else {
              $scope.comment.open = true;
              return window.requestAnimationFrame(function() {
                $scope.comment.element.setAttribute("collapsed", false);
                $scope.comment.elements["main flex flex-true layout layout-row"].className = "main flex flex-true layout layout-row";
                $scope.comment.elements["collapsed layout layout-column layout-fill"].className = "collapsed layout layout-column layout-fill";
                return _.each($scope.comment.childIds, function(id) {
                  return document.getElementById(id).className = "ng-scope ng-isolate-scope child";
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

  app.directive("chutterScrollShrink", function() {
    return {
      restrict: "A",
      link: function($scope, $element, attrs) {
        var content, prevScrollTop, scrollElement, throttledFn, toolbar, y;
        toolbar = document.getElementById("toolbarShrink");
        content = document.getElementById("contentShrink");
        if ($element[0].tagName === "MD-VIRTUAL-REPEAT-CONTAINER") {
          scrollElement = $(".md-virtual-repeat-scroller");
        } else {
          scrollElement = $($element[0]);
        }
        console.log(scrollElement);
        y = 0;
        prevScrollTop = 0;
        throttledFn = function() {
          var contentValue, marginBottom, marginTop, scrollTop, shrinkSpeedFactor, toolbarHeight, toolbarValue;
          scrollTop = scrollElement[0].scrollTop;
          toolbarHeight = 80;
          shrinkSpeedFactor = 0.5;
          y = Math.min(toolbarHeight / shrinkSpeedFactor, Math.max(0, y + scrollTop - prevScrollTop));
          contentValue = (toolbarHeight - y) * shrinkSpeedFactor;
          toolbarValue = -y * shrinkSpeedFactor;
          if (scrollTop === 0) {
            content.style.cssText = "";
            toolbar.style.cssText = "";
            content.style.marginTop = "0";
            content.style.marginBottom = "0";
          } else {
            content.style.cssText = "transform: translateY(" + contentValue + "px);-webkit-transform: translateY(" + contentValue + "px);-moz-transform: translateY(" + contentValue + "px)";
            toolbar.style.cssText = "transform: translateY(" + toolbarValue + "px);-webkit-transform: translateY(" + toolbarValue + "px);-moz-transform: translateY(" + toolbarValue + "px)";
            marginTop = (-toolbarHeight * shrinkSpeedFactor) + 'px';
            marginBottom = (40 + toolbarValue) + 'px';
            content.style.marginTop = marginTop;
            content.style.marginBottom = marginBottom;
          }
          return prevScrollTop = scrollTop;
        };
        throttledFn();
        return scrollElement.scroll(_.throttle(throttledFn, 6));
      }
    };
  });

}).call(this);
