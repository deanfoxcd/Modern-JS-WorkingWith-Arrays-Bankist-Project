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

const displayMovements = function (account, sort = false) {
  containerMovements.innerHTML = ''; // Clear old data

  const movs = sort
    ? currentAccount.movements.slice().sort((a, b) => a - b) // Sorts a copy
    : currentAccount.movements;

  movs.forEach((mov, i) => {
    const transactionType = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
      <div class="movements__type movements__type--${transactionType}">${
      i + 1
    } ${transactionType}</div>
      <div class="movements__value">€${mov}</div>
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html); // afterbegin means all new ones will be on top
  });
};

const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce((acc, curr) => acc + curr, 0);
  labelBalance.textContent = `€${account.balance}`;
};

const calcDisplaySummary = function (account) {
  const movs = account.movements;
  const withdrawals = movs
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `€${Math.abs(withdrawals)}`;
  const deposits = movs
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `€${Math.abs(deposits)}`;

  const interest = movs
    .filter(mov => mov > 0)
    .map(mov => (mov * account.interestRate) / 100)
    .filter(int => int > 1) // makes it so that interest is only added if it's greater than €1
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `€${interest.toFixed(2)}`;
};

const createUsernames = function (accs) {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsernames(accounts);
// console.log(accounts);

const updateUI = function (account) {
  //Display movements
  displayMovements(account);
  //Display balance
  calcDisplayBalance(account);
  //Display summary
  calcDisplaySummary(account);
};

// Event Handlers

// Login
let currentAccount;
btnLogin.addEventListener('click', e => {
  e.preventDefault(); // Prevents form from submitting

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //Clear input fields and move focus
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    updateUI(currentAccount);
  }
});

// Transfer Money
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const targetAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  const transferAmount = Number(inputTransferAmount.value);

  if (
    transferAmount > 0 &&
    targetAcc &&
    currentAccount.balance >= transferAmount &&
    targetAcc?.username !== currentAccount.username //first arg can return undefined so targetAcc && si still necessary
  ) {
    currentAccount.movements.push(-transferAmount);
    targetAcc.movements.push(transferAmount);
    updateUI(currentAccount);
  } else alert('Invalid transfer');

  inputTransferTo.value = '';
  inputTransferAmount.value = '';
});

// Request loan (at least one deposit of 10% of the loan amount)
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const loanAmount = Number(inputLoanAmount.value);
  if (
    loanAmount > 0 &&
    currentAccount.movements.some(mov => mov > loanAmount / 10)
  ) {
    currentAccount.movements.push(loanAmount);
    updateUI(currentAccount);
  } else {
    alert('You cannot borrow that much money, sorry');
  }
  inputLoanAmount.value = '';
});

// Close account
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    // Delete account
    accounts.splice(index, 1);
    // Hide UI
    containerApp.style.opacity = 0;
    inputCloseUsername.value = inputClosePin = '';
  }
});

// Sort transactions
let sorted = false;
btnSort.addEventListener('click', e => {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

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

// checkDogs(julia, kate);

// TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
*/

// Map Method
/*
const euroToUSD = 1.1;

// const movementsUSD = movements.map(function (mov) {
//   return Math.trunc(mov * euroToUSD);
// });
// Can also be done with a for-of loop. This is more modern

// With arrow function
const movementsUSD = movements.map(mov => Math.trunc(mov * euroToUSD));

console.log(movements);
console.log(movementsUSD);

const movementsNumbered = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${mov}`

  // if (mov > 0) return `Movement ${i + 1}: You deposited ${mov}`;
  // else return `Movement ${i + 1}: You withdrew ${Math.abs(mov)}`;
);
console.log(movementsNumbered); // Displays the new array instead of printing each line
*/

// Filter method
/*
// Can be chained, not possible with For loop
const deposits = movements.filter(mov => mov > 0);
console.log(deposits);
const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);
*/

// Reduce Method
/*
// The 0 is the initial value of the acc
const balance = movements.reduce((acc, curr, i, arr) => acc + curr, 0);
console.log(balance);

// Maximum Value

// My Solution
// const max = movements.reduce((acc, curr) => {
//   if (curr > acc) {
//     acc = curr;
//   }
//   return acc;
// }, movements[0]);

// My solution oneline (combining the above with course solution)
const max = movements.reduce(
  (acc, curr) => (acc > curr ? acc : curr),
  movements[0]
);

// Course solution
// const max = movements.reduce((acc, mov) => {
//   if (acc > mov) return acc;
//   else return mov;
// }, movements[0]);
console.log(max);
*/

// **Coding Challenge #2**
/*

const test1 = [5, 2, 4, 1, 15, 8, 3];
const test2 = [16, 6, 10, 5, 6, 1, 4];

const calcAverageHumanAge = function (ages) {
  // First try

  // const humanAges = [];
  // ages.forEach((age, i) => {
  //   if (age <= 2) humanAges.push(age * 2);
  //   else if (age > 2) humanAges.push(16 + age * 4);
  // });
  // console.log(humanAges);
  // const humanAgesAdult = humanAges.filter(age => age >= 18);
  // console.log(humanAgesAdult);
  // const aveAge = (
  //   humanAgesAdult.reduce((acc, age) => acc + age, 0) / humanAgesAdult.length
  // ).toFixed(2);
  // console.log(aveAge);

  // My attempt after seeing course solution used map
  const humanAges = ages.map(age => (age <= 2 ? age * 2 : 16 + age * 4));
  console.log(humanAges);
  const adultDogs = humanAges.filter(age => age >= 18);
  console.log(adultDogs);
  const aveAge = adultDogs
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0)
    .toFixed(2);
  return aveAge;
};
const avg1 = calcAverageHumanAge(test1);
const avg2 = calcAverageHumanAge(test2);
console.log(avg1, avg2);
*/

// Chaining
/*
// Can only chain methods if the previous one returns an array (so not forEach)

// PIPELINE (hard to debug)
const totalInUSD = movements
  .filter(mov => mov > 0)
  // .map(mov => Math.trunc(mov * 1.1))
  // To debug, log the array (will be the resulting array from the previous operation)
  .map((mov, i, arr) => {
    console.log(arr);
    return Math.trunc(mov * 1.1);
  })
  .reduce((acc, mov) => acc + mov, 0);
  
console.log(totalInUSD);
*/

// **Coding Challenge 3**
/*

const test1 = [5, 2, 4, 1, 15, 8, 3];
const test2 = [16, 6, 10, 5, 6, 1, 4];

const calcAverageHumanAge = function (ages) {
  const aveAge = ages
    .map(age => (age <= 2 ? age * 2 : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0)
    .toFixed(2);
  return aveAge;
};

console.log(calcAverageHumanAge(test1));
*/

// Find method
/*
// Returns the first element that matches the callback, not an array

console.log(movements.find(mov => mov < 0));

//Find Jessica Davis' account
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

// using for of
// for (const acc of accounts) {
//   if (acc.owner === 'Jessica Davis') console.log(acc);
// }
*/

// Some (checks by condition vs includes() which checks equality)
/*
const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);
*/

// Every (every element must pass condition)
/*
console.log(movements.every(mov => mov > 0)); // false
console.log(account4.movements.every(mov => mov > 0)); // True
*/

// Flat & flatMap
/*

//Only goes one level deep (1) is default
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat()); // [1,2,3,4,5,6,7,8]

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat()); // [Array(2), 3, 4, Array(2), 7, 8]
console.log(arrDeep.flat(2)); // [1,2,3,4,5,6,7,8]

// Calculate overall balance
// const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);
// const allMovements = accountMovements.flat();
// const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
// console.log(overallBalance);

// Using chaining
const overallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);

// Flat map (combines flat and map because it's so common)
// Only goes one level deep!!
const overallBalanceFM = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalanceFM);
*/

// Sort
/*
// Mutates original array

// Strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());

// Numbers
console.log(movements.sort()); // Sorts by -/+ and then by first number 1300, 200 etc. Sorts them as strings

// return < 0: a,b (keep order)
// return > 0: b,a (switch order)
console.log(movements.sort((a, b) => a - b));
// Descending
console.log(movements.sort((a, b) => b - a));
*/

// Creating and filling arrays
