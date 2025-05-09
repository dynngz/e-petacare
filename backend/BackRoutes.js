require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const productRoutes = require('./routes/productoRoutes');
const uploadRoutes = require('./routes/uploadImgRoutes');
const blogRoutes = require('./routes/blogRoutes');
const categoryRoutes = require('./routes/categoriaRoutes');
const mascotasRoutes = require('./routes/mascotaRoutes')

const errorHandler = require('./middleware/errorHandler');

const app = express();

const API_BASE_URL = process.env.APIBASE_URL || '/api';

app.use(express.json({ extended: true }));
app.use(cors());

app.use('/', express.static(path.join(__dirname, 'upload')));

mongoose.connect(process.env.DB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    });

app.use(`${API_BASE_URL}/products`, productRoutes);
app.use(`${API_BASE_URL}/upload`, uploadRoutes);
app.use(`${API_BASE_URL}/blogs`, blogRoutes );
app.use(`${API_BASE_URL}/categories`, categoryRoutes);
app.use(`${API_BASE_URL}/adopt`, mascotasRoutes);

// Base route
app.get('/', (req, res) => {
    res.send('E-commerce API is running');
});

app.use(errorHandler);

// Export app for server.js
module.exports = app;