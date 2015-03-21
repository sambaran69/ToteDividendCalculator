var Calculators = require('../lib/dividendCalculators');
var assert = require('chai').assert;
var expect = require('chai').expect;

describe('Dividend Calculator', function() {
	describe('Win', function() {

	  beforeEach(function(){
	  	WinCalculator = new Calculators.WinCalculator();
	  	raceResults = { 'first': '1', 'second': '2', 'third': '3' };
	  	totalBets = [
	  		{ 'product': 'W' , 'selection': '1' , 'stake': 10 },
	  		{ 'product': 'W' , 'selection': '2' , 'stake': 10 },
	  		{ 'product': 'W' , 'selection': '1' , 'stake': 20 },
	  		{ 'product': 'W' , 'selection': '2' , 'stake': 20 },
	  		{ 'product': 'W' , 'selection': '3' , 'stake': 40 }
	  	];
	  	expectedResponseBets = {
	  		'1': [
	  			{ 'product': 'W' , 'selection': '1' , 'stake': 10 },
	  			{ 'product': 'W' , 'selection': '1' , 'stake': 20 }
	  		]
	  	};
	  	expectedResponseDividends = [{	'1': 2.83 }];
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

			expect(winningBets).to.have.property('1');
			expect(winningBets).to.deep.equal(expectedResponseBets);			
		});

		it('Should calculate dividends correctly', function() {
			var winningBets = WinCalculator.CalculateWinningBets(totalBets, raceResults);
			var dividends = WinCalculator.CalculateDividends(winningBets,totalBets);

			expect(winningBets).to.have.property('1');
			expect(dividends[0]).to.have.property('1');
			expect(dividends[0]).to.have.deep.property('1', 2.83);
			expect(winningBets).to.deep.equal(expectedResponseBets);
			expect(dividends).to.deep.equal(expectedResponseDividends);			
		});

		it('Should return a single result', function() {
			var winningBets = WinCalculator.CalculateWinningBets(totalBets, raceResults);
			var dividends = WinCalculator.CalculateDividends(winningBets,totalBets);
			var propertyCount = Object.keys(dividends[0]);

			assert.equal(dividends.length, 1);
			assert.equal(propertyCount.length,1);
			assert.equal(dividends[0][propertyCount[0]], 2.83);
			expect(winningBets).to.deep.equal(expectedResponseBets);
			expect(dividends).to.deep.equal(expectedResponseDividends);
		});

	});

	describe('Place', function() {

	  beforeEach(function(){
	  	PlaceCalculator = new Calculators.PlaceCalculator();
	  	totalBets = [
	  		{ 'product': 'P' , 'selection': '1' , 'stake': 10 },
	  		{ 'product': 'P' , 'selection': '2' , 'stake': 10 },
	  		{ 'product': 'P' , 'selection': '1' , 'stake': 20 },
	  		{ 'product': 'P' , 'selection': '2' , 'stake': 20 },
	  		{ 'product': 'P' , 'selection': '3' , 'stake': 10 },
	  		{ 'product': 'P' , 'selection': '3' , 'stake': 20 },
	  		{ 'product': 'P' , 'selection': '4' , 'stake': 30 },
	  		{ 'product': 'P' , 'selection': '5' , 'stake': 30 } 				
	  	];
	  			
	  	expectedResponseBets = {
	  		'1': [ { 'product': 'P' , 'selection': '1' , 'stake': 10 },
	  			{ 'product': 'P' , 'selection': '1' , 'stake': 20 }	],
	  		'2': [ { 'product': 'P' , 'selection': '2' , 'stake': 10 },
	  			{ 'product': 'P' , 'selection': '2' , 'stake': 20 }	],
	  		'3': [ { 'product': 'P' , 'selection': '3' , 'stake': 10 },
	  			{ 'product': 'P' , 'selection': '3' , 'stake': 20 }	]	  				  			
	  	};
	  	expectedResponseDividends = [
	  		{	'1': 1.47 },
	  		{ '2': 1.47 },
	  		{ '3': 1.47 }];	  	
	  });

		it('Can be initialized properly', function() {
      assert.isObject(PlaceCalculator);
      assert.instanceOf(PlaceCalculator,Calculators.ToteCalculator);
      assert.equal(PlaceCalculator.name,'Place');
      assert.equal(PlaceCalculator.commisionPercentage,12);
		});
		it('Should take 12 percent commission before calculating dividends', function() {
			var poolTotal = PlaceCalculator.CalculatePoolTotal(totalBets);

			assert.equal(poolTotal, 132);
		});

		describe('Picks correct winning bets from the pool', function() {

			beforeEach(function() {
		  	betsResponseFirst = [ { 'product': 'P' , 'selection': '1' , 'stake': 10 },
		  			{ 'product': 'P' , 'selection': '1' , 'stake': 20 }	];
		  	betsResponseSecond = [ { 'product': 'P' , 'selection': '2' , 'stake': 10 },
		  			{ 'product': 'P' , 'selection': '2' , 'stake': 20 }	];
		  	betsResponseThird = [ { 'product': 'P' , 'selection': '3' , 'stake': 10 },
		  			{ 'product': 'P' , 'selection': '3' , 'stake': 20 }	];
			});

			it('Should pick correct winning bets from the pool for first place', function() {
				var winningBets = PlaceCalculator.CalculateWinningBets(totalBets, raceResults);

				expect(winningBets).to.have.property('1');
				expect(winningBets['1']).to.deep.equal(betsResponseFirst);
			});

			it('Should pick correct winning bets from the pool for second place', function() {
				var winningBets = PlaceCalculator.CalculateWinningBets(totalBets, raceResults);

				expect(winningBets).to.have.property('2');
				expect(winningBets['2']).to.deep.equal(betsResponseSecond);
			});

			it('Should pick correct winning bets from the pool for third place', function() {
				var winningBets = PlaceCalculator.CalculateWinningBets(totalBets, raceResults);

				expect(winningBets).to.have.property('3');
				expect(winningBets['3']).to.deep.equal(betsResponseThird);
			});

			it('Should return a single respone for winning bets with all three race results', function() {
				var winningBets = PlaceCalculator.CalculateWinningBets(totalBets, raceResults);

				expect(winningBets).to.deep.equal(expectedResponseBets);
			});			
		});

		describe('Caclulates each dividend correctly', function() {

			it('Should calculate the dividend for first place correctly', function() {
				var winningBets = PlaceCalculator.CalculateWinningBets(totalBets, raceResults);
				var dividends = PlaceCalculator.CalculateDividends(winningBets,totalBets);

				expect(winningBets).to.have.property('1');
				expect(dividends[0]).to.have.property('1');
				expect(dividends[0]).to.have.deep.property('1', 1.47);
			});

			it('Should calculate the dividend for second place correctly', function() {
				var winningBets = PlaceCalculator.CalculateWinningBets(totalBets, raceResults);
				var dividends = PlaceCalculator.CalculateDividends(winningBets,totalBets);

				expect(winningBets).to.have.property('2');
				expect(dividends[1]).to.have.property('2');
				expect(dividends[1]).to.have.deep.property('2', 1.47);
			});

			it('Should calculate the dividend for third place correctly', function() {
				var winningBets = PlaceCalculator.CalculateWinningBets(totalBets, raceResults);
				var dividends = PlaceCalculator.CalculateDividends(winningBets,totalBets);

				expect(winningBets).to.have.property('3');
				expect(dividends[2]).to.have.property('3');
				expect(dividends[2]).to.have.deep.property('3', 1.47);
				expect(winningBets).to.deep.equal(expectedResponseBets);
				expect(dividends).to.deep.equal(expectedResponseDividends);
			});
		});

		it('Should return three results', function() {
				var winningBets = PlaceCalculator.CalculateWinningBets(totalBets, raceResults);
				var dividends = PlaceCalculator.CalculateDividends(winningBets,totalBets);

				assert.equal(dividends.length,3);
				expect(dividends[0]).to.have.property('1');
				expect(dividends[1]).to.have.property('2');
				expect(dividends[2]).to.have.property('3');												
				expect(winningBets).to.deep.equal(expectedResponseBets);
				expect(dividends).to.deep.equal(expectedResponseDividends);
		});
	});

	describe('Exacta', function() {

	  beforeEach(function(){
	  	ExactaCalculator = new Calculators.ExactaCalculator();
	  	raceResults = { 'first': '1', 'second': '2', 'third': '3' };
	  	totalBets = [
	  		{ 'product': 'E' , 'selection': '1,2' , 'stake': 10 },
	  		{ 'product': 'E' , 'selection': '2,3' , 'stake': 10 },
	  		{ 'product': 'E' , 'selection': '1,2' , 'stake': 20 },
	  		{ 'product': 'E' , 'selection': '2,3' , 'stake': 20 },
	  		{ 'product': 'E' , 'selection': '1,3' , 'stake': 10 },
	  		{ 'product': 'E' , 'selection': '1,3' , 'stake': 20 }	
	  	];
	  	expectedResponseBets = {
	  		'1,2': [
	  			{ 'product': 'E' , 'selection': '1,2' , 'stake': 10 },
	  			{ 'product': 'E' , 'selection': '1,2' , 'stake': 20 }
	  		]
	  	};
	  	expectedResponseDividends = [{ '1,2': 2.46 }];	  	
	  });

		it('Can be initialized properly', function() {
      assert.isObject(ExactaCalculator);
      assert.instanceOf(ExactaCalculator,Calculators.ToteCalculator);
      assert.equal(ExactaCalculator.name,'Exacta');
      assert.equal(ExactaCalculator.commisionPercentage,18);
		});

		it('Should take 18 percent commission before calculating dividends', function() {
			var poolTotal = ExactaCalculator.CalculatePoolTotal(totalBets);

			assert.equal(poolTotal, 73.8);
		});

		it('Should pick correct winning bets from the pool', function() {
			var winningBets = ExactaCalculator.CalculateWinningBets(totalBets, raceResults);

			expect(winningBets).to.have.property('1,2');
			expect(winningBets).to.deep.equal(expectedResponseBets);
		});

		it('Should calculate dividends correctly', function() {
			var winningBets = ExactaCalculator.CalculateWinningBets(totalBets, raceResults);
			var dividends = ExactaCalculator.CalculateDividends(winningBets, totalBets);

			expect(winningBets).to.have.property('1,2');
			expect(dividends[0]).to.have.property('1,2');
			expect(dividends[0]).to.have.deep.property('1,2', 2.46);
			expect(winningBets).to.deep.equal(expectedResponseBets);
			expect(dividends).to.deep.equal(expectedResponseDividends);	
		});
		it('Should return a single result', function() {
			var winningBets = ExactaCalculator.CalculateWinningBets(totalBets, raceResults);
			var dividends = ExactaCalculator.CalculateDividends(winningBets, totalBets);
			var propertyCount = Object.keys(dividends[0]);

			assert.equal(dividends.length, 1);
			assert.equal(propertyCount.length,1);
			assert.equal(dividends[0][propertyCount[0]], 2.46);
			expect(winningBets).to.deep.equal(expectedResponseBets);
			expect(dividends).to.deep.equal(expectedResponseDividends);
		});
	});	
});