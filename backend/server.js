const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');

dotenv.config();

// Attempt initial connection
connectDB().catch((err) => {
  console.error('Initial MongoDB connection error:', err.message);
});

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/authRoutes');

// Routes that don't need DB
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Middleware to ensure DB is connected before accessing API routes
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    return res.status(500).json({
      message: 'Database connection error. Pastikan IP whitelist MongoDB Atlas mengizinkan 0.0.0.0/0.',
      error: error.message,
    });
  }
});

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;