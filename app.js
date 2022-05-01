const express = require('express');
const compression = require('compression');

const hostname = '127.0.0.1';
const port = process.env.PORT || 5500;

const app = express();

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

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/test', async (req, res) => {
  let response = await fetch('https://api.emojisworld.fr/v1/random?&limit=2');
  if (response.ok) {
    const data = await response.json();
    console.log(data);

    res.render('test', {
      player1: data.results[0].emoji,
      player2: data.results[1].emoji
    });
  }
});

app.listen(port, () => {
    console.log("App is running on port " + port);
});

