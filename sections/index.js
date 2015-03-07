/*jslint node: true, indent: 2,nomen:true,stupid:true */
'use strict';
var fs = require('fs'),
  apiUrl = require('../config')().API,
  Bacon = require('baconjs').Bacon,
  rest = require('restler');

module.exports = function (server, io) {
  // Invoke all the index.js files from the sections injecting the express app -> server
  fs.readdirSync(__dirname).forEach(function (file) {
    var fullpath    = __dirname + '/' + file,
      isDirectory = fs.lstatSync(fullpath).isDirectory(),
      invisible = (file.indexOf('_') === 0);

    if (isDirectory && !invisible && fs.existsSync(fullpath + '/index.js')) {
      require(fullpath + '/index.js')(server, io);
    }
  });

  // General API reponses to CRUD methods
  server.get('/v1/:schema', function (req, res) {
    var schema = req.params.schema,
      url = apiUrl.concat('v1/' + schema),
      bacon = (function () {
        var request = rest.get(url);
        return Bacon.fromEventTarget(request, 'complete');
      }());

    bacon.onValue(function (data) {
      res.json(data);
    });
  });

  server.get('/v1/:schema/:id', function (req, res) {
    var schema = req.params.schema,
      id = req.params.id,
      url = apiUrl.concat('v1/' + schema + '/' + id),
      bacon = (function () {
        var request = rest.get(url);
        return Bacon.fromEventTarget(request, 'complete');
      }());

    bacon.onValue(function (data) {
      res.json(data);
    });
  });

  server.patch('/v1/:schema/:id', function (req, res) {
    var schema = req.params.schema,
      id = req.params.id,
      url = apiUrl.concat('v1/' + schema + '/' + id),
      bacon = (function () {
        var request = rest.patch(url, { data: req.body });
        return Bacon.fromEventTarget(request, 'complete');
      }());

    bacon.onValue(function (data) {
      res.json(data);
    });
  });

  server.post('/v1/:schema', function (req, res) {
    var schema = req.params.schema,
      url = apiUrl.concat('v1/' + schema),
      bacon = (function () {
        var request = rest.post(url, { data: req.body });
        return Bacon.fromEventTarget(request, 'complete');
      }());

    bacon.onValue(function (data) {
      res.json(data);
    });
  });
};
