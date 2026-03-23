const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  try {
    const data = req.body;

    // 🎯 Build QR data (this will be scanned by Unity)
    const { model } = req.body;

res.json({
  qrUrl: model
});

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'QR generation failed' });
  }
});

module.exports = router;