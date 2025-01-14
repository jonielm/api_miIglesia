const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');
const calendarRoutes = require('./routes/calendarRoutes');

app.use(express.json());


app.use('/user', userRoutes);
app.use('/notes', noteRoutes);
app.use('/calendars', calendarRoutes);


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
