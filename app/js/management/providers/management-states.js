(function() {
  'use strict';
  var app;

  app = angular.module("ManagementApp");

  app.config([
    '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
      var community, communityDashboard, dashboard, home, view_url;
      view_url = "/partials/management";
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
      communityDashboard = {
        name: "home.community.dashboard",
        url: "/dashboard",
        templateUrl: view_url + "/community/dashboard.html",
        controller: "communityDashboardCtrl"
      };
      $stateProvider.state(home);
      $stateProvider.state(dashboard);
      $stateProvider.state(community);
      return $stateProvider.state(communityDashboard);
    }
  ]);

}).call(this);
