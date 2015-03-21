var Calculator = require('../lib/calculator');
var assert = require('chai').assert;
var expect = require('chai').expect;

describe('Tote Betting Dividend Calculator', function() {
		beforeEach(function() {
			calculator = new Calculator(false);
			expectedResponse = [ 
				[ { '2': 2.61 } ],
  			[ { '1': 2.13 }, { '2': 1.06 }, { '3': 1.27 } ],
  			[ { '2,3': 2.43 } ]
  		];
		});

    it('Can Be Initialised Properly', function() {
        assert.isObject(calculator);
        assert.instanceOf(calculator, Calculator);
    });

    it('Empty Command Is Reported Invalid', function() {
        var response = calculator.Command('');
        assert.equal(response, false);
    });

    it('Unrecognized Command Is Reported Invalid', function() {
        var response = calculator.Command('Calculate');
        assert.equal(response, false);    	
        response = calculator.Command('Test:E:5:30');
        assert.equal(response, false);
    });

    it('BET Command With No Arguments Reports Invalid', function() {
        var response = calculator.Command('Bet');
        assert.equal(response, false);
    });    

    it('BET Command With Invalid Arguments Reports Invalid', function() {
        var response = calculator.Command('Bet abcd');
        assert.equal(response, false);
        response = calculator.Command('Bet,W,1,10');
        assert.equal(response, false);
        response = calculator.Command('Bet:K:2:10');
        assert.equal(response, false);
        response = calculator.Command('Bet:W:1:10:Another:Argument');
        assert.equal(response, false);        
    });

    it('RESULT Command With No Arguments Reports Invalid', function() {
        var response = calculator.Command('Result');
        assert.equal(response, false);
    });    

    it('RESULT Command With Invalid Arguments Reports Invalid', function() {
        var response = calculator.Command('Result abcd');
        assert.equal(response, false);
        response = calculator.Command('Result,2,1,3');
        assert.equal(response, false);
        response = calculator.Command('Result:3:1:2:Another:Argument');
        assert.equal(response, false);        
    });

    it('BET command with Correct arguments are executed correctly ', function() {
        var response = calculator.Command('Bet:W:1:10');
        assert.equal(response, true);
        response = calculator.Command('Bet:P:2:10');
        assert.equal(response, true);
        response = calculator.Command('Bet:E:2,3:10');
        assert.equal(response, true);        
    });

    it('RESULT command executes correctly and returns the dividend response', function() {
			var response = calculator.Command('Bet:W:1:3');
			assert.equal(response, true);
			response = calculator.Command('Bet:W:2:4');
			assert.equal(response, true);
			response = calculator.Command('Bet:W:3:5');
			assert.equal(response, true);
			response = calculator.Command('Bet:W:4:5');
			assert.equal(response, true);
			response = calculator.Command('Bet:W:1:16');
			assert.equal(response, true);
			response = calculator.Command('Bet:W:2:8');
			assert.equal(response, true);
			response = calculator.Command('Bet:W:3:22');
			assert.equal(response, true);
			response = calculator.Command('Bet:W:4:57');
			assert.equal(response, true);
			response = calculator.Command('Bet:W:1:42');
			assert.equal(response, true);
			response = calculator.Command('Bet:W:2:98');
			assert.equal(response, true);
			response = calculator.Command('Bet:W:3:63');
			assert.equal(response, true);
			response = calculator.Command('Bet:W:4:15');
			assert.equal(response, true);
			response = calculator.Command('Bet:P:1:31');
			assert.equal(response, true);
			response = calculator.Command('Bet:P:2:89');
			assert.equal(response, true);
			response = calculator.Command('Bet:P:3:28');
			assert.equal(response, true);
			response = calculator.Command('Bet:P:4:72');
			assert.equal(response, true);
			response = calculator.Command('Bet:P:1:40');
			assert.equal(response, true);
			response = calculator.Command('Bet:P:2:16');
			assert.equal(response, true);
			response = calculator.Command('Bet:P:3:82');
			assert.equal(response, true);
			response = calculator.Command('Bet:P:4:52');
			assert.equal(response, true);
			response = calculator.Command('Bet:P:1:18');
			assert.equal(response, true);
			response = calculator.Command('Bet:P:2:74');
			assert.equal(response, true);
			response = calculator.Command('Bet:P:3:39');
			assert.equal(response, true);
			response = calculator.Command('Bet:P:4:105');
			assert.equal(response, true);
			response = calculator.Command('Bet:E:1,2:13');
			assert.equal(response, true);
			response = calculator.Command('Bet:E:2,3:98');
			assert.equal(response, true);
			response = calculator.Command('Bet:E:1,3:82');
			assert.equal(response, true);
			response = calculator.Command('Bet:E:3,2:27');
			assert.equal(response, true);
			response = calculator.Command('Bet:E:1,2:5');
			assert.equal(response, true);
			response = calculator.Command('Bet:E:2,3:61');
			assert.equal(response, true);
			response = calculator.Command('Bet:E:1,3:28');
			assert.equal(response, true);
			response = calculator.Command('Bet:E:3,2:25');
			assert.equal(response, true);
			response = calculator.Command('Bet:E:1,2:81');
			assert.equal(response, true);
			response = calculator.Command('Bet:E:2,3:47');
			assert.equal(response, true);
			response = calculator.Command('Bet:E:1,3:93');
			assert.equal(response, true);
			response = calculator.Command('Bet:E:3,2:51');
			assert.equal(response, true);
			response = calculator.Command('Result:2:3:1');
			expect(response).to.deep.equal(expectedResponse);	
    });      
});