"use strict";

/*****************

Project 1: Happiness is Sisyphus?
Title: Sisyphus is Happy
Author: Ben Palevsky

******************/

let moods = [
  "Happy 😀",
  "Sad",
  "Star Struck 😎",
  "In Love",
  "Whispering",
  "Lying",
  "Embarassed",
  "Cold",
  "Hot",
  "Crazy",
  "In the loop"
];

let dialogues = [
  "Sometimes you wake up with a smile on your face :) ",
  "I wish I could see my wife and family :(",
  "I can't believe that Ares actually noticed me!! *u*",
  "I can't stop thinking about my beautiful wife!",
  "Please be quiet ... cereberus is sleeping",
  "Sisyphus? No, haven't heard of him.",
  "I did tie Hades up ... didn't I? Oh bother ...",
  "The underworld is SO COLD this time of year! ",
  "Hell is HOT!! Who would have guessed?",
  "I'm off my ROCK-er! ",
  "This boulder isn't actually heavy ;) "
]



$(document).ready(setup);



var $moodboard;
var styles = {
  "height": "120",
  "position": "absolute !important",
  "left": "100px",
  "top": "100px",
  "width": "100%",
  "background-color": "#c0c0c0",
  "opacity": 1,
  "z-index:": -1
};

var selValue;
var $sys;
var $smiley;

function setup() {
  setInterval(update, 500);


  $moodboard = $("#moodboard");
  $moodboard.css(styles);

  let index = [Math.floor(Math.random() * moods.length)];

  let $dialog = $('<div></div>');
  $dialog.attr('title', 'Sisyphus:');
  $dialog.append("<p>" + dialogues[index] + "</p>");

  selValue = $('input[name=selector]:checked').val();
  // Finally, add the div to the page
  $dialog.dialog();

  $dialog.parent().offset({
    top: 140,
    left: 300
  });

  $sys = $(".big-img");
  $smiley = $(".small-img");

  $smiley.offset({
    top: 120,
    left: 230
  })


}


function update() {


}