const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
require('dotenv').config();

// --- IMPORT ROUTES ---
// MAKE SURE THIS FILE EXISTS: ./routes/leadRoutes.js
const leadRoutes = require('./routes/leadsRoutes.js'); 

const app = express();
const PORT = process.env.PORT || 3000;
const publicDir = path.join(__dirname, 'public');

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json()); // Essential for parsing JSON body
app.use(express.urlencoded({ extended: true })); // Helpful for form data
app.use(express.static(publicDir));

// --- API ROUTES ---
app.use('/api/leads', leadRoutes);

// --- STATIC SITE SETUP ---
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
  console.log(`📁 Created public directory`);
}

// --- HEALTH CHECK ---
app.get('/health', async (req, res) => {
  // Optional: You can import your db pool here to test connection
  // const pool = require('./config/db');
  try {
    // await pool.query('SELECT NOW()'); 
    res.json({ status: 'ok', server: 'running', timestamp: new Date() });
  } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
  }
});

// --- WILDCARD ROUTE (Frontend) ---
app.get('*', (req, res) => {
  const indexPath = path.join(publicDir, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('<h1>404: Page not found</h1><p>Check your public folder.</p>');
  }
});

// --- ERROR HANDLING (Global) ---
app.use((err, req, res, next) => {
  console.error('SERVER ERROR:', err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// --- START SERVER ---
app.listen(PORT, () => {
  console.log(`
  🚀 SERVER RUNNING
  ---------------------------
  📡 Local:   http://localhost:${PORT}
  🔗 API:     http://localhost:${PORT}/api/leads/register
  📁 Public:  ${publicDir}
  ---------------------------
  `);
});