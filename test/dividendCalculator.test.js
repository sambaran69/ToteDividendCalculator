var Calculators = require('../lib/dividendCalculators');
var assert = require('chai').assert;

describe('Dividend Calculator', function() {
	describe('Win', function() {

		var WinCalculator;
		var totalBets;
		var raceResults;
		var expectedResponse;

	  beforeEach(function(){
	  	WinCalculator = new Calculators.WinCalculator();
	  	raceResults = { 'first': '1', 'second': '2', 'third': '3' };
	  	totalBets = [
	  		{ 'product': 'W' , 'selection': '1' , 'stake': 10 },
	  		{ 'product': 'W' , 'selection': '2' , 'stake': 10 },
	  		{ 'product': 'W' , 'selection': '1' , 'stake': 20 },
	  		{ 'product': 'W' , 'selection': '2' , 'stake': 20 },
	  		{ 'product': 'W' , 'selection': '3' , 'stake': 40 },
	  		{ 'product': 'P' , 'selection': '2' , 'stake': 10 },
	  		{ 'product': 'P' , 'selection': '3' , 'stake': 10 },
	  		{ 'product': 'E' , 'selection': '1,3' , 'stake': 10 },
	  		{ 'product': 'E' , 'selection': '2,3' , 'stake': 10 }	  		 			  			  			  			  		
	  	];
	  	expectedResponseBets = {
	  		'1': [
	  			{ 'product': 'W' , 'selection': '1' , 'stake': 10 },
	  			{ 'product': 'W' , 'selection': '1' , 'stake': 20 }
	  		]
	  	};
	  	expectedResponseDividends = {	'1': 2.83 };
	  });

		it('Can be initialized properly', function() {
      assert.isObject(WinCalculator);
      assert.instanceOf(WinCalculator,Calculators.ToteCalculator);
      assert.equal(WinCalculator.name,'Win');
      assert.equal(WinCalculator.commisionPercentage,15);
		});

		it('Should take 15 percent commission before calculating dividends', function() {
			var poolTotal = WinCalculator.CalculatePoolTotal(totalBets);
			
			assert.equal(poolTotal, 85);
		});
		it('Should pick correct winning bets from the pool', function() {
			var winningBets = WinCalculator.CalculateWinningBets(totalBets, raceResults);

			assert.equal(winningBets, expectedResponseBets);
		});

		it('Should calculate dividends correctly', function() {
			var winningBets = WinCalculator.CalculateWinningBets(totalBets, raceResults);
			var dividends = WinCalculator.CalculateDividends(winningBets,totalBets);

			assert.equal(winningBets, expectedResponseBets);
			assert.equal(dividends, expectedResponseDividends);				
		});

		it('Should return a single result', function() {
			var winningBets = WinCalculator.CalculateWinningBets(totalBets, raceResults);
			var dividends = WinCalculator.CalculateDividends(winningBets,totalBets);
			var propertyCount = Object.keys(dividends);

			assert.equal(winningBets, expectedResponseBets);
			assert.equal(dividends, expectedResponseDividends);
			assert.equal(propertyCount.length,1);
			assert.equal(dividends[propertyCount[0]],2.83);
		});

	});
	describe('Place', function() {
		var PlaceCalculator;

	  beforeEach(function(){
	  	PlaceCalculator = new Calculators.PlaceCalculator();
	  });

		it('Can be initialized properly', function() {
      assert.isObject(PlaceCalculator);
      assert.instanceOf(PlaceCalculator,Calculators.ToteCalculator);
      assert.equal(PlaceCalculator.name,'Place');
      assert.equal(PlaceCalculator.commisionPercentage,12);
		});
		it('Should take 12 percent commission before calculating dividends', function() {

		});

		describe('Picks correct winning bets from the pool', function() {
			it('Should pick correct winning bets from the pool for first place', function() {

			});
			it('Should pick correct winning bets from the pool for second place', function() {

			});
			it('Should pick correct winning bets from the pool for third place', function() {

			});
			it('Should return a single respone for winning bets with all three race results', function() {

			});			
		});

		describe('Caclulates each dividend correctly', function() {
			it('Should calculate the dividend for first place correctly', function() {

			});
			it('Should calculate the dividend for second place correctly', function() {

			});
			it('Should calculate the dividend for third place correctly', function() {

			});
		});

		it('Should return three results', function() {

		});
	});
	describe('Exacta', function() {

		var ExactaCalculator;

	  beforeEach(function(){
	  	ExactaCalculator = new Calculators.ExactaCalculator();
	  });

		it('Can be initialized properly', function() {
      assert.isObject(ExactaCalculator);
      assert.instanceOf(ExactaCalculator,Calculators.ToteCalculator);
      assert.equal(ExactaCalculator.name,'Exacta');
      assert.equal(ExactaCalculator.commisionPercentage,18);
		});
		it('Should take 18 percent commission before calculating dividends', function() {

		});
		it('Should pick correct winning bets from the pool', function() {

		});
		it('Should calculate dividends correctly', function() {

		});
		it('Should return a single result', function() {

		});
	});	
});