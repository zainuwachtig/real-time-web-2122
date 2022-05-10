// querySelectorAll('th') om de offline versie te gebruiken
const grid = document.querySelectorAll('button')
const message = document.querySelector('h2')

// Classes die worden toegevoegd wanneer er is geklikt
const p1 = 'p1'
const p2 = 'p2'

const combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
]

let p1Turn

// Er wordt een class toegevoegd aan het vakje waarop is gedrukt
function placeMark(cell, currentTurn) {
    cell.classList.add(currentTurn)
    if (cell.classList.contains('p1')) {
        cell.textContent = document.getElementById('player-1').innerText
    } else {
        cell.textContent = document.getElementById('player-2').innerText
    }
}

// Wanneer p1 is geweest, is p niet meer aan de beurt (dus p2 is nu)
function swapTurns() {
    p1Turn = !p1Turn
}

function checkWin(currentTurn) {
    return combinations.some(combination => {
        return combination.every(index => {
            return grid[index].classList.contains(currentTurn)
        })
    })
}

function handleClick(e) {
    cell = e.target
    // Is p2 niet aan de beurt, dan is p1
    const currentTurn = p1Turn ? p2 : p1
    placeMark(cell, currentTurn)
    if (checkWin(currentTurn)) {
        message.textContent = `${currentTurn} heeft gewonnen!`
        grid.forEach(cell => {
            cell.removeEventListener('click', handleClick, {once: true})
            cell.style.cursor="not-allowed"
        })
    }
    swapTurns()
    if(cell.textContent) {
        const mark = cell.textContent
        const position = cell.id
        socket.emit('turn', mark, position)
        console.log(mark, position)
    }
}

grid.forEach(cell => {
    cell.addEventListener('click', handleClick, {once: true})
})

// Teksten -
// Wachten op deelnemer
// Player 1 / 2 is aan de beurt
// Player 1 / 2 heeft gewonnen
// Player 1 / 2 is geleaved


// SOCKET.IO
const socket = io();
socket.on('oppTurn', (mark, position) => {
    document.getElementById(position).textContent = mark
})