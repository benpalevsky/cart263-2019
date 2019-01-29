/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

$(document).ready(setInterval(update, 500));

function update() {
  console.log("Update!");
  $("span").each(updateSpans);
}

function updateSpans() {
  console.log("Updating spans!");
  var r = Math.random();

  if (r < 0.1) {
    $(this).removeClass("redacted");
    $(this).addClass("revealed");
  }

}