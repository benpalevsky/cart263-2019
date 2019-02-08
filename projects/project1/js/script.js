"use strict";

/*****************

Project 1: Happiness is Sisyphus?
Title: Sisyphus is Happy
Author: Ben Palevsky

******************/


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

var selValue;
var $sys;
var $smiley;

function setup() {
  setInterval(update, 500);


  $moodboard = $("input");
  $moodboard.checkboxradio();
  $moodboard.fadeIn(400);

  let index = 0;

  let $dialog = $('<div></div>');
  $dialog.attr('title', 'Sisyphus:');

  selValue = $('input[name=selector]:checked').val();
  // Finally, add the div to the page



  $sys = $(".big-img");
  $sys.css("visibility", "visible");

  $smiley = $(".small-img");
  $smiley.attr("src", "assets/images/emojis/" + index + ".png");
  $smiley.css("visibility", "visible");



  $smiley.offset({
    top: 120,
    left: 230
  })


  $(function() {
    $('input[type="radio"]').click(function() {
      if ($(this).is(':checked')) {
        let index = $(this).attr("id").substring(6);
        $smiley.attr("src", "assets/images/emojis/" + index + ".png");
        $dialog.html("");
        $dialog.append("<p>" + dialogues[index - 1] + "</p>");
        $dialog.dialog({
          modal: true,
          close: function() {
            $smiley.attr("src", "assets/images/emojis/0.png");
          }
        });
        $dialog.parent().offset({
          top: 140,
          left: 300
        });
        $('.ui-widget-overlay').css('background', "transparent"); //write background color change code here
      }
    });
  });


}


function update() {


}