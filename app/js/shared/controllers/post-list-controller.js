(function() {
  'use strict';
  var app;

  app = angular.module("Chutter");

  app.controller("postListCtrl", [
    "$scope", "Page", "Posts", "PostResource", "$stateParams", "NetworkResource", "CommunityResource", "MediaPlayer", "PostService", "$state", function($scope, Page, Posts, PostResource, $stateParams, NetworkResource, CommunityResource, MediaPlayer, PostService, $state) {
      var DynamicItems;
      if ($stateParams.network) {
        $scope.applicationSectionNamespace = "network_frontpage";
      } else {
        $scope.applicationSectionNamespace = "frontpage";
      }
      if ($state.current.data) {
        $scope.context = $state.current.data.context;
        $scope.sorting = $state.current.data.sorting;
      }
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
