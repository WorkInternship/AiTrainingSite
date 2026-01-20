const Lead = require('../model/leadModel.js');

const registerLead = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  try {
    const newLead = await Lead.create(name, email);
    res.status(201).json({ message: 'Success!', lead: newLead });
  } catch (err) {
    if (err.code === '23505') { // Unique violation error code in Postgres
      return res.status(400).json({ error: 'This email is already registered.' });
    }
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { registerLead };