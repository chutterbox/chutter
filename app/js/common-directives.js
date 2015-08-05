(function() {
  var app;

  app = angular.module("Chutter");

  app.directive('post', [
    "MediaControls", "PostResource", "Page", "audio", "$document", function(MediaControls, PostResource, Page, audio, $document) {
      return {
        restrict: "E",
        scope: {
          post: "=",
          postIndex: "="
        },
        templateUrl: "../app/partials/main/post.html",
        link: function(scope, element, attrs) {
          scope.post.elements = {};
          scope.post.elements["post"] = element[0];
          scope.post.toggled = false;
          _.each(element[0].children, function(child) {
            return scope.post.elements[child.className] = child;
          });
          if (scope.post.media.length > 0) {
            scope.post.currentMedia = scope.post.media[0];
          } else {
            scope.post.currentMedia = {
              format: "body",
              body: scope.post.body
            };
          }
          scope.post.elements.postcontent = scope.post.elements.main.children[0];
          scope.post.elements.media = scope.post.elements.postcontent.children[1];
          scope.post.elements.middle = scope.post.elements.main.children[1];
          _.defer(function() {
            scope.ratioHeight = scope.post.elements.postcontent.offsetWidth * (3 / 4) - 80;
            return scope.post.elements.postcontent.style.height = scope.ratioHeight + "px";
          });
          if (scope.post.currentMedia) {
            scope.post.elements.media.style.backgroundImage = "url(" + scope.post.currentMedia.thumbnail_link + ")";
            scope.post.elements.media.style.backgroundSize = "cover";
            if (scope.post.currentMedia.format === "music") {
              scope.post.audio = new audio(scope.post.currentMedia.stream_link + "?client_id=d26dfbcb4ff9b9c8e712bcbcc37db120");
            }
          }
          scope.$watch("post.zoomValue", function(newVal, oldVal) {
            var val;
            if (newVal && newVal !== oldVal) {
              if (newVal === 0) {
                newVal = 1;
              }
              val = newVal / 10;
              scope.post.elements.postcontent.style.cssText += "transform: scale(" + val + ");-webkit-transform: scale(" + val + ");-moz-transform: scale(" + val + ");";
              scope.post.elements.middle.style.cssText += "transform: scale(" + (1 - val) + ");-webkit-transform: scale(" + (1 - val) + ");-moz-transform: scale(" + (1 - val) + ");";
              scope.setXTranslations();
              if (scope.post.currentMedia.format !== "video" && (newVal > 1 && (!oldVal || oldVal <= 1))) {
                return scope.post.elements.media.children[0].onload = function() {
                  return setTimeout(function() {
                    return scope.$apply(function() {
                      return scope.setXTranslations();
                    });
                  }, 350);
                };
              }
            }
          });
          scope.$watch("post.toggled", function(newVal) {
            var mdContent;
            if (newVal === true) {
              mdContent = document.getElementById("content");
              mdContent.scrollTop = scope.post.elements.post.offsetTop - (mdContent.clientHeight / 3);
              if (scope.post.audio) {
                return scope.post.audio.play();
              }
            } else if (newVal === false && scope.post.audio) {
              return scope.post.audio.pause();
            }
          });
          scope.setXTranslations = function() {
            var targets, xTranslation;
            if (scope.post.currentMedia.format !== "video" && scope.post.zoomValue > 1 && scope.post.elements.media.children[0].complete) {
              xTranslation = (scope.post.elements.media.children[0].offsetHeight * (scope.post.zoomValue / 10)) - 100;
            } else {
              xTranslation = (scope.post.elements.postcontent.offsetHeight * (scope.post.zoomValue / 10)) - 100;
            }
            targets = Page.posts;
            return _.each(targets.slice(scope.postIndex + 1), function(target) {
              if (target.elements && target.elements.post) {
                return target.elements.post.style.cssText += "transform: translateY(" + xTranslation + "px);-webkit-transform: translateY(" + xTranslation + "px);-moz-transform: translateY(" + xTranslation + "px);";
              }
            });
          };
          scope.post.updateVote = function(vote) {
            if (scope.post.vote === vote) {
              vote = 0;
            }
            scope.post.vote = vote;
            return PostResource.vote({
              id: scope.post.id,
              vote: vote
            });
          };
          return scope.post.toggle = function(post) {
            var preferredScaleValue;
            preferredScaleValue = scope.post.currentMedia.format === "music" ? 4 : 5;
            if (Page.selectedPost === scope.post) {
              if (Page.selectedPost.zoomValue !== 1) {
                Page.selectedPost.zoomValue = 1;
                return Page.selectedPost.toggled = false;
              } else {
                Page.selectedPost.zoomValue = preferredScaleValue;
                return Page.selectedPost.toggled = true;
              }
            } else {
              if (Page.selectedPost) {
                Page.selectedPost.zoomValue = 1;
                Page.selectedPost.toggled = false;
                _.defer(function() {
                  scope.post.zoomValue = preferredScaleValue;
                  return scope.$apply();
                });
                Page.selectedPost = scope.post;
                return Page.selectedPost.toggled = true;
              } else {
                Page.selectedPost = scope.post;
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
