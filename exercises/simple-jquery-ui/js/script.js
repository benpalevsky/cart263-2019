/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

var $mouth;
var $fly;

$(document).ready(setup);

function setup() {
  $mouth = $("#mouth");
  $fly = $("#fly");
  $fly.draggable();
  setInterval(update, 500);
}

function update() {

}