/* jslint node: true */
'use strict';
var apiUrl = 'http://188.166.7.238:8888/',
  Bacon = require('baconjs').Bacon,
  rest = require('restler');

module.exports = function (server) {
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
