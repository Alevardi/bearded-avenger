/* jslint node: true */
/* global alert,FileReader,angular, window, L */
'use strict';
var __ = require('underscore')._;

module.exports = function (app) {
  function intel (scope, cssInjector, users) {
    cssInjector.add('/css/intel.css');
    var map = L.mapbox.map('map', 'chemonky.ld4l0ah8').setView([19.43293,-99.16848], 12),
      addressPoints = [
        [19.43293,-99.16848],
        [19.43159,-99.17151]
      ],
      heat = L.heatLayer(addressPoints,{radius: 100}).addTo(map);
    users.query()
      .$promise
      .then(function(response) {
        scope.users = response.data;
        console.log(scope.users);
      });
  }

  app.controller( 'IntelController', intel );
  intel.$inject = [ '$scope', 'cssInjector', 'Users'];
};
