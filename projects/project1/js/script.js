"use strict";

/*****************

Project 1: Happiness is Sisyphus?
Title: Sisyphus is Happy
Author: Ben Palevsky

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