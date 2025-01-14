const fs = require('fs');
const filePath = './tempdata.json';

exports.getNotes = (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Error leyendo datos' });
        const jsonData = JSON.parse(data);
        res.json(jsonData.notes);
    });
};

exports.addNote = (req, res) => {
    const newNote = req.body;

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Error leyendo datos' });
        const jsonData = JSON.parse(data);
        jsonData.notes.push({ ...newNote, Id: Date.now().toString() });

        fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) return res.status(500).json({ error: 'Error guardando datos' });
            res.json(newNote);
        });
    });
};

exports.updateNote = (req, res) => {
    const { id } = req.params;
    const updatedNote = req.body;

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Error leyendo datos' });
        const jsonData = JSON.parse(data);
        const noteIndex = jsonData.notes.findIndex(note => note.Id === id);

        if (noteIndex === -1) return res.status(404).json({ error: 'Nota no encontrada' });

        jsonData.notes[noteIndex] = { ...jsonData.notes[noteIndex], ...updatedNote };

        fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) return res.status(500).json({ error: 'Error guardando datos' });
            res.json(jsonData.notes[noteIndex]);
        });
    });
};

exports.deleteNote = (req, res) => {
    const { id } = req.params;

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Error leyendo datos' });
        const jsonData = JSON.parse(data);
        jsonData.notes = jsonData.notes.filter(note => note.Id !== id);

        fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) return res.status(500).json({ error: 'Error guardando datos' });
            res.json({ message: 'Nota eliminada' });
        });
    });
};
