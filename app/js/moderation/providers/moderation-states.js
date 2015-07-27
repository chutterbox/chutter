(function() {
  'use strict';
  var app;

  app = angular.module("ModerationApp");

  app.config([
    '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
      var activityLog, community, communityDashboard, communityInbox, communityMonitor, communityQueue, dashboard, home, moderators, policyGroups, rules, settings, view_url;
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
        templateUrl: view_url + "/community/community.html",
        controller: "communityCtrl"
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
      communityQueue = {
        name: "home.community.queue",
        url: "/queue",
        templateUrl: view_url + "/community/queue.html"
      };
      communityMonitor = {
        name: "home.community.monitor",
        url: "/monitor",
        templateUrl: view_url + "/community/monitor.html"
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
      rules = {
        name: "home.community.rules",
        url: "/rules",
        templateUrl: view_url + "/community/rules.html",
        controller: "rulesCtrl",
        resolve: {
          communityRules: [
            "CommunityResource", "$stateParams", function(CommunityResource, $stateParams) {
              return CommunityResource.rules({
                id: $stateParams.id
              }).$promise;
            }
          ]
        }
      };
      activityLog = {
        name: "home.community.activityLog",
        url: "/activity-log",
        templateUrl: view_url + "/community/activity-log.html",
        resolve: {
          activityLog: [
            "CommunityResource", "$stateParams", function(CommunityResource, $stateParams) {
              return CommunityResource.activityLog({
                id: $stateParams.id
              }).$promise;
            }
          ]
        },
        controller: [
          "$scope", "activityLog", function($scope, activityLog) {
            return $scope.activityLog = activityLog;
          }
        ]
      };
      moderators = {
        name: "home.community.moderators",
        url: "/moderators",
        templateUrl: view_url + "/community/moderators.html",
        resolve: {
          Moderators: [
            "CommunityResource", "$stateParams", function(CommunityResource, $stateParams) {
              return CommunityResource.moderators({
                id: $stateParams.id
              }).$promise;
            }
          ]
        },
        controller: [
          "$scope", "Moderators", function($scope, Moderators) {
            return $scope.moderators = Moderators;
          }
        ]
      };
      $stateProvider.state(home);
      $stateProvider.state(dashboard);
      $stateProvider.state(community);
      $stateProvider.state(communityDashboard);
      $stateProvider.state(communityQueue);
      $stateProvider.state(rules);
      $stateProvider.state(communityMonitor);
      $stateProvider.state(communityInbox);
      $stateProvider.state(policyGroups);
      $stateProvider.state(settings);
      $stateProvider.state(activityLog);
      return $stateProvider.state(moderators);
    }
  ]);

}).call(this);
