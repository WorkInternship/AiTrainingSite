// server.js - Minimal server
const express = require('express');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const publicDir = path.join(__dirname, 'public');

// Create public directory if it doesn't exist
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
  console.log(`📁 Created public directory`);
}

// Serve static files
app.use(express.static(publicDir));

// Simple health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// All other routes serve index.html
app.get('*', (req, res) => {
  const indexPath = path.join(publicDir, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.send(`
      <!DOCTYPE html>
      <html>
      <head><title>MB9 Vibe Code</title></head>
      <body>
        <h1>MB9 Vibe Code Website</h1>
        <p>Place your index.html file in the 'public' folder</p>
      </body>
      </html>
    `);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`
🚀 MB9 Vibe Code Website
📡 Server: http://localhost:${PORT}
📁 Serving from: ./public/
  `);
});