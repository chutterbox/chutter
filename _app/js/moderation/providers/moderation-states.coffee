'use strict'
app = angular.module("ModerationApp")

app.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) ->
    view_url = "/partials/moderation" 
    home =
      name: "home"
      abstract: true
      templateUrl: "#{view_url}/layout.html"
      resolve:
        Communities: ["UserResource", (UserResource) ->
          UserResource.moderatedCommunities()
        ]
      controller: "homeCtrl"
    
    #aggregate dashboard
    dashboard =
      name: "home.dashboard"
      url: "/"
      templateUrl: "#{view_url}/dashboard.html"
      controller: "dashboardCtrl"
    
    community =
      name: "home.community"
      url: "/community/:id"
      templateUrl: "#{view_url}/community/community.html"
      abstract: true
      resolve:
        Community: ["CommunityResource", "$stateParams", (CommunityResource, $stateParams) -> 
          CommunityResource.show({id: $stateParams.id}).$promise
        ]      
      controller: ["$scope", "Page", ($scope, Page) -> 
        $scope.page = Page
      ]

    communityDashboard =
      name: "home.community.dashboard"
      url: "/dashboard"
      templateUrl: "#{view_url}/community/dashboard.html"
      controller: "communityDashboardCtrl"

    communityInbox =
      name: "home.community.inbox"
      url: "/inbox"
      templateUrl: "#{view_url}/community/inbox.html"
    
    communityQueue =
      name: "home.community.queue"
      url: "/queue"
      views: 
        "right-rail@home":
          templateUrl: "#{view_url}/community/queue/queueList.html"
          resolve:
            ReportedItems: ["CommunityResource", "$stateParams", (CommunityResource, $stateParams) ->
              CommunityResource.reportedItems({id: $stateParams.id})
            ]
          controller: "queueListCtrl"
    
    modwatch =
      name: "home.community.modwatch"
      url: "/modwatch"
      templateUrl: "#{view_url}/community/modwatch.html"
      resolve:
        Modwatch: ["CommunityResource", "$stateParams", (CommunityResource, $stateParams) -> 
          CommunityResource.modwatch({id: $stateParams.id}).$promise
        ]

    policyGroups =
      name: "home.community.policyGroups"
      url: "/policy-groups"
      templateUrl: "#{view_url}/community/policy-groups.html"
      resolve: 
        BanList: ["CommunityResource", "$stateParams", (CommunityResource, $stateParams) -> 
          CommunityResource.banList({id: $stateParams.id}).$promise
        ]

    settings =
      name: "home.community.settings"
      url: "/settings"
      templateUrl: "#{view_url}/community/settings.html"
      controller: "communitySettingsCtrl"
      
    rules =
      name: "home.community.rules"
      url: "/rules"
      templateUrl: "#{view_url}/community/rules.html"
      controller: "rulesCtrl"
      resolve: 
        communityRules: ["CommunityResource", "$stateParams", (CommunityResource, $stateParams) -> 
          CommunityResource.rules({id: $stateParams.id}).$promise
        ]
    activityLog =
      name: "home.community.activityLog"
      url: "/activity-log"
      templateUrl: "#{view_url}/community/activity-log.html"
      resolve:        
        activityLog: ["CommunityResource", "$stateParams", (CommunityResource, $stateParams) -> 
          CommunityResource.activityLog({id: $stateParams.id}).$promise
        ]
      controller: ["$scope", "activityLog", ($scope, activityLog) -> 
        $scope.activityLog = activityLog
      ]
    

    moderators =
      name: "home.community.moderators"
      url: "/moderators"
      views: 
        "right-rail@home":
          resolve:        
            Moderators: ["CommunityResource", "$stateParams", (CommunityResource, $stateParams) -> 
              CommunityResource.moderators({id: $stateParams.id}).$promise
            ]

          templateUrl: "#{view_url}/community/moderators/moderatorList.html"
          controller: "moderatorListCtrl"

    moderatorEdit =
      name: "home.community.moderators.edit"
      url: "/:user_id"
      views: 
        "@home.community":
          resolve:        
            Moderator: ["CommunityResource", "$stateParams", (CommunityResource, $stateParams) -> 
              CommunityResource.moderator({id: $stateParams.id, user_id: $stateParams.user_id}).$promise
            ]
          templateUrl: "#{view_url}/community/moderators/editModerator.html"
          controller: "editModeratorCtrl"
    
    moderationRequests =
      name: "home.community.moderationRequests"
      url: "/moderator_requests"
      views: 
        "right-rail@home":
          resolve:        
            ModerationRequests: ["CommunityResource", "$stateParams", (CommunityResource, $stateParams) -> 
              CommunityResource.moderationRequests({id: $stateParams.id}).$promise
            ]
          templateUrl: "#{view_url}/community/moderators/moderationRequestList.html"
          controller: "moderationRequestListCtrl"

    moderationRequestEdit =
      name: "home.community.moderationRequests.edit"
      url: "/:user_id"
      views: 
        "@home.community":
          resolve:        
            UserStats: ["UserResource", "$stateParams", (UserResource, $stateParams) -> 
              UserResource.stats({id: $stateParams.id}).$promise
            ]
          templateUrl: "#{view_url}/community/moderators/editModerationRequest.html"
          controller: "editModerationRequestCtrl"


    #community specific dashboard
   
    $stateProvider.state(home)
    $stateProvider.state(dashboard)
    $stateProvider.state(community)
    $stateProvider.state(communityDashboard)
    $stateProvider.state(communityQueue)
    $stateProvider.state(rules)
    $stateProvider.state(modwatch)
    $stateProvider.state(communityInbox)
    $stateProvider.state(policyGroups)
    $stateProvider.state(settings)
    $stateProvider.state(activityLog)
    $stateProvider.state(moderators)
    $stateProvider.state(moderatorEdit)
    $stateProvider.state(moderationRequests)
    $stateProvider.state(moderationRequestEdit)
    # $stateProvider.state(conversationCompose)
    # $stateProvider.state(conversationContent)
    # $stateProvider.state(notifications)
    # $stateProvider.state(saved)
    # $stateProvider.state(preferences)
    # $stateProvider.state(stats)
    # $stateProvider.state(submissions)


])