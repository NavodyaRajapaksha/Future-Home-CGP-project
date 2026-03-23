const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const { sql } = require("../../backend/db");


// GET all properties (Public)
router.get("/", async (req, res) => {
  try {
    const result = await sql.query("SELECT * FROM properties");
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query failed" });
  }
});


// POST new property (Protected)
router.post("/", async (req, res) => {
  try {
    const { title, location, price_range, size_sqft, bedrooms, bathrooms, status } = req.body;

    const result = await sql.query`
      INSERT INTO properties
      (title, location, price_range, size_sqft, bedrooms, bathrooms, status)
      VALUES
      (${title}, ${location}, ${price_range}, ${size_sqft}, ${bedrooms}, ${bathrooms}, ${status})
    `;

    res.json({ message: "Property added successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Insert failed" });
  }
});


// UPDATE property (Protected)
router.put("/:id", verifyToken, async (req, res) => {

    const id = req.params.id;
    const { title, location, price_range, size_sqft, bedrooms, bathrooms, status } = req.body;

    try {

        await sql.query(`
            UPDATE properties
            SET 
                title='${title}',
                location='${location}',
                price_range='${price_range}',
                size_sqft=${size_sqft},
                bedrooms=${bedrooms},
                bathrooms=${bathrooms},
                status='${status}'
            WHERE id=${id}
        `);

        res.json({
            message: "Property updated successfully"
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Database error" });
    }

});


// DELETE property (Protected)
router.delete("/:id", verifyToken, async (req, res) => {

    const id = req.params.id;

    try {

        await sql.query(`
            DELETE FROM properties WHERE id=${id}
        `);

        res.json({ message: "Property deleted successfully." });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Database error" });
    }

});

module.exports = router;
