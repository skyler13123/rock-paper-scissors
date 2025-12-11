'use-strict';

const playerScoreElement = document.getElementById('player-score');
const computerScoreElement = document.getElementById('computer-score');
const resultMsgElement = document.getElementById('results-msg');
const winnerMsgElement = document.getElementById('winner-msg');
const resetGameBtn = document.getElementById('reset-game-btn');
const optionsContainer = document.querySelector('.options-container');
const computerChoiceMsgElement = document.getElementById('computer-choice-msg'); 

let playerName = prompt("Please enter your name:") || "Player";
let playerScore = 0;
let computerScore = 0;

function getRandomComputerResult() {
  const options = ['Rock', 'Paper', 'Scissors'];
  return options[Math.floor(Math.random() * 3)];
}

function hasPlayerWonTheRounds(player, computer) {
  return (
    (player === 'Paper' && computer === 'Rock') ||
    (player === 'Scissors' && computer === 'Paper') ||
    (player === 'Rock' && computer === 'Scissors')
  );
}


// Update the function signature to accept playerName
function roundResults(userOption, playerName) { 
  const computerOption = getRandomComputerResult();
  let message;

  if (computerOption === userOption) {
    message = `It's a tie! Both chose ${userOption}`;
  } else if (hasPlayerWonTheRounds(userOption, computerOption)) {
    playerScore++;
    message = `${playerName} Wins! ${userOption} beats ${computerOption}`; 
  } else {
    computerScore++;
    message = `Computer wins! ${computerOption} beats ${userOption}`;
  }

  return {
    computerChoice: computerOption,
    resultMessage: message
  };
}




function showResult(userOption) {
    // Pass the global playerName variable to roundResults
    const results = roundResults(userOption, playerName); 

    // Update the computer's choice message
    computerChoiceMsgElement.innerText = `The computer chose: ${results.computerChoice}`;

    // Update the result message
    resultMsgElement.innerText = results.resultMessage;

    computerScoreElement.innerText = computerScore;
    playerScoreElement.innerText = playerScore;

    if (computerScore === 3 || playerScore === 3) {
        // Use the playerName variable here for the winner message
        winnerMsgElement.innerText = `${
            playerScore === 3 ? playerName : 'Computer' 
        } has won the game!`;
        resetGameBtn.style.display = 'block';
        optionsContainer.style.display = 'none';
    }
}

function resetGame() {
  computerScore = 0;
  playerScore = 0;
  computerScoreElement.innerText = '0';
  playerScoreElement.innerText = '0';
  resetGameBtn.style.display = 'none';
  optionsContainer.style.display = 'block';
  winnerMsgElement.innerText = '';
  resultMsgElement.innerText = '';
  
  // Reset the computer choice message
  computerChoiceMsgElement.innerText = 'The computer chose...'; 
}

resetGameBtn.addEventListener('click', resetGame);
const rockBtn = document.getElementById('rock-btn');
const paperBtn = document.getElementById('paper-btn');
const scissorsBtn = document.getElementById('scissors-btn');

// Keep these event listeners, but ensure they call showResult
rockBtn.addEventListener('click', function () {
  showResult('Rock');
});
paperBtn.addEventListener('click', function () {
  showResult('Paper');
});
scissorsBtn.addEventListener('click', function () {
  showResult('Scissors');
});