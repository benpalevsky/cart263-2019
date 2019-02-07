"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/



$(document).ready(setup);


function setup() {
  setInterval(update, 500);
  let $dialog = $('<div></div>');
  $dialog.attr('title', 'Sisyphus is ');
  $dialog.dialog();
  $("input").checkboxradio();
}

function update() {

}