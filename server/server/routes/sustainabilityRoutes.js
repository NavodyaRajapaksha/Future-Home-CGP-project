const express = require("express");
const router = express.Router();
const { sql } = require("../../backend/db");


router.get("/", async (req, res) => {
  try {
    const result = await sql.query(`
      SELECT 
        s.sustainability_id,
        s.material_id,
        m.name AS material,
        s.eco_score,
        s.carbon_kg_per_unit,
        s.notes
      FROM sustainability s
      JOIN materials m 
        ON s.material_id = m.material_id
    `);

    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch sustainability data" });
  }
});

module.exports = router;