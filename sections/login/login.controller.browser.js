/*jslint node: true, indent: 2,nomen:true */
'use strict';

module.exports = function (app) {
  function login(scope, location, Auth) {

    scope.errorInLogin = false;
    scope.loading = false;

    scope.login = function () {
      scope.errorInLogin = false;
      scope.loading = true;
      Auth.login(
        scope.user,
        function (user) {
          scope.loading = false;
          scope.errorInLogin = false;
          if (user.access) {
            location.path('/');
          } else {
            scope.usuario = {};
            scope.errorInLogin = true;
          }
        },
        function (err) {
          console.log(err);
        }
      );
    };
  }

  app.controller('LoginController', login);
  login.$inject = ['$scope', '$location', 'Auth'];
};
