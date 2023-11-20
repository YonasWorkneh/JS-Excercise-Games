"use strict";
//prompting users to enter there name to display it
  const nameI = prompt('player 1 Enter your Name: ');
  const nameII = prompt('player 2 Enter your Name: ');
  document.querySelector('.nameI').textContent = nameI;
  document.querySelector('.nameII').textContent = nameII;





//Selecting all the necessary DOM Elements 
const newBtn = document.querySelector(".new");
const rollBtn = document.querySelector(".roll");
const holdBtn = document.querySelector(".hold");
const playerI = document.getElementById("player1");
const playerII = document.getElementById("player2");
const dice = document.querySelector('.dice');
const playerOneScore = document.querySelector('.playerScore1');
const playerTwoScore = document.querySelector('.playerScore2');
const playerOneTotal = document.querySelector('.score1');
const playerTwoTotal = document.querySelector('.score2');




const checkWin = function () {
  console.log(`${playerOneTotal.textContent} ${playerTwoTotal.textContent}`);
  if (Number(playerOneTotal.textContent) >= 100) {
    alert(`${nameI} Wins 🎉🎉`);
    //disabling the roll and hold btn when one player wins i.e players 
    //can only reset the game;
    rollBtn.setAttribute('Disabled',true);
    holdBtn.setAttribute('Disabled',true);
  }
  else if (Number(playerTwoTotal.textContent) >= 100) {
    alert(`${nameII} Wins 🎉🎉`);
    rollBtn.setAttribute('Disabled',true);
    holdBtn.setAttribute('Disabled',true);
  }
}
const checkRoll = function (diceRoll, activePlayerScore, inactivePlayerScore,player1,player2) {
  if (diceRoll !== 1) {
    currentScore += diceRoll;
    activePlayerScore.textContent = currentScore;
  }
  else {
    currentScore = 0;
    activePlayerScore.textContent = currentScore;
    player1.classList.remove('player-active');
    player2.classList.add('player-active');
  }
}



let currentScore = 0;
//setting the active status for a player 
playerI.classList.add('player-active');

//Listening to the roll of the dice
rollBtn.addEventListener("click", function () {
  rollBtn.classList.add('rollPressed');
  //generating a random dice roll.
  let diceRoll = Math.floor(Math.random() * 6 + 1);
  console.log(diceRoll);
  //checking the active-status of the players;
  if (playerI.classList.contains('player-active'))
    checkRoll(diceRoll,playerOneScore, playerTwoScore,playerI,playerII);
  else
    checkRoll(diceRoll, playerTwoScore, playerOneScore, playerII, playerI);
   
});



//when user presses the hold btn
holdBtn.addEventListener("click", function () {
  if (playerI.classList.contains('player-active')) {
    //creating a separate value so that the player total score don't reset every time
    //the player presses the hold btn
    let value = Number(playerOneTotal.textContent);
    value += currentScore;
    playerOneTotal.textContent = value;
    playerOneScore.textContent = '0';//setting the current score of player back to initial state which was 0

    //resetting the currentScore not to affect the current Score of the other player
    currentScore = 0;
    //to trigger active-status change when player holds their scor
    playerI.classList.remove('player-active');
    playerII.classList.add('player-active');
    //To check if a player wins when pressing the hold button
  }
  
  else {
    let value = Number(playerTwoTotal.textContent)
    value += currentScore;
    playerTwoTotal.textContent = value;
    playerTwoScore.textContent = '0';
    currentScore = 0;
    playerII.classList.remove('player-active');
    playerI.classList.add('player-active');
    
  }
  checkWin();
});


//when players Reset the game
newBtn.addEventListener('click', function () {
  //enabling the roll and hld btn back again 
  rollBtn.removeAttribute('Disabled');
  holdBtn.removeAttribute('Disabled');
  //since the game always begins from player one setting the active status
  // to player one if it's not already there.
  if (!playerI.classList.contains('player-active')) {
    playerII.classList.remove('player-active');
    playerI.classList.add('player-active')
  }
  //setting every condition back to its orginal state
  playerOneScore.textContent = '0';
  playerTwoScore.textContent = '0';
  playerOneTotal.textContent = '0';
  playerTwoTotal.textContent = '0';
});


