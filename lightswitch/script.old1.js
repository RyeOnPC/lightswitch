'use strict';

let players, scores, switches, remainingSwitches, random, badSwitch;
let switch0, switch1, switch2, switch3, switch4, switch5;
let divOverlay = document.querySelector('#overlay');
let divPlayers = document.querySelector('#players');
let tagBody = document.querySelector('body');
let divLightBulb = document.querySelector('#lightBulb');
let divNewGame = document.querySelector('#newGameBtn');
let divRoomNum = document.querySelector('.round');
let playerQuantity = document.querySelector('#player-quantity');

let activePlayer = 0;
let gameActive = 0;
let totalPlayers = 4;
let totalSwitches = 5;
let startGame = document.querySelector('#begin');



// runs upon page load
const onStart = function() {
    blankOut();
    resetSwitches();
    gameOff();
    startGame.addEventListener('click', newGame);
    divNewGame.addEventListener('click', startOver);
}

// new game, starts when 'begin' button is clicked
const newGame = function() {
    blankOut();
    gameActive = 1;
    totalPlayers = Number(playerQuantity.value);
    totalSwitches = totalPlayers + 1;
    tagBody.classList.add('showBody');
    divOverlay.classList.add('hidden');
    divPlayers.classList.add('hidden');
    divLightBulb.classList.add('lightOn');
    activePlayer = 0;
    switches = [1,2,3,4,5,6];
    remUnusedSwitches();
    remUnusedPlayers();
    resetSwitches();
    clearScores();
    assignActivePlayer();
    console.log(`game on! ---- starting with ${totalPlayers} players. player ${activePlayer+1} goes first!`);
}

// functions ran when game starts
const resetSwitches = function() {
    for (let x = 0; x < switches.length; x++) {
        switches[x] = document.querySelector(`#switch${x}`);
        switches[x].removeEventListener('click', doSwitchOff);
        switches[x].removeEventListener('click', doLightOff);
        switches[x].addEventListener('click', doSwitchOff);
        switches[x].classList.remove('offSwitch');
    }
    for (let y = 0; y < players.length; y++) {
        players[y] = document.querySelector(`#player${y}`);
        players[y].classList.remove('offPlayer');
    }
    shuffleSwitches();
}

const shuffleSwitches = function() {
    remainingSwitches = switches.length;
    random = Math.trunc(Math.random() * (totalPlayers+1));
    badSwitch = random;
    console.log('the bad switch is #',random+1);
    switches[random].addEventListener('click', doLightOff);
}

const remUnusedSwitches = function() {
    while (switches.length > totalSwitches) {
        switches.pop();
        if (switches.length === totalSwitches) { break; }
    }
}

const remUnusedPlayers = function() {
    while (players.length > totalPlayers) {
        players.pop();
        if (players.length === totalPlayers) { break; }
    }
}

const assignActivePlayer = function() {
    console.log(players[activePlayer]);
    players[activePlayer].classList.add('activePlayer');
    console.log('player', activePlayer+1, "'s turn");
}

// light switch functions
const doSwitchOff = function() {
    console.log(`switch is off, player`, activePlayer, `is safe`);
    this.classList.add('offSwitch');
    this.removeEventListener('click', doSwitchOff);
    players[activePlayer].classList.remove('activePlayer');
    console.log(switches);
    nextPlayer();
}

const doLightOff = function() {
    console.log(`light is off`);
    this.classList.add('offSwitch');
    switches[switches.length-1].removeEventListener('click', doLightOff);
    switches.pop();
    console.log(switches);
    players[activePlayer].classList.remove('activePlayer');
    players[activePlayer].classList.add('outPlayer');
    players.pop(activePlayer);
    console.log(players.length, "remaining players");
    shuffleSwitches();
    nextPlayer();
}

const nextPlayer = function() {
    remainingSwitches--;
    console.log(remainingSwitches, "remaining switches");
    activePlayer++;
    console.log(activePlayer, players.length);
    if (activePlayer > players.length) {
        activePlayer = Number('0');
        console.log(activePlayer, players.length);
        assignActivePlayer();
    } else if (remainingSwitches < 2) {
        resetSwitches();
        assignActivePlayer();
    } else {
        assignActivePlayer();
    }
}

// game reset functions, these happen when 'new game' button is pressed
let startOver = function() {
    gameOff();
    showSetPlayers();
}

const showSetPlayers = function() {
    divOverlay.classList.remove('hidden');
    divPlayers.classList.remove('hidden');
    tagBody.classList.remove('showBody');
}

// game is off
const gameOff = function() {
    gameActive = 0;
    for (let x = 0; x < switches.length; x++) {
        switches[x].removeEventListener('click', doLightOff);
        switches[x].removeEventListener('click', doSwitchOff);
        switches[x].classList.add('offSwitch');
        divLightBulb.classList.remove('lightOn');
    }
    for (let y = 0; y < players.length; y++) {
        players[y].classList.add('offPlayer');
    }
}

// clear scores button
const clearScores = function() {
    for (let x = 0; x < scores.length; x++) {
        scores[x] = document.querySelector(`#p${x}hiscore`);
        scores[x].textContent = '0';
    }
}

const blankOut = function() {
    switches = [1,2,3,4,5,6];
    players = [1,2,3,4,5];
    scores = [1,2,3,4,5];
}

const remLastSwitch = function() {
    if (random === switches.length-1) {
    } else {
        switches[switches.length-1].removeEventListener('click', doSwitchOff);
    }
    switches.pop();
}




















// starts the page script ---- see line 24
onStart();

/*
     =======================================
       The plan here is to have blank space
       So I am filling it in, since I just
       have to put in some random content.
     =======================================
*/


// const initTest = function() {
//     divOverlay.classList.add('hidden');
//     divPlayers.classList.add('hidden');
//     tagBody.classList.add('showBody');
// }

// initTest();
