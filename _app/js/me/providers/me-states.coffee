'use strict'
app = angular.module("MeApp")

app.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) ->
    view_url = "../app/partials/me" 
    
    home =
      name: "home"
      abstract: true
      templateUrl: "#{view_url}/layout.html"
      controller: "homeCtrl"
    
    dashboard =
      name: "home.dashboard"
      url: "/"
      templateUrl: "#{view_url}/dashboard.html"
      controller: "dashboardCtrl"


    #conversations 
    conversations =
      name: "home.conversations"
      url: "/conversations"
      views: 
        "right-rail": 
          templateUrl: "#{view_url}/conversations/conversationList.html"
          controller: "conversationListCtrl"
          resolve:
            Conversations: ["ConversationResource", (ConversationResource) ->
              ConversationResource.query()
            ]

    #register this first so the path matches
    conversationCompose =
      name: "home.conversations.compose"
      url: "/compose"
      views:
        "@home":
          templateUrl: "#{view_url}/conversations/compose.html"
          controller: "conversationComposeCtrl"

    conversationContent =
      name: "home.conversations.conversation"
      url: "/:id"
      views: 
        "@home":
          templateUrl: "#{view_url}/conversations/conversation.html"
          controller: "conversationContentCtrl"
          resolve:
            Conversation: ["ConversationResource", "$stateParams", (ConversationResource, $stateParams) ->
              ConversationResource.messages({id: $stateParams.id})
            ]

    

    #post/comment replies 
    notifications =
      name: "home.notifications"
      url: "/notifications"
      views: 
        "right-rail": 
          templateUrl: "#{view_url}/notifications/notificationList.html"
          controller: "notificationListCtrl"
          resolve:
            Notifications: ["UserResource", (UserResource) ->
              UserResource.notificationSubscriptions()
            ]
    notification =
      name: "home.notifications.notification"
      url: "/:id"
      views: 
        "@home":
          templateUrl: "#{view_url}/notifications/notification.html"
          controller: "notifcationCtrl"
          resolve:
            Conversation: ["NotificationResource", "$stateParams", (NotificationResource, $stateParams) ->
              NotificationResource.notifications({id: $stateParams.id})
            ]

    saved =
      name: "home.saved"
      url: "/saved"
      templateUrl: "#{view_url}/saved.html"
      controller: "savedCtrl"  
    
    preferences =
      name: "home.preferences"
      url: "/preferences"
      templateUrl: "#{view_url}/preferences.html"
      controller: "preferencesCtrl"  
    
    submissions =
      name: "home.submissions"
      url: "/submissions"
      resolve: 
        Posts: ["UserResource", (UserResource) -> 
          UserResource.submissions().$promise
        ]
      views:
        "@home":
          templateUrl: "#{view_url}/submissions.html"
          controller: "submissionsCtrl" 

    
    stats =
      name: "home.stats"
      url: "/stats"
      templateUrl: "#{view_url}/stats.html"
      controller: "savedCtrl"      
    $stateProvider.state(home)
    $stateProvider.state(dashboard)
    $stateProvider.state(conversations)
    $stateProvider.state(conversationCompose)
    $stateProvider.state(conversationContent)
    $stateProvider.state(notifications)
    $stateProvider.state(saved)
    $stateProvider.state(preferences)
    $stateProvider.state(stats)
    $stateProvider.state(submissions)


])