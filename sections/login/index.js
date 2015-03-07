/*jslint node: true, indent: 2,nomen:true */
"use strict";

var Bacon    = require('baconjs').Bacon,
  apiUrl = require('../../config')().API,
  crypto   = require('crypto'),
  passport = require('passport'),
  rest     = require('restler');

module.exports = function (server) {
  server.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user) {
      if (err) { return next(err); }
      if (!user) {
        res.send({ access: false, message: 'Error'});
        res.end();
      } else {
        req.logIn(user, function (err) {
          if (err) { return next(err); }
          //req.session.cookie.maxAge = 1000 * 60 * 60 * 24;
          res.status(200).send({
            username: req.body.username,
            access: true
          });
        });
      }

    })(req, res, next);
  });

  server.post('/logout', function (req, res) {
    req.logout();
    res.status(200).end();
  });
};
