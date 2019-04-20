let mgr;

let canvasWidth = 800;
let canvasHeight = 600;

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
    trivia = request.responseJSON.results[0].question;
    answers = request.responseJSON.results;
    correctAnswer = answers[0].correct_answer;
    incorrectAnswer = answers[0].incorrect_answers;
    trivia = trivia.replace(/&quot;/g, '\"');
    trivia = trivia.replace(/&#039;/g, '\'');
    trivia = trivia.replace(/&shy;/g, '-');
  });
}
