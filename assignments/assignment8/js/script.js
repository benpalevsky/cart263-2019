let mgr;
let viburFont;
let josenfinFont;
let muzak;

let canvasWidth = 800;
let canvasHeight = 600;

function preload() {
  viburFont = loadFont('assets/Vibur-Regular.ttf');
  josenfinFont = loadFont('assets/JosefinSlab-Regular.ttf');
  soundFormats('mp3', 'ogg', 'wav');
  muzak = loadSound('assets/sounds/muzak.wav');

}

function setup() {

  muzak.loop();

  responsiveVoice.setDefaultVoice("UK English Female");
  createCanvas(800, 600);

  mgr = new SceneManager();

  // Preload scenes. Preloading is normally optional
  // ... but needed if showNextScene() is used.
  mgr.addScene(startMenuScene);
  mgr.addScene(drawYourFaceScene);
  mgr.addScene(sliderYourNameScene);
  mgr.addScene(drawWallsScene);
  mgr.addScene(theGameIsOverScene);
  mgr.showScene(startMenuScene);

}

function draw() {
  mgr.draw();
}

function startMenuScene() {

  let instructionText = '\'Press Start\'';
  let button1;
  let button2;
  let canAdvance = false;
  let bg;

  let spokenString = "Welcome to Bureaucracy Simulator, Please Press Subsection 1A of Start";

  this.setup = function() {
    bg = loadImage("assets/images/bg.png")

    button1 = createButton('Start');
    button1.style("font-family", josenfinFont);
    button1.style("font-size", '32px');
    button1.position(width / 2, height * 3 / 4);
    button1.mousePressed(this.youPressedStart);

  }
  this.draw = function() {
    textAlign(CENTER);
    background(200);
    image(bg, 0, 0);
    fill(100);
    rect(0, 70, 1000, 200);

    fill(255);
    textFont(viburFont);
    textSize(72);
    textAlign(CENTER);
    text('Bureaucracy Simulator', width / 2, height / 4);
    textSize(40);
    textFont(josenfinFont);
    text(instructionText, width / 2, height * 2 / 5);

    if (button2 != null) {
      button2.mousePressed(this.youPressedStar);
    }

  }

  this.youPressedStart = function() {

    instructionText = '\'Press Subsection 1A, of Start\'';
    button2 = createButton('1A');

    button2.position(width / 2, height * 7 / 8);
    if (canAdvance == true) {
      $('button').hide();
      mgr.showScene(drawYourFaceScene);
      spokenString = "All Respectable Bureaucrats need a good face. Please draw yourself some eyes, and a mouth";
    }

    responsiveVoice.speak(spokenString);

  }

  this.youPressedStar = function() {
    spokenString = "Thank you for pressing Subsection 1A of Start. Please Press Start";
    responsiveVoice.speak(spokenString);
    instructionText = '\'Press Start\'';
    canAdvance = true;

  }

}

function drawYourFaceScene() {

  let frame;
  let pencil;
  let checkbox;
  let x_points = [];
  let y_points = [];
  let previous_x_points = [];
  let previous_y_points = [];
  let timerSeconds = 0;
  let spokenString = "All Respectable Bureaucrats need a good face. Can you pencil in a mouth and some eyes?";

  this.setup = function() {
    frame = loadImage('assets/images/frame.png');
    pencil = loadImage('assets/images/pencil.png');

    checkbox = createCheckbox('I confirm that this is my face', false);
    checkbox.position(650, 300);
    checkbox.style("font-family", josenfinFont);
    checkbox.hide();

  }

  this.draw = function() {
    noCursor();
    image(frame, 0, 0);

    if (mouseIsPressed) {
      strokeWeight(0);
      fill(0);
      x_points.push(mouseX);
      y_points.push(mouseY);
      previous_x_points.push(pmouseX);
      previous_y_points.push(pmouseY);

    }

    for (var i = 0; i < x_points.length; i++) {
      strokeWeight(4);
      line(previous_x_points[i], previous_y_points[i], x_points[i], y_points[i]);
      strokeWeight(1);
    }

    image(pencil, mouseX - 20, mouseY - 105);

    if (frameCount % 60 == 0) {
      timerSeconds++;
    }

    if (timerSeconds > 6) {
      checkbox.show();
    }

    if (checkbox.checked()) {
      checkbox.hide();
      mgr.showScene(sliderYourNameScene);
    }

  }

}

function sliderYourNameScene() {

  let slider = [];
  let yourName = "Please Enter your First Name";
  let characters = [];
  let spokenString = "Please use the sliders to enter your first name";
  let button1;
  let form_img;
  let hand_img;

  this.setup = function() {

    form_img = loadImage("assets/images/form1.jpg");
    hand_img = loadImage("assets/images/hand.png");

    for (var i = 0; i < 10; i++) {
      slider[i] = createSlider(0, 26, 0);
      slider[i].position(650, 100 + (i * 20));
      slider[i].style('width', '200px');

    }

    textAlign(CENTER);
    background(200);
    fill('AA00000');
    textFont(viburFont);
    textSize(72);
    textAlign(CENTER);
    responsiveVoice.speak(spokenString);

  }

  this.draw = function() {

    background(200);

    yourName = "";
    for (var i = 0; i < 10; i++) {
      characters[i] = char(slider[i].value() + 64);
      if (characters[i] == "@") {
        yourName += "";
      } else 
        yourName += characters[i];
      }
    
    text(yourName, width / 2, height / 4);

    fill(0);
    image(form_img, 0, 0);
    text(yourName, 450, 70);

    button1 = createButton('I confirm that this is my name');
    button1.style("font-family", josenfinFont);
    button1.style("font-size", '16px');
    button1.position(625, 400);
    button1.mousePressed(this.youConfirmed);

    image(hand_img, mouseX - 75, mouseY - 110);

  }

  this.youConfirmed = function() {
    $('button').hide();
    for (var i = 0; i < 10; i++) {
      slider[i].style('visibility', 'hidden');

    }
    spokenString = "Use red tape to slow this process down";
    responsiveVoice.speak(spokenString);
    mgr.showNextScene(drawWallsScene);

  }

}

function drawWallsScene() {

  let target;
  let topWall;
  let leftWall;
  let rightWall;
  let bottomWall;

  let walls = [];

  let circleA;
  let circleB;

  let agents = [];
  let forces = [];
  let numberOfAgents = 60;

  let spawnAreaWidth = 6;
  let spawnAreaHeight = 10;

  let randomSeed;

  let mouseDownPointX;
  let mouseDownPointY;
  let mouseUpPointX;
  let mouseUpPointY;

  let engine;

  let timerSeconds = 0;

  let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body;

  this.setup = function() {

    randomSeed = random(0, 100000);

    // create an engine
    engine = Engine.create();

    // create two boxes and a ground

    target = Bodies.rectangle(700, 100, 10, 10);

    topWall = Bodies.rectangle(400, 50, 720, 20, {isStatic: true});
    leftWall = Bodies.rectangle(50, 210, 20, 300, {isStatic: true});
    rightWall = Bodies.rectangle(750, 210, 20, 300, {isStatic: true});
    bottomWall = Bodies.rectangle(400, 350, 720, 20, {isStatic: true});

    let row = 0;
    let column = 0;
    let topLeft = 60;

    //really shitty spawn function for actors
    for (var i = 0; i < spawnAreaWidth * spawnAreaHeight; i++) {
      if (i % 6 == 0) 
        row++;
      if (i % 10 == 0) 
        column++;
      forces.push(0);
      agents.push(Bodies.circle(topLeft + (column * 10), 200 + (row * 10), 5));
      World.add(engine.world, [agents[i]]);
    }

    circleA = Bodies.circle(80, 250, 10);
    circleB = Bodies.circle(90, 300, 10);

    let path = Matter.Vector.create(target.position.x - circleA.position.x, target.position.y - circleA.position.y);
    path = Matter.Vector.normalise(path);

    // add all of the bodies to the world
    World.add(engine.world, [
      circleA,
      circleB,
      target,
      topWall,
      leftWall,
      rightWall,
      bottomWall
    ]);

    // run the engine
    Engine.run(engine);

    // run the renderer

    engine.world.gravity.y = 0;
  }
  this.draw = function() {
    fill(0);
    strokeWeight(1);

    if (frameCount % 60 == 0) {
      timerSeconds++;
    }

    background(100);
    if (mouseIsPressed) {
      line(mouseDownPointX, mouseDownPointY, mouseX, mouseY);
    }

    this.renderBody(target, '#00AA00');
    this.renderBody(topWall, 255);
    this.renderBody(leftWall, 255);
    this.renderBody(bottomWall, 255);
    this.renderBody(rightWall, 255);
    this.renderBody(circleA, 255);
    this.renderBody(circleB, 255);

    for (var i = 0; i < walls.length; i++) {
      this.renderBody(walls[i], '#FF0000');
    }

    for (var i = 0; i < agents.length; i++) {
      this.renderBody(agents[i], 255);
      line(agents[i].position.x, agents[i].position.y, agents[i].position.x + (forces[i].x * 5), agents[i].position.y + (forces[i].y * 5));
    }
    //
    this.generateForces();

    if (timerSeconds > 3) {
      this.applyForces();
    }

    if (timerSeconds > 25) {
      mgr.showNextScene(theGameIsOverScene);
    }

  }

  this.renderBody = function(shape, color) {
    var vertices = shape.vertices;
    fill(color);
    beginShape();
    for (var i = 0; i < vertices.length; i++) {
      vertex(vertices[i].x, vertices[i].y);
    }
    endShape();
  }
  this.generateForces = function() {
    for (var i = 0; i < spawnAreaWidth * spawnAreaHeight; i++) {
      forces[i] = (Matter.Vector.create(target.position.x - agents[i].position.x, target.position.y - agents[i].position.y));

      forces[i] = Matter.Vector.normalise(forces[i]);
      //rotate each vector by a random amount
      //this random amt is friggin dope

      //this line. seriously. try no random, random (0,0.5), random(1), random(0,360)
      forces[i] = Matter.Vector.rotate(forces[i], random(0, 0.5));
    }
  }
  this.applyForces = function() {

    for (var i = 0; i < spawnAreaWidth * spawnAreaHeight; i++) {
      //10% chance that each actor will move
      if (random() < 0.1) {
        Body.applyForce(agents[i], {
          x: agents[i].position.x,
          y: agents[i].position.y
        }, {
          x: forces[i].x * 0.00002,
          y: forces[i].y * 0.00002
        });
      }
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

function theGameIsOverScene() {

  let instructionText = '\'Press Start\'';
  let button1;
  let button2;
  let canAdvance = false;
  let bg;
  let timerSeconds = 0;

  let spokenString = "Welcome to Bureaucracy Simulator, Please Press Subsection 1A of Start";

  this.setup = function() {
    background(200);
  }
  this.draw = function() {
    textAlign(CENTER);
    fill(100);
    rect(0, 70, 1000, 220);

    fill(255);
    textFont(viburFont);
    textSize(40);
    textAlign(CENTER);
    text('That\'s enough Bureaucracy for today', width / 2, height / 4);
    text('Why don\'t you take the rest of the day off', width / 2, 2 * height / 5);

    if (frameCount % 60 == 0) {
      timerSeconds++;
    }

    if (timerSeconds > 10) {
      window.location.reload(true);
    }
  }
}
