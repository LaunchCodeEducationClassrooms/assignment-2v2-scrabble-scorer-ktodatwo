// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word=String(word);
  word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some Scrabble!");
   word = input.question("Enter a word to score: ")
};

let simpleScore = function(word) {
word=String(word);
word = word.toUpperCase();
let letterPoints = 0;
  for (let i=0; i<word.length; i++) {
    letterPoints++;
  }
return letterPoints;
};

let vowelBonusScore =function(word) {
word=String(word);
word = word.toUpperCase().split("");
let letterPoints = 0;
  for (let i=0; i<word.length; i++) {
    if (/A|E|I|O|U/.test(word[i])) { 
      letterPoints = letterPoints+3;
    }else {
      letterPoints++;
    }
  }
  return letterPoints;
};


let scrabbleScore = function(word) {
    let wordscore=0;
    let temp = String(word);
    temp = temp.toLowerCase();
    for (let i=0; i<temp.length; i++) {
      wordscore += newPointStructure[temp.substr(i,1)];
    }
  return wordscore;
};

const scoringAlgorithms = [
  ({
    name: 'Simple Score', 
    description: 'Each letter is worth 1 point', 
    scorerFunction: function() {
      return simpleScore(word);
      }
    }),
  ({
    name: 'Bonus Vowels',
    description: 'Vowels are 3pts, consonants are 1pt',
    scorerFunction: function() {
      return vowelBonusScore(word);
      }
    }),
  ({
    name: 'Scrabble',
    description: 'Traditional Scoring System',
    scorerFunction: function() {
      return scrabbleScore(word);
      }
    })
    ];

function scorerPrompt() {
let numChoice = input.question("\nWhich scoring algorithm would you like to use? \n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\nEnter 0, 1, or 2: ") 
  if (Number(numChoice)===0){
    console.log(`Score for '${word}': ${scoringAlgorithms[0].scorerFunction(word)}`);
  } else if (Number(numChoice)===1) {
    console.log(`Score for '${word}': ${scoringAlgorithms[1].scorerFunction(word)}`);
  } else if (Number(numChoice)===2){
    console.log(`Score for '${word}': ${scoringAlgorithms[2].scorerFunction(word)}`);
  }
}

function transform (oldPointStructure) {

const fasterScore = {};

for (let item in oldPointStructure) {
  for (let i in oldPointStructure[item])
  fasterScore[oldPointStructure[item][i].toLowerCase()] = Number(item);
}
return fasterScore;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   initialPrompt();
   scorerPrompt();
   }

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

