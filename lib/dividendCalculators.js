'use strict';
var _ = require('lodash');

function ToteCalculator(comission) {
	this.commisionPercentage = comission;	
}

ToteCalculator.prototype.CalculatePoolTotal = function(bets) {
	var poolTotal = 0.0;

	bets.forEach(function (bet) {
		poolTotal = poolTotal + bet.stake;
	});
	return poolTotal - (poolTotal * (this.commisionPercentage / 100));	
};

ToteCalculator.prototype.CalculateDividends = function(winningBets, bets) {
  var poolTotal = this.CalculatePoolTotal(bets);
  var keys = Object.keys(winningBets);
  var selectionTotal = poolTotal / keys.length;

  var dividends = [];
  keys.forEach(function(key) {
  	var dividend = {};  	
		var sum = _.reduce(winningBets[key], function(sum, bet) {
	    return sum + parseFloat(bet.stake);
		}, 0);
		dividend[key] = round(selectionTotal / sum);
		dividends.push(dividend);
  });
  return dividends;	
};

function WinCalculator() {
	this.name = 'Win';
}
WinCalculator.prototype = new ToteCalculator(15);
WinCalculator.prototype.CalculateWinningBets = function(bets, raceResult) {
	var selection = {};
	selection[raceResult.first] = _.filter(bets, function(bet) {
		return (bet.product.toUpperCase() === 'W' && bet.selection == raceResult.first);
	});
	return selection;	
}

function PlaceCalculator() {
	this.name = 'Place';
}
PlaceCalculator.prototype = new ToteCalculator(12);
PlaceCalculator.prototype.CalculateWinningBets = function(bets, raceResult) {
}

function ExactaCalculator() {
	this.name = 'Exacta';
}
ExactaCalculator.prototype = new ToteCalculator(18);
ExactaCalculator.prototype.CalculateWinningBets = function(bets, raceResult) {
	var selection = {};
	selection[raceResult.first + ',' + raceResult.second] = _.filter(bets, function(bet) {
		return bet.product.toUpperCase() === 'E' && ExactaMatch(bet, raceResult);
	});
	return selection;	
}

function ExactaMatch (bet,raceResult) {
	var selection = bet.selection.split(',');
	return (selection[0] == raceResult.first && selection[1] == raceResult.second);
}

function round(value) {
  return +value.toFixed(2);
}

module.exports.ToteCalculator = ToteCalculator;
module.exports.WinCalculator = WinCalculator;
module.exports.PlaceCalculator = PlaceCalculator;
module.exports.ExactaCalculator = ExactaCalculator;