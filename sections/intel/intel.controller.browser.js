/* jslint node: true */
/* global alert,FileReader,angular, window, L */
'use strict';
var __ = require('underscore')._;

module.exports = function (app) {
  function intel (scope, cssInjector) {
    cssInjector.add('/css/intel.css');
    scope.lol = 'lol';

  }

  app.controller( 'IntelController', intel );
  intel.$inject = [ '$scope', 'cssInjector'];
};
