(function() {
  'use strict';
  var MediaPlayer, Page, app;

  Page = (function() {
    function Page() {}

    Page.prototype.community = {
      permitted_formats_list: []
    };

    Page.prototype.network = {
      communities: []
    };

    Page.prototype.posts = [];

    Page.prototype.selectedSection = "";

    Page.prototype.selectSection = function(section) {
      return this.selectedSection = section;
    };

    Page.prototype.toggleSelectSection = function(section) {
      if (section === this.selectedSection) {
        return this.selectedSection = null;
      } else {
        return this.selectedSection = section;
      }
    };

    Page.prototype.isSectionSelected = function(section) {
      return this.selectedSection === section;
    };

    return Page;

  })();

  MediaPlayer = (function() {
    function MediaPlayer() {}

    MediaPlayer.prototype.post = {};

    MediaPlayer.prototype.height = 125 * 3;

    MediaPlayer.prototype.width = 167 * 3;

    MediaPlayer.prototype.element = {};

    MediaPlayer.prototype.currentMedia = {};

    MediaPlayer.prototype.initialize = function(post) {
      this.post = post;
      this.media = post.media;
      return this.currentMedia = this.media[0];
    };

    MediaPlayer.prototype.show = function() {
      this.element.className = "";
      this.element.style.cssText += "top: " + this.post.elements.post.offsetTop + "px; left: " + this.post.elements.media.offsetLeft + "px;";
      return this.element.className = "active";
    };

    MediaPlayer.prototype.close = function() {
      this.post.toggle();
      return this.element.className = "";
    };

    return MediaPlayer;

  })();

  app = angular.module("Chutter");

  app.factory("Page", [
    function() {
      return new Page;
    }
  ]);

  app.factory("MediaPlayer", [
    function() {
      return new MediaPlayer;
    }
  ]);

}).call(this);
