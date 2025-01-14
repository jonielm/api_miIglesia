const express = require('express');
const router = express.Router();
const { getCalendars, addCalendarEvent, updateCalendarEvent, deleteCalendarEvent } = require('../controllers/calendarController');

router.get('/', getCalendars); // Obtener todos los eventos del calendario
router.post('/', addCalendarEvent); // Agregar un nuevo evento al calendario
router.put('/:id', updateCalendarEvent); // Actualizar un evento del calendario
router.delete('/:id', deleteCalendarEvent); // Eliminar un evento del calendario

module.exports = router;
