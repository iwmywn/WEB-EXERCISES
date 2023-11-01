let score = JSON.parse(localStorage.getItem('score')) || {
  win: 0,
  lose: 0,
  tie: 0
};

/*
if (!score) {
  score = {
    win: 0,
    lose: 0,
    tie: 0
  };
}
*/

updateScoreElement();

document.querySelector('.js-rock')
  .addEventListener('click', () => {
    playGame('rock');
  });
document.querySelector('.js-paper')
  .addEventListener('click', () => {
    playGame('paper');
  });
document.querySelector('.js-scissors')
  .addEventListener('click', () => {
    playGame('scissors');
  });

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r' || event.key === 'R') {
    playGame('rock');
  } else if (event.key === 'p' || event.key === 'P') {
    playGame('paper');
  } else if (event.key === 's' || event.key === 'S') {
    playGame('scissors');
  }
});

document.querySelector('.js-reset-score-btn')
  .addEventListener('click', () => {
    confirmResetScore();
  });

document.querySelector('.js-auto-play')
  .addEventListener('click', () => {
    autoPlay();
  });

document.body
  .addEventListener('keydown', (event) => {
    if (event.key === 'a' || event.key === 'A')
      autoPlay();
  });

document.body
  .addEventListener('keydown', (event) => {
    if (event.key === 'Backspace')
      confirmResetScore();
  });

function resetScore() {
  score.win = 0;
  score.lose = 0;
  score.tie = 0;
  localStorage.removeItem('score');
  updateScoreElement();
}

function confirmResetScore() {
  let confirmResetElement = document.querySelector('.js-confirm-reset');
  confirmResetElement.innerHTML = `
    <div>
      <span style="color: white;">Are you sure you want to reset the score?</span>
      <button class="js-yes-btn">Yes</button>
      <button class="js-no-btn">No</button>
    </div>
  `;
  document.querySelector('.js-yes-btn')
    .addEventListener('click', () => {
      resetScore();
      confirmResetElement.innerHTML = '';
    });
  document.querySelector('.js-no-btn')
    .addEventListener('click', () => {
      confirmResetElement.innerHTML = '';
    });
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';

  if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie';
    } else if (computerMove === 'paper') {
      result = 'You lose';
    } else {
      result = 'You win';
    }
  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win';
    } else if (computerMove === 'paper') {
      result = 'Tie';
    } else {
      result = 'You lose';
    }
  } else {
    if (computerMove === 'rock') {
      result = 'You lose';
    } else if (computerMove === 'paper') {
      result = 'You win';
    } else {
      result = 'Tie';
    }
  }

  if (result === 'You win') {
    score.win++;
  } else if (result === 'You lose') {
    score.lose++;
  } else {
    score.tie++;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();
  document.querySelector('.js-result')
    .innerHTML = result;

  document.querySelector('.js-moves')
    .innerHTML = `You <img class="move-icon" src="/pics/${playerMove}.png" alt="${playerMove}"> <img class="move-icon" src="/pics/${computerMove}.png" alt="${computerMove}"> Computer`;


  //alert(`You picked ${playerMove}. Computer picked ${computerMove}. ${result}\nWins: ${score.win}, Losses: ${score.lose}, Ties: ${score.tie}`);
}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.win}, Losses: ${score.lose}, Ties: ${score.tie}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else {
    computerMove = 'scissors';
  }

  return computerMove;
}

let intervalId;

function autoPlay() {
  const play = document.querySelector('.js-auto-play');
  if (play.innerHTML === 'Auto Play') {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    document.querySelector('.js-auto-play').innerHTML = 'Stop Play';
  } else if (play.innerHTML === 'Stop Play') {
    document.querySelector('.js-auto-play').innerHTML = 'Auto Play';
    clearInterval(intervalId);
  }
}