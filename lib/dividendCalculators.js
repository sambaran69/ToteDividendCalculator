'use strict';

function ToteCalculator(comission) {
	this.commisionPercentage = comission;	
}

ToteCalculator.prototype.CalculatePoolTotal = function(bets) {
};

ToteCalculator.prototype.CalculateDividends = function(winningBets, bets) {
};

function WinCalculator() {
	this.name = 'Win';
}
WinCalculator.prototype = new ToteCalculator(15);
WinCalculator.prototype.CalculateWinningBets = function(bets, raceResult) {
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
}

module.exports.ToteCalculator = ToteCalculator;
module.exports.WinCalculator = WinCalculator;
module.exports.PlaceCalculator = PlaceCalculator;
module.exports.ExactaCalculator = ExactaCalculator;