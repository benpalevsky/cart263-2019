"use strict";

/*****************

Project 1: Happiness is Sisyphus?
Title: Sisyphus is Happy
Author: Ben Palevsky

Sounds from http://www.zbogucki.com/portfolio/dialogue-generator/

******************/


//defining our sentences that Sys can say
let dialogues = [
  [
    "Sometimes you wake up with a smile on your face 😃",
    "I wish I could see my wife and family 🙁",
    "I can't believe that Ares actually noticed me!! 🤑",
    "I can't stop thinking about my beautiful wife! 😍",
    "Please be quiet ... cereberus is sleeping 😶",
    "Sisyphus? No, haven't heard of him. 🚣",
    "I did tie Hades up ... didn't I? Oh bother ... 😳",
    "The underworld is SO COLD this time of year! 💦",
    "Hell is HOT!! Who would have guessed? 👿",
    "I'm off my ROCK-er! 😜",
    "This boulder isn't actually heavy 😉",
  ],
  ["Pushing this boulder has its perks, ya know? 😃",
    "I almost get there, but then the boulder falls down again 🙁",
    "OMG! Zeus knows my name!! ZEUS knows MY name 🤑",
    "I love water nymphs!!! 😍",
    "Don't tell anyone ... but I think I'm going to take a break 😶",
    "I've never done anything wrong or bad or immoral ... 🚣",
    "I may have done some bad things in the past ... 😳",
    "I can survive an eternity of monotiny ... but this cold is too much 💦",
    "I'm heating up here ... 👿",
    "I'm on a roll! 😜",
    "Guess what ... this punishment actually does end 😉",
  ]
]



//when the document is ready, call the setup function
$(document).ready(setup);


//jquery elements for the moodboard, the picture of sys, his emoji face, and his dialog
var $moodboard;
var $sys;
var $smiley;
var $dialog;

//is called as soon as the document loads
function setup() {
  //lets grab the reference to our $moodboard
  //its the only element on screen with any input
  $moodboard = $("input");
  //next we'll call the checkboxradio function from jQueryUI
  $moodboard.checkboxradio();

  //we'll set up a preliminary dialogue
  //I took this trick from your endless dialogues project
  $dialog = $('<div></div>');
  $dialog.attr('title', 'Sisyphus:');

  //we'll grab the reference for Sysaphis
  //he's got the big img class
  $sys = $(".big-img");
  //we'll make him visible
  $sys.css("visibility", "visible");


  //we'll grab the reference for his emoji expression
  //it's got the small img class
  $smiley = $(".small-img");
  $smiley.attr("src", "assets/images/emojis/0.png");
  //we'll make the emoji visible
  $smiley.css("visibility", "visible");


  //we'll offset the smiley so it lines up on his face
  $smiley.offset({
    top: 120,
    left: 230
  })

  //we'll call a function called "onClick()" whenever there's an input on the checkbox
  $('input[type="radio"]').click(onClick);
}

function onClick() {

  //we'll see if the element is checked
  if ($(this).is(':checked')) {
    //clear whatever dialog was there before
    $dialog.html("");


    //we'll substring the id of the element to get just its index, or position
    //these are defined in index.html as 'radio-n' where n is an integer
    let index = $(this).attr("id").substring(6);
    //now we can use that position to modify the path and change the emoji
    $smiley.attr("src", "assets/images/emojis/" + index + ".png");

    //set the contents of the dialog to the right sentence
    //I think I saw you use the append trick in endless dialogues
    $dialog.append("<p>" + dialogues[Math.floor(Math.random() * Math.floor(2))][index - 1] + "</p>");

    //now spawn the dialog as a modal
    //and call a function when you close it
    $dialog.dialog({
      modal: true,
      close: function() {
        $smiley.attr("src", "assets/images/emojis/0.png");
      }
    });

    //set the offset of the dialog so it makes it look like Sisaphys is using it as a speech bubble
    //I think I saw this trick in endless dialogues as well
    $dialog.parent().offset({
      top: 140,
      left: 300
    });

    //make the modal have no background overlay
    //it does by default
    $('.ui-widget-overlay').css('background', "transparent"); //write background color change code here

    //lastly, we'll grab a random sound, instantiate it, and play it
    let soundIndex = (Math.floor(Math.random() * Math.floor(7))) + 1;
    let mySound = new Audio("assets/sounds/" + soundIndex + ".wav");
    mySound.play();

  }
}