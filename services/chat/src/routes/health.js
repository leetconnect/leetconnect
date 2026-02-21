const express = require('express');
const router = express.Router();
const sequelize = require('../config/database');
router.get('/health', async (req, res) => {
    try {
        await sequelize.authenticate();
        res.json({ status: 'ok', service: 'chat', timestamp: new Date().toISOString() });
    } catch (err) {
        res.status(503).json({ status: 'error', service: 'chat', error: err.message });
    }
});
module.exports = router;
