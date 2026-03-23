const estimateCost = require("./services/estimation");
const authRoutes = require("./routes/authRoutes");
const inquiryRoutes = require("./routes/inquiryRoutes");
const materialRoutes = require("./routes/materialRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const projectRoutes = require("./routes/projectRoutes");
const sustainabilityRoutes = require("./routes/sustainabilityRoutes");
const taskRoutes = require("./routes/taskRoutes");
const estimationRoutes = require('./routes/estimationRoutes');
const arRoutes = require('./routes/arRoutes');
const dashboardRoutes = require("./routes/dashboardRoutes");


const { connectDB } = require("../backend/db");


const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/materials", materialRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/sustainability", sustainabilityRoutes);
app.use('/api', estimationRoutes);
app.use('/api/ar', arRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.send("API is running ✅");
});


const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.post("/api/estimate-cost", (req, res) => {
  const result = estimateCost(req.body);
  res.json(result);
});

app.post("/api/sustainability", (req, res) => {
  const result = sustainability.calculate(req.body);
  res.json(result);
});
