(function() {
  var app;

  app = angular.module("MainApp");

  app.controller("submitCtrl", [
    "$scope", "CommunityResource", "Page", function($scope, CommunityResource, Page) {
      $scope.communitySearch = function(query) {
        console.log(query);
        if (query && query.length > 0) {
          return CommunityResource.search({
            q: query
          }).$promise;
        }
      };
      $scope.selectedCommunityChange = function() {
        return Page.community = $scope.selectedCommunity;
      };
      $scope.permitted = function(type) {
        if ($scope.selectedCommunity && $scope.selectedCommunity.permitted_formats_list.indexOf(type) > -1) {
          return true;
        } else {
          return false;
        }
      };
      return $scope.selectPostType = function(type) {
        return $scope.newPost.type = type;
      };
    }
  ]);

  app.controller("musicSubmitCtrl", [
    "$scope", "MediaResource", "ExternalServicesResource", "Page", "PostResource", "$state", function($scope, MediaResource, ExternalServicesResource, Page, PostResource, $state) {
      $scope.page = Page;
      $scope.newPost = {
        title: "",
        link: ""
      };
      $scope.querySearch = function(query) {
        if (query && query.length > 0) {
          return ExternalServicesResource.search({
            q: query
          }).$promise;
        }
      };
      $scope.submit = function() {
        $scope.newPost.community_id = $scope.page.community.id;
        return PostResource.save({
          post: $scope.newPost
        }).$promise.then(function(data) {
          return $state.transitionTo("frontpage.community.comments", {
            id: data.slug,
            community: $scope.page.community.slug
          });
        });
      };
      return $scope.selectedItemChange = function() {
        $scope.newPost.link = $scope.selectedItem.link;
        return $scope.newPost.title = $scope.selectedItem.title;
      };
    }
  ]);

  app.controller("linkSubmitCtrl", [
    "$scope", "MediaResource", "Page", "PostResource", "$state", function($scope, MediaResource, Page, PostResource, $state) {
      $scope.page = Page;
      $scope.newPost = {
        title: "",
        link: ""
      };
      $scope.preview = {
        title: "",
        link: ""
      };
      return $scope.submit = function() {
        $scope.newPost.community_id = $scope.page.community.id;
        return PostResource.save({
          post: $scope.newPost
        }).$promise.then(function(data) {
          return $state.transitionTo("frontpage.community.comments", {
            id: data.slug,
            community: $scope.page.community.slug
          });
        });
      };
    }
  ]);

  app.controller("discussionSubmitCtrl", [
    "$scope", "Page", "PostResource", "$state", function($scope, Page, PostResource, $state) {
      $scope.page = Page;
      $scope.newPost = {
        title: ""
      };
      $scope.preview = {
        title: ""
      };
      $scope.$watch("newPost.title", function(newVal) {
        return $scope.preview.title = newVal;
      });
      $scope.submit = function() {
        $scope.newPost.community_id = $scope.page.community.id;
        return PostResource.save({
          post: $scope.newPost
        }).$promise.then(function(data) {
          return $state.transitionTo("frontpage.community.comments", {
            id: data.slug,
            community: $scope.page.community.slug
          });
        });
      };
      return $scope.updatePreview = function(data) {
        $scope.scraping = false;
        if (data) {
          $scope.data = true;
          $scope.newPost.media_attributes[0] = data;
          return $scope.preview.media[0] = data;
        }
      };
    }
  ]);

}).call(this);
