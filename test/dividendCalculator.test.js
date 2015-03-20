var Calculators = require('../lib/dividendCalculators');
var assert = require('chai').assert;

describe('Dividend Calculator', function() {
	describe('Win', function() {

		var WinCalculator;

	  beforeEach(function(){
	  	WinCalculator = new Calculators.WinCalculator();
	  });

		it('Can be initialized properly', function() {
      assert.isObject(WinCalculator);
      assert.instanceOf(WinCalculator,Calculators.ToteCalculator);
      assert.equal(WinCalculator.name,'Win');
      assert.equal(WinCalculator.commisionPercentage,15);
		});
		it('Should take 15 percent commission before calculating dividends', function() {

		});
		it('Should pick correct winning bets from the pool', function() {

		});
		it('Should calculate dividends correctly', function() {

		});
		it('Should return a single result', function() {

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