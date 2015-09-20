(function() {
  'use strict';
  var app;

  app = angular.module("MainApp");

  app.config([
    '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
      var all, all_hot, all_new, all_top, comments, community, community_hot, community_new, community_top, create, home, interests, network, network_all, network_all_hot, network_all_new, network_all_top, network_community, network_community_hot, network_community_new, network_community_top, register, submit, view_url, welcome;
      view_url = "../app/partials/main";
      $urlRouterProvider.when('', '/');
      $urlRouterProvider.when('/u/:username', '/u/:username/overview');
      $urlRouterProvider.otherwise('/');
      home = {
        name: "home",
        abstract: true,
        templateUrl: view_url + "/layout.html",
        controller: "pageCtrl",
        resolve: {
          Networks: [
            "NetworkResource", function(NetworkResource) {
              return NetworkResource.query().$promise;
            }
          ],
          Communities: [
            "CommunityResource", function(CommunityResource) {
              return CommunityResource.query().$promise;
            }
          ]
        }
      };
      all = {
        name: "home.all",
        abstract: true,
        data: {
          context: "all"
        },
        views: {
          "toolbar": {
            templateUrl: "../app/partials/shared/toolbar.html",
            controller: "toolbarCtrl"
          },
          "": {
            templateUrl: view_url + "/posts.html"
          },
          "right-rail": {
            template: "<all-sidebar></all-sidebar>"
          }
        }
      };
      all_hot = {
        name: "home.all.hot",
        url: "/",
        onEnter: [
          "Page", function(Page) {
            return Page.paginator.reset("hot");
          }
        ],
        resolve: {
          Posts: [
            "PostResource", function(PostResource) {
              return PostResource.query({
                sort: "hot"
              }).$promise;
            }
          ]
        },
        views: {
          "posts": {
            controller: "postListCtrl as ctrl",
            templateUrl: "../app/partials/shared/postList.html"
          }
        }
      };
      all_new = {
        name: "home.all.new",
        url: "/new",
        onEnter: [
          "Page", function(Page) {
            return Page.paginator.reset("new");
          }
        ],
        views: {
          "posts": {
            controller: "postListCtrl as ctrl",
            templateUrl: "../app/partials/shared/postList.html",
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
        onEnter: [
          "Page", function(Page) {
            return Page.paginator.reset("top");
          }
        ],
        views: {
          "posts": {
            controller: "postListCtrl as ctrl",
            templateUrl: "../app/partials/shared/postList.html",
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
      community = {
        name: "home.all.community",
        url: "/c/:community",
        data: {
          context: "all.community"
        },
        abstract: true,
        resolve: {
          Community: [
            "CommunityResource", "$stateParams", function(CommunityResource, $stateParams) {
              return CommunityResource.show({
                id: $stateParams.community
              }).$promise;
            }
          ]
        },
        onEnter: [
          "Page", function(Page) {
            Page.scope = "community";
            Page.mainToolbar = "";
            return Page.secondaryToolbar = "md-hue-1";
          }
        ],
        controller: "communityCtrl",
        views: {
          "@home": {
            templateUrl: view_url + "/communityPosts.html"
          },
          "right-rail@home": {
            templateUrl: "../app/partials/main/sidebar/community-sidebar.html",
            resolve: {
              Moderators: [
                "CommunityResource", "$stateParams", function(CommunityResource, $stateParams) {
                  return CommunityResource.moderators({
                    id: $stateParams.community
                  }).$promise;
                }
              ]
            },
            controller: [
              "$scope", "Page", "Moderators", "CommunityResource", function($scope, Page, Moderators, CommunityResource) {
                $scope.page = Page;
                $scope.moderators = Moderators;
                return $scope.requestModerationPosition = function() {
                  $scope.page.community.moderation_position_requested = true;
                  return CommunityResource.requestModerationPosition({
                    id: $scope.page.community.id
                  });
                };
              }
            ]
          }
        },
        abstract: true
      };
      community_hot = {
        name: "home.all.community.hot",
        url: "",
        onEnter: [
          "Page", function(Page) {
            return Page.paginator.reset("hot");
          }
        ],
        views: {
          "posts": {
            controller: "postListCtrl as ctrl",
            templateUrl: "../app/partials/shared/postList.html",
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
        name: "home.all.community.new",
        url: "/new",
        onEnter: [
          "Page", function(Page) {
            return Page.paginator.reset("new");
          }
        ],
        views: {
          "posts": {
            controller: "postListCtrl",
            templateUrl: "../app/partials/shared/postList.html",
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
        name: "home.all.community.top",
        url: "/top",
        onEnter: [
          "Page", function(Page) {
            return Page.paginator.reset("top");
          }
        ],
        views: {
          "posts": {
            controller: "postListCtrl",
            templateUrl: "../app/partials/shared/postList.html",
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
      network = {
        name: "network",
        url: "/n/:network",
        templateUrl: view_url + "/layout.html",
        controller: "pageCtrl",
        abstract: true,
        resolve: {
          Networks: [
            "NetworkResource", function(NetworkResource) {
              return NetworkResource.query().$promise;
            }
          ],
          Network: [
            "NetworkResource", "$stateParams", "$state", "$rootScope", "$auth", "Page", function(NetworkResource, $stateParams, $state, $rootScope, $auth, Page) {
              return NetworkResource.show({
                id: $stateParams.network
              }).$promise;
            }
          ],
          Communities: [
            "NetworkResource", "$stateParams", function(NetworkResource, $stateParams) {
              return NetworkResource.communities({
                id: $stateParams.network
              }).$promise;
            }
          ]
        }
      };
      network_all = {
        name: "network.all",
        abstract: true,
        views: {
          "": {
            templateUrl: view_url + "/networkPosts.html"
          },
          "right-rail": {
            template: "<network-sidebar page='page'></network-sidebar>"
          },
          "toolbar": {
            templateUrl: "../app/partials/shared/toolbar.html",
            controller: "networkToolbarCtrl"
          }
        }
      };
      network_all_hot = {
        name: "network.all.hot",
        url: "",
        onEnter: [
          "Page", function(Page) {
            return Page.paginator.reset("hot");
          }
        ],
        views: {
          "posts": {
            controller: "postListCtrl as ctrl",
            templateUrl: "../app/partials/shared/postList.html",
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
      network_all_new = {
        name: "network.all.new",
        url: "/new",
        onEnter: [
          "Page", function(Page) {
            return Page.paginator.reset("new");
          }
        ],
        views: {
          "posts": {
            controller: "postListCtrl",
            templateUrl: "../app/partials/shared/postList.html",
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
      network_all_top = {
        name: "network.all.top",
        url: "/top",
        onEnter: [
          "Page", function(Page) {
            return Page.paginator.reset("top");
          }
        ],
        views: {
          "posts": {
            controller: "postListCtrl",
            templateUrl: "../app/partials/shared/postList.html",
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
      network_community = {
        name: "network.all.community",
        url: "/c/:community",
        resolve: {
          Community: [
            "CommunityResource", "$stateParams", function(CommunityResource, $stateParams) {
              return CommunityResource.show({
                id: $stateParams.community
              }).$promise;
            }
          ]
        },
        controller: "communityCtrl",
        views: {
          "": {
            templateUrl: view_url + "/communityPosts.html"
          },
          "right-rail": {
            templateUrl: "../app/partials/main/sidebar/community-sidebar.html",
            resolve: {
              Moderators: [
                "CommunityResource", "$stateParams", function(CommunityResource, $stateParams) {
                  return CommunityResource.moderators({
                    id: $stateParams.community
                  }).$promise;
                }
              ]
            },
            controller: [
              "$scope", "Page", "Moderators", "CommunityResource", function($scope, Page, Moderators, CommunityResource) {
                $scope.page = Page;
                $scope.moderators = Moderators;
                return $scope.requestModerationPosition = function() {
                  $scope.page.community.moderation_position_requested = true;
                  return CommunityResource.requestModerationPosition({
                    id: $scope.page.community.id
                  });
                };
              }
            ]
          }
        },
        abstract: true
      };
      network_community_hot = {
        name: "network.all.community.hot",
        url: "",
        onEnter: [
          "Page", function(Page) {
            return Page.paginator.reset("hot");
          }
        ],
        views: {
          "posts": {
            controller: "postListCtrl as ctrl",
            templateUrl: "../app/partials/shared/postList.html",
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
      network_community_new = {
        name: "network.all.community.new",
        url: "/new",
        onEnter: [
          "Page", function(Page) {
            return Page.paginator.reset("new");
          }
        ],
        views: {
          "posts": {
            controller: "postListCtrl",
            templateUrl: "../app/partials/shared/postList.html",
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
      network_community_top = {
        name: "network.all.community.top",
        url: "/top",
        onEnter: [
          "Page", function(Page) {
            return Page.paginator.reset("top");
          }
        ],
        views: {
          "posts": {
            controller: "postListCtrl",
            templateUrl: "../app/partials/shared/postList.html",
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
        name: "home.submit",
        url: "/submit",
        onEnter: [
          "Page", function(Page) {
            Page.scope = "submit";
            Page.mainToolbar = "md-hue-2";
            return Page.secondaryToolbar = "md-hue-3";
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
        name: "home.all.community.comments",
        url: "/:id",
        onEnter: [
          "Page", function(Page) {
            Page.scope = "comments";
            Page.mainToolbar = "md-hue-2";
            return Page.secondaryToolbar = "md-hue-3";
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
            controller: "commentsPageCtrl as ctrl"
          },
          "right-rail@home": {
            template: "<comments-sidebar page='page'></comments-sidebar>"
          }
        }
      };
      register = {
        name: "register",
        url: "/register",
        templateUrl: view_url + "/registration/register.html"
      };
      welcome = {
        name: "register.welcome",
        url: "/welcome",
        templateUrl: view_url + "/registration/welcome.html",
        controller: "welcomeCtrl"
      };
      interests = {
        name: "register.interests",
        url: "/interests",
        onEnter: [
          "$auth", "$state", function($auth, $state) {
            return $auth.validateUser()["catch"](function() {
              return $state.transitionTo("register.welcome");
            });
          }
        ],
        resolve: {
          List: [
            'NetworkResource', function(NetworkResource) {
              return NetworkResource.list();
            }
          ]
        },
        templateUrl: view_url + "/registration/interests.html",
        controller: "networkEditCtrl"
      };
      $stateProvider.state(home);
      $stateProvider.state(all);
      $stateProvider.state(all_hot);
      $stateProvider.state(all_new);
      $stateProvider.state(all_top);
      $stateProvider.state(network);
      $stateProvider.state(network_all);
      $stateProvider.state(network_all_new);
      $stateProvider.state(network_all_top);
      $stateProvider.state(network_all_hot);
      $stateProvider.state(network_community);
      $stateProvider.state(network_community_hot);
      $stateProvider.state(network_community_top);
      $stateProvider.state(community);
      $stateProvider.state(community_hot);
      $stateProvider.state(community_top);
      $stateProvider.state(community_new);
      $stateProvider.state(submit);
      $stateProvider.state(create);
      $stateProvider.state(comments);
      $stateProvider.state(register);
      $stateProvider.state(welcome);
      return $stateProvider.state(interests);
    }
  ]);

}).call(this);
