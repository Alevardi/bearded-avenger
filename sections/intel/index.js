/* jslint node: true */
'use strict';
var apiUrl = 'http://188.166.7.238:8888/',
  Bacon = require('baconjs').Bacon,
  rest = require('restler');

module.exports = function (server) {

  server.get('/v1/power-points', function (req, res) {
    var url = apiUrl.concat('v1/power-points/'),
    bacon = (function() {
      var request = rest.get(url);
      return Bacon.fromEventTarget(request, 'complete');
    }());

    bacon.onValue( function (data) {
      console.log(data);
      res.json(data.data);
    });
  });

  server.get('/v1/users/:user/friends', function (req, res) {
    var url = apiUrl.concat('v1/users/bob/friends'),
    bacon = (function() {
      var request = rest.get(url);
      return Bacon.fromEventTarget(request, 'complete');
    }());

    console.log(url);

    bacon.onValue( function (data) {
      console.log(data);
      res.json(data);
    });
  });

  server.get('/v1/users', function (req, res) {
    var url = apiUrl.concat('v1/users/'),
      bacon = (function() {
      var request = rest.get(url);
      return Bacon.fromEventTarget(request, 'complete');
    }());

    console.log(url);

    bacon.onValue( function (data) {
      console.log(data);
      res.json(data);
    });
  });

};
