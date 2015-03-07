/*jslint node: true, indent: 2,nomen:true */
'use strict';

function routeConfig(routeProvider) {
  routeProvider.when('/login', {
    controller :  'LoginController',
    templateUrl : '/html/login/login.html'
  });
}

module.exports = function (app) {
  app.config(routeConfig);
};

routeConfig.$inject = ['$routeProvider'];
