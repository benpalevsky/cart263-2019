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

    transformedSentence = new RiString(spokenSentence);
    let partsOfSentence = transformedSentence.pos();
    console.log(partsOfSentence);
    let newSentence = "";
    for (var i = 0; i < partsOfSentence.length; i++) {
      if (partsOfSentence[i] == 'nn') {
        newSentence += (RiTa.randomWord('nn') + " ");
      } else if (partsOfSentence[i] == 'nns') {
        newSentence += (RiTa.randomWord('nns') + " ");
      } else if (partsOfSentence[i] == 'vb') {
        newSentence += (RiTa.randomWord('vb') + " ");
      } else if (partsOfSentence[i] == 'vbd') {
        newSentence += (RiTa.randomWord('vbd') + " ");
      } else {
        newSentence += transformedSentence.words()[i] + " ";
      }
    }
    transformedSentence = newSentence;






  });
}

function preload() {
  font = loadFont('assets/fonts/SourceSansPro-Regular.otf');
  db = loadJSON('js/data/quotes.json');
}


function setup() {

  //hard coded 103 because I can't get the length of objects for some reason
  let index = floor(random(0, 103))
  currentQuote = db[index].quote;
  currentAuthor = db[index].name;

  $("h1").text(currentAuthor).hide()
    .fadeIn(2000);
  $("p").text(currentQuote).hide()
    .fadeIn(1000);



}

function draw() {


}