(function() {
  'use strict';
  var app;

  app = angular.module("Chutter");

  app.controller("postListCtrl", [
    "$scope", "Page", "Posts", "PostResource", "$stateParams", "NetworkResource", "CommunityResource", "MediaPlayer", "PostService", "$state", function($scope, Page, Posts, PostResource, $stateParams, NetworkResource, CommunityResource, MediaPlayer, PostService, $state) {
      var DynamicItems, content, prevScrollTop, scrollElement, throttledFn, toolbar, y;
      if ($stateParams.network) {
        $scope.applicationSectionNamespace = "network_frontpage";
      } else {
        $scope.applicationSectionNamespace = "frontpage";
      }
      if ($state.current.data) {
        $scope.context = $state.current.data.context;
        $scope.sorting = $state.current.data.sorting;
      }
      y = 0;
      prevScrollTop = 0;
      toolbar = document.getElementById("toolbarShrink");
      content = document.getElementById("contentShrink");
      scrollElement = $(".md-virtual-repeat-scroller");
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
      scrollElement.scroll(_.throttle(throttledFn, 6));
      Page.posts = Posts.posts;
      DynamicItems = function() {

        /**
         * @type {!Object<?Array>} Data pages, keyed by page number (0-index).
         */
        this.loadedPages = {};
        this.loadedPages[0] = Posts.posts;

        /** @type {number} Total number of items. */
        this.numItems = Posts.count;

        /** @const {number} Number of items to fetch per request. */
        this.PAGE_SIZE = 15;
      };
      DynamicItems.prototype.getItemAtIndex = function(index) {
        var page, pageNumber;
        pageNumber = Math.floor(index / this.PAGE_SIZE);
        page = this.loadedPages[pageNumber];
        if (page) {
          return page[index % this.PAGE_SIZE];
        } else if (page !== null) {
          this.fetchPage_(pageNumber);
        }
      };
      DynamicItems.prototype.getLength = function() {
        return this.numItems;
      };
      DynamicItems.prototype.fetchPage_ = function(pageNumber) {
        var pageOffset;
        pageOffset = pageNumber * this.PAGE_SIZE;
        this.loadedPages[pageNumber] = null;
        console.log($scope.context);
        if ($scope.context === "frontpage") {
          PostResource.query({
            sort: $scope.sorting,
            offset: pageOffset
          }).$promise.then(angular.bind(this, function(data) {
            var i, item, j, len, ref;
            this.loadedPages[pageNumber] = [];
            this.numItems = data.count;
            i = pageOffset;
            ref = data.posts;
            for (j = 0, len = ref.length; j < len; j++) {
              item = ref[j];
              this.loadedPages[pageNumber].push(item);
            }
          }));
        } else if ($scope.context === "network_frontpage") {
          NetworkResource.posts({
            id: $stateParams.network,
            sort: $scope.sorting,
            offset: pageOffset
          }).$promise.then(angular.bind(this, function(data) {
            var i, item, j, len, ref;
            this.loadedPages[pageNumber] = [];
            this.numItems = data.count;
            i = pageOffset;
            ref = data.posts;
            for (j = 0, len = ref.length; j < len; j++) {
              item = ref[j];
              this.loadedPages[pageNumber].push(item);
            }
          }));
        } else if ($scope.context === "frontpage_community" || $scope.context === "network_frontpage_community") {
          CommunityResource.posts({
            id: $stateParams.community,
            sort: $scope.sorting,
            offset: pageOffset
          }).$promise.then(angular.bind(this, function(data) {
            var i, item, j, len, ref;
            this.loadedPages[pageNumber] = [];
            this.numItems = data.count;
            i = pageOffset;
            ref = data.posts;
            for (j = 0, len = ref.length; j < len; j++) {
              item = ref[j];
              this.loadedPages[pageNumber].push(item);
            }
          }));
        }
      };
      this.mediaPlayer = MediaPlayer;
      this.postService = PostService;
      this.dynamicItems = new DynamicItems;
      return this;
    }
  ]);

}).call(this);
