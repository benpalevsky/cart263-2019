let db;
let db_vbz = [];


function preload() {
  font = loadFont('assets/fonts/SourceSansPro-Regular.otf');
  db = loadJSON('js/data/proverbs.json');
}




function setup() {


  //lets get all proverbs with vbz (verb 3rd person singular present)
  for (let i = 0; i < Object.keys(db).length - 1; i++) {
    //make a new RiTa String
    let r = new RiString(db[i]);
    //analyze the parts of speech of that string
    let pos = r.pos();

    //loop through the parts of speech and find the word 'is'

    for (let j = 0; j < pos.length; j++) {
      if (pos[j] == 'vbz') {
        db_vbz.push(r);
      }
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