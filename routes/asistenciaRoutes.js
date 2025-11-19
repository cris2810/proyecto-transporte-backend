const express = require("express");
const router = express.Router();
const Asistencia = require("../models/Asistencia");

// GET lista asistencia
router.get("/asistencia", async (req, res) => {
  try {
    const lista = await Asistencia.find().sort({ fecha: -1 });
    res.json(lista);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener asistencia" });
  }
});

// POST registrar asistencia
router.post("/asistencia", async (req, res) => {
  try {
    const { nombre } = req.body;

    if (!nombre) {
      return res.status(400).json({ message: "Nombre es obligatorio" });
    }

    const nueva = new Asistencia({ nombre });
    await nueva.save();

    res.status(201).json({ message: "Asistencia registrada" });
  } catch (err) {
    res.status(500).json({ message: "Error al registrar asistencia" });
  }
});

module.exports = router;
