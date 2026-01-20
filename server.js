const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
require('dotenv').config();

// Import your new routes
const leadRoutes = require('./routes/leadsRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const publicDir = path.join(__dirname, 'public');

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json()); // Essential for reading form data
app.use(express.static(publicDir));

// --- API ROUTES ---
// We place these BEFORE the wildcard '*' route so they don't get intercepted
app.use('/api/leads', leadRoutes);

// --- STATIC SITE LOGIC ---
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
  console.log(`📁 Created public directory`);
}

app.get('/health', (req, res) => {
  res.json({ status: 'ok', database: 'connected', timestamp: new Date().toISOString() });
});

// Wildcard route to serve index.html
app.get('*', (req, res) => {
  const indexPath = path.join(publicDir, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('<h1>index.html not found in public folder</h1>');
  }
});

// --- START SERVER ---
app.listen(PORT, () => {
  console.log(`
🚀 MB9 AI Training - Live
📡 Server: http://localhost:${PORT}
📁 Static Files: ./public/
🔗 API Endpoint: http://localhost:${PORT}/api/leads/register
  `);
});