const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const { sql } = require("../../backend/db");

let materials = [];

// ✅ GET all materials
router.get("/", async (req, res) => {

  try {

    const result = await sql.query(`
  SELECT 
    m.material_id,
    m.name,
    m.category,
    m.unit_cost,
    m.unit_type,
    ISNULL(SUM(pm.quantity),0) AS total_used
  FROM materials m
  LEFT JOIN project_materials pm
  ON m.material_id = pm.material_id
  GROUP BY m.material_id, m.name, m.category, m.unit_cost, m.unit_type
`);

    res.json(result.recordset);

  } catch (err) {

    console.error("Material fetch error:", err);
    res.status(500).send("Error fetching materials");

  }

});

module.exports = router;

// ✅ GET single material
router.get("/:id", (req, res) => {
  const material = materials.find(m => m.id == req.params.id);
  if (!material) return res.status(404).json({ message: "Not found" });
  res.json(material);
});

// ✅ CREATE material (Protected)
router.post("/", verifyToken, (req, res) => {
  const newMaterial = {
    id: materials.length + 1,
    ...req.body,
    createdBy: req.user.id
  };

  materials.push(newMaterial);
  res.status(201).json(newMaterial);
});

// ✅ UPDATE material (Protected)
router.put("/:id", verifyToken, (req, res) => {
  const material = materials.find(m => m.id == req.params.id);
  if (!material) return res.status(404).json({ message: "Not found" });

  Object.assign(material, req.body);
  res.json(material);
});

// ✅ DELETE material (Protected)
router.delete("/:id", verifyToken, (req, res) => {
  materials = materials.filter(m => m.id != req.params.id);
  res.json({ message: "Deleted successfully" });
});

module.exports = router;