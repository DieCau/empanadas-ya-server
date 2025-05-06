import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
const app = express();

dotenv.config();

import authRoutes from './routes/authRoutes.js';
import pedidosRoutes from './routes/pedidosRoutes.js';
import usuariosRoutes from './routes/usuariosRoutes.js';

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/pedidos', pedidosRoutes);
app.use("/api/usuarios", usuariosRoutes);


export default app;
