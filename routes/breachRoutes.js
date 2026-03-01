const express = require("express");
const Breach = require("../models/Breach");

const router = express.Router();

/* ================= CHECK EMAIL BREACH ================= */
router.post("/check", async (req, res) => {
try {
const { email } = req.body;

const breaches = await Breach.find({ email });

res.json({
  email,
  breached: breaches.length > 0,
  breachCount: breaches.length,
  breaches,
});

} catch (error) {
console.error("Breach check error:", error);
res.status(500).json({ message: "Server error" });
}
});

/* ================= GET ALL BREACHES ================= */
router.get("/all", async (req, res) => {
try {
const breaches = await Breach.find().sort({ breachDate: -1 });

res.json({
  count: breaches.length,
  breaches,
});

} catch (error) {
console.error("Fetch breaches error:", error);
res.status(500).json({ message: "Server error" });
}
});

module.exports = router;
