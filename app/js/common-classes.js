(function() {
  'use strict';
  var MediaControls, Page, Paginator, app;

  Paginator = (function() {
    function Paginator() {}

    Paginator.prototype.offset = 26;

    Paginator.prototype.ended = false;

    Paginator.prototype.current_sort = "hot";

    Paginator.prototype.loading = false;

    Paginator.prototype.start_fetch = function() {
      return this.loading = true;
    };

    Paginator.prototype.finish_fetch = function(length) {
      if (length < 25) {
        this.ended = true;
      }
      return this.loading = true;
    };

    Paginator.prototype.reset = function(current_sort) {
      if (current_sort == null) {
        current_sort = "hot";
      }
      this.offset = 26;
      this.ended = false;
      this.current_sort = current_sort;
      return this.loading = false;
    };

    return Paginator;

  })();

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

    Page.prototype.paginator = new Paginator;

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

  app.factory("WrapperDiv", [
    function() {
      return function() {
        var div;
        div = document.createElement("div");
        div.id = "under-active-post-wrapper";
        return div;
      };
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
