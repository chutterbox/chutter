(function() {
  'use strict';
  var app;

  app = angular.module("MeApp");

  app.config([
    '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
      var conversationCompose, conversationContent, conversations, dashboard, home, notifications, preferences, saved, stats, submissions, view_url;
      view_url = "../app/partials/me";
      home = {
        name: "home",
        abstract: true,
        templateUrl: view_url + "/layout.html",
        controller: "homeCtrl"
      };
      dashboard = {
        name: "home.dashboard",
        url: "/",
        templateUrl: view_url + "/dashboard.html",
        controller: "dashboardCtrl"
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
                  return ConversationResource.messages({
                    id: $stateParams.id
                  });
                }
              ]
            }
          }
        }
      };
      notifications = {
        name: "home.notifications",
        url: "/notifications",
        templateUrl: view_url + "/notifications/notifications.html",
        controller: "notificationsCtrl",
        resolve: {
          Notifications: [
            "UserResource", function(UserResource) {
              return UserResource.notifications();
            }
          ]
        }
      };
      saved = {
        name: "home.saved",
        url: "/saved",
        templateUrl: view_url + "/saved.html",
        controller: "savedCtrl"
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
            templateUrl: view_url + "/submissions.html",
            controller: "submissionsCtrl"
          }
        }
      };
      stats = {
        name: "home.stats",
        url: "/stats",
        templateUrl: view_url + "/stats.html",
        controller: "savedCtrl"
      };
      $stateProvider.state(home);
      $stateProvider.state(dashboard);
      $stateProvider.state(conversations);
      $stateProvider.state(conversationCompose);
      $stateProvider.state(conversationContent);
      $stateProvider.state(notifications);
      $stateProvider.state(saved);
      $stateProvider.state(preferences);
      $stateProvider.state(stats);
      return $stateProvider.state(submissions);
    }
  ]);

}).call(this);
