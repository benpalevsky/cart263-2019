/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

var $spans;

$(document).ready(setup);

function setup() {
  $spans = $("span");
  setInterval(update, 500);
}

function update() {
  console.log("Update!");
  $spans.each(updateSpans);
  $spans.on("click", spanClicked);
}

function updateSpans() {
  console.log("Updating spans!");
  var r = Math.random();

  if (r < 0.1) {
    $(this).removeClass("redacted");
    $(this).addClass("revealed");
  }

}

function spanClicked() {
  $(this).removeClass("revealed");
  $(this).addClass("redacted");
}