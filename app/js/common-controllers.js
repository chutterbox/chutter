(function() {
  'use strict';
  var app;

  app = angular.module("Chutter");

  app.controller("createCommunityRuleCtrl", [
    "$scope", "$mdDialog", function($scope, $mdDialog) {
      $scope.selectedAppliesTo = "";
      $scope.selectedSeverity = "";
      $scope.setSelectedAppliesTo = function(value) {
        $scope.newRule[$scope.selectedAppliesTo] = false;
        return $scope.selectedAppliesTo = value;
      };
      $scope.setSelectedSeverity = function(value) {
        $scope.newRule[$scope.selectedSeverity] = false;
        return $scope.selectedSeverity = value;
      };
      $scope.submit;
      $scope.saveRule = function() {
        return $mdDialog.hide();
      };
      return $scope.cancelSave = function() {
        $scope.$emit("cancelSave");
        return $mdDialog.hide();
      };
    }
  ]);

  app.controller("modSheetCtrl", [
    "$mdBottomSheet", "$scope", "entityable", "entityableType", "CommunityResource", "PostResource", "ActivityLogEntry", function($mdBottomSheet, $scope, entityable, entityableType, CommunityResource, PostResource, ActivityLogEntry) {
      if (entityableType === "post") {
        $scope.post = entityable;
      }
      if (entityableType === "comment") {
        $scope.comment = entityable;
      }
      $scope.entityable = entityable;
      $scope.activityLogEntry = new ActivityLogEntry;
      CommunityResource.reportableRules({
        id: $scope.entityable.community_slug
      }).$promise.then(function(data) {
        return $scope.communityRules = _.filter(data, function(rule) {
          return rule.sitewide || rule.posts;
        });
      });
      $scope.activityLogEntry.id = $scope.entityable.id;
      $scope.submitEntityableForm = function() {
        if (entityableType === "post") {
          return PostResource["delete"]($scope.activityLogEntry).$promise.then(function(data) {
            if (data.status === 200) {
              return $scope.closeSheet();
            } else {
              return $scope.closeSheet();
            }
          });
        }
      };
      $scope.submitUserForm = function() {
        if (entityableType === "post") {
          return PostResource.ban($scope.activityLogEntry);
        }
      };
      return $scope.closeModSheet = function() {
        return $mdBottomSheet.hide();
      };
    }
  ]);

  app.controller("reportSheetCtrl", [
    "$mdBottomSheet", "$scope", "entityable", "entityableType", "CommunityResource", "PostResource", "ActivityLogEntry", function($mdBottomSheet, $scope, entityable, entityableType, CommunityResource, PostResource, ActivityLogEntry) {
      if (entityableType === "post") {
        $scope.post = entityable;
      }
      if (entityableType === "comment") {
        $scope.comment = entityable;
      }
      $scope.entityable = entityable;
      CommunityResource.reportableRules({
        id: $scope.entityable.community_slug
      }).$promise.then(function(data) {
        return $scope.communityRules = _.filter(data, function(rule) {
          return rule.sitewide || rule.posts;
        });
      });
      $scope.activityLogEntry = new ActivityLogEntry;
      $scope.activityLogEntry.id = $scope.entityable.id;
      $scope.submitEntityableForm = function() {
        if (entityableType === "post") {
          return PostResource.report($scope.activityLogEntry).$promise.then(function(data) {
            if (data.status === 200) {
              $scope.closeSheet(true);
              return entityable.reported = true;
            } else {
              return $scope.closeSheet(false);
            }
          });
        }
      };
      return $scope.closeSheet = function(reported) {
        return $mdBottomSheet.hide(reported);
      };
    }
  ]);

  app.controller("commentsCtrl", [
    "$scope", "Comments", "Post", "Page", "$mdBottomSheet", "CommentResource", function($scope, Comments, Post, Page, $mdBottomSheet, CommentResource) {
      $scope.page = Page;
      $scope.page.post = Post;
      $scope.page.comments = Comments;
      $scope.resource = CommentResource;
      $scope.fetchMoreComments = function() {};
      return $scope.reply = function() {
        return $mdBottomSheet.show({
          templateUrl: '/partials/shared/comments/replyPanel.html',
          controller: "replyCtrl",
          disableParentScroll: true,
          preserveScope: true,
          parent: angular.element(document.body),
          clickOutsideToClose: true
        });
      };
    }
  ]);

  app.controller("replyCtrl", [
    "$scope", "Page", "CommentResource", "$mdBottomSheet", function($scope, Page, CommentResource, $mdBottomSheet) {
      $scope.page = Page;
      $scope.newComment = {
        post_id: $scope.page.post.id,
        parent_id: $scope.comment && $scope.comment.id ? $scope.comment.id : void 0,
        body: ""
      };
      return $scope.create = function() {
        return CommentResource.save({
          comment: $scope.newComment
        }).$promise.then(function(newCreatedComment) {
          $mdBottomSheet.hide();
          newCreatedComment.username = newCreatedComment.user.username;
          if ($scope.comment && $scope.comment.id) {
            return $scope.comment.children.unshift(newCreatedComment);
          } else {
            return $scope.page.comments.unshift(newCreatedComment);
          }
        });
      };
    }
  ]);

  app.controller("postsCtrl", [
    "$scope", "Page", "Posts", "PostResource", "$stateParams", "NetworkResource", "CommunityResource", "MediaPlayer", "$mdBottomSheet", "$mdToast", function($scope, Page, Posts, PostResource, $stateParams, NetworkResource, CommunityResource, MediaPlayer, $mdBottomSheet, $mdToast) {
      var DynamicItems;
      $scope.page.posts = Posts.posts;
      $scope.mediaPlayer = MediaPlayer;
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
      this.dynamicItems = new DynamicItems;
      this.updateVote = function(post, vote) {
        if (post.vote === vote) {
          vote = 0;
        }
        post.vote = vote;
        return PostResource.vote({
          id: post.id,
          vote: vote
        });
      };
      this.moderate = function(post) {
        if ($scope.user.moderator) {
          return $mdBottomSheet.show({
            templateUrl: '../app/partials/shared/modSheet.html',
            parent: angular.element(document.body),
            disableParentScroll: true,
            locals: {
              entityable: post,
              entityableType: "post"
            },
            controller: "modSheetCtrl"
          });
        }
      };
      this.report = function(post) {
        return $mdBottomSheet.show({
          templateUrl: '../app/partials/shared/reportSheet.html',
          parent: angular.element(document.body),
          disableParentScroll: true,
          locals: {
            entityable: post,
            entityableType: "post"
          },
          controller: "reportSheetCtrl"
        }).then(function(reported) {
          if (reported) {
            return $mdToast.show($mdToast.simple().content('Post Reported.'));
          }
        });
      };
      this.getBackgroundImage = function(post) {
        if (post.media && post.media.length > 0) {
          if (post.media[0].thumbnail_link && post.media[0].thumbnail_link.length > 0) {
            return "url(" + post.media[0].thumbnail_link + ")";
          } else {
            return "url('/img/character.svg')";
          }
        } else {
          return "none";
        }
      };
      return this;
    }
  ]);

  app.controller("subscriptionDialogCtrl", ["$scope", function($scope) {}]);

}).call(this);
