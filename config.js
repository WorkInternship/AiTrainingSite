// config/index.js
require('dotenv').config();

const config = {
  // Server
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  host: process.env.HOST || 'localhost',
  
  // App
  appName: process.env.APP_NAME || 'MB9 Vibe Code Website',
  appVersion: process.env.APP_VERSION || '1.0.0',
  
  // API
  apiPrefix: process.env.API_PREFIX || '/api',
  
  // Security
  sessionSecret: process.env.SESSION_SECRET || 'dev-secret-change-in-production',
  
  // URLs
  get serverUrl() {
    return `http://${this.host}:${this.port}`;
  },
  
  get isProduction() {
    return this.nodeEnv === 'production';
  },
  
  get isDevelopment() {
    return this.nodeEnv === 'development';
  }
};

module.exports = config;