var Calculator = require('../lib/calculator');
var assert = require('chai').assert;

describe('Tote Betting Dividend Calculator', function() {
		beforeEach(function() {
			calculator = new Calculator(false);
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
        var response = calculator.Command('Test:E:5:30');
        assert.equal(response, false);
    });

    it('BET Command With No Arguments Reports Invalid', function() {
        var response = calculator.Command('Bet');
        assert.equal(response, false);
    });    

    it('BET Command With Invalid Arguments Reports Invalid', function() {
        var response = calculator.Command('Bet abcd');
        assert.equal(response, false);
        var response = calculator.Command('Bet,W,1,10');
        assert.equal(response, false);
        var response = calculator.Command('Bet:K:2:10');
        assert.equal(response, false);
        var response = calculator.Command('Bet:W:1:10:Another:Argument');
        assert.equal(response, false);        
    });

    it('RESULT Command With No Arguments Reports Invalid', function() {
        var response = calculator.Command('Result');
        assert.equal(response, false);
    });    

    it('RESULT Command With Invalid Arguments Reports Invalid', function() {
        var response = calculator.Command('Result abcd');
        assert.equal(response, false);
        var response = calculator.Command('Result,2,1,3');
        assert.equal(response, false);
        var response = calculator.Command('Result:3:1:2:Another:Argument');
        assert.equal(response, false);        
    });

    it('BET and RESULT command with Correct arguments are executed correctly ', function() {
        var response = calculator.Command('Bet:W:1:10');
        assert.equal(response, true);
        var response = calculator.Command('Bet:P:2:10');
        assert.equal(response, true);
        var response = calculator.Command('Bet:E:2,3:10');
        assert.equal(response, true);        
        var response = calculator.Command('Result:3:1:2');
        assert.equal(response, true);        
    });    
});