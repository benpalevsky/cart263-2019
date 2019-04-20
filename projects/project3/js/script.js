let mgr;

let canvasWidth = 800,
  canvasHeight = 600;

let palette = //color palette variable pulled from an API
    [[43, 42, 44],
    [235, 237, 182],
    [171, 127, 110],
    [90, 83, 81],
    [220, 188, 108]];

let results, //raw data from the trivia API call
    trivia, //the String for the question, parsed from results
    correctAnswer, //the String for the right answer, parsed from results
    incorrectAnswers, //the String for the wrong answer, parsed from results
    answers, //an array of Strings containing incorrectAnswer and correctAnswer
    letters,
    correctAnswerIndex; //index of the correct answer in the answers array

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

function game1() {


  this.setup = function() {


    stroke(palette[1]);
    // create an engine
    engine = Engine.create();

    player = {
      body: Bodies.circle(80, 250, 20),
      x_raw: 0,
      y_raw: 0
    };

    topWall = Bodies.rectangle(400, 50, 720, 20, {isStatic: true});
    leftWall = Bodies.rectangle(50, 210, 20, 300, {isStatic: true});
    rightWall = Bodies.rectangle(750, 210, 20, 300, {isStatic: true});
    bottomWall = Bodies.rectangle(400, 350, 720, 20, {isStatic: true});

    // add all of the bodies to the world
    World.add(engine.world, [
      player.body,
      topWall,
      leftWall,
      rightWall,
      bottomWall
    ]);

    Engine.run(engine); //run the engine

    engine.world.gravity.y = 0;
  }
  this.draw = function() {
    background(palette[2]);
    fill(0);
    strokeWeight(5);
    this.handleInput();
    renderBodies();
  }

  this.handleInput = function() {
    //up
    if (keyIsDown(38) || keyIsDown(87)){
      player.y_raw += 0.01;
    }
    //down
    else if (keyIsDown(40) || keyIsDown (83)){
      player.y_raw -= 0.01;
    }
    //left
    if (keyIsDown(37) || keyIsDown(65)){
      player.x_raw -= 0.01;
    }
    //right
    else if (keyIsDown(39) || keyIsDown (68)){
      player.x_raw += 0.01;
    }
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

function getRandomTriviaQuestion(category, difficulty, type) {
  request = $.getJSON('https://opentdb.com/api.php?amount=1&category=' + category + '&difficulty=' + difficulty + '&type=' + type).done(function() {
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
        letters.push(correctAnswer);
      } else {
        answers.push(incorrectAnswers[j]);
        letters.push(incorrectAnswers[j]);
        j++;
      }
    }
  });
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
