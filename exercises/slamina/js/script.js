/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

let animals = [
  "aardvark",
  "alligator",
  "alpaca",
  "antelope",
  "ape",
  "armadillo",
  "baboon",
  "badger",
  "bat",
  "bear",
  "beaver",
  "bison",
  "boar",
  "buffalo",
  "bull",
  "camel",
  "canary",
  "capybara",
  "cat",
  "chameleon",
  "cheetah",
  "chimpanzee",
  "chinchilla",
  "chipmunk",
  "cougar",
  "cow",
  "coyote",
  "crocodile",
  "crow",
  "deer",
  "dingo",
  "dog",
  "donkey",
  "dromedary",
  "elephant",
  "elk",
  "ewe",
  "ferret",
  "finch",
  "fish",
  "fox",
  "frog",
  "gazelle",
  "gila monster",
  "giraffe",
  "gnu",
  "goat",
  "gopher",
  "gorilla",
  "grizzly bear",
  "ground hog",
  "guinea pig",
  "hamster",
  "hedgehog",
  "hippopotamus",
  "hog",
  "horse",
  "hyena",
  "ibex",
  "iguana",
  "impala",
  "jackal",
  "jaguar",
  "kangaroo",
  "koala",
  "lamb",
  "lemur",
  "leopard",
  "lion",
  "lizard",
  "llama",
  "lynx",
  "mandrill",
  "marmoset",
  "mink",
  "mole",
  "mongoose",
  "monkey",
  "moose",
  "mountain goat",
  "mouse",
  "mule",
  "muskrat",
  "mustang",
  "mynah bird",
  "newt",
  "ocelot",
  "opossum",
  "orangutan",
  "oryx",
  "otter",
  "ox",
  "panda",
  "panther",
  "parakeet",
  "parrot",
  "pig",
  "platypus",
  "polar bear",
  "porcupine",
  "porpoise",
  "prairie dog",
  "puma",
  "rabbit",
  "raccoon",
  "ram",
  "rat",
  "reindeer",
  "reptile",
  "rhinoceros",
  "salamander",
  "seal",
  "sheep",
  "shrew",
  "silver fox",
  "skunk",
  "sloth",
  "snake",
  "squirrel",
  "tapir",
  "tiger",
  "toad",
  "turtle",
  "walrus",
  "warthog",
  "weasel",
  "whale",
  "wildcat",
  "wolf",
  "wolverine",
  "wombat",
  "woodchuck",
  "yak",
  "zebra"
];

let answers = [];
let correctAnimal;
const NUM_OPTIONS = 5;

let options = {
  rate: Math.random(),
  rate: Math.random()
};

$(document).ready(setup);



function setup() {

  $("#ClickToBegin").click(function() {
    $("#ClickToBegin").remove();
    startGame();
  });
}

function startGame() {
  newRound();
}

//the buttons also have the logic for the animals in them
function addButton(label) {

  let $guess = $('<div class = guess></div>');
  $guess.text(label);
  $guess.button();
  $guess.on('click', function() {
    if ($(this).text() === correctAnimal) {
      console.log("Correct!");
      $('.guess').remove();
      setTimeout(newRound, 3000);
    } else {
      console.log("Wrong!");
      $(this).effect("shake");
      speakAnimal(correctAnimal);
    }
  });

  //this is what actually renders the button to the page
  $('body').append($guess);
}

function newRound() {
  answers = [];

  for (i = 0; i < NUM_OPTIONS; i++) {
    let currentAnimal = animals[Math.floor((Math.random() * animals.length))];
    addButton(currentAnimal);
    answers.push(currentAnimal);

    correctAnimal = answers[Math.floor((Math.random() * answers.length))];
  }

  speakAnimal(correctAnimal);

}

function speakAnimal(animal) {
  let reverseAnimal = animal.split('').reverse().join('');
  responsiveVoice.speak(reverseAnimal, "UK English Male", options);
}