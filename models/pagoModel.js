const mongoose = require('mongoose');

const PagoSchema = new mongoose.Schema({
  nombreAlumno: { type: String, required: true },
  MesDePago: { type: Date, required: true },
  ConfirmacionDePago: { type: Number, required: true },
  tutor_ID: { type: String, required: true } 
});

module.exports = mongoose.model('Pago', PagoSchema);

