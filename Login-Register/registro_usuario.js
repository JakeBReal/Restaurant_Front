const { Client } = require('pg');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const client = new Client({
  host: 'localhost',
  user: 'postgres',
  password: 'admin',
  database: 'restaurant_db'
});

client.connect(err => {
  if (err) {
    console.error('No se ha podido conectar a la Base de Datos:', err);
  } else {
    console.log('Conectado exitosamente a la Base de Datos');
  }
});

app.post('/register', (req, res) => {
  const nombre_completo = req.body.nombre_completo;
  const correo = req.body.correo;
  const usuario = req.body.usuario;
  const contrasena = req.body.contrasena;

  const query = `INSERT INTO usuarios (nombre_completo, correo, usuario, contrasena) VALUES ($1, $2, $3, $4)`;
  const values = [nombre_completo, correo, usuario, contrasena];

  client.query(query, values, (err, result) => {
    if (err) {
      console.error('Error ejecutando la consulta', err.stack);
      res.send(`
        <script>
          alert("Inténtalo de nuevo, usuario no almacenado");
          window.location = "../index.html";
        </script>
      `);
    } else {
      res.send(`
        <script>
          alert("Usuario almacenado exitosamente");
          window.location = "../index.html";
        </script>
      `);
    }
  });
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
