import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader?.split(' ')[1];

  if (!token) res.status(401).json({ msg: 'Acceso denegado. Token no proporcionado' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    console.error('Token inválido:', err.message); // <-- Agregá este log para depurar
    return res.status(401).json({ msg: 'Token inválido' });
  }
};

export default authenticateToken;
