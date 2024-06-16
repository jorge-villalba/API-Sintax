const express = require('express');
// Importa el modelo de usuario
const User = require('../models/User');

// // Crea un nuevo enrutador de Express
const router = express.Router();

// Ruta para obtener todos los usuarios
router.get('/users', async (req, res) => {
    try {
        // Busca todos los usuarios en la base de datos
        const users = await User.find();
        // Responde con la lista de usuarios encontrados
        res.json(users);
    } catch (error) {
        // Maneja errores de servidor
        res.status(500).json({ message: 'Error buscando usuarios', error });
    }
});

// // Ruta para obtener un usuario por ID
router.get('/users/:id', async (req, res) => {
    try {
        // Busca un usuario por su ID en la base de datos
        const user = await User.findById(req.params.id);
        if (!user) {
            // Si no se encuentra el usuario, responde con un mensaje de error
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        // Responde con el usuario encontrado
        res.json(user);
    } catch (error) {
        // Maneja errores de servidor
        res.status(500).json({ message: 'Error buscando usuario', error });
    }
});

// Ruta para crear un nuevo usuario
router.post('/users', async (req, res) => {

    // Obtiene los datos del cuerpo de la solicitud
    const { user, password } = req.body;

     // Verificar si el usuario ya existe
     const existingUser = await User.findOne({ user });

    //  Da respuesta si existe usuario
     if (existingUser) {
       return res.status(400).json({ message: 'Usuario ya existe' });
     }

    try {
        // Crea un nuevo documento de usuario en la base de datos
        let users = new User({ user, password });
        // Guardar el usuario en la base de datos
        await users.save();
        // Responde con el usuario creado
        res.status(201).json({ message: 'Usuario creado', users });
    } catch (error) {
        // Maneja errores de servidor
        res.status(500).json({ message: 'Error creando usuario', error });
    }
});

// Actualizar un usuario por ID
router.put('/users/:id', async (req, res) => {

    // Obtiene datos del cuerpo de la solicitud
    const { user, password } = req.body;

    try {
        // Busca y actualiza un usuario por su ID en la base de datos
        const users = await User.findByIdAndUpdate(
            req.params.id, // ID del usuario a actualizar
            { user, password }, // Datos actualizados del usuario
            { new: true } // Opción para devolver el documento actualizado
        );

        if (!users) {
            // Si no se encuentra el usuario, responde con un mensaje de error
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        // Responder con el usuario actualizado
        res.json({ message: 'Usuario actualizado', users });
    } catch (error) {
        // Manejar errores de servidor
        res.status(500).json({ message: 'Error actualizando usuario', error });
    }
});

// Ruta para eliminar un usuario por ID
router.delete('/users/:id', async (req, res) => {
    try {
        // Busca y elimina un usuario por su ID en la base de datos
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            // Si no se encuentra el usuario, responde con un mensaje de error
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        // Responder con mensaje de usuario eliminado
        res.json({ message: 'Usuario eliminado' });

    } catch (error) {
        // Maneja errores de servidor
        res.status(500).json({ message: 'Error eliminando usuario', error });
    }
});

// Exporta el enrutador para su uso en otros archivos
module.exports = router;