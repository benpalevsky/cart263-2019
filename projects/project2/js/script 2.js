/*****************

Project 2
Ben Palevsky

******************/

// setup()
//
// Description of setup


// var data = {
//   "name": ["Arjun", "Yuuma", "Darcy", "Mia", "Chiaki", "Izzi", "Azra", "Lina"],
//   "animal": ["unicorn", "raven", "sparrow", "scorpion", "coyote", "eagle", "owl", "lizard", "zebra", "duck", "kitten"],
//   "mood": ["vexed", "indignant", "impassioned", "wistful", "astute", "courteous"],
//   "story": ["#hero# traveled with her pet #heroPet#.  #hero# was never #mood#, for the #heroPet# was always too #mood#."],
//   "origin": ["#[hero:#name#][heroPet:#animal#]story#"]
// }


let consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'X', 'Y', 'Z'];
let vowels = ['A', 'E', 'I', 'O', 'U'];

var lexicon;


let buzzwords_raw;
let buzzwords;

let minLetters = 4;
let maxLetters = 14;

let currentWord = "";

function preload() {
  buzzwords_raw = loadJSON('js/data/buzzwords.json');


}


function setup() {
  lexicon = new RiLexicon();
  buzzwords = convertToArray(buzzwords_raw);
  //grammar = tracery.createGrammar(data);




}


// draw()
//
// Description of draw()

function draw() {

  //buzzwords = JSON.

}

let wordStartsWithVowel = function(word_raw) {
  word = word_raw.toUpperCase();
  return (word.charAt(0) == ('A') || word.charAt(0) == ('E') || word.charAt(0) == ('I') || word.charAt(0) == ('O') || word.charAt(0) == ('U'))
}


function mouseClicked() {

  for (var i = 0; i < floor(random(minLetters, maxLetters)) / 2; i++) {
    let consonant = consonants[floor(random(0, consonants.length))];
    let vowel = vowels[floor(random(0, vowels.length))];
    currentWord += consonant + vowel;
  }

  responsiveVoice.speak(currentWord);
  currentWord = "";

  //console.log(grammar.flatten('#origin#'));

}

function convertToArray(json) {

  arr = [];

  for (var i = 0; i < json.length; i++) {
    arr.push(json[i]);
  }

  json = arr;
  return arr;

}


// Code to add length property to Object Literals
// got this here https://medium.com/@greggod/javascript-object-length-property-68625fa5d77e
if (!Object.prototype.length) {
  Object.defineProperty(Object.prototype, 'length', {
    get: function() {
      return Object.keys(this).length
    }
  });
}