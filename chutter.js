(function() {
  var chutter, cluster, compress, express, favicon, i, oneYear, port, request;

  express = require("express");

  cluster = require("cluster");

  compress = require('compression');

  favicon = require("serve-favicon");

  chutter = express();

  chutter.use(compress());

  chutter.engine("html", require("ejs").renderFile);

  chutter.set("views", __dirname + "/app");

  oneYear = 31557600000;

  chutter.use("/", express["static"](__dirname + "/app", {
    maxAge: oneYear
  }));

  chutter.use("/vendor", express["static"](__dirname + "/vendor", {
    maxAge: oneYear
  }));

  chutter.use(require('prerender-node').set('prerenderServiceUrl', 'https://chutter-seo.herokuapp.com/').set('afterRender', function(req, pres) {
    return console.log("crawled");
  }));

  request = require('request');

  chutter.use('/api/v1', function(req, res) {
    var url;
    url = (process.env.API_HOST || 'http://10.0.1.3:3000') + ("/api/v1" + req.url);
    return req.pipe(request(url)).pipe(res);
  });

  chutter.use(favicon(__dirname + '/favicon.ico'));

  chutter.get("/moderation", function(req, res) {
    return res.render("partials/moderation/index.html");
  });

  chutter.get("/moderation/*", function(req, res) {
    return res.render("partials/moderation/index.html");
  });

  chutter.get("/management", function(req, res) {
    return res.render("partials/management/index.html");
  });

  chutter.get("/management/*", function(req, res) {
    return res.render("partials/management/index.html");
  });

  chutter.get("/me", function(req, res) {
    return res.render("partials/me/index.html");
  });

  chutter.get("/me/*", function(req, res) {
    return res.render("partials/me/index.html");
  });

  chutter.get("/*", function(req, res) {
    return res.render("partials/main/index.html");
  });

  port = process.env.PORT || 5000;

  if (cluster.isMaster) {
    i = 0;
    while (i < 4) {
      cluster.fork();
      i++;
    }
  } else {
    chutter.listen(port, function() {});
    console.log("Listening on port" + port);
  }

}).call(this);
