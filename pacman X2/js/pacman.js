'use strict'
var PACMAN = '<img width="40px" src="/img/pacman.png">';
const PACMAN_LEFT = '<img width="40px" src="/img/pacman-left.png">'
const PACMAN_RIGHT = '<img width="40px" src="/img/pacman-right.png">'
const PACMAN_DOWN = '<img width="40px" src="/img/pacman-down.png">'
const PACMAN_UP = '<img width="40px" src="/img/pacman-up.png">'
var gPacman;

function createPacman(board) {
    gPacman = {
        location: {
            i: 5,
            j: 7
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {
    if (!gGame.isOn) return

    var nextLocation = getNextLocation(ev);

    var nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL) return
    if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            removeGhost(nextLocation);
        } else {
            gameOver();
            return
        }
    } else if (nextCell === FOOD) {
        updateScore(1)
        checkVictory()
    } else if (nextCell === SUPER_FOOD) {
        if (gPacman.isSuper) return;
        gPacman.isSuper = true;
        setTimeout(stopSuperMode, 5000);
    } else if (nextCell === CHERRY) {
        updateScore(10);
        gFoodCount += 10;
    }

    // moving from corrent position:
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // Move the pacman to new location
    // update the model
    gPacman.location = {
        i: nextLocation.i,
        j: nextLocation.j
    }
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
    // update the DOM
    renderCell(gPacman.location, PACMAN)
}

function getNextLocation(keyboardEvent) {

    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (keyboardEvent.code) {
        case 'ArrowUp':
            nextLocation.i--;
            PACMAN = PACMAN_UP
            break;
        case 'ArrowDown':
            nextLocation.i++;
            PACMAN = PACMAN_DOWN
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            PACMAN = PACMAN_LEFT
            break;
        case 'ArrowRight':
            nextLocation.j++;
            PACMAN = PACMAN_RIGHT
            break;
        default: return null;
    }
    return nextLocation;
}
function stopSuperMode() {
    gPacman.isSuper = false;
    reviveGhosts();
}
