// app.js

const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());

// Rutas de la API
app.get('/api/user', (req, res) => {
  fs.readFile('./db.json', 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Error leyendo datos' });
    const jsonData = JSON.parse(data);
    res.json(jsonData.user);
  });
});

app.put('/api/user', (req, res) => {
  const updatedUser = req.body;

  fs.readFile('./db.json', 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Error leyendo datos' });
    const jsonData = JSON.parse(data);
    jsonData.user = { ...jsonData.user, ...updatedUser };

    fs.writeFile('./db.json', JSON.stringify(jsonData, null, 2), (err) => {
      if (err) return res.status(500).json({ error: 'Error guardando datos' });
      res.json(jsonData.user);
    });
  });
});

app.get('/api/notes', (req, res) => {
  fs.readFile('./db.json', 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Error leyendo datos' });
    const jsonData = JSON.parse(data);
    res.json(jsonData.notes);
  });
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;

  fs.readFile('./db.json', 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Error leyendo datos' });
    const jsonData = JSON.parse(data);
    jsonData.notes.push({ ...newNote, Id: Date.now().toString() });

    fs.writeFile('./db.json', JSON.stringify(jsonData, null, 2), (err) => {
      if (err) return res.status(500).json({ error: 'Error guardando datos' });
      res.json(newNote);
    });
  });
});

app.get('/api/calendars', (req, res) => {
  fs.readFile('./db.json', 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Error leyendo datos' });
    const jsonData = JSON.parse(data);
    res.json(jsonData.calendars);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
