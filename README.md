# Firefox App Validator: Icons

[![Build Status](https://secure.travis-ci.org/mozilla/node-firefox-app-validator-icons.png)](http://travis-ci.org/mozilla/node-firefox-app-validator-icons)

## Current image support

png, jpg/jpeg

## Usage

This is just to validate file-specific rules for the icons provided in a Firefox OS manifest.

    var icons = rquire('firefox-app-validator-icons');

    icons('/path/to/icon.png', function (results) {
      console.log(results);
    });

If there are any errors, you can access them in results.errors and warnings in results.warnings

## Tests

    # To run tests once
    npm test

    # To run tests continually on file change
    npm run-script testwatch

## License

Mozilla Public License Version 2.0
