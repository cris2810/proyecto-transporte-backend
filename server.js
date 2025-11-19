const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes.js');
const loginRoutes = require('./routes/loginRoutes.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const paymentRoutes = require('./routes/paymentRoutes.js');
const pagoRoutes = require('./routes/pagoRoutes.js');
const  registerUser  = require('./controllers/userController.js');
const uploadRoutes = require('./routes/uploadRoutes.js');
const Asistencia = require('./models/Asistencia.js');
const asistenciaRoutes = require('./routes/asistenciaRoutes.js');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware para parsear JSON
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());



// Conectar a MongoDB
mongoose.connect('mongodb+srv://cristianolguin22:slNEUCUgxPdHS7sL@cluster1.bpl97o3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1', {
 
})
.then(() => console.log('Conectado a MongoDB'))
.catch((error) => console.log('Error de conexión a MongoDB:', error));

// Usar rutas
app.use('/api', userRoutes);
app.use('/api/auth', loginRoutes);
app.use('/api', paymentRoutes);
app.use('/api', pagoRoutes);
app.use("/api", uploadRoutes);
app.use("/api", asistenciaRoutes);


// Ruta de autenticaciónq


app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
