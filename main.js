// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Factory function to create P. aequor organisms
const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum: specimenNum,
    dna: dna,

    // Method to simulate mutation
    mutate() {
      // Select a random index in the DNA array
      const randomIndex = Math.floor(Math.random() * this.dna.length);
      
      // Get the current base at that position
      const currentBase = this.dna[randomIndex];
      
      // Define all possible bases
      const bases = ['A', 'T', 'C', 'G'];
      
      // Filter out the current base to get possible replacement bases
      const possibleBases = bases.filter(base => base !== currentBase);
      
      // Select a random base from the possible replacements
      const newBase = possibleBases[Math.floor(Math.random() * possibleBases.length)];
      
      // Replace the base at the random index with the new base
      this.dna[randomIndex] = newBase;
      
      // Return the mutated DNA
      return this.dna;
    },

     // Method to compare DNA with another P. aequor specimen
     compareDNA(otherOrganism) {
      // Count identical bases at the same positions
      let identicalBases = 0;
      
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === otherOrganism.dna[i]) {
          identicalBases++;
        }
      }
      
      // Calculate the percentage of identical bases
      const percentageInCommon = (identicalBases / this.dna.length) * 100;
      
      // Print the comparison message
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
console.log(`Created ${survivableSpecimens.length} survivable specimens.`);

// Example: Display the first few specimens to verify
console.log("Sample of survivable specimens:");
for (let i = 0; i < 3 && i < survivableSpecimens.length; i++) {
  console.log(`Specimen #${survivableSpecimens[i].specimenNum}: ${survivableSpecimens[i].dna.join('')}`);
  
  // Calculate and display the CG percentage for verification
  const cgCount = survivableSpecimens[i].dna.filter(base => base === 'C' || base === 'G').length;
  const cgPercentage = (cgCount / survivableSpecimens[i].dna.length) * 100;
  console.log(`CG percentage: ${cgPercentage.toFixed(2)}%`);
}

/* Test function for compareDNA method
function testCompareDNA() {
  // Create two specimen with different DNA sequences
  const specimen1 = pAequorFactory(1, ['A', 'C', 'T', 'G', 'A', 'T', 'C', 'G', 'A', 'T', 'C', 'G', 'A', 'T', 'C']);
  const specimen2 = pAequorFactory(2, ['C', 'T', 'T', 'G', 'G', 'A', 'C', 'G', 'T', 'A', 'C', 'T', 'A', 'C', 'G']);
  
  // Display DNA of both specimens
  console.log("Specimen #1 DNA:", specimen1.dna.join(''));
  console.log("Specimen #2 DNA:", specimen2.dna.join(''));
  
  // Compare the DNA of the two specimens
  specimen1.compareDNA(specimen2);
}

// Run the test
testCompareDNA();

/* Test function for pAequorFactory and mutate method
function testPAequor() {
  // Create a specimen with a sample DNA sequence
  const specimen = pAequorFactory(1, ['A', 'C', 'T', 'G', 'A', 'T', 'C', 'G', 'A', 'T', 'C', 'G', 'A', 'T', 'C']);
  
  // Display original DNA
  console.log("Original DNA:", specimen.dna.join(''));
  
  // Track which base changed
  const originalDNA = [...specimen.dna];
  
  // Call mutate method
  const mutatedDNA = specimen.mutate();
  
  // Display mutated DNA
  console.log("Mutated DNA: ", mutatedDNA.join(''));
  
  // Find which base changed
  let changedIndex = -1;
  for (let i = 0; i < originalDNA.length; i++) {
    if (originalDNA[i] !== mutatedDNA[i]) {
      changedIndex = i;
      break;
    }
  }
  
  if (changedIndex !== -1) {
    console.log(`Base at position ${changedIndex} changed from ${originalDNA[changedIndex]} to ${mutatedDNA[changedIndex]}`);
    console.log("Mutation successful!");
  } else {
    console.log("No mutation detected. Something went wrong.");
  }
}

// Run the test
testPAequor(); */

//const specimen1 = pAequorFactory(1, ['A', 'C', 'T', 'G', 'A', 'T', 'C', 'G', 'A', 'T', 'C', 'G', 'A', 'T', 'C']);
//console.log(specimen1.specimenNum); // 1
//console.log(specimen1.dna); // ['A', 'C', 'T', 'G', 'A', 'T', 'C', 'G', 'A', 'T', 'C', 'G', 'A', 'T', 'C']
