// SOCKET.IO
const socket = io();

socket.on('oppTurn', (mark, position) => {
    document.getElementById(position).textContent = mark
})

// passTurn begint op -1, wanneer het spel begint krijgt de eerste de beurt
socket.emit('passTurn')

socket.on('changeTurn', (id) => {
    console.log('Opgeslagen id: ', id)
    console.log('Socket id nu: ', socket.id)

    if (socket.id !== id) {
        message.textContent = 'De andere speler is aan de beurt';
        grid.forEach(button => {
            button.disabled = true;
        });
    } else {
        message.textContent = 'Jij bent aan de beurt';
        grid.forEach(button => {
            button.disabled = false
        });
    }
})

// querySelectorAll('th') om de offline versie te gebruiken
const grid = document.querySelectorAll('button')
const message = document.querySelector('h3')

// Classes die worden toegevoegd wanneer er is geklikt
const p1 = 'p1'
const p2 = 'p2'

const p1Emoji = document.getElementById('player-1').innerText
const p2Emoji = document.getElementById('player-2').innerText

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
    console.log(cell, currentTurn);
    if (cell.classList.contains('p1')) {
        cell.textContent = p1Emoji
    } else {
        cell.textContent = p2Emoji
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
    socket.emit('passTurn')
}

grid.forEach(cell => {
    cell.addEventListener('click', handleClick, {once: true})

    // Dit werkt nog niet
    if(cell.textContent.includes(p1Emoji || p2Emoji)) {
        console.log('het werkt')
    }
})


// socket.on( 'connection' , (Emoji) => {
//   let size = Object.keys(Emoji).length;
//   console.log( size)
//   if (size == 1) {
//       cell.classlist.add = "p1"
//   } else 
//      cell.classlist.add = "p2"
// })


