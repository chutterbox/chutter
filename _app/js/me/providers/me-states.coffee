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
    notificationSubscriptions =
      name: "home.notifications"
      url: "/notifications"
      views: 
        "right-rail": 
          templateUrl: "#{view_url}/notifications/notificationList.html"
          controller: "notificationListCtrl"
          resolve:
            Subscriptions: ["UserResource", (UserResource) ->
              UserResource.notificationSubscriptions().$promise
            ]

    postNotifications =
      name: "home.notifications.postNotifications"
      url: "/post/:id"
      views: 
        "@home":
          templateUrl: "#{view_url}/notifications/postNotifications.html"
          controller: "notificationsCtrl"
          resolve:
            Post: ["Page", "PostResource", "$stateParams", (Page, PostResource, $stateParams) ->
              PostResource.get({id: $stateParams.id}).$promise
            ] 
            Notifications: ["Page", "PostResource", "$stateParams", (Page, PostResource, $stateParams) ->
              PostResource.notifications({id: $stateParams.id}).$promise
            ]            

    commentNotifications =
      name: "home.notifications.commentNotifications"
      url: "/comment/:id"
      views: 
        "@home":
          templateUrl: "#{view_url}/notifications/notifications.html"
          controller: "notificationsCtrl"
          resolve:
            Notifications: ["Page", "CommentResource", "$stateParams", (Page, CommentResource, $stateParams) ->
              CommentResource.notifications({id: $stateParams.id}).$promise
            ]
    saved_posts =
      name: "home.saved_posts"
      url: "/saved/posts/"
      templateUrl: "#{view_url}/saved.html"
    


    saved_posts_filtered = 
      name: "home.saved_posts.filtered"
      url: ":format"
      views:
        "posts":
          controller: "savedCtrl"
          template: '<post ng-repeat="post in page.posts track by post.id" post="post" post-index="$index" layout="row" layout-sm="column" flex="flex" id="post-{{post.id}}" class="post"></post></md-content>'
          resolve:
            Posts: ["PostResource", "$stateParams", (PostResource, $stateParams) ->
              PostResource.saved({format: $stateParams.format}).$promise
            ]

    saved_posts_all = 
      name: "home.saved_posts.all"
      url: "^/saved/posts"
      views:
        "posts":
          controller: "savedCtrl"
          template: '<post ng-repeat="post in page.posts track by post.id" post="post" post-index="$index" layout="row" layout-sm="column" flex="flex" id="post-{{post.id}}" class="post"></post></md-content>'
          resolve:
            Posts: ["PostResource", "$stateParams", (PostResource, $stateParams) ->
              PostResource.saved({format: $stateParams.format}).$promise
            ]
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
    $stateProvider.state(notificationSubscriptions)
    $stateProvider.state(postNotifications)
    $stateProvider.state(commentNotifications)
    $stateProvider.state(saved_posts)
    $stateProvider.state(saved_posts_filtered)
    $stateProvider.state(saved_posts_all)
    $stateProvider.state(stats)
    $stateProvider.state(submissions)


])