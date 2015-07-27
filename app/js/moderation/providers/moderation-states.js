(function() {
  'use strict';
  var app;

  app = angular.module("ModerationApp");

  app.config([
    '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
      var community, communityDashboard, communityInbox, communityNotifications, dashboard, home, logs, policyGroups, settings, view_url;
      view_url = "/partials/moderation";
      home = {
        name: "home",
        abstract: true,
        templateUrl: view_url + "/layout.html",
        resolve: {
          Communities: [
            "UserResource", function(UserResource) {
              return UserResource.moderatedCommunities();
            }
          ]
        },
        controller: "homeCtrl"
      };
      dashboard = {
        name: "home.dashboard",
        url: "/",
        templateUrl: view_url + "/dashboard.html",
        controller: "dashboardCtrl"
      };
      community = {
        name: "home.community",
        url: "/community/:id",
        templateUrl: view_url + "/community/community.html"
      };
      communityDashboard = {
        name: "home.community.dashboard",
        url: "/dashboard",
        templateUrl: view_url + "/community/dashboard.html",
        controller: "communityDashboardCtrl"
      };
      communityInbox = {
        name: "home.community.inbox",
        url: "/inbox",
        templateUrl: view_url + "/community/inbox.html"
      };
      communityNotifications = {
        name: "home.community.notifications",
        url: "/notifications",
        templateUrl: view_url + "/community/notifications.html"
      };
      policyGroups = {
        name: "home.community.policyGroups",
        url: "/policy-groups",
        templateUrl: view_url + "/community/policy-groups.html"
      };
      settings = {
        name: "home.community.settings",
        url: "/settings",
        templateUrl: view_url + "/community/settings.html"
      };
      logs = {
        name: "home.community.logs",
        url: "/logs",
        templateUrl: view_url + "/community/logs.html"
      };
      $stateProvider.state(home);
      $stateProvider.state(dashboard);
      $stateProvider.state(community);
      $stateProvider.state(communityDashboard);
      $stateProvider.state(communityNotifications);
      $stateProvider.state(communityInbox);
      $stateProvider.state(policyGroups);
      $stateProvider.state(settings);
      return $stateProvider.state(logs);
    }
  ]);

}).call(this);
