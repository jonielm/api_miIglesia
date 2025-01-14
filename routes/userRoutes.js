const express = require('express');
const router = express.Router();
const { getUser, updateUser } = require('../controllers/userController');

router.get('/', getUser); // Obtener usuario
router.put('/', updateUser); // Actualizar usuario

module.exports = router;
