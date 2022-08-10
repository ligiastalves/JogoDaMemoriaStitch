"use strict"

const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard= false;

function flipCard(){
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');
  if (!hasFlippedCard){
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  secondCard = this;
  hasFlippedCard = false;
  checkForMath();
}

function checkForMath(){
  if (firstCard.dataset.card === secondCard.dataset.card){
    disableCards();
    return;
  }
  unflipCards();
}

function disableCards(){
  firstCard.removeEventListener ('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resertBoard();
}

function unflipCards(){
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    
    resertBoard();
  }, 1500);
}

function resertBoard(){
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

//embaralha as cartas, sorteio aleatorio

(function suffle(){
  cards.forEach((card) => {
    let randomPosition = Math.floor(Math.random() * 12);
    card.style.order = randomPosition;
  })
})();


cards.forEach((card) => {
  card.addEventListener('click', flipCard)
})

//cronometro
var ss=0;
var mm=0;
var hh=0;

var interval;

function twoDigits(digit){
    if(digit<10){
        return('0'+digit);
    }else{
        return(digit);
    }
}

function start(){
    clearInterval(interval);
    watch();
    interval= setInterval(watch,1000);
}

function pause(){
    clearInterval(interval);
}

/*
function stop(){
    clearInterval(interval);
    ss=0;
    mm=0;
    window.alert("You've stopped at: "+document.getElementById('watch').innerText);
    document.getElementById('watch').innerText='00:00:00';
}
*/

function watch(){
    ss++;
    if(ss==60){
        mm++;
        ss=0;
        if(mm==60){
            mm=0;
            hh++;
        }
    }
    document.getElementById('watch').innerText=twoDigits(hh)+':'+twoDigits(mm)+':'+twoDigits(ss);
}