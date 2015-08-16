(function() {
  'use strict';
  var MediaControls, Page, app;

  Page = (function() {
    function Page() {}

    Page.prototype.title = "";

    Page.prototype.scope = "";

    Page.prototype.community = {
      permitted_formats_list: []
    };

    Page.prototype.network = {
      communities: []
    };

    Page.prototype.posts = [];

    return Page;

  })();

  MediaControls = (function() {
    function MediaControls() {}

    MediaControls.prototype.post = {};

    MediaControls.prototype.element = {};

    MediaControls.prototype.currentMedia = {};

    MediaControls.prototype.initialize = function(post) {
      this.post = post;
      this.media = post.media;
      console.log(post.media);
      return this.currentMedia = this.media[0];
    };

    MediaControls.prototype.show = function() {
      this.element.className = "";
      this.element.style.cssText += "top: " + this.post.elements.post.offsetTop + "px; left: " + this.post.elements.vote.offsetWidth + "px;";
      return this.element.className = "active";
    };

    MediaControls.prototype.close = function() {
      return this.element.className = "";
    };

    return MediaControls;

  })();

  app = angular.module("Chutter");

  app.factory("Page", [
    function() {
      return new Page;
    }
  ]);

  app.factory("MediaControls", [
    function() {
      return new MediaControls;
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
          brief_description: "",
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
