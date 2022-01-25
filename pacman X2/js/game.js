'use strict'
const WALL = '🚧';
const FOOD = '.';
const EMPTY = ' ';
const SUPER_FOOD = '🧪';
const CHERRY = '🍉'

var gBoard;
var gGame = {
    score: 0,
    isOn: false
}
var gFoodCount = -1;
var gIntervalCherry = null;


function init() {
    document.querySelector('.play-again').style.display = 'none';
    gFoodCount = -1
    updateScore(0);

    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    createSuperFood(gBoard);

    printMat(gBoard, '.board-container')
    gIntervalCherry = setInterval(createCherry, 15000);
    gGame.isOn = true
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            gFoodCount++
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
               
                gFoodCount--
            }
        }
    }
    return board;
}

function updateScore(diff) {
    // update model and dom
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score;
}

function checkVictory() {
    if (gGame.score === gFoodCount) {
        gameOver();
    }
}

function gameOver() {
    var elDiv = document.querySelector('.play-again');
    var elDivSpan = elDiv.querySelector('span');

    elDivSpan.innerText = (gGame.score === gFoodCount) ? ' 😉 You win' : ' 😭 GAME OVER !'
    elDiv.style.display = 'block';

    gGame.score = 0;
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    clearInterval(gIntervalCherry);
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // update the DOM
    renderCell(gPacman.location, EMPTY)
}

function createSuperFood(board) {
    board[1][1] = SUPER_FOOD;
    board[1][board[0].length - 2] = SUPER_FOOD;
    board[board.length - 2][board[0].length - 2] = SUPER_FOOD;
    board[board.length - 2][1] = SUPER_FOOD;
    gFoodCount -= 4;
}

function createCherry() {
    var emptyLocations = getEmptyLocations(gBoard);
    if (!emptyLocations.length) return
    var emptyLocation = emptyLocations.pop();

    gBoard[emptyLocation.i][emptyLocation.j] = CHERRY;
    renderCell(emptyLocation, CHERRY);
}

function getEmptyLocations(board) {
    var emptyLocations = [];
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];
            if (currCell === EMPTY) {
                var location = {
                    i: i,
                    j: j
                }
                emptyLocations.push(location);
            }

        }
    }
    shuffle(emptyLocations);
    return emptyLocations;
}

