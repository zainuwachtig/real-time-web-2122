const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const compression = require('compression');

const hostname = '127.0.0.1';
const port = process.env.PORT || 5500;

let players = [];
let emojis = null;
let turnNumber = -1;

app.use(compression());

app.use(/.*-[0-9a-f]{10}\..*/, (req, res, next) => {
  res.setHeader('Cache-Control', 'max-age=365000000, immutable');
  next();
});

app.set('view engine', 'ejs');
const ejs = require('ejs');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  if(!emojis) {
    let response = await fetch('https://api.emojisworld.fr/v1/random?&limit=2');
    if(response.ok) {
      const data = await response.json();
      emojis = {
        player1: data.results[0].emoji,
        player2: data.results[1].emoji
      }
    }
  }

  res.render('test', {
    player1: emojis.player1,
    player2: emojis.player2
  });
});

io.on('connection', (socket) => {
  console.log(`${socket.id} connected`);
  players.push(socket.id)
  console.log(`Huidige spelers: ${players}`)

  socket.on('passTurn', () => {
    turnNumber += 1;
    if (turnNumber === players.length) {
      turnNumber = 0;
    }
    io.emit('changeTurn', players[turnNumber]);
    console.log(`${players[turnNumber]} is aan de beurt`)
  });

  socket.on('turn', (mark, position) => {
    socket.broadcast.emit('oppTurn', mark, position);
  });
    
  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`);
    players =  players.filter(p => p !== socket.id )
    console.log(`Overgebleven spelers: ${players}`)
  });
});

server.listen(port, () => {
  console.log("App is running on port " + port);
});

