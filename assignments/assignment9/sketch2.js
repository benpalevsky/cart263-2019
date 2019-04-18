/* This is the start of a simple p5.js sketch using p5-matter.
 Use this as a template for creating your own sketches! */
var ball;
var floor;
let palette;
let trivia;
let correctAnswer;
let wrongAnswers;
const DIFFICULTY = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard'
}
const TYPE = {
  MULTIPLE: 'multiple',
  BOOLEAN: 'boolean'
}
const category = {}
let barriers = [];
let correctIndex;
//to apply force
//ball.body.force = {x: 0.1,y: 0.1};
//let people pick their own trivia?
//the games progression can be through the categories
//can even have the same physics game/game for each category so players can get better at iterations
//lets start
//answers should just randomly change
function setup() {
  // put setup code here.
  palette = [
    [43, 42, 44],
    [235, 237, 182],
    [171, 127, 110],
    [90, 83, 81],
    [220, 188, 108]
  ];
  trivia = "";
  correctAnswer = "";
  incorrectAnswer = ["", "", ""];
  createCanvas(600, 600);
  strokeWeight(7);
  ball = matter.makeBall(width / 2, 40, 80);
  floor = matter.makeBarrier(width / 2, height, width, 50);
  for (var i = 0; i < 3; i++) {
    barriers.push(matter.makeBarrier((width / 4) * (i + 1), height, 50, 100));
  }
  matter.mouseInteraction(canvas);
  getRandomPalette();
  getRandomTriviaQuestion(9, DIFFICULTY.EASY, TYPE.MULTIPLE);
  correctIndex = Math.floor(random(0, 4));
}

function draw() {
  // put the drawing code here
  background(palette[0]);
  stroke(palette[3]);
  fill(palette[1]);
  floor.show();
  textAlign(CENTER);
  textSize(32);
  text(trivia, 0, height / 16, width, height);
  for (var i = 0; i < barriers.length; i++) {
    barriers[i].show();
  }
  let j = 0;
  for (var i = 0; i < 4; i++) {
    textSize(16);
    textAlign(CENTER);
    if (i === correctIndex) {
      text(correctAnswer, ((width / 4) * i) - 20, height - height / 8, 200, 200);
    } else {
      text(incorrectAnswer[j], ((width / 4) * i) - 20, height - height / 8, 200, 200);
      j++;
    }
  }
  fill(palette[2]);
  ball.show();
  strokeWeight(0);
}

function initializePalette() {}

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

function getRandomTriviaQuestion(category, difficulty, type) {
  request = $.getJSON('https://opentdb.com/api.php?amount=1&category=' + category + '&difficulty=' + difficulty + '&type=' + type).done(function() {
    trivia = request.responseJSON.results[0].question;
    answers = request.responseJSON.results;
    correctAnswer = answers[0].correct_answer;
    incorrectAnswer = answers[0].incorrect_answers;
    trivia = trivia.replace(/&quot;/g, '\"');
    trivia = trivia.replace(/&#039;/g, '\'');
    trivia = trivia.replace(/&shy;/g, '-');
  });
}