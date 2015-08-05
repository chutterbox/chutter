(function() {
  'use strict';
  var ModPage, app;

  ModPage = (function() {
    function ModPage() {}

    ModPage.prototype.community = {
      permitted_formats_list: []
    };

    ModPage.prototype.network = {
      communities: []
    };

    ModPage.prototype.posts = [];

    return ModPage;

  })();

  app = angular.module("Chutter");

  app.factory("ModPage", [
    function() {
      return new ModPage;
    }
  ]);

}).call(this);
