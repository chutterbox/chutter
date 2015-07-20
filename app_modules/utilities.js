(function() {
  var getRandomInt;

  getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  exports.randomString = function(len) {
    var buf, charlen, chars, i;
    buf = [];
    chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    charlen = chars.length;
    i = 0;
    while (i < len) {
      buf.push(chars[getRandomInt(0, charlen - 1)]);
      ++i;
    }
    return buf.join("");
  };

}).call(this);
