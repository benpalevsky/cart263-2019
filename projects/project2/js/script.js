let db;
let db_vbz = [];

let proverb1;
let proverb2;

let proverb1_firstVbz;
let proverb2_vbzIndex;
let proverb2_vbz;

let part1;
let part2;

let mashup_raw;
let mashup_groomed;

let toggle = "mashup-is-showing";


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

  genProverb1();
  genProverb2();
  combine();
  format();
  displayMashup();

}

function draw() {


}


//should probably remove p5js from this project
function mouseClicked() {


  if (
    toggle == "mashup-is-showing") {
    setAndFadeInProverbs();
    toggle = "mashup-is-hidden";
  } else {
    toggle = "mashup-is-showing";
    hideProverbs();
    genProverb1();
    genProverb2();
    combine();
    format();
    displayMashup();
  }


}

function setAndFadeInProverbs() {

  $("#proverb1").text(proverb1.text()).hide()
    .fadeIn(2000);
  $("#proverb2").text(proverb2.text()).hide()
    .fadeIn(1000);
}

function hideProverbs() {

  $("#proverb1").hide();
  $("#proverb2").hide();

}

function showPos() {
  console.log(proverb1.pos());
  console.log(proverb2.pos());
}

function displayMashup() {
  $("#mashup").text(mashup_groomed).hide()
    .fadeIn(1000);
}

function format() {
  //groom for commas
  mashup_groomed = "";

  for (var i = 0; i < mashup_raw.words().length; i++) {
    if (mashup_raw.words()[i] != "," && mashup_raw.words()[i] != "(" && mashup_raw.words()[i] != ")")
      mashup_groomed += mashup_raw.words()[i] + " ";
  }

}

function combine() {
  //preliminary mashup
  mashup_raw = "";
  part1 = "";
  part2 = "";

  for (var i = 0; i <= proverb1_firstVbz; i++) {
    part1 += proverb1.words()[i] + " ";
  }

  for (var j = proverb2_vbzIndex + 1; j <= proverb2.words().length - 2; j++) {
    part2 += proverb2.words()[j] + " ";
  }

  mashup_raw = part1 + part2;
  mashup_raw = new RiString(mashup_raw);
}

function genProverb1() {
  proverb1 = db_vbz[floor(random(0, db_vbz.length))];

  //find the split points
  for (let i = 0; i < proverb1.words().length; i++) {
    if (proverb1.pos()[i] == 'vbz') {
      proverb1_firstVbz = i;
      if (proverb1.pos()[i + 1] == ',') {
        proverb1_firstVbz = i;
      }
      break;
    }
  }
}

function genProverb2() {
  proverb2_vbz = [];

  proverb2 = db_vbz[floor(random(0, db_vbz.length))];

  //make sure that the differential in length is significant
  while (abs(proverb2.words().length - proverb1.words().length) < 4) {
    proverb2 = db_vbz[floor(random(0, db_vbz.length))];
  }


  //find the split points
  for (let i = 0; i < proverb2.words().length; i++) {
    //take the last vbz
    if (proverb2.pos()[i] == 'vbz') {
      proverb2_vbz.push(i);
    }
  }

  //lets use the last vbz found, to make shorter phrases
  proverb2_vbzIndex = proverb2_vbz[proverb2_vbz.length - 1];

  //unless its a phrase ender, in which case we need to use the first
  if (proverb2_vbzIndex == proverb2.words().length - 2) {
    proverb2_vbzIndex = proverb2_vbz[0];
  }
}