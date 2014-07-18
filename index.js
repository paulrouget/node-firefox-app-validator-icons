'use strict';

var dimensions = require('image-size');

var errors = {};
var warnings = {};

var getDimensions = function (imageBuffer, next) {
  dimensions(imageBuffer, function (err, d) {
    if (err) {
      errors.InvalidIconDimensions = 'The dimensions could not be retrieved from ' +
        'this image'
      next();
      return;
    }

    if (d.width !== d.height) {
      errors.InvalidIconSize = 'The icon must be a square';
    }

    next();
  });
};

module.exports = function (imageBuffer, next) {
  getDimensions(imageBuffer, function () {
    next({
      errors: errors,
      warnings: warnings
    });
  });
};
