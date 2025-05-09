import express from 'express';
import authenticateToken from '../middlewares/authenticateToken.js';
const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
  const pedidos = [
    { id: 1, cliente: "Juan", zona: "Tafí del Valle", estado: "pendiente" },
    { id: 2, cliente: "Ana", zona: "Cafayate", estado: "entregado" },
    { id: 3, cliente: "Luis", zona: "Amaicha", estado: "pendiente" },
  ];
  res.json(pedidos);
});

router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  // Simulación: acá iría el UPDATE a la base de datos real
  console.log(`Pedido ${id} actualizado a estado: ${estado}`);
  res.json({ msg: 'Estado actualizado', id, estado });
});

export default router;