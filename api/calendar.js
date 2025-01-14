// api/calendar.js

import fs from 'fs';

export default function handler(req, res) {
  const filePath = './db.json';

  // Gestiona las peticiones GET, POST, PUT y DELETE para los calendarios
  if (req.method === 'GET') {
    // Obtener todos los calendarios
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) return res.status(500).json({ error: 'Error leyendo datos' });
      const jsonData = JSON.parse(data);
      res.status(200).json(jsonData.calendars);
    });
  } else if (req.method === 'POST') {
    // Crear nuevo calendario
    const newCalendar = req.body;

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) return res.status(500).json({ error: 'Error leyendo datos' });
      const jsonData = JSON.parse(data);
      jsonData.calendars.push({ ...newCalendar, Id: Date.now().toString() });

      fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) return res.status(500).json({ error: 'Error guardando datos' });
        res.status(201).json(newCalendar);
      });
    });
  } else if (req.method === 'PUT') {
    // Actualizar calendario
    const { id } = req.query;
    const updatedCalendar = req.body;

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) return res.status(500).json({ error: 'Error leyendo datos' });
      const jsonData = JSON.parse(data);
      const calendarIndex = jsonData.calendars.findIndex(calendar => calendar.Id === id);

      if (calendarIndex === -1) return res.status(404).json({ error: 'Calendario no encontrado' });

      jsonData.calendars[calendarIndex] = { ...jsonData.calendars[calendarIndex], ...updatedCalendar };

      fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) return res.status(500).json({ error: 'Error guardando datos' });
        res.status(200).json(jsonData.calendars[calendarIndex]);
      });
    });
  } else if (req.method === 'DELETE') {
    // Eliminar calendario
    const { id } = req.query;

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) return res.status(500).json({ error: 'Error leyendo datos' });
      const jsonData = JSON.parse(data);
      jsonData.calendars = jsonData.calendars.filter(calendar => calendar.Id !== id);

      fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) return res.status(500).json({ error: 'Error guardando datos' });
        res.status(200).json({ message: 'Calendario eliminado' });
      });
    });
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
