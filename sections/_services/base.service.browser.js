/*jslint node: true, indent: 2,nomen:true */
'use strict';
var __ = require('underscore')._;

module.exports = function (app) {

  app.factory('Bases', bases);

  bases.$inject = ['$resource'];
  function bases ( resource ) {
    var base = resource('v1/bases/availability', {
      query: {
        method: 'GET',
        isArray: false
      }
    });

    return base;
  }
};
