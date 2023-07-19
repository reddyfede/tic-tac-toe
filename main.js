/*----- app's state (variables) -----*/

let turn;
let grid;
let players;
let winner;
let tie;

/*----- cached element references -----*/

const btnEls = document.querySelectorAll(".gameBtn")
const playerXEl = document.getElementById("PlayerX")
const playerOEl = document.getElementById("PlayerO")
const resetBtnEl = document.getElementById("resetButton")
const bodyEl = document.querySelector("body")
const xwinEl = document.getElementById("xwin")
const owinEl = document.getElementById("owin")
const tieEl = document.getElementById("tie")

/*----- event listeners -----*/


for (btn of btnEls) {
    btn.addEventListener("mouseover", mouseOverHandler)
    btn.addEventListener("mouseout", mouseOutHandler)
    btn.addEventListener("click", mouseClickHandler)
}


resetBtnEl.addEventListener("mouseover", resetMouseOverHandler)
resetBtnEl.addEventListener("mouseout", resetMouseOutHandler)
resetBtnEl.addEventListener("click", resetClickHandler)


/*----- functions -----*/

function init() {

    bodyEl.classList.remove("hoverInTurnX")
    bodyEl.classList.remove("hoverInTurnO")
    bodyEl.classList.remove("tieGame")
    xwinEl.style.visibility = ("hidden")
    owinEl.style.visibility = ("hidden")
    tieEl.style.visibility = ("hidden")
    resetBtnEl.classList.remove("onGameEnd")

    for (btn of btnEls) {
        btn.disabled = false
        btn.classList.remove("clickInTurnX")
        btn.classList.remove("clickInTurnO")
    }

    players = ["X", "O"]
    winner = ""
    tie = false

    turn = players[Math.floor(Math.random() * players.length)]
    changeTurn()

    grid = ["", "", "", "", "", "", "", "", ""]

    render()
}

function mouseOverHandler(e) {
    if (e.target.tagName !== "BUTTON") {
        return
    }
    if (e.target.disabled) {
        return
    }

    e.target.innerText = turn

    if (turn === players[0]) {
        e.target.classList.add("hoverInTurnX")
    } else {
        e.target.classList.add("hoverInTurnO")
    }
}

function mouseOutHandler(e) {
    if (e.target.tagName !== "BUTTON") {
        return
    }

    if (e.target.disabled) {
        return
    }

    e.target.innerText = ""

    if (turn === players[0]) {
        e.target.classList.remove("hoverInTurnX")
    } else {
        e.target.classList.remove("hoverInTurnO")
    }
}

function mouseClickHandler(e) {

    if (e.target.tagName !== "BUTTON") {
        return
    }
    if (e.target.disabled) {
        return
    }

    grid[parseInt(e.target.id)] = turn

    if (turn === players[0]) {
        e.target.classList.add("clickInTurnX")
        e.target.classList.remove("hoverInTurnX")
    } else {
        e.target.classList.add("clickInTurnO")
        e.target.classList.remove("hoverInTurnO")
    }

    render()

    e.target.disabled = true

    checkWin()

}

function resetClickHandler() {
    init()
}

function resetMouseOverHandler(e) {
    e.target.style.backgroundColor = "grey"
}

function resetMouseOutHandler(e) {
    e.target.style.backgroundColor = "lightgrey"
}

function changeTurn() {
    if (turn === players[0]) {
        turn = players[1]
        playerOEl.classList.add("hoverInTurnO")
        playerXEl.classList.remove("hoverInTurnX")
    } else {
        turn = players[0]
        playerXEl.classList.add("hoverInTurnX")
        playerOEl.classList.remove("hoverInTurnO")
    }
}

function checkWin() {
    let row1 = grid[0] + grid[1] + grid[2]
    let row2 = grid[3] + grid[4] + grid[5]
    let row3 = grid[6] + grid[7] + grid[8]
    let col1 = grid[0] + grid[3] + grid[6]
    let col2 = grid[1] + grid[4] + grid[7]
    let col3 = grid[2] + grid[5] + grid[8]
    let dia1 = grid[0] + grid[4] + grid[8]
    let dia2 = grid[2] + grid[4] + grid[6]

    let winGrid = [row1, row2, row3, col1, col2, col3, dia1, dia2]

    for (el of winGrid) {
        if (el === "XXX") {
            winner = players[0]
            break
        } else if (el === "OOO") {
            winner = players[1]
            break
        }
    }

    if (winner === "") {
        checkTie(winGrid)
    }

    if (winner === "" && !tie) {
        changeTurn()
    } else {
        renderWin()
    }

}

function checkTie(winGrid) {

    tie = true;

    for (el of winGrid) {
        if (el.length !== 3) {
            tie = false;
            break
        }
    }

    if (tie) {
        renderTie()
    }

}

function renderWin() {
    for (btn of btnEls) {
        btn.disabled = true
    }

    if (winner === players[0]) {
        bodyEl.classList.add("hoverInTurnX")
        xwinEl.style.visibility = ("visible")
    } else if (winner === players[1]) {
        bodyEl.classList.add("hoverInTurnO")
        owinEl.style.visibility = ("visible")
    }

    resetBtnEl.classList.add("onGameEnd")
}


function render() {
    renderGrid()
}

function renderGrid() {
    for (btn of btnEls) {
        btn.innerText = grid[parseInt(btn.id)]
    }
}

function renderTie() {
    bodyEl.classList.add("tieGame")
    tieEl.style.visibility = ("visible")
    resetBtnEl.classList.add("onGameEnd")
    playerOEl.classList.remove("hoverInTurnO")
    playerXEl.classList.remove("hoverInTurnX")
}

/*----- let's go -----*/

init()


