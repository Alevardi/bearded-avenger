/* jslint node: true */
/* global alert,FileReader,angular, window, L */
'use strict';
var __ = require('underscore')._;

module.exports = function (app) {
  function intel (scope, cssInjector) {
    cssInjector.add('/css/intel.css');
    scope.lol = 'lol';

    var map = L.mapbox.map('map', 'chemonky.ld4l0ah8'),
      heat = L.heatLayer([]);

      heat.addLatLng(L.latLng(19.4401127, -99.1630214), {radius: 12});
      heat.addLatLng(L.latLng(19.4801405, -99.163444), {radius: 12});
      heat.addTo(map);

  }

  app.controller( 'IntelController', intel );
  intel.$inject = [ '$scope', 'cssInjector'];
};
