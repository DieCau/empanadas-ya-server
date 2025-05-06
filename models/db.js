const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err.message);
    process.exit(1);
  } else {
    console.log('Conexión a la base de datos exitosa');
  }
});

module.exports = connection;
