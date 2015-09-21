(function() {
  'use strict';
  var Page, app;

  Page = (function() {
    function Page() {}

    Page.prototype.selectedCommunityTab = 0;

    return Page;

  })();

  app = angular.module("Chutter");

  app.factory("Page", [
    function() {
      return new Page;
    }
  ]);

  app.factory("MediaPlayer", [
    "$document", "$mdMedia", "$mdBottomSheet", "$rootScope", "$templateRequest", "$compile", "$sce", function($document, $mdMedia, $mdBottomSheet, $rootScope, $templateRequest, $compile, $sce) {
      var MPClass;
      MPClass = (function() {
        MPClass.prototype.scope = $rootScope.$new();

        MPClass.prototype.mediaPlayerContentJQElement = {};

        MPClass.prototype.post = {};

        MPClass.scrollElement = $(".md-virtual-repeat-scroller");

        MPClass.prototype.DESKTOP_MEDIA_PLAYER_HEIGHT = 457.5;

        MPClass.prototype.MINI_DESKTOP_MEDIA_PLAYER_HEIGHT = 228.75;

        MPClass.prototype.MINI_DESKTOP_MEDIA_PLAYER_WIDTH = 305;

        MPClass.prototype.desktopMediaPlayerElement = $document[0].createElement('div');

        MPClass.prototype.currentSrcElement = void 0;

        MPClass.prototype.scrollElement = {};

        function MPClass() {
          this.desktopMediaPlayerElement.id = "desktopMediaPlayer";
          this.desktopMediaPlayerElement.className += "md-whiteframe-z1";
          this.scope.currentMedia = {};
          this.scope.media = [];
          angular.element(document.body).append(this.desktopMediaPlayerElement);
          $templateRequest("../app/partials/shared/mediaPlayerContent.html").then((function(_this) {
            return function(html) {
              var template;
              template = angular.element(html);
              _this.mediaPlayerContentJQElement = template;
              return $compile(_this.mediaPlayerContentJQElement)(_this.scope);
            };
          })(this));
        }

        MPClass.prototype.toggle = function(post, ev, customScrollElementClass) {
          if (this.currentSrcElement && (ev.target.id === this.currentSrcElement.id)) {
            return this.closeAllPlayers();
          } else {
            return this.open(post, ev, customScrollElementClass);
          }
        };

        MPClass.prototype.openMiniDesktopMediaPlayer = _.throttle(function() {
          var boundingRect, canvas, translateXAmount, translateYAmount;
          boundingRect = this.desktopMediaPlayerElement.getBoundingClientRect();
          canvas = this.scrollElement.width();
          translateXAmount = canvas - boundingRect.width + boundingRect.left;
          translateYAmount = boundingRect.top - 80;
          this.desktopMediaPlayerElement.style.transform = "translateX(" + translateXAmount + "px) translateY(-" + translateYAmount + "px) scale(0.5)";
          this.desktopMediaPlayerElement.style.mozTransform = "translateX(" + translateXAmount + "px) translateY(-" + translateYAmount + "px) scale(0.5)";
          this.desktopMediaPlayerElement.style.webkitTransform = "translateX(" + translateXAmount + "px) translateY(-" + translateYAmount + "px) scale(0.5)";
          return this.scrollElement.unbind('scroll');
        }, 50);

        MPClass.prototype.open = function(post, ev, customScrollElementClass) {
          var actualTop, computedHeight, targetTop, viewportHeight;
          this.closeAllPlayers();
          this.scope.currentMedia = post.media[0];
          if (this.scope.currentMedia && this.scope.currentMedia.format === "video") {
            this.scope.currentMedia.trusted_stream_link = $sce.trustAsResourceUrl(this.scope.currentMedia.stream_link);
          }
          this.scope.media = this.scope.media.concat(post.media);
          this.scope.body = post.body;
          this.currentSrcElement = ev.target;
          if (customScrollElementClass) {
            this.scrollElement = $("." + customScrollElement);
          } else {
            this.scrollElement = $(".md-virtual-repeat-scroller");
          }
          if ($mdMedia('gt-md')) {
            this.desktopMediaPlayerElement.appendChild(this.mediaPlayerContentJQElement[0]);
            $("#fill-button").click((function(_this) {
              return function() {
                return _this.desktopMediaPlayerElement.className += " largeOpened";
              };
            })(this));
            $("#close-button").click((function(_this) {
              return function() {
                return _this.closeAllPlayers();
              };
            })(this));
            if (this.scope.currentMedia && this.scope.currentMedia.format === "video") {
              this.showProgress();
              _.defer((function(_this) {
                return function() {
                  return $("iframe").load(function() {
                    return _this.hideProgress();
                  });
                };
              })(this));
            }
            if (this.scope.currentMedia && (this.scope.currentMedia.format === "video" || this.scope.currentMedia.format === "music")) {
              this.scrollElement.scroll((function(_this) {
                return function() {
                  return _this.openMiniDesktopMediaPlayer();
                };
              })(this));
            }
            computedHeight = ev.target.getBoundingClientRect().top + this.DESKTOP_MEDIA_PLAYER_HEIGHT;
            viewportHeight = window.innerHeight || document.documentElement.clientHeight;
            targetTop = ev.target.getBoundingClientRect().top;
            actualTop = ev.target.getBoundingClientRect().top;
            if (computedHeight > viewportHeight) {
              actualTop = viewportHeight - this.DESKTOP_MEDIA_PLAYER_HEIGHT;
            }
            this.desktopMediaPlayerElement.style.top = actualTop + "px";
            this.desktopMediaPlayerElement.style.left = "146px";
            return this.desktopMediaPlayerElement.className += " opened";
          } else {
            return $mdBottomSheet.show({
              templateUrl: '/partials/shared/mediaPlayerSheet.html',
              controller: [
                "MediaPlayer", "$scope", function(MediaPlayer, $scope) {
                  return setTimeout((function(_this) {
                    return function() {
                      return document.getElementById("mobileMediaPlayer").appendChild(MediaPlayer.mediaPlayerContentJQElement[0]);
                    };
                  })(this), 500);
                }
              ],
              disableParentScroll: true,
              parent: angular.element(document.body),
              clickOutsideToClose: true
            });
          }
        };

        MPClass.prototype.showProgress = function() {
          var elm;
          elm = document.getElementById("progress-place-holder");
          if (elm) {
            return elm.style.display = "block";
          }
        };

        MPClass.prototype.hideProgress = function() {
          var elm;
          elm = document.getElementById("progress-place-holder");
          if (elm) {
            return elm.style.display = "none";
          }
        };

        MPClass.prototype.closeAllPlayers = function() {
          console.log("hi");
          if ($mdMedia('gt-md')) {
            this.closeDesktopMediaPlayer();
          } else {
            this.closeMobileMediaPlayer();
          }
          this.currentSrcElement = void 0;
          return this.mediaPlayerContentJQElement.remove();
        };

        MPClass.prototype.closeDesktopMediaPlayer = function() {
          if (this.currentSrcElement) {
            this.scrollElement.unbind('scroll');
            this.desktopMediaPlayerElement.className = "md-whiteframe-z1";
            this.desktopMediaPlayerElement.style.transform = "";
            this.desktopMediaPlayerElement.style.webkitTransform = "";
            return this.desktopMediaPlayerElement.style.mozTransform = "";
          }
        };

        MPClass.prototype.closeMobileMediaPlayer = function() {
          return $mdBottomSheet.hide().then((function(_this) {
            return function() {
              return _this.currentSrcElement = void 0;
            };
          })(this));
        };

        return MPClass;

      })();
      return new MPClass;
    }
  ]);

  app.factory("CommunityRule", [
    function() {
      return function() {
        return {
          general: false,
          posts: false,
          comments: false,
          ban: false,
          removal: false,
          discouraged: false,
          category: "",
          detailed_explanation: ""
        };
      };
    }
  ]);

  app.factory("ActivityLogEntry", [
    function() {
      return function() {
        return {
          rule_id: void 0,
          detailed_explanation: "",
          entityable_user_id: void 0
        };
      };
    }
  ]);

}).call(this);
