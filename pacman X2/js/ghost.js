'use strict'
const GHOST = '&#9781;';
var gGhosts;
var gKilledGhosts = [];
var gIntervalGhosts;

function createGhost(board) {
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        color: getRandomColor()
    }
    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = GHOST;
    // GHOST = getGhostHTML(ghost);
}

function createGhosts(board) {
    gGhosts = [];
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }

    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {

    var moveDiff = getMoveDiff()
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j,
    }

    var nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL) return
    if (nextCell === GHOST) return

    if (nextCell === PACMAN) {
        if (!gPacman.isSuper) {
            gameOver();
        }
        return
    }

    // moving from corrent position:
    // update the model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    // Move the ghost to new location
    // update the model
    ghost.location = {
        i: nextLocation.i,
        j: nextLocation.j
    }
    ghost.currCellContent = nextCell
    gBoard[ghost.location.i][ghost.location.j] = GHOST
    // update the DOM
    renderCell(ghost.location, getGhostHTML(ghost))
}

function getGhostHTML(ghost) {
    var color = (gPacman.isSuper) ? 'blue' : ghost.color;
    return `<span style="color:${color}">${GHOST}</span>`;
}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(1, 100);
    if (randNum <= 25) {
        return { i: 0, j: 1 }
    } else if (randNum <= 50) {
        return { i: -1, j: 0 }
    } else if (randNum <= 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}

function removeGhost(location) {
    for (var i = 0; i < gGhosts.length; i++) {
        var currGhost = gGhosts[i];
        if (currGhost.location.i === location.i &&
            currGhost.location.j === location.j) {
            checkCellContent(currGhost)
            var killedGhost = gGhosts.splice(i, 1)[0];
            gKilledGhosts.push(killedGhost);
        }
    }
}

function checkCellContent(ghost) {
    if (ghost.currCellContent === FOOD) {
        updateScore(1);
        ghost.currCellContent = EMPTY;
    } else if (ghost.currCellContent === CHERRY) {
        updateScore(10);
        ghost.currCellContent = EMPTY;
    }
}

function reviveGhosts() {
    for (var i = 0; i < gKilledGhosts.length; i++) {
        gGhosts.push(gKilledGhosts[i]);
    }
    gKilledGhosts = [];
}

// function getGhostHTML(ghost) {
//     if (!gPacman.isSuper) return `<div style="background-color: ${ghost.color}" class="ghost"></div>`;
//     return `<div style="background-color: red" class="ghost"></div>`;
// }