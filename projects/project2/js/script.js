/*****************

Project 2
Ben Palevsky

******************/

// setup()
//
// Description of setup


let consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'X', 'Y', 'Z'];
let vowels = ['A', 'E', 'I', 'O', 'U'];

let buzzwords_raw;
let buzzwords;

let minLetters = 4;
let maxLetters = 14;

let currentWord = "";

function preload() {
  buzzwords_raw = loadJSON('js/data/buzzwords.json');


}


function setup() {
  buzzwords = convertToArray(buzzwords_raw);



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

  currentWord = buzzwords.filter(wordStartsWithVowel);
  currentWord = currentWord[Math.floor(random(0, currentWord.length))]

  for (var i = 0; i < floor(random(minLetters, maxLetters)) / 2; i++) {
    let consonant = consonants[floor(random(0, consonants.length))];
    //let vowel = vowels[floor(random(0, vowels.length))];
    currentWord += consonant + currentWord;
  }

  responsiveVoice.speak(currentWord);
  currentWord = "";

}

function convertToArray(json) {

  arr = [];

  for (var i = 0; i < json.length; i++) {
    arr.push(json[i].toString());
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