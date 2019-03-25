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
let kick;
let snare;
let hihat;
let synth;

function setup() {

  synth = new Pizzicato.Sound({
    source: 'wave',
    options: {
      frequency: 440
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