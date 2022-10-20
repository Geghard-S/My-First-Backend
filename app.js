const express = require("express");
const app = express();
const basicAuth = require('express-basic-auth')


app.get("/", (req, res) => {
    let songsList = ["Adeste Fideles", "Ad-Lib Blues", "All Alone", "April in Paris", "Ave Maria", 
                "The Best is Yet to Come", "Blue Skies", "Born Free", "Castle Rock", "Christmas Memories",
                "Dancing in the Dark", "Deep Night", "Don't Worry 'Bout Me", "Dream Away", "Elizabeth",
                "Fairy Tale", "Free for All", "Golden Moment", "Here Goes", "If I Loved You"];
    let index = Math.floor(Math.random() * songsList.length);
    let song = songsList[index];
    res.send(song)
})

app.get("/birth_date", (req, res) => {
    res.send("December 12, 1915");
})

app.get("/birth_city", (req, res) => {
    res.send("Hoboken");
})

app.get("/wives", (req, res) => {
    res.send("Nancy Barbato, Ava Gardner, Mia Farrow, Barbara Marx");
})

app.get("/picture", (req, res) =>{
    res.redirect('https://en.wikipedia.org/wiki/Frank_Sinatra#/media/File:Frank_Sinatra2,_Pal_Joey.jpg')
})

app.get("/public", (req, res) => {
    res.send("Everybody can see this page");
})

// app.get("/protected", (req, res) => {
//     res.send("Everybody can see this page");
// })

app.use("/protected", (req, res, next) => {
    const auth = {
      login: 'admin',
      password: 'admin'
    }
    const [, b64auth = ''] = (req.headers.authorization || '').split(' ')
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')
    if (login && password && login === auth.login && password === auth.password) {
        res.send("Welcome, authenticated client");
        return next()
    }
    res.set('WWW-Authenticate', 'Basic realm="401"')
    res.status(401).send('401 Not authorized')
  })

app.listen(8080, () =>{
    console.log("server started on 8080")
},'0.0.0.0')