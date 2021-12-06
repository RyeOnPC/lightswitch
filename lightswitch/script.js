'use strict';

let divPlayerQuantity = document.querySelector('#player-quantity');
let divOverlay = document.querySelector('#overlay');
let divPlayers = document.querySelector('#players');
let divLightBulb = document.querySelector('#lightBulb');
let divNewGame = document.querySelector('#newGameBtn');
let divRoomNum = document.querySelector('.round');
let tagBody = document.querySelector('body');
let btnBegin = document.querySelector('#begin');

let playersIn, playersOut, switchesIn, switchesOut = [];
let activePlayer, gameActive, totalPlayers, totalSwitches;
let switches, players, random;
let scores = [0,0,0,0,0];




// run on start
const init = function () {
    activePlayer = 0;
    gameActive = 0;
    totalPlayers = 4;
    totalSwitches = 5;
    btnBegin.addEventListener('click', startGame);
    divNewGame.addEventListener('click', startOver);
}

const startGame = function () {
    gameActive = 1;
    activePlayer = 0;
    totalPlayers = Number(divPlayerQuantity.value);
    totalSwitches = totalPlayers + 1;
    switchesIn = [1,2,3,4,5,6];
    playersIn = [1,2,3,4,5];
    tagBody.classList.add('showBody');
    divOverlay.classList.add('hidden');
    divPlayers.classList.add('hidden');
    divLightBulb.classList.add('lightOn');
    setSwitches();
    removeSwitches();
    setPlayers();
    removePlayers();
}

const setSwitches = function () {
    for (let x = 0; x < switchesIn.length; x++) {
        switchesIn[x] = document.querySelector(`#switch${x}`);
        switchesIn[x].removeEventListener('click', lightOn);
        switchesIn[x].removeEventListener('click', lightOff);
        switchesIn[x].addEventListener('click', lightOn);
    }
    shuffleSwitches();
}

const setPlayers = function () {
    for (let y = 0; y < playersIn.length; y++) {
        playersIn[y] = document.querySelector(`#player${y}`);
    }
}

const shuffleSwitches = function () {
    random = Math.trunc(Math.random() * (totalPlayers+1));
    switchesIn[random].addEventListener('click', lightOff);
    console.log(switchesIn[random]);
}

const removeSwitches = function () {
    switchesOut = [];
    for (let x = 0; x < totalSwitches; x++) {
        switchesIn[x].classList.remove('offSwitch');
    }
    while (switchesIn.length > totalSwitches) {
        let a = switchesIn.pop();
        a.classList.add('offSwitch');
        switchesOut.push(a);
        if (switchesIn.length === totalSwitches) { break; }
    }
}

const removePlayers = function () {
    playersOut = [];
    for (let y = 0; y < totalPlayers; y++) {
        playersIn[y].classList.remove('offPlayer');
    }
    while (playersIn.length > totalPlayers) {
        let b = playersIn.pop();
        b.classList.add('offPlayer');
        playersOut.push(b);
        if (playersIn.length === totalPlayers) { break; }
    }
}

const lightOn = function () {
    console.log(`switch is off, player`, activePlayer, `is safe`);
    this.classList.add('offSwitch');
    this.removeEventListener('click', lightOn);
    playersIn[activePlayer].classList.remove('activePlayer');
    nextPlayer();
}

const lightOff = function () {
    totalPlayers--;
    console.log(totalPlayers);
    console.log(`light is off, player`, activePlayer, `is eliminated.`);
    this.classList.add('offSwitch');
    this.removeEventListener('click', lightOff);
    switchesIn[random].removeEventListener('click', lightOn);
    switchesIn.splice(random, 1);
    switchesOut.push(this);
    playersIn[activePlayer].classList.add('offPlayer');
    playersOut.push(playersIn[activePlayer]);
    playersIn.splice(activePlayer, 1);
    console.log('switches in--->', switchesIn);
    console.log('switches out-->', switchesOut);
    console.log('players in---->', playersIn);
    console.log('players out--->', playersOut);
    shuffleSwitches();
    nextPlayer();
}

const nextPlayer = function () {}

const assignActivePlayer = function () {}

const startOver = function () {
    gameEnd();
    openPlayerWindow();
}

const setWinner = function () {}

const gameEnd = function () {
    gameActive = 0;
    playersIn, playersOut, switchesIn, switchesOut = [];
    activePlayer, totalPlayers, totalSwitches;
}

const openPlayerWindow = function () {
    divOverlay.classList.remove('hidden');
    divPlayers.classList.remove('hidden');
    tagBody.classList.remove('showBody');
}

const clearScores = function() {
    for (let x = 0; x < scores.length; x++) {
        scores[x] = document.querySelector(`#p${x}hiscore`);
        scores[x].textContent = '0';
    }
}















init();