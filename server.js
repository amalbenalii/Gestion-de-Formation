require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
connectDB();
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use('/api/formateurs', require('./routes/formateurRoutes'));
app.use('/api/formations', require('./routes/formationRoutes'));

app.get('/', (req, res) => {
  res.status(200).json({ 
    success: true,
    message: 'API Formations & Formateurs - Bienvenue !',
    version: '1.0.0',
    endpoints: {
      formateurs: '/api/formateurs',
      formations: '/api/formations'
    }
  });
});
 // Middleware pour les routes non trouvées 
app.use(notFound);
// Middleware de gestion d'erreurs 
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(` Serveur démarré sur http://localhost:${PORT}`);
});