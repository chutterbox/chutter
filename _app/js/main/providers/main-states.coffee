'use strict'
app = angular.module("MainApp")

app.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) ->
    view_url = "../app/partials/main"
    # redirects
    $urlRouterProvider.when('', '/')
    $urlRouterProvider.when('/u/:username', '/u/:username/overview')
    # $urlRouterProvider.otherwise('/all')
    # application states
    home =
      name: "home"
      abstract: true
      templateUrl: "#{view_url}/layout.html"
      controller: "pageCtrl"
      resolve:
        Networks: ["NetworkResource", (NetworkResource) ->
          NetworkResource.query().$promise
        ]
        Communities: ["CommunityResource", (CommunityResource) ->
          CommunityResource.query().$promise
        ]

    # $scope.$on 'auth:login-success', ->
    #   $scope.networks = $auth.user.networks

    all =
      name: "home.all"
      abstract: true
      views:
        "": 
          templateUrl: "#{view_url}/posts.html"
        "right-rail": 
          template: "<all-sidebar page='page'></all-sidebar>"
      onEnter: ["Page", (Page) ->
        Page.scope = "all"
        Page.title = "All"
        Page.mainToolbar = ""
        Page.network = {}
        Page.secondaryToolbar = "md-hue-1"
      ]
    all_hot =
      name: "home.all.hot"
      url: "/"
      onEnter: ["Page", (Page) ->
        Page.paginator.reset("hot")
      ]
      resolve:
        Posts: ["PostResource", (PostResource) ->
          PostResource.query({sort: "hot"}).$promise
        ]
      views:
        "posts":
          controller: "postListCtrl as ctrl"
          templateUrl: "../app/partials/shared/postList.html"
  

    all_new = 
      name: "home.all.new"
      url: "/new"
      onEnter: ["Page", (Page) ->
        Page.paginator.reset("new")
      ]
      views:
        "posts":
          controller: "postListCtrl as ctrl"
          templateUrl: "../app/partials/shared/postList.html"
          resolve:
            Posts: ["PostResource", (PostResource) ->
              PostResource.query({sort: "new"}).$promise
            ]
    all_top = 
      name: "home.all.top"
      url: "/top"
      onEnter: ["Page", (Page) ->
        Page.paginator.reset("top")
      ]
      views:
        "posts":
          controller: "postListCtrl as ctrl"
          templateUrl: "../app/partials/shared/postList.html"
          resolve:
            Posts: ["PostResource", (PostResource) ->
              PostResource.query({sort: "top"}).$promise
            ]


    network =
      name: "home.network"
      url: "/n/:network"
      abstract: true
      onEnter: ["Page", (Page) ->
        Page.scope = "network"
        Page.scope = "network"
        Page.mainToolbar = "md-hue-1"
        Page.secondaryToolbar = "md-hue-2"
      ]
      views:
        "": 
          templateUrl: "#{view_url}/networkPosts.html"
        "right-rail": 
          template: "<network-sidebar page='page'></network-sidebar>"
      resolve:
        Network: ["NetworkResource", "$stateParams", "$state", "$rootScope", "$auth", (NetworkResource, $stateParams, $state, $rootScope, $auth) ->
          NetworkResource.show({id: $stateParams.network}).$promise
      ]
      controller: "networkCtrl"
    
    network_hot = 
      name: "home.network.hot"
      url: ""
      onEnter: ["Page", (Page) ->
        Page.paginator.reset("hot")
      ]
      views:
        "posts":
          controller: "postListCtrl as ctrl"
          templateUrl: "../app/partials/shared/postList.html"
          resolve:
            Posts: ["NetworkResource", "$stateParams", (NetworkResource, $stateParams) ->
              NetworkResource.posts({id: $stateParams.network, sort: "new"}).$promise
            ]
    network_new = 
      name: "home.network.new"
      url: "/new"
      onEnter: ["Page", (Page) ->
        Page.paginator.reset("new")
      ]
      views:
        "posts":
          controller: "postListCtrl"
          templateUrl: "../app/partials/shared/postList.html"
          resolve:
            Posts: ["NetworkResource", "$stateParams", (NetworkResource, $stateParams) ->
              NetworkResource.posts({id: $stateParams.network, sort: "new"}).$promise
            ]

    network_top = 
      name: "home.network.top"
      url: "/top"
      onEnter: ["Page", (Page) ->
        Page.paginator.reset("top")
      ]
      views:
        "posts":
          controller: "postListCtrl"
          templateUrl: "../app/partials/shared/postList.html"
          resolve:
            Posts: ["NetworkResource", "$stateParams", (NetworkResource, $stateParams) ->
              NetworkResource.posts({id: $stateParams.network, sort: "top"}).$promise
            ]

    community =
      name: "home.community"
      url: "/c/:community"
      resolve:
        Community: ["CommunityResource", "$stateParams", (CommunityResource, $stateParams) ->
          CommunityResource.show({id: $stateParams.community}).$promise
        ]
      onEnter: ["Page", (Page) ->
        Page.scope = "community"
        Page.mainToolbar = "md-hue-2"
        Page.secondaryToolbar = "md-hue-3"
      ]
      controller: "communityCtrl"
      views:
        "": 
          templateUrl: "#{view_url}/communityPosts.html"
        "right-rail": 
          templateUrl: "../app/partials/main/sidebar/community-sidebar.html"
          resolve:
            Moderators: ["CommunityResource", "$stateParams", (CommunityResource, $stateParams) -> 
              CommunityResource.moderators({id: $stateParams.community}).$promise
            ]
          controller: ["$scope", "Page", "Moderators", "CommunityResource", ($scope, Page, Moderators, CommunityResource) ->
            $scope.page = Page
            $scope.moderators = Moderators
            $scope.requestModerationPosition = () ->
              $scope.page.community.moderation_position_requested = true
              CommunityResource.requestModerationPosition({id: $scope.page.community.id})
              
          ]
      abstract: true

    community_hot = 
      name: "home.community.hot"
      url: ""
      onEnter: ["Page", (Page) ->
        Page.paginator.reset("hot")
      ]
      views:
        "posts":
          controller: "postListCtrl as ctrl"
          templateUrl: "../app/partials/shared/postList.html"
          resolve:
            Posts: ["CommunityResource", "$stateParams", (CommunityResource, $stateParams) ->
              CommunityResource.posts({id: $stateParams.community, sort: "hot"}).$promise
            ]
    community_new = 
      name: "home.community.new"
      url: "/new"
      onEnter: ["Page", (Page) ->
        Page.paginator.reset("new")
      ]      
      views:
        "posts":
          controller: "postListCtrl"
          templateUrl: "../app/partials/shared/postList.html"
          resolve:
            Posts: ["CommunityResource", "$stateParams", (CommunityResource, $stateParams) ->
              CommunityResource.posts({id: $stateParams.community, sort: "new"}).$promise
            ]

    community_top = 
      name: "home.community.top"
      url: "/top"
      onEnter: ["Page", (Page) ->
        Page.paginator.reset("top")
      ]
      views:
        "posts":
          controller: "postListCtrl"
          templateUrl: "../app/partials/shared/postList.html"
          resolve:
            Posts: ["CommunityResource", "$stateParams", (CommunityResource, $stateParams) ->
              CommunityResource.posts({id: $stateParams.community, sort: "top"}).$promise
            ]



    submit =
      name: "home.submit"
      url: "/submit"
      onEnter: ["Page", (Page) ->
        Page.scope = "submit"
        Page.mainToolbar = "md-hue-2"
        Page.secondaryToolbar = "md-hue-3"
      ]
      views:
        "@home": 
          templateUrl: "#{view_url}/submit.html"
          controller: "submitCtrl"
        "right-rail@home": 
          template: "<submission-sidebar page='page'></submission-sidebar>"

    create = 
      name: "create"
      url: "/create"
      templateUrl: "#{view_url}/create/layout.html"
      controller: "createCtrl"
      resolve:
        Networks: ["NetworkResource", "$stateParams", "$state", "$rootScope", "$auth", (NetworkResource, $stateParams, $state, $rootScope, $auth) ->
          NetworkResource.query()
        ]
    
    comments = 
      name: "home.community.comments"
      url: "/:id"
      onEnter: ["Page", (Page) ->
        Page.scope = "comments"
        Page.mainToolbar = "md-hue-2"
        Page.secondaryToolbar = "md-hue-3"
      ]
      resolve: 
        Post: ["PostResource", "$stateParams", (PostResource, $stateParams) ->
          PostResource.get({id: $stateParams.id}).$promise
        ]
        Comments: ["PostResource", "$stateParams", (PostResource, $stateParams) ->
          PostResource.comments({id: $stateParams.id}).$promise
        ]
      views:
        "@home": 
          templateUrl: "#{view_url}/comments.html"
          controller: "commentsPageCtrl as ctrl"
        "right-rail@home": 
          template: "<comments-sidebar page='page'></comments-sidebar>"
    register = 
      name: "register"
      url: "/register"
      templateUrl: "#{view_url}/registration/register.html"
    welcome = 
      name: "register.welcome"
      url: "/welcome"
      templateUrl: "#{view_url}/registration/welcome.html"
      controller: "welcomeCtrl"
    interests = 
      name: "register.interests"
      url: "/interests"
      onEnter: ["$auth", "$state", ($auth, $state) ->
        $auth.validateUser().catch () ->
          $state.transitionTo("register.welcome")
      ]
      resolve: 
        NetworkList: ['NetworkResource', (NetworkResource) ->
          NetworkResource.list()
        ]
      templateUrl: "#{view_url}/registration/interests.html"
      controller: "interestsCtrl"
    # user = 
    #   name: "user"
    #   url: "/u/"
    #   abstract: true
    #   templateUrl: "#{view_url}/user/layout.html"
    #   controller: "userCtrl"
    
    # user_overview = 
    #   name: "user.overview"
    #   url: "/:username"
    #   templateUrl: "#{view_url}/user/overview.html"
    #   controller: ["$scope", ($scope) ->
    #   ]

    # user_voted = 
    #   name: "user.voted"
    #   url: "/:voted"      
    #   templateUrl: "#{view_url}/user/voted.html"
    #   controller: ["$scope", ($scope) ->
    #   ] 

    $stateProvider.state(home)
    $stateProvider.state(all)
    $stateProvider.state(all_hot)
    $stateProvider.state(all_new)
    $stateProvider.state(all_top)
    $stateProvider.state(network)
    $stateProvider.state(network_new)
    $stateProvider.state(network_top)
    $stateProvider.state(network_hot)
    $stateProvider.state(community)
    $stateProvider.state(community_hot)
    $stateProvider.state(community_top)
    $stateProvider.state(community_new)
    $stateProvider.state(submit)
    $stateProvider.state(create)
    $stateProvider.state(comments)
    $stateProvider.state(register)
    $stateProvider.state(welcome)
    $stateProvider.state(interests)
    # $stateProvider.state(user)
    # $stateProvider.state(user_overview)
    # $stateProvider.state(user_voted)


])
