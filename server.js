// Need to connect 
const express = require('express');
const path = require('path')
const fs = require('fs')
const noteRouter = require('./js/index.js');
// Import our modular routers for /tips and /feedback
//const noteRouter = require('./assets/js/notes.js');
const PORT = process.env.PORT || 3001;
const app = express();


app.use('/notes', noteRouter);

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/assets/notes.html'))
);

module.exports = app;
