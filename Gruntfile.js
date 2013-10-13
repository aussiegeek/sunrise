/* jshint strict:false, node:true */

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      }
    },
    bower: {
      install: {
        options: {
          targetDir: 'tmp/bower',
          layout: 'byType',
          install: true,
          verbose: false,
          cleanTargetDir: false,
          cleanBowerDir: false
        }
      }
    },
    useminPrepare: {
      html: 'app/index.html',
      options: {
        dest: 'public'
      }
    },
    usemin: {
      html: ['public/*.html'],
      options: {
        dirs: ['public']
      }
    },
    copy: {
      dist: {
        files: [{
            expand: true,
            cwd: 'app/',
            src: ['index.html'],
            dest: 'public/'
          }, {
            expand: true,
            cwd: 'app/javascripts/',
            src: ['**/*.js'],
            dest: 'build/javascripts/'
          }, {
            expand: true,
            cwd: 'bower_components/',
            src: ['**/*.js'],
            dest: 'build/bower_components/'
          }
        ]
      },
      dev: {
        files: [{
            expand: true,
            cwd: 'app/',
            src: ['index.html'],
            dest: 'public/'
          }, {
            expand: true,
            cwd: 'app/javascripts/',
            src: ['**/*.js'],
            dest: 'public/javascripts/'
          }, {
            expand: true,
            cwd: 'bower_components/',
            src: ['**/*.js'],
            dest: 'public/bower_components/'
          }
        ]
      }
    },
    clean: {
      dev: ['build', 'public'],
      dist: ['build', 'public']
    },
    sass: {
      dev: {
        options: {
          style: 'expanded',
          loadPath: 'bower_components/twitter-bootstrap-sass/vendor/assets/stylesheets'
        },
        files: {
          'public/stylesheets/application.css': 'app/stylesheets/application.scss'
        }
      },
      dist: {
        options: {
          loadPath: 'bower_components/twitter-bootstrap-sass/vendor/assets/stylesheets'
        },
        files: {
          'build/stylesheets/application.css': 'app/stylesheets/application.scss'
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      dev: {
        files: ['app/**/*'],
        tasks: ['dev']
      }
    },
    ngtemplates: {
      dev: {
        options: {
          base: 'app',
          module: 'sunrise'
        },
        src: 'app/templates/*.html',
        dest: 'public/javascripts/angular_templates.js'
      },
      dist: {
        options: {
          base: 'app',
          module: 'sunrise'
        },
        src: 'app/templates/*.html',
        dest: 'build/javascripts/angular_templates.js'
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'app/javascripts/**.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    }

  });

  grunt.registerTask('dev', [
      'dev:build',
      'watch:dev'
  ]);

  grunt.registerTask('dev:build', [
      'clean:dev',
      'copy:dev',
      'ngtemplates:dev',
      'sass:dev'
  ]);
  grunt.registerTask('dist:build', [
      'jshint',
      'clean:dist',
      'copy:dist',
      'ngtemplates:dist',
      'sass:dist',
      'useminPrepare',
      'usemin',
      'concat'
  ]);

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
};