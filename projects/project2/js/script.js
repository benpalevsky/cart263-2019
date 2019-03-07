let db;
let db_is;
let db_verb;


function preload() {
  font = loadFont('assets/fonts/SourceSansPro-Regular.otf');
  db = loadJSON('js/data/proverbs.json');
}




function setup() {

  for (let i = 0; i < db.proverbs.length; i++) {
    for (let j = 0; j < db.proverbs[i].length; j++) {
      console.log(db.proverbs[i][j]);
    }
  }




  //aesthetics suck
  $("#proverb1").text("An apple a day keeps the doctor away").hide()
    .fadeIn(2000);
  $("#proverb2").text("A penny saved is a penny earned").hide()
    .fadeIn(1000);
  $("#mashup").text("An apple a day is a penny earned").hide()
    .fadeIn(1000);


}

function draw() {


}