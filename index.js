'use strict';

var fs = require('fs');
var dimensions = require('image-size');

var MAX_IMAGE_SIZE = 2 * 1024 * 1024;

var finish = function (err, next) {
  next({
    errors: err.errors,
    warnings: err.warnings || {}
  });

  return;
};

var getIconSize = function (image, fileSize, next) {
  fs.stat(image, function (err, stat) {
    if (err) {
      finish({
        errors: {
          InvalidIconFileSize: 'Cannot retrieve icon filesize'
        }
      }, next);
      return;
    }

    if (stat.size > fileSize) {
      finish({
        errors: {
          IconSizeTooLarge: 'Filesize is greater than 2MB'
        }
      }, next);
      return;
    }

    finish({
      errors: {},
      warnings: {}
    }, next);
  });
};

var getSquareness = function (image, d, next) {
  if (d.width !== d.height) {
    finish({
      errors: {
        InvalidIconSize: 'The icon must be a square'
      }
    }, next);
    return;
  }

  next();
};

var getDimensions = function (image, next) {
  dimensions(image, function (err, d) {
    if (err || !d) {
      finish({
        errors: {
          InvalidIconDimensions: 'The dimensions could not be retrieved from ' +
            'this image'
        }
      }, next);
      return;
    }

    getSquareness(image, d, next);
  });
};

module.exports = function (image, options, next) {
  var fileSize = parseInt(options.size, 10) || MAX_IMAGE_SIZE;

  getDimensions(image, function (err) {
    if (err) {
      finish(err, next);
      return;
    }

    getIconSize(image, fileSize, next);
  });
};
