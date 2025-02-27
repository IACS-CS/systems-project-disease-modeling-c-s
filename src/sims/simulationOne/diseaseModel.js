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
 * What we are simulating:Disease Spread Model of Common cold
 * 
 * What elements we have to add:  Death Rate
 * 
 * In plain language, what our model does do? :
 *:   Instructions for the Common Cold Infection Game

 1. Modeling Contacts and Spread
Two People in Contact (Basic Handshake Model):
In each round of the simulation, we start with two individuals in contact, and if one person is infected, they have a chance to infect the other person in contact. This simulates a basic handshake model.

Multiple Contacts:
To make it more interesting, instead of just two people shaking hands, you could increase the number of people interacting. For example:

Three People in Contact: Three people are put into a group, and each infected person has a chance to infect the others. You could either:
Put people in contact in a line (e.g., Person 1 with Person 2, Person 2 with Person 3, etc.)
Randomly select people each round (using random pairing).
2. Recovery from Disease
In this version, after a certain number of days (or rounds), an infected person recovers. This can affect the disease spread by:
Reducing the pool of infected individuals.
Changing the disease's progression (maybe adding a "recovered" state where individuals can't spread the disease anymore).
3. Quarantine Mechanism
Add a quarantine chance to the simulation. Infected individuals could have a percentage chance of being quarantined, which means they won't interact with others that round. This reduces the spread but introduces randomness.
4. Death Rate Counter
Track a death rate that increases every time an infected person "dies." The death could happen after a certain number of rounds or based on a random chance during the disease's progression.

 * 
 */



export const defaultSimulationParameters = {
  infectionChance: 50,
  // Add any new parameters you want here with their initial values
  //  -- you will also have to add inputs into your jsx file if you want
  // your user to be able to change these parameters.
};

/* Creates your initial population. By default, we *only* track whether people
are infected. Any other attributes you want to track would have to be added
as properties on your initial individual. 

For example, if you want to track a disease which lasts for a certain number
of rounds (e.g. an incubation period or an infectious period), you would need
to add a property such as daysInfected which tracks how long they've been infected.

Similarily, if you wanted to track immunity, you would need a property that shows
whether people are susceptible or immune (i.e. succeptibility or immunity) */
export const createPopulation = (size = 1600) => {
  const population = [];
  const sideSize = Math.sqrt(size);
  for (let i = 0; i < size; i++) {
    population.push({
      id: i,
      x: (100 * (i % sideSize)) / sideSize, // X-coordinate within 100 units
      y: (100 * Math.floor(i / sideSize)) / sideSize, // Y-coordinate scaled similarly
      infected: false,
    });
  }
  // Infect patient zero...
  let patientZero = population[Math.floor(Math.random() * size)];
  patientZero.infected = true;
  return population;
};

// Example: Maybe infect a person (students should customize this)
const updateIndividual = (person, contact, params) => {
  // Add some logic to update the individual!
  // For example...
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
};

// Example: Update population (students decide what happens each turn)
export const updatePopulation = (population, params) => {
  // Include "shufflePopulation if you want to shuffle...
  // population = shufflePopulation(population);
  // Example logic... each person is in contact with the person next to them...
  for (let i = 0; i < population.length; i++) {
    let p = population[i];
    // This logic just grabs the next person in line -- you will want to 
    // change this to fit your model! 
    let contact = population[(i + 1) % population.length];
    // Update the individual based on the contact...
    updateIndividual(p, contact, params);
  }
  return population;
};


// Stats to track (students can add more)
// Any stats you add here should be computed
// by Compute Stats below
export const trackedStats = [
  { label: "Total Infected", value: "infected" },
];


// Example: Compute stats (students customize)
export const computeStatistics = (population, round) => {
  let infected = 0;
  let newlyInfected = 0;
  for (let p of population) {
    if (p.infected) {
      infected += 1; // Count the infected
    }
    if (p.newlyInfected) {
      newlyInfected += 1; // Count the newly infected
    }
  }
  return { round, infected, newlyInfected };
};

