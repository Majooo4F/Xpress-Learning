const express = require('express');
const router = express.Router();
const notificacionController = require('../controllers/notificacionController');
const { authenticateJWT } = require('../middlewares/authMiddleware');

router.post('/', authenticateJWT, notificacionController.crearNotificacion);
router.get('/:idUsuario', authenticateJWT, notificacionController.obtenerNotificacionesPorUsuario);

module.exports = router;
