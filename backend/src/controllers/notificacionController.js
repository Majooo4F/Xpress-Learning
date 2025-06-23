const db = require('../../firebase/firebase'); // <-- Asegúrate de usar la ruta correcta
const logger = require('../utils/logger');

exports.crearNotificacion = async (req, res) => {
    const { titulo, contenido, para_usuario, tipo } = req.body;

    try {
        const ref = await db.collection('notificaciones').add({
            titulo,
            contenido,
            para_usuario,
            tipo,
            leida: false,
            fecha: new Date()
        });
        res.status(201).json({ id: ref.id, mensaje: 'Notificación creada correctamente' });
    } catch (error) {
        logger.error('Error al crear notificación:', error);
        res.status(500).json({ error: 'Error al crear notificación' });
    }
};

exports.obtenerNotificacionesPorUsuario = async (req, res) => {
    const { idUsuario } = req.params;

    try {
        const snapshot = await db.collection('notificaciones')
            .where('para_usuario', '==', idUsuario)
            .orderBy('fecha', 'desc')
            .get();

        const notificaciones = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        res.status(200).json(notificaciones);
    } catch (error) {
        logger.error('Error al obtener notificaciones por usuario:', error);
        res.status(500).json({ error: 'Error al obtener notificaciones' });
    }
};
