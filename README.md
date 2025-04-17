# mystery_organism
A JavaScript implementation for simulating and analysing (P.aequor organisms) with unique DNA characteristics.

Overview
This project simulates the DNA of P. aequor, a recently discovered organism with unusual DNA properties. The code allows for studying DNA mutations, comparing genetic similarity between specimens, and determining survival likelihood based on genetic composition.
Features
Factory Function
The pAequorFactory() function creates P. aequor specimens with:

Unique specimen identification numbers
DNA sequences consisting of 15 bases (A, T, C, G)
Methods for genetic analysis and mutation simulation

DNA Mutation
The .mutate() method:

Randomly selects a base in the DNA sequence
Changes it to one of the other three possible bases
Simulates P. aequor's high rate of DNA mutation

DNA Comparison
The .compareDNA() method:

Compares DNA sequences between two specimens
Calculates the percentage of identical bases at matching positions
Outputs information about genetic similarity

Survival Analysis
The .willLikelySurvive() method:

Determines survival likelihood based on DNA composition
Returns true when DNA contains at least 60% 'C' or 'G' bases
Helps identify viable specimens for further study

Specimen Collection
The project includes functionality to:

Generate random DNA sequences
Create a population of 30 viable specimens
Store these specimens for research purposes

Implementation
javascript// Factory function to create P. aequor organisms
function pAequorFactory(specimenNum, dna) {
  return {
    specimenNum: specimenNum,
    dna: dna,
    
    // Method to simulate mutation
    mutate() {
      const randomIndex = Math.floor(Math.random() * this.dna.length);
      const currentBase = this.dna[randomIndex];
      const bases = ['A', 'T', 'C', 'G'];
      const possibleBases = bases.filter(base => base !== currentBase);
      const newBase = possibleBases[Math.floor(Math.random() * possibleBases.length)];
      this.dna[randomIndex] = newBase;
      return this.dna;
    },
    
    // Method to compare DNA with another P. aequor specimen
    compareDNA(otherOrganism) {
      let identicalBases = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === otherOrganism.dna[i]) {
          identicalBases++;
        }
      }
      const percentageInCommon = (identicalBases / this.dna.length) * 100;
      console.log(`specimen #${this.specimenNum} and specimen #${otherOrganism.specimenNum} have ${percentageInCommon.toFixed(2)}% DNA in common`);
    },
    
    // Method to determine if the organism will likely survive
    willLikelySurvive() {
      // Count the number of 'C' and 'G' bases
      const cgCount = this.dna.filter(base => base === 'C' || base === 'G').length;
      
      // Calculate the percentage of 'C' and 'G' bases
      const cgPercentage = (cgCount / this.dna.length) * 100;
      
      // Return true if the percentage is at least 60%, otherwise false
      return cgPercentage >= 60;
    }
  };
}

// Function to generate a random DNA sequence
function generateRandomDNA() {
  const bases = ['A', 'T', 'C', 'G'];
  const dna = [];
  for (let i = 0; i < 15; i++) {
    const randomBase = bases[Math.floor(Math.random() * bases.length)];
    dna.push(randomBase);
  }
  return dna;
}

// Create 30 instances of P. aequor that can survive
function createSurvivableSpecimens(numberOfSpecimens) {
  const survivableSpecimens = [];
  let specimenCount = 1;
  
  while (survivableSpecimens.length < numberOfSpecimens) {
    // Create a new specimen with random DNA
    const newSpecimen = pAequorFactory(specimenCount, generateRandomDNA());
    
    // Check if it will likely survive
    if (newSpecimen.willLikelySurvive()) {
      survivableSpecimens.push(newSpecimen);
    }
    
    // Increment the specimen count regardless of survival likelihood
    specimenCount++;
  }
  
  return survivableSpecimens;
}

// Create 30 survivable specimens
const survivableSpecimens = createSurvivableSpecimens(30);
Usage Examples
Creating and Mutating a Specimen
javascript// Create a specimen with a specific DNA sequence
const specimen = pAequorFactory(1, ['A', 'C', 'T', 'G', 'A', 'T', 'C', 'G', 'A', 'T', 'C', 'G', 'A', 'T', 'C']);

// Display original DNA
console.log("Original DNA:", specimen.dna.join(''));

// Mutate the DNA
const mutatedDNA = specimen.mutate();

// Display mutated DNA
console.log("Mutated DNA:", mutatedDNA.join(''));
Comparing Two Specimens
javascript// Create two specimens
const specimen1 = pAequorFactory(1, ['A', 'C', 'T', 'G', 'A', 'T', 'C', 'G', 'A', 'T', 'C', 'G', 'A', 'T', 'C']);
const specimen2 = pAequorFactory(2, ['C', 'T', 'T', 'G', 'G', 'A', 'C', 'G', 'T', 'A', 'C', 'T', 'A', 'C', 'G']);

// Compare their DNA
specimen1.compareDNA(specimen2);
Checking Survival Likelihood
javascript// Check if a specimen will likely survive
const willSurvive = specimen1.willLikelySurvive();
console.log(`Specimen #${specimen1.specimenNum} will ${willSurvive ? 'likely' : 'not likely'} survive.`);
