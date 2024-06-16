//Requiere el modulo mongoose para hacer el modelo del registro
const mongoose = require('mongoose');

// Definición del esquema de usuario
const UserSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// Se crea y exporta el modelo de usuario
const User = mongoose.model('User', UserSchema);
module.exports = User;