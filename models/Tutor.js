const mongoose = require('mongoose');

const TutorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  direccion: { type: String, required: true },
  numeroTelefono: { type: Number, required: true },
  email: { type: String, required: true }
});

module.exports = mongoose.model('Tutor', TutorSchema);
