import bcrypt from 'bcrypt';
import express from 'express';
import jwt from 'jsonwebtoken';
import db from '../models/db.js';

const router = express.Router();

router.get('/me', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token faltante' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });

    const userId = decoded.id;

    db.query('SELECT nombre, email, role FROM usuarios WHERE id = ?', [userId], (err, results) => {
      if (err) return res.status(500).json({ message: 'Error al obtener el usuario' });

      if (results.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });

      res.json({ user: results[0] });
    });
  });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Error en la base de datos' });

    if (results.length === 0) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    const user = results[0];

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '2h' });

    // No mandes la contraseña al cliente
    const { password: _, ...userData } = user;

    res.json({ token, user: userData });
  });
});

export default router;
