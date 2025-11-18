// routes/asistencia.js
const express = require("express");
const router = express.Router();
const Asistencia = require("../models/Asistencia");

// POST /api/asistencia  → registrar asistencia
router.post("/asistencia", async (req, res) => {
  try {
    const { nombre } = req.body;

    if (!nombre || !nombre.trim()) {
      return res.status(400).json({ message: "El nombre es obligatorio" });
    }

    const nuevaAsistencia = new Asistencia({
      nombre: nombre.trim(),
    });

    await nuevaAsistencia.save();

    res.status(201).json({ message: "Asistencia registrada correctamente" });
  } catch (err) {
    console.error("Error al registrar asistencia:", err);
    res.status(500).json({ message: "Error al registrar asistencia" });
  }
});

// GET /api/asistencia  → obtener lista de asistencia
router.get("/asistencia", async (req, res) => {
  try {
    const lista = await Asistencia.find().sort({ fecha: -1 });
    res.json(lista);
  } catch (err) {
    console.error("Error al obtener asistencia:", err);
    res.status(500).json({ message: "Error al obtener asistencia" });
  }
});

module.exports = router;
