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

//answer trivia questions with terrible terrible text UI

//ideas for horrible UI

// always have a timer
// plinko

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
