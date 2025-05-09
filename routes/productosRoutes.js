import express from 'express';
import authenticateToken from '../middlewares/authenticateToken.js';
import db from '../models/db.js';

const router = express.Router();

// Ruta GET para listar productos
router.get('/', authenticateToken, (req, res) => {
  const sql = 'SELECT * FROM productos';
  db.query(sql, (err, rows) => {
    if (err) {
      console.error('Error al obtener productos:', err);
      return res.status(500).json({ msg: 'Error al obtener productos' });
    }
    res.json(rows);
  });
});


// Ruta POST para crear un producto
router.post('/', authenticateToken, async (req, res) => {
  const { nombre, descripcion, precio, disponible, categoria, imagen_url } = req.body;

  if (!nombre || !precio) {
    return res.status(400).json({ msg: 'Nombre y precio son obligatorios' });
  }

  const sql = 'INSERT INTO productos (nombre, descripcion, precio, disponible, categoria, imagen_url) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [nombre, descripcion, precio, disponible, categoria, imagen_url];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: 'Error al crear el producto' });
    }
    res.status(201).json({ msg: 'Producto creado', id: result.insertId });
  });

});

export default router;
