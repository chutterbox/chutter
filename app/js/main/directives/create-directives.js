(function() {
  var app;

  app = angular.module("MainApp");

  app.directive('createCommunityNetwork', function() {
    return {
      restrict: "E",
      templateUrl: '../app/partials/main/create/network.html'
    };
  });

  app.directive('createCommunityDetails', function() {
    return {
      restrict: "E",
      templateUrl: '../app/partials/main/create/details.html'
    };
  });

  app.directive('createCommunityCustomize', function() {
    return {
      restrict: "E",
      templateUrl: '../app/partials/main/create/customize.html'
    };
  });

  app.directive('createCommunityReview', function() {
    return {
      restrict: "E",
      templateUrl: '../app/partials/main/create/review.html'
    };
  });

  app.directive('createCommunityRules', function() {
    return {
      restrict: "E",
      templateUrl: '../app/partials/main/create/rules.html'
    };
  });

}).call(this);
