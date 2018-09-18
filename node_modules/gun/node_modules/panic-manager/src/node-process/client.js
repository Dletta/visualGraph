/* eslint-disable no-process-env*/
'use strict';

var panic = require('panic-client');
var url = process.argv[2];

panic.server(url);
