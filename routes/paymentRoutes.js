const express = require('express');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const User = require('../models/userModel.js'); // Importar el modelo de usuario


// Conectar a MongoDB
mongoose.connect('mongodb+srv://cristianolguin22:slNEUCUgxPdHS7sL@cluster1.bpl97o3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1', {
 
})
.then(() => console.log('Conectado a MongoDB'))
.catch((error) => console.log('Error de conexión a MongoDB:', error));

// Definir esquema y modelo para guardar la información del archivo
const archivoSchema = new mongoose.Schema({
  filePath: String,
  nombres: String,
  apellidos: String,
  uploadDate: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

const Archivo = mongoose.model('Archivo', archivoSchema);

const router = express.Router();

// Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Carpeta de destino
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Nombre del archivo
  },
});

const upload = multer({ storage: storage });

// Ruta para subir imagen
router.post('/upload', upload.single('image'), async (req, res) => {
  const { nombres, apellidos } = req.body; // Capturar nombres y apellidos desde el cuerpo de la solicitud

  if (!req.file) {
    return res.status(400).json({ message: 'No se subió ningún archivo' });
  }

  // Guardar la información del archivo y nombres y apellidos en MongoDB
  const nuevoArchivo = new Archivo({
    filePath: req.file.path,
    nombres: nombres,
    apellidos: apellidos,
    uploadDate: new Date()
  });

  try {
    await nuevoArchivo.save();
    res.status(200).json({ message: 'Archivo subido exitosamente', filePath: req.file.path });
  } catch (error) {
    res.status(500).json({ message: 'Error al guardar en la base de datos', error });
  }
});

module.exports = router;
