'use strict'
app = angular.module("MainApp")

app.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) ->
    view_url = "../app/partials/main"
    # redirects
    $urlRouterProvider.when('', '/')
    $urlRouterProvider.when('/u/:username', '/u/:username/overview')
    # $urlRouterProvider.otherwise('/')

    frontpage =
      name: "frontpage"
      abstract: true
      onEnter: ["Page", (Page) ->
        Page.selectedCommunityTab = 0
        Page.mainToolbar = "md-primary"
        Page.secondaryToolbar = "md-hue-2"
      ]
      views:
        "toolbar":
          templateUrl: "../app/partials/main/toolbar.html"
          controller: "toolbarCtrl"
        "": 
          templateUrl: "#{view_url}/posts.html"
        "right-rail": 
          template: "<all-sidebar></all-sidebar>"
      resolve: 
        Networks: ["NetworkResource", (NetworkResource) ->
          NetworkResource.query().$promise
        ]
        Communities: ["CommunityResource", (CommunityResource) ->
          CommunityResource.query().$promise
        ]


    frontpage_hot =
      name: "frontpage.hot"
      url: "/"
      views:
        "posts":
          controller: "postListCtrl as ctrl"
          templateUrl: "../app/partials/shared/postList.html"
          resolve:
            Posts: ["PostResource", (PostResource) ->
              PostResource.query({sort: "hot"}).$promise
            ] 

    frontpage_new = 
      name: "frontpage.new"
      url: "/new"
      views:
        "posts":
          controller: "postListCtrl as ctrl"
          templateUrl: "../app/partials/shared/postList.html"
          resolve:
            Posts: ["PostResource", (PostResource) ->
              PostResource.query({sort: "new"}).$promise
            ]

    frontpage_top = 
      name: "frontpage.top"
      url: "/top"
      views:
        "posts":
          controller: "postListCtrl as ctrl"
          templateUrl: "../app/partials/shared/postList.html"
          resolve:
            Posts: ["PostResource", (PostResource) ->
              PostResource.query({sort: "top"}).$promise
            ]

    frontpage_community =
      name: "frontpage.community"
      url: "/c/:community"
      onEnter: ["Page", "Communities", "$stateParams", (Page, Communities, $stateParams) ->
        Page.selectedCommunityTab = _.findIndex(Communities, {slug: $stateParams.community}) + 1
      ]
      abstract: true
      resolve:
        Community: ["CommunityResource", "$stateParams", (CommunityResource, $stateParams) ->
          CommunityResource.show({id: $stateParams.community}).$promise
        ]
      views:
        "@frontpage": 
          templateUrl: "#{view_url}/communityPosts.html"
        "right-rail@": 
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

    frontpage_community_hot = 
      name: "frontpage.community.hot"
      url: ""
      views:
        "posts@frontpage":
          controller: "postListCtrl as ctrl"
          templateUrl: "../app/partials/shared/postList.html"
          resolve:
            Posts: ["CommunityResource", "$stateParams", (CommunityResource, $stateParams) ->
              CommunityResource.posts({id: $stateParams.community, sort: "hot"}).$promise
            ]
    frontpage_community_new = 
      name: "frontpage.community.new"
      url: "/new"     
      views:
        "posts@frontpage":
          controller: "postListCtrl as ctrl"
          templateUrl: "../app/partials/shared/postList.html"
          resolve:
            Posts: ["CommunityResource", "$stateParams", (CommunityResource, $stateParams) ->
              CommunityResource.posts({id: $stateParams.community, sort: "new"}).$promise
            ]

    frontpage_community_top = 
      name: "frontpage.community.top"
      url: "/top"
      views:
        "posts@frontpage":
          controller: "postListCtrl as ctrl"
          templateUrl: "../app/partials/shared/postList.html"
          resolve:
            Posts: ["CommunityResource", "$stateParams", (CommunityResource, $stateParams) ->
              CommunityResource.posts({id: $stateParams.community, sort: "top"}).$promise
            ]
    
    
    network_frontpage =
      name: "network_frontpage"
      url: "/n/:network"
      abstract: true
      onEnter: ["Page", (Page) ->
        Page.selectedCommunityTab = 0
        Page.mainToolbar = "md-hue-2"
        Page.secondaryToolbar = "md-hue-3"
      ]
      views:
        "toolbar":
          templateUrl: "../app/partials/main/toolbar.html"
          controller: "networkToolbarCtrl"
        "": 
          templateUrl: "#{view_url}/posts.html"
        "right-rail": 
          template: "<network-sidebar></network-sidebar>"
      resolve:
        Networks: ["NetworkResource", (NetworkResource) ->
          NetworkResource.query().$promise
        ]
        Network: ["NetworkResource", "$stateParams", "$state", "$rootScope", "$auth", "Page", (NetworkResource, $stateParams, $state, $rootScope, $auth, Page) ->
          NetworkResource.show({id: $stateParams.network}).$promise
        ]
        Communities: ["NetworkResource", "$stateParams", (NetworkResource, $stateParams) ->
          NetworkResource.communities({id: $stateParams.network}).$promise
        ]
    network_frontpage_hot = 
      name: "network_frontpage.hot"
      url: ""
      views:
        "posts":
          controller: "postListCtrl as ctrl"
          templateUrl: "../app/partials/shared/postList.html"
          resolve:
            Posts: ["NetworkResource", "$stateParams", (NetworkResource, $stateParams) ->
              NetworkResource.posts({id: $stateParams.network, sort: "hot"}).$promise
            ]
    network_frontpage_new = 
      name: "network_frontpage.new"
      url: "/new"
      views:
        "posts":
          controller: "postListCtrl as ctrl"
          templateUrl: "../app/partials/shared/postList.html"
          resolve:
            Posts: ["NetworkResource", "$stateParams", (NetworkResource, $stateParams) ->
              NetworkResource.posts({id: $stateParams.network, sort: "new"}).$promise
            ]
    network_frontpage_top = 
      name: "network_frontpage.top"
      url: "/top"
      views:
        "posts":
          controller: "postListCtrl as ctrl"
          templateUrl: "../app/partials/shared/postList.html"
          resolve:
            Posts: ["NetworkResource", "$stateParams", (NetworkResource, $stateParams) ->
              NetworkResource.posts({id: $stateParams.network, sort: "top"}).$promise
            ]

    network_community =
      name: "network_frontpage.community"
      url: "/c/:community"
      onEnter: ["Page", "Communities", "$stateParams", (Page, Communities, $stateParams) ->
        Page.selectedCommunityTab = _.findIndex(Communities, {slug: $stateParams.community}) + 1
      ]
      abstract: true
      resolve:
        Community: ["CommunityResource", "$stateParams", (CommunityResource, $stateParams) ->
          CommunityResource.show({id: $stateParams.community}).$promise
        ]
      views:
        "@network_frontpage": 
          templateUrl: "#{view_url}/communityPosts.html"
        "right-rail@": 
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
    network_community_hot = 
      name: "network_frontpage.community.hot"
      url: ""
      views:
        "posts@network_frontpage":
          controller: "postListCtrl as ctrl"
          templateUrl: "../app/partials/shared/postList.html"
          resolve:
            Posts: ["CommunityResource", "$stateParams", (CommunityResource, $stateParams) ->
              CommunityResource.posts({id: $stateParams.community, sort: "hot"}).$promise
            ]
    network_community_new = 
      name: "network_frontpage.community.new"
      url: "/new"      
      views:
        "posts":
          controller: "postListCtrl"
          templateUrl: "../app/partials/shared/postList.html"
          resolve:
            Posts: ["CommunityResource", "$stateParams", (CommunityResource, $stateParams) ->
              CommunityResource.posts({id: $stateParams.community, sort: "new"}).$promise
            ]

    network_community_top = 
      name: "network_frontpage.community.top"
      url: "/top"
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
    
    frontpage_comments = 
      name: "frontpage.community.comments"
      url: "/:id"
      resolve: 
        Post: ["PostResource", "$stateParams", (PostResource, $stateParams) ->
          PostResource.get({id: $stateParams.id}).$promise
        ]
        Comments: ["PostResource", "$stateParams", (PostResource, $stateParams) ->
          PostResource.comments({id: $stateParams.id}).$promise
        ]
      views:
        "posts@frontpage": 
          templateUrl: "#{view_url}/comments.html"
          controller: "commentsPageCtrl as ctrl"
        "right-rail@": 
          template: "<comments-sidebar page='page'></comments-sidebar>"    

    network_comments = 
      name: "network_frontpage.community.comments"
      url: "/:id"
      resolve: 
        Post: ["PostResource", "$stateParams", (PostResource, $stateParams) ->
          PostResource.get({id: $stateParams.id}).$promise
        ]
        Comments: ["PostResource", "$stateParams", (PostResource, $stateParams) ->
          PostResource.comments({id: $stateParams.id}).$promise
        ]
      views:
        "posts@network_frontpage": 
          templateUrl: "#{view_url}/comments.html"
          controller: "commentsPageCtrl as ctrl"
        "right-rail@": 
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
        List: ['NetworkResource', (NetworkResource) ->
          NetworkResource.list()
        ]
      templateUrl: "#{view_url}/registration/interests.html"
      controller: "networkEditCtrl"
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

    $stateProvider.state(frontpage)
    $stateProvider.state(frontpage_hot)
    $stateProvider.state(frontpage_new)
    $stateProvider.state(frontpage_top)
    $stateProvider.state(frontpage_community)
    $stateProvider.state(frontpage_community_hot)
    $stateProvider.state(frontpage_community_new)
    $stateProvider.state(frontpage_community_top)
    $stateProvider.state(frontpage_comments)

    $stateProvider.state(network_frontpage)
    $stateProvider.state(network_frontpage_new)
    $stateProvider.state(network_frontpage_top)
    $stateProvider.state(network_frontpage_hot)
    # #communities from a network page's context
    $stateProvider.state(network_community)
    $stateProvider.state(network_community_hot)
    $stateProvider.state(network_community_new)
    $stateProvider.state(network_community_top)
    $stateProvider.state(network_comments)
    # #community from the front page
    # $stateProvider.state(submit)
    # $stateProvider.state(create)
    
    # $stateProvider.state(register)
    # $stateProvider.state(welcome)
    # $stateProvider.state(interests)
    


    # $stateProvider.state(user)
    # $stateProvider.state(user_overview)
    # $stateProvider.state(user_voted)


])
