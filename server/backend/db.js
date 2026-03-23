const sql = require("mssql/msnodesqlv8");

const config = {
  connectionString:
    "Driver={ODBC Driver 18 for SQL Server};Server=NAVODYA\\SQLEXPRESS;Database=FutureHomeDB;Trusted_Connection=Yes;Encrypt=no;"
};

const connectDB = async () => {
  try {
    await sql.connect(config);
    console.log("Connected to SQL Server database");
  } catch (err) {
    console.error("Database connection failed:", err);
  }
};

module.exports = { sql, connectDB };