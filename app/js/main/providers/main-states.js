(function() {
  'use strict';
  var app;

  app = angular.module("MainApp");

  app.config([
    '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
      var all, comments, community, create, home, network, submit, view_url;
      view_url = "../app/partials/main";
      $urlRouterProvider.when('', '/');
      $urlRouterProvider.when('/u/:username', '/u/:username/overview');
      home = {
        name: "home",
        abstract: true,
        templateUrl: view_url + "/layout.html",
        controller: "navCtrl",
        resolve: {
          Networks: [
            "NetworkResource", "$stateParams", "$state", "$rootScope", "$auth", function(NetworkResource, $stateParams, $state, $rootScope, $auth) {
              return NetworkResource.query().$promise;
            }
          ]
        }
      };
      all = {
        name: "home.all",
        url: "/",
        templateUrl: view_url + "/posts.html",
        controller: [
          "$scope", "Page", function($scope, Page) {
            return $scope.page = Page;
          }
        ],
        resolve: {
          Posts: [
            "PostResource", "$stateParams", "$state", "$rootScope", "$auth", function(PostResource, $stateParams, $state, $rootScope, $auth) {
              return PostResource.query({
                scope: "all"
              });
            }
          ]
        },
        onEnter: [
          "Page", function(Page) {
            Page.scope = "all";
            return Page.title = "All";
          }
        ]
      };
      network = {
        name: "home.network",
        url: "/n/:network",
        templateUrl: view_url + "/posts.html",
        onEnter: [
          "Page", function(Page) {
            return Page.scope = "network";
          }
        ],
        controller: "networkCtrl",
        resolve: {
          Network: [
            "NetworkResource", "$stateParams", "$state", "$rootScope", "$auth", function(NetworkResource, $stateParams, $state, $rootScope, $auth) {
              return NetworkResource.show({
                id: $stateParams.network
              });
            }
          ],
          Posts: [
            "NetworkResource", "$stateParams", "$state", "$rootScope", "$auth", function(NetworkResource, $stateParams, $state, $rootScope, $auth) {
              return NetworkResource.posts({
                id: $stateParams.network
              });
            }
          ]
        }
      };
      community = {
        name: "home.community",
        url: "/c/:community",
        onEnter: [
          "Page", function(Page) {
            return Page.scope = "community";
          }
        ],
        resolve: {
          Community: [
            "CommunityResource", "$stateParams", function(CommunityResource, $stateParams) {
              return CommunityResource.show({
                id: $stateParams.community
              }).$promise;
            }
          ],
          Posts: [
            "CommunityResource", "$stateParams", function(CommunityResource, $stateParams) {
              return CommunityResource.posts({
                id: $stateParams.community
              }).$promise;
            }
          ]
        },
        templateUrl: view_url + "/posts.html",
        controller: "communityCtrl"
      };
      submit = {
        name: "home.community.submit",
        url: "/submit",
        onEnter: [
          "Page", function(Page) {
            return Page.scope = "submit";
          }
        ],
        views: {
          "@home": {
            templateUrl: view_url + "/submit.html",
            controller: "submitCtrl"
          }
        }
      };
      create = {
        name: "create",
        url: "/create",
        templateUrl: view_url + "/create/layout.html",
        controller: "createCtrl",
        resolve: {
          Networks: [
            "NetworkResource", "$stateParams", "$state", "$rootScope", "$auth", function(NetworkResource, $stateParams, $state, $rootScope, $auth) {
              return NetworkResource.query();
            }
          ]
        }
      };
      comments = {
        name: "home.community.comments",
        url: "/:id",
        onEnter: [
          "Page", function(Page) {
            return Page.scope = "comments";
          }
        ],
        resolve: {
          Post: [
            "PostResource", "$stateParams", function(PostResource, $stateParams) {
              return PostResource.get({
                id: $stateParams.id
              }).$promise;
            }
          ],
          Comments: [
            "PostResource", "$stateParams", function(PostResource, $stateParams) {
              return PostResource.comments({
                id: $stateParams.id
              });
            }
          ]
        },
        views: {
          "@home": {
            templateUrl: view_url + "/comments.html",
            controller: "commentsCtrl"
          }
        }
      };
      $stateProvider.state(home);
      $stateProvider.state(all);
      $stateProvider.state(network);
      $stateProvider.state(community);
      $stateProvider.state(submit);
      $stateProvider.state(create);
      return $stateProvider.state(comments);
    }
  ]);

}).call(this);
