const express = require('express');
const router = express.Router();
const { getNotes, addNote, updateNote, deleteNote } = require('../controllers/noteController');

router.get('/', getNotes); // Obtener notas
router.post('/', addNote); // Agregar nota
router.put('/:id', updateNote); // Actualizar nota
router.delete('/:id', deleteNote); // Eliminar nota

module.exports = router;
