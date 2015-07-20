(function() {
  module.exports = function(grunt) {
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      clean: {
        files: ["tmp/"]
      },
      uglify: {
        my_target: {
          files: {
            'app/js/application.min.js': ['app/js/app.js', 'app/js/services.js', 'app/js/controllers.js', 'app/js/filters.js']
          }
        }
      },
      haml: {
        app: {
          files: {
            "app/index.html": "_app/index.haml",
            "app/about.html": "_app/about.haml",
            "app/about_rail.html": "_app/about_rail.haml",
            "app/partials/signin.html": "_app/partials/signin.haml",
            "app/partials/signup.html": "_app/partials/signup.haml",
            "app/partials/submit.html": "_app/partials/submit.haml",
            "app/partials/etiquette.html": "_app/partials/etiquette.haml",
            "app/partials/howitworks.html": "_app/partials/howitworks.haml",
            "app/partials/unsupported.html": "_app/partials/unsupported.haml",
            "app/player.html": "_app/player.haml"
          }
        }
      },
      sass: {
        dist: {
          files: {
            'app/css/application.css': '_app/css/application.sass'
          }
        }
      },
      coffee: {
        scripts: {
          files: [
            {
              expand: true,
              cwd: './_app/js',
              src: ['*.coffee'],
              dest: 'app/js',
              ext: '.js'
            }, {
              expand: true,
              cwd: './_test/e2e',
              src: ['*.coffee'],
              dest: './test/e2e',
              ext: '.js'
            }, {
              expand: true,
              cwd: './_test/unit',
              src: ['*.coffee'],
              dest: './test/unit',
              ext: '.js'
            }, {
              expand: true,
              cwd: '',
              src: ['*.coffee'],
              dest: '',
              ext: '.js'
            }
          ]
        }
      },
      watch: {
        js: {
          files: ['_app/js/*', '_test/**/*'],
          tasks: ['coffee']
        },
        css: {
          files: ['_app/css/*'],
          tasks: ['sass']
        },
        haml: {
          files: ['_app/*'],
          tasks: ['haml']
        }
      }
    });
    grunt.loadTasks("tasks");
    grunt.loadNpmTasks('grunt-haml');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    return grunt.registerTask("default", ["clean", "haml", "coffee", "sass", "uglify"]);
  };

}).call(this);
