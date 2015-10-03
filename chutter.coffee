# TODO: move to ENV variables
#if process.env.NODE_ENV is "production"
 # require "newrelic"
#  gaID = process.env.GOOGLE_ANALYTICS_PRODUCTION
#else
#  gaID = process.env.GOOGLE_ANALYTICS_STAGING


express = require("express")
cluster = require("cluster")
compress = require('compression')
favicon = require("serve-favicon")
chutter = express()
chutter.use(compress())

chutter.engine "html", require("ejs").renderFile
chutter.set "views", __dirname + "/app"
oneYear = 31557600000
chutter.use "/", express.static(__dirname + "/app", {maxAge: oneYear})
chutter.use "/vendor", express.static(__dirname + "/vendor", {maxAge: oneYear})

# angular is bad for SEO, we have it prerendered in another heroku repo
chutter.use(require('prerender-node').set('prerenderToken', 'tVzH3bYtDlOZkQuLaEHI').blacklisted('^/api/v1').set('protocol', 'https').set('afterRender', (req, pres) ->
  console.log "crawled"
))

request = require('request')
chutter.use '/api/v1', (req, res) -> 
  url = (process.env.API_HOST || 'http://10.0.1.3:3000') + "/api/v1#{req.url}"
  req.pipe(request(url)).pipe(res)

chutter.use(favicon(__dirname + '/favicon.ico'));

chutter.get "/moderation", (req, res) ->
  res.render "partials/moderation/index.html"

chutter.get "/moderation/*", (req, res) ->
  res.render "partials/moderation/index.html"

chutter.get "/management", (req, res) ->
  res.render "partials/management/index.html"

chutter.get "/management/*", (req, res) ->
  res.render "partials/management/index.html"

chutter.get "/me", (req, res) ->
  res.render "partials/me/index.html"

chutter.get "/me/*", (req, res) ->
  res.render "partials/me/index.html"
  
chutter.get "/*", (req, res) ->
  res.render "partials/main/index.html"

port = process.env.PORT or 5000

if cluster.isMaster
  # Fork workers.
  i = 0
  while i < 4
    cluster.fork()
    i++
else
  chutter.listen port, ->
  console.log "Listening on port" + port
