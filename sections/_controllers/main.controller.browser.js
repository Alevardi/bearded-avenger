/*jslint node: true, indent: 2,nomen:true */
'use strict';

module.exports = function (app) {

  function mainController(scope, rootScope, location, cssInjector, Auth, Socket) {
    Socket.emit('yolo', {lol: 'asd'});

    scope.hideNavbar = false;
    scope.isLoggedIn = Auth.isLoggedIn();

    /*jslint unparam:true*/
    rootScope.$on('$routeChangeStart', function (event, next, current) {
      cssInjector.removeAll();

      scope.isLoggedIn = Auth.isLoggedIn();
      scope.fixedNavbar = next.$$route.originalPath !== '/';

      // No lo hago como una condicion por si en un futuro un arreglo de paths
      // va a omitir mostrar la navbar
      if (next.$$route.originalPath === '/login' || next.$$route.originalPath === '/registro') {
        scope.hideNavbar = true;
      } else {
        scope.hideNavbar = false;
      }
    });
    /*jslint unparam:true*/

    rootScope.$on('$routeChangeStart', function () {
      scope.user = Auth.user.username;
    });

    scope.logout = function () {
      Auth.logout(
        function () {
          location.path('/login');
        },
        function () {
          console.log('Error al hacer logout');
        }
      );
    };
  }

  mainController.$inject = ['$scope', '$rootScope', '$location', 'cssInjector', 'Auth', 'Socket'];
  app.controller('MainController', mainController);
};
