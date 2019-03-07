let currentSentence;
let currentSentenceAuthor;
let transformedSentence = ""
let db;

if (annyang) {
  // Let's define our first command. First the text we expect, and then the function it should call
  var commands = {
    'show tps report': function() {
      $('#tpsreport').animate({
        bottom: '-100px'
      });
    }
  };


  // Add our commands to annyang
  annyang.addCommands(commands);

  // Start listening. You can call this here, or attach this call to an event, button, etc.
  annyang.start();

  annyang.addCallback('result', function(whatWasHeardArray) {
    currentSentence = whatWasHeardArray;
    //responsiveVoice.speak("hello");
    transformedSentence = RiTa.similarBySound(currentSentence[0]);

  });
}

function preload() {
  font = loadFont('assets/fonts/SourceSansPro-Regular.otf');
  db = loadJSON('js/data/quotes.json');
}


function setup() {

  //hard coded 103 because I can't get the length of objects for some reason
  currentSentence = db[floor(random(0, 103))].quote;
  currentSentenceAuthor = db[floor(random(0, 103))].name;

  $("h1").text(currentSentence);
  $("p").text(currentSentenceAuthor);


}

function draw() {


}