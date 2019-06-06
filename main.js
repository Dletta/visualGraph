const Gun = require('gun');

var server = require('http').createServer().listen(8000);
var gun = Gun({web: server});

console.log('server on port 8000');
