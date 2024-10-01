'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  containerMovements.innerHTML = ''; // Clear old data

  movements.forEach((mov, i) => {
    const transactionType = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
      <div class="movements__type movements__type--${transactionType}">${
      i + 1
    } ${transactionType}</div>
      <div class="movements__value">${mov}</div>
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html); // afterbegin means all new ones will be on top
  });
};
displayMovements(account1.movements);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// Array Methods
/*
// Slice method
let arr = ['a', 'b', 'c', 'd', 'e'];

console.log(arr.slice(2));
console.log(arr.slice(2, 4)); // 4 is not included. Just 2 and 3
console.log(arr.slice(-2)); // last 2
console.log(arr.slice(1, -2)); // b and c
console.log(arr.slice()); // Shallow copy. Best used when chaining methods
console.log([...arr]); // same as above

// Splice method - mutates original array
console.log(arr.splice(2));
arr.splice(-1); // removes the last element form original array
arr.splice(1, 2); // a, d. Starts at 1, deletes 2 elements

// Reverse - mutates original array
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());

// Concat - doesn't mutate original array
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]); // Same as above

// Join
//Same as strings
*/

// At Method
/*
const arr = [23, 11, 64];
console.log(arr[0]); // Old way
console.log(arr.at(0)); // New way

// Getting last element
console.log(arr[arr.length - 1]); // Old way
console.log(arr.slice(-1)[0]); // Alt old way
console.log(arr.at(-1)); //New way. Can use any negative value

// also works on strings
*/

// For each
/*
// On Arrays
// Old way
for (const [i, movement] of movements.entries()) {
  if (movement > 0) console.log(`Movement ${i + 1}: You deposited ${movement}`);
  else console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
}

console.log('----FOR EACH----');

// Using forEach (order of args is important)
movements.forEach(function (mov, i, arr) {
  // if (movement > 0) console.log(`You deposited ${movement}`);
  // else console.log(`You withdrew ${Math.abs(movement)}`);
  if (mov > 0) console.log(`Movement ${i + 1}: You deposited ${mov}`);
  else console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
});

// You can't break out of a forEach loop. Use for loop instead


// On Maps
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// On Sets
const currenciesUnique = new Set(['USD', 'EUR', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`); // There is no key
});
*/

// **CODING CHALLENEGE #1**
/*

const julia = [9, 16, 6, 8, 3];
const kate = [10, 5, 6, 1, 4];

const checkDogs = function (dogsJulia, dogsKate) {
  const juliaNoCats = dogsJulia.slice(1, -2);
  // Course solution
  // const juliaNoCats = dogsJulia.slice();
  // juliaNoCats.splice(0, 1);
  // juliaNoCats.splice(-2);
  const allDogs = [...juliaNoCats, ...dogsKate];
  // const allDogs = dogsJuliaCorrected.concat(dogsKate)
  console.log(allDogs);
  allDogs.forEach(function (dog, i) {
    if (dog >= 3)
      console.log(`Dog number ${i + 1} is an adult and is ${dog} years old.`);
    else console.log(`Dog number ${i + 1} is still a puppy`);
  });
};

checkDogs(julia, kate);

// TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
*/
