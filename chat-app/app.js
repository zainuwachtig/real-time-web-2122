const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server)
const port = process.env.PORT || 3000
const uuid = require("uuid")
let senderID = ''

app.use(express.static('public'))

app.set('view engine', 'ejs');
const ejs = require('ejs');

app.get("/", (req, res) => {
	res.render('index')
});

io.on('connection', (socket) => {
    console.log(`${socket.id} connected`);
    socket.on('disconnect', () => {
      console.log('a user disconnected');
    });

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    });

    socket.on('chat message', (msg) => {
        senderID = socket.id
        io.emit('chat message', {msg, senderID});
        {console.log(`${socket.id} is the sender`)}
    });
});

server.listen(port, () => {
    console.log("App is running on port " + port);
});