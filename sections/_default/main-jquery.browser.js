/*jslint node: true, indent: 2, nomen:true, stupid:true */
'use strict';

var $ = require('jquery');

module.exports = function (document, window) {
  $(document).ready(function () {
    $(window).bind('scroll', function () {
      if ($(window).scrollTop() > 0) {
        $('#header').addClass('navbar-fixed-top');
      }
      /*
        else {
          $('#header').removeClass('navbar-fixed-top');
        }
      */
    });
  });
};
