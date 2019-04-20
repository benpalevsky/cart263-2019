let mgr;

let canvasWidth = 800;
let canvasHeight = 600;

let results; //raw data from the trivia API call
let trivia; //the String for the question, parsed from results
let correctAnswer; //the String for the right answer, parsed from results
let incorrectAnswers; //the String for the wrong answer, parsed from results
let answers; //an array of Strings containing incorrectAnswer and correctAnswer
let correctAnswerIndex //index of the correct answer in the answers array

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

function preload() {


}

function setup() {

  createCanvas(800, 600);
  mgr = new SceneManager();
  mgr.addScene(game1);
}

function draw() {
  mgr.draw();
  mgr.showNextScene(game1);
}

renderBody = function(shape, color) {
  var vertices = shape.vertices;
  fill(color);
  beginShape();
  for (var i = 0; i < vertices.length; i++) {
    vertex(vertices[i].x, vertices[i].y);
  }

  endShape();
}

function game1() {


  let player;
  let correctAnswer;
  let incorrectAnswer;

  let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body;

  this.setup = function() {


    // create an engine
    engine = Engine.create();

    ball = Bodies.circle(80, 250, 20);
    cannon = Bodies.circle(90, 300, 20);


    // add all of the bodies to the world
    World.add(engine.world, [
      cannon,
      ball
    ]);

    // run the engine
    Engine.run(engine);

    // run the renderer

    engine.world.gravity.y = 0;
  }
  this.draw = function() {
    background(100)
    fill(0);
    strokeWeight(5);

    renderBody(cannon, '#00AA00');
    renderBody(ball, 255);

  }

  this.handleMouseInput = function() {
    mousePressed = function() {}
  }

  mousePressed = function() {

    if (mgr.scene.fnScene.name == "drawWallsScene") {
      mouseDownPointX = mouseX;
      mouseDownPointY = mouseY;
      line(mouseDownPointX, mouseDownPointY, mouseX, mouseY);
    }

  }

  mouseReleased = function() {
    if (mgr.scene.fnScene.name == "drawWallsScene") {
      mouseUpPointX = mouseX;
      mouseUpPointY = mouseY;

      let distX = mouseUpPointX - mouseDownPointX;
      let distY = mouseUpPointY - mouseDownPointY;

      let dist = sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));

      let angle = Math.atan(distY / distX);
      let r = Bodies.rectangle(mouseDownPointX + (distX / 2), mouseDownPointY + (distY / 2), 20, dist, {isStatic: true});
      Body.rotate(r, (angle + Math.PI / 2));

      walls.push(r)
      World.add(engine.world, r);
    }
  }

}

function getRandomTriviaQuestion(category, difficulty, type) {
  request = $.getJSON('https://opentdb.com/api.php?amount=1&category=' + category + '&difficulty=' + difficulty + '&type=' + type).done(function() {
    results = request.responseJSON.results;

    trivia = decodeEntities(results[0].question);
    correctAnswer = decodeEntities(results[0].correct_answer);
    incorrectAnswers = results[0].incorrect_answers;

    for (var i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswers[0] = decodeEntities(incorrectAnswers[0]);
    }
    correctAnswerIndex = floor(random(0,3));

    answers = [];

    var j = 0;
    for (var i = 0; i < 4; i++) {
      if (i === correctAnswerIndex){
        answers.push(correctAnswer);
      } else {
        answers.push(incorrectAnswers[j]);
        j++;
      }
    }


  });
}

function decodeEntities(encodedString) {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = encodedString;
    return textArea.value;
}
