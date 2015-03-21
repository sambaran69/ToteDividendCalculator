'use strict';
var util = require('util');
var readline = require('readline');
var calculators = require('./dividendCalculators');
var calculator, rl;

var Calculator = module.exports =function Calculator(invokePrompt, options) {
	// Initialize
	this.Init();

	if (invokePrompt) {
		options = options || {};
		this.input = options.input || process.stdin;
		this.output = options.output || process.stdout;

		rl = readline.createInterface({
	    input: this.input,
	    output: this.output
	  });
		rl.setPrompt('tabcorp> ');
		rl.prompt();

		rl.on('line', function (line) {
	    try {
	    } catch (e) {
	    }
	    rl.prompt();
	  }).on('close', function() {
		  console.log('Exiting Calculator.');
		  process.exit(0);
		}.bind(this));
	}
}

Calculator.prototype.RegisterProduct = function(key, product) {
  this.products[key] = product;
};

Calculator.prototype.Init = function() {
	calculator = this;
	this.bets = [];
  this.products = {};		
	this.RegisterProduct('W', new calculators.WinCalculator());
	this.RegisterProduct('P', new calculators.PlaceCalculator());
	this.RegisterProduct('E', new calculators.ExactaCalculator());		
}

Calculator.prototype.GetListOfDividends = function(bets, raceResult) {
}

Calculator.prototype.DisplayResult = function (product, dividends) {
};

Calculator.prototype.Command = function(command) {
	var executed = false;
  return executed;
}

Calculator.prototype.unknownCommand = function unknownCommand(cmd) {
  return this.error(Error('Unrecognised command'), 'Unknown Command `' + cmd.toUpperCase() + '`');
};

Calculator.prototype.error = function error(err, message) {
  this.line();
  this.sendError(err, message);
  this.line();

  rl.prompt();
};

Calculator.prototype.sendError = function error(err, message) {
  this.line('[!] ' + (message || 'ERROR') + ': ' + err.message.toUpperCase() + '');
};

Calculator.prototype.line = function line(line) {
  var data = (line || '') + '\n';
  this.output.write(data);
};

function parseRaceResult(raceResult) {
	var result = raceResult.split(':');
	return { 'first': result[1], 'second': result[2], 'third': result[3] };
}

function parseBets (betString) {
	var bet = betString.split(':');
	return { 'product': bet[1], 'selection': bet[2], 'stake': parseInt(bet[3], 10) };
};

module.exports.Calculator = Calculator;