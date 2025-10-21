const mongoose = require('mongoose');

const EstudianteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  edad: { type: Number, required: true },
  direccion: { type: String, required: true },
  curso: { type: String, required: true }
});

module.exports = mongoose.model('Estudiante', EstudianteSchema);
