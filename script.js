'use strict';
// DATE: 16/01/2022

// NOTE: We can use diagrams.net to create own diagrams.

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); // You can also get ID element by using getElementById, you don't need to type # this time and it is faster than querySelector.
const current0El = document.getElementById('current--0');
const current1El = document.querySelector('#current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
// Starting conditions

// NOTE: The easiest solution is to create a variable that hosts the state of the game. So if we are still playing or not, so this is gonna be a state variable, which tells us the condition of a system in this case the condition will be is the game playing or not.

// NOTE: All the variables declared inside the function ARE ONLY AVAILABLE INSIDE the init function, they are not accessible outside the function, they are scoped to the function.

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

// NOTE: What toggle will do is that it will add the class if it is not there and if it is there, it will remove it.

// NOTE: This function does not need any argument at all, or any parameter because the code is exactly the same in both situations. So usually when we are refactoring something like we are essentially doing here, then there is many times like a small thing that changes in the code. And then it's very useful to have a parameter so that when we call the function, we can specify what changes.

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// NOTE: let currentScore cannot be inside of this function because then it would be set to zero each time that we clicked the button. And so therefore it needs to be outside.

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1.generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2.display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // 3.check for rolled 1
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. add current score to active player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // switch to the next player
      switchPlayer();
    }
  }
});

// btnNew.addEventListener('click', function () {
//   playing = true;
//   document
//     .querySelector(`.player--${activePlayer}`)
//     .classList.remove('player--winner');
//   document.querySelector(`#score--${activePlayer}`).textContent = 0;
//   document.querySelector(`#current--${activePlayer}`).textContent = 0;
//   currentScore = 0;
//   activePlayer = 0;
//   document
//     .querySelector(`.player--${activePlayer}`)
//     .classList.add('player--active');
//   scores = [0, 0];
// });

// NOTE: JavaScript will not show an error if we add or remove any classes that's already exists to the element.

// NOTE:

btnNew.addEventListener('click', init);
