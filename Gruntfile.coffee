module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')

    clean:
      files: ["tmp/"]

    html2js:
      options:
        singleModule: true
        htmlmin:
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true

      main:
        src: ['app/partials/main/*.html','app/partials/main/comments/*.html','app/partials/main/create/*.html','app/partials/main/menu/*.html','app/partials/main/submit/*.html'],
        dest: 'app/js/templates-main.js'
      moderation:
        src: ['app/partials/moderation/*.html', 'app/partials/moderation/community/*.html'],
        dest: 'app/js/templates-moderation.js'
      shared:
        src: ['app/partials/toasts/*.html', 'app/partials/shared/*.html'],
        dest: 'app/js/templates-shared.js'  
      me:
        src: ['app/partials/me/*.html', 'app/partials/me/conversations/*.html', 'app/partials/me/notifications/*.html'],
        dest: 'app/js/templates-me.js'
    uglify:
      my_target:
        options:
          sourceMap: true
          mangle: false
          compress: false
        files:
          'app/js/compiled/application.min.js':
            [
              'vendor/angular/angular.js',
              'vendor/angular-resource/angular-resource.js',
              'vendor/angular-poller/angular-poller.js',
              'vendor/ng-videosharing-embed/build/ng-videosharing-embed.min.js',
              'vendor/underscore/underscore.js',
              'vendor/jquery/dist/jquery.js',
              'vendor/angular-aria/angular-aria.js',
              'vendor/angular-animate/angular-animate.js',
              'vendor/angular-material/angular-material.js',
              'vendor/angular-cookie/angular-cookie.js',
              'vendor/angular-slugify/angular-slugify.js',
              'vendor/marked/lib/marked.js',
              'vendor/angular-marked/angular-marked.js',
              'vendor/ng-token-auth/dist/ng-token-auth.js',
              'vendor/ui-router/release/angular-ui-router.js',
              'vendor/ngInfiniteScroll/build/ng-infinite-scroll.js',
              'app/js/templates-shared.js',
              'app/js/chutter.js',
              'app/js/common-classes.js',
              'app/js/common-controllers.js',
              'app/js/common-directives.js',
              'app/js/common-services.js',

            ]
          'app/js/compiled/main.min.js': 
            [ 
              #to ensure the app is loaded first
              #main
              'app/js/templates-main.js',
              'app/js/main/main.js',
              'app/js/main/controllers/*.js',
              'app/js/main/directives/*.js',
              'app/js/main/providers/*.js',
              'app/js/main/services/*.js',

            ]
          'app/js/compiled/me.min.js': [
              #me
              'app/js/templates-me.js',
              'app/js/me/me.js',
              'app/js/me/controllers/*.js',
              'app/js/me/controllers/conversations/*.js',
              'app/js/me/controllers/notifications/*.js',
              'app/js/me/directives/*.js',
              'app/js/me/providers/*.js',
              'app/js/me/services/*.js',

            ]
          'app/js/compiled/moderation.min.js': [
              #moderation
              'vendor/Chart.js/Chart.js',
              'app/js/templates-moderation.js',
              'vendor/angular-chart.js/dist/angular-chart.js',
              'app/js/moderation/moderation.js',
              'app/js/moderation/controllers/*.js',
              'app/js/moderation/controllers/community/*.js',
              'app/js/moderation/directives/*.js',
              'app/js/moderation/providers/*.js',
              'app/js/moderation/services/*.js',

            ]
          'app/js/compiled/management.min.js': [
              #moderation
              'vendor/Chart.js/Chart.js',
              'vendor/angular-chart.js/dist/angular-chart.js',
              'app/js/management/management.js',
              'app/js/management/controllers/*.js',
              'app/js/management/controllers/community/*.js',
              'app/js/management/directives/*.js',
              'app/js/management/providers/*.js',
              'app/js/management/services/*.js'
            ]


    haml:
      app:
        files:

          #shared partials
          "app/partials/shared/reportSheet.html" : "_app/partials/shared/reportSheet.haml"
          "app/partials/shared/modSheet.html" : "_app/partials/shared/modSheet.haml"
          "app/partials/shared/postEmbed.html" : "_app/partials/shared/postEmbed.haml"
          "app/partials/shared/createCommunityRule.html" : "_app/partials/shared/createCommunityRule.haml"
          "app/partials/shared/post.html" : "_app/partials/shared/post.haml"

          #main application partials
          "app/partials/main/index.html" : "_app/partials/main/index.haml"
          "app/partials/main/reset.html" : "_app/partials/main/reset.haml"
          "app/partials/main/hype.html" : "_app/partials/main/hype.haml"
          "app/partials/main/layout.html" : "_app/partials/main/layout.haml"
          "app/partials/main/create/layout.html" : "_app/partials/main/create/layout.haml"
          "app/partials/main/menu/link.html" : "_app/partials/main/menu/link.haml"
          "app/partials/main/menu/toggle.html" : "_app/partials/main/menu/toggle.haml"
          "app/partials/main/authenticate.html" : "_app/partials/main/authenticate.haml"
          "app/partials/main/posts.html" : "_app/partials/main/posts.haml"
          "app/partials/main/communityPanel.html" : "_app/partials/main/communityPanel.haml"
          "app/partials/main/left_rail.html" : "_app/partials/main/left_rail.haml"
          "app/partials/main/submit.html" : "_app/partials/main/submit.haml"
          "app/partials/main/comments/comment.html" : "_app/partials/main/comments/comment.haml"
          "app/partials/main/comments/replyPanel.html" : "_app/partials/main/comments/replyPanel.haml"
          "app/partials/main/comments/commentEmbed.html" : "_app/partials/main/comments/commentEmbed.haml"
          "app/partials/main/comments.html" : "_app/partials/main/comments.haml"
          "app/partials/main/user.html" : "_app/partials/main/user.haml"
          "app/partials/main/networks.html" : "_app/partials/main/networks.haml"
          "app/partials/main/communityEdit.html" : "_app/partials/main/communityEdit.haml"
          "app/partials/main/networkEdit.html" : "_app/partials/main/networkEdit.haml"
          "app/partials/main/mediaPlayer.html" : "_app/partials/main/mediaPlayer.haml"
          "app/partials/main/submit/music.html" : "_app/partials/main/submit/music.haml"
          "app/partials/main/submit/video.html" : "_app/partials/main/submit/video.haml"
          "app/partials/main/submit/discussion.html" : "_app/partials/main/submit/discussion.haml"
          "app/partials/main/submit/image.html" : "_app/partials/main/submit/image.haml"
          "app/partials/main/submit/webpage.html" : "_app/partials/main/submit/webpage.haml"

          #me application partials
          "app/partials/me/index.html" : "_app/partials/me/index.haml"
          "app/partials/me/layout.html" : "_app/partials/me/layout.haml"
          "app/partials/me/dashboard.html" : "_app/partials/me/dashboard.haml"
          "app/partials/me/conversations/conversationList.html" : "_app/partials/me/conversations/conversationList.haml"
          "app/partials/me/conversations/conversation.html" : "_app/partials/me/conversations/conversation.haml"
          "app/partials/me/conversations/compose.html" : "_app/partials/me/conversations/compose.haml"
          "app/partials/me/notifications/notifications.html" : "_app/partials/me/notifications/notifications.haml"
          "app/partials/me/notifications/post.html" : "_app/partials/me/notifications/post.haml"
          "app/partials/me/notifications/comment.html" : "_app/partials/me/notifications/comment.haml"
          "app/partials/me/notifications/notification-view.html" : "_app/partials/me/notifications/notification-view.haml"
          "app/partials/me/stats.html" : "_app/partials/me/stats.haml"
          "app/partials/me/saved.html" : "_app/partials/me/saved.haml"
          "app/partials/me/preferences.html" : "_app/partials/me/preferences.haml"
          "app/partials/me/submissions.html" : "_app/partials/me/submissions.haml"
          
          #moderation partials
          "app/partials/moderation/index.html" : "_app/partials/moderation/index.haml"
          "app/partials/moderation/layout.html" : "_app/partials/moderation/layout.haml"
          "app/partials/moderation/dashboard.html" : "_app/partials/moderation/dashboard.haml"
          "app/partials/moderation/community/dashboard.html" : "_app/partials/moderation/community/dashboard.haml"
          "app/partials/moderation/community/community.html" : "_app/partials/moderation/community/community.haml"
          "app/partials/moderation/community/policy-groups.html" : "_app/partials/moderation/community/policy-groups.haml"
          "app/partials/moderation/community/queue.html" : "_app/partials/moderation/community/queue.haml"
          "app/partials/moderation/community/rules.html" : "_app/partials/moderation/community/rules.haml"
          "app/partials/moderation/community/modwatch.html" : "_app/partials/moderation/community/modwatch.haml"
          "app/partials/moderation/community/inbox.html" : "_app/partials/moderation/community/inbox.haml"
          "app/partials/moderation/community/settings.html" : "_app/partials/moderation/community/settings.haml"
          "app/partials/moderation/community/activity-log.html" : "_app/partials/moderation/community/activity-log.haml"
         
          #management partials
          "app/partials/management/index.html" : "_app/partials/management/index.haml"
          "app/partials/management/layout.html" : "_app/partials/management/layout.haml"
          "app/partials/management/dashboard.html" : "_app/partials/management/dashboard.haml"
          "app/partials/management/community/dashboard.html" : "_app/partials/management/community/dashboard.haml"
          #toast partials
          "app/partials/toasts/comment-toast.html" : "_app/partials/toasts/comment-toast.haml"
    
    concat: 
      dist:
        src: [
          'vendor/angular-material/angular-material.css',
          'app/css/chutter.css',
          'app/css/menu.css',
          'app/css/comments.css',
          'app/css/post.css',
          'app/css/mediaPlayer.css'
          'app/css/notifications.css'
        ],
        dest: 'app/css/compiled/application.css'
    cssmin: 
      target: 
        files: [
          expand: true,
          cwd: 'app/css/compiled',
          src: ['*.css', '!*.min.css'],
          dest: 'app/css/compiled',
          ext: '.min.css'
        ]
      
    

    sass:
      dist:
        files:
          'app/css/chutter.css' : '_app/css/chutter.sass'
          'app/css/main.css' : '_app/css/main.sass'
          'app/css/menu.css' : '_app/css/menu.sass'
          'app/css/me.css' : '_app/css/me.sass'
          'app/css/comments.css' : '_app/css/comments.sass'
          'app/css/post.css' : '_app/css/post.sass'
          'app/css/mediaPlayer.css' : '_app/css/mediaPlayer.sass'
          'app/css/notifications.css' : '_app/css/notifications.sass'
          'app/css/moderation.css' : '_app/css/moderation.sass'
          'app/css/management.css' : '_app/css/management.sass'

    coffee:
      scripts:
        files: [
          expand: true,
          cwd: './_app/js/',
          src: ['*.coffee'],
          dest: 'app/js',
          ext: '.js'
        ,
          expand: true,
          cwd: './_app/js/main/',
          src: ['*.coffee'],
          dest: 'app/js/main/',
          ext: '.js'
        , 
          expand: true,
          cwd: './_app/js/main/controllers/',
          src: ['*.coffee'],
          dest: 'app/js/main/controllers',
          ext: '.js'   
        ,
          expand: true,
          cwd: './_app/js/main/directives/',
          src: ['*.coffee'],
          dest: 'app/js/main/directives',
          ext: '.js'   
        , 
          expand: true,
          cwd: './_app/js/main/services/',
          src: ['*.coffee'],
          dest: 'app/js/main/services',
          ext: '.js' 
        ,
          expand: true,
          cwd: './_app/js/main/providers/',
          src: ['*.coffee'],
          dest: 'app/js/main/providers',
          ext: '.js'   
        , 
          expand: true,
          cwd: './_app/js/me/',
          src: ['*.coffee'],
          dest: 'app/js/me',
          ext: '.js'   
        ,  
          expand: true,
          cwd: './_app/js/me/controllers',
          src: ['*.coffee'],
          dest: 'app/js/me/controllers',
          ext: '.js'   
        , 
          expand: true,
          cwd: './_app/js/me/controllers/notifications',
          src: ['*.coffee'],
          dest: 'app/js/me/controllers/notifications',
          ext: '.js'   
        ,  
          expand: true,
          cwd: './_app/js/me/controllers/conversations',
          src: ['*.coffee'],
          dest: 'app/js/me/controllers/conversations',
          ext: '.js'   
        ,  
          expand: true,
          cwd: './_app/js/me/directives',
          src: ['*.coffee'],
          dest: 'app/js/me/directives',
          ext: '.js'   
        ,  
          expand: true,
          cwd: './_app/js/me/providers',
          src: ['*.coffee'],
          dest: 'app/js/me/providers',
          ext: '.js'   
        ,  
          expand: true,
          cwd: './_app/js/me/services',
          src: ['*.coffee'],
          dest: 'app/js/me/services',
          ext: '.js'   
        ,
          expand: true,
          cwd: './_app/js/moderation',
          src: ['*.coffee'],
          dest: 'app/js/moderation',
          ext: '.js'   
        ,   
          expand: true,
          cwd: './_app/js/moderation/controllers',
          src: ['*.coffee'],
          dest: 'app/js/moderation/controllers',
          ext: '.js'   
        , 
          expand: true,
          cwd: './_app/js/moderation/controllers/community',
          src: ['*.coffee'],
          dest: 'app/js/moderation/controllers/community',
          ext: '.js'   
        ,  
          expand: true,
          cwd: './_app/js/moderation/directives',
          src: ['*.coffee'],
          dest: 'app/js/moderation/directives',
          ext: '.js'   
        , 
          expand: true,
          cwd: './_app/js/moderation/providers',
          src: ['*.coffee'],
          dest: 'app/js/moderation/providers',
          ext: '.js'   
        ,  
          expand: true,
          cwd: './_app/js/management',
          src: ['*.coffee'],
          dest: 'app/js/management',
          ext: '.js'   
        ,   
          expand: true,
          cwd: './_app/js/management/controllers',
          src: ['*.coffee'],
          dest: 'app/js/management/controllers',
          ext: '.js'   
        , 
          expand: true,
          cwd: './_app/js/management/controllers/community',
          src: ['*.coffee'],
          dest: 'app/js/management/controllers/community',
          ext: '.js'   
        ,  
          expand: true,
          cwd: './_app/js/management/directives',
          src: ['*.coffee'],
          dest: 'app/js/management/directives',
          ext: '.js'   
        , 
          expand: true,
          cwd: './_app/js/management/providers',
          src: ['*.coffee'],
          dest: 'app/js/management/providers',
          ext: '.js'   
        ,  
          expand: true,
          cwd: '',
          src: ['chutter.coffee'],
          dest: '',
          ext: '.js'
        ]

    watch:
      js:
        files: ['_app/js/**', 'chutter.coffee']
        tasks: ['html2js', 'coffee', 'uglify']

      css:
        files: ['_app/css/*']
        tasks: ['sass', 'concat', 'cssmin']

      haml:
        files: ['_app/*', '_app/partials/**']
        tasks: ['haml']

      html2js:
        files: ['_app/*', '_app/partials/**']
        tasks: ['html2js', 'coffee', 'uglify']

  grunt.loadNpmTasks('grunt-haml')
  grunt.loadNpmTasks('grunt-contrib-cssmin')
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-coffee')
  grunt.loadNpmTasks('grunt-contrib-sass')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-html2js');

  grunt.registerTask "default", ["clean", "haml", "coffee", "sass", "uglify", "html2js", "concat", "cssmin"]

