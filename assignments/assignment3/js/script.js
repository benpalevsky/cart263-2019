/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

var $spans;
var $secretCounter;
var secretsFound = 0;

$(document).ready(setup);

function setup() {
  $spans = $("span");
  $secretCounter = $("#secret-count");
  setInterval(update, 500);
}

function update() {
  $spans.each(updateSpans);
  $spans.on("click", spanClicked);
  $spans.on("mouseover", spanMouseOver);
}

function updateSpans() {
  var r = Math.random();

  if (r < 0.1) {
    if ($(this).hasClass("redacted")) {
      $(this).removeClass("redacted");
      $(this).addClass("revealed");
    }
  }

}

function spanClicked() {
  if ($(this).hasClass("revealed")) {
    $(this).removeClass("revealed");
    $(this).addClass("redacted");
  }
}

function spanMouseOver() {
  if ($(this).hasClass("secret")) {
    $(this).removeClass("secret");
    $(this).addClass("found");
    $(this).off("mouseover");
    secretsFound++;
    $secretCounter.text("Secrets Found: " + secretsFound);
  }
}