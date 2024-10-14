'use strict';

// Challenge #1

const julia = [9, 16, 6, 8, 3];
const kate = [10, 5, 6, 1, 4];

// TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaUpdated = dogsJulia.slice(1, -2);
  const allDogs = [...dogsJuliaUpdated, ...dogsKate];
  allDogs.forEach((dog, i) =>
    console.log(
      `Dog number ${i + 1} is ${
        dog >= 3 ? 'an adult' : 'a puppy'
      } and is ${dog} years old`
    )
  );
};
// checkDogs(julia, kate);

// Challenge #2 & #3
const calcAverageHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? (age *= 2) : (age = age * 4 + 16)))
    .filter(dog => dog >= 18)
    .reduce((acc, curr, _, arr) => acc + curr / arr.length, 0)
    .toFixed(2);

console.log(calcAverageHumanAge(kate));

// Challenge #4

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

dogs.forEach(dog => Math.floor((dog.recFood = dog.weight * 0.75 * 28)));
console.log(dogs);

const findByOwner = function (owner) {
  const ownedDog = dogs.find(dog => dog.owners.includes(owner));
  return ownedDog;
};

const sarahsDog = findByOwner('Sarah');
console.log(
  `Sarah's dog is eating ${
    sarahsDog.curFood > sarahsDog.recFood ? 'too much' : 'too little'
  } food`
);

const ownersFat = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(dog => dog.owners);
const ownersThin = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owners);

// const ownersFat = [];
// const ownersThin = [];
// dogs.forEach(dog =>
//   dog.curFood > dog.recFood
//     ? ownersFat.push(dog.owners)
//     : ownersThin.push(dog.owners)
// );
console.log(ownersFat);
console.log(ownersThin);

console.log(`${ownersFat.join(' and ')}'s dogs are fat!`);
console.log(`${ownersThin.join(' and ')}'s dogs are too thin!`);

console.log(
  `There is at least one dog eating eaxctly the right amount of food: ${dogs.some(
    dog => dog.curFood === dog.recFood
  )}`
);

console.log(
  `There is at least one dog eating an ok amount of food: ${dogs.some(
    dog => dog.curFood <= dog.recFood * 1.1 && dog.curFood >= dog.recFood * 0.9
  )}`
);

const okDogs = dogs.filter(
  dog => dog.curFood <= dog.recFood * 1.1 && dog.curFood >= dog.recFood * 0.9
);
console.log(okDogs);

const sortedDogs = dogs
  .slice()
  .sort((dog1, dog2) => dog1.recFood - dog2.recFood);
console.log(sortedDogs);
