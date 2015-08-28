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
        Networks: ["NetworkResource", "$stateParams", "$state", "$rootScope", "$auth", (NetworkResource, $stateParams, $state, $rootScope, $auth) ->
          NetworkResource.query().$promise
        ]


    all =
      name: "home.all"
      abstract: true
      templateUrl: "#{view_url}/posts.html"
      onEnter: ["Page", (Page) ->
        Page.scope = "all"
        Page.title = "All"
        Page.url_prefix = "/"
      ]
    all_hot =
      name: "home.all.hot"
      url: "/"
      views:
        "posts":
          controller: "postsCtrl"
          templateUrl: "../app/partials/shared/postListItem.html"
          resolve:
            Posts: ["PostResource", (PostResource) ->
              PostResource.query({sort: "hot"}).$promise
            ]

    all_new = 
      name: "home.all.new"
      url: "/new"
      views:
        "posts":
          controller: "postsCtrl"
          templateUrl: "../app/partials/shared/postListItem.html"
          resolve:
            Posts: ["PostResource", (PostResource) ->
              PostResource.query({sort: "new"}).$promise
            ]
    all_top = 
      name: "home.all.top"
      url: "/top"
      views:
        "posts":
          controller: "postsCtrl"
          templateUrl: "../app/partials/shared/postListItem.html"
          resolve:
            Posts: ["PostResource", (PostResource) ->
              PostResource.query({sort: "top"}).$promise
            ]


    network =
      name: "home.network"
      templateUrl: "#{view_url}/networkPosts.html"
      url: "/n/:network"
      abstract: true
      resolve:
        Network: ["NetworkResource", "$stateParams", "$state", "$rootScope", "$auth", (NetworkResource, $stateParams, $state, $rootScope, $auth) ->
          NetworkResource.show({id: $stateParams.network}).$promise
      ]
      onEnter: ["Page", (Page) ->
        Page.scope = "network"
      ]
      controller: "networkCtrl"
    
    network_hot = 
      name: "home.network.hot"
      url: ""
      views:
        "posts":
          controller: "postsCtrl"
          templateUrl: "../app/partials/shared/postListItem.html"
          resolve:
            Posts: ["NetworkResource", "$stateParams", (NetworkResource, $stateParams) ->
              NetworkResource.posts({id: $stateParams.network, sort: "new"}).$promise
            ]
    network_new = 
      name: "home.network.new"
      url: "/new"
      views:
        "posts":
          controller: "postsCtrl"
          templateUrl: "../app/partials/shared/postListItem.html"
          resolve:
            Posts: ["NetworkResource", "$stateParams", (NetworkResource, $stateParams) ->
              NetworkResource.posts({id: $stateParams.network, sort: "new"}).$promise
            ]

    network_top = 
      name: "home.network.top"
      url: "/top"
      views:
        "posts":
          controller: "postsCtrl"
          templateUrl: "../app/partials/shared/postListItem.html"
          resolve:
            Posts: ["NetworkResource", "$stateParams", (NetworkResource, $stateParams) ->
              NetworkResource.posts({id: $stateParams.network, sort: "top"}).$promise
            ]

    community =
      name: "home.community"
      templateUrl: "#{view_url}/communityPosts.html"
      url: "/c/:community"
      abstract: true
      resolve:
        Community: ["CommunityResource", "$stateParams", (CommunityResource, $stateParams) ->
          CommunityResource.show({id: $stateParams.community})
        ]
      onEnter: ["Page", (Page) ->
        Page.scope = "community"
      ]
      controller: "communityCtrl"
    
    community_hot = 
      name: "home.community.hot"
      url: ""
      views:
        "posts":
          controller: "postsCtrl"
          templateUrl: "../app/partials/shared/postListItem.html"
          resolve:
            Posts: ["CommunityResource", "$stateParams", (CommunityResource, $stateParams) ->
              CommunityResource.posts({id: $stateParams.community, sort: "hot"}).$promise
            ]
    community_new = 
      name: "home.community.new"
      url: "/new"
      views:
        "posts":
          controller: "postsCtrl"
          templateUrl: "../app/partials/shared/postListItem.html"
          resolve:
            Posts: ["CommunityResource", "$stateParams", (CommunityResource, $stateParams) ->
              CommunityResource.posts({id: $stateParams.community, sort: "new"}).$promise
            ]

    community_top = 
      name: "home.community.top"
      url: "/top"
      views:
        "posts":
          controller: "postsCtrl"
          templateUrl: "../app/partials/shared/postListItem.html"
          resolve:
            Posts: ["CommunityResource", "$stateParams", (CommunityResource, $stateParams) ->
              CommunityResource.posts({id: $stateParams.community, sort: "top"}).$promise
            ]



    submit =
      name: "home.community.submit"
      url: "/submit"
      onEnter: ["Page", (Page) ->
        Page.scope = "submit"
      ]
      views:
        "@home": 
          templateUrl: "#{view_url}/submit.html"
          controller: "submitCtrl"
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
          controller: "commentsCtrl"
    
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
    # $stateProvider.state(user)
    # $stateProvider.state(user_overview)
    # $stateProvider.state(user_voted)


])
