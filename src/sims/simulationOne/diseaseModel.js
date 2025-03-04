import { shufflePopulation } from "../../lib/shufflePopulation";

/* Update this code to simulate a simple disease model! */

/* For this simulation, let's consider a simple disease that spreads through contact.
You can implement a simple model which does one of the following:

1. Model the different effects of different numbers of contacts: in my Handshake Model, two people are in 
   contact each round. What happens if you put three people in contact? Four? Five? Consider different options
   such as always putting people in contact with the people "next" to them (i.e. the people before or after them
   in line) or randomly selecting people to be in contact (just do one of these for your model).

2. Take the "handshake" simulation code as your model, but make it so you can recover from the disease. How does the
spread of the disease change when you set people to recover after a set number of days.

3. Add a "quarantine" percentage to the handshake model: if a person is infected, they have a chance of being quarantined
and not interacting with others in each round.

*/

/**
 * Authors: Chanya + Sheba 
 * 
 * What we are simulating: Disease Spread Model of Common cold
 * 
 * What elements we have to add: Death rate
 * In plain language, what our model does do? :
 *:   Instructions for the Common Cold Infection Game

1. Two People in Contact (Basic Handshake Model):
In each round of the simulation, we start with two individuals in contact, and if one person is infected, they have a chance to infect the other person in contact. This simulates a basic handshake model.
2. After each round, a pair of 2 individuals are added to the game to increase the odds of survival.
3. Death Rate Counter
Tracking a death rate that increases every time an infected person "dies." The death could happen after a certain number of rounds or based on a random chance during the disease's progression.

 *  - 50% death probabilty
    - skull emoji to represent dead (💀)
 */

    export const defaultSimulationParameters = {
      infectionChance: 50,
  deathRate: 0.10 // chance of death for infected
};

    
// Modify the individual object to include the "dead" property
export const createPopulation = (size = 1600) => {
  const population = [];
  const sideSize = Math.sqrt(size);
  for (let i = 0; i < size; i++) {
    population.push({
      id: i,
      x: (100 * (i % sideSize)) / sideSize, // X-coordinate within 100 units
      y: (100 * Math.floor(i / sideSize)) / sideSize, // Y-coordinate scaled similarly
      infected: false,
      dead: null, // Initially, no one is dead
    });
  }
  // Infect patient zero...
  let patientZero = population[Math.floor(Math.random() * size)];
  patientZero.infected = true;
  return population;
};

// Update the individual, adding the death check based on a 50% chance
const updateIndividual = (person, contact, params) => {
  if (person.infected) {
    // If they were already infected, they are no longer
    // newly infected :)
    person.newlyInfected = false;
  }
  if (contact.infected) {
    if (Math.random() * 100 < params.infectionChance) {
      if (!person.infected) {
        person.newlyInfected = true;
      }
      person.infected = true;
    }
  }

    if (Math.random() * 100 < 50) {
      person.dead = '💀'; // Mark person as dead with a skull emoji
    }
  }

  // Add infection logic (already existing logic)
  if (contact.infected && !person.infected && !person.dead) {
    if (Math.random() * 100 < params.infectionChance) {
      person.infected = true;
      person.newlyInfected = true;
    }
  }
;

// Update the population each round and apply the death and infection logic
export const updatePopulation = (population, params) => {
  for (let i = 0; i < population.length; i++) {
    let p = population[i];
    let contact = population[(i + 1) % population.length]; // Example contact logic
    updateIndividual(p, contact, params);
  }
  return population;
};

// Add "Total Deaths" to tracked stats
export const trackedStats = [
  { label: "Total Infected", value: "infected" },
  { label: "Total Deaths", value: "dead" }, // Track total deaths
];
// Compute the statistics including deaths
export const computeStatistics = (population, round) => {
  let infected = 0;
  let newlyInfected = 0;
  let totalDeaths = 0;

  for (let p of population) {
    if (p.infected) {
      infected += 1; // Count infected individuals
    }
    if (p.newlyInfected) {
      newlyInfected += 1; // Count newly infected individuals
    }
    if (p.dead) {
      totalDeaths += 1; // Count dead individuals
    }
  }

  return { round, infected, newlyInfected, totalDeaths }; // Return the total deaths
};
