var path = require('path'),
    unzip = require('unzip'),
    fs = require('fs'),
    request = require('request');

function ZipBinary(platform, arch, bin, ext) {
  'use strict';

  var self = this;
  self.bin = bin || path.resolve(path.join(__dirname, '..', 'bin', arch ? path.join(platform, arch) : platform));
  self.path = path.resolve(path.join(self.bin, 'BrowserStackLocal' + (ext ? '.' + ext : '')));
  self.command = self.path;
  self.args = [];

  self.update = function (callback) {
    var extractStream = unzip.Extract({
      path: self.bin
    });

    extractStream.on('close', function () {
      console.log('BrowserStackTunnel: download complete');
      console.log('BrowserStackTunnel: chmod 0755 binary');
      fs.chmod(self.path, '0755', callback);
    });

    request
      .get('https://www.browserstack.com/browserstack-local/BrowserStackLocal-' + platform + (arch ? '-' + arch : '') + '.zip')
      .on('error', function (err) {
        console.log('An error occured aborting', err);
        throw err;
      })
      .on('response', function (res) {
        console.log(res);
        if (res.statusCode !== 200) {
          throw new Error('Status not 200');
        }
        res.pipe(extractStream);
      });
  };
}

module.exports = ZipBinary;
