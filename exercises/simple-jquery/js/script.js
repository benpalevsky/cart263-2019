/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

// setup()
//
// Description of setup

$(document).ready(setup);

function setup() {
  let $divs = $('div');
  $divs.hide();
  $divs.fadeIn(2000);
}


function divClicked() {
  $(this).fadeOut(2000, fadeComplete);
}

function fadeComplete() {
  console.log("Fade out completed!");
}
// draw()
//
// Description of draw()

function draw() {
  $('div').on('click', divClicked);
}