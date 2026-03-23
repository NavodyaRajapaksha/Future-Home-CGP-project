const express = require('express');
const router = express.Router();

const { calculateEstimate } = require('../services/estimation');

router.post('/estimate', (req, res) => {
    try {
        const result = calculateEstimate(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Estimation failed' });
    }
});

module.exports = router;