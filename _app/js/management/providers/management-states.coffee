'use strict'
app = angular.module("ManagementApp")

app.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) ->
    view_url = "/partials/management" 
    home =
      name: "home"
      abstract: true
      templateUrl: "#{view_url}/layout.html"
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

    communityDashboard =
      name: "home.community.dashboard"
      url: "/dashboard"
      templateUrl: "#{view_url}/community/dashboard.html"
      controller: "communityDashboardCtrl"

    communityDashboard =
      name: "home.community.dashboard"
      url: "/dashboard"
      templateUrl: "#{view_url}/community/dashboard.html"
      controller: "communityDashboardCtrl"
      
    #community specific dashboard
   
    $stateProvider.state(home)
    $stateProvider.state(dashboard)
    $stateProvider.state(community)
    $stateProvider.state(communityDashboard)
    # $stateProvider.state(conversationCompose)
    # $stateProvider.state(conversationContent)
    # $stateProvider.state(notifications)
    # $stateProvider.state(saved)
    # $stateProvider.state(preferences)
    # $stateProvider.state(stats)
    # $stateProvider.state(submissions)


])