const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes.js');
const loginRoutes = require('./routes/loginRoutes.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const paymentRoutes = require('./routes/paymentRoutes.js');
const pagoRoutes = require('./routes/pagoRoutes.js');
const uploadRoutes = require('./routes/uploadRoutes.js');
const asistenciaRoutes = require('./routes/asistenciaRoutes.js'); // 👈 OK

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Conexión Mongo (como ya la tienes)
// ...

// Rutas API
app.use('/api', userRoutes);
app.use('/api/auth', loginRoutes);
app.use('/api', paymentRoutes);
app.use('/api', pagoRoutes);
app.use('/api', uploadRoutes);

// 👇 MONTA ASISTENCIA EN /api/asistencia
app.use('/api/asistencia', asistenciaRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
