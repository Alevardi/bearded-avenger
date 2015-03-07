/*jslint node: true, indent: 2, nomen:true, stupid:true */
/*global window, document*/
'use strict';
var di = require('di'),
  angular = require('angular'),
  app,
  uiModules,
  injector;

require('angular-cookies');
require('angular-resource');
require('angular-route');
require('angular-css-injector');

app = angular.module('bearded-avenger', [
  'angular.css.injector',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngTouch'
]);

function routeConfig(routeProvider) {
  routeProvider
    .when('/403', {
      templateUrl: '/html/_views/403.html'
    })
    .when('/404', {
      templateUrl: '/html/_views/404.html'
    });

  routeProvider.otherwise({
    redirectTo : '/404'
  });
}

routeConfig.$inject = ['$routeProvider', 'cssInjectorProvider'];

app.config(routeConfig);

uiModules = {
  angular   : [ 'value', angular ],
  app       : [ 'value', app ],
  document  : [ 'value', document ],
  window    : [ 'value', window ]
};

uiModules.uiModules = [ 'value', uiModules ];

injector = new di.Injector([uiModules]);

/* modules browserify */
