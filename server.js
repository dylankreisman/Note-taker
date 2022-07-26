 
const express = require('express');
const path = require('path')
const fs = require('fs')
const notes = require('./db/db.json');
const PORT = process.env.PORT || 3001;
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

//Deleting new note object in JSON file
app.delete('api/notes:id', (req, res) => {
  for (let i = 0; i < arr.length; i++) {
    console.log(typeof notes[i].id)
      if (notes[i].id == req.params.id) {
      notes.splice(i, 1)
      fs.writeFileSync('./db/db.json', JSON.stringify(notes))
      res.json(notes);
    }  
  }
})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
