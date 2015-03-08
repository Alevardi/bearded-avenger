/* jslint node: true */
'use strict';
var di = require('di');
var angular = require('angular');
require('angular-animate');
require('angular-aria');
require('angular-file-upload-shim');
require('angular-file-upload');
require('angular-material');
require('angular-resource');
require('angular-route');
require('angular-css-injector');

var app = angular.module('bearded-avenger', [
    'angularFileUpload',
    'angular.css.injector',
    'ngAnimate',
    'ngMaterial',
    'ngResource',
    'ngRoute',
  ]);

app.config( config );

config.$inject = ['$routeProvider', 'cssInjectorProvider'];
function config (routeProvider, cssInjectorProvider) {
  cssInjectorProvider.setSinglePageMode(true);
  routeProvider.otherwise( {
    redirectTo : '/'
  });
}

var uiModules = {
  angular   : [ 'value', angular ],
  app       : [ 'value', app ]
};

uiModules.uiModules = [ 'value', uiModules ];

var injector = new di.Injector([uiModules]);

/* modules browserify */
