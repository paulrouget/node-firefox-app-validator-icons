process.env.NODE_ENV = 'test';

var should = require('should');

var iconSize = require('../index');

describe('iconSize', function () {
  it('should return with invalid dimensions from a nonexistent image path', function (done) {
    iconSize('test/icon-fake.png', {}, function (results) {
      results.errors.InvalidIconDimensions.should.equal('The dimensions could ' +
        'not be retrieved from this image');
      done();
    });
  });

  it('should return with invalid dimensions from a corrupted image', function (done) {
    iconSize('test/icon-corrupt.png', {}, function (results) {
      results.errors.InvalidIconDimensions.should.equal('The dimensions could ' +
        'not be retrieved from this image');
      done();
    });
  });

  it('should return with an invalid square icon', function (done) {
    iconSize('test/icon-rec.png', {}, function (results) {
      results.errors.InvalidIconSize.should.equal('The icon must be a square');
      done();
    });
  });

  it('should return with a file size that is over the limit', function (done) {
    iconSize('test/icon.png', { size: 1 }, function (results) {
      results.errors.IconSizeTooLarge.should.equal('Filesize is greater than 2MB');
      done();
    });
  });

  it('should return with a correct file size and a square icon', function (done) {
    iconSize('test/icon.png', {}, function (results) {
      results.errors.should.be.empty;
      done();
    });
  });
});
