/*jslint node: true, indent: 2,nomen:true */
'use strict';
var __ = require('underscore')._;

module.exports = function (app) {

  function auth(http, cookieStore) {
    var currentUser = cookieStore.get('user') || { username: '' };

    cookieStore.remove('user');

    function changeUser(user) {
      __.extend(currentUser, user);
    }

    return {
      login: function (user, success, error) {
        http.post('/login', user)
          .success(function (user) {
            if (user) {
              changeUser(user);

              success(user);
            } else {
              success(user);
            }
          })
          .error(error);
      },
      logout: function (success, error) {
        http.post('/logout')
          .success(function () {
            changeUser({
              username: '',
              permisos: {},
              super: 0
            });
            success();
          })
          .error(error);
      },
      isLoggedIn: function (user) {
        if (user === undefined) {
          user = currentUser;
        }
        return user.username !== '' && user.username !== undefined;
      },
      user: currentUser
    };
  }

  app.factory('Auth', auth);
  auth.$inject = ['$http', '$cookieStore'];
};
