import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();

const PORT = process.env.PORT || 3306;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

