let mgr;
let loadComplete = false;

let canvasWidth = 800,
  canvasHeight = 600;

let synth, //variable for speech synthesis
    currentSpokenWordIndex = 0, //index of current word
    currentSpokenAnswerIndex = 0; //index of the current answer, be it A: balloon, B: dog, C: cat, D: horse


let palette = //color palette variable pulled from an API
    [[43, 42, 44],
    [235, 237, 182],
    [171, 127, 110],
    [90, 83, 81],
    [220, 188, 108]];

let results, //raw data from the trivia API call
    trivia, //the String for the question, parsed from results
    triviaWords, //an array of words from the trivia question
    correctAnswer, //the String for the right answer, parsed from results
    correctLetter, //the associated letter for the correct answer
    incorrectAnswers, //the String for the wrong answer, parsed from results
    answers, //an array of Strings containing incorrectAnswer and correctAnswer
    letters, //an array of Strings, 'A' 'B' 'C' 'D'
    answerString = "", //one big string of letters and answers
    answerStringWords,
    correctAnswerIndex; //index of the correct answer in the answers array

let onScreenTextSize = 12,
    onScreenText = "";

let rouletteTextOffset = -20;
    rate = 100000000;
    randomIndex = 0;

let state = {
  startPeriod : 0,
  questionPeriod : 0,
  answerPeriod : 0,
  roundPeriod: 0
}

let player,
    letterBlocks;

let Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Body = Matter.Body;


const DIFFICULTY = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard'
}
const TYPE = {
  MULTIPLE: 'multiple',
  BOOLEAN: 'boolean'
}
const CATEGORY = {
  GENERAL_KNOWLEDGE : 9,
  BOOKS: 10,
  FILM: 11,
  MUSIC: 12,
  THEATRE: 13,
  TELEVISION: 14,
  VIDEO_GAMES: 15,
  BOARD_GAMES: 16,
  NATURE: 17,
  COMPUTERS: 18,
  MATH: 19,
  MYTHOLOGY: 20,
  SPORTS: 21,
  GEOGRAPHY: 22,
  HISTORY: 23,
  POLITICS: 24,
  ART: 25,
  CELEBRITIES: 26,
  ANIMALS: 27,
  VEHICLES: 28,
  COMICS: 29,
  GADGETS: 30,
  ANIME: 31,
  CARTOONS: 32
}

$( document ).ready(function() {
    loadComplete = true;
});

function preload() {


}

function setup() {


    createCanvas(canvasWidth, canvasHeight);
    mgr = new SceneManager();
    mgr.addScene(game1);
    synth = new p5.Speech();
    synth.onEnd = function() {
      if (state.questionPeriod == 1) { //length -1 because we don't know how to speak the "?" character
        if (currentSpokenWordIndex < triviaWords.length - 1) {
          currentSpokenWordIndex++;
          onScreenText += triviaWords[currentSpokenWordIndex] + " ";
          synth.speak(triviaWords[currentSpokenWordIndex]);
        } else {
          console.log("2b. Question period ended");
          console.log("3a. Answer period started")
          state.questionPeriod = 0;
          state.answerPeriod = 1;
          currentSpokenWordIndex = 0;
          setTimeout(function() {
            synth.setRate(0.6);
            synth.speak("is it");
            synth.setRate(1);
            onScreenText = "";
            setTextSize((canvasWidth * canvasHeight) / 2, answerString + answerString + answerString + answerString);
          }, 750);
        }
      } else if (state.answerPeriod == 1) {
        if (currentSpokenAnswerIndex < 4) {
          onScreenText += letters[currentSpokenAnswerIndex] + ". " + answers[currentSpokenAnswerIndex] + "\n";
          synth.speak(letters[currentSpokenAnswerIndex] + ". " + answers[currentSpokenAnswerIndex]);
          if (currentSpokenAnswerIndex < 4) currentSpokenAnswerIndex++;
        } else {
          state.answerPeriod = 0;
          state.roundPeriod = 1;
          onScreenText = "";
          console.log("3b. Answer period ended")
          console.log("4a. Round started")
          startRound();
        }
      }
    }
    synth.setRate(2);
  

}

function draw() {
  if (loadComplete) {
    //mgr.draw();
    //mgr.showNextScene(game1);
    background(10, 140, 220);
    textAlign(CENTER);
    textSize(50);
    if ((canvasHeight / 2) + rouletteTextOffset > canvasHeight) {
      randomIndex = floor(random(0, Object.keys(CATEGORY).length));
      text(Object.keys(CATEGORY)[randomIndex], canvasWidth / 2, canvasHeight / 4 + 20);
      rouletteTextOffset = 0;
      rate /= 2;
    } else {
      text(Object.keys(CATEGORY)[randomIndex], canvasWidth / 2, canvasHeight / 4 + rouletteTextOffset);
    }
    rouletteTextOffset += rate;
  }
}

function game1() {


  this.setup = function() {
    console.log("1a. I've started");
    state.startPeriod = 1;

    getRandomTriviaQuestion(CATEGORY.CELEBRITIES, DIFFICULTY.HARD, TYPE.MULTIPLE);

    // create an engine
    engine = Engine.create();

    player = {
      body: Bodies.circle(80, 250, 20),
      x_raw: 0,
      y_raw: 0
    };

    createWalls();

    // add all of the bodies to the world
    World.add(engine.world, [
      player.body
    ]);

    Engine.run(engine); //run the engine

    engine.world.gravity.y = 0;

  }
  this.draw = function() {


    background(palette[2]);

    textAlign(CENTER);
    strokeWeight(5);
    this.handleInput();
    this.updatePhysics();
    stroke(palette[1]);
    renderBodies();
    fill(palette[3]);
    stroke(palette[0]);
    text(onScreenText, 10, 40, canvasWidth, canvasHeight);


    if (state.roundPeriod === 1){



      //do a bunch of things with our letters
      for (var i = 0; i < letterBlocks.length; i++) {

        push();
        textSize(12);
        translate(letterBlocks[i].body.position.x, letterBlocks[i].body.position.y);
        rotate(letterBlocks[i].body.angle);
        text(answers[i], letterBlocks[i].body.circleRadius, letterBlocks[i].body.circleRadius);
        textSize(36);
        text(letters[i], 0, 0);
        pop();


        var collision = Matter.SAT.collides(player.body, letterBlocks[i].body);
        if (collision.collided){
          if (letterBlocks[i].winner === true){
            console.log("4b: round ended - selection is right");
          }
          if (letterBlocks[i].winner === false){
          console.log("4b: round ended - selection is wrong");
          }
        }
      }
    }
  }



  this.handleInput = function() {
    //up
    if (keyIsDown(38) || keyIsDown(87)){
      player.y_raw -= 0.0001;
    }
    //down
    else if (keyIsDown(40) || keyIsDown (83)){
      player.y_raw += 0.0001;
    }
    //neither
    else {
      player.y_raw = 0;
    }

    //left
    if (keyIsDown(37) || keyIsDown(65)){
      player.x_raw -= 0.0001;
    }
    //right
    else if (keyIsDown(39) || keyIsDown (68)){
      player.x_raw += 0.0001;
    }

    else {
      player.x_raw = 0;
    }
  }

  this.updatePhysics = function(){
    player.body.force = {x: player.x_raw, y: player.y_raw};
  }

}

function startRound(){


  letterBlocks = [];
  for (var i = 0; i < answers.length; i++) {

    letterBlocks.push({
        body: Bodies.circle(random(0, canvasWidth), random(0, canvasHeight), 20, {isStatic: false}),
        text: answers[i],
        letter: letters[i],
        winner: (letters[i] === correctLetter)
      }
    )

    World.add(engine.world, [
      letterBlocks[i].body
    ]);
  }
}




function renderBodies(){
  for (var i = 0; i < engine.world.bodies.length; i++) {
    renderBody(engine.world.bodies[i], palette[0]);
  }
}

function renderBody(shape, color) {
  var vertices = shape.vertices;
  fill(color);
  beginShape();
  for (var i = 0; i < vertices.length; i++) {
    vertex(vertices[i].x, vertices[i].y);
  }

  endShape();
}

function createWalls(){

  topWall = Bodies.rectangle(0, 0, canvasWidth * 2, 20, {isStatic: true});
  leftWall = Bodies.rectangle(0, 0, 20, canvasHeight * 2, {isStatic: true});
  rightWall = Bodies.rectangle(canvasWidth, 0, 20, canvasHeight * 2, {isStatic: true});
  bottomWall = Bodies.rectangle(0, canvasHeight, canvasWidth * 2, 20, {isStatic: true});

  World.add(engine.world, [
    topWall,
    leftWall,
    rightWall,
    bottomWall
  ]);

}

function getRandomTriviaQuestion(category, difficulty, type) {
  request = $.getJSON('https://opentdb.com/api.php?amount=1&category=' + category + '&difficulty=' + difficulty + '&type=' + type).done(function() {
    console.log("1b. Start period ended");
    state.startPeriod = 0;
    console.log("2a. Question period started");
    state.questionPeriod = 1;
    results = request.responseJSON.results;
    trivia = decodeEntities(results[0].question);
    correctAnswer = decodeEntities(results[0].correct_answer);
    incorrectAnswers = results[0].incorrect_answers;

    for (var i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswers[i] = decodeEntities(incorrectAnswers[i ]);
    }
    correctAnswerIndex = floor(random(0,3));

    answers = [];
    letters = [];

    var j = 0;
    for (var i = 0; i < 4; i++) {
      if (i === correctAnswerIndex){
        answers.push(correctAnswer);
        letters.push(String.fromCharCode(65+i));
        correctLetter = String.fromCharCode(65+i);
      } else {
        answers.push(incorrectAnswers[j]);
        letters.push(String.fromCharCode(65+i));
        j++;
      }
    }

    for (var i = 0; i < answers.length; i++) {
      answerString += letters[i] + ". " + answers[i] + " \n";
    }

    setTextSize((canvasWidth * canvasHeight) / 2, trivia);
    splitText();

    onScreenText = triviaWords[0] + " ";
    synth.speak(onScreenText);

  });
}

function setTextSize(area, text){
  while (textWidth(text) * textSize(text) < area / 2){
    onScreenTextSize+=10;
    textSize(onScreenTextSize);
  }
}

function splitText(){
  triviaWords = split(trivia, " ");
  answerStringWords = split(answerString, " ");
}

//credit to this thread
//https://stackoverflow.com/questions/3700326/decode-amp-back-to-in-javascript
function decodeEntities(encodedString) {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = encodedString;
    return textArea.value;
}


function getRandomPalette() {
  var url = "http://colormind.io/api/";
  var data = {
    model: "default",
  }
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (http.readyState == 4 && http.status == 200) {
      palette = JSON.parse(http.responseText).result;
    }
  }
  http.open("POST", url, true);
  http.send(JSON.stringify(data));
}
