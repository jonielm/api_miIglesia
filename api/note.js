// api/note.js

import fs from 'fs';

export default function handler(req, res) {
  const filePath = './db.json';

  if (req.method === 'GET') {
    // Obtener todas las notas
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) return res.status(500).json({ error: 'Error leyendo datos' });
      const jsonData = JSON.parse(data);
      res.status(200).json(jsonData.notes);
    });
  } else if (req.method === 'POST') {
    // Agregar nueva nota
    const newNote = req.body;

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) return res.status(500).json({ error: 'Error leyendo datos' });
      const jsonData = JSON.parse(data);
      jsonData.notes.push({ ...newNote, Id: Date.now().toString() });

      fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) return res.status(500).json({ error: 'Error guardando datos' });
        res.status(201).json(newNote);
      });
    });
  } else if (req.method === 'PUT') {
    // Actualizar nota
    const { id } = req.query;
    const updatedNote = req.body;

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) return res.status(500).json({ error: 'Error leyendo datos' });
      const jsonData = JSON.parse(data);
      const noteIndex = jsonData.notes.findIndex(note => note.Id === id);

      if (noteIndex === -1) return res.status(404).json({ error: 'Nota no encontrada' });

      jsonData.notes[noteIndex] = { ...jsonData.notes[noteIndex], ...updatedNote };

      fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) return res.status(500).json({ error: 'Error guardando datos' });
        res.status(200).json(jsonData.notes[noteIndex]);
      });
    });
  } else if (req.method === 'DELETE') {
    // Eliminar nota
    const { id } = req.query;

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) return res.status(500).json({ error: 'Error leyendo datos' });
      const jsonData = JSON.parse(data);
      jsonData.notes = jsonData.notes.filter(note => note.Id !== id);

      fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) return res.status(500).json({ error: 'Error guardando datos' });
        res.status(200).json({ message: 'Nota eliminada' });
      });
    });
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
