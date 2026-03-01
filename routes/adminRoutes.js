const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");
const User = require("../models/User");

/* ================= GET ALL USERS ================= */
router.get("/users", verifyToken, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json({
      count: users.length,
      users,
    });
  } catch (err) {
    console.error("Users fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;