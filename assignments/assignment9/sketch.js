/* This is the start of a simple p5.js sketch using p5-matter.
 Use this as a template for creating your own sketches! */
var ball;
var floor;
let palette;
//to apply force
//ball.body.force = {x: 0.1,y: 0.1};
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
  ball = matter.makeBall(width / 2, 40, 80);
  floor = matter.makeBarrier(width / 2, height, width, 50);
  matter.mouseInteraction(canvas);
  getRandomPalette();
}

function draw() {
  // put the drawing code here
  background(palette[0]);
  stroke(palette[3]);
  fill(palette[1]);
  floor.show();
  fill(palette[2]);
  ball.show();
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

function getRandomTrivia() {}