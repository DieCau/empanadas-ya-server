const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const pedidoRoutes = require('./routes/pedidosRoutes');
const usuariosRoutes = require('./routes/usuarios');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use("/api/usuarios", usuariosRoutes);

module.exports = app;
