require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const errorHandler = require('./middlewares/errorHandler');
const db = require('./config/db');
const app = express();

app.get('/', (req, res) => {
    res.send('✅ Backend XLearning funcionando');
});

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const claseRoutes = require('./routes/claseRoutes');
const estudianteClaseRoutes = require('./routes/estudianteClaseRoutes');


// Rutas base
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/clases', claseRoutes);
app.use('/api/estudiantes-clases', estudianteClaseRoutes);

// app.use('/api/usuarios', usuarioRoutes);

// Middleware de manejo de errores
app.use(errorHandler);

module.exports = app;
