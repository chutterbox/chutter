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
          $scope.post.elements.postcontent = $scope.post.elements.main.children[0];
          $scope.post.elements.middle = $scope.post.elements.main.children[1];
          if ($scope.post.currentMedia) {
            $scope.post.elements.postcontent.style.backgroundImage = "url(" + $scope.post.currentMedia.thumbnail_link + ")";
            $scope.post.elements.postcontent.style.backgroundSize = "cover";
            if ($scope.post.currentMedia.format === "music") {
              $scope.post.audio = new audio($scope.post.currentMedia.stream_link + "?client_id=d26dfbcb4ff9b9c8e712bcbcc37db120");
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
              if ($scope.post.audio) {
                return $scope.post.audio.play();
              }
            } else if (newVal === false && $scope.post.audio) {
              return $scope.post.audio.pause();
            }
          });
          $scope.setXTranslations = function() {
            var xTranslation;
            if ($scope.post.currentMedia.format !== "video" && $scope.post.zoomValue > 1 && $scope.post.elements.postcontent.children[0].complete) {
              xTranslation = ($scope.post.elements.postcontent.children[0].offsetHeight * ($scope.post.zoomValue / 10)) - 100;
            } else {
              xTranslation = ($scope.post.elements.postcontent.offsetHeight * ($scope.post.zoomValue / 10)) - 100;
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
            $scope.moderate = function() {
              if ($scope.user.moderator) {
                return $mdBottomSheet.show({
                  templateUrl: '../app/partials/shared/modSheet.html',
                  parent: "#posts",
                  disableParentScroll: true,
                  locals: {
                    entityable: $scope.post,
                    entityableType: "post"
                  },
                  controller: "modSheetCtrl"
                });
              }
            };
            return $scope.report = function() {
              return $mdBottomSheet.show({
                templateUrl: '../app/partials/shared/reportSheet.html',
                parent: "#posts",
                disableParentScroll: true,
                locals: {
                  entityable: $scope.post,
                  entityableType: "post"
                }
              });
            };
          }
        ]
      };
    }
  ]);

  app.directive('comment', [
    "$compile", "$mdBottomSheet", "CommentResource", function($compile, $mdBottomSheet, CommentResource) {
      return {
        restrict: "E",
        scope: {
          comment: "=",
          parent: "="
        },
        link: function($scope, $element) {
          if (Object.prototype.toString.call($scope.comment.children) !== '[object Array]') {
            $scope.comment.children = [];
          }
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
              templateUrl: '../app/partials/main/comments/replyPanel.html',
              parent: "#content",
              clickOutsideToClose: true,
              preserveScope: true,
              disableParentScroll: true,
              controller: "replyCtrl",
              scope: $scope
            });
          };
        },
        templateUrl: "../app/partials/shared/comments/comment.html"
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
