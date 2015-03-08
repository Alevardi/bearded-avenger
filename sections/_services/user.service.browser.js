/*jslint node: true, indent: 2,nomen:true */
'use strict';
var __ = require('underscore')._;

module.exports = function (app) {

  app.factory('Users', users);

  users.$inject = ['$resource'];
  function users ( resource ) {
    var user = resource('/v1/users/:username', { username: '@username' }, {
      query: {
        method: 'GET',
        isArray: false
      },
      friends: {
        method: 'GET',
        url: '/v1/users/:username/friends',
        isArray: true
      }
    });

    return user;
  }
};
