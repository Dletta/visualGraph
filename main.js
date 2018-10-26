const Gun = require('gun');
require('gun/sea');

var server = require('http').createServer().listen(8000);
var gun = Gun({web: server});
