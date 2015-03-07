/*jslint node: true, indent: 2,nomen:true */
'use strict';
module.exports = function (grunt) {
  var transformify, requires, addRequires;

  transformify = require('transformify');
  requires     = require('./sections/_default/browser-requires.js')();


  addRequires = transformify(function (x) {
    return x.replace('/* modules browserify */', requires);
  });

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jslint: {
      all: {
        src: ['package.json', 'config.json', 'bower.json', 'Gruntfile.js', 'index.js', 'sections/**/*.js', 'sections/**/*.json'],
        directives: {
          indent: 2,
          node: true,
          nomen: true,
          regexp: true
        }
      }
    },
    jasmine_node: {
      options: {
        extensions: 'js',
        specNameMatcher: 'spec'
      },
      all: ['tests/jasmine-node/']
    },
    browserify: {
      dist: {
        files: {
          'public/js/app.js': ['sections/_default/angular-app.js']
        },
        options: {
          transform: [addRequires, 'browserify-shim']
        }
      },
      dev: {
        files: {
          'public/js/app.min.js': ['sections/_default/angular-app.js']
        },
        options: {
          transform: [addRequires, 'browserify-shim'],
          browserifyOptions: {
            debug: true
          }
        }
      }
    },
    uglify: {
      target: {
        files: {
          'public/js/app.min.js': 'public/js/app.js'
        }
      },
      options: {
        mangle: false
      }
    },
    clean: ['public/js/app.js']
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-jslint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-jasmine-node');

  // Default task(s).
  grunt.registerTask('default', ['jslint', 'jasmine_node', 'browserify:dist', 'uglify', 'clean']);
  grunt.registerTask('dev', ['jslint', 'jasmine_node', 'browserify:dev']);
};
