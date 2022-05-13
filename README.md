# B🧈ter, k🧀🧀s en 🥚ir🥚en!

<img width="1440" alt="Preview van Boter, Kaas en Eieren gemaakt door Zain" src="https://user-images.githubusercontent.com/74155415/167702585-7a58046c-ff6a-49eb-942b-a733f7c8dd3b.png">

## Beschrijving

Het idee is simpel, namelijk boter, kaas en eiren maar in plaats van 'X' en 'O' icoontjes, is dit met emojis! De emojis zijn afkomstig van een [API](https://github.com/abourtnik/emojis-world).
Helaas heb ik de applicatie niet zo werkend als ik zelf zou willen, er wordt wel van beurt gewisseld, er kunnen meerdere mensen joinen maar het emoji plaatsen gaat niet helemaal lekker. De oplossing hiervoor kan de player in een object plaatsen en daarbij een emoji koppelen.

## 3 concepten

### Regenwormen

Regenwormen is een spelletje met zestien stenen en acht dobbelstenen, voor meer uitleg [lees hier](https://www.999games.nl/regenwormen.html). Dit was in eerste instantie mijn eerste keuze, alleen ik kwam er al snel achter dat er iets teveel spellogica achterzat. Ook kon ik geen API vinden die erop aansloot.

### Boter, Kaas en Eieren

Boter, Kaas en Eieren was eigelijk mijn tweede keuze, ik vond een video van [Web Dev Simplified](https://www.youtube.com/watch?v=Y-GkMjUZsmM) waar hij uitlegde hoe hij het had gemaakt. Hierbij hoefde ik mij minder op de gamelogica te focussen en meer op het socket gedeelte, dit bleek achteraf werk zat.

### Dierenquiz

Dierenquiz is een soort Kahoot, waarbij je een afbeelding zag van een bijzonder dier. In de applicatie zit ook een chatfunctie zodat mensen daadwerkelijk konden raden welk dier het is.

### Hoe te installeren

### Repo clonen

```
git clone https://github.com/zainuwachtig/real-time-web-2122.git
```

### Navigeren naar de map

```
cd real-time-web-2122
```

### NPM packages installeren

```
npm install
```

### Applicatie starten

```
npm start
```

## Gemaakt met

- [Node.js](https://nodejs.org/en/)
  - V18.0.0, voor de ingebakken fetch.
- [Express](https://expressjs.com/)
- [EJS](https://ejs.co/)
- [Socket.IO](https://socket.io/)
- [Emojis World API](https://github.com/abourtnik/emojis-world)
- ❤️

## Emojis World API

In de Emojis World API kon ik al gebruik maken van een random emoji kiezer, het enige wat ik moest meegeven was een query met limit toevoegen, zodat die er maar twee ophaalt. Ik maak gebruik van de `results[0].emoji` en `results[1].emoji`.

```
https://api.emojisworld.fr/v1/random?&limit=2
```

```json
{
  "totals": 2,
  "results": [
    {
      "id": 2042,
      "name": "white question mark",
      "emoji": "❔",
      "unicode": "2754",
      "category": {
        "id": 7,
        "name": "Symbols"
      },
      "sub_category": {
        "id": 74,
        "name": "other-symbol"
      },
      "children": []
    },
    {
      "id": 992,
      "name": "family: woman, boy, boy",
      "emoji": "👩‍👦‍👦",
      "unicode": "1F469 200D 1F466 200D 1F466",
      "category": {
        "id": 1,
        "name": "Smileys & People"
      },
      "sub_category": {
        "id": 16,
        "name": "family"
      },
      "children": []
    }
  ]
}
```

## Data model

![rtw-datamodel](https://user-images.githubusercontent.com/74155415/168282018-ca74280b-e9e9-4642-aac2-aca1bf3303d5.png)

## Features

- [x] Fetcht data van een API - Must have
- [x] Kan door twee spelers gespeeld worden - Must have
- [x] Spelers kunnen omstebeurt een zet doen - Must have
- [x] Applicatie staat live - Must have

- [ ] Applicatie bepaalt wie heeft gewonnen - Should have

- [ ] Spelers kunnen zowel een room maken als joinen - Could have

- [ ] Scoreboard - Would have

## Gebruikte bronnen

- https://www.youtube.com/watch?v=Y-GkMjUZsmM
- https://www.youtube.com/watch?v=ZjJYqDjmGkI
- https://github.com/dannyfrelink/real-time-app

## License

[MIT](https://github.com/zainuwachtig/real-time-web-2122/blob/main/LICENSE)
