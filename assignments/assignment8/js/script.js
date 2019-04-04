// function getImage() {
//   var flickerAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
//   $.getJSON(flickerAPI, {
//     tags: "juventus",
//     tagmode: "any",
//     format: "json"
//   }).done(function(data) {
//     var random = Math.floor(Math.random() * data.items.length);
//     $('img').attr('src', data.items[random].media.m);
//   });
// }

//types of questions
//1. true false
//2. multiple choice
//3. unique answer

//moving bucket and you have to drop letters into it
//matter.js + p5.js ?

//answer trivia questions with terrible terrible text UI

//ideas for horrible UI

// always have a timer
// plinko
// spelling with sliders

//or pivot entirely and just make a draw on faces game.
//basically we have the draw on faces that was fun
//and the ui hell idea that is ok

//I think I'm going to make draw on faces??

}

let request;
let question;

$(document).ready(function() {
getQuestion();
});

function getQuestion() {
request = $.getJSON('https://opentdb.com/api.php?amount=1&difficulty=easy').done(function() {
  question = request.responseJSON.results[0].question;
  $('#question').html(question);
});
}
