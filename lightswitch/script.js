'use strict';

let divPlayerQuantity = document.querySelector('#player-quantity');
let divOverlay = document.querySelector('#overlay');
let divPlayers = document.querySelector('#players');
let divLightBulb = document.querySelector('#lightBulb');
let divLightGlow = document.querySelector('#light');
let divNewGame = document.querySelector('#newGameBtn');
let divRoomNum = document.querySelector('.round');
let tagBody = document.querySelector('body');
let btnBegin = document.querySelector('#begin');
let messageColor = document.querySelector('#message');
let messageTxt1 = document.querySelector('#msgLine1');
let messageTxt2 = document.querySelector('#msgLine2');

let playersIn, playersOut, switchesIn, switchesOut = [];
let activePlayer, gameActive, totalPlayers, totalSwitches, totalRooms;
let switches, players, random, winner, winnerIndex;
let scores = [0,0,0,0,0];

let playersOrd = document.querySelector('.totalPlayers');
let playersOrd2 = document.querySelector('#tP2');
let playersOrd3 = document.querySelector('#tP3');
let roomsOrd = document.querySelector('.totalRooms');
let switchesOrd = document.querySelector('.totalSwitches');
let arOrdinal = ['zero','one','two','three','four','five','six'];


// run on start
const init = function () {
    activePlayer = 0;
    gameActive = 0;
    totalPlayers = 4;
    totalSwitches = 5;
    btnBegin.addEventListener('click', startGame);
    divNewGame.addEventListener('click', startOver);
    clearScores();
}

const startGame = function () {
    gameActive = 1;
    activePlayer = 0;
    totalPlayers = Number(divPlayerQuantity.value);
    totalSwitches = totalPlayers + 1;
    totalRooms = totalPlayers - 1;
    switchesIn = [1,2,3,4,5,6];
    playersIn = [1,2,3,4,5];
    tagBody.classList.add('showBody');
    divOverlay.classList.add('hidden');
    divPlayers.classList.add('hidden');
    divLightBulb.classList.add('lightOn');
    divLightGlow.classList.remove('invisible');
    divRoomNum.textContent = "1";
    playersOrd.textContent = arOrdinal[totalPlayers];
    playersOrd2.textContent = arOrdinal[totalPlayers];
    playersOrd3.textContent = arOrdinal[totalPlayers];
    roomsOrd.textContent = arOrdinal[totalRooms];
    switchesOrd.textContent = arOrdinal[totalSwitches];
    setSwitches();
    removeSwitches();
    setPlayers();
    removePlayers();
    messageTxt1.textContent = `let the game begin.`;
    nextPlayer();
}

const setSwitches = function () {
    if (gameActive) {
        for (let x = 0; x < switchesIn.length; x++) {
            switchesIn[x] = document.querySelector(`#switch${x}`);
        }
        shuffleSwitches();
    }
}

const setPlayers = function () {
    for (let y = 0; y < playersIn.length; y++) {
        playersIn[y] = document.querySelector(`#player${y}`);
        if (gameActive) {
            messageColor.classList.remove('msg-gld');
            playersIn[y].classList.remove('winnerPlayer');
        }
    }
}

const shuffleSwitches = function () {
    if (gameActive) {
        totalSwitches = totalPlayers + 1;
        for (let x = 0; x < switchesIn.length; x++) {
            switchesIn[x].removeEventListener('click', lightOn);
            switchesIn[x].removeEventListener('click', lightOff);
            switchesIn[x].classList.remove('offSwitch');
            switchesIn[x].addEventListener('click', lightOn);
        }
        random = Math.trunc(Math.random() * (totalPlayers+1));
        switchesIn[random].removeEventListener('click', lightOn);
        switchesIn[random].addEventListener('click', lightOff);
        console.log(switchesIn[random]);
    }
}

const removeSwitches = function () {
    switchesOut = [];
    for (let x = 0; x < totalSwitches; x++) {
        switchesIn[x].classList.remove('offSwitch');
    }
    while (switchesIn.length > totalSwitches) {
        let a = switchesIn.pop();
        a.classList.add('offSwitch');
        a.removeEventListener('click', lightOn);
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
    if (gameActive) {
        successPlayerMsg();
        this.classList.add('offSwitch');
        this.removeEventListener('click', lightOn);
        playersIn[activePlayer].classList.remove('activePlayer');
        activePlayer++;
        totalSwitches--;
        nextPlayer();
    }
}

const lightOff = function () {
    if (gameActive) {
        divLightGlow.classList.add('invisible');
        divLightBulb.classList.remove('lightOn');
        eliminatePlayerMsg();
        setTimeout(function () {divLightGlow.classList.remove('invisible'); divLightBulb.classList.add('lightOn');}, 2000)
        totalPlayers--;
        switchesIn.splice(random, 1);
        switchesOut.push(this);
        this.classList.add('offSwitch');
        this.removeEventListener('click', lightOff);
        this.removeEventListener('click', lightOn);
        playersIn[activePlayer].classList.remove('activePlayer');
        playersIn[activePlayer].classList.add('offPlayer');
        playersOut.push(playersIn[activePlayer]);
        playersIn.splice(activePlayer, 1);
        divRoomNum.textContent++;
        if (playersIn.length > 1) {
            shuffleSwitches();
            nextPlayer();
        } else {
            setWinner();
            gameActive = 0;
            divRoomNum.textContent--;
        }
    }
}

const turnLightOn = function () {
    divLightGlow.classList.remove('invisible');
    divLightBulb.classList.add('lightOn');
}

const nextPlayer = function () {
    if (activePlayer === playersIn.length) {
        activePlayer = 0;
    }
    playersIn[activePlayer].classList.add('activePlayer');
    nextPlayerMsg();
    if (totalSwitches < 2) {
        setSwitches();
        shuffleMsg();
    }
}

const startOver = function () {
    gameEnd();
    openPlayerWindow();
}

const setWinner = function () {
    for (let x = 0; x < switchesIn.length; x++) {
        switchesIn[x].classList.add('offSwitch');
        switchesIn[x].removeEventListener('click', lightOff);
        switchesIn[x].removeEventListener('click', lightOn);
    }
    gameActive = 0;
    playersIn[0].classList.add('winnerPlayer');
    winMsg();
    console.log(`${playersIn[0].textContent} is the winner!`);
    // add 1 point to player
    winner = playersIn[0];
    playersIn = [1,2,3,4,5];
    setPlayers();
    winnerIndex = playersIn.indexOf(winner);
    scores[winnerIndex].textContent++;
}

const gameEnd = function () {
    gameActive = 0;
    playersIn[0].classList.remove('winnerPlayer');
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

const eliminatePlayerMsg = function () {
    messageTxt1.textContent = `${playersIn[activePlayer].textContent} has been eliminated!`;
    messageColor.classList.add('msg-red');
    setTimeout(function () {messageColor.classList.remove('msg-red');}, 100);
}

const successPlayerMsg = function () {
    messageTxt1.textContent = `well done, ${playersIn[activePlayer].textContent}!`;
    messageColor.classList.add('msg-grn');
    setTimeout(function () {messageColor.classList.remove('msg-grn');}, 100);
}

const nextPlayerMsg = function () {
    messageTxt2.textContent = `${playersIn[activePlayer].textContent}, your turn!`;
}

const shuffleMsg = function () {
    messageTxt1.textContent = `the switches have been shuffled!`;
    messageTxt2.textContent = `restart the round`;
}

const winMsg = function () {
    messageTxt1.textContent = `${playersIn[activePlayer].textContent} wins!`;
    messageTxt2.textContent = `tally a win for ${playersIn[activePlayer].textContent}!`;
    messageColor.classList.add('msg-gld');
}













init();