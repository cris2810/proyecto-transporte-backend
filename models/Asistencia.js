// models/Asistencia.js
const mongoose = require("mongoose");

const asistenciaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  fecha: { type: Date, default: Date.now },
  // puedes agregar más campos si quieres:
  // curso: String,
  // rut: String,
});

module.exports = mongoose.model("Asistencia", asistenciaSchema);
