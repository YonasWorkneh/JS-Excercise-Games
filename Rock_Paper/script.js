'use strict';

//Selecting the necessary DOM elements.
const compImg = document.querySelector('.random').childNodes;
const playerbtn = document.querySelectorAll('.player-choice');
const message = document.querySelector('.message');
const playAgnBtn = document.querySelector('.play-again');
const playerScore = document.querySelector('.player-score');
const compScore = document.querySelector('.computer-score');


let btnInActive = true;
let playerCurrentScore = 0;
let compCurrentScore = 0;

//for resetting the game after the player or computer wins in ten rounds
const reset = () => {
  compScore.textContent = '0';
  playerScore.textContent = '0';
  compCurrentScore = 0;
  playerCurrentScore = 0;
}
const checkWin = function (playerChoice, computerChoice) {
  if (playerChoice == 1 && computerChoice == 2) {
    message.style.background = 'red';
    ++compCurrentScore;
    compScore.textContent = compCurrentScore;
  }
  else if (playerChoice == 2 && computerChoice == 1) {
    message.style.background = 'green';
    ++playerCurrentScore;
    playerScore.textContent = playerCurrentScore;
  }
  else if (playerChoice == 1 && computerChoice == 3) {
    message.style.background = 'green';
    ++playerCurrentScore;
    playerScore.textContent = playerCurrentScore;
  }
  else if (playerChoice == 3 && computerChoice == 1) {
    message.style.background = 'red';
    ++compCurrentScore;
    compScore.textContent = compCurrentScore;
  }
  else if (playerChoice == 2 && computerChoice == 3) {
    message.style.background = 'red'; 
    ++compCurrentScore;
    compScore.textContent = compCurrentScore;
  }
  else if(playerChoice == 3 && computerChoice == 2){
    message.style.background = 'green';
    ++playerCurrentScore;
    playerScore.textContent = playerCurrentScore;
  }
  else {
    message.style.background = 'none';
  }
  //to end the game in a round of 10
  if (playerCurrentScore === 10) {
    alert(`✨🎉Congrats!!! You defeated the computer✨🎉`);
    reset();
  }
  else if (compCurrentScore === 10) {
    alert(`Computer Won.try again!!!`);
    reset();
  }
  } 



//continously changing the image of the computer choice;

const image = ['Rock', 'Paper', 'Scissor'];//to enable playing even when there is no image element perhaps for visually impaired
let index = 0;
let change = function () {
  if (index === 2) {
    if (btnInActive)
      index = 0;
    else
      return 
  }
  else {
    if (btnInActive) {
      index++;
    }
    else
      return 
  }
  compImg[0].src = `img-${index}.jpg`;
  compImg[0].alt = `${image[index]}`;
  setTimeout(change, 75);
}
window.onload = change();

//adding event listner to every buttons in the player side;
for (let i = 0; i < playerbtn.length; i++) {
  playerbtn[i].addEventListener('click', function (e) {
    btnInActive = false;//when a btn is clicked this should stop the onload infinite function 
    let playerChoice = e.target.id;//get the id of the image or the button selected

    //to get rid of all the other buttons when one btn is selected 
    for (let j = 0; j < playerbtn.length; j++){
      playerbtn[i].setAttribute('Disabled', true);
      if (playerbtn[j].getAttribute('id') !== playerChoice)
        playerbtn[j].style.display = 'none';
      
    }

      
    
    //setting id for the continously changing computer image choice;

    if (compImg[0].alt == 'Rock')
    compImg[0].id = '1';
  else if (compImg[0].alt == 'Paper')
  compImg[0].id = '2';
  else
      compImg[0].id = '3';
    checkWin(playerChoice, compImg[0].id); 
})  
}

//play again button which restarts the onload iterative function 
playAgnBtn.addEventListener('click', function () {
  btnInActive = true;
  message.style.background = 'none';
  window.onload = change();
  //to re-display every button available  
  for (let j = 0; j < playerbtn.length; j++){
    playerbtn[j].style.display = 'inline-block';
    playerbtn[j].removeAttribute('Disabled');
  }
})



