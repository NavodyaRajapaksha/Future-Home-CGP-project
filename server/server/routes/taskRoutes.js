const express = require("express");
const router = express.Router();
const { sql } = require("../../backend/db");   // important


// GET all tasks
router.get("/", async (req, res) => {

  try {

    const result = await sql.query(`
  SELECT 
    t.task_id,
    p.project_name,
    u.full_name AS assigned_user,
    t.title,
    t.priority,
    t.status,
    t.start_date,
    t.due_date
  FROM tasks t
  JOIN projects p ON t.project_id = p.project_id
  JOIN users u ON t.assigned_user = u.user_id
`);

    res.json(result.recordset);

  } catch (err) {

    console.error("Task fetch error:", err);
    res.status(500).send("Error fetching tasks");

  }

});

module.exports = router;