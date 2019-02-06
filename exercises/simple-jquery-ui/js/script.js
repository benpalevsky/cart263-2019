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
  $mouth.droppable({
    drop: function(event, ui) {
      ui.draggable.remove();
      setInterval(chew, 500);
    }
  });
  $fly = $("#fly");
  $fly.draggable();
}

function chew() {

  if ($mouth.attr("src") == "assets/images/mouth-open.png") {
    $mouth.attr("src", "assets/images/mouth-closed.png");
  } else if ($mouth.attr("src") == "assets/images/mouth-closed.png") {
    $mouth.attr("src", "assets/images/mouth-open.png");
  }
}