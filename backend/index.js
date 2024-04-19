'use strict';

// imports
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dao = require('./dao');

// init
const app = express();
const port = 3000;

// set up middlewares
app.use(express.json());
app.use(morgan('dev'));
const corsOptions = {
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

/* ROUTES */

// GET /api/search/:palabra
app.get('/api/search/:palabra', async(req, res) => {
  try {
    const frecuencia = await dao.obtenerFrecuencia(req.params.palabra);
    console.log('Respuesta del servidor:', frecuencia);
    
    if (frecuencia.error) {
      res.status(404).json(frecuencia);
    } else {
      res.json(frecuencia);  // Usar res.json() para enviar un objeto JSON
    }
  } catch (error) {
    console.error('Error al manejar la solicitud:', error);
    res.status(500).end();
  }
});

// start the server
app.listen(port, () => 'API server started');
