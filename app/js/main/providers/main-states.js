(function() {
  'use strict';
  var app;

  app = angular.module("MainApp");

  app.config([
    '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
      var all, all_hot, all_new, all_top, comments, community, community_hot, community_new, community_top, create, home, network, network_hot, network_new, network_top, submit, view_url;
      view_url = "../app/partials/main";
      $urlRouterProvider.when('', '/');
      $urlRouterProvider.when('/u/:username', '/u/:username/overview');
      home = {
        name: "home",
        abstract: true,
        templateUrl: view_url + "/layout.html",
        controller: "pageCtrl",
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
        views: {
          "": {
            templateUrl: view_url + "/posts.html"
          },
          "right-rail": {
            template: "<all-sidebar page='page'></all-sidebar>"
          }
        },
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
        views: {
          "posts": {
            controller: "postsCtrl",
            templateUrl: "../app/partials/shared/postListItem.html",
            resolve: {
              Posts: [
                "PostResource", function(PostResource) {
                  return PostResource.query({
                    sort: "hot"
                  }).$promise;
                }
              ]
            }
          }
        }
      };
      all_new = {
        name: "home.all.new",
        url: "/new",
        views: {
          "posts": {
            controller: "postsCtrl",
            templateUrl: "../app/partials/shared/postListItem.html",
            resolve: {
              Posts: [
                "PostResource", function(PostResource) {
                  return PostResource.query({
                    sort: "new"
                  }).$promise;
                }
              ]
            }
          }
        }
      };
      all_top = {
        name: "home.all.top",
        url: "/top",
        views: {
          "posts": {
            controller: "postsCtrl",
            templateUrl: "../app/partials/shared/postListItem.html",
            resolve: {
              Posts: [
                "PostResource", function(PostResource) {
                  return PostResource.query({
                    sort: "top"
                  }).$promise;
                }
              ]
            }
          }
        }
      };
      network = {
        name: "home.network",
        url: "/n/:network",
        abstract: true,
        views: {
          "": {
            templateUrl: view_url + "/networkPosts.html"
          },
          "right-rail": {
            template: "<network-sidebar page='page'></network-sidebar>"
          }
        },
        resolve: {
          Network: [
            "NetworkResource", "$stateParams", "$state", "$rootScope", "$auth", function(NetworkResource, $stateParams, $state, $rootScope, $auth) {
              return NetworkResource.show({
                id: $stateParams.network
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
      network_hot = {
        name: "home.network.hot",
        url: "",
        views: {
          "posts": {
            controller: "postsCtrl",
            templateUrl: "../app/partials/shared/postListItem.html",
            resolve: {
              Posts: [
                "NetworkResource", "$stateParams", function(NetworkResource, $stateParams) {
                  return NetworkResource.posts({
                    id: $stateParams.network,
                    sort: "new"
                  }).$promise;
                }
              ]
            }
          }
        }
      };
      network_new = {
        name: "home.network.new",
        url: "/new",
        views: {
          "posts": {
            controller: "postsCtrl",
            templateUrl: "../app/partials/shared/postListItem.html",
            resolve: {
              Posts: [
                "NetworkResource", "$stateParams", function(NetworkResource, $stateParams) {
                  return NetworkResource.posts({
                    id: $stateParams.network,
                    sort: "new"
                  }).$promise;
                }
              ]
            }
          }
        }
      };
      network_top = {
        name: "home.network.top",
        url: "/top",
        views: {
          "posts": {
            controller: "postsCtrl",
            templateUrl: "../app/partials/shared/postListItem.html",
            resolve: {
              Posts: [
                "NetworkResource", "$stateParams", function(NetworkResource, $stateParams) {
                  return NetworkResource.posts({
                    id: $stateParams.network,
                    sort: "top"
                  }).$promise;
                }
              ]
            }
          }
        }
      };
      community = {
        name: "home.community",
        url: "/c/:community",
        views: {
          "": {
            templateUrl: view_url + "/communityPosts.html"
          },
          "right-rail": {
            template: "<community-sidebar page='page'></community-sidebar>"
          }
        },
        abstract: true,
        resolve: {
          Community: [
            "CommunityResource", "$stateParams", function(CommunityResource, $stateParams) {
              return CommunityResource.show({
                id: $stateParams.community
              });
            }
          ]
        },
        onEnter: [
          "Page", function(Page) {
            return Page.scope = "community";
          }
        ],
        controller: "communityCtrl"
      };
      community_hot = {
        name: "home.community.hot",
        url: "",
        views: {
          "posts": {
            controller: "postsCtrl",
            templateUrl: "../app/partials/shared/postListItem.html",
            resolve: {
              Posts: [
                "CommunityResource", "$stateParams", function(CommunityResource, $stateParams) {
                  return CommunityResource.posts({
                    id: $stateParams.community,
                    sort: "hot"
                  }).$promise;
                }
              ]
            }
          }
        }
      };
      community_new = {
        name: "home.community.new",
        url: "/new",
        views: {
          "posts": {
            controller: "postsCtrl",
            templateUrl: "../app/partials/shared/postListItem.html",
            resolve: {
              Posts: [
                "CommunityResource", "$stateParams", function(CommunityResource, $stateParams) {
                  return CommunityResource.posts({
                    id: $stateParams.community,
                    sort: "new"
                  }).$promise;
                }
              ]
            }
          }
        }
      };
      community_top = {
        name: "home.community.top",
        url: "/top",
        views: {
          "posts": {
            controller: "postsCtrl",
            templateUrl: "../app/partials/shared/postListItem.html",
            resolve: {
              Posts: [
                "CommunityResource", "$stateParams", function(CommunityResource, $stateParams) {
                  return CommunityResource.posts({
                    id: $stateParams.community,
                    sort: "top"
                  }).$promise;
                }
              ]
            }
          }
        }
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
          },
          "right-rail@home": {
            template: "<submission-sidebar page='page'></submission-sidebar>"
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
      $stateProvider.state(network_hot);
      $stateProvider.state(community);
      $stateProvider.state(community_hot);
      $stateProvider.state(community_top);
      $stateProvider.state(community_new);
      $stateProvider.state(submit);
      $stateProvider.state(create);
      return $stateProvider.state(comments);
    }
  ]);

}).call(this);
