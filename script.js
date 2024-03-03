'use strict';
//players variables
const model = document.querySelector('.modal');
const closeModel = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const playerName0 = document.querySelector('#name--0');
const playerName1 = document.querySelector('#name--1');

//warning
const warning = document.querySelector('.input-check');

//scores variables
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const currentScore0 = document.querySelector('#current--0');
const currentScore1 = document.querySelector('#current--1');
const winner0 = document.querySelector('.winnerAnnounc--0');
const winner1 = document.querySelector('.winnerAnnounc--1');

//btns variables
const diceEl = document.querySelector('.dice');
const btnReset = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnplay = document.querySelector('.btn--play');

//Other variables
const players = [0, 0];
const scores = [0, 0];
let currentScore = 0;
let active = 0;
let playing = true;

//setting initials
score0.textContent = 0;
score1.textContent = 0;
model.classList;
diceEl.classList.add('hidden');
model.classList.remove('hidden');
overlay.classList.remove('hidden');
warning.classList.add('hidden');
const newPlayer = function () {
  currentScore = 0;
  document.querySelector(`#current--${active}`).textContent = currentScore;

  active = active === 0 ? 1 : 0;

  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

const addHidden = function () {
  overlay.classList.add('hidden');
  model.classList.add('hidden');
};

btnRoll.addEventListener('click', function () {
  if (playing && typeof players[0] == 'string') {
    //generating random number
    const dice = Math.trunc(Math.random() * 6) + 1;
    //changing dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //check rolled dice
    if (dice != 1) {
      currentScore += dice;
      document.querySelector(`#current--${active}`).textContent = currentScore;
    } else {
      newPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing && typeof players[0] == 'string') {
    scores[active] += currentScore;
    document.querySelector(`#score--${active}`).textContent = scores[active];
    //switch player

    if (scores[active] >= 20) {
      document
        .querySelector(`.player--${active}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${active}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
      document
        .querySelector(`.winnerAnnounc--${active}`)
        .classList.remove('hidden');
      playing = false;
    } else {
      newPlayer();
    }
  }
});

btnReset.addEventListener('click', function () {
  scores[0] = 0;
  scores[1] = 1;
  currentScore = 0;
  players[0] = 0;
  players[1] = 0;
  score0.textContent = 0;
  score1.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  playerName0.textContent = 'Player 1';
  playerName1.textContent = 'Player 0';
  diceEl.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  model.classList.remove('hidden');
  overlay.classList.remove('hidden');
  winner0.classList.add('hidden');
  winner1.classList.add('hidden');
  warning.classList.add('hidden');
  playing = true;
  active = 0;
});

btnplay.addEventListener('click', function () {
  const playerInfo0 = document.querySelector('.player--0-name').value;
  const playerInfo1 = document.querySelector('.player--1-name').value;
  let regex = /^[a-zA-Z]+$/;
  if (regex.test(playerInfo0) && regex.test(playerInfo1)) {
    players[0] = playerInfo0;
    players[1] = playerInfo1;

    playerName0.textContent = players[0];
    playerName1.textContent = players[1];

    addHidden();
    document.querySelector('.player--0-name').value = '';
    document.querySelector('.player--1-name').value = '';
  } else if (!playerInfo0 || !playerInfo1) {
    warning.classList.remove('hidden');
    warning.textContent = 'Enter players name to play.';
  } else {
    warning.classList.remove('hidden');
    warning.textContent = 'No special characters allowed.';
  }
});
closeModel.addEventListener('click', function () {
  addHidden();
});

overlay.addEventListener('click', function () {
  addHidden();
});

warning.addEventListener('click', function () {
  warning.classList.add('hidden');
});
