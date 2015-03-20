# ToteDividendCalculator
## Tote Betting Dividend Calculator

The application is a dividend calculator for a tote betting.
The calculator supports three products with the following rules:
### WIN
Punters must choose the winner of a race.
Tabcorp takes a 15% commission from the Win pool.
The remaining total is split, proportionally to stake, amongst punters who chose the correct winning horse.
### PLACE
Punters must choose the first, second or third place horse in a race.
Tabcorp takes a 12% commission from the Place pool.
The total pool is split evenly into 3 and each of these amounts is then split, proportionally to stake, amongst the punters who chose each placed horse
### EXACTA
Punters must choose the first and second place runners in a race in the correct order.
Tabcorp takes an 18% commission from the Exacta pool.
The remaining total is split, proportionally to stake, amongst punters who chose the correct first and second horse in correct order.
After a race has been run, Tabcorp publishes the dividends for each product. This is the return for a $1 stake for each paying selection in the race. All dividends are calculated to the nearest $0.01.

### Input: list of bets
The format of bets is `Bet:<product>:<selections>:<stake>` , where 
`<product>` is one of W , P , E, `<selection>` is either a single runner number (e.g. 4 ) for Win and Place, or two runner numbers (e.g. 4,3 ) for Exacta and Quinella and `<stake>` is an amount in whole dollars (e.g. 35 )
For example:
````
Bet:W:3:5 is a $5 bet on horse 3 to win
Bet:P:2:10 is a $10 bet on horse 2 to come first, second or third
Bet:E:5,7:15 is a $15 bet on horses 5 and 7 to come first and second in that order
````

### Input: race results
Eventually, your program will receive the race results on stdin . You can assume this is the last input it will receive.
The format of the results is `Result:<first>:<second>:<third>` .
For example,
````
Result:5:3:8 represents a race where horse 5 finished first, horse 3 finished second and horse 8 finished third.
````
### Output: dividends
When bets have been placed and results provided, your program should generate the dividends for each product for a race. The dividends should be printed on stdout , in the following format: 
`<product>:<winningSelections>:<dividend>` .
For example:
````
W:2:$2.61 # Win bet on horse 2 yields $2.61
P:2:$1.06 # Place bet on horse 2 yields $1.06
P:3:$1.27 # Place bet on horse 3 yields $1.27
P:1:$2.13 # Place bet on horse 1 yields $2.13
E:2,3:$2.43 # Exacta on horses 2,3 yields $2.43
````
