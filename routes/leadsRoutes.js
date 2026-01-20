const express = require('express');
const router = express.Router();
const { registerLead } = require('../controller/leadController.js');

router.post('/register', registerLead);

module.exports = router;