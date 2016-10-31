var request = require('request');
var unzip = require('unzip');

var extractStream = unzip.Extract({
  path: process.cwd()
});

request
  .get('https://www.browserstack.com/browserstack-local/BrowserStackLocal-darwin-x64.zip')
  .on('error', function(err) {
    console.log('An error occured aborting', err);
  })
  .on('close', function() {
    console.log('BrowserStackTunnel: download complete');
    console.log('BrowserStackTunnel: chmod 0755 binary');
    fs.chmod(self.path, '0755', callback);
  })
  .on('response', function(response) {
    console.log(response);
  });
