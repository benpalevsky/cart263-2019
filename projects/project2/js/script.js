let currentQuote;
let currentAuthor;
let spokenSentence;
let transformedSentence;
let db;

if (annyang) {
  // Let's define our first command. First the text we expect, and then the function it should call
  var commands = {};


  // Add our commands to annyang
  annyang.addCommands(commands);

  // Start listening. You can call this here, or attach this call to an event, button, etc.
  annyang.start();

  annyang.addCallback('result', function(whatWasHeardArray) {
    //console.log(whatWasHeardArray);
    spokenSentence = whatWasHeardArray[0];

    transformedSentence = RiTa.similarBySound(spokenSentence);

  });
}

function preload() {
  font = loadFont('assets/fonts/SourceSansPro-Regular.otf');
  db = loadJSON('js/data/quotes.json');
}


function setup() {

  //hard coded 103 because I can't get the length of objects for some reason
  currentQuote = db[floor(random(0, 103))].quote;
  currentAuthor = db[floor(random(0, 103))].name;

  $("h1").text(currentQuote).hide()
    .fadeIn(2000);
  $("p").text(currentAuthor).hide()
    .fadeIn(1000);



}

function draw() {


}