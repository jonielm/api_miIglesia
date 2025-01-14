const fs = require('fs');
const filePath = './tempdata.json';

exports.getUser = (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Error leyendo datos' });
        const jsonData = JSON.parse(data);
        res.json(jsonData.user);
    });
};

exports.updateUser = (req, res) => {
    const updatedUser = req.body;

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Error leyendo datos' });
        const jsonData = JSON.parse(data);
        jsonData.user = { ...jsonData.user, ...updatedUser };

        fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) return res.status(500).json({ error: 'Error guardando datos' });
            res.json(jsonData.user);
        });
    });
};
