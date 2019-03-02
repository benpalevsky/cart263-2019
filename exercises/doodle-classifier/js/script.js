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

const ASPARAGUS = 0;
const BIRDS = 1;
const HATS = 2

function preload() {
  asparagus_data = loadBytes("data/asparagus1000.bin");
  birds_data = loadBytes("data/bird1000.bin");
  hats_data = loadBytes("data/hat1000.bin");
}

function setup() {

  createCanvas(280, 280);
  background(0);

  prepareData(hats, hats_data);
  prepareData(birds, birds_data);
  prepareData(asparagus, asparagus_data);




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

function prepareData(category, data) {
  category.training = [];
  category.testing = [];

  for (let i = 0; i < number_of_images; i++) {
    let offset = i * len;
    let threshold = floor(0.8 * number_of_images);
    if (i < threshold) {
      category.training[i] = data.bytes.subarray(offset, offset + len);
    } else {
      category.testing[i - threshold] = data.bytes.subarray(offset, offset + len);
    }

  }
}