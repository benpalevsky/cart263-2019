/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

$(document).ready(setInterval(update, 500));

function update() {
  console.log("Update!");
  var $spans = $("span").each(updateSpans);
}

function updateSpans() {
  console.log("Updating spans!");

}