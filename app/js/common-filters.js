(function() {
  var app;

  app = angular.module("Chutter");

  app.filter("postSearch", function() {
    return function(input, start) {
      return console.log(input, start);
    };
  });

  app.filter("tags", function() {
    return function(input) {
      return input.replace(/@(\S*)/g, '<a href=search?q=$1>@$1</a>');
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
