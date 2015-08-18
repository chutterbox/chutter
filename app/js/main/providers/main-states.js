(function() {
  'use strict';
  var app;

  app = angular.module("MainApp");

  app.config([
    '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
      var all, all_hot, all_new, all_top, comments, community, create, home, network, network_new, network_top, submit, view_url;
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
        abstract: true,
        templateUrl: view_url + "/posts.html",
        onEnter: [
          "Page", function(Page) {
            Page.scope = "all";
            Page.title = "All";
            return Page.url_prefix = "/";
          }
        ]
      };
      all_hot = {
        name: "home.all.hot",
        url: "/",
        resolve: {
          Posts: [
            "PostResource", "$stateParams", "$state", "$rootScope", "$auth", function(PostResource, $stateParams, $state, $rootScope, $auth) {
              return PostResource.query({
                sort: "hot"
              }).$promise;
            }
          ]
        }
      };
      all_new = {
        name: "home.all.new",
        url: "/new",
        resolve: {
          Posts: [
            "PostResource", "$stateParams", "$state", "$rootScope", "$auth", function(PostResource, $stateParams, $state, $rootScope, $auth) {
              return PostResource.query({
                sort: "new"
              }).$promise;
            }
          ]
        }
      };
      all_top = {
        name: "home.all.top",
        url: "/top",
        resolve: {
          Posts: [
            "PostResource", "$stateParams", "$state", "$rootScope", "$auth", function(PostResource, $stateParams, $state, $rootScope, $auth) {
              return PostResource.query({
                sort: "top"
              }).$promise;
            }
          ]
        }
      };
      network = {
        name: "home.network",
        templateUrl: view_url + "/posts.html",
        url: "/n/:network",
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
                id: $stateParams.network,
                sort: "hot"
              }).$promise;
            }
          ]
        },
        onEnter: [
          "Page", function(Page) {
            return Page.scope = "network";
          }
        ],
        controller: "networkCtrl"
      };
      network_new = {
        name: "home.network.new",
        url: "/new",
        resolve: {
          Posts: [
            "NetworkResource", "$stateParams", "$state", "$rootScope", "$auth", function(NetworkResource, $stateParams, $state, $rootScope, $auth) {
              return NetworkResource.posts({
                id: $stateParams.network,
                sort: "new"
              }).$promise;
            }
          ]
        }
      };
      network_top = {
        name: "home.network.top",
        url: "/top",
        resolve: {
          Posts: [
            "NetworkResource", "$stateParams", "$state", "$rootScope", "$auth", function(NetworkResource, $stateParams, $state, $rootScope, $auth) {
              return NetworkResource.posts({
                id: $stateParams.network,
                sort: "top"
              }).$promise;
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
              }).$promise;
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
      $stateProvider.state(all_hot);
      $stateProvider.state(all_new);
      $stateProvider.state(all_top);
      $stateProvider.state(network);
      $stateProvider.state(network_new);
      $stateProvider.state(network_top);
      $stateProvider.state(community);
      $stateProvider.state(submit);
      $stateProvider.state(create);
      return $stateProvider.state(comments);
    }
  ]);

}).call(this);
