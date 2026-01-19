// app.js - Minimal Express app setup
const express = require('express');
const path = require('path');
const config = require('./config');

const app = express();

// Serve static files from the public directory
app.use(express.static(config.publicDir));

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic middleware to log requests in development
if (config.isDev) {
  app.use((req, res, next) => {
    console.log(`${new Date().toLocaleTimeString()} - ${req.method} ${req.url}`);
    next();
  });
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv 
  });
});

// Catch-all route to serve index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, config.publicDir, 'index.html'));
});

module.exports = app;