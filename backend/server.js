require('dotenv').config();
const express = require('express');
const cors = require('cors');

const propertiesRouter = require('./routes/properties');
const contactRouter = require('./routes/contact');
const authRouter = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/properties', propertiesRouter);
app.use('/api/contact', contactRouter);
app.use('/api/auth', authRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Real Estate API is running' });
});

app.listen(PORT, () => {
  console.log(`🏠 Real Estate API running on http://localhost:${PORT}`);
});
