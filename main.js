/*----- app's state (variables) -----*/

let turn;
let grid;
let players;
let winner;

/*----- cached element references -----*/

const btnEls = document.querySelectorAll(".gameBtn")
const playerXEl = document.getElementById("PlayerX")
const playerOEl = document.getElementById("PlayerO")
const btnReset = document.getElementById("reset-button")
const bodyEl = document.querySelector("body")
const xwinEl = document.getElementById("xwin")
const owinEl = document.getElementById("owin")

/*----- event listeners -----*/


for (btn of btnEls) {
    btn.addEventListener("mouseover", mouseOverHandler)
    btn.addEventListener("mouseout", mouseOutHandler)
    btn.addEventListener("click", mouseClickHandler)
}

btnReset.addEventListener("click", resetClickHandler)

/*----- functions -----*/

function init() {

    bodyEl.classList.remove("hoverInTurnX")
    bodyEl.classList.remove("hoverInTurnO")
    xwinEl.style.visibility = ("hidden");
    owinEl.style.visibility = ("hidden");

    for (btn of btnEls) {
        btn.disabled = false
        btn.classList.remove("clickInTurnX")
        btn.classList.remove("clickInTurnO")
    }

    players = ["X", "O"]
    winner = ""

    turn = players[Math.floor(Math.random() * players.length)];
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
        e.target.classList.toggle("hoverInTurnX")
    } else {
        e.target.classList.toggle("hoverInTurnO")
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
        e.target.classList.toggle("hoverInTurnX")
    } else {
        e.target.classList.toggle("hoverInTurnO")
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
        e.target.classList.toggle("hoverInTurnX")
    } else {
        e.target.classList.add("clickInTurnO")
        e.target.classList.toggle("hoverInTurnO")
    }

    render()

    e.target.disabled = true

    checkWin()

}

function resetClickHandler(e) {
    init()
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
        changeTurn()
    } else {
        renderWin()
    }

}

function renderWin() {
    for (btn of btnEls) {
        btn.disabled = true
    }

    if (winner === players[0]) {
        bodyEl.classList.add("hoverInTurnX")
        xwinEl.style.visibility = ("visible")
    } else {
        bodyEl.classList.add("hoverInTurnO")
        owinEl.style.visibility = ("visible")
    }

}

function render() {
    renderGrid()
}

function renderGrid() {
    for (btn of btnEls) {
        btn.innerText = grid[parseInt(btn.id)]
    }
}

/*----- let's go -----*/

init()


