const express = require('express');
const router = express.Router();
const Pago = require('../models/pagoModel.js');

router.post('/registrarPago', async (req, res) => {
  const { nombreAlumno, MesDePago, ConfirmacionDePago, tutor_ID } = req.body;

  if (!nombreAlumno || !MesDePago || ConfirmacionDePago === undefined || !tutor_ID) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  const nuevoPago = new Pago({
    nombreAlumno,
    MesDePago,
    ConfirmacionDePago,
    tutor_ID // Guardar tutor_ID
  });

  try {
    await nuevoPago.save();
    res.status(201).json({ message: 'Pago registrado exitosamente' });
  } catch (error) {
    console.error('Error al guardar el pago:', error); // Añadido para más información de depuración
    res.status(500).json({ message: 'Error al registrar el pago', error });
  }
});

router.get('/obtenerPagos/:tutor_ID', async (req, res) => {
  try {
    const pagos = await Pago.find({ tutor_ID: req.params.tutor_ID });
    res.status(200).json(pagos);
  } catch (error) {
    console.error('Error al obtener los pagos:', error);
    res.status(500).json({ message: 'Error al obtener los pagos' });
  }
});

module.exports = router;
