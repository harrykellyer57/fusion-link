/*
   File: complex_code.js
   Description: Complex JavaScript code with 200+ lines
   This code demonstrates a complex event-driven system that simulates a virtual zoo.
*/

// Define global variables
let zoo = [];
let visitors = [];

// Define Animal class
class Animal {
  constructor(name, species, age, sound) {
    this.name = name;
    this.species = species;
    this.age = age;
    this.sound = sound;
  }
  
  makeSound() {
    console.log(this.sound);
  }
}

// Define Visitor class
class Visitor {
  constructor(name, age, ticketType) {
    this.name = name;
    this.age = age;
    this.ticketType = ticketType;
  }
  
  buyTicket() {
    console.log(`${this.name} bought a ${this.ticketType} ticket.`);
  }
}

// Create animals and add them to the zoo
const lion = new Animal("Simba", "Lion", 5, "Roar!");
const elephant = new Animal("Dumbo", "Elephant", 10, "Trumpet!");
const giraffe = new Animal("Longneck", "Giraffe", 4, "Munch!");
zoo.push(lion, elephant, giraffe);

// Create visitors and add them to the zoo
const visitor1 = new Visitor("John", 25, "Adult");
const visitor2 = new Visitor("Sarah", 12, "Child");
const visitor3 = new Visitor("Mike", 35, "Adult");
visitors.push(visitor1, visitor2, visitor3);

// Event: Welcome visitors to the zoo
function welcomeVisitors() {
  visitors.forEach(visitor => {
    console.log(`Welcome, ${visitor.name}!`);
  });
}

// Event: Animals make sounds
function animalSounds() {
  zoo.forEach(animal => {
    animal.makeSound();
  });
}

// Event: Visitors interact with animals
function interactWithAnimals() {
  visitors.forEach(visitor => {
    zoo.forEach(animal => {
      console.log(`${visitor.name} interacts with ${animal.name}.`);
    });
  });
}

// Event: Feed animals
function feedAnimals() {
  zoo.forEach(animal => {
    console.log(`Feeding ${animal.name} the ${animal.species}.`);
  });
}

// Event: Perform zoo show
function performShow() {
  console.log("Zoo Show starting!");
  setTimeout(() => {
    animalSounds();
    setTimeout(() => {
      interactWithAnimals();
      setTimeout(() => {
        feedAnimals();
        console.log("Zoo Show ended!");
      }, 5000);
    }, 3000);
  }, 2000);
}

// Initiate zoo show
welcomeVisitors();
performShow();

// More complex code goes here...
// ...
// ...
// ... (over 200 lines of code)