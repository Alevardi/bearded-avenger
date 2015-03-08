/*jslint node: true, indent: 2,nomen:true */
'use strict';
var __ = require('underscore')._;

module.exports = function (app) {

  app.factory('Points', points);

  points.$inject = ['$resource'];
  function points ( resource ) {
    var point = resource('v1/power-points/:id', {
      query: {
        method: 'GET',
        isArray: false
      }
    });

    return point;
  }
};
