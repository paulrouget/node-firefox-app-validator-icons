process.env.NODE_ENV = 'test';

var should = require('should');
var iconSize = require('../index');

describe('iconSize', function () {
  it('should return with an invalid dimension from an invalid image buffer', function () {
    iconSize('', function (results) {
      results.errors.InvalidIconDimensions.should.equal('The dimensions could ' +
        'not be retrieved from this image');
    });
  });
});
