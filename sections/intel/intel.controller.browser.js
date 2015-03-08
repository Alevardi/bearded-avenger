/* jslint node: true */
/* global alert,FileReader,angular, window, L */
'use strict';
var __ = require('underscore')._;

module.exports = function (app) {
  function intel (scope, cssInjector) {
    cssInjector.add('/css/intel.css');
    scope.lol = 'lol';
    var map = L.mapbox.map('map', 'chemonky.ld4l0ah8').setView([19.43293,-99.16848], 12),
      addressPoints = [
        [19.43293,-99.16848],
        [19.43159,-99.17151]
      ],
      heat = L.heatLayer(addressPoints,{radius: 100}).addTo(map);
  }

  app.controller( 'IntelController', intel );
  intel.$inject = [ '$scope', 'cssInjector'];
};
