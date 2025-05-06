const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');

router.get('/', verifyToken, async (req, res) => {
  const pedidos = [
    { id: 1, cliente: "Juan", zona: "Tafí del Valle", estado: "pendiente" },
    { id: 2, cliente: "Ana", zona: "Cafayate", estado: "entregado" },
    { id: 3, cliente: "Luis", zona: "Amaicha", estado: "pendiente" },
  ];
  res.json(pedidos);
});

router.put('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  // Simulación: acá iría el UPDATE a la base de datos real
  console.log(`Pedido ${id} actualizado a estado: ${estado}`);
  res.json({ msg: 'Estado actualizado', id, estado });
});

module.exports = router;