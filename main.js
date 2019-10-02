const Gun = require('gun');

var server = require('http').createServer().listen(8080);
var gun = Gun({web: server, axe:false, multicast:false});

console.log('server on port 8080');
