var tls = require('tls');
var fs = require('fs');

var options = {
  key: fs.readFileSync('client-key.pem'),
  cert: fs.readFileSync('client-cert.pem'),

  ca: [ fs.readFileSync('server-cert.pem') ]
};

var cleartextStream = tls.connect(8000, options, function() {
  console.log('client connected',
              cleartextStream.authorized ? 'authorized' : 'unauthorized');
  process.stdin.pipe(cleartextStream);
  process.stdin.resume();
});
cleartextStream.setEncoding('utf8');
cleartextStream.on('data', function(data) {
  console.log(data);
});
cleartextStream.on('end', function() {
  server.close();
});