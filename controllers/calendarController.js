const fs = require('fs');
const filePath = './tempdata.json';

exports.getCalendars = (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Error leyendo datos' });
        const jsonData = JSON.parse(data);
        res.json(jsonData.calendars);
    });
};

exports.addCalendarEvent = (req, res) => {
    const newEvent = req.body;

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Error leyendo datos' });
        const jsonData = JSON.parse(data);
        jsonData.calendars.push({ ...newEvent, Id: Date.now().toString() });

        fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) return res.status(500).json({ error: 'Error guardando datos' });
            res.json(newEvent);
        });
    });
};

exports.updateCalendarEvent = (req, res) => {
    const { id } = req.params;
    const updatedEvent = req.body;

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Error leyendo datos' });
        const jsonData = JSON.parse(data);
        const eventIndex = jsonData.calendars.findIndex(event => event.Id === id);

        if (eventIndex === -1) return res.status(404).json({ error: 'Evento no encontrado' });

        jsonData.calendars[eventIndex] = { ...jsonData.calendars[eventIndex], ...updatedEvent };

        fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) return res.status(500).json({ error: 'Error guardando datos' });
            res.json(jsonData.calendars[eventIndex]);
        });
    });
};

exports.deleteCalendarEvent = (req, res) => {
    const { id } = req.params;

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Error leyendo datos' });
        const jsonData = JSON.parse(data);
        jsonData.calendars = jsonData.calendars.filter(event => event.Id !== id);

        fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) return res.status(500).json({ error: 'Error guardando datos' });
            res.json({ message: 'Evento de calendario eliminado' });
        });
    });
};
