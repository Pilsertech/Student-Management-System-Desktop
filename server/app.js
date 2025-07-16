require('dotenv').config(); // For .env support

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

// Import route modules
const authRoutes = require('./routes/authRoutes');
// You can add more route imports here as you migrate more files

const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Session config (move secret to .env for security)
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

// Modular routes
app.use('/auth', authRoutes);
// Add more routes here as you expand (e.g., /api/students, /api/teachers, ...)

// Health check route (optional, useful for Electron to verify server is up)
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Basic error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Server error', details: err.message });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // For testability and Electron integration