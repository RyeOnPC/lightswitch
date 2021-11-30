'use strict';

let players, rooms, currentSwitches, activePlayer;

let totalPlayers = document.querySelector('.totalPlayers');
let totalPlayers2 = document.querySelector('#tP2');
let totalRooms = document.querySelector('.totalRooms');
let totalSwitches = document.querySelector('.totalSwitches');
let roomNumber = document.querySelector('.round');

let gameActive = 0;
let random = 0;
let currentRoom = 1;

let playerEntry = document.querySelector('#players');
let overlayEl = document.querySelector('#overlay');
let bodyEl = document.querySelector('body');
let playersEl = document.querySelector('#player-quantity');
let setPlayers = document.querySelector('#begin');
let switch0, switch1, switch2, switch3, switch4, switch5;
let switches = ['switch0','switch1','switch2','switch3','switch4','switch5'];
let playerBoxes = ['playerBox0','playerBox1','playerBox2','playerBox3','playerBox4'];
let playersOut = [];

let arOrdinal = ['zero','one','two','three','four','five','six'];

const setSwitches = function() {
    currentSwitches === players;
    for (let x = 0; x < switches.length; x++) {
        switches[x] !== document.querySelector(`#switch${x}`);
        switches[x] = document.querySelector(`#switch${x}`);
        switches[x].classList.remove('switchOff');
        switches[x].classList.remove('badSwitch');
        if (x <= players) {
            switches[x].addEventListener('click',offSwitchNo);
        } else if (x > players) {
            switches[x].classList.add('hidden');
        }
    }
}

const shuffleSwitches = function() {
    currentSwitches = players - playersOut.length;
    random = Math.trunc(Math.random() * players);
    switches[random].removeEventListener('click',offSwitchNo);
    switches[random].addEventListener('click',offSwitchYes);
}

const newGame = function() {
    activePlayer = 0;
    gameActive = 1;
    players = Number(playersEl.value);
    rooms = players - 1;
    playersOut = [];
    currentSwitches === players;
    bodyEl.classList.remove('hideBody');
    bodyEl.classList.add('showBody');
    totalPlayers.textContent = arOrdinal[players];
    totalPlayers2.textContent = arOrdinal[players];
    totalRooms.textContent = arOrdinal[rooms];
    totalSwitches.textContent = arOrdinal[switches];
    playerEntry.classList.add('hidden');
    overlayEl.classList.add('hidden');
    console.log(`you have entered ${players} players.`);
    console.log(`player ${activePlayer+1} goes first.`);
    for (let y = 0; y < 5; y++) {
        playerBoxes[y] = document.querySelector(`#player${y}`);
        playerBoxes[y].classList.remove('hidden');
        if (y >= players) {
            playerBoxes[y].classList.add('hidden');
        }
    }
    setSwitches();
    shuffleSwitches();
}
const offSwitchNo = function() {
    if (gameActive) {
        // hide and remove its listener
        this.classList.add('switchOff');
        this.removeEventListener('click', offSwitchNo);
        currentSwitches--;
        console.log(`player ${activePlayer+1} advances. there are ${currentSwitches} switches left`);
        nextPlayer();
    }
}

const offSwitchYes = function() {
    if (gameActive) {
        players--;
        currentSwitches--;
        console.log(`player ${activePlayer+1} has been removed`);
        this.classList.add('badSwitch');
        this.removeEventListener('click', offSwitchNo);
        playerBoxes[activePlayer].classList.add('outPlayer');
        playerBoxes[activePlayer].classList.remove('activePlayer');
        playersOut.push(activePlayer);
        console.log(`you now have ${players} players`);
        console.log(`Players`, playersOut, `have been eliminated.`);
        nextPlayer();
        nextRoom();
        setSwitches();
        shuffleSwitches();
    }
}

const nextPlayer = function() {
    // takes away switch from use until shuffle
    playerBoxes[activePlayer].classList.remove('activePlayer');
    // removes active player role
    if (activePlayer+1 > players) {
        // player recycle ( goes from last player to first player )
        activePlayer = 0;
        playerBoxes[activePlayer].classList.add('activePlayer');
        skipPlayer(); // removes active player role from players already out
    } else {
        // normal player progression
        activePlayer++;
        playerBoxes[activePlayer].classList.add('activePlayer');
        skipPlayer(); // removes active player role from players already out
    }
    if (currentSwitches === 0) {
        restartRound();
    }
    console.log(`it is now player ${activePlayer+1}'s turn'`);
}


setPlayers.addEventListener('click', newGame);

const nextRoom = function() {
    currentRoom++;
    roomNumber.textContent = currentRoom;
}

const restartRound = function() {
    for (let x = 0; x < switches.length; x++) {
        switches[x].classList.remove('hidden');
    }
    console.log(`the switches have been shuffled. there are now ${currentSwitches} switches again.`);
    setSwitches();
    shuffleSwitches();
}
const skipPlayer = function() {
    while (playersOut.includes(activePlayer)) {
        playerBoxes[activePlayer].classList.remove('activePlayer');
        activePlayer++;
        playerBoxes[activePlayer].classList.add('activePlayer');
    }
    if (activePlayer === players) {
        activePlayer = 0;
    }
}