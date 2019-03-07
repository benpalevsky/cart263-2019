function preload() {


}


function setup() {

  //hard coded 103 because I can't get the length of objects for some reason
  let index = floor(random(0, 103))
  currentQuote = db[index].quote;
  currentAuthor = db[index].name;

  $("#name").text(currentAuthor).hide()
    .fadeIn(2000);
  $("#quote").text(currentQuote).hide()
    .fadeIn(1000);



}

function draw() {


}