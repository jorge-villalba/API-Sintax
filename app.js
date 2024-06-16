// Se llama al modulo Express para dar inicio al servidor
const express = require('express');
//Se llama al padulo para gestionar los archivos y rutas
const path = require('path');
// Llama al modulo de conexion a base de datos
const connectDB = require('./config/db');
// Requiere el modelo de usuario
const User = require('./models/User');
// Requiere rutas de los usuarios
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');

// Conecta a la base de datos utilixando el metodo o funcion del modulo 
connectDB();

// Se asigna la variable express a la variable app
const app = express();
const PORT = 10000

// Middleware para analizar el cuerpo de las solicitudes
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './public')));

// Ruta de inicio con pantalla de inicio de sesion
app.get('/', async (req, res) => {
  res.sendFile('index.html');
})

// Ruta de inicio de sesión
app.post('/', async (req, res) => {
  const { user, password } = req.body;

  try {
    // Buscar usuario por correo electrónico
    const users = await User.findOne({ user });

    if (!users || users.password !== password) {
      // Si no se encuentra el usuario o la contraseña es incorrecta
      return res.status(400).json({message: 'Usuario o contraseña invalido' });
    }

    // Éxito en la autenticación
    res.json({ users, message: 'Inicio de sesion exitoso' });


  } catch (error) {
    res.status(500).json({ message: 'Error de servidor' });
  }
});

// Rutas para usuarios
app.use('/', userRoutes);

// Se configura el puerto por el cual va a escuchar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
