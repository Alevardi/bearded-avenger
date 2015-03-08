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
  function intel (scope, cssInjector, users, Points, Bases) {
    cssInjector.add('/css/intel.css');
    var pointsGreen,
      pointsRed,
      heatGreen,
      heatRed,
      map = L.mapbox.map('map', 'chemonky.ld4l0ah8').setView([19.42419,-99.18], 14);
    Bases.query()
      .$promise
      .then(function(response) {
        var myIcon = L.icon({
          iconUrl: 'http://img2.wikia.nocookie.net/__cb20140413180434/creepypasta/es/images/5/5e/Estrella.png',
          iconSize: [25, 25],
          shadowSize: [68, 95],
          shadowAnchor: [22, 94]
        });
        console.log(response);
        R.compose(
          R.forEach(function (base) {
            L
              .marker(
                [base.coordinates.latitude, base.coordinates.longitude],
                {
                  icon: myIcon
                }
              )
              .addTo(map);
          }),
          R.filter(R.propEq('status', 'special'))
        )(response);
      });
    users.friends({ username: 'bob' })
      .$promise
      .then(function(response) {
        scope.users = response;
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

        heatGreen = L.heatLayer(pointsGreen,{ maxZoom: 10, radius: 10, gradient: {0.4: 'green', 0.65: 'green', 1: 'green'}}).addTo(map);
        heatRed = L.heatLayer(pointsRed,{ maxZoom: 10, radius: 8, gradient: {0.4: 'red', 0.65: 'red', 1: 'red'}}).addTo(map);
      });
  }

  app.controller( 'IntelController', intel );
  intel.$inject = [ '$scope', 'cssInjector', 'Users', 'Points', 'Bases'];
};
