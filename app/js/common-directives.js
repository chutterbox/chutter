(function() {
  var app;

  app = angular.module("Chutter");

  app.directive('post', [
    "MediaControls", "PostResource", "Page", "audio", "WrapperDiv", function(MediaControls, PostResource, Page, audio, WrapperDiv) {
      return {
        restrict: "E",
        scope: {
          post: "=",
          postIndex: "="
        },
        templateUrl: "../app/partials/shared/post.html",
        link: function($scope, element, attrs) {
          $scope.post.elements = {};
          $scope.post.elements["post"] = element[0];
          $scope.post.toggled = false;
          _.each(element[0].children, function(child) {
            return $scope.post.elements[child.className] = child;
          });
          if ($scope.post.media.length > 0) {
            $scope.post.currentMedia = $scope.post.media[0];
          } else {
            $scope.post.currentMedia = {
              format: "body",
              body: $scope.post.body
            };
          }
          $scope.post.elements.postcontent = $scope.post.elements.main.children[1];
          $scope.post.elements.middle = $scope.post.elements.main.children[0];
          if ($scope.post.currentMedia) {
            $scope.post.elements.postcontent.style.backgroundImage = "url(" + $scope.post.currentMedia.thumbnail_link + ")";
            $scope.post.elements.postcontent.style.backgroundSize = "cover";
            if ($scope.post.currentMedia.format === "music") {
              $scope.post.currentMedia.audio = new audio($scope.post.currentMedia.stream_link + "?client_id=d26dfbcb4ff9b9c8e712bcbcc37db120");
            }
          }
          $scope.$watch("post.zoomValue", function(newVal, oldVal) {
            var elms, val;
            if (newVal && newVal !== oldVal) {
              if (newVal === 0) {
                newVal = 1;
              }
              val = newVal / 10;
              if ($scope.post.toggled && oldVal !== newVal) {
                $scope.wrapperDiv = new WrapperDiv;
                elms = _.rest(Page.posts, $scope.postIndex + 1).map(function(post) {
                  return $scope.wrapperDiv.appendChild(post.elements.post);
                });
                $scope.post.elements.post.parentNode.insertBefore($scope.wrapperDiv, $scope.post.elements.post.nextSibling);
              }
              window.requestAnimationFrame(function() {
                $scope.post.elements.postcontent.style.cssText += "transform: scale(" + val + ");-webkit-transform: scale(" + val + ");-moz-transform: scale(" + val + ");";
                return $scope.post.elements.middle.style.cssText += "transform: scale(" + (1 - val) + ");-webkit-transform: scale(" + (1 - val) + ");-moz-transform: scale(" + (1 - val) + ");";
              });
              $scope.setXTranslations();
              if ($scope.post.currentMedia.format !== "video" && (newVal > 1 && (!oldVal || oldVal <= 1))) {
                return $scope.post.elements.postcontent.children[0].onload = function() {
                  return setTimeout(function() {
                    return $scope.$apply(function() {
                      return $scope.setXTranslations();
                    });
                  }, 350);
                };
              }
            }
          });
          $scope.$watch("post.toggled", function(newVal) {
            if (newVal === true) {
              if ($scope.post.currentMedia.audio) {
                return $scope.post.currentMedia.audio.play();
              }
            } else if (newVal === false && $scope.post.currentMedia.audio) {
              return $scope.post.currentMedia.audio.pause();
            }
          });
          $scope.post.toggleExpand = function() {
            if ($scope.post.zoomValue === 10) {
              return $scope.post.zoomValue = 5;
            } else {
              return $scope.post.zoomValue = 10;
            }
          };
          $scope.setXTranslations = function() {
            var currentMediaHeight, newHeight, originalHeight, originalScaleValue, xTranslation;
            originalScaleValue = 1;
            originalHeight = 100;
            if (originalScaleValue === $scope.post.zoomValue) {
              xTranslation = 0;
            } else {
              currentMediaHeight = $scope.post.elements.postcontent.children[0].offsetHeight;
              if (currentMediaHeight > 0) {
                newHeight = currentMediaHeight;
              } else {
                newHeight = $scope.post.elements.postcontent.offsetHeight;
              }
              xTranslation = (newHeight * ($scope.post.zoomValue / 10)) - originalHeight;
            }
            return window.requestAnimationFrame(function() {
              return $scope.wrapperDiv.style.cssText += "transform: translateY(" + xTranslation + "px);-webkit-transform: translateY(" + xTranslation + "px);-moz-transform: translateY(" + xTranslation + "px);";
            });
          };
          $scope.post.updateVote = function(vote) {
            if ($scope.post.vote === vote) {
              vote = 0;
            }
            $scope.post.vote = vote;
            return PostResource.vote({
              id: $scope.post.id,
              vote: vote
            });
          };
          $scope.post.toggleSave = function() {
            if ($scope.user && $scope.user.id) {
              if ($scope.post.saved) {
                $scope.post.saved = false;
                return PostResource.unsave_post({
                  id: $scope.post.id
                });
              } else {
                $scope.post.saved = true;
                return PostResource.save_post({
                  id: $scope.post.id
                });
              }
            } else {
              return $scope.$emit('auth:show-signin');
            }
          };
          return $scope.post.toggle = function(post) {
            var frag, preferredScaleValue, range;
            preferredScaleValue = $scope.post.currentMedia.format === "music" ? 4 : 5;
            if (Page.selectedPost === $scope.post) {
              if (Page.selectedPost.zoomValue !== 1) {
                Page.selectedPost.zoomValue = 1;
                return Page.selectedPost.toggled = false;
              } else {
                Page.selectedPost.zoomValue = preferredScaleValue;
                return Page.selectedPost.toggled = true;
              }
            } else {
              if (Page.selectedPost) {
                if (Page.selectedPost.wrapperDiv) {
                  range = document.createRange();
                  range.selectNodeContents(Page.selectedPost.wrapperDiv);
                  frag = range.extractContents();
                  Page.selectedPost.wrapperDiv.parentNode.replaceChild(frag, Page.selectedPost.wrapperDiv);
                }
                Page.selectedPost.toggled = false;
                Page.selectedPost.zoomValue = 1;
                $scope.post.zoomValue = preferredScaleValue;
                Page.selectedPost = $scope.post;
                return Page.selectedPost.toggled = true;
              } else {
                Page.selectedPost = $scope.post;
                Page.selectedPost.zoomValue = preferredScaleValue;
                return Page.selectedPost.toggled = true;
              }
            }
          };
        },
        controller: [
          "$scope", "$rootScope", "$mdBottomSheet", function($scope, $rootScope, $mdBottomSheet) {
            $scope.user = $rootScope.user;
            $scope.post.moderate = function() {
              if ($scope.user.moderator) {
                return $mdBottomSheet.show({
                  templateUrl: '../app/partials/shared/modSheet.html',
                  parent: angular.element(document.body),
                  disableParentScroll: true,
                  locals: {
                    entityable: $scope.post,
                    entityableType: "post"
                  },
                  controller: "modSheetCtrl"
                });
              }
            };
            return $scope.post.report = function() {
              return $mdBottomSheet.show({
                templateUrl: '../app/partials/shared/reportSheet.html',
                parent: angular.element(document.body),
                disableParentScroll: true,
                locals: {
                  entityable: $scope.post,
                  entityableType: "post"
                },
                controller: "reportSheetCtrl"
              });
            };
          }
        ]
      };
    }
  ]);

  app.directive('comment', [
    "$compile", function($compile) {
      return {
        restrict: "E",
        scope: {
          comment: "=",
          parent: "="
        },
        templateUrl: "../app/partials/shared/comments/comment.html",
        link: function($scope, $element) {
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
            $compile('<comment class="child" color="{{comment.depthColor}}" collapsed="false" layout="column" ng-repeat="child in comment.children" id="c{{child.path}}" parent="comment" comment="child"></comment>')($scope, function(cloned, scope) {
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
          return $scope.toggle = function() {
            if ($scope.comment.open) {
              $scope.comment.open = false;
              return window.requestAnimationFrame(function() {
                $scope.comment.elements.main.className = "main active";
                $scope.comment.elements.collapsed.className = "collapsed active";
                _.each($scope.comment.childIds, function(id) {
                  return document.getElementById(id).className = "ng-scope ng-isolate-scope shrunk";
                });
                return $scope.comment.element.setAttribute("collapsed", true);
              });
            } else {
              $scope.comment.open = true;
              return window.requestAnimationFrame(function() {
                $scope.comment.element.setAttribute("collapsed", false);
                $scope.comment.elements.main.className = "main";
                $scope.comment.elements.collapsed.className = "collapsed";
                return _.each($scope.comment.childIds, function(id) {
                  return document.getElementById(id).className = "ng-scope ng-isolate-scope";
                });
              });
            }
          };
        },
        controller: [
          "$scope", "CommentResource", "$mdBottomSheet", "$rootScope", function($scope, CommentResource, $mdBottomSheet, $rootScope) {
            $scope.user = $rootScope.user;
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
            $scope.comment.reply = function() {
              return $mdBottomSheet.show({
                templateUrl: '../app/partials/shared/comments/replyPanel.html',
                clickOutsideToClose: true,
                preserveScope: true,
                disableParentScroll: true,
                parent: angular.element(document.body),
                controller: "replyCtrl",
                scope: $scope
              });
            };
            return $scope.comment.moderate = function() {
              if ($scope.user) {
                return $mdBottomSheet.show({
                  templateUrl: '../app/partials/shared/modSheet.html',
                  parent: angular.element(document.body),
                  disableParentScroll: true,
                  locals: {
                    entityable: $scope.comment,
                    entityableType: "comment"
                  },
                  controller: "modSheetCtrl"
                });
              }
            };
          }
        ]
      };
    }
  ]);

  app.directive("mediaControls", [
    "MediaControls", function(MediaControls) {
      return {
        restrict: "E",
        templateUrl: "../app/partials/main/mediaPlayer.html",
        link: function(scope, element, attrs) {
          return MediaControls.element = element[0];
        },
        controller: [
          "$scope", "MediaControls", function($scope, MediaControls) {
            return $scope.mediaControls = MediaControls;
          }
        ]
      };
    }
  ]);

}).call(this);
