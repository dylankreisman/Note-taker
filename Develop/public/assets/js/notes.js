const { text } = require('express');

const notes = require('express').Router();

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

  notes.get('/:note_id', (req, res) => {
    const notID = req.params.note_id;
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        const result = json.filter((note) => note.note_id === notID);
        return result.length > 0
            ? res.json(result)
            : res.json('No note with that ID')
    })
  })

  // DELETE Route for a specific note
notes.delete('/:note_id', (req, res) => {
    const notId = req.params.note_id;
    readFromFile('./db/notes.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        // Make a new array of all notes except the one with the ID provided in the URL
        const result = json.filter((note) => note.note_id !== noteId);
  
        // Save that array to the filesystem
        writeToFile('./db/notes.json', result);
  
        // Respond to the DELETE request
        res.json(`Item ${noteId} has been deleted 🗑️`);
      });
  });
  
 // POST Route for a new UX/UI note
  notes.post('/', (req, res) => {
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text
      };
  
      readAndAppend(newNote, './db/notes.json');
      res.json(`Notes added successfully 🚀`);
    } else {
      res.error('Error in adding note');
    }
  });
  
  module.exports = notes;