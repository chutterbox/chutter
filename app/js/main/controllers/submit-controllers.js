(function() {
  var app;

  app = angular.module("MainApp");

  app.controller("submitCtrl", [
    "$scope", "Community", "MediaResource", "Page", function($scope, Community, MediaResource, Page) {
      Community.$promise.then(function(data) {
        return $scope.page.community = data;
      });
      $scope.permitted = function(type) {
        if ($scope.page.community && $scope.page.community.permitted_formats_list.indexOf(type) > -1) {
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
        media_attributes: [
          {
            format: "music"
          }
        ]
      };
      $scope.preview = {
        title: "",
        media: [{}]
      };
      $scope.querySearch = function(query) {
        if (query && query.length > 0) {
          return ExternalServicesResource.search({
            q: query
          });
        }
      };
      $scope.searchTextChange = function(text) {
        console.log(text);
      };
      $scope.submit = function() {
        $scope.newPost.community_id = $scope.page.community.id;
        return PostResource.save({
          post: $scope.newPost
        }).$promise.then(function(data) {
          return $state.transitionTo("home.community.comments", {
            id: data.slug,
            community: $scope.page.community
          });
        });
      };
      $scope.selectedItemChange = function() {
        return MediaResource.resolve({
          link: $scope.selectedItem.link,
          format: "music"
        }).$promise.then(function(data) {
          return $scope.updatePreview(data);
        });
      };
      $scope.updatePreview = function(data) {
        $scope.newPost.media_attributes[0] = data;
        $scope.newPost.title = $scope.selectedItem.title;
        $scope.preview.title = $scope.selectedItem.title;
        $scope.scraping = false;
        if (data) {
          $scope.data = true;
          return $scope.preview.media[0] = data;
        }
      };
      return $scope.loadAll = function() {
        var allStates;
        allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,              Wisconsin, Wyoming';
        return allStates.split(/, +/g).map(function(state) {
          return {
            value: state.toLowerCase(),
            display: state
          };
        });
      };
    }
  ]);

  app.controller("imageSubmitCtrl", [
    "$scope", "MediaResource", "Page", "PostResource", "$state", function($scope, MediaResource, Page, PostResource, $state) {
      $scope.page = Page;
      $scope.newPost = {
        title: "",
        media_attributes: [
          {
            format: "image"
          }
        ]
      };
      $scope.preview = {
        title: "",
        media: [{}]
      };
      $scope.$watch('newPost.media_attributes[0].link', function(newVal, oldVal) {
        if (newVal !== oldVal) {
          $scope.scraping = true;
          return MediaResource.resolve({
            link: newVal,
            format: $scope.newPost.media_attributes[0].format
          }).$promise.then(function(data) {
            return $scope.updatePreview(data);
          });
        }
      });
      $scope.$watch("newPost.title", function(newVal) {
        return $scope.preview.title = newVal;
      });
      $scope.submit = function() {
        $scope.newPost.community_id = $scope.page.community.id;
        return PostResource.save({
          post: $scope.newPost
        }).$promise.then(function(data) {
          return $state.transitionTo("home.community.comments", {
            id: data.slug,
            community: $scope.page.community
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

  app.controller("webpageSubmitCtrl", [
    "$scope", "MediaResource", "Page", "PostResource", "$state", function($scope, MediaResource, Page, PostResource, $state) {
      $scope.page = Page;
      $scope.newPost = {
        title: "",
        media_attributes: [
          {
            format: "webpage"
          }
        ]
      };
      $scope.preview = {
        title: "",
        media: [{}]
      };
      $scope.$watch('newPost.media_attributes[0].link', function(newVal, oldVal) {
        if (newVal !== oldVal) {
          $scope.scraping = true;
          return MediaResource.resolve({
            link: newVal,
            format: $scope.newPost.media_attributes[0].format
          }).$promise.then(function(data) {
            return $scope.updatePreview(data);
          });
        }
      });
      $scope.$watch("newPost.title", function(newVal) {
        return $scope.preview.title = newVal;
      });
      $scope.submit = function() {
        $scope.newPost.community_id = $scope.page.community.id;
        return PostResource.save({
          post: $scope.newPost
        }).$promise.then(function(data) {
          return $state.transitionTo("home.community.comments", {
            id: data.slug,
            community: $scope.page.community
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
          return $state.transitionTo("home.community.comments", {
            id: data.slug,
            community: $scope.page.community
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

  app.controller("videoSubmitCtrl", [
    "$scope", "MediaResource", "Page", "PostResource", "$state", function($scope, MediaResource, Page, PostResource, $state) {
      $scope.page = Page;
      $scope.newPost = {
        title: "",
        media_attributes: [
          {
            format: "video"
          }
        ]
      };
      $scope.preview = {
        title: "",
        media: [{}]
      };
      $scope.$watch('newPost.media_attributes[0].link', function(newVal, oldVal) {
        if (newVal !== oldVal) {
          $scope.scraping = true;
          return MediaResource.resolve({
            link: newVal,
            format: $scope.newPost.media_attributes[0].format
          }).$promise.then(function(data) {
            return $scope.updatePreview(data);
          });
        }
      });
      $scope.$watch("newPost.title", function(newVal) {
        return $scope.preview.title = newVal;
      });
      $scope.submit = function() {
        $scope.newPost.community_id = $scope.page.community.id;
        return PostResource.save({
          post: $scope.newPost
        }).$promise.then(function(data) {
          return $state.transitionTo("home.community.comments", {
            id: data.slug,
            community: $scope.page.community
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
