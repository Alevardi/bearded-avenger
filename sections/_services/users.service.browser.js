/*jslint node: true, indent: 2,nomen:true */
'use strict';

module.exports = function (app) {
  function users(resource) {
    var user = resource('/v1/users/:username', { username: '@username' }, {
      query: {
        method: 'GET',
        isArray: false
      },
      update: {
        method: 'PATCH'
      },
      checkPassword: {
        method: 'POST',
        url: '/v1/users/:username/password'
      }
    });

    return user;
  }

  app.factory('Users', users);
  users.$inject = ['$resource'];
};
