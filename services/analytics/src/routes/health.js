const express = require('express');
const router = express.Router();
const sequelize = require('../config/database');
router.get('/health', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ status: 'ok', service: 'analytics', timestamp: new Date().toISOString() });
  } catch (err) {
    res.status(503).json({ status: 'error', service: 'analytics', error: err.message });
  }
});
module.exports = router;