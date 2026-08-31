const express = require('express');
const cors = require('cors');

const pool = require('./db/pool');
const authRoutes = require('./modules/auth/auth.routes');
const emergenciasRoutes = require('./modules/emergencias/emergencias.routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Servidor backend funcionando correctamente' });
});

app.get('/db-health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ status: 'ok', now: result.rows[0].now });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.use('/auth', authRoutes);
app.use('/emergencias', emergenciasRoutes);

app.use(errorHandler);

module.exports = app;
