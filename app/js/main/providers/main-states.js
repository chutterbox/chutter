(function() {
  'use strict';
  var app;

  app = angular.module("MainApp");

  app.config([
    '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
      var create, frontpage, frontpage_comments, frontpage_community, frontpage_community_hot, frontpage_community_new, frontpage_community_top, frontpage_hot, frontpage_new, frontpage_top, interests, network_comments, network_community, network_community_hot, network_community_new, network_community_top, network_frontpage, network_frontpage_hot, network_frontpage_new, network_frontpage_top, register, submit, view_url, welcome;
      view_url = "../app/partials/main";
      $urlRouterProvider.when('', '/');
      $urlRouterProvider.when('/u/:username', '/u/:username/overview');
      $urlRouterProvider.otherwise('/');
      frontpage = {
        name: "frontpage",
        abstract: true,
        onEnter: [
          "Page", function(Page) {
            Page.selectedCommunityTab = 0;
            Page.mainToolbar = "md-primary";
            return Page.secondaryToolbar = "md-hue-2";
          }
        ],
        views: {
          "toolbar": {
            templateUrl: "../app/partials/main/toolbar.html",
            controller: "toolbarCtrl"
          },
          "": {
            templateUrl: view_url + "/posts.html"
          },
          "right-rail": {
            template: "<all-sidebar></all-sidebar>"
          }
        },
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
      frontpage_hot = {
        name: "frontpage.hot",
        url: "/",
        views: {
          "posts": {
            controller: "postListCtrl as ctrl",
            templateUrl: "../app/partials/shared/postList.html",
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
      frontpage_new = {
        name: "frontpage.new",
        url: "/new",
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
      frontpage_top = {
        name: "frontpage.top",
        url: "/top",
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
      frontpage_community = {
        name: "frontpage.community",
        url: "/c/:community",
        onEnter: [
          "Page", "Communities", "$stateParams", function(Page, Communities, $stateParams) {
            return Page.selectedCommunityTab = _.findIndex(Communities, {
              slug: $stateParams.community
            }) + 1;
          }
        ],
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
        views: {
          "@frontpage": {
            templateUrl: view_url + "/communityPosts.html"
          },
          "right-rail@": {
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
        }
      };
      frontpage_community_hot = {
        name: "frontpage.community.hot",
        url: "",
        views: {
          "posts@frontpage": {
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
      frontpage_community_new = {
        name: "frontpage.community.new",
        url: "/new",
        views: {
          "posts@frontpage": {
            controller: "postListCtrl as ctrl",
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
      frontpage_community_top = {
        name: "frontpage.community.top",
        url: "/top",
        views: {
          "posts@frontpage": {
            controller: "postListCtrl as ctrl",
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
      network_frontpage = {
        name: "network_frontpage",
        url: "/n/:network",
        abstract: true,
        onEnter: [
          "Page", function(Page) {
            Page.selectedCommunityTab = 0;
            Page.mainToolbar = "md-hue-2";
            return Page.secondaryToolbar = "md-hue-3";
          }
        ],
        views: {
          "toolbar": {
            templateUrl: "../app/partials/main/toolbar.html",
            controller: "networkToolbarCtrl"
          },
          "": {
            templateUrl: view_url + "/posts.html"
          },
          "right-rail": {
            template: "<network-sidebar></network-sidebar>"
          }
        },
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
      network_frontpage_hot = {
        name: "network_frontpage.hot",
        url: "",
        views: {
          "posts": {
            controller: "postListCtrl as ctrl",
            templateUrl: "../app/partials/shared/postList.html",
            resolve: {
              Posts: [
                "NetworkResource", "$stateParams", function(NetworkResource, $stateParams) {
                  return NetworkResource.posts({
                    id: $stateParams.network,
                    sort: "hot"
                  }).$promise;
                }
              ]
            }
          }
        }
      };
      network_frontpage_new = {
        name: "network_frontpage.new",
        url: "/new",
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
      network_frontpage_top = {
        name: "network_frontpage.top",
        url: "/top",
        views: {
          "posts": {
            controller: "postListCtrl as ctrl",
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
        name: "network_frontpage.community",
        url: "/c/:community",
        onEnter: [
          "Page", "Communities", "$stateParams", function(Page, Communities, $stateParams) {
            return Page.selectedCommunityTab = _.findIndex(Communities, {
              slug: $stateParams.community
            }) + 1;
          }
        ],
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
        views: {
          "@network_frontpage": {
            templateUrl: view_url + "/communityPosts.html"
          },
          "right-rail@": {
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
        }
      };
      network_community_hot = {
        name: "network_frontpage.community.hot",
        url: "",
        views: {
          "posts@network_frontpage": {
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
        name: "network_frontpage.community.new",
        url: "/new",
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
        name: "network_frontpage.community.top",
        url: "/top",
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
      frontpage_comments = {
        name: "frontpage.community.comments",
        url: "/:id",
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
          "posts@frontpage": {
            templateUrl: view_url + "/comments.html",
            controller: "commentsPageCtrl as ctrl"
          },
          "right-rail@": {
            template: "<comments-sidebar page='page'></comments-sidebar>"
          }
        }
      };
      network_comments = {
        name: "network_frontpage.community.comments",
        url: "/:id",
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
          "posts@network_frontpage": {
            templateUrl: view_url + "/comments.html",
            controller: "commentsPageCtrl as ctrl"
          },
          "right-rail@": {
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
      $stateProvider.state(frontpage);
      $stateProvider.state(frontpage_hot);
      $stateProvider.state(frontpage_new);
      $stateProvider.state(frontpage_top);
      $stateProvider.state(frontpage_community);
      $stateProvider.state(frontpage_community_hot);
      $stateProvider.state(frontpage_community_new);
      $stateProvider.state(frontpage_community_top);
      $stateProvider.state(frontpage_comments);
      $stateProvider.state(network_frontpage);
      $stateProvider.state(network_frontpage_new);
      $stateProvider.state(network_frontpage_top);
      $stateProvider.state(network_frontpage_hot);
      $stateProvider.state(network_community);
      $stateProvider.state(network_community_hot);
      $stateProvider.state(network_community_new);
      $stateProvider.state(network_community_top);
      return $stateProvider.state(network_comments);
    }
  ]);

}).call(this);
