/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

var $mouth;
var $fly;
var $shrimp;

var $buzzSound
var $crunchSound

$(document).ready(setup);

function setup() {
  $buzzSound = $("#buzz");
  $crunchSound = $("#crunch");

  $shrimp = $('#shrimp');
  $shrimp.draggable();

  $fly = $("#fly");
  $fly.draggable();
  $fly.mousedown(function() {
    $buzzSound[0].play();
  });

  $fly.mouseup(function() {
    $buzzSound[0].pause();
  });

  $mouth = $("#mouth");
  $mouth.droppable({
    accept: '#fly',
    drop: function(event, ui) {
      ui.draggable.remove();
      setInterval(chew, 500);
      $crunchSound[0].play();

    }
  });
}

function chew() {

  if ($mouth.attr("src") == "assets/images/mouth-open.png") {
    $mouth.attr("src", "assets/images/mouth-closed.png");
    $crunchSound[0].play();

  } else if ($mouth.attr("src") == "assets/images/mouth-closed.png") {
    $mouth.attr("src", "assets/images/mouth-open.png");
    $crunchSound[0].play();

  }
}