import bcrypt from 'bcrypt';
import express from 'express';
import db from '../models/db.js';

const router = express.Router();

router.post("/register", async (req, res) => {
  const { nombre, email, password, role } = req.body;

  // Validación simple del lado del servidor
  if (!nombre || !email || !password) {
    return res.status(400).json({ message: "Todos los campos son obligatorios." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Correo electrónico inválido." });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres." });
  }

  try {
    // Verificar si ya existe
    const [existing] = await db.promise().query("SELECT * FROM usuarios WHERE email = ?", [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: "El correo ya está registrado." });
    }

    const hashed = await bcrypt.hash(password, 10);
    await db
      .promise()
      .query("INSERT INTO usuarios (nombre, email, password, role) VALUES (?, ?, ?, ?)", [
        nombre,
        email,
        hashed,
        role === "admin" ? "admin" : "cliente",
      ]);

    res.status(201).json({ message: "Usuario creado correctamente." });
  } catch (error) {
    console.error("Error en el registro:", error);
    res.status(500).json({ message: "Error del servidor." });
  }
});

export default router;

