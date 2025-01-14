// api/user.js

import fs from 'fs';

export default function handler(req, res) {
  const filePath = './db.json';
  
  if (req.method === 'GET') {
    // Obtener usuario
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) return res.status(500).json({ error: 'Error leyendo datos' });
      const jsonData = JSON.parse(data);
      res.status(200).json(jsonData.user);
    });
  } else if (req.method === 'PUT') {
    // Actualizar usuario
    const updatedUser = req.body;

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) return res.status(500).json({ error: 'Error leyendo datos' });
      const jsonData = JSON.parse(data);
      jsonData.user = { ...jsonData.user, ...updatedUser };

      fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) return res.status(500).json({ error: 'Error guardando datos' });
        res.status(200).json(jsonData.user);
      });
    });
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
