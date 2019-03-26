/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

// setup()
//
// Description of setup

let freqs = [220.00, 246.94, 277.18, 293.66, 329.63, 369.99, 415.30, 440.00];

let pattern = ["x", "*", "*", "*", "o", "*", "*", "*"];
let patternIndex = 0;
let drumSymbols = "xo*";


let kick;
let snare;
let hihat;
let synth;

let play = false;

function setup() {

  synth = new Pizzicato.Sound({
    source: 'wave',
    options: {
      frequency: 440,
    }
  });

  kick = new Pizzicato.Sound('assets/sounds/kick.wav');
  snare = new Pizzicato.Sound('assets/sounds/snare.wav');
  hihat = new Pizzicato.Sound('assets/sounds/hihat.wav');




}


// draw()
//
// Description of draw()

function draw() {

}

function playNote(frequency) {
  synth.frequency = frequency;
  synth.play();
}

function playRest() {
  synth.stop();
}

function playDrum() {
  let currentDrum = pattern[patternIndex];
  for (var i = 0; i < drumSymbols.length; i++) {
    if (drumSymbols[i] === currentDrum) {
      switch (drumSymbols[i]) {
        case 'x':
          kick.play();
          break;
        case 'o':
          snare.play();
          break;
        case '*':
          hihat.play();
          break;
        default:
          console.log("hey");
      }
    }
  }

  patternIndex++;
  if (patternIndex > pattern.length - 1) {
    patternIndex = 0;
  }
}

function mousePressed() {
  if (!play) {
    setInterval(function() {
      if (Math.random() > 0.5) {
        playNote(freqs[floor(random(0, freqs.length))]);
      } else {
        playRest();
      }
    }, 160);

    setInterval(playDrum, 80);
    play = true;
  }
}