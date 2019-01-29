"use strict";
window.onload = setup;

function setup() {
  let reaction = document.getElementById("reaction");
  reaction.innerText = "surprised";
  let divs = document.getElementsByTagName("div");
  for (let i = 0; i < divs.length; i++) {
    divs[i].style.color = '#ff0000';
  }
  reaction.addEventListener('click', reactionClicked);
}

function reactionClicked(e) {
  e.target.innerText = "depressed";
}