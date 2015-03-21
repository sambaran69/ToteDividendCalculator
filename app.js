'use strict';

var Calculator = require('./lib/calculator');
var fs = require('fs');

var options = {};
var args = process.argv.slice(2);

if (args && args[0] === '-file') {
	if (args[1] && fs.existsSync(args[1]))
		options = { input: fs.createReadStream(args[1]) }			
	else
		console.log('Unknown File: Not Able To Find The File ', args[1]);
}

var calculator = new Calculator(true, options);