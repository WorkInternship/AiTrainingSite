const pool = require('../config/db');

const Lead = {
  create: async (name, email) => {
    const query = 'INSERT INTO leads (name, email) VALUES ($1, $2) RETURNING *';
    const values = [name, email];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }
};

module.exports = Lead;