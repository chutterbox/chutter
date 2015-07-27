(function() {
  var app;

  app = angular.module("Chutter");

  app.directive('post', [
    "MediaPlayer", "PostResource", "Page", function(MediaPlayer, PostResource, Page) {
      return {
        restrict: "E",
        scope: {
          post: "=",
          postIndex: "="
        },
        templateUrl: "/partials/main/post.html",
        link: function(scope, element, attrs) {
          var SCALE_CONST;
          scope.resource = PostResource;
          SCALE_CONST = 125 * 2.05;
          console.log(scope.post);
          scope.post.elements = {};
          scope.post.elements["post"] = element[0];
          scope.post.toggled = false;
          _.each(element[0].children, function(child) {
            return scope.post.elements[child.className] = child;
          });
          if (scope.post.media) {
            scope.post.elements.media.style.backgroundImage = "url(" + scope.post.media[0].thumbnail_link + ")";
            scope.post.elements.media.style.backgroundSize = "cover";
          }
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
          scope.post.toggle = function() {
            var i, mdContent, targets;
            MediaPlayer.initialize(scope.post);
            mdContent = document.getElementById("posts");
            targets = Page.posts;
            if (scope.post.toggled) {
              i = 0;
              scope.post.elements.media.className = "media unscale-media";
              scope.post.elements.middle.className = "middle unscale-middle";
              _.each(targets.slice(scope.postIndex), function(target) {
                if (target.elements && target.elements.post) {
                  return target.elements.post.style.cssText += "transform: translateY(0px);-webkit-transform: translateY(0px);";
                }
              });
            } else {
              i = 0;
              _.each(targets, function(target) {
                if (target.elements && target.elements.post) {
                  if (target.toggled) {
                    target.elements.media.className = "media unscale-media";
                    target.elements.middle.className = "middle unscale-middle";
                  }
                  target.toggled = false;
                  if (scope.postIndex < i) {
                    target.elements.post.style.cssText += "transform:translateY(" + SCALE_CONST + "px); -webkit-transform:translateY(" + SCALE_CONST + "px);";
                  } else {
                    target.elements.post.style.cssText += "transform:translateY(0px); -webkit-transform:translateY(0px);";
                  }
                  return i += 1;
                }
              });
              scope.post.elements.middle.className = "middle scale-middle";
              scope.post.elements.media.className = "media scale-media";
              MediaPlayer.show();
            }
            return scope.post.toggled = !scope.post.toggled;
          };
          return scope.post.toggleBody = function() {
            var i, mdContent, targets;
            mdContent = document.getElementById("posts");
            targets = Page.posts;
            if (scope.post.toggled) {
              i = 0;
              scope.post.elements.body.className = "body unscale-body";
              scope.post.elements.middle.className = "middle unscale-middle";
              _.each(targets.slice(scope.postIndex), function(target) {
                if (target.elements && target.elements.post) {
                  return target.elements.post.style.cssText += "transform: translateY(0px);-webkit-transform: translateY(0px);";
                }
              });
            } else {
              i = 0;
              _.each(targets, function(target) {
                if (target.elements && target.elements.post) {
                  if (target.toggled) {
                    target.elements.body.className = "body unscale-body";
                    target.elements.middle.className = "middle unscale-middle";
                  }
                  target.toggled = false;
                  if (scope.postIndex < i) {
                    target.elements.post.style.cssText += "transform:translateY(" + SCALE_CONST + "px); -webkit-transform:translateY(" + SCALE_CONST + "px);";
                  } else {
                    target.elements.post.style.cssText += "transform:translateY(0px); -webkit-transform:translateY(0px);";
                  }
                  return i += 1;
                }
              });
              scope.post.elements.middle.className = "middle scale-middle";
              scope.post.elements.body.className = "body scale-body";
            }
            return scope.post.toggled = !scope.post.togg;
          };
        },
        controller: [
          "$scope", "$rootScope", "$mdBottomSheet", function($scope, $rootScope, $mdBottomSheet) {
            $scope.user = $rootScope.user;
            $scope.moderate = function() {
              if ($scope.user.moderator) {
                return $mdBottomSheet.show({
                  templateUrl: '/partials/shared/modSheet.html',
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
                templateUrl: '/partials/shared/reportSheet.html',
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

  app.directive("mediaPlayer", [
    "MediaPlayer", function(MediaPlayer) {
      return {
        restrict: "E",
        templateUrl: "/partials/main/mediaPlayer.html",
        link: function(scope, element, attrs) {
          return MediaPlayer.element = element[0];
        },
        controller: [
          "$scope", "MediaPlayer", function($scope, MediaPlayer) {
            return $scope.mediaPlayer = MediaPlayer;
          }
        ]
      };
    }
  ]);

}).call(this);
