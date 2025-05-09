import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

import authRoutes from './routes/authRoutes.js';
import pedidosRoutes from './routes/pedidosRoutes.js';
import productosRoutes from './routes/productosRoutes.js';
import usuariosRoutes from './routes/usuariosRoutes.js';

app.use('/api/auth', authRoutes);
app.use('/api/pedidos', pedidosRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use('/api/productos', productosRoutes);


export default app;
