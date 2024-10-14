const User = require('../models/userModel.js');

const bcrypt = require('bcrypt');

const loginUser = async (req, res) => {
  const { email, contrasena } = req.body;

  try {
    // Verificar si el usuario existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Comparación directa de contraseñas
    const isMatch = await bcrypt.compare(contrasena, user.contrasena);
    console.log('Comparación de contraseñas:', isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Si las contraseñas coinciden
    res.status(200).json({ message: 'Inicio de sesión exitoso', user: { id: user._id, email: user.email, nombres: user.nombres } });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};
// Controlador para registrar un usuario
const registerUser = async (req, res) => {
  const { nombres, apellidos, rut, telefono, email, contrasena, tutor_ID, } = req.body;

  try {
    // Validar que el RUT, el email y la contraseña no estén vacíos
    if (!rut || !email || !contrasena) {
      return res.status(400).json({ message: 'RUT, email y contraseña son requeridos' });
    }

    // Crear un nuevo usuario
    const newUser = new User({
      nombres,
      apellidos,
      rut,
      telefono,
      email,
      contrasena,
      tutor_ID
    });

    // Guardar el usuario en la base de datos
    await newUser.save();

    // Enviar respuesta de éxito
    res.status(201).json({ message: 'Usuario registrado con éxito', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el usuario', error });
  }
};

module.exports = { loginUser, registerUser };
