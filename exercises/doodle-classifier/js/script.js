/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

// setup()
//
// Description of setup

const len = 784;
const number_of_images = 1000;

let asparagus_data;
let birds_data;
let hats_data;

let asparagus = {};
let birds = {};
let hats = {};

const ASPARAGUS = 2;
const BIRDS = 1;
const HATS = 0;

let nn;

let training = [];
let testing = [];



function preload() {
  asparagus_data = loadBytes("data/asparagus1000.bin");
  birds_data = loadBytes("data/bird1000.bin");
  hats_data = loadBytes("data/hat1000.bin");
}

function setup() {

  createCanvas(280, 280);
  background(255);

  // Preparing the data
  prepareData(hats, hats_data, HATS);
  prepareData(birds, birds_data, BIRDS);
  prepareData(asparagus, asparagus_data, ASPARAGUS);

  // Making the neural network
  nn = new NeuralNetwork(784, 64, 3);

  // Randomizing the data
  training = training.concat(hats.training);
  training = training.concat(birds.training);
  training = training.concat(asparagus.training);

  testing = testing.concat(hats.testing);
  testing = testing.concat(birds.testing);
  testing = testing.concat(asparagus.testing);

  let trainButton = select('#train');
  let epochCounter = 0;


  trainButton.mousePressed(function() {
    trainEpoch();
    epochCounter++;
    console.log("Epoch: " + epochCounter);
  });

  let testButton = select('#test');

  testButton.mousePressed(function() {
    let percent = testAll();
    console.log("Percent: " + nf(percent, 2, 2) + "%");
  });

  let guessButton = select('#guess');
  guessButton.mousePressed(function() {

    let inputs = [];
    //just grabs all the pixels of the image
    let img = get();
    img.resize(28, 28);
    img.loadPixels();
    for (let i = 0; i < len; i++) {
      let bright = img.pixels[i * 4];
      inputs[i] = (255 - bright) / 255.0;
    }
    let guess = nn.predict(inputs);
    let m = max(guess);
    let classification = guess.indexOf(m);
    if (classification === HATS) {
      console.log("hat");
    } else if (classification === ASPARAGUS) {
      console.log("asparagus");
    } else if (classification === BIRDS) {
      console.log("bird");
    }

  })

  let clearButton = select('#clear');
  clearButton.mousePressed(function() {
    background(255);
  })






  //script for seeing the hats
  // let total = 100;
  // for (let n = 0; n < total; n++) {
  //   let img = createImage(28, 28);
  //   img.loadPixels();
  //   let offset = n * 784;
  //   for (let i = 0; i < 784; i++) {
  //     let val = 255 - hats_data.bytes[i + offset];
  //     img.pixels[i * 4 + 0] = val;
  //     img.pixels[i * 4 + 1] = val;
  //     img.pixels[i * 4 + 2] = val;
  //     img.pixels[i * 4 + 3] = 255;
  //   }
  //   img.updatePixels();
  //   let x = 28 * (n % 10);
  //   let y = 28 * floor(n / 10);
  //   image(img, x, y);
  // }

}

function trainEpoch() {
  shuffle(training, true);

  // train for one epoch (ie, one whole traversal of training)
  for (let i = 0; i < training.length; i++) {
    let data = training[i];
    let inputs = data.map(x => x / 255);

    // this is where the label vector is ordered
    let label = training[i].label;
    let targets = [0, 0, 0];
    targets[label] = 1;

    nn.train(inputs, targets);
  }
}

function testAll() {

  shuffle(testing, true);
  let correct = 0;
  // train for one epoch (ie, one whole traversal of training)
  for (let i = 0; i < testing.length; i++) {
    let data = testing[i];
    let inputs = Array.from(data).map(x => x / 255);
    let label = testing[i].label;
    let guess = nn.predict(inputs);

    let m = max(guess);
    let classification = guess.indexOf(m);

    // console.log(guess);
    // console.log(classification);
    // console.log(label);


    if (classification === label) {
      correct++;
    }
  }

  let percent = (correct / testing.length) * 100;
  return percent;

}

function prepareData(category, data, label) {
  category.training = [];
  category.testing = [];

  for (let i = 0; i < number_of_images; i++) {
    let offset = i * len;
    let threshold = floor(0.8 * number_of_images);
    if (i < threshold) {
      category.training[i] = data.bytes.subarray(offset, offset + len);
      category.training[i].label = label;
    } else {
      category.testing[i - threshold] = data.bytes.subarray(offset, offset + len);
      category.testing[i - threshold].label = label;

    }

  }
}


function draw() {
  strokeWeight(10);
  stroke(0);
  if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }

}