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
      controller: "navCtrl"
      resolve:
        Networks: ["NetworkResource", "$stateParams", "$state", "$rootScope", "$auth", (NetworkResource, $stateParams, $state, $rootScope, $auth) ->
          NetworkResource.query().$promise
        ]

    all =
      name: "home.all"
      url: "/"
      templateUrl: "#{view_url}/posts.html"
      controller: ["$scope", "Page", ($scope, Page) ->
        $scope.page = Page
      ]
      resolve:
        Posts: ["PostResource", "$stateParams", "$state", "$rootScope", "$auth", (PostResource, $stateParams, $state, $rootScope, $auth) ->
          PostResource.query({scope: "all"}).$promise
        ]
      onEnter: ["Page", (Page) ->
        Page.scope = "all"
        Page.title = "All"
      ]

    
    network =
      name: "home.network"
      url: "/n/:network"
      templateUrl: "#{view_url}/posts.html"
      onEnter: ["Page", (Page) ->
        Page.scope = "network"
        
      ]
      controller: "networkCtrl"
      resolve:
        Network: ["NetworkResource", "$stateParams", "$state", "$rootScope", "$auth", (NetworkResource, $stateParams, $state, $rootScope, $auth) ->
          NetworkResource.show({id: $stateParams.network})

        ]
        Posts: ["NetworkResource", "$stateParams", "$state", "$rootScope", "$auth", (NetworkResource, $stateParams, $state, $rootScope, $auth) ->
          NetworkResource.posts({id: $stateParams.network}).$promise
        ]


    community =
      name: "home.community"
      url: "/c/:community"
      onEnter: ["Page", (Page) ->
        Page.scope = "community"
      ]
      resolve:
        Community: ["CommunityResource", "$stateParams", (CommunityResource, $stateParams) ->
          CommunityResource.show({id: $stateParams.community}).$promise
        ]
        Posts: ["CommunityResource", "$stateParams", (CommunityResource, $stateParams) ->
          CommunityResource.posts({id: $stateParams.community}).$promise
        ]
      templateUrl: "#{view_url}/posts.html"
      controller: "communityCtrl"

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
    $stateProvider.state(network)
    $stateProvider.state(community)
    $stateProvider.state(submit)
    $stateProvider.state(create)
    $stateProvider.state(comments)
    # $stateProvider.state(user)
    # $stateProvider.state(user_overview)
    # $stateProvider.state(user_voted)


])
