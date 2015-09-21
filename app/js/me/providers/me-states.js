(function() {
  'use strict';
  var app;

  app = angular.module("MeApp");

  app.config([
    '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
      var commentNotifications, conversationCompose, conversationContent, conversations, home, notificationSubscriptions, postNotifications, preferences, saved_posts, saved_posts_all, saved_posts_filtered, stats, submissions, view_url;
      view_url = "../app/partials/me";
      home = {
        name: "home",
        abstract: true,
        templateUrl: view_url + "/index.html",
        controller: "homeCtrl",
        views: {
          "toolbar": {
            templateUrl: "../app/partials/me/toolbar.html",
            controller: "toolbarCtrl"
          }
        },
        onEnter: [
          "$auth", "$location", function($auth, $location) {
            return $auth.validateUser()["catch"](function() {
              return console.log("here");
            });
          }
        ]
      };
      notificationSubscriptions = {
        name: "home.notifications",
        url: "/",
        views: {
          "right-rail@": {
            templateUrl: view_url + "/notifications/notificationList.html",
            controller: "notificationListCtrl",
            resolve: {
              Subscriptions: [
                "UserResource", function(UserResource) {
                  return UserResource.notificationSubscriptions().$promise;
                }
              ]
            }
          }
        }
      };
      postNotifications = {
        name: "home.notifications.postNotifications",
        url: "/notifications/post/:id",
        views: {
          "@home": {
            templateUrl: view_url + "/notifications/postNotifications.html",
            controller: "notificationsCtrl",
            resolve: {
              Post: [
                "Page", "PostResource", "$stateParams", function(Page, PostResource, $stateParams) {
                  return PostResource.get({
                    id: $stateParams.id
                  }).$promise;
                }
              ],
              Notifications: [
                "Page", "PostResource", "$stateParams", function(Page, PostResource, $stateParams) {
                  return PostResource.notifications({
                    id: $stateParams.id
                  }).$promise;
                }
              ]
            }
          }
        }
      };
      commentNotifications = {
        name: "home.notifications.commentNotifications",
        url: "/notifications/comment/:id",
        views: {
          "@home": {
            templateUrl: view_url + "/notifications/commentNotifications.html",
            controller: "notificationsCtrl",
            resolve: {
              Notifications: [
                "Page", "CommentResource", "$stateParams", function(Page, CommentResource, $stateParams) {
                  return CommentResource.notifications({
                    id: $stateParams.id
                  }).$promise;
                }
              ]
            }
          }
        }
      };
      conversations = {
        name: "home.conversations",
        url: "/conversations",
        views: {
          "right-rail": {
            templateUrl: view_url + "/conversations/conversationList.html",
            controller: "conversationListCtrl",
            resolve: {
              Conversations: [
                "ConversationResource", function(ConversationResource) {
                  return ConversationResource.query();
                }
              ]
            }
          }
        }
      };
      conversationCompose = {
        name: "home.conversations.compose",
        url: "/compose",
        views: {
          "@home": {
            templateUrl: view_url + "/conversations/compose.html",
            controller: "conversationComposeCtrl"
          }
        }
      };
      conversationContent = {
        name: "home.conversations.conversation",
        url: "/:id",
        views: {
          "@home": {
            templateUrl: view_url + "/conversations/conversation.html",
            controller: "conversationContentCtrl",
            resolve: {
              Conversation: [
                "ConversationResource", "$stateParams", function(ConversationResource, $stateParams) {
                  return ConversationResource.get({
                    id: $stateParams.id
                  }).$promise;
                }
              ],
              Messages: [
                "ConversationResource", "$stateParams", function(ConversationResource, $stateParams) {
                  return ConversationResource.messages({
                    id: $stateParams.id
                  });
                }
              ]
            }
          }
        }
      };
      saved_posts = {
        name: "home.saved_posts",
        url: "/saved/posts/",
        templateUrl: view_url + "/saved.html"
      };
      saved_posts_filtered = {
        name: "home.saved_posts.filtered",
        url: ":format",
        views: {
          "posts": {
            controller: "savedCtrl",
            template: '<post ng-repeat="post in page.posts track by post.id" post="post" post-index="$index" layout="row" layout-sm="column" flex="flex" id="post-{{post.id}}" class="post"></post></md-content>',
            resolve: {
              Posts: [
                "PostResource", "$stateParams", function(PostResource, $stateParams) {
                  return PostResource.saved({
                    format: $stateParams.format
                  }).$promise;
                }
              ]
            }
          }
        }
      };
      saved_posts_all = {
        name: "home.saved_posts.all",
        url: "^/saved/posts",
        views: {
          "@home": {
            resolve: {
              Posts: [
                "PostResource", "$stateParams", function(PostResource, $stateParams) {
                  return PostResource.saved({
                    format: $stateParams.format
                  }).$promise;
                }
              ]
            },
            templateUrl: "../app/partials/shared/postList.html",
            controller: "postListCtrl as ctrl"
          }
        }
      };
      preferences = {
        name: "home.preferences",
        url: "/preferences",
        templateUrl: view_url + "/preferences.html",
        controller: "preferencesCtrl"
      };
      submissions = {
        name: "home.submissions",
        url: "/submissions",
        resolve: {
          Posts: [
            "UserResource", function(UserResource) {
              return UserResource.submissions().$promise;
            }
          ]
        },
        views: {
          "@home": {
            templateUrl: "../app/partials/shared/postList.html",
            controller: "postListCtrl as ctrl"
          }
        }
      };
      stats = {
        name: "home.stats",
        url: "/stats",
        templateUrl: view_url + "/stats.html",
        resolve: {
          Stats: [
            "UserResource", function(UserResource) {
              return UserResource.stats().$promise;
            }
          ]
        },
        controller: "statsCtrl"
      };
      $stateProvider.state(home);
      $stateProvider.state(notificationSubscriptions);
      $stateProvider.state(postNotifications);
      $stateProvider.state(commentNotifications);
      $stateProvider.state(conversations);
      $stateProvider.state(conversationCompose);
      $stateProvider.state(conversationContent);
      $stateProvider.state(saved_posts);
      $stateProvider.state(saved_posts_filtered);
      $stateProvider.state(saved_posts_all);
      $stateProvider.state(stats);
      return $stateProvider.state(submissions);
    }
  ]);

}).call(this);
