(function() {
  'use strict';
  var app;

  app = angular.module("Chutter");

  app.controller("postListCtrl", [
    "$scope", "Page", "Posts", "PostResource", "$stateParams", "NetworkResource", "CommunityResource", "MediaPlayer", "PostService", function($scope, Page, Posts, PostResource, $stateParams, NetworkResource, CommunityResource, MediaPlayer, PostService) {
      var DynamicItems;
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
        this.PAGE_SIZE = 50;
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
        $scope.page.paginator.start_fetch();
        if (Page.scope === "all") {
          PostResource.query({
            sort: Page.paginator.current_sort,
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
        } else if (Page.scope === "network") {
          NetworkResource.posts({
            id: $stateParams.network,
            sort: Page.paginator.current_sort,
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
        } else if (Page.scope === "community") {
          CommunityResource.posts({
            id: $stateParams.community,
            sort: Page.paginator.current_sort,
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
