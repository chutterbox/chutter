(function() {
  'use strict';
  var app;

  app = angular.module('MainApp');

  app.filter("gtThreshold", function() {
    return function(input) {
      if (parseInt(input.toString().replace(/,/g, '')) > 10) {
        return input + " plays";
      }
    };
  });

  app.filter("tags", function() {
    return function(input) {
      return input.replace(/@(\S*)/g, '<a href=search?q=$1>@$1</a>');
    };
  });

  app.filter("oneAtATime", function() {
    return function(input, start) {
      start = +start;
      return input.slice(start, start + 1);
    };
  });

  app.filter("stripEmail", function() {
    return function(input) {
      var index;
      index = input.indexOf("@");
      return input.slice(0, index);
    };
  });

  app.filter("truncate", function() {
    return function(text, length, end) {
      if (isNaN(length)) {
        length = 10;
      }
      if (end === undefined) {
        end = "...";
      }
      if (text && (text.length <= length || text.length - end.length <= length)) {
        return text;
      } else {
        return String(text).substring(0, length - end.length) + end;
      }
    };
  });

  app.filter('nospace', function() {
    return function(value) {
      if (!value) {
        return '';
      } else {
        return value.replace(RegExp(' ', 'g'), '');
      }
    };
  });

}).call(this);
