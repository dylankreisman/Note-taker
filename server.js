 
const express = require('express');
const path = require('path')
const fs = require('fs')
const notes = require('./db/db.json');
const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.post("/api/notes", (req, res) => {
  const note = {
    id: Math.floor(Math.random() * 1000000),
    title: req.body.title,
    text: req.body.text,
  };
  notes.push(note);
  fs.writeFileSync("./db/db.json", JSON.stringify(notes));
  res.json(notes);
});
module.exports = app;

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);