const express = require("express");
const router = express.Router();
const { sql } = require("../../backend/db");

router.get("/", async (req, res) => {
  try {
    const result = await sql.query(`
      SELECT
        (SELECT COUNT(*) FROM properties) AS properties,
        (SELECT COUNT(*) FROM projects) AS projects,
        (SELECT COUNT(*) FROM tasks) AS tasks,
        (SELECT COUNT(*) FROM inquiries) AS inquiries
    `);

    res.json(result.recordset[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Dashboard error" });
  }
});

router.get("/recent", async (req, res) => {
  try {
    const inquiries = await sql.query(`
      SELECT TOP 5
        u.full_name AS name,
        i.message AS subject,
        i.status,
        i.created_at AS date
      FROM inquiries i
      JOIN users u ON i.client_id = u.user_id
      ORDER BY i.created_at DESC
    `);

    const tasks = await sql.query(`
      SELECT TOP 5
        t.title,
        p.project_name,
        t.priority,
        t.due_date
      FROM tasks t
      JOIN projects p ON t.project_id = p.project_id
      ORDER BY t.due_date ASC
    `);

    res.json({
      inquiries: inquiries.recordset,
      tasks: tasks.recordset
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Dashboard recent error" });
  }
});

module.exports = router;