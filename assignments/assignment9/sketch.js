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
let cannon;
//to apply force
//ball.body.force = {x: 0.1,y: 0.1};
//let people pick their own trivia?
//the games progression can be through the categories
//can even have the same physics game/game for each category so players can get better at iterations
//lets start
//answers should just randomly change
//Simple physics games.
//Constraints
//1. Shapes can only be circles and/or blocks
//2. Games must only have one input (mouse movement and click is considered two)
//3. Games should be intuitive enough to be understood and played on the first go
//4. Will figure out how to make these games into trivia later
//Ideas
//1. Cannon
function setup() {
  // put setup code here.
  palette = [
    [43, 42, 44],
    [235, 237, 182],
    [171, 127, 110],
    [90, 83, 81],
    [220, 188, 108]
  ];
  createCanvas(600, 600);
  strokeWeight(7);
  floor = matter.makeBarrier(width / 2, height, width, 50);
  getRandomPalette();

  cannon = {
    angle: 0,
    dimensions : {x: width/2, y: height/2, height: 120, width: 1},
    show : function(){
      push();
      translate(this.dimensions.x, this.dimensions.y);
      rotate(this.angle);
      rect(0, 0, this.dimensions.width, this.dimensions.height);
      pop();
      if (this.hasFired) this.ball.show();
    },
    hasFired : false,
    update : function(){
      this.angle += 0.01;
      if (keyIsPressed && !this.hasFired){
        this.fire();
        this.hasFired = true;
      }
    },
    fire : function (){
      this.ball = matter.makeBall(width/2, height/2, 80);
      this.ball.body.force = {x: 1 - acos(this.angle), y: asin(this.angle)}
    },
    ball : null
  }


}

function draw() {

  // put the drawing code here
  background(palette[0]);

  stroke(palette[3]);
  fill(palette[1]);
  //floor.show();
  fill(palette[2]);
  //ball.show();
  cannon.update();
  cannon.show();
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

function getRandomTriviaQuestion(category, difficulty, type) {
  request = $.getJSON('https://opentdb.com/api.php?amount=1&category=' + category + '&difficulty=' + difficulty + '&type=' + type).done(function() {
    trivia = request.responseJSON.results[0].question;
    answers = request.responseJSON.results;
    correctAnswer = answers[0].correct_answer;
    incorrectAnswer = answers[0].incorrect_answers;
    trivia = trivia.replace(/&quot;/g, '\"');
    trivia = trivia.replace(/&shy;/g, '-');
    trivia = trivia.replace(/&#039;/g, '\'');
  });
}
