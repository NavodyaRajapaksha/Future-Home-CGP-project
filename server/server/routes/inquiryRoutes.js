const express = require("express");
const router = express.Router();
const { sql } = require("../../backend/db");

// GET all inquiries
router.get("/", async (req, res) => {
  try {
    const result = await sql.query(`
      SELECT 
        i.inquiry_id,
        p.title AS property,
        u.full_name AS client,
        i.message,
        i.status,
        i.created_at
      FROM inquiries i
      JOIN properties p 
        ON i.property_id = p.property_id
      JOIN users u 
        ON i.client_id = u.user_id
      ORDER BY i.created_at DESC
    `);

    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch inquiries" });
  }
});

// CREATE inquiry
router.post("/", async (req, res) => {
  try {
    const { property_id, client_id, message } = req.body;

    await sql.query(`
      INSERT INTO inquiries (property_id, client_id, message)
      VALUES (${property_id}, ${client_id}, '${message}')
    `);

    res.json({ message: "Inquiry created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create inquiry" });
  }
});

// DELETE inquiry
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await sql.query(`
      DELETE FROM inquiries
      WHERE inquiry_id = ${id}
    `);

    res.json({ message: "Inquiry deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete inquiry" });
  }
});

// UPDATE inquiry status
router.put("/:id/status", async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;

    await sql.query(`
      UPDATE inquiries
      SET status = '${status}'
      WHERE inquiry_id = ${id}
    `);

    res.json({ message: "Status updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update status" });
  }
});

module.exports = router;