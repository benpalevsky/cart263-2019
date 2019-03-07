let db;
let db_vbz = [];

let proverb1;
let proverb2;

let splitPoint;
let mashup;


function preload() {
  font = loadFont('assets/fonts/SourceSansPro-Regular.otf');

  //need to find the source for this
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

  proverb1 = db_vbz[floor(random(0, db_vbz.length))];
  proverb2 = db_vbz[floor(random(0, db_vbz.length))];
  console.log(proverb1);
  console.log(proverb2);


  //find the split point

  for (let i = 0; i < proverb1.words().length; i++) {
    if (proverb1.pos()[i] == 'vbz') {
      splitPoint = i;
      console.log("split at index: " + splitPoint);
      break;
    }
  }


  //preliminary mashup
  mashup = ""

  for (var i = 0; i <= splitPoint; i++) {
    mashup += proverb1.words()[i] + " ";
    console.log(mashup);
  }

  for (var j = splitPoint + 1; j <= proverb2.words().length - 2; j++) {
    mashup += proverb2.words()[j] + " ";
    console.log(mashup);
  }

  mashup += ".";




  //aesthetics suck
  $("#proverb1").text(proverb1.text()).hide()
    .fadeIn(2000);
  $("#proverb2").text(proverb2.text()).hide()
    .fadeIn(1000);
  $("#mashup").text(mashup).hide()
    .fadeIn(1000);


}

function draw() {


}