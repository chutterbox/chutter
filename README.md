#Chutter

[![Join the chat at https://gitter.im/chutterbox/chutter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/chutterbox/chutter?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)


## What's chutter
Chutter is a new reddit competitor. Its focuses on the things that are broken with reddit, namely: 
* Content awareness / ease of sumbission - reddit/voat is pretty much optimized for funny cat pictures and text posts. The goal is to expand this to music, videos, and better webpage submissions
* Better moderation tooling, natively
* Notifications and transparency - If something is removed, someone is banned, etc... there should be an audit trail of this. 
* Much better categorization - Apparently on reddit and voat, there is no distinction categorically between fatpeoplehate and aww, separating these communities in to appropriate 'networks' empowers people to filter out content that *offends* them (sobs)



###Getting started

1. npm install
2. grunt watch for compilation / building
and auto compile
3. node chutter.js


###Developing

- The application that you want to modify lives in the _app directory. This is where all the haml, sass, and coffeescript lives. - There is very rarely a case where you'll want to actually touch the app folder, unless its for static image or something.
- If you need to add a new javascript file: create the coffeescript file, ensure the folder in which it's being placed is being watched and compiled properly in Gruntfile.coffee
- If you need to add a new sass file: create the sass file, watch the file for compilation in Gruntfile.coffee, link to it from the application via a stylesheet tag.
- If you need to add a new haml file: create haml file, watch for file in Gruntfile.coffee

###api

* right now the api endpoint is http://chutter-api.elasticbeanstalk.com/
* you can either sign up, or use a dummy account "user", pw: asdfghjkl; 
* there are also duplicate dummy accounts from 1-100: user#{n}, example user40

# angular-seed with HAML, CoffeeScript, SASS and Cucumber

This is an extension (largely modified) of
[pensive612's](https://github.com/pensive612/angular-seed) fantastic
angular-seed fork which adds grunt for preprocessing


