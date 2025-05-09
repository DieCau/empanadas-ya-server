import express from 'express';
import authenticateToken from '../middlewares/authenticateToken.js';
import db from '../models/db.js'; // tu conexión a MySQL

const router = express.Router();

router.post('/', authenticateToken, async (req, res) => {
  const { productos, direccion_envio, metodo_pago } = req.body;
  const usuario_id = req.user.id;

  try {
    const [result] = await db.query(
      `INSERT INTO ordenes (usuario_id, fecha_creacion, estado, total_orden, direccion_envio, metodo_pago)
       VALUES (?, NOW(), 'pendiente', ?, ?, ?)`,
      [
        usuario_id,
        productos.reduce((sum, p) => sum + p.precio * p.cantidad, 0),
        direccion_envio,
        metodo_pago,
      ]
    );

    const orden_id = result.insertId;

    for (const prod of productos) {
      await db.query(
        `INSERT INTO orden_detalle (orden_id, producto_id, cantidad, precio_unitario)
         VALUES (?, ?, ?, ?)`,
        [orden_id, prod.id, prod.cantidad, prod.precio]
      );
    }

    res.json({ msg: 'Orden creada exitosamente', orden_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error al procesar el pedido' });
  }
});

export default router;
