const express = require("express");
const router = express.Router();
const { sql } = require("../../backend/db");

// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {
    const { full_name, email, password, role_id } = req.body;

    const pool = await sql.connect();

    //  Check if email already exists
    const existingUser = await pool.request()
      .input("email", sql.VarChar, email)
      .query("SELECT * FROM users WHERE email = @email");

    if (existingUser.recordset.length > 0) {
      return res.status(400).json({ error: "Email already registered" });
    }

    //  Insert new user
    await pool.request()
      .input("full_name", sql.VarChar, full_name)
      .input("email", sql.VarChar, email)
      .input("password", sql.VarChar, password)
      .input("role_id", sql.Int, role_id)
      .query(`
        INSERT INTO users (full_name, email, password, role_id)
        VALUES (@full_name, @email, @password, @role_id)
      `);

    res.json({ message: "User registered successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const pool = await sql.connect();

    const result = await pool.request()
      .input("email", sql.VarChar, email)
      .input("password", sql.VarChar, password)
      .query(`
  SELECT 
    u.user_id,
    u.full_name,
    u.email,
    r.role_name
  FROM users u
  JOIN roles r ON u.role_id = r.role_id
  WHERE u.email = @email AND u.password = @password
`);


    if (result.recordset.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      user: result.recordset[0]
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
});
module.exports = router;