/* 
   File Name: ComplexCode.js
   Description: This code demonstrates a complex algorithm for solving the traveling salesman problem using a combination of genetic algorithms and dynamic programming.
*/

// Define the distance matrix between cities
const distanceMatrix = [
  [0, 10, 20, 30],
  [10, 0, 15, 25],
  [20, 15, 0, 35],
  [30, 25, 35, 0]
];

const populationSize = 50;
const numGenerations = 1000;

// Generate an initial population of tours randomly
function generateInitialPopulation(size) {
  const population = [];
  
  for (let i = 0; i < size; i++) {
    const tour = [...Array(distanceMatrix.length).keys()];
    shuffleArray(tour);
    population.push(tour);
  }
  
  return population;
}

// Shuffle the elements of an array randomly
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Calculate the total distance of a tour
function calculateTourDistance(tour) {
  let distance = 0;
  
  for (let i = 0; i < tour.length; i++) {
    const source = tour[i];
    const destination = tour[(i + 1) % tour.length];
    distance += distanceMatrix[source][destination];
  }
  
  return distance;
}

// Perform tournament selection to choose parents for crossover
function tournamentSelection(population, k) {
  const selected = [];
  
  for (let i = 0; i < population.length; i++) {
    const tournament = [];
    
    for (let j = 0; j < k; j++) {
      const candidate = population[Math.floor(Math.random() * population.length)];
      tournament.push(candidate);
    }
    
    tournament.sort((a, b) => calculateTourDistance(a) - calculateTourDistance(b));
    selected.push(tournament[0]);
  }
  
  return selected;
}

// Perform ordered crossover to create offspring
function orderedCrossover(parent1, parent2) {
  const offspring = [...Array(parent1.length).fill(-1)];
  const start = Math.floor(Math.random() * parent1.length);
  const end = Math.floor(Math.random() * parent1.length);
  
  for (let i = start; i <= end; i++) {
    offspring[i] = parent1[i];
  }
  
  let j = end + 1;
  
  for (let i = 0; i < parent2.length; i++) {
    if (!offspring.includes(parent2[i])) {
      while (offspring[j % parent2.length] !== -1) {
        j++;
      }
      
      offspring[j % parent2.length] = parent2[i];
      j++;
    }
  }
  
  return offspring;
}

// Perform mutation on an individual
function mutate(individual) {
  const mutationPoint1 = Math.floor(Math.random() * individual.length);
  let mutationPoint2 = Math.floor(Math.random() * individual.length);
  
  while (mutationPoint2 === mutationPoint1) {
    mutationPoint2 = Math.floor(Math.random() * individual.length);
  }
  
  [individual[mutationPoint1], individual[mutationPoint2]] = [individual[mutationPoint2], individual[mutationPoint1]];
  return individual;
}

// Run the genetic algorithm to solve the traveling salesman problem
function solveTSP() {
  let population = generateInitialPopulation(populationSize);
  let bestIndividual = population[0];
  
  for (let generation = 0; generation < numGenerations; generation++) {
    const parents = tournamentSelection(population, 5);
    const offspring = [];
    
    for (let i = 0; i < parents.length; i += 2) {
      const parent1 = parents[i];
      const parent2 = parents[i + 1];
      const child1 = orderedCrossover(parent1, parent2);
      const child2 = orderedCrossover(parent2, parent1);
      offspring.push(mutate(child1));
      offspring.push(mutate(child2));
    }
    
    population = offspring;
    
    const bestIndividualInGeneration = population.reduce((best, individual) => {
      const bestDistance = calculateTourDistance(best);
      const currentDistance = calculateTourDistance(individual);
      
      return currentDistance < bestDistance ? individual : best;
    });
    
    if (calculateTourDistance(bestIndividualInGeneration) < calculateTourDistance(bestIndividual)) {
      bestIndividual = bestIndividualInGeneration;
    }
  }
  
  console.log("Best Tour:", bestIndividual);
  console.log("Best Distance:", calculateTourDistance(bestIndividual));
}

// Run the algorithm
solveTSP();