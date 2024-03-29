/*
 ********************************************************************************
 * Constants
 ********************************************************************************
 */

const PLAYER_VS_PLAYER = 0;
const PLAYER_VS_COMPUTER = 1;
const gameModes = ["Player vs Player", "Player vs Computer"];
// 0 is Player vs Player, 1 is Player vs Computer
// 0 is Red Turn, 1 is Yellow Turn
const TURNS = [
  {
    color: "red",
    score: 0,
  },
  {
    color: "yellow",
    score: 0,
  },
];

const ROWS = 6;
const COLUMNS = 7;

const startGameButton = document.getElementsByTagName("button")[0];
const initialMenuDiv = document.getElementById("initialMenu");
const playerTurnDiv = document.getElementById("playerTurn");
const restartGameButton = document.querySelectorAll(".restartGame");
const pauseButton = document.querySelector('[data-bs-target="#pauseModal"]');
/*
 ********************************************************************************
 * Variables
 ********************************************************************************
 */

let gameMode = gameModes[PLAYER_VS_PLAYER];
let boardIsFull = false;
let currentTurn = randomTurnStart();
let boardArray = [];
let columnCounter = [5, 5, 5, 5, 5, 5, 5];

let seconds;
let timer;
let pause = false;

/*
 ********************************************************************************
 * Event listeners
 ********************************************************************************
 */

restartGameButton[0].addEventListener("click", restartGame);
startGameButton.addEventListener("click", setGame);
pauseButton.addEventListener("click", function () {
  let bootstrapModalBackdrop = document.querySelectorAll(".modal-backdrop")[0];

  bootstrapModalBackdrop.classList.add("opacity");

  let continueGameButton = document.getElementsByTagName("button")[2];
  let restartGameButton = document.getElementsByTagName("button")[3];
  let quitGameButton = document.getElementsByTagName("button")[4];

  continueGameButton.addEventListener("click", resumeTimer);
  restartGameButton.addEventListener("click", function () {
    resetTimer();
    resumeTimer();
    restartGame();
  });

  quitGameButton.addEventListener("click", function () {
    window.location.reload();
  });

  if (!pause) {
    pauseTimer();
  } else {
    resumeTimer();
  }
});

/*
 ********************************************************************************
 * Game setup functions
 ********************************************************************************
 */

function setGame() {
  initialMenuDiv.classList.add("d-none");
  playerTurnDiv.classList.remove("d-none");

  let backgroundDiv = document.getElementsByClassName("background")[0];
  backgroundDiv.classList.remove("d-none");

  let body = document.body;

  body.style.display = "block";
  body.style.justifyContent = "normal";
  body.style.alignItems = "normal";
  body.style.backgroundColor = "#7945ff";

  setBoard();
  setTimer();
}

function randomTurnStart() {
  return Math.floor(Math.random() * 2);
}

function setBoard() {
  for (let r = 0; r < ROWS; r++) {
    let row = [];
    for (let c = 0; c < COLUMNS; c++) {
      // Javascript
      row.push("X");
      // HTML
      let counterDiv = document.createElement("div");
      counterDiv.id = r + "-" + c;

      counterDiv.addEventListener("click", setCounter);

      document.querySelector(".grid-container").append(counterDiv);
    }
    boardArray.push(row);
  }
}

setPlayerDivIndicator();

/*
 ********************************************************************************
 * Game logic functions
 ********************************************************************************
 */

function setCounter() {
  if (boardIsFull) {
    return;
  }

  let boardCoordenates = this.id.split("-");

  let rowCoordenate = columnCounter[boardCoordenates[1]];
  let columnCoordenate = parseInt(boardCoordenates[1]);

  if (columnCounter[columnCoordenate] >= 0) {
    columnCounter[columnCoordenate] = columnCounter[columnCoordenate] - 1;

    if (!boardArray[rowCoordenate][columnCoordenate] == " ") {
      boardArray[rowCoordenate][columnCoordenate] = currentTurn;
    }

    document.getElementById(
      rowCoordenate + "-" + columnCoordenate
    ).innerHTML = `<picture>
    <source media="(min-width: 632px)" srcset="assets/images/counter-${TURNS[currentTurn].color}-large.svg">
    <img src="assets/images/counter-${TURNS[currentTurn].color}-small.svg" alt="Counter">
  </picture>`;
    checkConnectFour();
    checkBoardIsFull();
  }
}

function switchTurn() {
  currentTurn = 1 - currentTurn;
  console.log("Current turn: " + TURNS[currentTurn].color);
  setPlayerDivIndicator();
  resetTimer();
}

function checkConnectFour() {
  let roundWinner;

  //Horizontally
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLUMNS - 3; c++) {
      if (boardArray[r][c] !== "X") {
        if (
          boardArray[r][c] === boardArray[r][c + 1] &&
          boardArray[r][c + 1] === boardArray[r][c + 2] &&
          boardArray[r][c + 2] === boardArray[r][c + 3]
        ) {
          roundWinner = boardArray[r][c];
          checkWinner(roundWinner);
          return;
        }
      }
    }
  }

  //Vertically
  for (let c = 0; c < COLUMNS; c++) {
    for (let r = 0; r < ROWS - 3; r++) {
      if (boardArray[r][c] !== "X") {
        if (
          boardArray[r][c] === boardArray[r + 1][c] &&
          boardArray[r + 1][c] === boardArray[r + 2][c] &&
          boardArray[r + 2][c] === boardArray[r + 3][c]
        ) {
          roundWinner = boardArray[r][c];
          checkWinner(roundWinner);
          return;
        }
      }
    }
  }

  //Anti diagonal
  for (let r = 0; r < ROWS - 3; r++) {
    for (let c = 0; c < COLUMNS - 3; c++) {
      if (boardArray[r][c] !== "X") {
        if (
          boardArray[r][c] == boardArray[r + 1][c + 1] &&
          boardArray[r + 1][c + 1] == boardArray[r + 2][c + 2] &&
          boardArray[r + 2][c + 2] == boardArray[r + 3][c + 3]
        ) {
          roundWinner = boardArray[r][c];
          checkWinner(roundWinner);
          return;
        }
      }
    }
  }

  //Digagonal
  for (let r = 3; r < ROWS; r++) {
    for (let c = 0; c < COLUMNS - 3; c++) {
      if (boardArray[r][c] !== "X") {
        if (
          boardArray[r][c] == boardArray[r - 1][c + 1] &&
          boardArray[r - 1][c + 1] == boardArray[r - 2][c + 2] &&
          boardArray[r - 2][c + 2] == boardArray[r - 3][c + 3]
        ) {
          roundWinner = boardArray[r][c];
          checkWinner(roundWinner);
          return;
        }
      }
    }
  }

  switchTurn();
}

function checkWinner(roundWinner) {
  // 0 is Red Turn, 1 is Yellow Turn
  console.log("Winner is " + TURNS[roundWinner].color);
  TURNS[roundWinner].score++;
  printScore(roundWinner);
  boardIsFull = true;
  printWinner();
}

function checkBoardIsFull() {
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLUMNS; c++) {
      if (boardArray[r][c] === "X") {
        return;
      }
    }
    return;
  }
  console.log("Board is full");
  boardIsFull = true;
}

/*
 ********************************************************************************
 * UI Update Functions
 ********************************************************************************
 */

function setPlayerDivIndicator() {
  let turnDiv = document.getElementsByClassName("turn_div")[0];
  let playerDivs = document.getElementsByClassName("player_div");
  turnDiv.querySelector("h4").innerText =
    "PLAYER'S " + (currentTurn + 1) + " TURN";
  if (currentTurn === 0) {
    turnDiv.classList.remove("playerTwo");
    turnDiv.classList.add("playerOne");
    playerDivs[1].querySelector("img").classList.remove("pulse");
    playerDivs[0].querySelector("img").classList.add("pulse");
  } else {
    turnDiv.classList.remove("playerOne");
    turnDiv.classList.add("playerTwo");
    playerDivs[0].querySelector("img").classList.remove("pulse");
    playerDivs[1].querySelector("img").classList.add("pulse");
  }
}

function printScore(roundWinner) {
  let playerDivs = document.getElementsByClassName("player_div");

  playerDivs[roundWinner].querySelector("h2").innerText =
    TURNS[roundWinner].score;
}

function printWinner() {
  boardIsFull = true;
  clearInterval(timer);

  let turnDiv = document.getElementsByClassName("turn_div")[0];
  turnDiv.classList.remove("playerOne");
  turnDiv.classList.remove("playerTwo");
  turnDiv.classList.add("printWinner");
  turnDiv.querySelector("h2").remove();
  turnDiv.querySelector("h4").innerText =
    "PLAYER " + (currentTurn + 1) + " WINS";
  let button = document.createElement("a");
  button.classList.add("header__button");
  button.classList.add("mx-5");
  button.classList.add("restartButton");
  button.innerText = "RESTART";
  button.addEventListener("click", resetGame);
  turnDiv.appendChild(button);
}

/*
 ********************************************************************************
 * Game Reset Functions
 ********************************************************************************
 */

function resetGame() {
  let turnDiv = document.getElementsByClassName("turn_div")[0];
  turnDiv.classList.remove("printWinner");
  turnDiv.querySelector("a").remove();
  let h2 = document.createElement("h2");
  turnDiv.appendChild(h2);
  restartBoardArray();
}

function restartGame() {
  TURNS.forEach((player) => {
    player.score = 0;
  });
  printScore(0);
  printScore(1);
  restartBoardArray();
}

function restartBoardArray() {
  columnCounter = [5, 5, 5, 5, 5, 5, 5];

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLUMNS; c++) {
      boardArray[r][c] = "X";
      document.getElementById([r] + "-" + [c]).innerHTML = "";
    }
  }
  boardIsFull = false;
  switchTurn();
}

/*
 ********************************************************************************
 * Timers Functions
 ********************************************************************************
 */

function setTimer() {
  seconds = 11;
  decrementSeconds();
  timer = setInterval(decrementSeconds, 1000);
}

function decrementSeconds() {
  if (!pause) {
    seconds--;
    let turnDiv = document.getElementsByClassName("turn_div")[0];
    turnDiv.querySelector("h2").innerText = seconds;
    if (seconds <= 0) {
      clearInterval(timer);
      switchTurn();
    }
  }
}

function resetTimer() {
  clearInterval(timer); // stop the current timer
  setTimer(); // start a new timer
}

function pauseTimer() {
  pause = true;
}

function resumeTimer() {
  pause = false;
}
