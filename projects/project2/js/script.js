//proverbs forked from https://github.com/dariusk/corpora/blob/master/data/words/proverbs.json

let db; //proverbs.json
let db_vbz = []; //queried proverbs.json

let proverb1; //our first proverb
let proverb2; //our second proverb

let proverb1_firstVbz; //the first vbz (pos) of the first proverb
let proverb2_vbzIndex; //the index of the vbz we'll use
let proverb2_vbz; //an array of vbz's for proverb2

let part1; //part 1 of our mashup proverb
let part2; //part 2 of our mashup proverb

let mashup_raw; //mashup before some formatting stuff
let mashup_groomed; //mashup after some formatting stuff

let toggle = "mashup-is-showing"; //a toggle to fade in the two proverbs


function preload() {
  //load our database
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
        //and add them to our filtered database;
        db_vbz.push(r);
      }
    }
  }

  genProverb1(); //prepare the first proverb
  genProverb2(); //prepare the second proverb
  combine(); //combine them
  format(); //format the mashup
  displayMashup(); //display the mashup

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


function displayMashup() {
  $("#mashup").text(mashup_groomed).hide()
    .fadeIn(1000);
}

function format() {
  //groom for commas
  mashup_groomed = "";

  //remove commas and brackets
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

  //making a new string with proverb1
  for (var i = 0; i <= proverb1_firstVbz; i++) {
    part1 += proverb1.words()[i] + " ";
  }

  //making a new string with proverb 2
  for (var j = proverb2_vbzIndex + 1; j <= proverb2.words().length - 2; j++) {
    part2 += proverb2.words()[j] + " ";
  }

  //combine our two new strings into a third
  mashup_raw = part1 + part2;
  //convert it to a RiTa String
  mashup_raw = new RiString(mashup_raw);
}


function genProverb1() {
  //find a random proverb
  proverb1 = db_vbz[floor(random(0, db_vbz.length))];

  //find the split point (vbz)
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

  //find a random proverb
  proverb2 = db_vbz[floor(random(0, db_vbz.length))];

  //make sure that the differential in length is significant
  while (abs(proverb2.words().length - proverb1.words().length) < floor(random(0, 5))) {
    proverb2 = db_vbz[floor(random(0, db_vbz.length))];
  }


  //find the split points (sometimes there are more than one)
  for (let i = 0; i < proverb2.words().length; i++) {
    if (proverb2.pos()[i] == 'vbz') {
      proverb2_vbz.push(i);
    }
  }


  //if there's more than one split point, lets flip a coin
  if (random() > 0.5) {
    //if heads, use the last vbz found, to make shorter phrases
    proverb2_vbzIndex = proverb2_vbz[proverb2_vbz.length - 1];
  } else {
    //if tails, use the first vbz found, to make longer phrases
    proverb2_vbzIndex = proverb2_vbz[0];
  }


  //unless its a phrase ender, in which case we need to use the first
  if (proverb2_vbzIndex == proverb2.words().length - 2) {
    proverb2_vbzIndex = proverb2_vbz[0];
  }

  //debug function to log the parts of speech of each sentence
  function showPos() {
    console.log(proverb1.pos());
    console.log(proverb2.pos());
  }
}