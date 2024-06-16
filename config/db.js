//Requiere moongose para conectar a la base de datos

const mongoose = require('mongoose');

// Conexión a MongoDB con una función asincrona
const connectDB = async () => {
  try {
    // Espera por la conexion a la base de datos
    await mongoose.connect('mongodb://localhost:27017/API-Sintax');
    // Manda un mensaje por consola que informa la conexion exitosa a la base de datos
    console.log('MongoDB connected');

  } catch (error) { 
    // Muestra error en consola si la conexion no es exitosa
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Termina el proceso con un código de error
  }
};

// Exporta la funcion 'connectDB' para que se utilizado como un modulo
module.exports = connectDB;