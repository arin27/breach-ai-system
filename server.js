const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// routes
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const breachRoutes = require("./routes/breachRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/breach", breachRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API running...");
});

const PORT = process.env.PORT || 5000;

// try DB but don't crash if fails
connectDB().catch(() => {
  console.log("⚠️ DB not connected yet");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});