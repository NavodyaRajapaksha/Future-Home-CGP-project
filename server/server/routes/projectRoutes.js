const express = require("express");
const router = express.Router();
const { sql } = require("../../backend/db");

router.get("/", async (req, res) => {
  try {
    const result = await sql.query("SELECT * FROM projects");
    res.json(result.recordset);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching projects");
  }
});

router.post("/", async (req, res) => {
  try {
    const { project_name,property_id,contractor_id,start_date,target_end_date,status } = req.body;

    const result = await sql.query`
      INSERT INTO projects
      (project_name, property_id, contractor_id, start_date, target_end_date, status)
      VALUES
      (${project_name}, ${property_id}, ${contractor_id}, ${start_date}, ${target_end_date}, ${status})
    `;

    res.json({ message: "Project added successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Insert failed" });
  }
});

module.exports = router;