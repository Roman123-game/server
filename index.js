const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const dataRoutes = require('./routes/dataRoutes');
const statusRoutes = require('./routes/statusRoutes');

const app = express();
const port = process.env.PORT;

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ MongoDB disconnected');
});

// Routes
app.use('/api/data', dataRoutes);
app.use('/status', statusRoutes);

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${port}`);
});
