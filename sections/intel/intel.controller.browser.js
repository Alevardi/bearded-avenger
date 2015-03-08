/* jslint node: true */
/* global alert,FileReader,angular, window, L */
'use strict';
var R = require('ramda');

function filterTeam (team, points) {
  return R.filter(
    R.propEq('team', team),
    points
  );
}

module.exports = function (app) {
  function intel (scope, cssInjector, users, Points) {
    cssInjector.add('/css/intel.css');
    var pointsGreen,
      pointsRed,
      heatGreen,
      heatRed,
      map = L.mapbox.map('map', 'chemonky.ld4l0ah8').setView([19.42419,-99.18], 14);
    users.friends({ username: 'bob' })
      .$promise
      .then(function(response) {
        scope.users = response;
        console.log(scope.users);
      });
    Points.query()
      .$promise
      .then(function(points) {
        pointsGreen = filterTeam('green', points);
        pointsRed = filterTeam('red', points);
        pointsGreen = R.map( function (points) {
          return [points.coordinates.latitude,points.coordinates.longitude];
        }, pointsGreen);
        pointsRed = R.map( function (points) {
          return [points.coordinates.latitude,points.coordinates.longitude];
        }, pointsRed);

        heatGreen = L.heatLayer(pointsGreen,{ maxZoom: 12, radius: 14, gradient: {0.4: 'green', 0.65: 'green', 1: 'green'}}).addTo(map);
        heatRed = L.heatLayer(pointsRed,{ maxZoom: 13, radius: 12, gradient: {0.4: 'red', 0.65: 'red', 1: 'red'}}).addTo(map);

        console.log(pointsGreen);
        console.log(pointsRed);
      });
  }

  app.controller( 'IntelController', intel );
  intel.$inject = [ '$scope', 'cssInjector', 'Users', 'Points'];
};
