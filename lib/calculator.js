'use strict';
var _ = require('lodash');
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
      	calculator.Command(line.trim(), invokePrompt);	    	
	    } catch (e) {
      	calculator.line(e);	    	
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

Calculator.prototype.GetListOfDividends = function(bets, raceResult, invokePrompt) {
	var raceResult = parseRaceResult(raceResult);

	var listOfDividends = [];
	var keys = Object.keys(this.products);
	keys.forEach(function(key) {
  	var winningBets = calculator.products[key].CalculateWinningBets(calculator.bets, raceResult);
  	var bets = _.filter(calculator.bets, function(bet) {
  		return bet.product === key;
  	});
		var selectionDividends = calculator.products[key].CalculateDividends(winningBets, bets);
		listOfDividends.push(selectionDividends);
		if (invokePrompt)
			calculator.DisplayResult(calculator.products[key].name, selectionDividends);
	});
	return listOfDividends;	
}

Calculator.prototype.DisplayResult = function (product, dividends) {
	dividends.forEach(function(dividend) {
		var winningSelection = Object.keys(dividend)[0];
		console.log(util.format('%s:%s:$%d', product, winningSelection, dividend[winningSelection]));
	});	
};

Calculator.prototype.Command = function(command, invokePrompt) {
	var executed = false;
	var commandArray = command.split(':');
	var commandName = commandArray[0].toUpperCase();

	if (!(commandArray.length === 4)) {
		if (invokePrompt)
			this.error(Error('Invalid Arguments'), 'There should be only 3 arguments with \':\' delimitter');
		return executed;
	}
	if (commandName === 'BET' && ['W','P','E'].indexOf(commandArray[1]) < 0) {
		if (invokePrompt)
			this.error(Error('Invalid Arguments'), 'There are only 3 products: Win(W), Place(P) & Exacta(E)');
		return executed;
	}
	switch (commandName) {
    case 'BET':
    	this.bets.push(parseBets(command));
    	executed = true;
    	break;
    case 'RESULT':
    	executed = this.GetListOfDividends(this.bets, command, invokePrompt);
     	break;
    default:
    	if (invokePrompt)
      	this.unknownCommand(commandName);
      break;
  }
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