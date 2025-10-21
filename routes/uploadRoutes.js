import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const router = express.Router();

// 🔧 Configurar Cloudinary con variables de entorno
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// 📸 Configurar almacenamiento en Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "pagos", // carpeta dentro de tu cuenta Cloudinary
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

const upload = multer({ storage });

// 📤 Ruta para subir imágenes
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    res.json({
      message: "Archivo subido correctamente",
      fileUrl: req.file.path, // URL pública de Cloudinary
      nombres: req.body.nombres,
      apellidos: req.body.apellidos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al subir imagen a Cloudinary" });
  }
});

export default router;
