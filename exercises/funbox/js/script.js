/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

// setup()
//
// Description of setup'

let animals = [
  "dog",
  "cat",
  "piece of string",
  "salmon",
  "ursula",
];

var orders = [
  3, 4, 5, 6, 7, 8, 9
]

var sum = 0;

var sum = orders.reduce(function(sum, order) {
  return sum + order;
}, 0)

var sum2 = orders.reduce((sum, order) => sum + order);


// for (var i = 0; i < orders.length; i++) {
//   sum += orders[i];
// }


let isDog = function(animal) {
  return animal != "dog";
}

//map and filter are higher order
//they take a callback function as a parameter
//functions on the array object
var names = animals.map(function(animal) {
  return (animal + " hey")
})

//is the same as
var names2 = animals.map((animal) => {
  return animal + " i'm";
})

//is the same as
var names3 = animals.map((animal => animal + "CAR"));

//is the same as
var names4 = animals.map((x) => x + " whoa");

// for (var i = 0; i < animals.length; i++) {
//   console.log(animals[i])
// }

function setup() {
  var dogs = animals.filter(isDog);
  console.log(dogs);
}


// draw()
//
// Description of draw()

function draw() {

}