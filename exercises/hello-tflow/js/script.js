/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

// setup()
//
// Description of setup


//tensors have three important properties
//1. values
//2. shape
//3. data-type

function setup() {
  const values = [];
  for (let i = 0; i < 30; i++) {
    values[i] = random(0, 100);
  }

  const shape = [2, 5, 3];
  const tense = tf.tensor3d(values, shape, 'int32');

  //const data = tf.tensor([0, 0, 127.99, 255, 0, 1, 17, 55], [2, 2, 2], 'int32');
  //data.print();

  //print is a nice toString
  tense.print();

  //dataSync actually spits out the data
  console.log(tense.array())

}


// draw()
//
// Description of draw()

function draw() {

}