const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server)
const port = process.env.PORT || 3000

app.use(express.static('public'))

app.set('view engine', 'ejs');
const ejs = require('ejs');

app.get("/", (req, res) => {
	res.render('index')
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('a user disconnected');
    });

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

server.listen(port, () => {
    console.log("App is running on port " + port);
});