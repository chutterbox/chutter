(function() {
  var app;

  app = angular.module("MainApp");

  app.directive('createCommunityNetwork', function() {
    return {
      restrict: "E",
      templateUrl: '../app/partials/main/create/network.html',
      controller: 'createCtrl'
    };
  });

  app.directive('createCommunityDetails', function() {
    return {
      restrict: "E",
      templateUrl: '../app/partials/main/create/details.html',
      controller: 'createCtrl'
    };
  });

  app.directive('createCommunityCustomize', function() {
    return {
      restrict: "E",
      templateUrl: '../app/partials/main/create/customize.html',
      controller: 'createCtrl'
    };
  });

  app.directive('createCommunityReview', function() {
    return {
      restrict: "E",
      templateUrl: '../app/partials/main/create/review.html',
      controller: 'createCtrl'
    };
  });

  app.directive('createCommunityRules', function() {
    return {
      restrict: "E",
      templateUrl: '../app/partials/main/create/rules.html',
      controller: 'createCtrl'
    };
  });

}).call(this);
